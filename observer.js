class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    // 把 data 數據的屬性，改成 set 和 get 的形式
    if (!data || typeof data !== "object") {
      return;
    }
    // 將數據一一攔截，先取得 data 的 key 和 value
    Object.keys(data).forEach((key) => {
      // 攔截
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]); //深度遞迴攔截
    });
  }
  // 定義數據攔截
  defineReactive(obj, key, value) {
    // 在取得某個值的時候，(想做跳出彈跳視窗的效果)
    let that = this;
    let dep = new Dep(); //每個變化的數據，都會對應一個陣列，這個陣列存放所有更新的操作
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        //取值時調用的方法
        // todo......
        // alert("數據攔截");
        Dep.target && dep.addSub(Dep.target); //如果有就放進去
        return value;
      },
      set(newValue) {
        // 當對 data 屬性設置值的時候，更改取得的屬性值
        if (newValue != value) {
          //這裡的 this 不是實例
          that.observe(newValue); //如果是物件，繼續攔截
          value = newValue;
          dep.notify(); //通知所有人，數據更新了
        }
      },
    });
  }
}
class Dep {
  constructor() {
    // 訂閱的陣列
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}
