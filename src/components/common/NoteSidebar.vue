<template>
<div class="note-sidebar">
  <span class=" btn add-note" @click="addNotes">添加笔记</span>
  <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
  <span class="el-dropdown-link" >
    {{curBookId.title}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
    <el-dropdown-menu slot="dropdown" >
      <el-dropdown-item :command="notebook.id" v-for="notebook in notebooks">{{notebook.title}}</el-dropdown-item>
      <el-dropdown-item command="trash">回收站</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <div class="menu">
    <div>更新时间</div>
    <div>标题</div>
  </div>
   <ul class="notes" v-for="note in notes">
     <li>
       <router-link :to="`/note?noteId=${note.id}&notebookId=${curBookId.id}`" >
         <span class="data">{{note.updatedAtFriendly}}</span>
         <span class="title">{{note.title}}</span>
       </router-link>
     </li>
   </ul>
</div>
</template>

<script>
import { mapActions, mapGetters ,mapMutations} from 'vuex'

export default {
  data(){
   return {

   }
 },

  created() {
    this.getNotebooks()
      .then(()=>{
        this.setCurBook({curBookId:this.$route.query.notebookId})
        return this.getNotes({ notebookId: this.curBookId.id})
      }).then(()=>{
        this.setCurNote({ curNoteId: this.$route.query.noteId })
        this.$router.replace({
          path:'/note',
          query:{
            noteId: this.curNoteId.id,
            notebookId: this.curBookId.id
          }
        })
    })
  },

  computed: {
    //放在计算属性里面，只要notebooks变化就可以重新计算
    ...mapGetters([
      'notebooks',
      'notes',
      'curBookId',
      'curNoteId'
    ])
  },

  methods:{
    ...mapMutations([
      'setCurBook', //当前选择的notebook
      'setCurNote' //当前选择的note
    ]),

    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote'
    ]),


    handleCommand(notebookId){
      if(notebookId !== this.curBookId.id){
        if(notebookId === 'trash'){
          return this.$router.push({path: '/trash'})
        }
        this.getNotes({notebookId:notebookId})
          .then(()=>{
            this.setCurNote({})
            this.$router.replace({
              path:'/note',
              query:{
                noteId: this.curNoteId.id,
                notebookId: this.curBookId.id
              }
            })
          })
        this.setCurBook({ curBookId: notebookId})

        //this.curBook = this.notebooks.find(notebook => notebook.id === notebookId)
        // Notes.getAll({notebookId})
        //   .then(res=>{
        //     this.notes = res.data
        //     this.$emit('update:notes', this.notes) //下拉框点击时将数据传给父组件
        //     if(this.notes.length > 0 ){
        //       this.$router.push({path:`/note?noteId=${this.notes[0].id}&notebookId=${this.curBook.id}`})
        //     }else {
        //       this.$router.push({path: `/note?notebookId=${this.curBook.id}`})
        //     }
        //   })
      }
    },
    addNotes(){
      this.$prompt('请输入笔记标题', '创建笔记', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不能超过三十个字'
      }).then(({value}) => {
        this.addNote({ notebookId:this.curBookId.id,title:value})
       // return Notes.addNote({notebookId:this.curBook.id}, { title: value})
      })
    }
  },

}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-selfdefine{
  display: inline-block;
  width: 150px ;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
.el-dropdown-menu__item {
  width: 260px;
}

.note-sidebar {
  position: relative;
  width: 290px;
  height: 100%;
  border-right: 1px solid #cccccc;
  background: #eeeeee;
  .add-note {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #666;
    font-size: 12px;
    padding: 2px 6px;
    box-shadow: 0 0 2px 0 #ccc;
    border: none;
    z-index: 1;
  }
  .notebook-title{
    font-size: 18px;
    font-weight: normal;
    color: #333;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #cccccc;
    background-color: #f7f7f7;
    display: block;
  }
  .menu {
    div{
      font-size: 12px;
      padding: 2px 10px;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      flex: 1;
    }
    display: flex;

    &:last-child {
      border-right: none;
    }
  }
  .iconfont{
    font-size: 10px;
  }
  .notes {
    li {

      &:nth-child(odd) {
        background-color: #f2f2f2;
      }

      a {
        display: flex;
        padding: 3px 0;
        font-size: 12px;
        border: 2px solid transparent;
      }

      .router-link-exact-active {
        border: 2px solid #81c0f3;
        border-radius: 3px;
      }

      span {
        padding: 0 10px;
        flex: 1;
      }
    }
  }

}
</style>
