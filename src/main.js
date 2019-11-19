import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


//modules
import App from './App.vue'
import router from './router'
import store from './store'
import GlobalhandlerError from './util/GlobalhandlerError'

//config
Vue.config.productionTip = false

//Vue use
Vue.use(ElementUI)
Vue.use(GlobalhandlerError, {
  router: router,
  store: store
});

//nprogress
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

/*console.log(`

██████╗ █████╗ ███╗   ██╗    ██╗   ██╗ ██████╗ ██╗   ██╗    ██╗  ██╗ █████╗  ██████╗██╗  ██╗    ███╗   ███╗███████╗
██╔════╝██╔══██╗████╗  ██║    ╚██╗ ██╔╝██╔═══██╗██║   ██║    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝    ████╗ ████║██╔════╝
██║     ███████║██╔██╗ ██║     ╚████╔╝ ██║   ██║██║   ██║    ███████║███████║██║     █████╔╝     ██╔████╔██║█████╗  
██║     ██╔══██║██║╚██╗██║      ╚██╔╝  ██║   ██║██║   ██║    ██╔══██║██╔══██║██║     ██╔═██╗     ██║╚██╔╝██║██╔══╝  
╚██████╗██║  ██║██║ ╚████║       ██║   ╚██████╔╝╚██████╔╝    ██║  ██║██║  ██║╚██████╗██║  ██╗    ██║ ╚═╝ ██║███████╗
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝       ╚═╝    ╚═════╝  ╚═════╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚══════╝
                                                                                                                    

`)*/

console.log(`
       X10Sec © 2019
      `);