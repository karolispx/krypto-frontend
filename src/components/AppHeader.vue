<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-primary">
    <div class="container">
      <RouterLink class="navbar-brand" to="/dashboard">Krypto</RouterLink>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-bind:class="{ active: (currentRoute === 'dashboard') }">
            <RouterLink class="nav-link" to="/dashboard">Dashboard</RouterLink>
          </li>

          <li class="nav-item" v-bind:class="{ active: (currentRoute === 'wallets') }">
            <RouterLink class="nav-link" to="/wallets">Wallets</RouterLink>
          </li>

          <li class="nav-item dropdown" v-bind:class="{ active: (currentRoute === 'account-settings' || currentRoute === 'api-settings' || currentRoute === 'alerts') }">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Settings
            </a>
            
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <RouterLink class="dropdown-item" v-bind:class="{ active: (currentRoute === 'account-settings') }" to="/account-settings">Account</RouterLink>
              <RouterLink class="dropdown-item" v-bind:class="{ active: (currentRoute === 'api-settings') }" to="/api-settings">API</RouterLink>
              <RouterLink class="dropdown-item" v-bind:class="{ active: (currentRoute === 'alerts') }" to="/alerts">Alerts</RouterLink>
            </div>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/logout">Logout</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user
    },

    currentRoute() {
      return this.$route.name;
    }
  },

  mounted() {
    this.$store.dispatch('user/getAuthenticatedUser').then( response => {
    }, error => {
      this.$store.dispatch('appAlert/error', "Your session has expired. Please login again.");

      this.$router.push('/logout');
    }); 
  }
}
</script>

