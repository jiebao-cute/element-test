import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import NotebookList from '@/components/NotebookList.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import TashDetail from '@/components/TashDetail.vue'



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
      path: '/note/:noteId',
      component: NoteDetail
    },{
      path: '/trash/:noteId',
      component: TashDetail
    }


  ]
})
