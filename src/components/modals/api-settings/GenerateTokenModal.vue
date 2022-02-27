<template>
  <div class="modal fade generate-token-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Generate Token</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="generateTokenForm">
          <div class="modal-body">
            <modal-alert></modal-alert>

            <div class="form-group">
              <label for="endpointType">Endpoint Type</label>

              <select v-model="endpointType" :disabled="modalLoader" class="form-control" name="endpointType">
                <option disabled value="">Please select type</option>
                <option value="portfolio">Portfolio Statistics</option>
                <option value="coin">Coin Price</option>
              </select>
            </div>

            <div v-if="endpointType && endpointType === 'coin'">
              <div class="form-group">
                <label for="symbol">Coin Symbol</label>
                <input :disabled="modalLoader" v-model="symbol" type="text" class="form-control" id="symbol" placeholder="i.e. btc, eth">
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitGenerateToken">Generate Token</button>
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
        endpointType: "",
        symbol: ''
      }
    },
    computed: {
      modalLoader() {
        return this.$store.state.loader.modalLoader;
      }
    },
    methods: {
      submitGenerateToken() {
        this.$store.dispatch('modalAlert/clear');

        if (this.endpointType && (this.endpointType === "portfolio" || this.endpointType === "coin")) {
          if (this.endpointType === "coin" && this.symbol === "") {
            this.$store.dispatch('modalAlert/error', 'Please provide all information.');
          } else {
            this.$store.dispatch('loader/modal', 'on');

            this.$store.dispatch('APISettings/generateToken', { type: this.endpointType, symbol: this.symbol } ).then( response => {
              this.$store.dispatch('loader/modal', 'off');

              this.$store.dispatch('appAlert/success', response);

              $('.generate-token-modal').modal('hide');

              this.endpointType = "";
              this.symbol = "";

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