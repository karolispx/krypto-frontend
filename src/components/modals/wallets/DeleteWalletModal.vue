<template>
  <div class="modal fade delete-wallet-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Wallet</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="deleteWalletForm" v-if="wallet">
          <div class="modal-body">
              <modal-alert></modal-alert>

              <p>Are you sure you want to delete this wallet?</p>
              <p>Deleting this wallet will not affect your portfolio.</p>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitDeleteWallet">Yes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    props: ['wallet'],

    computed: {
      modalLoader() {
        return this.$store.state.loader.modalLoader
      }
    },

    methods: {
      submitDeleteWallet() {
        this.$store.dispatch('modalAlert/clear');

        if (this.wallet) {
          this.$store.dispatch('loader/modal', 'on');

          this.$store.dispatch('wallet/deleteWallet', { id: this.wallet } ).then( response => {
            this.$store.dispatch('loader/modal', 'off');

            this.$store.dispatch('appAlert/success', response);

            $('.delete-wallet-modal').modal('hide');

            this.$emit('reload-wallets')
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