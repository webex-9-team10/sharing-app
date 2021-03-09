
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueGeolocation from "vue-browser-geolocation";
import "./firebase.js"


Vue.config.productionTip = false;
Vue.use(VueGeolocation);

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBJC8CGqDDsWMkUFw2eNXxPjGCU0eJJJfg",
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
