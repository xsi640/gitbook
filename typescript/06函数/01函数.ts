function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function (x: number, y: number): number { return x + y; };
let myAdd0: (baseValue: number, increment: number) => number = function (x: number, y: number): number { return x + y; };

//推断类型
// myAdd has the full function type
let myAdd1 = function (x: number, y: number): number { return x + y; };
// The parameters `x` and `y` have the type number
let myAdd2: (baseValue: number, increment: number) => number =
    function (x, y) { return x + y; };

//参数都是必须的
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}
// let result1 = buildName("Bob");                  // error, too few parameters
// let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right

// 含有默认值的参数是可选的，或者使用?标示可选参数
function buildName0(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
// function buildName0(firstName: string, lastName?: string) {
//     return firstName + " " + lastName;
// }
let result01 = buildName0("Bob");                  // works correctly now, returns "Bob Smith"
let result02 = buildName0("Bob", undefined);       // still works, also returns "Bob Smith"
let result03 = buildName0("Bob", "Adams", "Sr.");  // error, too many parameters
let result04 = buildName0("Bob", "Adams");         // ah, just right

//剩余参数，"...xxx"标示可以传入多个参数
function buildName1(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName1("Joseph", "Samuel", "Lucas", "MacKinzie");

