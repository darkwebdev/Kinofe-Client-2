define(['render',
    'views/movie-list', 'collections/movie-list',
    'views/movie-item', 'models/movie-item',
    'views/movie-details', 'models/movie-details',
    'text!../data/movie-list.json', 'text!../data/movie-details.json'
    ], function(render,
        MovieListView, MovieList, MovieItemView, MovieItem,
        MovieDetailsView, MovieDetails, movieListData, movieDetailsData
    ) {

    describe('MovieList View', function() {

        var view = new MovieListView({
            collection: new MovieList(JSON.parse(movieListData))
        });

        it('exists', function() {
            expect(view).to.exist;
        });

        it('has collection', function() {
            expect(view.collection).to.exist;
        });

        it('has subview', function() {
            expect(view.itemView).to.exist;
            expect(_.isObject(view.itemView)).to.be.true;
        });

        it('renders collection', function() {
            view.render();

            var html = view.$el.html();
            render('MovieList View', html, movieListData);

        });

    });

    describe('MovieItem View', function() {

        var modelData = {
            "janre": [
                { "pk": 6, "name": "drama" },
                { "pk": 10, "name": "thriller" }
            ],
            "imdb_rating": "7.7",
            "name": "Looper",
            "year": "2012",
            "pk": 87,
            "image": "http://content6.flixster.com/movie/11/16/81/11168184_mob.jpg",
            "get_url": "/what/87",
            "imdb_id": "1276104"
        };

        var view = new MovieItemView({
            model: new MovieItem(modelData)
        });

        it('exists', function() {
            expect(view).to.exist;
        });

        it('has model', function() {
            expect(view.model).to.exist;
        });

        it('got template', function() {
            expect(view.template).to.exist;
            expect(view.template.length).to.be.at.least(1);
        });

        it('renders model', function() {
            view.render();

            var html = view.$el.html();
            render('MovieItem View', html, modelData);

            _.each([ 'name', 'year', 'imdb_rating', 'image' ], function(prop) {
                expect(html.match(new RegExp(modelData[prop], 'g'))).to.exist;
            });
            _.each(modelData.janre, function(janre) {
                expect(html.match(new RegExp(janre.name, 'g'))).to.exist;
            });
        });

    });

    describe('MovieDetails View', function() {

        var view = new MovieDetailsView({
            model: new MovieDetails(JSON.parse(movieDetailsData))
        });

        it('exists', function() {
            expect(view).to.exist;
        });

        it('got model', function() {
            expect(view.model).to.exist;
        });

        it('got template', function() {
            expect(view.template).to.exist;
            expect(view.template.length).to.be.at.least(1);
        });

        it.skip('got regions', function() {
            expect(view.directorRegion).to.exist;
            expect(view.actorRegion).to.exist;
        });

        it('renders model', function() {
            view.render();

            var html = view.$el.html();
            render('MovieDetails View', html, movieDetailsData);

            _.each([ 'name', 'year', 'imdb_rating', 'image_l', 'desc' ], function(prop) {
                expect(html.match(new RegExp(movieDetailsData[prop], 'g'))).to.exist;
            });
            _.each(movieDetailsData.janre, function(janre) {
                expect(html.match(new RegExp(janre.name, 'g'))).to.exist;
            });
            /*_.each(model.actor, function(actor) {
                expect(html.match(new RegExp(actor.name, 'g'))).to.exist;
                expect(html.match(new RegExp(actor.get_char, 'g'))).to.exist;
            });*/
        });

    });

});