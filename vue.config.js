const path = require('path')
module.exports = {
    productionSourceMap: false,
    publicPath:'/',
    devServer: {
        open: false, //浏览器自动打开页面
        host: "0.0.0.0", //如果是真机测试，就使用这个IP
        port: 80,
        proxy: {
                //配置跨域
                '/api': {
                    target: 'localhost:8088',
                    ws:true,
                    changOrigin:true,
                    pathRewrite:{
                        '^/api':'/'
                    }
                }
            },
        disableHostCheck: true
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, 'src/css/normal.less'),
            ],
        }
    },
    chainWebpack: config => {
        config.plugins.delete('preload') 
        config.plugins.delete('prefetch') 
    },
    configureWebpack: () => {
        return {
            performance: {
                hints:'warning',
                //入口起点的最大体积
                maxEntrypointSize: 50000000,
                //生成文件的最大体积
                maxAssetSize: 30000000,
                //只给出 js 文件的性能提示
                assetFilter: function(assetFilename) {
                    return assetFilename.endsWith('.js');
                }
            }
        }
    }
  }