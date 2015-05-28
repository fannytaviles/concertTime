ConcertView = Backbone.View.extend({
	tagName: "span",
	initialize: function()
	{
		this.listenTo(this.model, "change", this.render);
	},

	render: function()
	{
		this.$el.html(_.template($('#itemConcertTemplate').html(),this.model.attributes));
	}
});

ConcertInfoView = Backbone.View.extend({
	initialize: function()
	{
		this.listenTo(this.model, "change", this.render);
	},

	render: function()
	{
		this.$el.html(_.template($('#detailsTemplate').html(),this.model.attributes));
	}
});

ConcertIndexView = Backbone.View.extend({
	initialize: function()
	{
		this.render();
	},

	render: function()
	{
		this.$el.html(_.template($('#indexTemplate').html(),{}));
	}
});

ConcertListaView = Backbone.View.extend({
	tagName: "span",
	className: "concertViewList",
	initialize: function()
	{
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "sort", this.render);
	},

	addAll: function()
	{
		this.collection.forEach(this.addOne, this);
	},

	render: function()
	{
		this.$el.empty();
		this.addAll();
	},

	addOne: function(item)
	{
		var itemConcert = new ConcertView({model: item});
		itemConcert.render();
		this.$el.append(itemConcert.el);
	}
});