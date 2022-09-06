//布尔
let isDone: boolean = false;

let decLiteral: number = 6;         //10进制
let hexLiteral: number = 0xf00d;    //16进制
let binaryLiteral: number = 0b1010; //二进制
let octalLiteral: number = 0o744;   //八进制

//字符串
let name0: string = "Gene";
let age: number = 37;
let sentence: string = `Hello, my name is ${name0}`;

//数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

//元祖
//declare a tuple type
let x: [string, number];
x = ["hello", 10];
//x = [10, "Hello"];    //初始化错误
console.log(x[0].substr(1)); // OK
//console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

//枚举
enum Color { Red, Green, Blue };    //默认从0开始编号
//enum Color { Red = 1 Green, Blue }; //从1开始编号，也可手动赋值
let c: Color = Color.Red;
let colorName: string = Color[2];   //索引器内的数字指向枚举的编号

//Any
let notSure: any = 4
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
//prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

let list1: any[] = [1, true, "free"];
list1[1] = 100;

//Void
function warnUser(): void {
    console.log("xxxxx");
}

let unusable: void = undefined;
let unusable1: void = null;         //--strictNullChecks，Type 'null' is not assignable to type 'void'.

//null和undefined
let u: undefined = undefined;
let n: null = null;

//never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

//Object
declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK
// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error

//类型断言
let someValue: any = "this is a string";
let strLength: number = someValue.length;
let strLength0: number = (<string>someValue).length;
let strLength1: number = (someValue as string).length;