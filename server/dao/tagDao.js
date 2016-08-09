// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./tagSqlMapping');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));
 
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
 
module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param =  req.body;
 			console.log(param);
 			
			// 建立连接，向表中插入值
			// 'INSERT INTO tag(id, name, age) VALUES(0,?,?)',(id, user_id,type, money, create_time,upate_time,remark,tag_id,tag_name
			connection.query($sql.insert, [param.user_id,param.tag_name,param.type], function(err, result) {

				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'增加成功'
					};   
				} else {
					result = {
						code: -1,
						msg:'增加失败'
					};   
				}
 				console.log(result);
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'删除成功'
					};   
				} else {
					result = {
						code: -1,
						msg:'修改失败'
					};   
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if(param.type == null || param.user_id == null|| param.tag_name == null) {
			jsonWrite(res, undefined);
			return; 
		}
 		param.update_time = (new Date().getTime())/1000;
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.user_id, param.tag_name,param.type,+param.id], function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'修改成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();			
			});
		});
 
	},
	
	queryByType: function (req, res, next) {
		var type = +req.query.type; // 为了拼凑正确的sql语句，这里要转下整数
		var user_id = +req.query.user_id;
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByType,[user_id,type],function(err, result) {
				jsonWrite(res, result);
				connection.release();
 
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}
};