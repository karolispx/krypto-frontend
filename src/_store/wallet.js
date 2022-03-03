import {config, requestHeader} from "../_helpers";
import axios from 'axios'

export const wallet = {
    namespaced: true,
    state: {
        wallets: []
    },
    actions: {
        getWallets( { commit } ) {
            commit('getWalletsRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/wallets',
                    method: 'GET',
                    headers: requestHeader(true),
                }).then(response => {

                    let requestResponse = response.data;
   
                    commit('getWalletsSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                  console.log(error)

                  let errorMessage = config.defaultMessages.error;

                  if ( error.response && error.response.data.response ) {
                      errorMessage = error.response.data.response;
                  }

                  commit('getWalletsRequest');

                  reject(errorMessage);
                });
            })
        },

        createWallet( context, { name, address, blockchain } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/wallets',
                    method: 'POST',
                    headers: requestHeader(true),
                    data: {
                        name: name,
                        address: address,
                        blockchain: blockchain
                    }
                }).then(response => {
                    resolve("Wallet has been added successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        editWallet( context, { id, name, address, blockchain } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/wallets/' + id,
                    method: 'POST',
                    headers: requestHeader(true),
                    data: {
                        name: name,
                        address: address,
                        blockchain: blockchain
                    }
                }).then(response => {
                    resolve("Wallet has been edited successfully!");
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },

        deleteWallet( context, { id } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/wallets/' + id,
                    method: 'DELETE',
                    headers: requestHeader(true),
                }).then(response => {
                    resolve("Wallet has been deleted successfully!");
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
        getWalletsRequest(state) {
            state.wallets = [];
        },
        getWalletsSuccess(state, response) {
            state.wallets = response.wallets;
        }
    }
};