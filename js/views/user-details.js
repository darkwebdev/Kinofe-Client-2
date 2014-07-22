define(['marionette', 'handlebars', 'text!templates/user-details.hbs'],
    function(Marionette, Handlebars, html) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
                watchRegion: '.details-watch-list',
                ignoreRegion: '.details-ignore-list'
            },

            modelEvents: {
                sync: 'show'
            },

            initialize: function(options) {
                this.region = options.region;
                this.model.fetch();
            },

            show: function() {
                console.log('UserDetailsView:show', this);
                this.region.show(this);

                /*(new MovieListView({
                    region: this.directedRegion,
                    collection: new MovieList(this.model.get('directed'))
                })).show();

                (new MovieListView({
                    region: this.playedRegion,
                    collection: new MovieList(this.model.get('played'))
                })).show();*/
            }
        });

        return View;
    }
);