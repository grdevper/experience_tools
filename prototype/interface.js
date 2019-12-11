//继承
/*function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType() {
    this.subproperty = false;
}*/

//将SuperType实例赋予给SubType原型链

/*SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function (){
    return this.subproperty;
};
var instance = new SubType();
alert(instance.getSuperValue());*/

//使用字面量添加新方法，会导致上一行代码无效
/*SubType.prototype = {
    getSubValue : function (){
        return this.subproperty;
    },
    someOtherMethod : function (){
        return false;
    }
};*/

/*--------------------------------*/

/**
* 借用构造函数
* */
/*function SuperType() {
  this.colors = ['yellow', 'blue', 'black'];
}

function SupType() {
    SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors);    //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors);    //"red,blue,green"*/

/**
* 组合继承
* 即将原型链和借用构造函数的技术组合到一块
* */

function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
   console.log(this.name);
}

function SupType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

SupType.prototype = new SuperType();
SupType.prototype.constructor = SupType; //保证原型链条的完整
console.dir(SupType);
SupType.prototype.sayAge = function () {
    console.log(this.age);
}


var instance1 = new SupType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();

var instance2 = new SupType("Greg", 27);
console.log(instance2.colors);
instance2.sayName();
instance2.sayAge();

/**
* 原型式继承
*  有一个基础对象然后通过Object创建为一个新对象，即副本，会共享引用式属性
* */
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"

/**
* 寄生式继承
* */
function createAnother(original) {
   var clone = Object(original);
   clone.sayHi = function () {
       console.log('hello');
   }
   return clone;
}
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"

/**
* 寄生组合式继承
* 不必为了指定子类型的原型而调用超类型的构造函数
* 我们只需要超类型的副本而已
* */

function inheritPrototype(subType, superType) {
    var prototype = Object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
};