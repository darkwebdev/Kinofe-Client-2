define(['marionette', 'handlebars', 'text!templates/janre-item.hbs'], function(Marionette, Handlebars, html) {

    var View = Marionette.ItemView.extend({

        tagName: 'li',
        template: Handlebars.compile(html),

        events: {
            'click': 'janreClicked'
        },

        initialize: function() {
        },

        janreClicked: function() {
            console.log('JanreItemView:clicked');
            this.model.show();
        }
    });

    return View;
});