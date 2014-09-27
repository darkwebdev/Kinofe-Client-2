define(['marionette', 'janre-details'], function(Marionette, JanreView) {

    var View = Marionette.CollectionView.extend({

        tagName: 'ul',
        className: 'janreList',
        childView: JanreView,

        initialize: function(options) {
            console.log('JanreDetailsView:init', options);
            this.region = options.region;
        },

        show: function() {
            console.log('JanreDetailsView:show', this.collection);
            this.region.show(this);
            this.scrollTop();
        },

        scrollTop: function() {
            this.region.$el[0].scrollTop = 0;
        }
    });

    return View;
});