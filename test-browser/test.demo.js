
describe('fakeServer', function () {
    var server;

    beforeEach(function () {
        server = sinon.fakeServer.create();
        server.respondWith([200, { "Content-Type": "application/json" }, '{"myprop": 35}']);
    });

    it('should respond with data', function () {
        var spy = sinon.spy();
        $.getJSON('some/url', spy);
        server.respond();
        sinon.assert.calledWith(spy, { myprop: 35 });
    });

    afterEach(function () {
        server.restore();
    });
});

describe('suite 1', function () {
    var requests = [];
    var xhr;

    beforeEach(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function (req) {
            requests.push(req);
        };
    });

    it('should pass', function () {
        var responseData = '{ "myData": 3 }';
        $.getJSON('some/url', function (data) { console.log(data); });
        requests[0].respond(200, { "Content-Type": "application/json", responseData });
        expect(requests[0].url).equal('some/url')
        console.log(requests);

    });

    afterEach(function () {
        xhr.restore();
    });
});


var xhrWrapper = {
    get: function() { console.log('xhr GET'); },
    save: function() { console.log('xhr SAVE'); }
};

describe('sandbox', function() {

    it('should be able to sandbox', function() {

        var sandbox = sinon.sandbox.create();
        console.log('in sandboxed test');

        var stub = sandbox.stub(xhrWrapper);

        xhrWrapper.get();
        xhrWrapper.save();

        chai.expect(stub.get.called).equal(true);
        chai.expect(stub.get.callCount).equal(1);

        sandbox.restore();
    });

});