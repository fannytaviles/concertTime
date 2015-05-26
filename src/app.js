var App = new (Backbone.Router.extend({
  routes: {
    "concierto/:id": "show",
    "conciertos(/)": "index",
    "*any" : "redirect"
     },

  initialize: function(){

  },

  start: function(init){
    this.ConcertsList = new ConcertList(init.data);
    this.activeList = null;
    this.filter='';
    Backbone.history.start();
  },

  redirect: function()
  {
    this.navigate("conciertos/",true);
  },

  index: function(){
    if(!this.activeList)
      this.activeList = new ConcertList(this.ConcertsList.models);

    var concertsView = new ConcertListaView({collection: this.activeList});
    $('#concertDetails').empty();
    $('#concertListContainer').addClass('fadeIn');
    $('#searchModuleSection').html(_.template($('#searchingTemplate').html(),
      { filter: _.escape(this.filter), sortField: this.activeList.sortField }
    ));
    $('#concertListContainer').html(concertsView.el);
    concertsView.render();
  },

  show: function(id)
  {
    var concert = new ConcertItem({id: id});
    var concertView = new ConcertInfoView({model: concert});
    $('#concertListContainer').removeClass('fadeIn');
    $('#searchModuleSection').empty();
    $('#concertListContainer').empty();
    $('#concertDetails').html(concertView.el);
    concert.fetch();
  },

  sortBy: function(field)
  {
    this.activeList.sortField = field;
    this.activeList.sort();
  },

  filterBy: function(filter)
  {
    this.filter = filter;
    var field = this.activeList.sortField;
    this.activeList = this.ConcertsList.search(this.filter, field);
    this.activeList.sortField = field;
    this.activeList.sort();
    var concertsView = new ConcertListaView({collection: this.activeList });
    concertsView.render();
    $('#concertListContainer').html(concertsView.el);
  }

}))();