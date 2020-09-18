function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.entries(data).forEach(([key, value]) => defineReactive(data, key, value));
}

function defineReactive(data, key, value) {
  observe(value);
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    set(newValue) {
      value = newValue;
      // 通知
      dep.notify();
    },
    get() {
      // 订阅
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
  });
}

class Dep {
  subs = [];

  addSub = (sub) => this.subs.push(sub);

  notify = () => {
    this.subs.forEach((sub) => sub.update());
  };
}

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    this.value = this.get(); // 将自己添加到订阅器
  }

  update = () => {
    const value = this.vm.data[this.key];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  };

  get = () => {
    Dep.target = this; // 缓存自己
    const value = this.vm.data[this.key]; // 触发vm的getter， 将自己添加到订阅器
    Dep.target = null; // 释放自己
    return value;
  };
}

class MyVue {
  constructor(data, element, key) {
    this.data = data;
    observe(data);
    element.innerHTML = this.data[key]; // 初始化模板数据的值
    new Watcher(this, key, function (value) {
      element.innerHTML = value;
    });
  }
}
