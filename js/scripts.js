$('#searchBtn').click(searchMovie);


function searchMovie() {
    $('#loader').css('display', 'block');
    document.getElementById("searchBtn").disabled = true;
    document.getElementById("movieNameInput").disabled = true;
    var url = 'http://www.omdbapi.com/';
    var data={};
    data.apikey='eec259';
    data.s=$('#movieNameInput').val();

    $.ajax({
        url: url,
        data: data,
        method: 'GET',
        success: showMoviesList
    });
}


function showMoviesList(respond) {
    var searchResponse = $("#searchResponse");

    if (respond.Search) {
        var counter = 0;

        var moviesDiv = $('#movies');
        var pattern = $("#moveTemplate")[0].innerHTML;
        $('#movies').empty();

        respond.Search.forEach(function (data) {
            console.log(data);
            moviesDiv.append(pattern.replace('[img]', data.Poster)
                                    .replace('[year]', data.Year)
                                    .replace('[title]', data.Title));
            counter +=1;
        })
        searchResponse.text("Found movies: " + counter);
    } else {
        searchResponse.text("There is no movie with this title.");
        $('#movies').empty();
    }

    document.getElementById("searchBtn").disabled = false;
    document.getElementById("movieNameInput").disabled = false;
    $('#loader').css('display', 'none');
}


