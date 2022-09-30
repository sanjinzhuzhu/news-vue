import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "amfe-flexible"
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search } from 'vant'
import vueConfig from 'vue.config'

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
let obj = {
  install(Vue) {
    Vue.directive('fofo', {
      inserted(el) {
        //指令所在van-search组件
        //组件跟标签是div，input内部
        //以上都是原生标签对象
        const theInput = el.querySelector('input')
        theInput.focus()
      }
    })
  }
}
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
