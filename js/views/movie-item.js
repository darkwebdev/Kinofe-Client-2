define(['marionette', 'handlebars', 'text!templates/movie-item.hbs'], function(Marionette, Handlebars, html) {

    var View = Marionette.ItemView.extend({

        tagName: 'li',
        className: 'list-item',
        template: Handlebars.compile(html),

        events: {
            'click': 'selectMovie'
        },

        initialize: function() {
//            console.log('MovieItemView:init', this.model);
//            this.getContext();
            this.model.on('change:selected', this.highlight, this);
        },

        highlight: function(model, selected) {
            $(this.el).toggleClass('active', selected).siblings().removeClass('active');
        },

        selectMovie: function() {
            console.log('movie view:selectMovie');
            this.model.select();
        }
    });

    return View;
});