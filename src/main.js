import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant组件库
import Vant from 'vant'
// 加载vant组件库样式
import 'vant/lib/index.css'
// 加载全局样式
import './styles/index.less'
// 自动设置REM基准值（html标签字体大小）
import 'amfe-flexible'
// 全局注册vant
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
