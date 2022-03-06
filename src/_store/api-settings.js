import {config, requestHeader} from "../_helpers";
import axios from 'axios'

export const APISettings = {
    namespaced: true,
    state: {
        endpoint: null,
        tokenID: null,
        settings: null,
        cryptocurrency: null,
        usage: []
    },
    actions: {

        getAPIToken( { commit } ) {
            commit('getAPITokenRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/token',
                    method: 'GET',
                    headers: requestHeader(true),
                }).then(response => {

                    let requestResponse = response.data;
   
                    commit('getAPITokenSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                  console.log(error)

                  let errorMessage = config.defaultMessages.error;

                  if ( error.response && error.response.data.response ) {
                      errorMessage = error.response.data.response;
                  }

                  commit('getAPITokenRequest');

                  reject(errorMessage);
                });
            })
        },

        generateToken( { commit }, data ) {
            return new Promise((resolve, reject) => {
                let generateTokenForm = {
                    portfolio: true,
                    coin: null
                }

                if (data && data.type && data.symbol && data.type === "coin") {
                    generateTokenForm = {
                        portfolio: false,
                        coin: data.symbol
                    }
                }

                axios({
                    url: config.apiUrl + '/users/me/token',
                    method: 'POST',
                    headers: requestHeader(true),
                    data: generateTokenForm
                }).then(response => {
                    resolve("Token has been generated successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },
        
        updateToken( { commit }, data ) {
            return new Promise((resolve, reject) => {
                let generateTokenForm = {
                    portfolio: true,
                    coin: null
                }

                if (data && data.type && data.symbol && data.type === "coin") {
                    generateTokenForm = {
                        portfolio: false,
                        coin: data.symbol
                    }
                }

                axios({
                    url: config.apiUrl + '/users/me/token/' + data.id,
                    method: 'POST',
                    headers: requestHeader(true),
                    data: generateTokenForm
                }).then(response => {
                    resolve("Token has been updated successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        renewToken( context, { id } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/token/' + id + '/renew',
                    method: 'POST',
                    headers: requestHeader(true),
                }).then(response => {
                    resolve("Token has been renewed successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        deleteToken( context, { id } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/token/' + id,
                    method: 'DELETE',
                    headers: requestHeader(true),
                }).then(response => {
                    resolve("Token has been deleted successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        getAPITokenUsage( { commit }, data ) {
            commit('getAPITokenUsageRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/token/'+ data.id +'/usage',
                    method: 'GET',
                    headers: requestHeader(true),
                }).then(response => {
                    let requestResponse = response.data;
   
                    commit('getAPITokenUsageSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                  console.log(error)

                  let errorMessage = config.defaultMessages.error;

                  if ( error.response && error.response.data.response ) {
                      errorMessage = error.response.data.response;
                  }

                  commit('getAPITokenUsageRequest');

                  reject(errorMessage);
                });
            })
        },

        clearTokenUsage( context, { id } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/token/' + id + '/usage',
                    method: 'DELETE',
                    headers: requestHeader(true),
                }).then(response => {
                    resolve("Token usage has been cleared successfully!");
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
        getAPITokenRequest(state) {
            state.endpoint = null;
            state.tokenID = null;
            state.settings = null;
            state.cryptocurrency = null;
        },
        getAPITokenSuccess(state, response) {
            state.endpoint = config.appUrl + "dashboard/" + response.token;
            state.tokenID = response._id;
            state.settings = response.settings;

            if (response.cryptocurrency) {
                state.cryptocurrency = response.cryptocurrency;
            }
        },

        getAPITokenUsageRequest(state) {
            state.usage = [];
        },
        getAPITokenUsageSuccess(state, response) {
            state.usage = response;
        }
    }
};