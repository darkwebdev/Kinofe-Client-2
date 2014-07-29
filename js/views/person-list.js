define(['marionette', 'views/person-item'], function(Marionette, PersonView) {
    var View = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'personList',
        itemView: PersonView,

        initialize: function() {

        },

        onShow: function() {
            console.log('view person-list:onShow', this);
        }
    });

    return View;
});