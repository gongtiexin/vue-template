<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "HelloWorld",
  mounted() {
    setTimeout(() => this.getDemoMsg(), 1000);
  },
  data() {
    return {
      // msg: this.$store.state.demo.data,
    };
  },
  computed: {
    localComputed() {
      /* ... */
    },
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      // 箭头函数可使代码更简练，传字符串参数 'count' 等同于 `state => state.count`
      msg: ({ demo: { msg } }) => msg,
    }),
  },
  methods: {
    ...mapActions([
      "getDemoMsg", // 将 `this.getDemoMsg()` 映射为 `this.$store.dispatch('getDemoMsg')`
    ]),
    ...mapActions({
      getMsg: "getDemoMsg", // 将 `this.getMsg()` 映射为 `this.$store.dispatch('getDemoMsg')`,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
