// var should = require('chai').should();
var expect = require('chai').expect;
var sinon = require('sinon');

var mySUT = {
    callCallback: function(cb) {
        cb();
    },
    callBackWithReturnValue: function(cb) {
        return cb();
    },
    callDependency: function() {
        return myDep.someMethod();
    },
    callDependencyBetter: function(dep) {
        return dep.someMethod();
    },
    callProto: function() {
        var proto = new SecondDep();
        return proto.logic();
    }
};

var myDep = {
    someMethod: function() {
        return 10;
    }
};

function SecondDep() {

}

SecondDep.prototype.logic = function() {
    return 11;
}

function realCallback() {
    return 5;
}

describe('sinon 2', function() {
    it('should call dependency', function() {
        var spy = sinon.stub(SecondDep.prototype, 'logic').returns(22);
        var result = mySUT.callProto();
        expect(spy.called).to.equal(true);
        expect(result).to.equal(22);
    });
});

describe.skip('mocking suite', function() {
    
    it('should spy on a callback', function() {
        var spy = sinon.spy();
        mySUT.callCallback(spy);
        expect(spy.called).to.equal(true);
    });

    it('should call real implementation', function() {
        var spy = sinon.spy(realCallback);
        var returedValue = mySUT.callBackWithReturnValue(spy);
        expect(spy.called).to.equal(true);
        expect(returedValue).to.equal(5);
    });

    it('should spy on a method of an object', function() {
        var spy = sinon.spy(myDep, 'someMethod');
        var returnValue = mySUT.callDependency();
        expect(spy.called).to.equal(true);
        expect(returnValue).to.equal(10);
    });

    it('should use sinon assert', function() {
        var spy = sinon.spy();
        sinon.assert.notCalled(spy);
    });
});

// describe.skip('My first suite', function () {

//     beforeEach(function () {
//         console.log('beforeEach');
//     });

//     before(function () {
//         console.log('before');
//     });

//     after(function () {
//         console.log('after');
//     });

//     afterEach(function () {
//         console.log('afterEach');
//     });

//     it('should be my first test', function () {
//         expect(1).to.be.equal(1);
//         console.log('test1');
//     });

//     it.skip('should be my second test', function () {
//         expect(1).to.be.equal(1);
//         console.log('test2');
//     });

//     it('should be my third test', function () {
//         expect(1).to.be.equal(1);
//         console.log('test3');
//     });

// });