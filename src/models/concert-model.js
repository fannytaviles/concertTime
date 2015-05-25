var ConcertItem = Backbone.Model.extend({
	defaults: { 
		id: 0, 
		img: '', 
		artist: '', 
		city:'', 
		description:'', 
		date: '',
		hour: '',
		place: '',
		urlInfo: '',
		tickets: '',
	},
	urlRoot: "data/conciertos",
	parse : function(response)
	{
		if($.isArray(response))
			return response[0];
		return response;
	}
});

var ConcertList = Backbone.Collection.extend({
	model: ConcertItem,
	url: "data/conciertos.json",
	sortField: "artist",
	search: function(letters)
	{
		if(letters === "") return this;
		var pattern = new RegExp(letters,'i');
		var filteredList = this.filter(function(data)
		{
			return (pattern.test( data.get('artist') + "  "+data.get('city') ));
		});
		var coll = new ConcertList(filteredList);
		return coll;
	}
});