<template>
  <div class="wapper">
    <div class="a-note">
    <div class="text">当前页面不存在，请检查网址是否正确</div>
    <div class="link">
      <router-link to="/">返回首页</router-link>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style lang="less" scoped>
.wapper{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: table;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .a-note{
    width: 800px;
    height: 500px;
    margin: 100px auto;
  }
}
.text{
  font-size: 34px;
  color: red;
  padding: 18px  18px;
  margin: 20px 20px;
}
.link{
  padding: 18px  18px;
  margin: 20px  100px;
  :hover{
    color: red;
  }
  a{
    font-size: 18px;
    margin: 0 140px;
  }
}
</style>
