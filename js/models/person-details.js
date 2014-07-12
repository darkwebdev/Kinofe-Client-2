define(['backbone'], function(Backbone) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',
        url: 'data/person-details.json',
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