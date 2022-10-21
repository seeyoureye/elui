<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>



export default {
  name: 'App',
  components: {
}
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  body{
  padding-right: 0px !important;
    
}
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
