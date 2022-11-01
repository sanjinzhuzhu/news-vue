import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import "amfe-flexible"
import {
  NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List,
  PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Divider, CellGroup,
  Tag, Image as VanImage,Image,Dialog,DatetimePicker
} from 'vant'

Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Divider)

Vue.use(VanImage)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Search)
Vue.use(Badge)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popup);
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List);
Vue.use(Cell);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.config.productionTip = false

//使用vue use封装一个插件
const directive = {
  install(Vue) {
    Vue.directive('fofo', {
      inserted(el) {
        //指令所在van-search组件
        //组件跟标签是div，input内部
        //以上都是原生标签对象
        // const theInput = el.querySelector('input')
        // theInput.focus()
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框, 尝试往里获取一下
          setTimeout(() => {
            const theInput = el.querySelector('input')
            const theTextArea = el.querySelector('textarea')
            // 判断: 不一定能获取得到, 需要加判断, 有值了, 再执行.focus()才不报错
            if (theInput) theInput.focus()
            if (theTextArea) theTextArea.focus()
          })
        }
      },
      update(el) { // 指令所在标签, 被更新时触发
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框, 尝试往里获取一下
          setTimeout(() => {
            const theInput = el.querySelector('input')
            const theTextArea = el.querySelector('textarea')
            // 判断: 不一定能获取得到, 需要加判断, 有值了, 再执行.focus()才不报错
            if (theInput) theInput.focus()
            if (theTextArea) theTextArea.focus()
          })
        }
      }
    })
  }
}
Vue.use(directive)
// Vue.directive('fofo',{
//   inserted(el){
//     //指令所在van-search组件
//     //组件跟标签是div，input内部
//     //以上都是原生标签对象
//     const theInput = el.querySelector('input')
//     theInput.focus()
//   }
// })
new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
