var typingTimer;
var doneTypingInterval = 1000; //time in ms, 5 second for example
var $input = $('#find');

//on keyup, start the countdown
$input.on('keyup', function () {
	clearTimeout(typingTimer);
	typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
	clearTimeout(typingTimer);
});

//user is "finished typing," lets search
function doneTyping() {
	search();
}

function openSearch() {
	$('.search-overlay').toggleClass('search-overlay-show');
	$('#find').focus();
}

function search() {
	var spinner = "";
	if (spinner != '') {
		$('#results').html('').html('<img src="" style="width:50px;margin-bottom:15px;"/><br/><span style="text-align:center;">Searching...</span>');
	} else {
		$('#results').html('').html('<span style="text-align:center;">Searching...</span>');
	}
	jQuery.ajax({
		url: '/wp-admin/admin-ajax.php',
		type: 'post',
		data: {
			action: 'custom_search',
			s: $('#find').val()
		},
		success: function (response) {
			$('#find').blur();
			var obj = jQuery.parseJSON(response);
			var i;
			var txt = "";
			if (obj.length) {
				for (i = 0; i < obj.length; i++) {
					txt = txt + '<div class="large-12 columns" style="text-align:left;margin-bottom:15px; position: relative;" data-wow-duration="0.5s" data-wow-offset="900"><a href="' + obj[i].guid + '" target="_blank"><h5> ' + obj[i].post_title + '</h5><h6>' + obj[i].post_content.substring(0, 100) + '</h6><br/><span style="position: absolute;top: 25%;right: 0;font-size: 20px;color: #d71f3a;"><i class="fas fa-chevron-right"></i></span></a></div>';
				}
				setTimeout(function () {
					$('#results').html('').append(txt);
				}, (900));
			} else {
				txt = 'No results found!';
				$('#results').html('').append(txt);
			}
		}
	});
}