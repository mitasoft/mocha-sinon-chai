var myClass = {
    doTimeout: function(cb) {
        setTimeout(cb, 1000);
    },
    hide: function() {
        $('#ccc').hide();
    }
};

describe('timers', function() {
    var spy;
    var cb = function() {
        console.log('cb is called');
    };

    beforeEach(function() {
        $('#ccc').show();
        spy = sinon.spy(cb);
    });

    it('should be able to handle timeouts', function() {
        var clock = sinon.useFakeTimers();
        myClass.doTimeout(spy);
        clock.tick(1010);
        chai.expect(spy.called).equal(true);
        clock.restore();
    });

    it('should be able to handle ui animations', function() {
        var clock = sinon.useFakeTimers();

        console.log(new Date().getTime());
        myClass.hide();
        clock.tick();
        chai.expect($('#ccc:visible').length).equal(0);
        clock.restore();
    });
});

