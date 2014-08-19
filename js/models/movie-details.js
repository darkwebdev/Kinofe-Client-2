define(['backbone', 'backbone.radio', 'config'], function(Backbone, Radio, config) {

    var Model = Backbone.Model.extend({
        idAttribute: 'pk',

        url: function() {
            return config.apiUrl + '/movie/' + this.get('id');
//        url: 'data/movie-details.json',
        },

        initialize: function() {
            console.log('movie-details:model:init');
            this.listenTo(this, 'sync', this.updateProps);
            this.radio = Radio.channel('app');
        },

        updateProps: function() {
            this.set('imdb_link', 'http://imdb.com/title/tt' + this.get('imdb_id'));
        },

        toggleWatchlisted: function() {
            this.set({ watchlisted: !this.get('watchlisted') });
            this.radio.trigger('movie:watchlisted', this.get('id'));
        }

    });

    return Model;
});