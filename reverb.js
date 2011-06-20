var revlevel = 1;
var filtered = 0;
var debug = false;

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

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
	var twittername = getUrlVars()['twittername'];
	var listname = getUrlVars()['listname'];
debug = getUrlVars()['debug'];
	$('#twittername').val(twittername);
	$('#listname').val(listname);

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
	var twittername = $('#twittername').val();
	var listname = $('#listname').val();
	$('#tweetFeed').empty();
	$('#tweetFeed').jTweetsAnywhere({
		username: twittername,
		list: listname,
		count: 5,
		tweetFilter: myTweetFilter,
		tweetDecorator: myTweetDecorator,
		showTweetBox: {
			label: '<span style="color: #D1C7BA">Spread the word ...</span>'
		}
	});
if (debug){
	$('#tweetFeed').jTweetsAnywhere({
		username: 'andreashhh',
		list: 'rvrb',
		count: 5,
		showTweetBox: {
			label: '<span style="color: #D1C7BA">Spread the word ...</span>'
		}
	});
}
};

