describe("Reverb", function() {

	beforeEach(function() {
		$('#filtered').remove();
		$('body').append('<div id="filtered">Filtered: 0</div>');
	});

	it("should accept tweets with 0 retweets if no reverb level is set", function() {
		myTweetFilter({
			retweet_count: 0
		},
		null);
		expect($('#filtered').html()).toEqual('Filtered: 0');

	});
	it("should filter a tweet with a retweet count smaller than the reverb level", function() {
		revlevel = 1;
		myTweetFilter({
			retweet_count: 0
		},
		null);
		expect($('#filtered').html()).toEqual('Filtered: 1');
	});
	it("should accept a tweet with a retweet count of '100+'", function() {
		revlevel = 0;
		myTweetFilter({
			retweet_count: '100+'
		},
		null);
		expect($('#filtered').html()).toEqual('Filtered: 0');
	});

	it("should render 2 birds if the retweet count is 2", function() {
		var html = createReverbBar(2);
		expect(html.match(/img/g).length).toEqual(2);
		expect(html.match(/\.\./)).toEqual(null); 
	});

	it("should render 50 birds with '..' if the retweet count is more than 50", function() {
		var html = createReverbBar(51);
		expect(html.match(/\.\./).length).toEqual(1); 
		expect(html.match(/img/g).length).toEqual(51);
	});


});

