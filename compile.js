class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el); //有可能是 #app、document.query
    this.vm = vm;
    if (this.el) {
      // 如果能拿到元素，才開始編譯
      // 1.先把真實的 dom 移到記憶體 fragment，操作完再放回來
      let fragment = this.node2fragment(this.el);
      // 2.編譯=>拿想要的元素節點 v-model 和 文件節點 {{}}
      this.compile(fragment);
      // 3.把編譯好的 fragment 再塞回到頁面
    }
  }
  // 輔助方法
  isElementNode(node) {
    return node.nodeType === 1;
  }

  // 是否指令
  isDirective(name) {
    return name.includes("v-");
  }

  // 核心方法
  compileElement(node) {
    // 辨識帶 v-model
    let attrs = node.attributes; //取出當前節點的屬性
    // console.log(attrs);
    Array.from(attrs).forEach((attr) => {
      // 判斷屬性 name 是否包含 v-
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // 取到對應的值放到節點的中
        let expr = attr.value;
        // node this.vm.$data expr
        // todo ......
      }
    });
  }
  compileText(node) {
    // 辨識帶 {{}}
    let expr = node.textContent; //取文本中的內容
    let reg = /\{\{([^}]+)\}\}/g; //{{a}} {{b}} {{c}}
    // console.log(text);
    if (reg.text(expr)) {
      //node this.vm.$data expr
      // todo ......
    }
  }
  compile(fragment) {
    //需要遞迴
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach((node) => {
      if (this.isElementNode(node)) {
        // 是元素節點，還要繼續往下深入檢查
        //這裡需要編譯元素
        // console.log("element node:", node);
        this.compileElement(node);
        this.compile(node);
      } else {
        // 是文本節點
        // 這裡需要編譯文本
        // console.log("text node:", node);
        this.compileText(node);
      }
    });
    // console.log(childNodes);
  }

  node2fragment(el) {
    //將 el 中的內容全部放到記憶體中
    // 文件碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment; //記憶體中的節點
  }
}
