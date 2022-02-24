<template>
  <div id="app-alert" v-show="alert.display" :class="alert.type" role="alert">
    {{ alert.message }}
  </div>
</template>

<script>
  export default  {
    computed: {
      alert () {
        return this.$store.state.alert
      }
    }
  }
</script>

<style scoped>
  #app-alert {
    margin-top: 3rem!important;
  }
</style>