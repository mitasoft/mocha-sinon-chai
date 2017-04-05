var myFuncDep = require('./MyFuncDep');
var MyClass = require('./MyClass');

function MyProto() {

}

MyProto.prototype.sayHello = function() {
    return "hello";
}

MyProto.prototype.calc = function() {
    var myClass = new MyClass();
    var result = myClass.add(1,2);
    return result;
}

MyProto.prototype.sayTen = function() {
    return myFuncDep.magicValue();
}

module.exports = MyProto;