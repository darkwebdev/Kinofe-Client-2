define(['underscore', 'backbone', 'config'], function(_, Backbone, config) {

    var Model = Backbone.Model.extend({

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
            this.listenTo(this, 'change', this.updateProps);
        },

        updateProps: function() {
            this.watchlist = this.get('watchlist');
            this.ignorelist = this.get('ignorelist');
            console.log('user-details:model:changed', this);
        },

        _inList: function(listName, itemName, elem) {
            return _.indexOf(this[listName][itemName], elem) > -1;
        },

        _addToList: function(listName, itemName, elem) {
            console.log('user model:addToList', itemName, listName, elem, this[listName][itemName]);
            this[listName][itemName].push(elem);
            this.set(listName, this[listName]);
        },

        _removeFromList: function(listName, itemName, elem) {
            console.log('user model:removeFromList', itemName, listName, elem, this[listName][itemName]);
            _.pull(this[listName][itemName], elem);
            this.set(listName, this[listName]);
        },

        toggleWatchlistedMovie: function(id) {
            if (this._inList('watchlist', 'movie', id)) {
                this._removeFromList('watchlist', 'movie', id);
            } else {
                this._addToList('watchlist', 'movie', id);
            }
        },

        ignoreMovie: function(id) {
            this._addToList('ignorelist', 'movie', id);
        },

        ignoreJanre: function(name) {
            this._addToList('ignorelist', 'janre', name);
        }

    });

    return Model;
});