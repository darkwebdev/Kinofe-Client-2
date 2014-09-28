define(['backbone.radio'], function(Radio) {

    var radio = Radio.channel('app');

    Radio.tuneIn('app');
    Radio.DEBUG = true;

    return radio;
});
