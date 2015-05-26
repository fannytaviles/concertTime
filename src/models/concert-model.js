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
	sortField: 'city',
	comparator: function(concert1)
	{
		return concert1.get(this.sortField);
	},
	search: function(letters, field)
	{
		if(letters === "") return this;
		var pattern = new RegExp(letters,'i');
		var filteredList = this.filter(function(data)
		{
			if (field === 'artist')
			{
				return pattern.test(data.get('artist'));
			}else{
				return pattern.test(data.get('city'));
			}
		});
		var coll = new ConcertList(filteredList);
		return coll;
	}
});