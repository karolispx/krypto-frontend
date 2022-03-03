<template>
  <div class="modal fade create-wallet-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Wallet</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="createWalletForm">
          <div class="modal-body">
            <modal-alert></modal-alert>

            <div class="form-group">
              <label for="name">Wallet Name</label>
              <input :disabled="modalLoader" v-model="name" type="text" class="form-control" id="name" placeholder="i.e. Ethereum Wallet">
            </div>

            <div class="form-group">
              <label for="name">Wallet Address</label>
              <input :disabled="modalLoader" v-model="address" type="text" class="form-control" id="address" placeholder="i.e. 0x0000000000000000000000000000000000000000">
            </div>

            <div class="form-group">
              <label for="blockchain">Blockchain</label>

              <select v-if="blockchains && blockchains.length" v-model="blockchain" :disabled="modalLoader" class="form-control" name="blockchain">
                <option disabled value="">Please select</option>

                <option v-for="chain in blockchains" :key="chain._id" :value="chain.slug">{{ chain.name }}</option>
              </select>

              <p v-else>There are no blockchains.</p>
            </div>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitCreateWallet">Add wallet</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    props: ['blockchains'],

    data() {
      return {
        name: '',
        address: '',
        blockchain: ""
      }
    },
    computed: {
      modalLoader() {
        return this.$store.state.loader.modalLoader
      }
    },
    methods: {
      submitCreateWallet() {
        this.$store.dispatch('modalAlert/clear');

        if (this.name && this.address && this.blockchain && (this.blockchain === "eth" || this.blockchain === "bsc" || this.blockchain === "matic")) {
          this.$store.dispatch('loader/modal', 'on');

          this.$store.dispatch('wallet/createWallet', { name: this.name, address: this.address, blockchain: this.blockchain } ).then( response => {
            this.$store.dispatch('loader/modal', 'off');

            this.$store.dispatch('appAlert/success', response);

            $('.create-wallet-modal').modal('hide');

            this.name = "";
            this.address = "";
            this.blockchain = "";

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