import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import NotebookList from '@/components/NotebookList.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import TashDetail from '@/components/TashDetail.vue'
import NotFound from '@/components/NotFound.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },{
      path: '/notebooks',
      component: NotebookList
    },{
      path: '/note',
      component: NoteDetail
    },{
      path: '/trash',
      component: TashDetail
    },{
      path:'*',
      component: NotFound
    }
  ]
})
