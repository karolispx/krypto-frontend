<template>
  <div class="container">
    <page-loader v-if="pageLoader"></page-loader>

    <div class="row">
      <div class="Absolute-Center is-Responsive text-center">
        <app-alert></app-alert>
        <app-logo></app-logo>
        
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Reset Your Password</h5>

            <div class="col-sm-12">
              <form ref="resetPasswordForm" class="mt-3">
                <div class="form-group input-group mb-2">
                  <input :disabled="pageLoader" class="form-control" type="text" v-model="email" placeholder="Confirm Email Address"/>          
                </div>

                <div class="form-group input-group mb-2">
                  <input :disabled="pageLoader" class="form-control" type="password" v-model="newpassword" placeholder="New Password"/>     
                </div>

                <div class="form-group input-group mb-2">
                  <input :disabled="pageLoader" class="form-control" type="password" v-model="repeatpassword" placeholder="Repeat New Password"/>     
                </div>

                <div class="form-group mb-2">
                  <button :disabled="pageLoader" type="button" v-on:click="submitResetPassword" class="btn btn-primary btn-block">Reset</button>
                </div>

                <div class="form-group text-center">
                  <RouterLink to="/login">Back to Login</RouterLink>
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
      },

      token() {
        return this.$route.params.token
      },
    },
    data() {
      return {
        email: '',
        newpassword: '',
        repeatpassword: '',
      }
    },
    methods: {
      submitResetPassword() {
        this.$store.dispatch('appAlert/clear');

        if (this.token && this.email && this.newpassword && this.repeatpassword) {
          this.$store.dispatch('loader/page', 'on');

          this.$store.dispatch( 'authentication/resetPasswordFlow', { token: this.token, email: this.email, newpassword: this.newpassword, repeatpassword: this.repeatpassword } ).then( response => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('appAlert/success', response);

            this.$router.push('/login');
          }, error => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('appAlert/error', error);
          }); 
        } else {
          this.$store.dispatch('appAlert/error', 'Please provide all information.');
        }
      } 
    },

    created() {
      if (!this.token) {
        this.$store.dispatch('appAlert/error', "No password reset token detected.");

        this.$router.push('/login');
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