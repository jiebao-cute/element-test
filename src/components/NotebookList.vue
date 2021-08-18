<template>
  <div id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreat">
        <svg class='iconfont icon-plus'>
          <use xlink:href="#icon-jia"/>
        </svg>
        新建笔记
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link to="id" class="notebook" v-for="notebooks  in notebooks" >
            <div>
              <span>
              <svg class='iconfont icon-notebook'>
                <use xlink:href="#icon-biji"/>
              </svg>
                </span>
              {{notebooks.title}}
              <span>{{notebooks.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebooks)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebooks)">删除</span>
              <span class="data">3天前</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "../apis/auth.js";
import Notebooks from "../apis/notebooks"

Window.notebooks = Notebooks

export default {
  name: 'NotebookList',
  data() {
    return {
      notebooks: []
    }
  },
  methods:{
    onCreat(){
      let title = window.prompt('创建笔记本')
      if (title.trim() === '' ){
        alert('笔记名不能为空')
        return
      }
      Notebooks.addNoteBook({title}).then(res=>{
        console.log(res)
        this.notebooks.unshift(res.data)
        alert(res.msg)
      })
    },
    onEdit(notebooks){
      let title = window.prompt('修改标题',notebooks.title)
      Notebooks.updateNotebook(notebooks.id,{title}).then(res=>{
        console.log(res)
        notebooks.title = title
        alert(res.msg)
      })
    },
    onDelete(notebooks){
      let confirm = window.confirm('你确定要删除吗？')
      if(confirm){
        Notebooks.deleteNotebook(notebooks.id).then(res=>{//通知服务器删除
          console.log(res)
          this.notebooks.splice(this.notebooks.indexOf(notebooks),1)//通知UI删除
          alert(res.msg)
        })
      }
    }
  },
  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/'})
      }
    })
    Notebooks.getAll().then(res=>{
      this.notebooks = res.data
    })
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#notebook-list{
  flex: 1;
  .btn{
    font-size: 12px;
    color: #666;
    cursor: pointer;
    margin-left: 30px;
    align-items: center;
    padding: 5px 10px;
  }
  .btn .iconfont{
    font-size: 12px;
  }
  header {
    padding: 14px;
    border-bottom: 1px solid #ccc;
  }
  main {
    padding: 30px 40px;
  }
  .layout {
    max-width: 966px;
    margin: 0 auto;
  }
   main h3{
     font-size: 14px;
     color: #000;
   }
  main .book-list{
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    background-color: #ffffff;
    border-radius: 4px;
    font-weight: bold;
  }
  main .book-list span{
    font-size: 12px;
    font-weight: bold;
    color: #b3c0c8;
  }

  main .data,
  main .action{
    float: right;
    margin-left:  10px;
  }
  main .iconfont{
    color: #b3c0c8;
    margin-right: 4px;
  }
  main .notebook {
    display: block;
    cursor: pointer;
  }
  main a.notebook:hover{
    background-color: #f7fafd;
  }
  main a.notebook div{
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }
  main .error-msg{
    font-size: 12px;
    color: red;
  }
}
</style>
