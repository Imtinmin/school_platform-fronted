import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import  videoPlayer  from 'vue-video-player'


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

//Vue video
Vue.use(videoPlayer)

new Vue({
  router,
  store,
  videoPlayer,
  render: function (h) { return h(App) }
}).$mount('#app')

console.log(`
   _____ _____  _____   _____ _____ _______ ______ ___   ___ ___  __ 
  / ____|  __ \\|  __ \\ / ____/ ____|__   __|  ____|__ \\ / _ \\__ \\/_ |
 | |  __| |  | | |__) | |   | |       | |  | |__     ) | | | | ) || |
 | | |_ | |  | |  ___/| |   | |       | |  |  __|   / /| | | |/ / | |
 | |__| | |__| | |    | |___| |____   | |  | |     / /_| |_| / /_ | |
  \\_____|_____/|_|     \\_____\\_____|  |_|  |_|    |____|\\___/____||_|
                                                                     
                                                                                                                                                                                         

`)

console.log(`
       X10Sec © 2019
      `);