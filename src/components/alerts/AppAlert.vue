<template>
  <div id="app-alert" v-show="appAlert.display" :class="appAlert.type" role="alert">
    {{ appAlert.message }}
  </div>
</template>

<script>
  export default  {
    computed: {
      appAlert () {
        return this.$store.state.appAlert
      }
    }
  }
</script>

<style scoped>
  #app-alert {
    margin-top: 3rem!important;
  }
</style>