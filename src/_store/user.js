import {config, requestHeader} from "../_helpers";
import axios from "axios/index";

export const user = {
    namespaced: true,
    state: {
        user: null
    },
    actions: {
        getAuthenticatedUser( { commit } ) {
            commit('getAuthenticatedUserRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/users/me',
                    method: 'GET',
                    crossDomain: true,
                    headers: requestHeader(true)
                }).then(response => {
                    let requestResponse = response.data;

                    commit('getAuthenticatedUserSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.response ) {
                        errorMessage = error.response.data.response;
                    }

                    commit('getAuthenticatedUserError');

                    reject(errorMessage);
                });
            })
        }
    },
    mutations: {
      getAuthenticatedUserRequest(state) {
        state.user = null;
      },
      getAuthenticatedUserSuccess(state, response) {
        state.user = response;
      },
      getAuthenticatedUserError(state) {
          state.user = null;
      }
    }
};