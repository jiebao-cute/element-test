<template>
<div id="note" class="detail">
  <NoteSidebar @update:notes="val => notes = val"/>
  <div class="note-detail">
  <div class="note-bar">
    <span>创建日期：4天前</span>
    <span>更新日期：1小时前</span>
    <span>已保存</span>
    <svg class='iconfont icon-plus'>
      <use xlink:href="#icon-huishou"/>
    </svg>
  </div>
    <div class="note-title">
      <input type="text" placeholder="请在此输入标题...."></input>
    </div>
    <div class="editor">
      <textarea  v-show="true" placeholder="输入内容, 支持 markdown 语法"></textarea>
      <div class="preview markdown-body" v-show="false"  v-html=""> </div>
    </div>
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
      curNotes:[],
      notes:[]
    }
  },
  created() {
    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({ path : '/'})
      }
    })
  },


}
</script>

<style lang="less" scoped>
#note{
 display: flex;
 align-items: stretch;
  background-color: #ffffff;
  flex: 1;
}
.iconfont {
  width: 1em;
  height: 1em;
  float: right;
  margin-left: 6px;
  font-size: 18px;
  cursor: pointer;
}

.note-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  .note-detail-ct {
    height: 100%;
  }
  .note-bar{
    background-color: #cccccc;
    padding: 4px 20px;
    border-bottom: 1px solid #eee;

    span {

      font-size: 12px;
      color: #444444;
      margin-right: 4px;
    }
  }
  .note-title{
  input{
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
  .editor{
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
