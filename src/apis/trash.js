import request from "../helpers/request";
import {friendlyDate} from "../helpers/util"

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  getAll(){
    return new Promise((resolve, reject)=>{
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort(function (a, b) {
            return a.createdAt < b.createdAt ? 1 : -1
          })
          res.data.forEach(notebook => {//后台时间的处理，只有刷新页面时才有
            notebook.createdAtFriendly = friendlyDate(notebook.createdAt)
            notebook.updatedAtFriendly = friendlyDate(notebook.updatedAt)
          })
          resolve(res)
        }).catch(err=>{
        reject(err)
      })
    })
  },

  deleteNote({ noteId }) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },
  revert({ noteId }){
    return request(URL.REVERT.replace(':noteId' ,noteId),'PATCH')
  }
}
