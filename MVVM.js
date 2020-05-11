class MVVM {
  constructor(options) {
    // 把可以用的東西掛載在實例上
    this.$el = options.el;
    this.$data = options.data;

    // 如果有需要編譯的模版，就開始編譯
    if (this.$el) {
      // 用數據和元素進行編譯
      new Compile(this.$el, this);
    }
  }
}
