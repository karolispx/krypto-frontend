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
                    <h4 class="card-title">Alerts</h4>
                  </div>

                  <div class="col-md text-right">
                    <button type="button" class="btn btn-primary" v-on:click="addAlert">Add Alert</button>
                  </div>
                </div>

                <div v-if="alerts && alerts.length">
                  <div class="card mt-2" v-for="alert in alerts" :key="alert._id">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md">
                          <p class="mb-0">
                            <strong>Notify when {{ getNotifyText(alert.notify) }} {{ getRuleText(alert.rule) }} {{ currencyFilter(alert.number) }}</strong>
                            <span class="text-danger" v-if="alert.fired"><br>This alert has been fired.</span>
                          </p>
                        </div>

                        <div class="col-md text-right">
                          <div class="btn-group" role="group">
                            <button :disabled="alert.fired === false" type="button" class="btn btn-sm btn-primary" v-on:click="resetAlert(alert)">Reset</button>
                            <button type="button" class="btn btn-sm btn-secondary" v-on:click="updateAlert(alert)">Update</button>
                            <button type="button" class="btn btn-sm btn-danger" v-on:click="deleteAlert(alert)">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div class="card mt-2">
                    <div class="card-body text-center">
                      <p class="mb-0">You do not have any alerts set up yet. Add some!</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateAlertModal v-on:reload-alerts="loadAlerts"/>
      <EditAlertModal v-show="editAlertData" v-on:reload-alerts="loadAlerts" :alert="editAlertData"/>
      <ResetAlertModal v-show="resetAlertData" v-on:reload-alerts="loadAlerts" :alert="resetAlertData"/>
      <DeleteAlertModal v-show="deleteAlertData" v-on:reload-alerts="loadAlerts" :alert="deleteAlertData"/>

    </main>
</template>


<script>
import CreateAlertModal from '@/components/modals/alerts/CreateAlertModal.vue';
import EditAlertModal from '@/components/modals/alerts/EditAlertModal.vue';
import ResetAlertModal from '@/components/modals/alerts/ResetAlertModal.vue';
import DeleteAlertModal from '@/components/modals/alerts/DeleteAlertModal.vue';

export default {
  data() {
    return {
      editAlertData: null,
      resetAlertData: null,
      deleteAlertData: null,
    }
  },

  components: {
    CreateAlertModal,
    EditAlertModal,
    ResetAlertModal,
    DeleteAlertModal,
  },

  computed: {
    currencyFilter() {
      return (value)=>{
        if (typeof value !== "number") {
            return value;
        }

        var formatter = new Intl.NumberFormat('en-IE', {
            style: 'currency',
            currency: 'EUR'
        });

        return formatter.format(value);
      }
    },

    getNotifyText() {
      return (notify)=>{
        if (notify === "portfolio") {
          return "Portfolio Value";
        } else {
          return notify.toUpperCase() + " Price";
        }
      }
    },

    getRuleText() {
      return (rule)=>{
        if (rule === "lt") {
          return "less than";
        } else if (rule === "gt") {
          return "greater than";
        } else {
          return "equals";
        }
      }
    },

    pageLoader() {
      return this.$store.state.loader.pageLoader
    },

    alerts() {
      return this.$store.state.alert.alerts
    },

  },

  methods: {
    addAlert() {
      $('.create-alert-modal').modal('show');
    },

    updateAlert(alert) {
      this.editAlertData = {
        id: alert._id,
        rule: alert.rule,
        number: alert.number
      };

      if (alert.notify === "portfolio") {
        this.editAlertData.notify = "portfolio";
        this.editAlertData.symbol = "";
      } else {
        this.editAlertData.notify = "coin";
        this.editAlertData.symbol = alert.notify;
      }

      $('.edit-alert-modal').modal('show');
    },

    resetAlert(alert) {
      this.resetAlertData = alert._id;

      $('.reset-alert-modal').modal('show');
    },

    deleteAlert(alert) {
      this.deleteAlertData = alert._id;

      $('.delete-alert-modal').modal('show');
    },

    loadAlerts() {
      this.$store.dispatch('loader/page', 'on');

      this.$store.dispatch('alert/getAlerts').then( response => {
        this.$store.dispatch('loader/page', 'off');
      }, error => {
        this.$store.dispatch('loader/page', 'off');

        console.log(error)
      });
    },
  },

  created() {
    this.loadAlerts();
  }
}
</script>

