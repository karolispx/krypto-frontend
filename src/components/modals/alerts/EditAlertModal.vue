<template>
  <div class="modal fade edit-alert-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Alert</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form ref="editAlertForm" v-if="alert">
          <div class="modal-body">
            <modal-alert></modal-alert>

            <div class="form-group">
              <label for="notify">Notify when</label>

              <select v-model="alert.notify" :disabled="modalLoader" class="form-control" name="notify">
                <option disabled value="">Please select</option>
                <option value="portfolio">Portfolio</option>
                <option value="coin">Coin</option>
              </select>
            </div>

            <div v-if="alert.notify && alert.notify === 'coin'">
              <div class="form-group">
                <label for="symbol">Coin Symbol</label>
                <input :disabled="modalLoader" v-model="alert.symbol" type="text" class="form-control" id="symbol" placeholder="i.e. btc, eth">
              </div>
            </div>

            <div class="form-group">
              <label for="rule">Rule</label>

              <select v-model="alert.rule" :disabled="modalLoader" class="form-control" name="rule">
                <option disabled value="">Please select</option>
                <option value="eq">Equals</option>
                <option value="lt">Less Than</option>
                <option value="gt">Greater Than</option>
              </select>
            </div>

            <div class="form-group">
              <label for="number">Number</label>

              <input :disabled="modalLoader" v-model="alert.number" type="number" class="form-control" id="number" placeholder="i.e. 3.14" step="any">
            </div>
          </div>

          <div class="modal-footer">
            <modal-loader v-if="modalLoader"></modal-loader>

            <button :disabled="modalLoader" type="button" class="btn btn-primary" v-on:click="submitEditAlert">Yes</button>
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
      submitEditAlert() {
        this.$store.dispatch('modalAlert/clear');

        if (this.alert.rule && this.alert.number && this.alert.notify && (this.alert.notify === "portfolio" || this.alert.notify === "coin")) {
          if (this.alert.notify === "coin" && this.alert.symbol === "") {
            this.$store.dispatch('modalAlert/error', 'Please provide coin information.');
          } else {
            if (this.alert.rule === "eq" || this.alert.rule === "lt" || this.alert.rule === "gt") {
              this.$store.dispatch('loader/modal', 'on');

              this.$store.dispatch('alert/editAlert', { id: this.alert.id, notify: this.alert.notify, symbol: this.alert.symbol, rule: this.alert.rule, number: this.alert.number } ).then( response => {
                this.$store.dispatch('loader/modal', 'off');

                this.$store.dispatch('appAlert/success', response);

                $('.edit-alert-modal').modal('hide');

                this.alert.notify = "";
                this.alert.symbol = "";
                this.alert.rule = "";
                this.alert.number = "";

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