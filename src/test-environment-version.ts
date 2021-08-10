let a = 100;
// exponentiation-operator
// node 最低支持版本：7
// Chrome 最低支持版本：52
console.log(a ** 10);

// nullish-coalescing-operator
// node 最低支持版本：14
// Chrome 最低支持版本：80
console.log(a ?? 33);

setTimeout(() => {
  a = 0;
}, 1000);
