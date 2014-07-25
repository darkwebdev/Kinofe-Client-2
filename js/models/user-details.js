define(['backbone', 'config'], function(Backbone, config) {

    var Model = Backbone.Model.extend({
//        idAttribute: 'pk',
        /*watchlist: [],
        ignorelist: {
            movie: [],
            janre: []
        },*/

        defaults: function() {
            return {
                watchlist: {
                    movie: []
                },
                ignorelist: {
                    movie: [],
                    janre: []
                }
            };
        },

        url: function() {
            return config.apiUrl + '/users/1/';
//        url: 'data/person-details.json',
        },

        initialize: function() {
            console.log('user-details:model:init', this);
            this.watchlist = this.get('watchlist');
            this.ignorelist = this.get('ignorelist');
        },

        addToList: function(objName, listName, id) {
            console.log('user model:addToList', objName, listName, id);
            if (_.indexOf(this[listName][objName], id) == -1) {
                this[listName][objName].push(id);
                this.set(listName, this[listName]);
            }
        },

        watchlistMovie: function(id) {
            this.addToList('movie', 'watchlist', id);
        },

        ignoreMovie: function(id) {
            this.addToList('movie', 'ignorelist', id);
        },

        ignoreJanre: function(id) {
            this.addToList('janre', 'ignorelist', id);
        }

    });

    return Model;
});