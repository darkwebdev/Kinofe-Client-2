define(['marionette', 'views/janre-item'], function(Marionette, JanreItemView) {

    var View = Marionette.CollectionView.extend({

        tagName: 'ul',
        className: 'janreList',
        itemView: JanreItemView,

        initialize: function(options) {
            console.log('janreList view:init', options);
            this.region = options.region;
        },

        show: function() {
            console.log('JanreCollectionView:show', this.collection);
            this.region.show(this);
            this.scrollTop();
        },

        scrollTop: function() {
            this.region.$el[0].scrollTop = 0;
        }
    });

    return View;
});