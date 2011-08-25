var revlevel = 0;
var filtered = 0;
var debug = false;
var reverb_for_hundredplus = 100;
var hundredplus_from_twitter = '100+';

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

myTweetFilter = function(tweet, options) {
	var enough_reverb = tweet.retweet_count == hundredplus_from_twitter || tweet.retweet_count >= revlevel;
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
	html += createReverbBar(tweet.retweet_count);
	html += '<div class="jta-clear">&nbsp;</div>';

	return '<li class="jta-tweet-list-item">' + html + '</li>';
};

createReverbBar = function(retweet_count) {
	var MAX_REVERB_BIRDS = 50;
	if (retweet_count == hundredplus_from_twitter) {
		retweet_count = MAX_REVERB_BIRDS + 1;
	}
	var html = '';
	var birds = retweet_count > MAX_REVERB_BIRDS ? MAX_REVERB_BIRDS : retweet_count;
	for (i = 0; i < birds; i++) {
		html += "<img src=\"twitter_newbird_blue.png\" width=\"15\" height=\"15\" />";
	}
	if (retweet_count > MAX_REVERB_BIRDS) {
		html += '..';
		html += "<img src=\"twitter_newbird_blue.png\" width=\"15\" height=\"15\" />";
	}
	return html;

};
$('div').live('pagecreate', function(){
 /* ('create'); */
$('#go_button').live('click', function(){
console.log('go clicked');
load_tweets();
});

});

$(document).ready(function() {
	var twittername = getUrlVars()['twittername'];
	var listname = getUrlVars()['listname'];
	debug = getUrlVars()['debug'];
	$('#twittername').val(twittername);
	$('#listname').val(listname);
/*
	$('#go_button').click(function() {
		load_tweets();
	});
*/
/*	$('#go_button').live('click', function() {
		alert('xxx');
	});
*/
$("#aslider").live('change', function(event, ui){
revlevel = this.value;
console.log('slider changed:'  + revlevel);
	/*		load_tweets();*/
		}
	);
});

load_tweets = function() {
	filtered = 0;
	var twittername = $('#twittername').val();
	var listname = $('#listname').val();
x = $('#tweetFeed'); 
	$('#tweetFeed').empty();
	$('#tweetFeed').jTweetsAnywhere({
		username: twittername,
		list: listname,
		count: 20,
		tweetFilter: myTweetFilter,
		showTweetFeed: {
			paging: {
				mode: 'more'
			}
		},
		tweetDecorator: myTweetDecorator,
		showTweetBox: {
			label: '<span style="color: #D1C7BA">Spread the word ...</span>'
		}
	});
	if (debug) {
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

