// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./noteSqlMapping');
 
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
			param.create_time = new Date();
			param.update_time = null;
 			console.log(param);
 			
			// 建立连接，向表中插入值
			// 'INSERT INTO note(id, name, age) VALUES(0,?,?)',(id, user_id,type, money, create_time,upate_time,remark,tag_id,tag_name
			connection.query($sql.insert, [param.user_id,param.type, param.money,param.create_time,param.update_time,param.remark,param.tag_id, param.tag_name], function(err, result) {

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
		if(param.type == null || param.money == null|| param.id == null) {
			jsonWrite(res, undefined);
			return; 
		}
 		param.update_time = new Date();
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.user_id,param.type, param.money,param.update_time,param.remark,param.tag_id, param.tag_name,+param.id], function(err, result) {
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
	queryById: function (req, res, next) {
		var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();
 
			});
		});
	},
	queryByUser: function (req, res, next) {
		var user_id = +req.query.user_id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByUser, user_id, function(err, result) {
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