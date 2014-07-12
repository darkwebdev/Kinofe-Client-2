define(['marionette', 'views/movie-item'], function(Marionette, MovieItemView) {

    var View = Marionette.CollectionView.extend({

        tagName: 'ul',
        className: 'movie-list',
        itemView: MovieItemView,

        initialize: function(options) {
            this.region = options.region;

            /*if (!this.collection.length) {
                this.collection.fetch();
            } else {
                this.show();
            }*/
        },

        collectionEvents: {
            sync: 'show'
        },

        show: function() {
            console.log('CollectionView:show', this.collection);
            this.region.show(this);
        }
    });

    return View;
});