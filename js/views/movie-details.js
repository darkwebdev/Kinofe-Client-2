define(['marionette', 'handlebars', 'text!templates/movie-details.hbs', 'collections/person-list', 'views/person-list'],
    function(Marionette, Handlebars, html, PersonList, PersonListView) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
                actor: '.details-actorList',
                director: '.details-directorList'
            },

            modelEvents: {
                change: 'show'
            },

            initialize: function(options) {
                console.log('view movie-details:init', options);
                this.region = options.region;
                this.model.fetch();
            },

            show: function() {
                console.log('view movie-details:show', this.model, this.region);

                this.region.show(this);
                this.scrollTop();

                var directorListView = new PersonListView({
                    collection: new PersonList(this.model.get('director'))
                });
                this.director.show(directorListView);

                var actorListView = new PersonListView({
                    collection: new PersonList(this.model.get('actor'))
                });
                this.actor.show(actorListView);
            },

            scrollTop: function() {
                this.region.$el[0].scrollTop = 0;
            }

        });

        return View;
    }
);