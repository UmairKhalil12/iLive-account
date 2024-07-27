const cors_proxy = require('cors-anywhere');
const port = 8080;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'], // Require specific headers
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, function() {
    console.log('CORS Anywhere proxy server is running on port ' + port);
});
