<template>
  <div>
    <h2>手持ちから検索</h2>

    <!-- xz biz 設置用コンテナ -->
    <div class="xzbiz-content-search"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { XzBizController } from "@/interface";
import { API_KEY, ENC_EC_USER_ID, SITE_NAME } from "@/setting";

declare const window: any;

@Component({
  components: {},
})
export default class Search extends Vue {
  xzBizController: XzBizController | null = null;

  created(): void {
    console.log("search page created!");

    setTimeout(() => {
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
          tagLoaded: (params: any) => {
            console.log("user event handler: search: tagLoaded", params);
          },
          beforeLeave: (params: any) => {
            console.log("user event handler: search: beforeLeave", params);
          },
          noContent: (params: any) => {
            console.log("user event handler: search: noContent", params);
          },
          showContent: (params: any) => {
            console.log("user event handler: search: showContent", params);
          },
        },
      };

      // 万が一タグがロードできてない場合はここで終了
      if (!window.closke || !window.closke.search) {
        return;
      }

      window.closke.search
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
      console.log("search: enter");
    }
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
