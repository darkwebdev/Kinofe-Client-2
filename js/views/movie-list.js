define(['marionette', 'views/movie-item'], function(Marionette, MovieView) {

    var View = Marionette.CollectionView.extend({

        tagName: 'ul',
        className: 'movieList',
        childView: MovieView,

        initialize: function(options) {
            console.log('MovieListView:init');
            this.region = options.region;
        },

        collectionEvents: {
            sync: 'show'
        },

        show: function() {
            console.log('MovieListView:show', this);
            this.region.show(this);
            this.scrollTop();
        },

        scrollTop: function() {
            this.region.$el[0].scrollTop = 0;
        }
    });

    return View;
});