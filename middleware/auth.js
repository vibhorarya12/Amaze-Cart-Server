const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
	try {
		const token = req.body.token;
		if (token === '' || !token) {
			return res.status(401).send({ message: 'User not logged in.' });
		}
		const decoded = jwt.verify(token, JWT_SECRET || 'key');
		console.log(decoded);
		req.userData = decoded;
		next();
	} catch (err) {
		console.log(err);
		return res.status(401).send({
			message: 'Auth failed!',
		});
	}
};