App = Ember.Application.create();

App.Router.map(function() {
    this.resource('movies', {path:'/'}, function(){
        this.resource('movie', {path: '/:movie_id'});
    });
});

App.MoviesRoute = Ember.Route.extend({
    model: function() {
        return this.store.find(App.Movie);
    }
});

App.MovieRoute = Ember.Route.extend({
    model: function(param) {
        return this.store.find(App.Movie,param.movie_id);
    }
});

App.MovieController = Ember.ObjectController.extend({
    actions : {
        rateMovie : function( movie, rating ){
            this.get('model').set('starRating', rating);
        }
    }
});

App.StarRatingComponent = Ember.Component.extend({
    maxStars: 0,
    starRating: 0,
    stars: [],
    click: function(ev){
        var rating = this.$(ev.target).attr('id');
        if(!rating){
            return;
        }
        this.set('starRating', rating);
        this.sendAction('action',this.get('param'), rating);
    },
    didInsertElement: function() {
        this.setRating();
    },
    setRating: function() {
        var stars = [], i = 0;
        var starRating = this.get('starRating');
        for(i = 0; i < this.get('maxStars'); i++){
            stars.pushObject(Em.Object.create({empty:i >= starRating, index:i+1}));
        }
        this.set('stars', stars);
    }.observes('starRating')
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Movie = DS.Model.extend({
    title: DS.attr('string'),
    starRating: DS.attr('number'),
    maxStarRating: DS.attr('number'),
    releasedYear: DS.attr('number'),
    review: DS.attr('string')
});

App.Movie.FIXTURES = [
    {
        id : 1,
        title : 'Blood Sport',
        starRating: 3,
        maxStarRating: 5,
        releasedYear: 1990,
        review: "An Epic story of love and loss."
    },
    {
        id : 2,
        title : 'Blood Sport II: 2 much 2 Blood',
        starRating: 4,
        maxStarRating: 5,
        releasedYear: 1991,
        review: "Based on the coming of age novel \"Never Been in Love... twice\"."
    },
    {
        id : 3,
        title : 'Blood Sport III:   O(log N) Blood Growth',
        starRating: 5,
        maxStarRating: 5,
        releasedYear: 1992,
        review: "The third and final conclusion to the trilogy of our time."
    }
];

