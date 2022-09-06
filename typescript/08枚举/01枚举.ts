//和c#一样，第一个=1，从1开始依次2，3，4；不指定，从0开始，也可以每个都指定数字
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
console.log(<number>Direction.Left)

//常量的方式
enum Direction0 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
console.log(Direction0.Left)

//异构枚举
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}