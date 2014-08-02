define(['marionette', 'handlebars', 'text!templates/movie-item.hbs'], function(Marionette, Handlebars, html) {

    var View = Marionette.ItemView.extend({

        tagName: 'li',
        className: 'listItem',
        template: Handlebars.compile(html),

        events: {
            'click .hide': 'hideMovie',
            'click .watchlist': 'toggleWatchlistedMovie',
            'click .select': 'selectMovie',
            'click .restore': 'restoreMovie'
        },

        modelEvents: {
            'change:selected': 'highlight',
            'change:hidden': 'hide',
            'change:watchlisted': 'checkWatchlisted'
        },

        initialize: function() {
//            console.log('MovieItemView:init', this.model);
            this.checkWatchlisted(); // set the proper watchlisted icon
        },

        highlight: function() {
            $(this.el).toggleClass('active', this.model.selected).siblings().removeClass('active');
        },

        hide: function() {
            $(this.el).addClass('hidden');
        },

        checkWatchlisted: function() {
//            console.log('movie item view:checkWatchlisted', this.model.get('id'), this.model.get('watchlisted'));
            $(this.el).toggleClass('watchlisted', this.model.get('watchlisted'));
        },

        selectMovie: function() {
            console.log('movie view:selectMovie');
            this.model.select();
        },

        hideMovie: function() {
            console.log('movie view:hideMovie');
            this.model.hide();
        },
        restoreMovie: function() {
            console.log('movie view:restoreMovie');
            this.model.restore();
        },

        toggleWatchlistedMovie: function() {
            console.log('movie view:toggleWatchlistedMovie');
            this.model.toggleWatchlisted();
        }
    });

    return View;
});