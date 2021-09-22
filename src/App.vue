<template>
  <div id="app">
    <h1>xzbiz sample</h1>
    <hr />

    <!-- 通常 -->
    <!-- <router-view /> -->

    <!-- keep-alive使用時 -->
    <keep-alive>
      <router-view />
    </keep-alive>

    <hr />
    <h3>menu</h3>
    <ul class="nav">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/search">手持ちから検索</router-link></li>
      <li><router-link to="/suggest">商品詳細提案</router-link></li>
      <li><router-link to="/cart">カート内提案</router-link></li>
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
