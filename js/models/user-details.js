define(['backbone', 'config'], function(Backbone, config) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        url: function() {
            return config.apiUrl + '/users/1';
//        url: 'data/person-details.json',
        },

        initialize: function() {
            console.log('user-details:model:init');
        }

    });

    return Model;
});