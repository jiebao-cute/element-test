<template>
  <div class="sidebar">
    <avatar/>
    <div class="icons">
      <router-link to="/note" title="笔记">
        <svg class='iconfont icon-note'>
          <use xlink:href="#icon-biji"/>
        </svg>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <svg class="iconfont icon-notebook">
          <use xlink:href="#icon-dianhua"/>
        </svg>
      </router-link>
      <router-link to="/trash" title="回收站">
        <svg class="iconfont icon-trash">
          <use xlink:href="#icon-huishou"/>
        </svg>
      </router-link>
    </div>
    <div class="logout" @click="onlogout">
      <svg class="iconfont icon-logout">
        <use xlink:href="#icon-tuichu"/>
      </svg>
    </div>
  </div>
</template>

<script>
import avatar from '@/components/common/Avatar.vue'
import {mapActions} from  'vuex'

export default {
  name: 'sidebar',
  components: { avatar },
  methods:{
    ...mapActions([
      'logout'
    ]),

    onlogout(){
      this.logout().then(()=>{
        this.$router.push({ path:'/' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;

  .icons {
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    a {
      padding: 6px 0;
      display: block;
      .iconfont {
        width: 1.5em;
        height: 1.5em;
        fill: currentColor;
        overflow: hidden;
        color: #fff
      }
    }
    .router-link-active {
      background-color: #5e6266;
    }
  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    .iconfont{
      width: 1.8em;
      height: 1.8em;
      fill: currentColor;
      overflow: hidden;
      color: #fff
    }
  }
}
</style>
