class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el); //有可能是 #app、document.query
    this.vm = vm;
    if (this.el) {
      // 如果能拿到元素，才開始編譯
      // 1.先把真實的 dom 放到記憶體 fragment
      // 2.編譯=>拿想要的元素節點 v-model 和 text node {{}}
      // 3.把編譯好的 fragment 再塞回到頁面
    }
  }
  // 輔助方法
  isElementNode(node) {
    return node.nodeType === 1;
  }
  // 核心方法
}
