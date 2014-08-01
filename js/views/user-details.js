define(['marionette', 'backbone', 'handlebars', 'config', 'text!templates/user-details.hbs', 'views/movie-list', 'collections/movie-list'],
    function(Marionette, Backbone, Handlebars, config, html, MovieListView, MovieList) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
                watchlistRegion: '.detailsWatchList',
                ignorelistRegion: '.detailsIgnoreList'
            },

            events: {
                'click .login': 'login',
                'click .logout': 'logout',
                'click .showWatchlist': 'showWatchlist',
                'click .showIgnorelist': 'showIgnorelist'
            },

            modelEvents: {
                sync: 'show'
            },

            initialize: function(options) {
                this.region = options.region;
                if (this.model) {
                    this.model.fetch();
                } else {
                    this.show();
                }
            },

            show: function() {
                console.log('UserDetailsView:show', this.model.toJSON(), MovieListView);
                this.region.show(this);

                /*(new MovieListView({
                    region: this.playedRegion,
                    collection: new MovieList(this.model.get('played'))
                })).show();*/
            },

            showWatchlist: function() {
                var view = new MovieListView({
                    region: this.watchlistRegion,
                    collection: new MovieList.extend({
                        url: function() {
                            return config.apiUrl + '/user/1/watchlist';
                        }
                    })
                });
                view.show();
            },

            showIgnorelist: function() {},

            login: function() {},

            logout: function() {}
        });

        return View;
    }
);