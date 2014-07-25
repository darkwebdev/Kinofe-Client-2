define(['marionette', 'handlebars', 'text!templates/movie-item.hbs'], function(Marionette, Handlebars, html) {

    var View = Marionette.ItemView.extend({

        tagName: 'li',
        className: 'list-item',
        template: Handlebars.compile(html),

        events: {
            'click .hide': 'hideMovie',
            'click .watchlist': 'watchlistMovie',
            'click': 'selectMovie'
        },

        modelEvents: {
            'change:selected': 'highlight',
            'change:hidden': 'hide',
            'change:watchlisted': 'watchlist'
        },

        initialize: function() {
//            console.log('MovieItemView:init', this.model);
        },

        highlight: function() {
            $(this.el).toggleClass('active', this.model.selected).siblings().removeClass('active');
        },

        hide: function() {
            $(this.el).addClass('hidden');
        },

        watchlist: function() {
            $(this.el).addClass('watchlisted');
        },

        selectMovie: function() {
            if (!this.model.get('hidden')) {
                console.log('movie view:selectMovie');
                this.model.select();
            }
        },

        hideMovie: function() {
            console.log('movie view:hideMovie');
            this.model.hide();
        },

        watchlistMovie: function() {
            console.log('movie view:watchlistMovie');
            this.model.watchlist();
        }
    });

    return View;
});