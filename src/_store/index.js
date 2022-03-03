import { createStore } from 'vuex'

import { appAlert } from './app-alert';
import { modalAlert } from './modal-alert';
import { authentication } from './authentication';
import { loader } from './loader';
import { user } from './user';
import { dashboard } from './dashboard';
import { APISettings } from './api-settings';
import { alert } from './alert';
import { APIDashboard } from './api-dashboard';
import { blockchain } from './blockchain';
import { wallet } from './wallet';

export const store = createStore({
  modules: {
    appAlert,
    modalAlert,
    authentication,
    loader,
    user,
    dashboard,
    APISettings,
    alert,
    APIDashboard,
    blockchain,
    wallet
  }
})