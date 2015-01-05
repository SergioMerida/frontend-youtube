/**
 * @project frontend-youtube
 * @author Sergio Merida <tabarinisergio@gmail.com> 
 * Bring all the Id and then we save in UrlData with the new Url
*/
stringUrl="";
UrlData = [];
viewCount = [];
$(document).ready(function() {
	$('.dropdown-toggle').dropdown()
});

$(document).ready(function($) {
	$.ajax({
		url : "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo&channelId=UCutAQ7OXuxEZ1Cw3ZPmPOZA&part=snippet&maxResults=10&format=json",
		dataType : "jsonp",
		success : function(parsed_json) {
	
		for (var i = 0; i <= 9; i++) {
			if (i==9){
				stringUrl = stringUrl + parsed_json["items"][i]["id"]["videoId"];
			}else{
				stringUrl = parsed_json["items"][i]["id"]["videoId"]+ "%2C+" +stringUrl
			};		
		};
		UrlData.push("https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+statistics&id="+stringUrl+"&maxResults=10&key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo");
		console.log(UrlData);

		}
	});
	$.ajax({
		url: UrlData,
		dataType : "jsonp",
		success : function(parsed_json) {
			for (var e = 0; e<=9; e++) {
				viewCount.push(parsed_json["items"]["statistics"][e]["viewcount"])
			};
			
		}
	
	});
console.log(viewCount);
});




/*
var BetterListModel = function () {
			this.itemToAdd = ko.observable("");
			this.allItems = ko.observableArray([stringUrl]); // Initial items
			
			this.lowerItems = function(){
				this.allItems.toLowerCase();
			};
			this.sortItems = function() {
				this.allItems.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
				});
			};
			};
		ko.applyBindings(new BetterListModel());
*/
