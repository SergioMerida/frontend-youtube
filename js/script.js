/**
 * @project frontend-youtube
 * @author Sergio Merida <tabarinisergio@gmail.com> 
 * Save all the data in arrays and makes easier manage with knockout
*/
stringUrl="";
UrlData = "";
viewCount = [];
likeCount = [];
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
		url : "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCZIdvJkrCNDjswEeRtMTbN6B9yEiz2pEo&channelId=UCutAQ7OXuxEZ1Cw3ZPmPOZA&part=snippet&maxResults=50&format=json",
		dataType : "jsonp",
		success : function(parsed_json) {
	
		for (var i = 0; i <= 49; i++) {
			if (i==49){
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
				for (var e = 0; e<=49; e++) {
					title.push(parsed_jso["items"][e]["snippet"]["title"])
					id.push(parsed_jso["items"][e]["id"])
					description.push(parsed_jso["items"][e]["snippet"]["description"])		
					viewCount.push(parsed_jso["items"][e]["statistics"]["viewCount"])
					likeCount.push(parsed_jso["items"][e]["statistics"]["likeCount"])
					commentCount.push(parsed_jso["items"][e]["statistics"]["commentCount"])
					image.push(parsed_jso["items"][e]["snippet"]["thumbnails"]["default"]["url"])
				};			
			console.log(id)
			console.log(title)
			var initialData = []
			for (var e = 0; e<=49; e++) {
				initialData.push(({name:title[e], images:image[e], view:viewCount[e], like:likeCount[e], comment:commentCount[e]
, ids:id[e]}))
			};

var ViewModel = function(items) {
    this.items = ko.observableArray(items);

	this.sortByName = function() {
        this.items.sort(function(a, b) {
            return a.name < b.name ? -1 : 1;
        });
    };

	this.sortByLikes = function() {
        this.items.sort(function(c, d) {
            return c.like > d.like ? -1 : 1;
        });
    };
	
	this.sortByViews = function() {
        this.items.sort(function(c, d) {
            return c.view > d.view ? -1 : 1;
        });
    };
	
	this.sortByComments = function() {
        this.items.sort(function(c, d) {
            return c.comment < d.comment ? -1 : 1;
        });
    };     

    this.gridOptions = {
        data: this.items,
        rowTemplate: "rowTmpl",
        useKOTemplates: true,
        height: 430,

        columns: [ 
            {
                title: "Name"
            },
            {
                title: "Image"   
            },
			{
				title: "View Count"
			},
			{
				title: "Like Count"
			},
			{
				title: "Comment Count"
			},
        ],
	pageable: {
        // we don't set any DataSource here
        pageSize: 3,
        buttonCount: 1
      },
    };
};

ko.applyBindings(new ViewModel(initialData));
		
 
/*
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
*/
/*
			var BetterListModel = function () {
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
			};<link href="Kendo/kendo.common.min.css" rel="stylesheet">
<link href="Kendo/kendo.silver.min.css" rel="stylesheet">
<link href="script.css" rel="stylesheet">
		ko.applyBindings(new BetterListModel());*/
			}
		}); /*End of second ajax call*/
		} /*end of variable with if and else*/

	});/*End of first ajax call*/
	
});/*End of ready function*/ 



