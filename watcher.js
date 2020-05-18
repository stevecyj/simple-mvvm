// 觀察者的目的：對變化的元素增加觀察者，當數據變化後，執行對應的方法(監聽)
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 先取得舊值
    this.value = this.get();
  }
  getVal(vm, expr) {
    //取得實例上對應的數據
    expr = expr.split("."); //[c,s,a,w,r,.....]，先轉成陣列
    return expr.reduce((prev, next) => {
      // vm.$data.a
      return prev[next];
    }, vm.$data);
  }
  get() {
    Dep.target = this;
    let value = this.getVal(this.vm, this.expr);
    Dep.target = null;
    return value;
  }
  // 對外暴露的方法
  update() {
    let newValue = this.getVal(this.vm, this.expr);
    let oldValue = this.value;
    if (newValue != oldValue) {
      this.cb(newValue); //調用 watch 的 callback
    }
  }
}
// 用新值和舊值比對，如果發生變化，就調用更新方法
// vm.$data expr

/* <input type="text" v-model="message"/>
對 input 加上觀察者
{message:1} 變成 {message:2}
input.value = message
 */
