define(['marionette', 'handlebars', 'text!templates/person-details.hbs', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, Handlebars, html, MovieList, MovieListView) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
                playedRegion: '.details-played-list',
                directedRegion: '.details-directed-list'
            },

            modelEvents: {
                sync: 'show'
            },

            initialize: function(options) {
                this.region = options.region;
                this.model.fetch();
            },

            show: function() {
                console.log('PersonDetailsView:show', this);
                this.region.show(this);

                (new MovieListView({
                    region: this.directedRegion,
                    collection: new MovieList(this.model.get('directed'))
                })).show();

                (new MovieListView({
                    region: this.playedRegion,
                    collection: new MovieList(this.model.get('played'))
                })).show();
            }
        });

        return View;
    }
);