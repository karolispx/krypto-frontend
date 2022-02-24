<script setup>
import { RouterView } from 'vue-router'
</script>

<template>

  <div v-show="alert.display" :class="alert.type" role="alert">
    {{ alert.message }}
  </div>

  <RouterView />

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