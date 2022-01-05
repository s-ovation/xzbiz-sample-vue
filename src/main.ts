import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { SITE_NAME } from "./setting";

Vue.config.productionTip = false;

/**
 * 動作確認のため強制的にABテストを無効にしてます
 * 本番ではこの処理は行わないでください
 */
window.localStorage.setItem("closke_ab_test_id_key", "100");

/**
 * Vue初期化
 */

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
