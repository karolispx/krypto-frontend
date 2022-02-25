<template>
  <div class="modal fade create-coin-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Coin</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="createCoinForm">
          <div class="modal-body">
              <modal-alert></modal-alert>

              <div class="form-group">
                <label for="symbol">Coin Symbol</label>
                <input :disabled="modalLoader" v-model="symbol" type="text" class="form-control" id="symbol" placeholder="i.e. btc, eth">
              </div>

              <div class="form-group">
                <label for="balance">Balance</label>
                <input :disabled="modalLoader" v-model="balance" type="number" class="form-control" id="balance" placeholder="i.e. 3.14" step="any">
              </div>
              
              <div class="form-group">
                <label for="cost">Cost</label>
                <input :disabled="modalLoader" v-model="cost" type="number" class="form-control" id="cost" placeholder="i.e. 3.14" step="any">
              </div>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitCreateCoin">Add Coin</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    data() {
      return {
        symbol: '',
        balance: "",
        cost: "",
      }
    },
    computed: {
      modalLoader() {
        return this.$store.state.loader.modalLoader
      }
    },
    methods: {
      submitCreateCoin() {
        this.$store.dispatch('modalAlert/clear');

        if (this.symbol && this.balance && this.cost) {
          this.$store.dispatch('loader/modal', 'on');

          this.$store.dispatch( 'dashboard/createCoin', { symbol: this.symbol, balance: this.balance, cost: this.cost } ).then( response => {
            this.$store.dispatch('loader/modal', 'off');

            this.$store.dispatch('alert/success', response);

            $('.create-coin-modal').modal('hide');

            this.symbol = "";
            this.balance = "";
            this.cost = "";

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