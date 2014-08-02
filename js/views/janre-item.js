define(['marionette', 'handlebars', 'text!templates/janre-item.hbs'], function(Marionette, Handlebars, html) {

    var View = Marionette.ItemView.extend({

        tagName: 'li',
        className: 'listItem',
        template: Handlebars.compile(html),

        events: {
            'click .restore': 'restoreJanre'
        },

        initialize: function() {
        },

        restoreJanre: function() {
            console.log('movie view:restoreJanre');
            this.model.restore();
        }
    });

    return View;
});