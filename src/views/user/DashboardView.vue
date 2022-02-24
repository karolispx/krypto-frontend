<template>
    <app-header></app-header>

    <main id="main" class="container">
      <app-alert></app-alert>

      <div id="main-content">

        <div class="card">
          <div class="card-header">

            <div class="row" v-if="portfolioStatistics && portfolioStatistics.time">
              <div class="col-md">
                <span>Total Value</span>
                <h4 class="text-primary">€{{portfolioStatistics.value}}</h4>
              </div>

              <div class="col-md text-center">
                <span>Cost Basis</span>
                <h4 class="text-muted">€{{portfolioStatistics.cost}}</h4>
              </div>

              <div class="col-md text-right">
                <span>Unrealized Gains</span>
                <h4 class="text-muted">€{{portfolioStatistics.gains}}</h4>
              </div>
            </div>

            <p v-else class="mb-0 text-center">No data to show yet. Add some coins!</p>

            <div v-if="chart && chart.length" class="card mt-4">
              <div class="card-body">
                <p>Chart</p>
              </div>
            </div>

            <p v-if="portfolioStatistics && portfolioStatistics.time" class="text-right mt-2 mb-0">Last updated: {{portfolioStatistics.time}}</p>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <div class="row">
              <div class="col-md">
                <p>Holdings</p>
              </div>

              <div class="col-md text-right">
                <button class="btn btn-primary">Add Coin</button>
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
                      <th scope="col">ROI</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="coin in coins" :key="coin._id">
                      <td>{{coin.cryptocurrency.name}}</td>
                      <td>{{coin.balance}}</td>
                      <td>{{coin.cost}}</td>
                      <td>ROI</td>
                      <td>{{coin.value}}</td>
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
    </main>
</template>

<script>
export default {
  computed: {
    portfolioStatistics() {
      return this.$store.state.dashboard.portfolioStatistics
    },

    chart() {
      return this.$store.state.dashboard.chart
    },

    coins() {
      return this.$store.state.dashboard.coins
    },
  },

  mounted() {
    this.$store.dispatch('loader/page', 'on');

    this.$store.dispatch('dashboard/getPortfolioStatistics').then( response => {
      this.$store.dispatch('dashboard/getCoins').then( response => {
        this.$store.dispatch('loader/page', 'off');
      }, error => {
        this.$store.dispatch('loader/page', 'off');

        this.$store.dispatch('alert/error', error);

        console.log(error)
      }); 

    }, error => {
      this.$store.dispatch('loader/page', 'off');

      this.$store.dispatch('alert/error', error);

      console.log(error)
    }); 
  }
}
</script>