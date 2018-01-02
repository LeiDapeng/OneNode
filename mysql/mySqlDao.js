var mysql  = require('mysql');  //调用MySQL模块
//创建一个connection
var connection =getNewConnection();
/**
 * 建立新的数据库连接
 */
function getNewConnection(){
	return mysql.createConnection({
		host     : '182.92.78.56',       //主机
		user     : 'root',               //MySQL认证用户名
		password:'123456',        //MySQL认证用户密码
		port: '3306',
		database:'MyIndex'                  //端口号
	});
}

function getconnection(){
	//if(connection==null){
		connection =getNewConnection();
		connection.connect(function(err){
			if(err){
				console.log('[query] - :'+err);
				connection=null;
				return;
			}
		console.log('[connection connect]  succeed!');
		});
	//}

}
/**
 * 查询数据
 * @param {*} sql 
 * @param {*} param 
 * @param {*} page 
 * @param {*} size 
 * @param {*} callBack 
 */
exports.list=function(sql,param,page,size,callBack){
	if(page&&size){
		sql+=' limit '+((page-1)*size)+','+page*size;
	}
getconnection();
//执行SQL语句
console.log('sql:'+sql);
//select * from t_sys_param where param_key=?
connection.query(sql,param, function(err, rows, fields)
	{
		if (err) {
			console.log('[query] - :'+err);
			connection=null;
			return;
		}
		console.log('The list is: ', rows.length);
		var rows_=rows;
		callBack(rows_);

	});

//关闭connection
	connection.end(function(err){
		if(err){
			connection=null;
			return;
		}
			console.log('[connection end] succeed!');
			connection=null;
	});
}

/**
 * 更新数据库
 * @param {*} sql 
 * @param {*} callBack 
 */
exports.update=function(sql,callBack){

getconnection();
//执行SQL语句
console.log('sql:'+sql);
connection.query(sql, function(err, result)
	{
		if (err) {
			console.log('[query] - :'+err);
			connection=null;
			return;
		}
		console.log(result)
		console.log('update info_count ' + result.changedRows);
		callBack(result.changedRows);

	});

//关闭connection
	connection.end(function(err){
		if(err){
			connection=null;
			return;
		}
			console.log('[connection end] succeed!');
			connection=null;
	});
}

/**
 * 插入数据
 * @param {*} sql 
 * @param {*} callBack 
 */
exports.insert=function(sql,callBack){

getconnection();
//执行SQL语句
console.log('sql:'+sql);
connection.query(sql, function(err, result)
	{
		if (err) {
			console.log('[query] - :'+err);
			connection=null;
			return;
		}
		console.log('insertCount ' + result.insertId);
		callBack(result.insertId);

	});

//关闭connection
	connection.end(function(err){
		if(err){
			connection=null;
			return;
		}
			console.log('[connection end] succeed!');
			connection=null;
	});
}
