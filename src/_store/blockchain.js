import {config, requestHeader} from "../_helpers";
import axios from 'axios'

export const blockchain = {
    namespaced: true,
    state: {
        blockchains: []
    },
    actions: {
        getBlockchains( { commit } ) {
            commit('getBlockchainsRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/blockchains',
                    method: 'GET',
                    headers: requestHeader(true),
                }).then(response => {

                    let requestResponse = response.data;
   
                    commit('getBlockchainsSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                  console.log(error)

                  let errorMessage = config.defaultMessages.error;

                  if ( error.response && error.response.data.response ) {
                      errorMessage = error.response.data.response;
                  }

                  commit('getBlockchainsRequest');

                  reject(errorMessage);
                });
            })
        }
    },
    mutations: {
        getBlockchainsRequest(state) {
            state.blockchains = [];
        },
        getBlockchainsSuccess(state, response) {
            state.blockchains = response.blockchains;
        }
    }
};