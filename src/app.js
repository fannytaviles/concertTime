var App = new (Backbone.Router.extend({
  routes: {
    "concierto/:id": "show",
    "conciertos(/)": "showConcerts",
    "index(/)": "index",
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
    this.navigate("index/",true);
  },

  showConcerts: function()
  {
    if(!this.activeList)
      this.activeList = new ConcertList(this.ConcertsList.models);
    var concertsView = new ConcertListaView({collection: this.activeList});
    $('#concertDetails').empty();
    $('#indexContainer').empty();
    $('#concertListContainer').addClass('fadeIn');
    $('#searchModuleSection').html(_.template($('#searchingTemplate').html(),
      { filter: _.escape(this.filter), sortField: this.activeList.sortField }
    ));
    $('#concertListContainer').html(concertsView.el);
    concertsView.render();
  },

  index: function(){
    var concertIndexView = new ConcertIndexView();
    $('#concertListContainer').removeClass('fadeIn');
    $('#searchModuleSection').empty();
    $('#concertListContainer').empty();
    $('#concertDetails').empty();
    $('#indexContainer').html(concertIndexView.el);
  },

  show: function(id)
  {
    var concert = new ConcertItem({id: id});
    var concertView = new ConcertInfoView({model: concert});
    $('#concertListContainer').removeClass('fadeIn');
    $('#indexContainer').empty();
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
    $('.concertViewList:empty').text("No se encontraron resultados");
  }

}))();