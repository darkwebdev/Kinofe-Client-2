define(['marionette', 'handlebars', 'text!templates/person-details.hbs', 'collections/movie-list', 'views/movie-list'],
    function(Marionette, Handlebars, html, MovieList, MovieListView) {

        var View = Marionette.LayoutView.extend({
            template: Handlebars.compile(html),

            regions: {
                playedRegion: '.details-playedList',
                directedRegion: '.details-directedList'
            },

            modelEvents: {
                sync: 'show'
            },

            initialize: function(options) {
                this.region = options.region;
                this.directedList = options.directedList;
                this.playedList = options.playedList;

                this.model.fetch();

                _.bindAll(this);
            },

            show: function() {
                console.log('PersonDetailsView:show', this);
                this.region.show(this);
                this.scrollTop();

                (new MovieListView({
                    region: this.directedRegion,
                    collection: this.directedList(this.model.get('directed'))
                })).show();

                (new MovieListView({
                    region: this.playedRegion,
                    collection: this.playedList(this.model.get('played'))
                })).show();
            },

            scrollTop: function() {
                this.region.$el[0].scrollTop = 0;
            }

        });

        return View;
    }
);