import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
import VuetifyDialog from 'vuetify-dialog'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDgnJAC_A5CwDDHZhYG76i0Y54STAOdh-o',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    /// / If you want to set the version, you can do so:
    // v: '3.26',
  }
})

Vue.config.productionTip = false

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: 'AIzaSyCuv_FHv5O-f9nRGJ_X_7zs4nJ2W73pOpM',
  authDomain: 'haims-the-cafe.firebaseapp.com',
  projectId: 'haims-the-cafe',
  storageBucket: 'haims-the-cafe.appspot.com',
  messagingSenderId: '758436402418',
  appId: '1:758436402418:web:3334b72c6128d83c3e6c6b',
  measurementId: 'G-6EL4B4Q30M'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

firebase.auth().onAuthStateChanged((fu) => {
  store.commit('setFireUser', fu)
})

Vue.prototype.$firebase = firebase

export const Bus = new Vue()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
