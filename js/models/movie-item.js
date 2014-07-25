define(['backbone'], function(Backbone) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        select: function() {
            this.set({ selected: true }).collection.selectMovie(this);
        },

        hide: function() {
            this.set({ hidden: true }).collection.hideMovie(this);
        },

        watchlist: function() {
            this.set({ watchlisted: true }).collection.watchlistMovie(this);
        }
    });

    return Model;
});