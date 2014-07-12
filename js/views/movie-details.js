define(['marionette', 'collections/person-list', 'views/person-list'],
    function(Marionette, PersonList, PersonListView) {

    var View = Marionette.Layout.extend({
        template: _.template(
            '<h2><%- name %></h2>' +
            '<img src="<%- image_l %>"> [<%- imdb_rating %>] (<%- year %>)' +
            '<h3>Janres</h3>' +
            '<ul>(<% _.each(janre, function(janreItem) {%><%- janreItem.name %> <% }); %></ul>' +
            '<p><%- desc %>' +
            '<h3>Directors</h3>' +
            '<ul class="details-director-list"></ul>' +
            '<h3>Actors</h3>' +
            '<ul class="details-actor-list"></ul>'
        ),

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
});