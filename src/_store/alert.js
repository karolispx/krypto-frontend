import {config, requestHeader} from "../_helpers";
import axios from 'axios'

export const alert = {
    namespaced: true,
    state: {
        alerts: [],
    },
    actions: {
        getAlerts( { commit } ) {
            commit('getAlertsRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/alerts',
                    method: 'GET',
                    headers: requestHeader(true),
                }).then(response => {
                    let requestResponse = response.data;

                    commit('getAlertsSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                  console.log(error)

                  let errorMessage = config.defaultMessages.error;

                  if ( error.response && error.response.data.response ) {
                      errorMessage = error.response.data.response;
                  }

                  commit('getAlertsRequest');

                  reject(errorMessage);
                });
            })
        },

        createAlert( context, { notify, symbol, rule, number } ) {
            return new Promise((resolve, reject) => {
                let createAlertForm = {
                    notify: "portfolio",
                    rule: rule,
                    number: number
                }

                if (notify && symbol && notify === "coin") {
                    createAlertForm.notify = symbol;
                }

                axios({
                    url: config.apiUrl + '/users/me/alerts',
                    method: 'POST',
                    headers: requestHeader(true),
                    data: createAlertForm
                }).then(response => {
                    resolve("Alert has been created successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        editAlert( context, { id, notify, symbol, rule, number } ) {
            return new Promise((resolve, reject) => {
                let editAlertForm = {
                    notify: "portfolio",
                    rule: rule,
                    number: number
                }

                if (notify && symbol && notify === "coin") {
                    editAlertForm.notify = symbol;
                }

                axios({
                    url: config.apiUrl + '/users/me/alerts/' + id,
                    method: 'POST',
                    headers: requestHeader(true),
                    data: editAlertForm
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
        
        resetAlert( context, { id } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/alerts/' + id + '/refresh',
                    method: 'POST',
                    headers: requestHeader(true),
                }).then(response => {
                    resolve("Alert has been reset successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        deleteAlert( context, { id } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me/alerts/' + id,
                    method: 'DELETE',
                    headers: requestHeader(true),
                }).then(response => {
                    resolve("Alert has been deleted successfully!");
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
        getAlertsRequest(state) {
            state.alerts = [];
        },
        getAlertsSuccess(state, response) {
            state.alerts = response.alerts;
        }
    }
};