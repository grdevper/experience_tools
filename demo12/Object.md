### prototype __proto__ constructor 三者的关系
1. __proto__和constructor属性是对象所独有的
2. prototype属性是函数所独有的

function Foo() {
  ...
}

let f1 = new Foo();

通过 __proto__ 找到父对象，通过该属性连接对象的一条链，即原型链

#### prototype
是函数独有的，是从一个函数指向一个对象，f1.__proto__ === Foo.prototype
作用就是包含可以由特定类型的所有实例共享的属性和方法，也就是让该函数所实例化的对象们都可以找到公用的属性和方法
任何函数在创建的时候，其实会默认同时创建该函数的prototype对象。

#### constructor
constructor属性也是对象才拥有的，它是从一个对象指向一个函数，含义就是指向该对象的构造函数
Foo.prototype.constructor === Foo

f1对象本身不具有constructor属性，就会通过__proto__属性到原型链上去找
而f1.__proto__ === Foo.prototype, Foo.prototype具有constructor属性并且指向了Foo函数，它是继承来的。
f1.constructor === Foo;

注意：子类在继承父类时，子类中是找不到this的，没有自己的this对象，只能使用super继承父类中的this对象，然后在加工。
即在ES6的继承，需要先创建父类的this，子类调用super继承父类的this对象，然后再用子类的构造函数对this进行加工。
这里另外说一下与es5继承方式的区别：
es5的继承，实质是先创造子类的实例对象 this ，然后再将父类的方法添加到 this 上面（ Parent.apply(this)

 //ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
   //<script type="module">
       import utils from "./utils.js";

       // other code
     </script>



