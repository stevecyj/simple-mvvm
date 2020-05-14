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
      this.el.appendChild(fragment);
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
      // 判斷屬性 name 是否包含 v- //[v, model]
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // 取到對應的值放到節點的中
        let expr = attr.value;
        let [, type] = attrName.split("-"); //解構賦值
        // console.log(type);
        // node this.vm.$data expr，種類： v-model, v-text, v-html
        // todo ......
        CompileUtil[type](node, this.vm, expr);
      }
    });
  }
  compileText(node) {
    // 辨識帶 {{}}
    let expr = node.textContent; //取文本中的內容
    let reg = /\{\{([^}]+)\}\}/g; //{{a}} {{b}} {{c}}
    // console.log(text);
    if (reg.test(expr)) {
      //node this.vm.$data text
      // todo ......
      CompileUtil["text"](node, this.vm, expr);
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
CompileUtil = {
  getVal(vm, expr) {
    //取得實例上對應的數據
    expr = expr.split("."); //[c,s,a,w,r,.....]，先轉成陣列
    return expr.reduce((prev, next) => {
      // vm.$data.a
      return prev[next];
    }, vm.$data);
  },
  getTextVal(vm, expr) {
    //取得文本編譯後的結果
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1]);
    });
  },
  text(node, vm, expr) {
    // 文本處理
    let updateFn = this.updater["textUpdater"];
    // console.log(expr);
    // 把"message.a" 替換成=> hello world, just do it
    let value = this.getTextVal(vm, expr);
    console.log(value);
    updateFn && updateFn(node, value);
  },
  model(node, vm, expr) {
    // 輸入框處理
    let updateFn = this.updater["modelUpdater"];
    updateFn && updateFn(node, this.getVal(vm, expr));
  },
  updater: {
    // 文本更新
    textUpdater(node, value) {
      node.textContent = value;
    },
    // 輸入框更新
    modelUpdater(node, value) {
      node.value = value;
    },
  },
};
