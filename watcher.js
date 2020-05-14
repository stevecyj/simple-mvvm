// 觀察者的目的：對變化的元素增加觀察者，當數據變化後，執行對應的方法(監聽)
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
  }
}
// 用新值和舊值比對，如果發生變化，就調用更新方法
// vm.$data expr
