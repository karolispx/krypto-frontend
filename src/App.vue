<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />

  <footer class="footer fixed-bottom text-center">
      <div class="container">
        <span class="text-muted">© 2022 Krypto. All rights reserved.</span>
      </div>
    </footer>
</template>

<style>
  #main-content {
    padding-top: 30px;
  }

  footer.footer {
    padding: 20px;
    background: #fafafa;
    border-top: 1px solid #e5e5e5;
  }
</style>