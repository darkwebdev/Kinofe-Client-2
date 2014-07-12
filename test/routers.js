define(['controllers/movie-list'], function(MovieListController) {

    describe('MovieList Router', function() {

        beforeEach(function() {

            this.router = new Marionette.AppRouter({
                controller: new MovieListController(),
                appRoutes: {
                    '': 'show',
                    'movie/:id': 'selectMovie'
                },

                show: function() {},
                selectMovie: function(id) {}
            });

            this.routeSpy = sinon.spy();

            try {
                Backbone.history.start({ silent: true, pushState: true });
            } catch(e) {}

//            this.router.navigate('elsewhere');
        });

        console.log('router', this.router);

        it('exists', function() {
            expect(this.router).to.exist;
        });

        it('has controller', function() {
            expect(this.router.options.controller).to.exist;
        });

        it.skip('fires "show" route with a blank hash', function() {
            this.router.on('route:show', this.routeSpy);
            this.router.navigate('', true);
            expect(this.routeSpy).to.have.been.called.once;
            expect(this.routeSpy).to.have.been.called.with;
        });

    });

});