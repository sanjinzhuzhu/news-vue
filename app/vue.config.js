const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
})

const path =require('path')
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'nav-bar-background-color': '#007bff',
            // 'nav-bar-title-text-color': 'wihte',
            //或者通过less文件覆盖（文件路径为绝对路径） 
            //__dirname值/Users/caosihui/workspace/news-vue
            // hack:'true; @import "your-less-file-path.less";'
            // hack:'true; @import "your-less-file-path.less";'
            hack:`true; @import "${path.join(__dirname, '/src/styles/cover.less')}";`
          },
        },
      },
    },
  },
};
