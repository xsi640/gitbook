interface LabelledValue {
    label: string;  //必须有这个属性
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

interface SquareConfig {
    color?: string; //可选属性
    width?: number; //可选属性
}

function createSquare(config: SquareConfig): { color: string, area: number } {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: "black" });
//断言的方式创建SquareConfig对象
let mySquare0 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
console.log(mySquare.color + " " + mySquare.area);

interface Point {
    readonly x: number; //只读属性
    readonly y: number; //只读属性
}
let p1: Point = { x: 10, y: 20 };
//p1.x = 5//error!

let a0: number[] = [1, 2, 3, 4];
let r0: ReadonlyArray<number> = a0;
// r0[0] = 12;  //error
// r0.push(5);  //error
// a0 = r0;     //error，readonlyArray赋值到一个普通的数组也是不允许的
a0 = r0 as number[];    //pass

interface SquareConfig {
    color?: string; //可选属性
    width?: number; //可选属性
    [propName: string]: any //索引签名，允许任意any的属性
}
let mySquare1 = createSquare({ width: 100, opacity: 0.5 });

interface SearchFunc {
    (source: string, subString: string): boolean;   //这是一个函数的签名
}
//下面是具体的实现
let mySearch: SearchFunc;
mySearch = function (src: string, sub: string) {
    let result = src.search(sub);
    return result > -1;
}
//和上面的等效的
mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
}

interface StringArray {
    //索引器，这个类型可以使用索引的方式访问，number, string两种索引类型
    // number类型的索引会自动转换成string去查找索引，如：a[1]等同于a["1"]
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
console.log(myStr)

interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string;       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray0: ReadonlyStringArray = ["Alice", "Bob"];
// myArray0[2] = "Mallory"; // error!


interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
    setTime(d: Date) {
        this.currentTime = d;
    }
}