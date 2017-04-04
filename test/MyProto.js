var myFuncDep = require('./MyFuncDep');

function MyProto() {

}

MyProto.prototype.sayHello = function() {
    return "hello";
}

MyProto.prototype.sayTen = function() {
    return myFuncDep.magicValue();
}

module.exports = MyProto;