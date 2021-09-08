<template>
  <div class="wapper">
    <div class="text">当前页面不存在，请检查网址是否正确</div>
    <div class="link">
      <router-link to="/">返回首页</router-link>
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.text{
  font-size: 34px;
  color: red;
  padding: 18px  18px;
  margin: 20px 20px;
}
.link{
  padding: 18px  18px;
  margin: 20px 20px;
  :hover{
    color: red;
  }
}
</style>
