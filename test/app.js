define(function(require) {
    var app = require('app');

    describe("Application", function() {
        it("creates a main variable", function () {
            expect(app).to.exist;
        });
    });


});
