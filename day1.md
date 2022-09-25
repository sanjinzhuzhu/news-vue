1、环境安装
Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to 
toggle all, <i> to invert selection, and <enter> to proceed)
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
❯◉ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing

2、eslint代码校验工具
vscode+eslint插件+工作区根目录下，eslinrc.js配置，在保存时，检查代码
如果在写代码过程中用插件解决了问题，webpack里就不会报错了
webpck开发服务器（在下面终端中）+eslint插件，在保存时，检查代码
如果不好使排查问题 eslint插件右下角->设置

3.配置接口文件
【首先可以对网络请求文件进行封装，新建一个request.js，在封装一个接口方法getAllChannelsAPI】
对request.js请求文件的axios进行二次封装，用结构赋值的方式，然后在到api文件引入封装好的自定义函数，然后在封装一个接口方法叫getAllChannelsAPI，在这个方法里去调用axios请求 在具体接口文档网页里找到地址。封装好后将此方法向外导出，在到APP文件中按需导入调用，等到wait获取到这个具体接口地址后，走async开始打印即可.