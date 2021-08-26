<template>
  <div id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreat">
        <svg class='iconfont icon-plus'>
          <use xlink:href="#icon-jia"/>
        </svg>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link :to="`/note?notebookId=${notebooks.id}`" class="notebook" v-for="notebooks  in notebooks" :key="notebooks.id">
            <div>
              <span>
              <svg class='iconfont icon-notebook'>
                <use xlink:href="#icon-biji"/>
              </svg>
                </span>
              {{ notebooks.title }}
              <span>{{ notebooks.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebooks)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebooks)">删除</span>
              <span class="data">{{ notebooks.friendlycreatedAt }}</span>
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
import {friendlyDate} from "../helpers/util";

Window.notebooks = Notebooks

export default {
  name: 'NotebookList',
  data() {
    return {
      notebooks: []
    }
  },
  methods: {
    onCreat() {
      this.$prompt('请输入笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不能超过三十个字'
      }).then(({value}) => {
        return Notebooks.addNoteBook({title: value})
      }).then(res => {
        res.data.friendlycreatedAt = friendlyDate(res.data.createdAt)//UI上面显示的时间
        this.notebooks.unshift(res.data)
        this.$message.success(res.msg)
      }).catch(e=>e)
    },
    onEdit(notebooks) {
      let title = ''
      this.$prompt('请输入新笔记本标题', '更新笔记本标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebooks.title,
        inputErrorMessage: '标题不能为空，且不能超过三十个字'
      }).then(({value}) => {
        title = value
        return Notebooks.updateNotebook(notebooks.id, {title})
      }).then(res => {
        notebooks.title = title
        this.$message.success(res.msg)
      }).catch(e=>e)
    },
    onDelete(notebooks) {
      this.$confirm('此操作将永久删除该文件, 你确定要删除该笔记吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebooks.deleteNotebook(notebooks.id)
      }).then(res => {//通知服务器删除
        this.notebooks.splice(this.notebooks.indexOf(notebooks), 1)//通知UI删除
        this.$message({
          type: 'success',
          message: res.msg,
        })}).catch(e=>e)
      }
  },
  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/'})
      }
    })
    Notebooks.getAll().then(res => {
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

#notebook-list {
  flex: 1;

  .btn {
    font-size: 12px;
    color: #666;
    cursor: pointer;
    margin-left: 30px;
    align-items: center;
    padding: 5px 10px;
  }

  .btn .iconfont {
    font-size: 12px;
  }

  header {
    padding: 14px;
    border-bottom: 1px solid #ccc;
  }

  main {
    max-height: 540px;
    padding: 30px 40px;
    overflow-y: scroll;
  }

  .layout {
    max-width: 966px;
    margin: 0 auto;
  }

  main h3 {
    font-size: 14px;
    color: #000;
  }

  main .book-list {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    background-color: #ffffff;
    border-radius: 4px;
    font-weight: bold;
  }

  main .book-list span {
    font-size: 12px;
    font-weight: bold;
    height: 20px;
    color: #b3c0c8;
  }

  main .action:hover {
    color: #333333;
  }
  main .data,
  main .action {
    float: right;
    margin-left: 10px;
  }

  main .iconfont {
    color: #b3c0c8;
    margin-right: 4px;
  }

  main .notebook {
    display: block;
    cursor: pointer;
  }

  main a.notebook:hover {
    background-color: #f7fafd;
  }

  main a.notebook div {
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }

  main .error-msg {
    font-size: 12px;
    color: red;
  }
}
</style>
