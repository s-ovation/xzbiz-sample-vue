<template>
  <div>
    <h2>手持ちから検索</h2>

    <!-- xz biz 設置用コンテナ -->
    <div class="xzbiz-content-search" style="display: none;"></div>

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
import { intervalCheck } from "@/utils/util";
import { API_KEY, ENC_EC_USER_ID, SITE_NAME } from "@/setting";

declare const window: any;

@Component({
  components: {},
})
export default class Search extends Vue {
  xzBizController: XzBizController | null = null;

  mounted(): void {
    console.log("search page created!");

    intervalCheck(
      // チェック内容
      () => {
        // タグの読み込みこまれてwindowへのxzbizオブジェクトの設定が完了しているかどうか
        return window.xzbiz && window.xzbiz.search && window.xzbiz.search.init;
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
      encEcUserId: ENC_EC_USER_ID,
      gender: "women",
      mountTargetId: ".xzbiz-content-search",
      searchModalTriggerId: "#xzbiz_show_modal_btn",
      testMode: true,
      debugMode: true,
      useHistoryAPI: false,
      defaultBeforeUnloadHandler: false,
      eventHandlers: {
        tagLoaded: () => {
          // console.log("user event handler: search: tagLoaded");
        },
        beforeLeave: () => {
          // console.log("user event handler: search: beforeLeave");
        },
        noContent: () => {
          // console.log("user event handler: search: noContent");
        },
        hasContent: () => {
          // console.log("user event handler: search: hasContent");
        },
      },
    };

    window.xzbiz.search.init(initParams).then((controller: XzBizController) => {
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
      console.log("search: leave");
    }
  }
}
</script>
