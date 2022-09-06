//类型兼容
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named = new Person();    //类型的属性相同，不会报错，符合js风格

let x: Named;
let y = { name: 'Alice', location: 'Seattle' };
//这里要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性。 
//在这个例子中，y必须包含名字是name的string类型成员。y满足条件，因此赋值正确。
x = y;

//函数兼容
let x0 = (a: number) => 0;
let y0 = (a: number, s: string) => 0;
// x0 = y0;    //error. x0中却少必须的参数
y0 = x0;    //pass，y0两个参数，x0一个参数，执行x0的函数的参数，可以匹配

let x1 = () => ({ name: 'Alice' });
let y1 = () => ({ name: 'Alice', location: 'Seattle' });
x1 = y1;    //pass
// y1 = x1;    //error，原理同上，只是返回参数区别

//函数参数双向协变
enum EventType { Mouse, Keyboard };
interface Event { timestamp: number };
interface MouseEvent extends Event { x: number, y: number };

//枚举
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Green;  // Error，数字类型与枚举兼容，但不同的枚举类型是不兼容的

//类
//类与对象字面量和接口差不多，但有一点不同：
//类有静态部分和实例部分的类型。 
//比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}
let a: Animal
let s: Size
a = s;
s = a;

//泛型
interface Empty<T> {
}
let x2: Empty<number>;
let y2: Empty<string>;
x2 = y2;  // OK, because y matches structure of x
interface NotEmpty<T> {
    data: T;
}
let x3: NotEmpty<number>;
let y3: NotEmpty<string>;
//x3 = y3;  // Error, because x and y are not compatible
//接口中的成员是用了不同的类型



