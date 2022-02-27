<template>
  <div class="modal fade create-alert-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Alert</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="createAlertForm">
          <div class="modal-body">
            <modal-alert></modal-alert>

            <div class="form-group">
              <label for="notify">Notify when</label>

              <select v-model="notify" :disabled="modalLoader" class="form-control" name="notify">
                <option disabled value="">Please select</option>
                <option value="portfolio">Portfolio</option>
                <option value="coin">Coin</option>
              </select>
            </div>

            <div v-if="notify && notify === 'coin'">
              <div class="form-group">
                <label for="symbol">Coin Symbol</label>
                <input :disabled="modalLoader" v-model="symbol" type="text" class="form-control" id="symbol" placeholder="i.e. btc, eth">
              </div>
            </div>

            <div class="form-group">
              <label for="rule">Rule</label>

              <select v-model="rule" :disabled="modalLoader" class="form-control" name="rule">
                <option disabled value="">Please select</option>
                <option value="eq">Equals</option>
                <option value="lt">Less Than</option>
                <option value="gt">Greater Than</option>
              </select>
            </div>

            <div class="form-group">
              <label for="number">Number</label>

              <input :disabled="modalLoader" v-model="number" type="number" class="form-control" id="number" placeholder="i.e. 3.14" step="any">
            </div>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitCreateAlert">Add Alert</button>
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
        notify: '',
        symbol: '',
        rule: "",
        number: "",
      }
    },
    computed: {
      modalLoader() {
        return this.$store.state.loader.modalLoader
      }
    },
    methods: {
      submitCreateAlert() {
        this.$store.dispatch('modalAlert/clear');

        if (this.rule && this.number && this.notify && (this.notify === "portfolio" || this.notify === "coin")) {
          if (this.notify === "coin" && this.symbol === "") {
            this.$store.dispatch('modalAlert/error', 'Please provide coin information.');
          } else {
            if (this.rule === "eq" || this.rule === "lt" || this.rule === "gt") {
              this.$store.dispatch('loader/modal', 'on');

              this.$store.dispatch('alert/createAlert', { notify: this.notify, symbol: this.symbol, rule: this.rule, number: this.number } ).then( response => {
                this.$store.dispatch('loader/modal', 'off');

                this.$store.dispatch('appAlert/success', response);

                $('.create-alert-modal').modal('hide');

                this.notify = "";
                this.symbol = "";
                this.rule = "";
                this.number = "";

                this.$emit('reload-alerts')
              }, error => {
                this.$store.dispatch('loader/modal', 'off');

                this.$store.dispatch('modalAlert/error', error);
              }); 
            } else {
              this.$store.dispatch('modalAlert/error', 'Please provide a valid rule.');
            }
          }
        } else {
          this.$store.dispatch('modalAlert/error', 'Please provide all information.');
        }
      } 
    }
  }
</script>