let sqlDao = require('./mySqlDao');


const proxy = {
	insert: (key, param,callback) => {
		proxy.getSql(key,param,(sql) => {
			sqlDao.insert(sql, (id) => {
				callback(id);
			})
		})
	},
	update: (key, param,callback) => {
		proxy.getSql(key,param,(sql) => {
			sqlDao.update(sql, (count) => {
				callback(count);
			}) 
		})
	},
	list: (key, param, page, size, callback) => {
		proxy.getSql(key,param,(sql) => {
			sqlDao.list(sql,param,page,size,(rows) => {
				let list=[];
				for(let i=0;i<rows.length;i++){
				  list.push(rows[i]);
				}
				callback(JSON.stringify(list));
			})
		})
	},
	getSql: (key, param, callback) => {
		let sql = `select * from SQL_LIST where \`sql_key\`='${key}'`;
		sqlDao.list(sql, null, 0, 10, function (rows) {
			for (let i = 0; i < rows.length; i++) {
				sql = rows[i].sql_content;
				param.forEach(element => {
					sql = sql.replace('$p', `'${element}'`)
				});
				console.log('最终执行sql:'+sql);
				callback(sql);
				break;
			}
		})
	}
}

exports.default=proxy;