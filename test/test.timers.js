'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');

var myTimer = {
    doTimeout: function (cb) {
        console.log('in doTimeout');
        setTimeout(cb, 1000);
    },
}


describe('timers', function () {

    it('should handle timeouts', function () {
        var myCallbackHolder = {
            myCallback: function () {
                console.log('callback called');
            }
        };

        var spy = sinon.spy(myCallbackHolder, 'myCallback');

        var clock = sinon.useFakeTimers();
        myTimer.doTimeout(myCallbackHolder.myCallback);
        clock.tick(1010);
     
        expect(spy.called).to.equals(true);

        clock.restore();
        spy.restore();
    });

});
