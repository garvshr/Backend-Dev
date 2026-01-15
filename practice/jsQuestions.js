// Q1
// const obj = { a: "one", b: "two", a: "three" };
// console.log(obj);

//=>  


//Q2
// const a = {};
// const b = { key: "b" };
// const c = { key: "c" };

// a[b] = 123;
// a[c] = 456;

// console.log(a[b]);

var x = 10;
if (true) {
  var x = 20;
  console.log(x);
}
console.log(x);

let y = 10;
if (true) {
  let y = 20;
  console.log(y);
}
console.log(y);