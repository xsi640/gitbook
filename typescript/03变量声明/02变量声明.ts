//解构数组
let input = [1, 2];
let [first, second] = input;
//等同于
// first = input[0];
// second = input[1];
console.log(first);     //1
console.log(second);    //2
[first, second] = [second, first];
console.log(first);     //2
console.log(second);    //1

let [first0, ...rest] = [1, 2, 3, 4];
console.log(first0); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]

let [, second0, , fourth] = [1, 2, 3, 4];
console.log(second0);   //outputs 2
console.log(fourth);    //outputs 4

//对象解构
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
console.log(o.a + " " + o.b); //outputs foo 12

({ a, b } = { a: "baz", b: 101 });
console.log(a + " " + b)    //outputs baz 101

//属性重命名
let { a: newName1, b: newName2 } = o;
//等同于
//let newName1 = o.a;
// let newName2 = o.b;

