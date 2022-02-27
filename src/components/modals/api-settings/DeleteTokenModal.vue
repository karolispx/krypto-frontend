<template>
  <div class="modal fade delete-token-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Token</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="deleteTokenForm" v-if="token">
          <div class="modal-body">
              <modal-alert></modal-alert>

              <p>Are you sure you want to delete this token?</p>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitDeleteToken">Yes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    props: ['token'],

    computed: {
      modalLoader() {
        return this.$store.state.loader.modalLoader
      }
    },
    methods: {
      submitDeleteToken() {
        this.$store.dispatch('modalAlert/clear');

        if (this.token) {
          this.$store.dispatch('loader/modal', 'on');

          this.$store.dispatch('APISettings/deleteToken', { id: this.token } ).then( response => {
            this.$store.dispatch('loader/modal', 'off');

            this.$store.dispatch('alert/success', response);

            $('.delete-token-modal').modal('hide');

            this.$emit('reload-settings')
          }, error => {
            this.$store.dispatch('loader/modal', 'off');

            this.$store.dispatch('modalAlert/error', error);
          }); 
        } else {
          this.$store.dispatch('modalAlert/error', 'Please provide all information.');
        }
      } 
    }
  }
</script>