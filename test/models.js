define(['collections/movie-list', 'text!../data/movie-list.json'], function(MovieList, movieListData) {

    describe('MovieList Collection', function() {

        var collection = new MovieList();

        it('can create instance', function() {
            expect(collection).to.exist;
        });

        it.skip('can fetch data', function() {
            sinon.stub($, 'ajax').yieldsTo('success', JSON.parse(movieListData));
            collection.fetch();
//            console.log(collection);
            expect(collection).to.have.length(10);
            expect(collection.at(0).get('name')).equal('Argo');
        });
    });

});
