<template>
    <page-loader v-if="pageLoader"></page-loader>

    <app-header></app-header>

    <main id="main" class="container">
      <app-alert></app-alert>

      <div id="main-content">

        <div class="card mt-4">
          <div class="card-header">
            <div class="row">
              <div class="col-md">
                
                <div class="row">
                  <div class="col-md">
                    <h4 class="card-title">Wallets</h4>
                  </div>

                  <div class="col-md text-right">
                    <button type="button" class="btn btn-primary" v-on:click="addWallet">Add Wallet</button>
                  </div>
                </div>

                <div v-if="wallets && wallets.length">
                  <div class="card mt-2" v-for="wallet in wallets" :key="wallet._id">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md">
                          <h5 class="card-title mb-1">{{ wallet.name }}</h5>
                          <p class="card-text mb-1">Address: <a :href="wallet.blockchain.scanurl + 'address/' + wallet.address" target="_blank">{{ wallet.address }}</a></p>
                          <p class="card-text"><small class="text-muted">Blockchain: {{ wallet.blockchain.name }}</small></p>
                        </div>

                        <div class="col-md text-right">
                          <div class="btn-group" role="group">
                            <button type="button" class="btn btn-sm btn-secondary" v-on:click="updateWallet(wallet)">Update</button>
                            <button type="button" class="btn btn-sm btn-danger" v-on:click="deleteWallet(wallet)">Delete</button>
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-md">
                          <div v-if="wallet.data && wallet.data.tokens && wallet.data.tokens.length">
                            <button type="button" class="btn btn-primary mb-2" v-on:click="viewWalletInformation(wallet)">Wallet Information</button>
                          </div>

                          <p v-else class="text-danger mb-0"><small>
                            This wallet has no tokens.
                          </small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div class="card mt-2">
                    <div class="card-body text-center">
                      <p class="mb-0">You do not have any wallets set up yet. Add some!</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <WalletInformationModal v-show="viewWalletData" :wallet="viewWalletData"/>
      <CreateWalletModal v-show="blockchains" :blockchains="blockchains" v-on:reload-wallets="loadWallets"/>
      <EditWalletModal v-show="editWalletData && blockchains" v-on:reload-wallets="loadWallets" :blockchains="blockchains" :wallet="editWalletData"/>
      <DeleteWalletModal v-show="deleteWalletData" v-on:reload-wallets="loadWallets" :wallet="deleteWalletData"/>

    </main>
</template>

<script>
import WalletInformationModal from '@/components/modals/wallets/WalletInformationModal.vue';
import CreateWalletModal from '@/components/modals/wallets/CreateWalletModal.vue';
import EditWalletModal from '@/components/modals/wallets/EditWalletModal.vue';
import DeleteWalletModal from '@/components/modals/wallets/DeleteWalletModal.vue';

export default {
  data() {
    return {
      viewWalletData: null,
      editWalletData: null,
      deleteWalletData: null
    }
  },

  components: {
    WalletInformationModal,
    CreateWalletModal,
    EditWalletModal,
    DeleteWalletModal
  },

  computed: {
    pageLoader() {
     return this.$store.state.loader.pageLoader
    },

    blockchains() {
      return this.$store.state.blockchain.blockchains
    },

    wallets() {
      return this.$store.state.wallet.wallets
    },

  },

  methods: {
    viewWalletInformation(wallet) {
      this.viewWalletData = wallet;

      $('.view-wallet-information-modal').modal('show');
    },

    addWallet() {
      $('.create-wallet-modal').modal('show');
    },

    updateWallet(wallet) {
      this.editWalletData = {
        id: wallet._id,
        name: wallet.name,
        address: wallet.address,
        blockchain: wallet.blockchain.slug
      };

      $('.edit-wallet-modal').modal('show');
    },

    deleteWallet(wallet) {
      this.deleteWalletData = wallet._id;

      $('.delete-wallet-modal').modal('show');
    },

    loadWallets() {
      console.log('loadWallets')
      this.$store.dispatch('loader/page', 'on');

      this.$store.dispatch('wallet/getWallets').then( response => {
        this.$store.dispatch('loader/page', 'off');

        console.log(response) 
      }, error => {
        this.$store.dispatch('loader/page', 'off');

        this.$store.dispatch('appAlert/error', error);

        console.log(error)
      }); 
    },

    loadBlockchains() {
      this.$store.dispatch('blockchain/getBlockchains').then( response => {}); 
    },

  },

  created() {
    this.loadWallets();
    this.loadBlockchains();
  }
}
</script>