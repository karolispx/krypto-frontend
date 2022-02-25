export const loader = {
    namespaced: true,
    state: {
        pageLoader: false,
        modalLoader: false,
    },
    actions: {
        page({ commit }, action) {
            commit('page', action);
        },
        modal({ commit }, action) {
            commit('modal', action);
        },
    },
    mutations: {
        page(state, action) {
            if ( action == 'on' ) {
                state.pageLoader = true;
            } else {
                state.pageLoader = false;
            }
        },

        modal(state, action) {
            if ( action == 'on' ) {
                state.modalLoader = true;
            } else {
                state.modalLoader = false;
            }
        }
    }
};