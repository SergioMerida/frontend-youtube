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
					/*image.push("<img src=\""+imag+"\">");*/
				};			

			var initialData = []
			for (var e = 0; e<=9; e++) {
				initialData.push(({name:title[e], images:image[e]}))
			};
			

	console.log(initialData);
 
var PagedGridModel = function(items) {
    this.items = ko.observableArray(items);
 
    this.addItem = function() {
        this.items.push({ name: "New item", images: "New image" });
    };
 
    this.sortByName = function() {
        this.items.sort(function(a, b) {
            return a.name < b.name ? -1 : 1;
        });
    };
 
    this.jumpToFirstPage = function() {
        this.gridViewModel.currentPageIndex(0);
    };
 
    this.gridViewModel = new ko.simpleGrid.viewModel({
        data: this.items,
        columns: [
            { headerText: "Item Name", rowText: "name" },
            { headerText: "Sales Count", rowText: "images"},
        ],
        pageSize: 10
    });
};
 
ko.applyBindings(new PagedGridModel(initialData));
			/*var BetterListModel = function () {
			this.allId = ko.observableArray(id); // Initial items
			this.title = ko.observableArray(title);
			this.titleAndImage = ko.observableArray ([
				{name: title, images:image},
			]);
			
			this.lowerItems = function(){
				this.title.toLowerCase();
			};

			this.sortItems = function() {
				this.title.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
				});
			};
			};
		ko.applyBindings(new BetterListModel());*/
			}
		}); /*End of second ajax call*/
		} /*end of variable with if and else*/

	});/*End of first ajax call*/
	
});/*End of ready function*/ 



