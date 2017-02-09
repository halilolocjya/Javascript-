## docsify
背景：最近比较咸，重新撸了一遍JavaScript高级程序设计，期间还被大大嫌弃啃字典~~○|￣|_，也没啥地方可以放 就先放这里 自己随手记得一点点笔记


* console.log 与console.dir

>console.dir显示一个对象的所有属性和方法
>console.log显示这个对象

* typeof 与 instanceof

> * typeof会返回一个变量的基本类型，只有以下几种：number,boolean,string,object,undefined,function；例：

alert(typeof(1));//number
alert(typeof("abc"));//string
alert(typeof(true));//boolean
alert(typeof(m));//undefined

> * instanceof返回的是一个布尔值,instanceof只能用来判断对象和函数，不能用来判断字符串和数字等，



```
[] instanceof Object
true

typeof []
"object"

{} instanceof Object
true

var arr = [1,2,3,1];
console.log(arr.constructor === Array);
true

```

* 判断是不是数组

```
Array.isArray([1, 2, 3]);  // true
Array.isArray({foo: 123}); // false
Array.isArray('foobar');   // false
Array.isArray(undefined);  // false
```

* 正则表达式

>var pattern1=/[bc]at/i;

>var pattern2=/\[bc\]at/i;

>var pattern3=/.at/i;

>var pattern2=new RegExp("[bc]at","i");


* arguments callee caller

>arguments 是一个类数组对象，包含传入函数中的所有参数


>callee属性是一个指针，指向拥有这个arguments对象的函数。

>caller 这个属性保存着调用当前函数的函数的引用

```
//"use strict"; 加上就报错

//阶乘
function factorial(num){
  if(num<1){
    return 1;
  }else{
    console.log(num);
    return num*arguments.callee(num-1);
  }
}
console.log(factorial(5));

var newFac=factorial;
factorial=function(){
  return 0;
}
console.log(newFac(5));
console.log(factorial(5));

//caller
function outer(){
  inner()
}
function outer2(){
  inner();
}
function inner(){
  alert(arguments.callee.caller);
}

```

运行结果：

```

5
4
3
2
1
120
0
5
VM1311:52 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
    at factorial (VM1311:52)
    at window.onload (VM1311:55)
factorial @ VM1311:52
window.onload @ VM1311:55
```

严格模式下,以下会导致错误：

> 1. arguments.callee

> 2. arguments.caller

> 3. 为函数的caller赋值



* **函数属性和方法**

>每个函数包含两个属性 length（函数希望接收的命名参数的个数）和prototype（对于引用类型而言，prototype保存了它们所有的实例方法所在 在ES5中，不可枚举，不能用for-in发现）

>每个函数包含两个非继承而来的方法：apply和call，

**在特定的作用域中调用函数**，实际上等于设置函数体内this对象的值。apply方法接收两个参数

 * 在其中运行的作用域

 * 参数数组

 >call 区别仅在于接受参数的方式不同

* *传参应用*

 ```

 function sum(num1,num2){
  return(num1+num2);
}

function call1(num1,num2,num3){
  return sum.apply(this,arguments);
}

console.log(call1(1,2,3));

function call_or(num1,num2){
  return sum.call(this,num1,num2);
}
call_or(1,3)
 ```

* *扩充函数赖以运行的作用域：*

```
window.color="red";
var o={color:'blue'};
function c(){
 alert(this.color);
}


c.call(this); //red
c.call(window);//red 在全局对象中调用函数
c.call(o);//blue 在对象o作用域中调用函数
```

好处：对象与方法不需要有任何耦合关系；另一个相似功能的方法是bind

```
var obj=c.bind(o);
obj();
```



P136  P119  5.6 基本包装类型


## 数据类型


* Number类型

```

var numberObject = new Number(10);
var numberValue = 10;
alert(typeof numberObject); //"object"
alert(typeof numberValue); //"number"
alert(numberObject instanceof Number); //true
alert(numberValue instanceof Number); //false

```

>在使用typeof操作符测试基本类型数值时，始终会返回"number"，而在测试Number对象时，
则会返回"object"。类似地，Number对象是Number类型的实例，而基本类型的数值则不是。

* String类型
> charAt charCodeAt concat  slice substring substr indexOf  lastIndexOf trim toUpperCase  toLowerCase

* Math对象
ceil floor round random abs exp log
```
var arr=[1,2,3,4,5,90,889];
var max=Math.max.apply(Math,arr);
var max=Math.max.call(Math,1,2,3,4,5,90,889)
```
这个技巧的关键是把math对象设置成apply的第一个参数 从而正确地设置this的值


## 属性类型
  defineProperty defineProperties Object.getOwnPropertyDescriptor
1. 数据属性
  > 包含一个数据值的位置 可以读取和写入值 枚举 删除等 包括

>  Configuration【能否通过delete删除属性从而重新定义属性】
>   Enumerable 对象是否可以枚举 for-in
>    Writable  是否可写
>    Value 属性值
     四个属性

     要修改属性默认的特性 必须要用ES5 Object.defineProperty() 方法。传参三个：属性所在对象  属性名 描述符对象

 ```
 var person = {};
Object.defineProperty(person, "name", {
writable: false,
value: "Nicholas"
});
alert(person.name);  //"Nicholas"
person.name = "Greg";
alert(person.name);  //"Nicholas"
DataPropertiesExample01.htm
```
## 创建对象
 * 构造函数 ：与普通函数的区别 就是需要使用new操作符来调用
 * 对象字面量
 * 工厂模式

 要创建Person实例，必须使用new操作符。经历4个步骤：
 1. 创建一个新对象
 2. 将构造函数的作用域赋给新对象 （this指向这个新对象）
 3. 执行构造函数中的代码（为这个新对象添加属性）
 4. 返回新对象


 constructor属性标识对象类型 但是用instanceof属性来检测更可靠、

构造函数模式：
```

```

## 原型模式：

## 原型链：
## 利用原型让一个引用类型继承另一个引用类型的属性和方法。
**粗体**
*斜体*




## 窗口位置
window.screenTop window.screenLeft window.screenX window.screenY
innerWidth outerWidth innerHeight outerHeight

获得页面可视窗口的宽度
document.documentElement.clientWidth
document.body.clientWidth

```
var pageWidth = window.innerWidth,
  pageHeight = window.innerHeight;
if (typeof pageWidth != "number"){
  if (document.compatMode == "CSS1Compat"){//标准模式
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } else {//混杂模式
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}
```

## 检测浏览器新开窗口是否被阻止：
```
var blocked = false;
try {
  var wroxWin = window.open("http://www.baidu.com", "_blank");
  if (wroxWin == null){
    blocked = true;
  }
} catch (ex){
  blocked = true;
}
if (blocked){
  alert("The popup was blocked!");
}
```


## setTimeout:
```
//设置超时调用
var timeoutId = setTimeout(function() {
alert("Hello world!");
}, 1000);
//注意：把它取消
clearTimeout(timeoutId);
```

>JavaScript 是一个单线程序的解释器，因此一定时间内只能执行一段代码。为了控制要执行的代码，就
有一个JavaScript任务队列。这些任务会按照将它们添加到队列的顺序执行。setTimeout()的第二个
参数告诉JavaScript再过多长时间把当前任务添加到队列中。如果队列是空的，那么添加的代码会立即
执行；如果队列不是空的，那么它就要等前面的代码执行完了以后再执行。

>超时调用的代码都是在全局作用域中执行的，因此函数中this的值在非严格模
式下指向window对象，在严格模式下是undefined。


>一般认为，使用超时调用来模拟间歇调用的是一种最佳模式。在开
发环境下，很少使用真正的间歇调用，原因是后一个间歇调用可能会在前一个间歇调用结束之前启动。
而像前面示例中那样使用超时调用，则完全可以避免这一点。所以，最好不要使用间歇调用。

```
// 在这个例子中，变量num每半秒钟递增一次，当递增到最大值时就会取消先前设定的间歇调用。这
//个模式也可以使用超时调用来实现。
var num = 0;
var max = 10;
function incrementNumber() {
num++;
//如果执行次数未达到max设定的值，则设置另一次超时调用
if (num < max) {
setTimeout(incrementNumber, 500);
} else {
alert("Done");
}
}
setTimeout(incrementNumber, 500);
```

## viewpoint


## location:
>hash host hostname href  parthname port protocal search  
这些值随便改变一个都会在浏览器历史记录里重新生成一条记录  可以通过后退或者前进访问到
要防止这种行为，可以通过```location.replace('')```来实现

## BOM 浏览器对象模型 以Windows对象为依托，表示浏览器窗口以及页面的可见区域
>浏览器对象模型（BOM）以window对象为依托，表示浏览器窗口以及页面可见区域。同时，window
对象还是ECMAScript中的Global对象，因而所有全局变量和函数都是它的属性，且所有原生的构造
函数及其他函数也都存在于它的命名空间下。本章讨论了下列BOM的组成部分。
 在使用框架时，每个框架都有自己的window对象以及所有原生构造函数及其他函数的副本。
每个框架都保存在frames集合中，可以通过位置或通过名称来访问。
 有一些窗口指针，可以用来引用其他框架，包括父框架。
 top对象始终指向最外围的框架，也就是整个浏览器窗口。
 parent对象表示包含当前框架的框架，而self对象则回指window。
 使用location对象可以通过编程方式来访问浏览器的导航系统。设置相应的属性，可以逐段
或整体性地修改浏览器的URL。
 调用replace()方法可以导航到一个新URL，同时该URL会替换浏览器历史记录中当前显示
的页面。
 navigator对象提供了与浏览器有关的信息。到底提供哪些信息，很大程度上取决于用户的浏
览器；不过，也有一些公共的属性（如userAgent）存在于所有浏览器中。
BOM中还有两个对象：screen和history，但它们的功能有限。screen对象中保存着与客户端
显示器有关的信息，这些信息一般只用于站点分析。history 对象为访问浏览器的历史记录开了一个
小缝隙，开发人员可以据此判断历史记录的数量，也可以在历史记录中向后或向前导航到任意页面。




## DOM
getElementById
getElementByTagName
getAttribute setAttribute removeAttribute
querySelector
querySelectorAll

```
var $div=document.getElementById('mydiv');
console.log($div.getAttribute('data-id'));

```

## 动态引入JS或者CSS
** 引入脚本 **
* 引入外部文件
```
function loadScript(url){
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}
//然后，就可以通过调用这个函数来加载外部的JavaScript文件了：
  loadScript("client.js");
```

* 行内方式
```
function loadScriptString(code){
  var script = document.createElement("script");
  script.type = "text/javascript";
  try {
    script.appendChild(document.createTextNode(code));
  } catch (ex){
    script.text = code;
  }
  document.body.appendChild(script);
}
//下面是调用这个函数的示例：
loadScriptString("function sayHi(){alert('hi');}");
```

** 引入CSS **
* 引入外部文件
```
function loadStyles(url){
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}
//调用loadStyles()函数的代码如下所示：
loadStyles("styles.css");
```

* 行内方式
```
function loadStyleString(css){
  var style = document.createElement("style");
  style.type = "text/css";
  try{
    style.appendChild(document.createTextNode(css));
  } catch (ex){
    style.styleSheet.cssText = css;
  }
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}

//调用这个函数的示例如下：
loadStyleString("body{background-color:red}");
```



## HTMLDocument的变化

> * document.readyState loading/complete

> * 兼容模式 document.compatMode CSS1Compat(标准模式) BackCompat(混杂模式)

>var head = document.head || document.getElementsByTagName("head")[0];

>$('#p5')[0].scrollIntoView()
>clientWidth=元素内容宽度+内边距宽度 clientHeight=元素内容高度+内边距高度


```
function getViewport(){
  if (document.compatMode == "BackCompat"){
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }
}
```


```
var docHeight = Math.max(document.documentElement.scrollHeight, 
  document.documentElement.clientHeight);  
  var docWidth = Math.max(document.documentElement.scrollWidth, 
  document.documentElement.clientWidth); 
```


>scrollLeft scrollTop scrollHeight scrollWidth


>getBoundingClientRect()
