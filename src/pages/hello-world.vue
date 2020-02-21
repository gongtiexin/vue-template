<template>
  <div class="hello-world">
    <div v-for="(item, index) in news" :key="index" class="news-item">
      <div class="news-title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      news: state => state.demo.news,
    }),
  },
  mounted() {
    this.getNews();
    setTimeout(() => console.log(this), 5000);
  },
  methods: {
    ...mapActions(['getNews']),
  },
};
</script>

<style lang="less" type="text/less">
.news-item {
  border: 1px solid #f00;

  .news-title {
    background-color: #0f0;
  }
}
</style>
