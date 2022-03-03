<template>
  <div class="modal fade edit-wallet-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Wallet</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="editWalletForm" v-if="wallet">
          <div class="modal-body">
            <modal-alert></modal-alert>

            <div class="form-group">
              <label for="name">Wallet Name</label>
              <input :disabled="modalLoader" v-model="wallet.name" type="text" class="form-control" id="name" placeholder="i.e. Ethereum Wallet">
            </div>

            <div class="form-group">
              <label for="name">Wallet Address</label>
              <input :disabled="modalLoader" v-model="wallet.address" type="text" class="form-control" id="address" placeholder="i.e. 0x0000000000000000000000000000000000000000">
            </div>

            <div class="form-group">
              <label for="blockchain">Blockchain</label>

              <select v-if="blockchains && blockchains.length" v-model="wallet.blockchain" :disabled="modalLoader" class="form-control" name="blockchain">
                <option disabled value="">Please select</option>

                <option v-for="chain in blockchains" :key="chain._id" :value="chain.slug">{{ chain.name }}</option>
              </select>

              <p v-else>There are no blockchains.</p>
            </div>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitEditWallet">Yes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    props: ['wallet', 'blockchains'],

    computed: {
      modalLoader() {
        return this.$store.state.loader.modalLoader
      }
    },

    methods: {
      submitEditWallet() {
        this.$store.dispatch('modalAlert/clear');

        if (this.wallet.name && this.wallet.address && this.wallet.blockchain && (this.wallet.blockchain === "eth" || this.wallet.blockchain === "bsc" || this.wallet.blockchain === "matic")) {
          this.$store.dispatch('loader/modal', 'on');

          this.$store.dispatch('wallet/editWallet', { id: this.wallet.id, name: this.wallet.name, address: this.wallet.address, blockchain: this.wallet.blockchain } ).then( response => {
            this.$store.dispatch('loader/modal', 'off');

            this.$store.dispatch('appAlert/success', response);

            $('.edit-wallet-modal').modal('hide');

            this.wallet.id = "";
            this.wallet.name = "";
            this.wallet.address = "";
            this.wallet.blockchain = "";

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