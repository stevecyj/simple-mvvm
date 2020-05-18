class MVVM {
  constructor(options) {
    // 把可以用的東西掛載在實例上
    this.$el = options.el;
    this.$data = options.data;

    // 如果有需要編譯的模版，就開始編譯
    if (this.$el) {
      // 數據攔截，把物件的所有屬性改成 get 和 set 方法
      new Observer(this.$data);
      this.proxyData(this.$data);
      // 用數據和元素進行編譯
      new Compile(this.$el, this);
    }
  }
  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        },
      });
    });
  }
}
