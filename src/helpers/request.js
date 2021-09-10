import axios from 'axios'
import baseURLConfig from './config-baseURL'
import {Message} from "element-ui";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true

export default function request(url,type='GET',data={}){
  console.log('----开始请求数据了')
  return new Promise((resolve,reject)=>{
    let option ={
      url,
      method:type,
      validateStatus(status){
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if(type.toLowerCase() === 'get'){
      option.params = data
    }else{
      option.data = data
    }
    axios(option).then(res => {
      if(res.status === 200){
        console.log('---成功--结束了')
        console.log(res)
        resolve(res.data)
      }else{
        console.log('---失败---结束了')
        console.log(res)
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err =>{
      Message.error('网络异常')
      reject({msg:"网络异常"})
    })
  })
}
