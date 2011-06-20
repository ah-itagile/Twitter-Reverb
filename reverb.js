var revlevel = 1;
var filtered = 0;
myTweetFilter = function(tweet, options) {
	var enough_reverb = tweet.retweet_count >= revlevel;
	if (!enough_reverb) {
		filtered++;
		$('#filtered').html('Filtered: ' + filtered);
	}
	return enough_reverb;
};

myTweetDecorator = function(tweet, options) {
	// the default tweet is made of the optional user's profile image and the
	// tweet body inside a list item element
	var html = '';

	if (options._tweetFeedConfig.showProfileImages) {
		html += options.tweetProfileImageDecorator(tweet, options);
	}

	if (options.tweetBodyDecorator) {
		html += options.tweetBodyDecorator(tweet, options);
	}
html += 'Reverb:' + tweet.retweet_count;
	html += '<div class="jta-clear">&nbsp;</div>';

	return '<li class="jta-tweet-list-item">' + html + '</li>';
};

$(document).ready(function() {
	$('#go_button').click(function() {
		load_tweets();
	});
	$('#slider').slider();
	$('#slider').slider({
		slide: function(event, ui) {
			revlevel = ui.value;
			$('#reverb_level').html('Reverb level :' + ui.value);
		},
		change: function(event, ui) {
			load_tweets();
		}
	});
});

load_tweets = function() {
	filtered = 0;
	$('#tweetFeed').empty();
	$('#tweetFeed').jTweetsAnywhere({
		username: 'andreashhh',
		list: 'rvrb',
		count: 5,
		tweetFilter: myTweetFilter,
		tweetDecorator: myTweetDecorator,
		showTweetBox: {
			label: '<span style="color: #D1C7BA">Spread the word ...</span>'
		}
	});
	$('#tweetFeed').jTweetsAnywhere({
		username: 'andreashhh',
		list: 'rvrb',
		count: 5,
		showTweetBox: {
			label: '<span style="color: #D1C7BA">Spread the word ...</span>'
		}
	});

};

