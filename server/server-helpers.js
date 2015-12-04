const printRequestInfo = (req, res, next) => {
	console.log(`Received a ${req.method} request for ${req.path}`);
	next();
};

module.exports = {
	printRequestInfo
};