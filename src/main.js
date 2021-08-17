import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import AutoresComponent from './pages/autores/AutoresComponent'
import EditorasComponent from './pages/editoras/EditorasComponent'
import GenerosComponent from './pages/generos/GenerosComponent'
import LivrosComponent from './pages/livros/LivrosComponent'


Vue.config.productionTip = false
Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {path: '/autores', component: AutoresComponent},
    {path: '/editoras', component: EditorasComponent},
    {path: '/generos', component: GenerosComponent},
    {path: '/livros', component: LivrosComponent},
    {path: '/', redirect: '/livros'}
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
