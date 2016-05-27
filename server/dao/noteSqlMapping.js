// CRUD SQL语句
var note = {
    insert:'INSERT INTO note(id, user_id,type, money, create_time,update_time,remark,tag_id,tag_name) VALUES(0,?,?,?,?,?,?,?,?)',
    update:'update note set user_id=?,type=?, money=?,update_time=?,remark=?,tag_id=?,tag_name=? where id=?',
    delete: 'delete from note where id=?',
    queryById: 'select * from note where id=?',
    queryByUser:'select * from note where user_id=?',
    queryAll: 'select * from note'
};
module.exports = note;