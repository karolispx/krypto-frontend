<template>
  <div class="container">
    <page-loader v-if="pageLoader"></page-loader>

    <div class="row">
      <div class="Absolute-Center is-Responsive text-center">
        <app-alert></app-alert>
        <app-logo></app-logo>

        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Create an Account</h5>

            <div class="col-sm-12">
              <form ref="registerForm" class="mt-3">
                <div class="form-group input-group mb-2">
                  <input :disabled="pageLoader" class="form-control" type="text" v-model="email" placeholder="Email Address"/>          
                </div>

                <div class="form-group input-group mb-2">
                  <input :disabled="pageLoader" class="form-control" type="password" v-model="password" placeholder="Password"/>     
                </div>

                <div class="form-group input-group mb-2">
                  <input :disabled="pageLoader" class="form-control" type="password" v-model="repeatpassword" placeholder="Repeat Password"/>     
                </div>

                <div class="form-group mb-2">
                  <button :disabled="pageLoader" type="button" v-on:click="submitRegister" class="btn btn-primary btn-block">Sign Up</button>
                </div>

                <div class="form-group text-center">
                  <RouterLink to="/login">Already have an account?</RouterLink>
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
        email: '',
        password: '',
        repeatpassword: '',
      }
    },
    methods: {
      submitRegister() {
        this.$store.dispatch('appAlert/clear');

        if (this.email && this.password && this.repeatpassword) {
          this.$store.dispatch('loader/page', 'on');

          this.$store.dispatch('authentication/register', { email: this.email, password: this.password, repeatpassword: this.repeatpassword } ).then( response => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('appAlert/success', response);

            this.$router.push('/dashboard');
          }, error => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('appAlert/error', error);
          }); 
        } else {
          this.$store.dispatch('appAlert/error', 'Please provide all information.');
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