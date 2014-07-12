define(['backbone', 'config'], function(Backbone, config) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        url: function() {
            return config.apiUrl + '/movie/' + this.get('id');
//        url: 'data/movie-details.json',
        },

        initialize: function() {
            console.log('movie-details:model:init');
        }

    });

    return Model;
});