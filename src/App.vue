<template>
  <div id="app">
    <h1><router-link to="/">xzbiz sample</router-link></h1>
    <hr />

    <!-- 通常 -->
    <!-- <router-view /> -->

    <!-- ページ遷移するたびにページが生成される場合 -->
    <router-view :key="$route.fullPath" />

    <!-- 一度訪れたページはキャッシュされる場合 -->
    <!-- <keep-alive>
      <router-view :key="$route.fullPath" />
    </keep-alive> -->

    <hr />
    <h3>menu</h3>
    <ul class="nav">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/suggest/1175703442">商品詳細提案A</router-link></li>
      <li><router-link to="/suggest/1628801548">商品詳細提案B</router-link></li>
      <li><router-link to="/suggest/1628800291">商品詳細提案C</router-link></li>
      <li><router-link to="/search">手持ちから検索</router-link></li>
      <li>
        <router-link to="/cart/0000000001392252">カート内提案A</router-link>
      </li>
      <li>
        <router-link to="/cart/0000000000868741">カート内提案B</router-link>
      </li>
      <li><router-link to="/purchase">購入完了</router-link></li>
    </ul>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  margin: 0;
  padding: 0;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
