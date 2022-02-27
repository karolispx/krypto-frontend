import {config, requestHeader} from "../_helpers";
import axios from 'axios'

export const APIDashboard = {
    namespaced: true,
    state: {
        dashboard: null
    },
    actions: {
        getAPIDashboard( { commit }, data ) {
            commit('getAPIDashboardRequest');

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/dashboard/'+ data.token,
                    method: 'GET',
                    headers: requestHeader(),
                }).then(response => {
                    let requestResponse = response.data;
   
                    commit('getAPIDashboardSuccess', requestResponse);

                    resolve(requestResponse);
                }).catch(error => {
                  console.log(error)

                  let errorMessage = config.defaultMessages.error;

                  if ( error.response && error.response.data.response ) {
                      errorMessage = error.response.data.response;
                  }

                  commit('getAPIDashboardRequest');

                  reject(errorMessage);
                });
            })
        }
    },
    mutations: {
        getAPIDashboardRequest(state) {
            state.dashboard = null;
        },
        getAPIDashboardSuccess(state, response) {
            state.dashboard = response;
        },
    }
};