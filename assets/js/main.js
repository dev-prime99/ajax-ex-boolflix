// CHIAVE API: ddb3139914f58732e5f61e64693b1c8f

$("#btn_search_bar").click(function (){

  //Save text input
  var input = $("#txt_search_bar").val();
  console.log(input);

  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie?api_key=ddb3139914f58732e5f61e64693b1c8f&query=" + input + "&page=1&include_adult=false",
    method: "GET",
    success: function (data){
      var num_film = data.results.length

      for (var i = 0; i < num_film; i++) {
        console.log(data)

        var source = $(".media-global").text()
        var template = Handlebars.compile(source)
        console.log(data.results[i].poster_path);

        var globalmedia = {
					title : data.response[i].title,
					original_title : data.response[i].original_title,
					original_language : data.response[i].original_language,
					vote_average : data.response[i].vote_average
				}

        var html = template(globalmedia);
        $("main").append(html)
      }
      console.log(num_film);
    },
    error: function (errore){

    }
  });

});
