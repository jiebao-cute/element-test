import Notebooks from "@/apis/notebooks"
import { Message } from 'element-ui'

const state = {
  notebooks: []
}

const getters = {
  notebooks: state => state.notebooks || []
}


const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },

  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },

  updateNotebook(state,payload){
    let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId) || {}
    notebook.title = payload.title
  },

  deleteNotebook(state,payload){
    state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId)
  }
}

const actions = {
  getNotebooks({commit}){
    Notebooks.getAll()
      .then(res=>{
        commit('setNotebooks', {notebooks:res.data})
      })
  },

  addNotebook({commit},payload){
    return Notebooks.addNoteBook({title:payload.title})
      .then(res=>{
        console.log(res)
        commit('addNotebook',{notebook: res.data})
        Message.success(res.msg)
      })
  },

  updateNotebook({commit},payload){
    return Notebooks.updateNotebook(payload.notebookId,{title:payload.title})
      .then(res=>{
        commit('updateNotebook' ,{notebookId:payload.notebookId,title:payload.title})
        Message.success(res.msg)
        }
      )
  },

  deleteNotebook({commit},payload){
    return Notebooks.deleteNotebook(payload.notebookId)
      .then(res=>{
        commit('deleteNotebook',{notebookId: payload.notebookId})
        Message.success(res.msg)
      })
  }

}


export default {
  state,
  getters,
  mutations,
  actions
}
