<template>
  <div class="container">
    <default-loader v-if="pageLoader"></default-loader>

  
    <div class="row">
      <div class="Absolute-Center is-Responsive text-center">
        <app-alert></app-alert>
        <app-logo></app-logo>

        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Welcome to Krypto!</h5>
            <h6 class="card-title">Sign into your account below.</h6>

            <div class="col-sm-12">
              <form ref="loginForm" class="mt-3">
                <div class="form-group input-group mb-2">
                  <input :disabled="pageLoader" class="form-control" type="text" v-model="email" placeholder="Email Address"/>          
                </div>

                <div class="form-group input-group mb-2">
                  <input :disabled="pageLoader" class="form-control" type="password" v-model="password" placeholder="Password"/>     
                </div>

                <div class="form-group mb-2">
                  <button :disabled="pageLoader" type="button" v-on:click="submitLogin" class="btn btn-primary btn-block">Login</button>
                </div>

                <div class="form-group text-center">
                  <RouterLink to="/reset-password">Forgot your password?</RouterLink><br>
                  <RouterLink to="/register">Don't have an account yet?</RouterLink>
                </div>
              </form>        
            </div> 

          </div>
        </div>
 
      </div>    
    </div>
  </div>
</template>

<script>
  import AppLogo from '@/components/AppLogo.vue';

  export default {
    components: {
        AppLogo
    },
    computed: {
      pageLoader() {
        return this.$store.state.loader.pageLoader
      }
    },
    data() {
      return {
        email: 'karolis@wits.ie',
        password: 'secrets',
      }
    },
    methods: {
      submitLogin() {
        this.$store.dispatch('alert/clear');

        if (this.email && this.password) {
          this.$store.dispatch('loader/page', 'on');

          this.$store.dispatch( 'authentication/login', { email: this.email, password: this.password } ).then( response => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('alert/success', response);

            this.$router.push('/dashboard');
          }, error => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('alert/error', error);
          }); 
        } else {
          this.$store.dispatch('alert/error', 'Please provide all information.');
        }
      } 
    }
  }
</script>

<style>
div.well{
  height: 250px;
} 

.Absolute-Center {
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
}

.Absolute-Center.is-Responsive {
  width: 50%; 
  height: 50%;
  min-width: 200px;
  max-width: 400px;
  padding: 40px;
}
</style>