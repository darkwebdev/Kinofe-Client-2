define(['marionette', 'handlebars', 'radio', 'text!templates/janre-item.hbs'],
    function(Marionette, Handlebars, radio, html) {

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
            radio.trigger('janre:show', this.model.get('name'));
        }
    });

    return View;
});