//自己做的一些原型链小测试 需要验证的请自取~
function Person(name,age,sex){
  this.name=name;
  this.age=age;
  this.sex=sex;

  this.sayName=function(){
    console.log(this.name);
  }
}

function sayName() {
    console.log(this.name);
}
//better
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.sayName = sayName
}

//构造函数
var person = new Person('构造函数', 20, 'female');
person.sayName();


///==================属性和方法被添到window对象上了===============================
//原理：当在全局作用域中调用一个函数时 this对象总是指向Global对象（浏览器中就是window）
//普通函数
Person('普通函数', 20, 'female');
this.sayName(); //
window.sayName();


// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, '另一个对象', 20, 'female');
o.sayName();




//=======原型模式
//将所有的方法和属性添加到了Person的prototype属性中，构造函数变成了空函数。与构造函数不同的是，新对象的属性和方法是由所有实例共享的。
// 解决的问题：
//
// person1和person2访问的都是同一组属性和同一个sayName()函数。
// 不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中
function Person1() {
  //先执行这里 然后才是prototype
  // this.sayName=function () {
  //   console.log('---->')
  // }
}
// Person1.prototype.name = "prototype";
// Person1.prototype.sayName = function() {
//     console.log(this.name)
// };
Person1.prototype={
  constructor:Person1,//此处必须加 因为相当于重写的Person2的原型
  name : "prototype",
  array:[1,2],// push
  arrayModify:[1,2,3],//直接重写数组
  sayName:function() {
      console.log(this.name)
  }
}
// better
function Person1() {
  //先执行这里 然后才是prototype
  // this.sayName=function () {
  //   console.log('---->')
  // }
  this.array=[1,2]
}
// Person1.prototype.name = "prototype";
// Person1.prototype.sayName = function() {
//     console.log(this.name)
// };
Person1.prototype={
  constructor:Person1,//此处必须加 因为相当于重写的Person2的原型
  name : "prototype",
  // array:[1,2],// push
  arrayModify:[1,2,3],//直接重写数组
  sayName:function() {
      console.log(this.name)
  }
}
var person3=new Person1();
person3.sayName();
console.log(Person1.prototype.isPrototypeOf(person3));//测试person3内部指向Person.prototype的指针
//_proto_ 存在于实例和构造函数的原型对象之间 而不是实例于构造函数之间

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
//实例会覆盖掉原型上的属性  可以用delete操作来恢复访问。
//先判断实例中是不是已经有这个属性再从原型访问：
function solo_proto(){
  var p1=new Person1();
  console.log(p1.name);//原型上的
  p1.name="new name";
  p1.array.push(4);
    p1.arrayModify=[0,90];
  console.log(p1.name);//实例里的  p1.hasOwnProperty('name') true
  console.log( p1.array)//[1, 2, 4]
    console.log( p1.arrayModify)//[0, 90]

  var p2=new Person1();
  console.log(p2.name);//原型上的
  console.log( p2.array)//[1, 2] 属性放在实例里 就不会被改变  放在原型上就会吧被别的对象该改变
  console.log( p2.arrayModify)//[1, 2,3]
  delete p1.name;
  console.log(p1.name);//原型上的 p1.hasOwnProperty('name') false

}
//hasOwnProperty 检测对象是来自实例还是原型中 删除后实例里的 就进入原型中的联系


solo_proto();


//对象操作 in、hasOwnProperty
//要取得对象上所有可枚举的实例属性，可以使用Object.keys()方法
var keys=Object.keys(Person1.prototype);
console.log(keys);
var keys2=Object.getOwnPropertyNames(Person1.prototype);
console.log(keys2);


function Person2() {
  //先执行这里 然后才是prototype
  // this.sayName=function () {
  //   console.log('---->')
  // }
}
Person2.prototype={
  constructor:Person2,//此处必须加 因为相当于重写的Person2的原型
  name : "prototype",
  sayName:function() {
      console.log(this.name)
  }
}

//实例中的指针仅指向原型，而不指向构造函数
// function biantai(){
//   for(var i=0;i<3;i++){
//     (function(n){
//       setTimeout( function(){ alert(n); },3*1000 )
//     })(i)}
// }
//
// function biantai2(){
//   for(var i=0;i<3;i++){
//     function(i){
//       setTimeout(function(){alert(i);},3*1000)}
//   }
// }
//
// biantai();


//P6.3 继承 180
function createfunctions(){
  var result=[];
  var result2=[];
  var result3=[];
  for(var i=0;i<10;i++){
    result[i]=i;
    result2[i]=function(){
      return i;
    }
    result3[i]=(function(num){
      return  num;

    })(i);
  }

  console.log(result)//[0,1,2,3,4,5,6,7,8,9]
  console.log(result2)//[function,function,function,function]
  console.log(result3)//[function,function,function,function]


}
createfunctions();
var i=100;
(function(m){
  console.log('自执行');
  console.log(m);
})(i)



var pid1=setTimeout(function(){
  var script=document.createElement('script');
  script.type="text/javascript";
  script.src="index.js";
  document.body.appendChild(script);
},3*1000);
//此处如果不加上clear就会一直加载 
clearTimeout(pid1);
