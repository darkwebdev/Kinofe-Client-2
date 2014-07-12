define(['marionette'], function(Marionette) {

    var View = Marionette.ItemView.extend({

        tagName: 'li',
        className: 'list-item',
        template: _.template(
            '<img src="<%- image %>">' +
            '[<%- imdb_rating %>] <%- name %> (<%- year %>)' +
            '(<% _.each(janre, function(janreName) { %><%- janreName %> <% }); %>)'
        ),

        events: {
            'click': 'selectMovie'
        },

        initialize: function() {
//            console.log('MovieItemView:init', this.model);
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