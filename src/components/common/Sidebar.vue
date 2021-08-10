<template>
  <div class="sidebar">
    <div class="icons">
      <router-link to="/note/1" title="笔记">
        <svg class='iconfont icon-note'>
          <use xlink:href="#icon-biji"/>
        </svg>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <svg class="iconfont icon-notebook">
          <use xlink:href="#icon-dianhua"/>
        </svg>
      </router-link>
      <router-link to="/trash/2" title="回收站">
        <svg class="iconfont icon-trash">
          <use xlink:href="#icon-huishou"/>
        </svg>
      </router-link>
    </div>
    <div class="logout">
      <svg class="iconfont icon-logout">
        <use xlink:href="#icon-tuichu"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.icons{
  margin-top: 20px;
  display: flex;
  flex-direction:column
}
.icons a {
  padding: 6px 0;
  display: block;
}
.icons .router-link-active {
  background-color: #5e6266;
}
.iconfont {
  width: 2em;
  height: 2em;
  fill: currentColor;
  overflow: hidden;
  color: #fff
}

.sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;
}
.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;

}
</style>
