define(['marionette', 'views/janre-item'], function(Marionette, JanreView) {

    var View = Marionette.CollectionView.extend({

        tagName: 'ul',
        className: 'janreList',
        childView: JanreView,

        initialize: function(options) {
            //console.log('JanreListView:init', options);
        }
    });

    return View;
});