define(['marionette', 'handlebars', 'text!templates/movie-details.hbs', 'views/person-list'],
    function(Marionette, Handlebars, html, PersonListView) {

        var View = Marionette.LayoutView.extend({
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
                this.directorList = options.directorList;
                this.actorList = options.actorList;

                this.model.fetch();
            },

            show: function() {
                this.region.show(this);
                this.scrollTop();

//                debugger;
                var directorList = this.directorList.reset(this.model.get('director'));

                console.log('view movie-details:show', this.model, this.region, directorList);

                var directorListView = new PersonListView({
                    collection: directorList
                });
                this.director.show(directorListView);

                var actorListView = new PersonListView({
                    collection: this.actorList.reset(this.model.get('actor'))
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