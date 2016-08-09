// CRUD SQL语句
var tag = {
    insert:'INSERT INTO tag(id, user_id,tag_name, type) VALUES(0,?,?,?)',
    update:'update tag set user_id=?, tag_name=?, type=? ,where id=?',
    delete: 'delete from tag where id=?',
    queryByType: 'select * from tag where user_id=? and type=?',
    queryAll: 'select * from tag'
};

module.exports = tag;