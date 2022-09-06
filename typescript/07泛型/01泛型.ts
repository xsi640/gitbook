function identity<T>(arg: T): T {
    return arg;
}

console.log(identity("myString"));

function loggingIdentity<T>(args: T[]): T[] {
    console.log(args.length);
    return args;
}
console.log(loggingIdentity(["aaa", "bbb"]))

function loggingIdentity0<T>(args: Array<T>): Array<T> {
    console.log(args.length);
    return args;
}
console.log(loggingIdentity0(["aaa", "bbb", "ccc"]))

class GenericNumber<T>{
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

interface Lengthwise {
    length: number;
}

function loggingIdentity1<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
//loggingIdentity1(3);//Error, 泛型的类型必须是Lengthwise的接口类型，也就是必须要有length属性
loggingIdentity1({length: 10, value: 3});

class BeeKeeper {
    hasMask: boolean;
}
class ZooKeeper {
    nametag: string;
}
class Animal {
    numLegs: number;
}
class Bee extends Animal {
    keeper: BeeKeeper;
}
class Lion extends Animal {
    keeper: ZooKeeper;
}
function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}
createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!