define(['marionette', 'handlebars', 'text!templates/movie-details.hbs', 'views/person-list'],
    function(Marionette, Handlebars, html, PersonListView) {

        var View = Marionette.LayoutView.extend({
            template: Handlebars.compile(html),

            regions: {
                actorRegion: '.details-actorList',
                directorRegion: '.details-directorList'
            },

            modelEvents: {
                change: 'show' // sync?
            },

            events: {
                'click .watchlist': 'toggleWatchlistedMovie'
            },

            initialize: function(options) {
                console.log('view movie-details:init', options);
                this.region = options.region;
                this.directorList = options.directorList;
                this.actorList = options.actorList;

                this.model.fetch();
            },

            show: function() {
                console.log('MovieDetailsView:show');

                this.region.show(this);
                this.scrollTop();

                var directorListView = new PersonListView({
                    collection: this.directorList(this.model.get('director'))
                });
                this.directorRegion.show(directorListView);

                var actorListView = new PersonListView({
                    collection: this.actorList(this.model.get('actor'))
                });
                this.actorRegion.show(actorListView);
            },

            scrollTop: function() {
                this.region.$el[0].scrollTop = 0;
            },

            toggleWatchlistedMovie: function() {
                console.log('movieDetails view:toggleWatchlistedMovie');
                this.model.toggleWatchlisted();
            }

        });

        return View;
    }
);