<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="val => notes = val"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNoteId.id">
        <i class="el-icon-reading"></i>
        在左侧选择或添加笔记
      </div>
      <div class="note-detail-ct" v-show="curNoteId.id">
        <div class="note-bar">
          <span>创建日期：{{ curNoteId.createdAtFriendly }}</span>
          <span>更新日期：{{ curNoteId.updatedAtFriendly }}</span>
          <span>{{ this.statusText }}</span>
          <span>
          <el-popconfirm
            confirm-button-text='好的'
            cancel-button-text='不用了'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除笔记吗？删除后会放入回收站"
            @confirm="deleteNotes"
          >
         <el-button slot="reference">
           <svg class='iconfont icon-plus'>
             <use xlink:href="#icon-huishou"/>
            </svg></el-button>
          </el-popconfirm>
        </span>
          <span @click="showPreview">
            <i class="el-icon-edit" v-show="isShow"></i>
            <i class="el-icon-help" v-show="!isShow"></i>
          </span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNoteId.title" @input="updateNotes" placeholder="请在此输入标题...."
                 @keydown="statusText = '正在输入...'"></input>
        </div>
        <div class="editor">
      <textarea v-show="!isShowPreview" v-model="curNoteId.content" @input="updateNotes" placeholder="输入内容, 支持 markdown 语法"
                @keydown="statusText = '正在输入...'">
      </textarea>
          <div class="preview markdown-body" v-show="isShowPreview" v-html="previewContent">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NoteSidebar from "./common/NoteSidebar";
import Common from '@/helpers/common.js';
import MarkdownIt from 'markdown-it'
import { mapActions, mapGetters ,mapMutations} from 'vuex'

let md = new MarkdownIt()
export default {
  name: 'NoteDetail',
  components: {NoteSidebar},

  data() {
    return {
      statusText: '笔记未改动',
      isShowPreview: false,
      isShow:true
    }
  },
  created() {
    this.checkLogin({ path: '/' })
    // Auth.getInfo().then(res => {
    //   if (!res.isLogin) {
    //     this.$router.push({path: '/'})
    //   }
    // })
    // Bus.$on('update:notes', val => {
    //   this.curNotes = val.find(note => note.id == this.$route.query.noteId) || {}
    // })
  },



  computed:{
    previewContent(){//markdown文档
      return  md.render(this.curNoteId.content || '')
    },
      ...mapGetters([
        'notes',
        'curNoteId'
      ])
  },


  methods: {
    ...mapMutations([
      'setCurNote'
    ]),

    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),


    updateNotes: Common.debounce(function () {//不能用箭头函数，因为没有this
      if (!this.curNoteId.id) return{}
        this.updateNote({ noteId: this.curNoteId.id, title: this.curNoteId.title, content: this.curNoteId.content })
        .then(res => {
          this.statusText = '已保存'
        }).catch(res => {
        this.statusText = '保存出错'
      })
    }, 1500),

    deleteNotes() {
      this.deleteNote({noteId:this.curNoteId.id})
        .then(data => {
          this.$router.replace({ path: '/note' })
        })
      // Notes.deleteNote({noteId: this.curNotes.id})//删除数据库中的数据
      //   .then(res => {
      //     this.notes.splice(this.notes.indexOf(this.curNotes), 1)//删除UI 中的数据
      //     this.$message.success(res.msg)
      //     this.$router.replace({path: '/note'})
      //   })
    },
    showPreview(){
      this.isShowPreview = !this.isShowPreview
      this.isShow = !this.isShow
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId:to.query.noteId})
    //this.curNotes = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
  }

}
</script>

<style lang="less" scoped>
#note {
  display: flex;
  align-items: stretch;
  background-color: #ffffff;
  flex: 1;
}
.el-icon-edit ,.el-icon-help{
  width: 1em;
  height: 1em;
  float: right;
  margin-left: 6px;
  font-size: 18px;
  cursor: pointer;
}
.iconfont {
  width: 1em;
  height: 1em;
  float: right;
  margin-left: 6px;
  font-size: 18px;
  cursor: pointer;
}

.note-empty {
  font-size: 50px;
  color: #ccc;
  text-align: center;
  margin-top: 100px;
  float: top;
}

.el-button {
  background-color: #cccccc;
  border: none;
  padding: 0 5px;
  float: right;
}

.note-detail {
  flex: 1;
  display: flex;
  flex-direction: column;

  .note-detail-ct {
    height: 100%;
  }

  .note-bar {
    background-color: #cccccc;
    padding: 4px 15px;
    border-bottom: 1px solid #eee;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    span {

      font-size: 12px;
      color: #444444;
      margin-right: 4px;
    }
  }

  .note-title {
    input {
      display: inline-block;
      width: 100%;
      border-top: 1px solid #eee;
      border-right: none;
      border-left: none;
      outline: none;
      font-size: 18px;
      padding: 10px 20px;
    }
  }

  .editor {
    height: ~"calc(100% - 70px)";
    position: relative;

    textarea, .preview {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 20px;
    }

    textarea {
      border: none;
      resize: none;
      outline: none;
      font-size: 14px;
      font-family: 'Monaco', courier, monospace;
    }
  }
}


</style>
