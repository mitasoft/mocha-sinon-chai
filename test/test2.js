
var expect = require('chai').expect;
var sinon = require('sinon');

var MyProto = require('./MyProto');
var myFuncDep = require('./MyFuncDep')
var MyClass = require('./MyClass');


describe.only('| suite 5 mocks |', function () {
    it('should call MyClass.add method only once', function () {
        var myClassMock = sinon.mock(MyClass.prototype);
        var expectation = myClassMock.expects("add")
            .once()
            .withArgs(1, 2)
            .returns(10);

        var myProto = new MyProto();
        var result = myProto.calc();

        expectation.verify();
        expect(result).equal(10);
        myClassMock.restore();
    });

    it('should call MyClass.add method only once with match', function () {
        var spyAdd = sinon.spy(MyClass.prototype, 'add');

        var myProto = new MyProto();
        var result = myProto.calc();

        expect(spyAdd.called).equal(true);
        expect(spyAdd.calledWith(sinon.match.number, 2)).equal(true);
        expect(spyAdd.callCount).equal(1);
        spyAdd.restore();
    });
});

describe('| suite 4 stubs |', function () {

    it('should call method add with 1,2', function () {
        var stub = sinon.stub(MyClass.prototype);
        stub.add.returns(100);

        var myProto = new MyProto();
        var result = myProto.calc();

        expect(stub.add.getCall(0).calledWith(1, 2)).equal(true);
        expect(stub.add.callCount).equal(1);
        expect(result).equal(100);
    });
});

describe('| suite 3 spy and stub |', function () {

    it('should call sayHello method', function () {
        var spy = sinon.spy(MyProto.prototype, 'sayHello');
        var myProto = new MyProto();
        var result = myProto.sayHello();
        expect(spy.called).to.equal(true);
        expect(result).to.equal('hello');
        spy.restore();
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