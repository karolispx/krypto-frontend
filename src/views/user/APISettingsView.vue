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
                <h4 class="card-title">API Settings</h4>

                <div class="card mt-4">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md">

                        <div class="row">
                          <div class="col-md">
                            <h5 class="card-title">API Endpoint Settings</h5>
                          </div>

                          <div v-if="APIEndpoint && APITokenSettings" class="col-md text-right">
                            <div class="btn-group" role="group">
                              <button type="button" class="btn btn-sm btn-primary" v-on:click="renewToken">Renew</button>
                              <button type="button" class="btn btn-sm btn-secondary" v-on:click="updateToken">Update</button>
                              <button type="button" class="btn btn-sm btn-danger" v-on:click="deleteToken">Delete</button>
                            </div>
                          </div>
                        </div>
                        
                        <div v-if="APIEndpoint && APITokenSettings">
                          <p>
                            <strong>API Token Settings: </strong>

                            <span v-if="APITokenSettings === 'portfolio'">
                              Portfolio Statistics
                            </span>

                            <span v-else>
                              {{ APITokenCryptoCurrency }} Price
                            </span>
                          </p>

                          <p><strong>Endpoint:</strong> <a :href="APIEndpoint" target="_blank">{{ APIEndpoint }}</a></p>

                          <hr class="mt-4 mb-4">

                          <div class="row mb-3">
                            <div class="col-md">
                             <h5 class="card-title">API Token Usage</h5>
                            </div>

                            <div class="col-md text-right">
                              <button type="button" class="btn btn-sm btn-danger" v-on:click="clearTokenUsage">Clear Usage</button>
                            </div>
                          </div>

                          <div v-if="APITokenUsage && APITokenUsage.length">
                            <div class="card mb-2" v-for="usage in APITokenUsage" :key="usage._id">
                              <div class="card-header">
                                <p class="mt-0 mb-0">
                                  <strong>User Agent:</strong> {{ usage.useragent }}<br>
                                  <strong>Host:</strong> {{ usage.host }}<br>
                                  <strong>Accessed:</strong> {{ usage.time }}<br>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div v-else>
                            <p>The endpoint has not been used yet.</p>
                          </div>
                        </div>

                        <div v-else>
                          <p>No token has been generated yet.</p>

                          <button type="button" class="btn btn-primary" v-on:click="generateToken">Generate Token</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GenerateTokenModal v-on:reload-settings="loadAPISettings"/>
      <EditTokenModal v-show="editTokenData" v-on:reload-settings="loadAPISettings" :token="editTokenData"/>
      <RenewTokenModal v-show="renewTokenData" v-on:reload-settings="loadAPISettings" :token="renewTokenData"/>
      <DeleteTokenModal v-show="deleteTokenData" v-on:reload-settings="loadAPISettings" :token="deleteTokenData"/>
      <ClearTokenUsageModal v-show="clearTokenUsageData" v-on:reload-settings="loadAPISettings" :token="clearTokenUsageData"/>

    </main>
</template>


<script>
import GenerateTokenModal from '@/components/modals/api-settings/GenerateTokenModal.vue';
import EditTokenModal from '@/components/modals/api-settings/EditTokenModal.vue';
import RenewTokenModal from '@/components/modals/api-settings/RenewTokenModal.vue';
import DeleteTokenModal from '@/components/modals/api-settings/DeleteTokenModal.vue';
import ClearTokenUsageModal from '@/components/modals/api-settings/ClearTokenUsageModal.vue';

export default {
  data() {
    return {
      editTokenData: null,
      renewTokenData: null,
      deleteTokenData: null,
      clearTokenUsageData: null,
    }
  },

  components: {
      GenerateTokenModal,
      EditTokenModal,
      RenewTokenModal,
      DeleteTokenModal,
      ClearTokenUsageModal,
  },

  computed: {
    pageLoader() {
      return this.$store.state.loader.pageLoader
    },

    APIEndpoint() {
      return this.$store.state.APISettings.endpoint
    },

    tokenID() {
      return this.$store.state.APISettings.tokenID
    },

    APITokenSettings() {
      return this.$store.state.APISettings.settings
    },

    APITokenCryptoCurrency() {
      return this.$store.state.APISettings.cryptocurrency
    },

    APITokenUsage() {
      return this.$store.state.APISettings.usage
    },
  },

  methods: {
    generateToken() {
      $('.generate-token-modal').modal('show');
    },

    renewToken() {
      this.renewTokenData = this.tokenID;

      $('.renew-token-modal').modal('show');
    },

    updateToken() {
      this.editTokenData = {
        id: this.tokenID,
        endpointType: "portfolio",
        symbol: ""
      };

      if (this.APITokenSettings !== "portfolio") {
        this.editTokenData.endpointType = "coin";
        this.editTokenData.symbol = this.APITokenSettings;
      }

      $('.edit-token-modal').modal('show');
    },

    deleteToken() {
      this.deleteTokenData = this.tokenID;

      $('.delete-token-modal').modal('show');
    },
    
    clearTokenUsage() {
      this.clearTokenUsageData = this.tokenID;

      $('.clear-token-usage-modal').modal('show');
    },

    loadAPISettings() {
      this.$store.dispatch('loader/page', 'on');

      this.$store.dispatch('APISettings/getAPIToken').then( response => {
        this.$store.dispatch('APISettings/getAPITokenUsage', { id: response._id }).then( response => {
          console.log(response)
        }, error => {
          console.log(error)
        });

        this.$store.dispatch('loader/page', 'off');
      }, error => {
        this.$store.dispatch('loader/page', 'off');

        console.log(error)
      });
    },
  },

  created() {
    this.loadAPISettings();
  }
}
</script>

