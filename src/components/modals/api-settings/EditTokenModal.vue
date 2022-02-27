<template>
  <div class="modal fade edit-token-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Token</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="editTokenForm" v-if="token">
          <div class="modal-body">
              <modal-alert></modal-alert>

            <div class="form-group">
              <label for="endpointType">Endpoint Type</label>

              <select v-model="token.endpointType" :disabled="modalLoader" class="form-control" name="endpointType">
                <option disabled value="">Please select type</option>
                <option value="portfolio">Portfolio Statistics</option>
                <option value="coin">Coin Price</option>
              </select>
            </div>

            <div v-if="token.endpointType && token.endpointType === 'coin'">
              <div class="form-group">
                <label for="symbol">Coin Symbol</label>
                <input :disabled="modalLoader" v-model="token.symbol" type="text" class="form-control" id="symbol" placeholder="i.e. btc, eth">
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitEditToken">Yes</button>
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
      submitEditToken() {
        this.$store.dispatch('modalAlert/clear');

        if (this.token.id && this.token.endpointType && (this.token.endpointType === "portfolio" || this.token.endpointType === "coin")) {
          if (this.token.endpointType === "coin" && this.token.symbol === "") {
            this.$store.dispatch('modalAlert/error', 'Please provide all information.');
          } else {
            this.$store.dispatch('loader/modal', 'on');

            this.$store.dispatch('APISettings/updateToken', { id: this.token.id, type: this.token.endpointType, symbol: this.token.symbol } ).then( response => {
              this.$store.dispatch('loader/modal', 'off');

              this.$store.dispatch('appAlert/success', response);

              $('.edit-token-modal').modal('hide');

              this.token.endpointType = "";
              this.token.symbol = "";

              this.$emit('reload-settings')
            }, error => {
              this.$store.dispatch('loader/modal', 'off');

              this.$store.dispatch('modalAlert/error', error);
            }); 
          }
        } else {
          this.$store.dispatch('modalAlert/error', 'Please provide all information.');
        }
      } 
    }
  }
</script>