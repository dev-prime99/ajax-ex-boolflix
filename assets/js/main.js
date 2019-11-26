// CHIAVE API: ddb3139914f58732e5f61e64693b1c8f

$("#btn_search_bar").click(function (){

  //Save text input
  var input = $("#txt_search_bar").val();
  console.log(input);
  $("main").empty();

  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie?api_key=ddb3139914f58732e5f61e64693b1c8f&query=" + input + "&page=1&include_adult=false",
    method: "GET",
    success: function (data){
      var num_film = data.results.length

      for (var i = 0; i < num_film; i++) {

        var source = $(".media-global").text()
        var template = Handlebars.compile(source)

        var globalmedia = {
					title : data.results[i].title,
					original_title : data.results[i].original_title,
					original_language : data.results[i].original_language
				}

        var html = template(globalmedia);
        $("main").append(html);

        //assegnazione stelle valutazione
        var vote = data.results[i].vote_average;
        var halfvote = parseInt(Math.floor(vote / 2));
        console.log(halfvote);

        if (halfvote < 1) {
          $(".media:last-child .vote").append('<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>')
        }else if (halfvote == 1) {
          $(".media:last-child .vote").append('<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>')
        }else if (halfvote == 2) {
          $(".media:last-child .vote").append('<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>')
        }else if (halfvote == 3) {
          $(".media:last-child .vote").append('<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>')
        }else if (halfvote == 4) {
          $(".media:last-child .vote").append('<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>')
        }else if (halfvote == 5) {
          $(".media:last-child .vote").append('<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>')
        }
      }
      console.log(num_film);
    },
    error: function (errore){

    }
  });

});
