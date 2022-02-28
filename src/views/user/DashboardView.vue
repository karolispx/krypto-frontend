<template>
    <page-loader v-if="pageLoader"></page-loader>

    <app-header></app-header>

    <main id="main" class="container">
      <app-alert></app-alert>

      <div id="main-content">

        <div class="card" v-if="portfolioStatistics && portfolioStatistics.time">
          <div class="card-header">

            <div class="row">
              <div class="col-md">
                <h6 class="card-title">Total Value</h6>
                <h4 class="text-primary">{{ currencyFilter(portfolioStatistics.value) }}</h4>
              </div>

              <div class="col-md text-center">
                <h6 class="card-title">Cost Basis</h6>
                <h4 class="text-muted">{{ currencyFilter(portfolioStatistics.cost) }}</h4>
              </div>

              <div class="col-md text-right">
                <h6 class="card-title">Unrealized Gains</h6>
                <h4 class="text-success" v-bind:class="{ 'text-danger': (portfolioStatistics.gains < 0) }">{{ currencyFilter(portfolioStatistics.gains) }}</h4>
              </div>
            </div>

            <div v-if="chart && chart.time" class="card mt-4">
              <div class="card-body">

                <LineChart :chartData="chart" />
              </div>

              <div v-if="portfolioStatistics && portfolioStatistics.time" class="card-footer mt-2" style="border-top: 1px solid rgba(0,0,0,.125);">
                <div class="row">
                  <div class="col-md">
                    <p class="mb-0"><small>Chart last updated: {{chart.time}}</small></p>
                  </div>

                  <div class="col-md text-right">
                    <button type="button" class="btn btn-sm btn-secondary" v-on:click="forceChartReload">Force Chart Reload</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <div class="row">
              <div class="col-md">
                <h5 class="card-title">Assets</h5>
              </div>

              <div class="col-md text-right">
                <button type="button" class="btn btn-primary" v-on:click="openCreateCoinModal">Add Coin</button>
              </div>
            </div>

            <div v-if="coins && coins.length">
              <div class="table-responsive mt-3">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Coin</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Value</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="coin in coins" :key="coin._id">
                      <td>{{coin.cryptocurrency.name}}</td>
                      <td>{{coin.balance}}</td>
                      <td>{{currencyFilter(coin.cost)}}</td>
                      <td>{{currencyFilter(coin.value)}}</td>
                      <td class="text-center">
                        <div class="btn-group" role="group">
                          <button type="button" class="btn btn-sm btn-secondary" v-on:click="editCoin(coin)">Edit</button>
                          <button type="button" class="btn btn-sm btn-danger" v-on:click="deleteCoin(coin)">Delete</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-else>
              <hr>
              <p class="mb-0 text-center">No data to show yet. Add some coins!</p>
            </div>
          </div>
        </div>
      </div>

      <CreateCoinModal v-on:reload-portfolio="loadPortfolio"/>
      <EditCoinModal v-show="editCoin" v-on:reload-portfolio="loadPortfolio" :coin="editCoinData"/>
      <DeleteCoinModal v-show="deleteCoin" v-on:reload-portfolio="loadPortfolio" :coin="deleteCoinData"/>
    </main>
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

import CreateCoinModal from '@/components/modals/dashboard/CreateCoinModal.vue';
import EditCoinModal from '@/components/modals/dashboard/EditCoinModal.vue';
import DeleteCoinModal from '@/components/modals/dashboard/DeleteCoinModal.vue';

export default {
  data() {
    return {
      editCoinData: null,
      deleteCoinData: null,
    }
  },

  components: {
      LineChart,
      CreateCoinModal,
      EditCoinModal,
      DeleteCoinModal
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

    pageLoader() {
      return this.$store.state.loader.pageLoader
    },

    portfolioStatistics() {
      return this.$store.state.dashboard.portfolioStatistics
    },

    chart() {
      return this.$store.state.dashboard.chart
    },

    coins() {
      return this.$store.state.dashboard.coins
    }
  },

  methods: {
    editCoin(value) {
      this.editCoinData = {
        id: value._id,
        name: value.cryptocurrency.name,
        balance: value.balance,
        cost: value.cost
      };

      $('.edit-coin-modal').modal('show');
    },

    deleteCoin(value) {
      this.deleteCoinData = {
        id: value._id,
        name: value.cryptocurrency.name
      };

      $('.delete-coin-modal').modal('show');
    },

    openCreateCoinModal() {
      $('.create-coin-modal').modal('show');
    },

    forceChartReload() {
      this.loadPortfolio(true);
    },

    loadPortfolio(force = false) {
      this.$store.dispatch('loader/page', 'on');

      this.$store.dispatch('dashboard/getPortfolioStatistics', { force: force }).then( response => {
        this.$store.dispatch('dashboard/getCoins').then( response => {
          this.$store.dispatch('loader/page', 'off');
        }, error => {
          this.$store.dispatch('loader/page', 'off');

          this.$store.dispatch('appAlert/error', error);

          console.log(error)
        }); 
      }, error => {
        this.$store.dispatch('loader/page', 'off');

        this.$store.dispatch('appAlert/error', error);

        console.log(error)
      }); 
    }
  },

  mounted() {
    this.loadPortfolio();
  }
}
</script>