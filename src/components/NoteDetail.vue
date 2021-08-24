<template>
<div id="note" class="detail">
  <NoteSidebar/>
  <div id="note-detail">
   <h1>notebook : {{$route.query.notebookId}}</h1>
    <h1>notebook : {{$route.query.noteId}}</h1>
  </div>
</div>
</template>

<script>
import Auth from "../apis/auth";
import NoteSidebar from "./common/NoteSidebar";
export default {
  name: 'NoteDetail',
  components:{ NoteSidebar },
  data () {
    return {
      msg: '笔记详情页'
    }
  },
  created() {
    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({ path : '/'})
      }
    })
  }
}
</script>

<style scoped>
#note{
 display: flex;
 align-items: stretch;
  background-color: #ffffff;
  flex: 1;
}
</style>
