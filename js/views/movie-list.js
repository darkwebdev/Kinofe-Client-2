define(['marionette', 'views/movie-item'], function(Marionette, MovieItemView) {

    var View = Marionette.CollectionView.extend({

        tagName: 'ul',
        className: 'movieList',
        childView: MovieItemView,

        initialize: function(options) {
            this.region = options.region;
        },

        collectionEvents: {
            sync: 'show'
        },

        show: function() {
            console.log('MovieCollectionView:show', this.collection, this.region);
            this.region.show(this);
            this.scrollTop();
        },

        scrollTop: function() {
            this.region.$el[0].scrollTop = 0;
        }
    });

    return View;
});