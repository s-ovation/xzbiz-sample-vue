import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

/**
 * xzbiz各タグの読み込み
 * それぞれ一度だけ読み込まれるようにします
 */

// 手持ちから検索
const script1 = document.createElement("script");
script1.src =
  "https://dev-biz.xz-closet.jp/assets/tag-sample-site/tag-loader/xzbiz-script-loader.js?type=search&version=3.1.0&env=dev&site=andmall&initMode=manual";
document.body.appendChild(script1);

// 商品詳細提案
const script2 = document.createElement("script");
script2.src =
  "https://dev-biz.xz-closet.jp/assets/tag-sample-site/tag-loader/xzbiz-script-loader.js?type=suggest&version=3.1.0&env=dev&site=andmall&initMode=manual";
document.body.appendChild(script2);

// カート内提案
const script3 = document.createElement("script");
script3.src =
  "https://dev-biz.xz-closet.jp/assets/tag-sample-site/tag-loader/xzbiz-script-loader.js?type=cart&version=3.1.0&env=dev&site=andmall&initMode=manual";
document.body.appendChild(script3);

// 3つのロードが完了したらvueを初期化
// 失敗した場合も先の処理に進むように
let loadTotal = 0;
script1.onload = script2.onload = script3.onload = script1.onerror = script2.onerror = script3.onerror = function(
  event: any
) {
  const status = event.type === "error" ? "error" : "success";
  console.log(`script loaded: ${status}:`, (this as HTMLScriptElement).src);
  loadTotal++;

  if (loadTotal == 3) {
    initView();
  }
};

/**
 * 動作確認のため強制的にABテストを無効にしてます
 * 本番ではこの処理は行わないでください
 */
window.localStorage.setItem("closke_ab_test_id_key", "100");

/**
 * Vue初期化
 */
const initView = () => {
  console.log("all xz biz tag loaded!");
  console.log("init vue");

  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
};
