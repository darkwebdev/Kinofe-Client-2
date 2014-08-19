define(['marionette', 'backbone.radio', 'models/user-details', 'views/user-details', 'collections/movie-list', 'collections/janre-list'],
    function(Marionette, Radio, UserDetails, UserDetailsView, MovieList, JanreList) {

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.region = options.region;
                this.radio = Radio.channel('app');

                this.checkAuth(options.user);

                _.bindAll(this);
            },

            checkAuth: function(user) {
                // if authenticated:
                this.user = new UserDetails({ id: user.id });
                // else:
                // login
            },

            logout: function() {
                // logout
                this.user = null;
                this.show();
            },

            show: function() {
                var ignoredJanrelist = this.user.get('ignorelist').janre;
                var janreModels = _.map(ignoredJanrelist, function(janre) { return { name: janre }; });
                console.log('showIgnorelist', ignoredJanrelist, janreModels, this);

                new UserDetailsView({
                    region: this.region,
                    model: this.user,
                    watchlist: new MovieList(),
                    ignorelist: new MovieList(),
                    janrelist: new JanreList(janreModels)
                });
            },

            ignoreMovie: function(id) {
                if (this.user) {
                    this.user.ignoreMovie(id);
                    console.log('user controller:ignore movie', id, this.user);
                    this.user.save(null, { patch: true });
                }
            },

            restoreMovie: function(id) {
                if (this.user) {
                    this.user.restoreMovie(id);
                    console.log('user controller:restore movie', id, this.user);
                    this.user.save(null, { patch: true });
                }
            },

            ignoreJanre: function(name) {
                if (this.user) {
                    this.user.ignoreJanre(name);
                    this.user.save(null, { patch: true });
                }
            },

            restoreJanre: function(name) {
                if (this.user) {
                    this.user.restoreJanre(name);
                    this.user.save(null, { patch: true });
                }
            },

            toggleWatchlistedMovie: function(id) {
                if (this.user) {
                    this.user.toggleWatchlistedMovie(id);
                    console.log('user controller:toggleWatchlistedMovie', id, this.user);
                    this.user.save(null, { patch: true });
                }
            }
        });

        return Controller;
    });