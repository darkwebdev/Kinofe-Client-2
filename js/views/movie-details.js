define(['marionette', 'handlebars', 'text!templates/movie-details.hbs', 'collections/person-list', 'views/person-list'],
    function(Marionette, Handlebars, html, PersonList, PersonListView) {

        var View = Marionette.Layout.extend({
            template: Handlebars.compile(html),

            regions: {
                actor: '.details-actor-list',
                director: '.details-director-list'
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
                console.log('view movie-details:show', this.model);

                this.region.show(this);

                var directorListView = new PersonListView({
                    collection: new PersonList(this.model.get('director'))
                });
                this.director.show(directorListView);

                var actorListView = new PersonListView({
                    collection: new PersonList(this.model.get('actor'))
                });
                this.actor.show(actorListView);
            }

        });

        return View;
    }
);