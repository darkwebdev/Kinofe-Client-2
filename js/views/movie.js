define(['marionette'], function(Marionette) {
    var View = Marionette.ItemView.extend({
        tagName: 'li',
        template: _.template('<img src="<%-image%>"> [<%-imdb_rating%>] <%-name%> (<%-year%>)'),

        events: {
            'click': 'selectMovie'
        },

        initialize: function() {
            this.model.on('change:selected', this.highlight, this);
        },

        highlight: function(model, selected) {
            $(this.el).toggleClass('active', selected).siblings().removeClass('active');
        },

        selectMovie: function() {
            console.log('view:selectMovie');
            this.model.select();
        }
    });

    return View;
});