<template>
  <div>
    <h2>商品詳細提案</h2>
    <div>modelCd:{{ modelCd }}</div>

    <!-- xz biz 設置用コンテナ -->
    <div class="xzbiz-content-suggest" style="display: none;"></div>

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
export default class Suggest extends Vue {
  xzBizController: XzBizController | null = null;
  modelCd = "";

  mounted(): void {
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
    const modelCd = this.$route.params.id;
    this.modelCd = modelCd;

    const initParams = {
      apiKey: API_KEY,
      site: SITE_NAME,
      mountTargetId: ".xzbiz-content-suggest",
      encEcUserId: ENC_EC_USER_ID,
      modelCd,
      useHistoryAPI: false,
      defaultBeforeUnloadHandler: false,
      eventHandlers: {
        tagLoaded: () => {
          // console.log("user event handler: suggest: tagLoaded");
        },
        beforeLeave: () => {
          // console.log("user event handler: suggest: beforeLeave");
        },
        noContent: () => {
          // console.log("user event handler: suggest: noContent");
        },
        hasContent: () => {
          // console.log("user event handler: suggest: hasContent");
        },
      },
      testMode: true,
      debugMode: true,
    };

    window.xzbiz.suggest
      .init(initParams)
      .then((controller: XzBizController) => {
        this.xzBizController = controller;
      });
  }

  // vueライフサイクルイベント
  deactivated(): void {
    this.onLeaveXzBiz();
  }

  // vueライフサイクルイベント
  beforeDestroy(): void {
    this.onLeaveXzBiz();
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
