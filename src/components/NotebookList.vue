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
          <router-link :to="`/note?notebookId=${notebook.id}`" class="notebook" v-for="notebook  in notebooks" :key="notebooks.id">
            <div>
              <span>
              <svg class='iconfont icon-notebook'>
                <use xlink:href="#icon-biji"/>
              </svg>
                </span>
              {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="data">{{ notebook.createdAtFriendly }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth.js'
import Notebooks from '@/apis/notebooks.js'
import { mapState, mapActions, mapGetters } from 'vuex'
window.Auth = Auth
window.Notebooks = Notebooks

export default {
  name: 'NotebookList',
  data() {
    return {}
  },
  created() {
    console.log("-----notebook")
    this.checkLogin({ path: '/login' })
    this.getNotebooks()
  },
  computed: {
    //放在计算属性里面，只要notebooks变化就可以重新计算
    ...mapGetters(['notebooks'])
  },
  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook',
      'checkLogin'
    ]),

    onCreat() {
      this.$prompt('请输入笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不能超过三十个字'
      }).then(({value}) => {
        this.addNotebook({ title: value })
      })
    },

    onEdit(notebooks) {
      this.$prompt('请输入新笔记本标题', '更新笔记本标题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebooks.title,
        inputErrorMessage: '标题不能为空，且不能超过三十个字'
      }).then(({value}) => {
        this.updateNotebook({ notebookId: notebooks.id, title: value })
      })
    },

    onDelete(notebooks) {
      this.$confirm('此操作将永久删除该文件, 你确定要删除该笔记吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({ notebookId: notebooks.id })
      })
      }
  },

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
