<template>
  <div class="modal fade view-wallet-information-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Wallet Information</h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div v-show="wallet">
          <div class="modal-body">
            <modal-alert></modal-alert>

            <div v-if="wallet && wallet.data && wallet.data.tokens && wallet.data.tokens.length">
              <p>Below is a list of tokens that are in your wallet.</p>

              <div class="table-responsive mt-3">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Symbol</th>
                      <th scope="col">Balance</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="token in wallet.data.tokens" :key="token.symbol">
                      <td>{{ token.symbol }}</td>
                      <td>{{ token.balance }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p v-else class="text-danger mb-0"><small>
              This wallet has no tokens.
            </small></p>
          </div>
        </div>

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
    }
  }
</script>