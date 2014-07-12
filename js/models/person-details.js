define(['backbone', 'config'], function(Backbone, config) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        url: function() {
            return config.apiUrl + '/person/' + this.get('id');
//        url: 'data/person-details.json',
        },

        defaults: {
            imdb_link: ''
        },

        initialize: function() {
            console.log('person-details:model:init');
            this.on('sync', function() {
                this.set('imdb_link', 'http://imdb.com/name/nm' + this.get('imdb_id'));
            }, this);
        }

    });

    return Model;
});