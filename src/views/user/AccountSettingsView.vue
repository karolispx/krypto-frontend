<template>
     <page-loader v-if="pageLoader"></page-loader>

    <app-header></app-header>

    <main id="main" class="container">
      <app-alert></app-alert>

      <div v-if="user" id="main-content">

        <div class="card mt-4">
          <div class="card-header">
            <div class="row">
              <div class="col-md">
                <h4 class="card-title">Account Settings</h4>

                <div class="card mt-4">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md">
                        <h5 class="card-title">Change Email</h5>

                        <p>Current Email Address: {{ user.email }}</p>

                        <form class="form-inline" ref="changeEmailForm">
                          <input :disabled="pageLoader" class="form-control mb-2" type="text" v-model="email" placeholder="New Email Address"/>          

                          <button type="button" class="btn btn-primary mb-2" v-on:click="submitChangeEmail">Change</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mt-4">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md">
                        <h5 class="card-title">Change Password</h5>

                        <form class="form-inline" ref="changePasswordForm">
                          <input :disabled="pageLoader" class="form-control mb-2" type="password" v-model="currentpassword" placeholder="Current Password"/>          
                          <input :disabled="pageLoader" class="form-control mb-2" type="password" v-model="newpassword" placeholder="New Password"/>          
                          <input :disabled="pageLoader" class="form-control mb-2" type="password" v-model="repeatpassword" placeholder="Repeat Password"/>          
                          
                          <button type="button" class="btn btn-primary mb-2" v-on:click="submitChangePassword">Change</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
</template>


<script>
export default {
  data() {
    return {
      email: '',
      currentpassword: '',
      newpassword: '',
      repeatpassword: '',
    }
  },

  computed: {
    pageLoader() {
      return this.$store.state.loader.pageLoader
    },

    user() {
      return this.$store.state.user.user
    },
  },

  methods: {
    submitChangeEmail() {
        this.$store.dispatch('alert/clear');

        if (this.email) {
          this.$store.dispatch('loader/page', 'on');

          this.$store.dispatch('user/changeEmail', { email: this.email } ).then( response => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('alert/success', response);

            this.$router.push('/logout');
          }, error => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('alert/error', error);
          }); 
        } else {
          this.$store.dispatch('alert/error', 'Please provide all information.');
        }
    },

    submitChangePassword() {
        this.$store.dispatch('alert/clear');

        if (this.email) {
          this.$store.dispatch('loader/page', 'on');

          this.$store.dispatch('user/changePassword', { currentpassword: this.currentpassword, newpassword: this.newpassword, repeatpassword: this.repeatpassword } ).then( response => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('alert/success', response);

            this.$router.push('/logout');
          }, error => {
            this.$store.dispatch('loader/page', 'off');

            this.$store.dispatch('alert/error', error);
          }); 
        } else {
          this.$store.dispatch('alert/error', 'Please provide all information.');
        }
    }
  },

  mounted() {
    this.$store.dispatch('user/getAuthenticatedUser').then( response => {
      this.email = response.email;
    });
  }
}
</script>

