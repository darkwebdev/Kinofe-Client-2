define([ 'vent', 'controllers/movie-list', 'controllers/movie-details' ],
    function(vent, MovieListController, MovieDetailsController) {

    describe('MovieList Controller', function() {

        var controller = new MovieListController({
            region: {
                show: function() {
                }
            },
            vent: vent
        });

        it('can create instance', function() {
            expect(controller).to.exist;
        });

        it('creates collection', function() {
            expect(controller.collection).to.exist;
        });

        it('triggers event on movie select', function() {
            var id = 123;
            var spy = sinon.spy();

            controller.vent.on('movie:selected', spy);

            controller.selectMovie(id);

            expect(spy).to.have.been.calledWith(id);
        });
    });

    describe('MovieDetails Controller', function() {

        var id = 456;
        var controller = new MovieDetailsController({
            id: id,
            region: {
                show: function() {
                }
            },
            vent: vent
        });

        it('can create instance', function() {
            expect(controller).to.exist;
        });

        it('creates model with right id', function() {
            expect(controller.model).to.exist;
            expect(controller.model.attributes.id).equal(id);
        });


    });

});