// vue.config.js
module.exports = {
// vue脚手架工具的配置选项... vue-config.js
    devServer: {
        proxy: {
            '/ajax': {
                target: 'http://m.maoyan.com',
                changeOrigin: true
            }
        }
    }
}