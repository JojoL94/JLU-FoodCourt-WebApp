const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: 'https://jlu-speisekarten.onrender.com',
        changeOrigin: true,
        secure: false, // Setzt die Überprüfung des Zertifikats außer Kraft
        logLevel: 'debug', // Hinzufügen von Logs
        onProxyReq: (proxyReq, req, res) => {
            console.log(`Proxying request ${req.method} ${req.url} -> ${proxyReq.getHeader('host')}${proxyReq.path}`);
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
        }
    }));
};
