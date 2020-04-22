module.exports = {
	// 配置生产环境先web应用的部署路径为/Estore/，开发环境的路径为域名根路径
	publicPath: process.env.NODE_ENV === 'production' ? '/Estore/' : '/',
	// 配置开发环境服务器的参数
	devServer: {
		host: 'localhost', // 主机名
		hot: true, // 热更新
		port: 8082, // 设置端口
		// 设置代理，为了解决前后端分离开发时的同源问题。
		// 设置代理后Node.js服务器会把所有访问localhost:8082的请求代理到proxy.target下，这样就绕过了同源问题。
		proxy: {
			'/Estore': {
				target: 'http://172.16.173.169:80',
				changeOrigin: true,
				pathRewrite: {
					'^/Estore': '/Estore'
				}
			}
		}
	}
}