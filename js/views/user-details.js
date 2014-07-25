define(['marionette', 'handlebars', 'text!templates/user-details.hbs'],
    function(Marionette, Handlebars, html) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
                watchRegion: '.details-watch-list',
                ignoreRegion: '.details-ignore-list'
            },

            events: {
                'click .login': 'login',
                'click .logout': 'logout'
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
                console.log('UserDetailsView:show', this.model.toJSON());
                this.region.show(this);

                /*(new MovieListView({
                    region: this.directedRegion,
                    collection: new MovieList(this.model.get('directed'))
                })).show();

                (new MovieListView({
                    region: this.playedRegion,
                    collection: new MovieList(this.model.get('played'))
                })).show();*/
            },

            login: function() {},

            logout: function() {}
        });

        return View;
    }
);