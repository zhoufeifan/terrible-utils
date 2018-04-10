require("babel-core/register");
require("babel-polyfill");

class Person {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    static cool(){
        console.log('so cool');
    }
}

class Student extends Person {
    constructor(name,age,grade){
        super(name,age);
        this.grade = grade;
    }
    static cool(){
        console.log("student cool");
    }
}
Person.cool();
Student.cool();
var p1 = new Person("niam",12);
var s1 = new Student("niba",13,"class 1");
console.log(p1);
console.log(Person.prototype);
console.log(s1);
console.log(Student.prototype);