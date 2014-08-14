define(['marionette', 'views/person-item'], function(Marionette, PersonView) {
    var View = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'personList',
        childView: PersonView,

        initialize: function(options) {
            console.log('view person-list:init', options);
            options = options || {};
            this.collection = options.collection;
        },

        onShow: function() {
            console.log('view person-list:onShow', this);
        }
    });

    return View;
});