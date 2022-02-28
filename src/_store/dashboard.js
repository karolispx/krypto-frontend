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
        getPortfolioStatistics( { commit }, data = false ) {
            commit('getPortfolioStatisticsRequest');

            let requestUrl = config.apiUrl + '/dashboard';

            if (data.force && data.force === true) {
                requestUrl += "/force"
            }
            
            return new Promise((resolve, reject) => {
                axios({
                    url: requestUrl,
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

        createCoin( context, { symbol, balance, cost } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/coins',
                    method: 'POST',
                    headers: requestHeader(true),
                    data: {
                        symbol: symbol,
                        balance: balance,
                        cost: cost
                    }
                }).then(response => {
                    resolve("Coin has been added successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        editCoin( context, { id, balance, cost } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/coins/' + id,
                    method: 'POST',
                    headers: requestHeader(true),
                    data: {
                        balance: balance,
                        cost: cost
                    }
                }).then(response => {
                    resolve("Coin has been edited successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        deleteCoin( context, { id } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/coins/' + id,
                    method: 'DELETE',
                    headers: requestHeader(true),
                }).then(response => {
                    resolve("Coin has been deleted successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

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
        getCoinsError(state) {
            state.coins = [];
        }


    }
};