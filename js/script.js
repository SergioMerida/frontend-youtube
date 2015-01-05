/**
 * @project frontend-youtube
 * @author Sergio Merida <tabarinisergio@gmail.com> 
 * Save all the data in arrays and makes easier manage with knockout
*/
stringUrl="";
UrlData = "";
viewCount = [];
likeCount = [];
favoriteCount = [];
commentCount = [];
id = [];
title = [];
description = [];
image = [];

/**
 * Dropdown of filters 
*/
$(document).ready(function() {
	$('.dropdown-toggle').dropdown()
});

$(document).ready(function($) {
	$.ajax({
		url : "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo&channelId=UCutAQ7OXuxEZ1Cw3ZPmPOZA&part=snippet&maxResults=10&format=json",
		dataType : "jsonp",
		success : function(parsed_json) {
	
		for (var i = 0; i <= 9; i++) {
			id.push(parsed_json["items"][i]["id"]["videoId"])
			if (i==9){
				stringUrl = stringUrl + parsed_json["items"][i]["id"]["videoId"];
			}else{
				stringUrl = parsed_json["items"][i]["id"]["videoId"]+ "%2C+" +stringUrl
			}; /*End of for*/		
		};/*Succes*/
		UrlData = "https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+statistics&id="+stringUrl+"&maxResults=10&key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo";
		console.log(UrlData)
		$.ajax({
			url: UrlData,
			dataType : "jsonp",
			success : function(parsed_jso) {
				for (var e = 0; e<=9; e++) {
					title.push(parsed_jso["items"][e]["snippet"]["title"])
					description.push(parsed_jso["items"][e]["snippet"]["description"])		
					viewCount.push(parsed_jso["items"][e]["statistics"]["viewCount"])
					likeCount.push(parsed_jso["items"][e]["statistics"]["likeCount"])
					favoriteCount.push(parsed_jso["items"][e]["statistics"]["favoriteCount"])
					commentCount.push(parsed_jso["items"][e]["statistics"]["commentCount"])
					image.push(parsed_jso["items"][e]["snippet"]["thumbnails"]["default"]["url"])
				};	
			console.log(id)
			console.log(title)
			console.log(description)
			console.log(viewCount)
			console.log(likeCount)
			console.log(favoriteCount)
			console.log(commentCount)
			console.log(image)

			var BetterListModel = function () {
			this.allId = ko.observableArray(id); // Initial items
			this.title = ko.observableArray(title);
			this.allImage = ko.observableArray(image)
			
			this.lowerItems = function(){
				this.allId.toLowerCase();
				this.title.toLowerCase();
				this.allImage.toLowerCase();
			};
			this.sortItems = function() {
				this.title.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
				});
			};
			};
		ko.applyBindings(new BetterListModel());
			}
		}); /*End of second ajax call*/
		} /*end of variable with if and else*/

	});/*End of first ajax call*/
	
});/*End of ready function*/ 



