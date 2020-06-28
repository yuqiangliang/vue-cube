<template>
  <div id="app">
    <keep-alive v-if="isRefresh">
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRefresh: true
    }
  },
  methods: {
    reload () {
      this.isRefresh = false
      this.$nextTick(() => {
        setTimeout(() => {
          this.isRefresh = true
        }, 100)
      })
    },
  }
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
<style>
@import './css/normal.less'
</style>
