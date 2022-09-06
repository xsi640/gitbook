//布尔
var isDone = false;
var decLiteral = 6; //10进制
var hexLiteral = 0xf00d; //16进制
var binaryLiteral = 10; //二进制
var octalLiteral = 484; //八进制
//字符串
var name0 = "Gene";
var age = 37;
var sentence = "Hello, my name is " + name0;
//数组
var list = [1, 2, 3];
var list2 = [1, 2, 3];
//元祖
//declare a tuple type
var x;
x = ["hello", 10];
//x = [10, "Hello"];    //初始化错误
console.log(x[0].substr(1)); // OK
//console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
//枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
; //默认从0开始编号
//enum Color { Red = 1 Green, Blue }; //从1开始编号，也可手动赋值
var c = Color.Red;
var colorName = Color[2]; //索引器内的数字指向枚举的编号
//Any
var notSure = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
var prettySure = 4;
//prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
var list1 = [1, true, "free"];
list1[1] = 100;
//Void
function warnUser() {
    console.log("xxxxx");
}
var unusable = undefined;
// let unusable1: void = null;
//null和undefined
var u = undefined;
var n = null;
//never
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
