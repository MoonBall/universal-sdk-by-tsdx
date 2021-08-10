let a = 100;
// exponentiation-operator，最低支持版本：v7
console.log(a ** 10);

// nullish-coalescing-operator，最低支持版本：v14
console.log(a ?? 33);

setTimeout(() => {
  a = 0;
}, 1000);
