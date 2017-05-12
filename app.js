$(function() {
	// alert('hi');
	var keyword = "",
		size = "",
		errors = 0,
		perPagelimit = 20,
		page = 1,
		imgId = "",
		photoId = "",
		apiKey = "84581076bd0125f924d6fc410596cf3a",
		baseUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=";
	var sizeUrl2 = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=84581076bd0125f924d6fc410596cf3a&photo_id="+photoId+"&format=json&nojsoncallback=1"
	var sizeUrl1 = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=236d3dc3aa4d47d4e8db7fe4e444c0e6&photo_id=34086429451&format=json&nojsoncallback=1"
	$('#error1').hide();

	document.getElementById('keywordSearch').addEventListener('submit', function(event) {
		event.preventDefault();
		if ($('#keyword').val() !== "") {
			keyword = $('#keyword').val();
		}
		else { errors++ }

		var patt = new RegExp("[0-9]{1,4}");

		if (patt.test($('#size').val())) {
			size = $('#size').val();
		}
		else { errors++ }

		if (errors !== 0) { 
			$('#error1').show(400);
			errors = 0;
		}
		else {
			searchUrl = baseUrl+apiKey+"&tags="+keyword+"&per_page="+perPagelimit+"&page="+page+"&has_geo=yes&format=json&nojsoncallback=1";
			// form is valid - run ajax request with form values
			$( "#photoOutput" ).empty();
			grabPhotos(searchUrl, size);
		}
	});
	/**
	 * Goes out to the Flickr API, and prints results to screen. Only shows images that have sizes specified in select input
	 * @param  {string} keyWd      keyword to search for
	 * @param  {int} searchSize    size of photos to display
	 */
	function grabPhotos(keyWd, searchSize) {
		console.log(searchUrl);
		$.getJSON(searchUrl, function(data){
			// console.log(data)
			 if(data.photos.photo.length > 0) {
		 		$.each(data.photos.photo, function(i, item) {
					// console.log(item.id);
					


					var sizeUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+apiKey+"&photo_id="+item.id+"&format=json&nojsoncallback=1";
					$.getJSON(sizeUrl, function(size) {
						console.log(size.sizes.size)
						$.each(size.sizes.size, function(j, resultSize) {
							//console.log(searchSize);
							if(resultSize.width == searchSize) {
								$('#photoOutput').append("<p><a href='"+resultSize.url+"'><img src='"+resultSize.source+"' class='img-fluid'></a></p>");
							}
						});
					});
				})
			 }
			 else alert('Sorry your search word did not return any results. Please try again.');	
		});
	};
}); // end $()











