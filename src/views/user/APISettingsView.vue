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
                        <h5 class="card-title">API Token and Endpoint</h5>


                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
</template>


<script>
export default {
  data() {
    return {

    }
  },

  computed: {
    pageLoader() {
      return this.$store.state.loader.pageLoader
    }
  },

  methods: {

  },

  mounted() {

  }
}
</script>

