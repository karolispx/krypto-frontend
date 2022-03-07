<template>
  <page-loader v-if="pageLoader"></page-loader>

  <main id="main" class="container">
    <app-alert></app-alert>
    
    <div v-if="dashboard && dashboard.coin && dashboard.price">
      <h2>Coin Price</h2>

      <h3>
        <strong>Coin: </strong> {{ dashboard.coin }}<br>
        <strong>Price: </strong> {{ currencyFilter(dashboard.price) }}
      </h3>

      <p>Refresh in: {{processTimer}}</p>
    </div>

    <div v-else-if="dashboard && dashboard.statistics">
      <h2>Portfolio Statistics</h2>

      <h4>
        <strong>Value: </strong> {{ currencyFilter(dashboard.statistics.value) }}<br>
        <strong>Cost: </strong> {{ currencyFilter(dashboard.statistics.cost) }}<br>
        <strong>Gains: </strong> {{ currencyFilter(dashboard.statistics.gains) }}<br>
      </h4>

      <p>Refresh in: {{processTimer}}</p>
    </div>
  </main>

</template>

<script>
  import AppLogo from '@/components/AppLogo.vue';

  export default {
    components: {
        AppLogo
    },

    data() {
      return {
        timer: 5000,
        refreshIn: 30000
      }
    },

    computed: {
      pageLoader() {
        return this.$store.state.loader.pageLoader
      },

      processTimer() {
        if (this.timer > 0) {
          return this.timer / 1000;
        }

        return this.timer
      },

      currencyFilter(){
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

      token() {
        return this.$route.params.token
      },

      dashboard() {
        return this.$store.state.APIDashboard.dashboard
      },
    },

    methods: {
      loadAPIDashboard() {
        this.$store.dispatch('loader/page', 'on');

        this.$store.dispatch('APIDashboard/getAPIDashboard', { token: this.token}).then( response => {
          this.$store.dispatch('loader/page', 'off');

          this.timer = this.refreshIn;
        }, error => {
          console.log(error)
          this.$store.dispatch('loader/page', 'off');

          this.$store.dispatch('appAlert/error', error);

          this.timer = this.refreshIn;

          console.log(error)
        });
      }
    },

    created() {
      this.loadAPIDashboard();

      window.setInterval(() => {
        if (this.timer === 0) {
          this.loadAPIDashboard();
        } else {
          this.timer-=1000;
        }
      }, 1000)
    },

    mounted() {
      $( document ).ready(function() {
          $('footer.footer').hide();
      });
    }
  }
</script>