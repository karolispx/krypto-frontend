<template>
  <div class="modal fade delete-alert-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Alert</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="deleteAlertForm" v-if="alert">
          <div class="modal-body">
              <modal-alert></modal-alert>

              <p>Are you sure you want to delete this alert?</p>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitDeleteAlert">Yes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    props: ['alert'],

    computed: {
      modalLoader() {
        return this.$store.state.loader.modalLoader
      }
    },
    methods: {
      submitDeleteAlert() {
        this.$store.dispatch('modalAlert/clear');

        if (this.alert) {
          this.$store.dispatch('loader/modal', 'on');

          this.$store.dispatch('alert/deleteAlert', { id: this.alert } ).then( response => {
            this.$store.dispatch('loader/modal', 'off');

            this.$store.dispatch('appAlert/success', response);

            $('.delete-alert-modal').modal('hide');

            this.$emit('reload-alerts')
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