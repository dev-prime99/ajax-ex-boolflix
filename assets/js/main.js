// CHIAVE API: ddb3139914f58732e5f61e64693b1c8f

$(document).ready(function() {

  $("#btn_search_bar").click(function (){

    compilatore();

  });

  $("a").click(function (){
    alert("ciao");
  });

  function compilatore(){
    //Save text input
    var input = $("#txt_search_bar").val();
    console.log(input);

    $.ajax({
      url: "https://api.themoviedb.org/3/search/multi?api_key=ddb3139914f58732e5f61e64693b1c8f&query=" + input + "&page=1&include_adult=false",
      method: "GET",
      success: function (data){
        // reset main
        $("div.container").empty();
        // reset input
        $("#txt_search_bar").val("");
        // salavare numero di voci prima pagina
        var num_film = data.results.length;

        var url_coverbase = "https://image.tmdb.org/t/p/w342";

        // ciclo compilazione media
        for (var i = 0; i < num_film; i++) {
          // console.log(data.results[i].media_type);

          // selezione bandiera per l'inserimento
          if (data.results[i].original_language == "en") {
            var flag = "assets/img/en.png"
          }else if (data.results[i].original_language == "it") {
            var flag = "assets/img/it.png"
          }else if (data.results[i].original_language == "us") {
            var flag = "assets/img/us.png"
          }else if (data.results[i].original_language == "fr") {
            var flag = "assets/img/fr.png"
          }else if (data.results[i].original_language == "de") {
            var flag = "assets/img/de.png"
          }else if (data.results[i].original_language == "es") {
            var flag = "assets/img/es.png"
          }else {
            var flag = "assets/img/global.png"
          }

          // scrematura film o tv
          if (data.results[i].media_type == "movie"){ // FILM
            var source = $(".movie-global").text()
            var template = Handlebars.compile(source)
            var url_cover = url_coverbase + data.results[i].poster_path;
            console.log(url_cover);

            if (url_cover == "https://image.tmdb.org/t/p/w342null") {
              url_cover = "";
            }

            var globalmedia = {
              cop: url_cover,
              title : data.results[i].title,
              original_title : data.results[i].original_title,
              flag : flag,
              overview : data.results[i].overview
            }
          } else if (data.results[i].media_type == "tv"){ // TV
            var source = $(".tv-global").text()
            var template = Handlebars.compile(source)

            var globalmedia = {
              cop: url_cover,
              name : data.results[i].name,
              original_name : data.results[i].original_name,
              flag : flag,
              overview : data.results[i].overview
            }
          }

          // scrittura nell'html
          var html = template(globalmedia);
          $("div.container").append(html);

          // assegnazione stelle valutazione
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

        // creazione pagine
        var n_pag = data.total_pages;
        // console.log(n_pag);

        $(".pag").append("<i class='fas fa-chevron-left'</i>")
        for (var i = 1; i <= n_pag; i++) {
          // console.log(i);
          $(".pag").append("<a href='#' class='numpag'>" + i + "</a>")
        }
        $(".pag").append("<i class='fas fa-chevron-right'</i>")

        console.log(num_film);
      },
      error: function (errore){

      }
    });

  };

});
