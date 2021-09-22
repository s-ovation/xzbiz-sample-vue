<template>
  <div>
    <h2>カート内提案</h2>

    <!-- xz biz 設置用コンテナ -->
    <div class="xzbiz-content-cart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { XzBizController } from "@/interface";
import { API_KEY, ENC_EC_USER_ID } from "@/setting";

declare const window: any;

@Component({
  components: {},
})
export default class Cart extends Vue {
  xzBizController: XzBizController | null = null;

  created(): void {
    console.log("cart page created!");

    setTimeout(() => {
      const initParams = {
        apiKey: API_KEY,
        site: "andmall",
        encEcUserId: ENC_EC_USER_ID,
        mountTargetId: ".xzbiz-content-cart",
        productIdList: ["11500000009360001"],
        gender: "women",
        // season: 'summer',
        // age: 24,
        // height: 158,
        webviewMode: false,
        testMode: true,
        debugMode: true,
        useHistoryAPI: false,
        defaultBeforeLeaveHandler: false,
        eventHandlers: {
          tagLoaded: (params: any) => {
            console.log("user event handler: cart: tagLoaded", params);
          },
          beforeLeave: (params: any) => {
            console.log("user event handler: cart: beforeLeave", params);
          },
          noContent: (params: any) => {
            console.log("user event handler: cart: noContent", params);
          },
          showContent: (params: any) => {
            console.log("user event handler: cart: showContent", params);
          },
        },
      };

      // 万が一タグがロードできてない場合はここで終了
      if (!window.closke || !window.closke.cart) {
        return;
      }

      window.closke.cart
        .init(initParams)
        .then((controller: XzBizController) => {
          this.xzBizController = controller;
          this.onEnterXzBiz();
        });
    }, 300);
  }

  // vueライフサイクルイベント
  activated(): void {
    this.onEnterXzBiz();
  }

  // vueライフサイクルイベント

  deactivated(): void {
    this.onLeaveXzBiz();
  }

  // vueライフサイクルイベント

  // vueライフサイクルイベント
  beforeDestroy(): void {
    this.onLeaveXzBiz();
  }

  // xz-biz 開始時
  // xz-bizのinitialize時, activated のタイミングで実行してください
  onEnterXzBiz(): void {
    if (this.xzBizController) {
      this.xzBizController.onBeforeEnter();
      console.log("cart: enter");
    }
  }

  // xz-biz 離脱時
  // destroyed, deactivated のタイミングで実行してください
  onLeaveXzBiz(): void {
    if (this.xzBizController) {
      this.xzBizController.onBeforeLeave();
      console.log("cart: leave");
    }
  }
}
</script>
