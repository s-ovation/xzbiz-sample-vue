<template>
  <div>
    <h2>商品詳細提案</h2>
    <div>modelCd:{{ modelCd }}</div>
    <!-- prettier-ignore -->
    <p>コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br /></p>
    <!-- prettier-ignore -->
    <p>コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br /></p>
    <!-- prettier-ignore -->
    <p>コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br />コンテンツ<br /></p>

    <!-- xz biz 設置用コンテナ -->
    <div class="xzbiz-content-suggest"></div>
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
export default class Suggest extends Vue {
  xzBizController: XzBizController | null = null;
  modelCd = "";

  mounted(): void {
    console.log("suggest page created!");
    const tag = document.createElement("script");
    tag.src =
      "https://dev-biz.xz-closet.jp/assets/tag-sample-site/tag-loader/xzbiz-script-loader.js?type=suggest&version=3.1.5&env=dev&initMode=manual";
    document.body.appendChild(tag);

    tag.onload = () => {
      document.body.removeChild(tag);
      this.initXzBiz();
    };
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
      // eventHandlers: {
      //   tagLoaded: (params: any) => {
      //     console.log("user event handler: suggest: tagLoaded", params);
      //   },
      //   beforeLeave: (params: any) => {
      //     console.log("user event handler: suggest: beforeLeave", params);
      //   },
      //   noContent: (params: any) => {
      //     console.log("user event handler: suggest: noContent", params);
      //   },
      //   showContent: (params: any) => {
      //     console.log("user event handler: suggest: showContent", params);
      //   },
      // },
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
