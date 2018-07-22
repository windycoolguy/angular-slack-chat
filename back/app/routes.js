var User = require('./models/user');
var bcrypt = require('bcrypt');

function getUsers(res) {
	User.find(function (err, users) {

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			res.send(err);
		}
		res.json(users); // return all todos in JSON format
	});
};

module.exports = function (app) {
	// register users
	app.post('/user/register', function (req, res) {
		User.findOne({
			email: req.body.email
		}, function (err, result) {
			if (!result) {
				var newUser = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
				});
				User.createUser(newUser, function (err, user) {
					if (err) {
						res.send(err);
					} else {
						res.send({
							'state': 1,
							'message': "Successfully SignUP!"
						});
					}
				});
			} else {
				res.send({
					'state': 0,
					'message': "There is existing Email!"
				});
			}
		});
	});
	app.post('/user/resetpass', function (req, res) {
		User.findOne({
			email: req.body.email
		}, function (err, result) {
			if (result) {
				var email = req.body.email;
				var newpass = req.body.newpass;
				var userpassword = result.password;
				var password = req.body.curpass;
				User.comparePassword(password, userpassword, function (err, isMatch) {
					if (err) throw err;
					if (isMatch) {
						bcrypt.genSalt(10, function (err, salt) {
							bcrypt.hash(newpass, salt, function (err, hash) {
								newpass = hash;
								User.updateOne({
									email: email
								}, {
									password: newpass
								}, function (err, result) {
									if (err) {
										res.send(err);
									} else {
										res.send({
											'state': 1,
											'message': "Reset Password!"
										});
									}
								});
							});
						});
					} else {
						res.send({
							'state': 0,
							'message': "Current Password isn't correct!"
						});
					}
				});

			} else {
				res.send({
					'state': 0,
					'message': "unregistered User!"
				});
			}
		});
	});
	//check user in login
	app.post('/user/login', function (req, res) {
		User.findOne({
			email: req.body.email,
		}, function (err, result) {
			if (!result) {
				res.send({
					'state': 0,
					'message': "There isn't Email Address!"
				});
			} else {
				var userpassword = result.password;
				var password = req.body.password;
				User.comparePassword(password, userpassword, function (err, isMatch) {
					if (err) throw err;
					if (isMatch) {
						res.send({
							'state': 1,
							'message': "Successfully Login!"
						});
					} else {
						res.send({
							'state': 0,
							'message': "Password isn't correct!"
						});
					}
				});
			}
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function (req, res) {
		res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};