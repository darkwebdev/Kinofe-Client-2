define(['backbone', 'config'], function(Backbone, config) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        url: function() {
            return config.apiUrl + '/person/' + this.get('id');
//        url: 'data/person-details.json',
        },

        initialize: function() {
            console.log('person-details:model:init');
            this.listenTo(this, 'sync', this.updateProps);
        },

        updateProps: function() {
            this.set('imdb_link', 'http://imdb.com/name/nm' + this.get('imdb_id'));
        }

    });

    return Model;
});