import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/components/Login.vue')
    },{
      path: '/',
      alias:'/notebooks',//别名，就是根目录和/notebooks都是访问的notebooks
      component: () => import('@/components/NotebookList.vue')
    }, {
      path: '/note',
      component: () => import('@/components/NoteDetail.vue')
    },{
      path: '/trash',
      component: () => import('@/components/TashDetail.vue')
    },{
      path:'*',
      component: () => import('@/components/NotFound.vue')
    }
  ]
})
