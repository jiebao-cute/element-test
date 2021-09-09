import request from "../helpers/request";
import {friendlyDate} from "../helpers/util"
const URL = {
  GET:'/notebooks',
  ADD:'/notebooks',
  UPDATE:'/notebooks/:id',
  DELETE:'/notebooks/:id'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
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
      }).catch(err => {
        reject(err)
      })
    })

  },
  updateNotebook(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  },
  addNoteBook({title = ''} = {title: ''}) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, 'POST', {title})
        .then(res => {
          res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
          res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
          resolve(res)
        }).catch(err => {
        reject(err)
      })
    })
  }
}
