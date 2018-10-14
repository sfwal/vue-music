<template>
  <div id="app">
    <music-header></music-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MusicHeader from '@/components/musicHeader'
import Tab from '@/components/tabs'
export default {
  name: 'App',
  components: {
    MusicHeader,
    Tab
  }
}
</script>

<style lang="less">
@import '~@/common/less/index.less';
</style>
