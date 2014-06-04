define(['marionette', 'views/movie'], function(Marionette, MovieView) {
    var View = Marionette.CollectionView.extend({
        tagName: 'ul',
        itemView: MovieView,

        initialize: function() {
            this.listenTo(this.collection, 'reset', this.render);
            this.collection.fetch();
        }
    });

    return View;
});