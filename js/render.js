define(function(require) {

    var render = function(name, html, model) {

        if (_.isString(model)) {
            model = JSON.parse(model);
        }

        $('.module-view').append(
            '<li>' +
                '<div class="model">' + jsonMarkup(model) + '</div>' +
                '<h1>' + name + '</h1>' +
                '<div class="view">' + html + '</div>' +
            '</li>'
        );
    };

    return render;
});

