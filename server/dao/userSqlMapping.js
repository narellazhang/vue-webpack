// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, name, account, psw) VALUES(0,?,?,?)',
    update:'update user set name=?, account=? ,psw=? ,where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryByName: 'select * from user where name=?',
    queryAll: 'select * from user'
};

 
module.exports = user;