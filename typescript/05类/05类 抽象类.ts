abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earch...");
    }
}

abstract class Department {
    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name:" + this.name);
    }

    abstract printMeeting(): void;   //必须在派生类实现
}

class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing");//在派生类的构造函数中必须调用super()
    }
    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department;//创建一个抽象类的引用
// department = new Department();//error，抽象类不能创建实例
department = new AccountingDepartment();
department.printName();
department.printMeeting();
// department.generateReports();// 错误: 方法在声明的抽象类中不存在