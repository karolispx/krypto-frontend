<template>
  <div class="modal fade delete-coin-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Coin</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="deleteCoinForm" v-if="coin">
          <div class="modal-body">
              <modal-alert></modal-alert>

              <p>Are you sure you want to delete "<strong>{{ coin.name}} </strong>" from your portfolio?</p>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitDeleteCoin">Yes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    props: ['coin'],

    computed: {
      modalLoader() {
        return this.$store.state.loader.modalLoader
      }
    },
    methods: {
      submitDeleteCoin() {
        this.$store.dispatch('modalAlert/clear');

        if (this.coin.id) {
          this.$store.dispatch('loader/modal', 'on');

          this.$store.dispatch('dashboard/deleteCoin', { id: this.coin.id } ).then( response => {
            this.$store.dispatch('loader/modal', 'off');

            this.$store.dispatch('appAlert/success', response);

            $('.delete-coin-modal').modal('hide');

            this.$emit('reload-portfolio')
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