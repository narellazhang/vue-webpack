export default {
  longTimeFormat(ns) {
    var date = new Date(ns*1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours())+ ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes())+ ':';
    var s = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
    return (Y+M+D+h+m+s); 
    // 输出结果：2014-04-23 18:55:49
  }
}