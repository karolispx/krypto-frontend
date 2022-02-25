<template>
  <div id="modal-alert" v-show="alert.display" :class="alert.type" role="alert">
    {{ alert.message }}
  </div>
</template>

<script>
  export default  {
    computed: {
      alert () {
        return this.$store.state.modalAlert
      }
    }
  }
</script>