import {config, requestHeader} from "../_helpers";
import axios from 'axios'

export const dashboard = {
    namespaced: true,
    state: {
        coins: [],
        portfolioStatistics: {
            value: 0,
            cost: 0,
            gains: 0,
            time: null
        },
        chart: null
    },
    actions: {
        getPortfolioStatistics( { commit } ) {
            commit('getPortfolioStatisticsRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/dashboard',
                    method: 'GET',
                    headers: requestHeader(true),
                }).then(response => {
                    let requestResponse = response.data;

                    commit('getPortfolioStatisticsSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                  console.log(error)

                  let errorMessage = config.defaultMessages.error;

                  if ( error.response && error.response.data.response ) {
                      errorMessage = error.response.data.response;
                  }

                  commit('getPortfolioStatisticsError');

                  reject(errorMessage);
                });
            })
        },

        getCoins( { commit } ) {
            commit('getCoinsRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/coins',
                    method: 'GET',
                    headers: requestHeader(true),
                }).then(response => {

                    let requestResponse = response.data;
   
                    commit('getCoinsSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                  console.log(error)

                  let errorMessage = config.defaultMessages.error;

                  if ( error.response && error.response.data.response ) {
                      errorMessage = error.response.data.response;
                  }

                  commit('getCoinsError');

                  reject(errorMessage);
                });
            })
        },
    },
    mutations: {
        getPortfolioStatisticsRequest(state) {
            state.portfolioStatistics = null;
            state.chart = null;
        },
        getPortfolioStatisticsSuccess(state, response) {
            state.portfolioStatistics = response.statistics;
            state.chart = response.chart;
        },
        getPortfolioStatisticsError(state) {
            state.portfolioStatistics = null;
            state.chart = null;
        },

        getCoinsRequest(state) {
            state.coins = [];
        },
        getCoinsSuccess(state, response) {
            state.coins = response.coins;
        },
        getCoinsStatisticsError(state) {
            state.coins = [];
        }
    }
};