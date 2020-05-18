// 髒值檢查：先保留舊值，出現新值，新值和舊值不一樣才更新
// vue：不停地監控新值
//angular：$watch, $apply, 更新的方式是手動更新， scope 的概念
function Scope() {}
Scope.prototype.$watch = function (exp, fn) {};
Scope.prototype.$apply = function () {};
let scope = new Scope();
scope.name = "jojo";
scope.$watch("name", function (newVal, oldVal) {
  console.log(newVal, oldVal);
});
scope.name = "coco";
scope.$apply();
