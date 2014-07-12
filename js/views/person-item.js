define(['marionette'], function(Marionette) {
    var View = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'list-item',
        template: _.template('<img src=""> <%-name%>'),

        events: {
            'click': 'selectPerson'
        },

        initialize: function() {
            this.model.on('change:selected', this.highlight, this);
        },

        highlight: function(model, selected) {
            $(this.el).toggleClass('active', selected).siblings().removeClass('active');
        },

        selectPerson: function() {
            console.log('view:selectPerson');
            this.model.select();
        }
    });

    return View;
});