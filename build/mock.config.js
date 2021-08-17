const fs = require('fs')
const path = require('path')

const mockBaseURL = 'https://note-server.hunger-valley.com' //本地设置地址
const realBaseURL = 'http://note-server.hunger-valley.com' //线上地址

exports.config = function ({isDev = true} = {isDev: true}) {//判断是否为开发环境，默认是true
  let filetxt = `
  module.exports = {
     baseURL: '${isDev ? mockBaseURL : realBaseURL}'
}
`
  fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseURL.js'),filetxt)
}
