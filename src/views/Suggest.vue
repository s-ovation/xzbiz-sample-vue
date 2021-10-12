<template>
  <div>
    <h2>商品詳細提案</h2>

    <!-- xz biz 設置用コンテナ -->
    <div class="xzbiz-content-suggest"></div>
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
export default class Suggest extends Vue {
  xzBizController: XzBizController | null = null;

  mounted(): void {
    console.log("suggest page created!");

    intervalCheck(
      // チェック内容
      () => {
        // タグの読み込みこまれてwindowへのxzbizオブジェクトの設定が完了しているかどうか
        return (
          window.xzbiz && window.xzbiz.suggest && window.xzbiz.suggest.init
        );
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
    const initParams = {
      apiKey: API_KEY,
      site: SITE_NAME,
      mountTargetId: ".xzbiz-content-suggest",
      encEcUserId: ENC_EC_USER_ID,
      modelCd: "1280100000014",
      useHistoryAPI: false,
      defaultBeforeUnloadHandler: false,
      eventHandlers: {
        tagLoaded: (params: any) => {
          console.log("user event handler: suggest: tagLoaded", params);
        },
        beforeLeave: (params: any) => {
          console.log("user event handler: suggest: beforeLeave", params);
        },
        noContent: (params: any) => {
          console.log("user event handler: suggest: noContent", params);
        },
        showContent: (params: any) => {
          console.log("user event handler: suggest: showContent", params);
        },
      },
      testMode: true,
      debugMode: true,
    };

    window.xzbiz.suggest
      .init(initParams)
      .then((controller: XzBizController) => {
        this.xzBizController = controller;
        this.onEnterXzBiz();
      });
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
  beforeDestroy(): void {
    this.onLeaveXzBiz();
  }

  // xz-biz 開始時
  // xz-bizのinitialize時, activated のタイミングで実行してください
  onEnterXzBiz(): void {
    if (this.xzBizController) {
      this.xzBizController.onBeforeEnter();
      console.log("suggest: enter");
    }
  }

  // xz-biz 離脱時
  // destroyed, deactivated のタイミングで実行してください
  onLeaveXzBiz(): void {
    if (this.xzBizController) {
      this.xzBizController.onBeforeLeave();
      console.log("suggest: leave");
    }
  }
}
</script>
