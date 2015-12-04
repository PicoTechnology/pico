const printRequestInfo = (req, res, next) => {
	console.log(`Received a ${req.method} request for ${req.path}`);
	next();
};

const printUserIP = (req, res, next) => {
	console.log(`IP Address: ${retrieveUserIP(req)}`);
	next();
};

const retrieveUserIP = req => req.connection.remoteAddress;

const printRequestHeaders = (req, res, next) => {
	console.log(`header: ${req.headers['user-agent']}`);
	console.log(`device hash: ${hashUserAgent(req.headers['user-agent'])}`);
	next();
};

const hashUserAgent = userAgentString => {
	// remove whitespace from string
	userAgentString = userAgentString.replace(/\s+/g, '');
	var h = 0;
	for (var i=0; i<userAgentString.length; i++) {
		h = 131 * h + userAgentString.charAt(i).charCodeAt();
	}
	return h;
};

module.exports = {
	printRequestInfo,
	printUserIP,
	printRequestHeaders
};