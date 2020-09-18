module.exports = {
  extends: ['alloy', 'alloy/vue'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // 自定义规则
    'vue/component-tags-order': 0,
  },
};
