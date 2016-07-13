// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var _ = require('lodash'),
	config = require('../conf/config'),
	jwt = require('jsonwebtoken');

function createToken(name) {
	return jwt.sign({userName:name}, config.secret, {
		expiresIn: 60 * 60 * 5
	});
}
// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
	if (typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
			connection.query($sql.queryByName, param.name, function(err, result) {
				if (_.isEmpty(result)) {
					connection.query($sql.insert, [param.name, param.account, param.psw], function(err, result) {
						if (result) {
							result = {
								code: 200,
								msg: '注册成功',
								id_token: createToken(param.name)
							};
						}
						// 以json形式，把操作结果返回给前台页面
						/*res.status(201).send({
						    id_token: createToken(param)
						});*/

						// 释放连接 
						connection.release();
					});
				} else {
					result = {
						code: -1,
						msg: '用户名已存在'
					};
					jsonWrite(res, result);
					// 释放连接 
					connection.release();
				}
			});

			// 建立连接，向表中插入值

		});

	},
	delete: function(req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if (result.affectedRows > 0) {
					result = {
						code: 200,
						msg: '删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function(req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if (param.name == null || param.account == null || param.psw == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}

		/*pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.account, param.psw, +param.id], function(err, result) {
				// 使用页面进行跳转提示
				if (result.affectedRows > 0) {
					result = {
						code: 200,
						msg: '删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
*/		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByName, param.name, function(err, result) {
				if (_.isEmpty(result)) {
					
					connection.query($sql.update, [param.name, param.account, param.psw, +param.id], function(err, result) {
						// 使用页面进行跳转提示
						if (result.affectedRows > 0) {
							result = {
								code: 200,
								msg: '修改成功'
							};
						} else {
							result = void 0;
						}
						jsonWrite(res, result);
						connection.release();
					});
							
				} else {
					result = {
						code: -1,
						msg: '用户名已存在'
					};
					jsonWrite(res, result);
					// 释放连接 
					connection.release();
				}
			});
		});
	},
	queryById: function(req, res, next) {
		var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();

			});
		});
	},
	queryAll: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	login: function(req, res, next) {
		var param = req.body;
		if (param.name == null || param.psw == null) {
			jsonWrite(res, {
				code: '-1',
				msg: '用户名或密码不能为空'
			});
			return;
		}
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByName, param.name, function(err, result) {
				console.log("result====" + result);
				if (_.isEmpty(result)) {
					jsonWrite(res, {
						code: '-1',
						msg: '该用户不存在'
					});
					return;
				}
				var user = _.findKey(result, function(o) {
					return o.psw == param.psw;
				});
				console.log("user====" + user);
				if (!user) {

					jsonWrite(res, {
						code: '401',
						msg: '账号密码不相符'
					});
					return;
				}
				/*res.status(201).send({
					id_token: createToken(result[user])
				});*/
			
				jsonWrite(res, {
					code: '200',
					msg: '登录成功',
					user_id:result[user].id,
					id_token: createToken(result[user].name)
				});

				connection.release();
			});
		});
	}
};