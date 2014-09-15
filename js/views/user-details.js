define(['marionette', 'backbone', 'handlebars', 'text!templates/user-details.hbs', 'views/movie-list', 'views/janre-list'],
    function(Marionette, Backbone, Handlebars, html, MovieListView, JanreListView) {

        var View = Marionette.LayoutView.extend({
            template: Handlebars.compile(html),

            regions: {
                ignorelistJanreRegion: '.detailsIgnoreListJanre',
                ignorelistMovieRegion: '.detailsIgnoreListMovie'
            },

            events: {
                'click .login': 'login',
                'click .logout': 'logout',
                'click .showIgnorelist': 'showIgnorelist'
            },

            modelEvents: {
                sync: 'show'
            },

            watchlistVisible: false,
            ignorelistVisible: false,

            initialize: function(options) {
                this.region = options.region;
                this.ignorelist = options.ignorelist;
                this.janrelist = options.janrelist;

                if (this.model) {
                    this.model.fetch();
                } else {
                    this.show();
                }
            },

            show: function() {
                console.log('UserDetailsView:show', this.model.toJSON(), MovieListView);
                this.region.show(this);

                // update lists if required
                if (this.ignorelistVisible) {
                    this.showIgnorelist();
                }
            },

            showIgnorelist: function() {
                var movieListView = new MovieListView({
                    region: this.ignorelistMovieRegion,
                    collection: this.ignorelist
                });
                movieListView.collection.fetch({ ignorelistUser: 1 });

                var janreListView = new JanreListView({
                    region: this.ignorelistJanreRegion,
                    collection: this.janrelist
                });
                janreListView.show();

                this.ignorelistVisible = true;
                this.hideWatchlist();
            },

            hideIgnorelist: function() {
                $(this.ignorelistJanreRegion.el).add(this.ignorelistMovieRegion.el).empty();
                this.ignorelistVisible = false;
            },

            login: function() {},

            logout: function() {}
        });

        return View;
    }
);