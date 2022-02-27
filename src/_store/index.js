import { createStore } from 'vuex'

import { alert } from './alert';
import { modalAlert } from './modal-alert';
import { authentication } from './authentication';
import { loader } from './loader';
import { user } from './user';
import { dashboard } from './dashboard';
import { APISettings } from './api-settings';
import { APIDashboard } from './api-dashboard';

export const store = createStore({
  modules: {
    alert,
    modalAlert,
    authentication,
    loader,
    user,
    dashboard,
    APISettings,
    APIDashboard
  }
})