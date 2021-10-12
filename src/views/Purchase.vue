<template>
  <div>
    <h2>購入完了</h2>
    <p>画面への表示は行われないので開発者ツールで通信内容をご確認ください</p>
    <p>api url: /api/1/item/purchase</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { API_KEY, ENC_EC_USER_ID, SITE_NAME } from "@/setting";
import { intervalCheck } from "@/utils/util";

declare const window: any;

@Component({
  components: {},
})
export default class Purchase extends Vue {
  mounted(): void {
    console.log("purchase page created!");

    intervalCheck(
      // チェック内容
      () => {
        // タグの読み込みこまれてwindowへのxzbizオブジェクトの設定が完了しているかどうか
        return (
          window.xzbiz && window.xzbiz.purchase && window.xzbiz.purchase.init
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

  initXzBiz() {
    const initParams = {
      debugMode: true,
      apiKey: API_KEY,
      site: SITE_NAME,
      encEcUserId: ENC_EC_USER_ID,
      orderId: "xxxxxxxxxxxxx",
      productList: [
        {
          productId: "123456789",
          unitPrice: 9999,
          taxIncludedPrice: 10999,
          quantity: 1,
        },
        {
          productId: "987654321",
          unitPrice: 1111,
          taxIncludedPrice: 1222,
          quantity: 2,
        },
      ],
    };

    window.xzbiz.purchase.init(initParams);
  }
}
</script>
