<template>
  <div class="modal fade edit-coin-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Coin</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="editCoinForm" v-if="coin">
          <div class="modal-body">
              <modal-alert></modal-alert>

              <div class="form-group">
                <label for="name">Coin</label>
                <input :disabled="modalLoader" v-model="coin.name" type="text" class="form-control" id="name" readonly>
              </div>

              <div class="form-group">
                <label for="balance">Balance</label>
                <input :disabled="modalLoader" v-model="coin.balance" type="number" class="form-control" id="balance" placeholder="i.e. 3.14" step="any">
              </div>
              
              <div class="form-group">
                <label for="cost">Cost</label>
                <input :disabled="modalLoader" v-model="coin.cost" type="number" class="form-control" id="cost" placeholder="i.e. 3.14" step="any">
              </div>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitEditCoin">Edit Coin</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
      submitEditCoin() {
        this.$store.dispatch('modalAlert/clear');

        if (this.coin.id && this.coin.balance && this.coin.cost) {
          this.$store.dispatch('loader/modal', 'on');

          this.$store.dispatch('dashboard/editCoin', { id: this.coin.id, balance: this.coin.balance, cost: this.coin.cost } ).then( response => {
            this.$store.dispatch('loader/modal', 'off');

            this.$store.dispatch('appAlert/success', response);

            $('.edit-coin-modal').modal('hide');

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