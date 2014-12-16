$(document).ready(function () {
    //Knockout Test
        var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo&channelId=UCutAQ7OXuxEZ1Cw3ZPmPOZA&part=snippet&maxResults=10";
        var viewModel = {};
        $.getJSON(url, function (data) {
            viewModel.model = data;
            ko.applyBindings(viewModel);

        });
    });


$(document).ready(function() {
	$('.dropdown-toggle').dropdown()
});

