var mysql = require("mysql");
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'admin',
	database : 'node_db'
});

exports.list = function(req, res) {
	connection.query('SELECT * FROM user', function(error, results, fields) {
		if (error) {
			throw error;
		}
		console.log(results);
		res.render('user', {
			users : results
		});
	});
};

exports.addUser = function(req, res) {
	connection.query('INSERT INTO user (user_name, email) values ("' + req.body.user_name + '","' + req.body.email + '")', function(error, results, fields){
		if (error) {
			throw error;
		}
		res.redirect('/users');
	});
};