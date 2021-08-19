<template>
  <div id="app">
       <sidebar class="s-sidebar"/>
        <router-view class="wrapper"></router-view>
  </div>
</template>

<script>
import sidebar from '@/components/common/Sidebar.vue'
export default {
  name: 'App',
  components:{
    sidebar
  }

}
</script>

<style lang="less">
.s-sidebar{
 position: fixed;
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html , body, #app{
  height: 100%;
}
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}
.el-message-box__wrapper .el-message-box .el-message-box__header{
  margin: 0 0;
  background:  #666666;
  .el-message-box__title{
    color: white;
  }
}
.el-button--primary {
  background:  #444444;
  border: 1px solid #444444;
}
.el-button:hover {
  background: #cccccc;
  border: 1px solid #cccccc;
  color: black;
}
.el-button--primary:focus{
  background:  #444444;
  border: 1px solid #444444;
}

.el-input__inner:focus{
  border: 1px solid #444;
}
input{
  width: 300px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  padding: 3px 5px;
  outline: none;
}
a {
  text-decoration:  none;
  color: #444;
}
ul,li {
  list-style: none;
}
.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0 0 2px 0 #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}
#app {
  display: flex;
  align-items: stretch;
}


</style>
