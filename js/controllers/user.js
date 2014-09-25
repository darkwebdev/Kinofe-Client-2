define(['marionette', 'backbone.radio', '../models/user', '../views/user', 'collections/movie-list', 'collections/janre-list'],
    function(Marionette, Radio, User, UserView, MovieList, JanreList) {

        var radio = Radio.channel('app');

        var Controller = Marionette.Controller.extend({

            initialize: function(options) {
                this.region = options.region;

                this.userSaveOptions = {
                    patch: true,
                    success: function() {
                        radio.command('releases:update');
                    }
                };

                this.checkAuth(options.user);

                _.bindAll(this);
            },

            checkAuth: function(user) {
                // if authenticated:
                this.user = new User({ id: user.id });
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

                console.log('UserController:show', ignoredJanrelist, janreModels, this);

                var view = new UserView({
                    region: this.region,
                    model: this.user,
                    ignorelist: new MovieList(),
                    janrelist: new JanreList(janreModels)
                });
                view.show();
            },

            ignoreMovie: function(id) {
                if (this.user) {
                    this.user.ignoreMovie(id);
                    console.log('user controller:ignore movie', id, this.user);
                    this.user.save(null, this.userSaveOptions);
                }
            },

            restoreMovie: function(id) {
                if (this.user) {
                    this.user.restoreMovie(id);
                    console.log('user controller:restore movie', id, this.user);
                    this.user.save(null, this.userSaveOptions);
                }
            },

            ignoreJanre: function(name) {
                if (this.user) {
                    this.user.ignoreJanre(name);
                    this.user.save(null, this.userSaveOptions);
                }
            },

            restoreJanre: function(name) {
                if (this.user) {
                    this.user.restoreJanre(name);
                    this.user.save(null, this.userSaveOptions);
                }
            },

            toggleWatchlistedMovie: function(id) {
                if (this.user) {
                    this.user.toggleWatchlistedMovie(id);
                    console.log('user controller:toggleWatchlistedMovie', id, this.user);
                    this.user.save(null, this.userSaveOptions);
                }
            }
        });

        return Controller;
    });