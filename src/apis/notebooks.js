import request from "../helpers/request";
import {friendlyDate} from "../helpers/util"
const URL = {
  GET:'/notebooks',
  ADD:'/notebooks',
  UPDATE:'/notebooks/:id',
  DELETE:'/notebooks/:id'
}

export default {
  getAll(){
    return new Promise((resolve, reject)=>{
      return request(URL.GET).then(res=>{
        res.data = res.data.sort(function (a,b) {
          return a.createdAt < b.createdAt ? 1 : -1
        })
        res.data.forEach(notebook=> {//后台时间的处理，只有刷新页面时才有
         notebook.friendlycreatedAt = friendlyDate(notebook.createdAt)
        })
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })

  },
  updateNotebook(notebookId, {title = ''}= {title : ''}){
    return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
  },
  deleteNotebook(notebookId){
    return request(URL.DELETE.replace(':id',notebookId),'DELETE')
  },
  addNoteBook({title=''} = {title:''}){
    return request(URL.ADD,'POST',{title})
  }
}
