define(['marionette', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, MovieList, MovieListView) {

        var View = Marionette.Layout.extend({
            regions: {
                playedRegion: '.details-played-list',
                directedRegion: '.details-directed-list'
            },

            modelEvents: {
                change: 'show'
            },

            initialize: function(options) {
                this.region = options.region;
                this.model.fetch();
            },

            show: function() {
                this.template = _.template(
                    '<h2><%- name %></h2>' +
                    '<img src="<%- image %>">' +
                    '<p><a href="<%- imdb_link %>">Full info on IMDB</a></p>' +
                    '<h3>Directed</h3>' +
                    '<ul class="details-directed-list"></ul>' +
                    '<h3>Played</h3>' +
                    '<ul class="details-played-list"></ul>'
                );

                this.region.show(this);

                new MovieListView({
                    region: this.directedRegion,
                    collection: new MovieList(this.model.get('directed'))
                });

                new MovieListView({
                    region: this.playedRegion,
                    collection: new MovieList(this.model.get('played'))
                });
            }
        });

        return View;
    });