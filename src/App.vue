<template>
  <div id="app">
    <img :src="logoImg" />
    <router-view />
  </div>
</template>

<script>
import logo from './assets/images/logo.png';

export default {
  name: 'App',
  data() {
    return {
      logoImg: logo,
    };
  },
};
</script>

<style></style>
