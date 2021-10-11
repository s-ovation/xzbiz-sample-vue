import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { SITE_NAME } from "./setting";

Vue.config.productionTip = false;

/**
 * xzbiz各タグの読み込み
 * それぞれ一度だけ読み込まれるようにします
 */

// 手持ちから検索
const script1 = document.createElement("script");
script1.src = `https://dev-biz.xz-closet.jp/assets/tag-sample-site/tag-loader/xzbiz-script-loader.js?type=search&version=3.1.1&env=dev&site=${SITE_NAME}&initMode=manual`;
document.body.appendChild(script1);

// 商品詳細提案
const script2 = document.createElement("script");
script2.src = `https://dev-biz.xz-closet.jp/assets/tag-sample-site/tag-loader/xzbiz-script-loader.js?type=suggest&version=3.1.0&env=dev&site=${SITE_NAME}&initMode=manual`;
document.body.appendChild(script2);

// カート内提案
const script3 = document.createElement("script");
script3.src = `https://dev-biz.xz-closet.jp/assets/tag-sample-site/tag-loader/xzbiz-script-loader.js?type=cart&version=3.1.0&env=dev&site=${SITE_NAME}&initMode=manual`;
document.body.appendChild(script3);

// 購入完了
const script4 = document.createElement("script");
script4.src = `https://dev-biz.xz-closet.jp/assets/tag-sample-site/tag-loader/xzbiz-script-loader.js?type=purchase&version=3.1.0&env=dev&site=${SITE_NAME}&initMode=manual`;
document.body.appendChild(script4);

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
