define(['backbone'], function(Backbone) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        url: function() {
            return 'http://127.0.0.1:8000/movie/' + this.get('id');
//        url: 'data/movie-details.json',
        },

        initialize: function() {
            console.log('movie-details:model:init');
        }

    });

    return Model;
});