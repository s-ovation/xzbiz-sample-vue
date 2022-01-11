<template>
  <div>
    <h2>カート内提案</h2>
    <div>productId: {{ pId }}</div>

    <!-- xz biz 設置用コンテナ -->
    <div class="xzbiz-content-cart" style="display: none;"></div>

    <!-- prettier-ignore -->
    <p>コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br /></p>
    <!-- prettier-ignore -->
    <p>コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br /></p>
    <!-- prettier-ignore -->
    <p>コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br /></p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { XzBizController } from "@/interface";
import { API_KEY, ENC_EC_USER_ID, SITE_NAME } from "@/setting";
import { intervalCheck } from "@/utils/util";

declare const window: any;

@Component({
  components: {},
})
export default class Cart extends Vue {
  xzBizController: XzBizController | null = null;
  pId = "";

  mounted(): void {
    console.log("cart page created!");

    intervalCheck(
      // チェック内容
      () => {
        // タグの読み込みこまれてwindowへのxzbizオブジェクトの設定が完了しているかどうか
        return window.xzbiz && window.xzbiz.cart && window.xzbiz.cart.init;
      },
      // チェックがパスしたらこのメソッドを実行
      () => {
        this.initXzBiz();
      },
      200, // チェック間隔 (ms)
      5 // チェック上限回数
    );
  }

  initXzBiz(): void {
    const pId = this.$route.params.id;
    this.pId = pId;

    const initParams = {
      apiKey: API_KEY,
      site: SITE_NAME,
      encEcUserId: ENC_EC_USER_ID,
      mountTargetId: ".xzbiz-content-cart",
      productIdList: [pId],
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
        tagLoaded: () => {
          // console.log("user event handler: cart: tagLoaded");
        },
        beforeLeave: () => {
          // console.log("user event handler: cart: beforeLeave");
        },
        noContent: () => {
          // console.log("user event handler: cart: noContent");
        },
        hasContent: () => {
          // console.log("user event handler: cart: hasContent");
        },
      },
    };

    window.xzbiz.cart.init(initParams).then((controller: XzBizController) => {
      this.xzBizController = controller;
    });
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
