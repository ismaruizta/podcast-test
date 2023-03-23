const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        }
    })
);

app.listen(3001, () => {
    console.log('Proxy server listening on port 3001');
});
