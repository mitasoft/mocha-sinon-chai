
var expect = require('chai').expect;
var sinon = require('sinon');

var MyProto = require('./MyProto');
var myFuncDep = require('./MyFuncDep')

describe('| suite 3 spy and stub |', function () {

    it('should call sayHello method', function () {
        var spy = sinon.spy(MyProto.prototype, 'sayHello');
        var myProto = new MyProto();
        var result = myProto.sayHello();
        expect(spy.called).to.equal(true);
        expect(result).to.equal('hello');
    });

    it('should call function dep myFuncDep', function () {
        var spy = sinon.spy(myFuncDep, 'magicValue');
        var myProto = new MyProto();
        var result = myProto.sayTen();
        expect(spy.called).to.equal(true);
        expect(result).to.equal(10);
        spy.restore();
    });

    it('should return 30 when myFuncDep is called', function () {
        var stub = sinon.stub(myFuncDep, 'magicValue').returns(30);
        var myProto = new MyProto();
        var result = myProto.sayTen();
        expect(stub.called).to.equal(true);
        expect(result).to.equal(30);
        stub.restore();
    });

});