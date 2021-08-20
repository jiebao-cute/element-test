<template>
  <div id="note-detail">
    <NoteSidebar/>
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
h1 {
  color: blue;
}
</style>
