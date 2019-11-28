// CHIAVE API: ddb3139914f58732e5f61e64693b1c8f

$(document).ready(function() {

  var parola, numpag = 1;

  $("#btn_search_bar").click(function (){

    // salvare la parola di ricerca
    parola = $("#txt_search_bar").val();

    compilatore(1, parola);

  });

  function compilatore(nclick, input){
    var nclick, nump;

    // aggiungere la pagina al link della url(ajax)
    if (nclick == "" && nclick < 1) {
      nump = 1;
    } else {
      nump = nclick;
    }

    // console.log(nump);

    $.ajax({
      url: "https://api.themoviedb.org/3/search/multi?api_key=ddb3139914f58732e5f61e64693b1c8f&query=" + input + "&page=" + nump + "&include_adult=false",
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
            // console.log(url_cover);

            // aggiunta cover
            if (url_cover == "https://image.tmdb.org/t/p/w342null") {
              url_cover = "";
            }

            // handlebars
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
            // url completa per il poster
            var url_cover = url_coverbase + data.results[i].poster_path;

            // aggiunta cover
            if (url_cover == "https://image.tmdb.org/t/p/w342null") {
              url_cover = "";
            }

            // handlebars
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
          // console.log(halfvote);

          // aggiunta delle stelle
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

        // creazione pagine + freccie
        var n_pag = data.total_pages;
        // console.log(n_pag);

        // reset pie pagina (numeri e freccie)
        $(".pag").empty();

        $(".pag").append("<i class='fas fa-chevron-left'</i>")
        for (var i = 1; i <= n_pag; i++) {
          // console.log(i);
          $(".pag").append("<p class='numpag'>" + i + "</p>")
        }
        $(".pag").append("<i class='fas fa-chevron-right'</i>")

        // console.log(num_film);

        return input;
      },
      error: function (errore){

      }
    });

    // console.log(input);

    parola = input;

  };


  // funzione selezione numero di pagina
  $(document).on('click', '.numpag', function(){
    var n = $(this).text();

    numpag = parseInt(n);

    compilatore(numpag, parola)
  });

  // funzione spostarsi avanti di uno con la freccia tra le pagine
  $(document).on('click', '.pag .fa-chevron-right', function(){

    var ln = $(".pag p:last-of-type").text()

    var ultimo = parseInt(ln);

    if (numpag < ultimo) {
      numpag++;
    } else {
      numpag = 1;
    }

    compilatore(numpag, parola);

  });

  // funzione spostarsi indietro di uno con la freccia tra le pagine
  $(document).on('click', '.pag .fa-chevron-left', function(){

    var ln = $(".pag p:last-of-type").text()

    var ultimo = parseInt(ln);

    if (numpag > 1) {
      numpag--;
    } else {
      numpag = ultimo;
    }

    compilatore(numpag, parola);

  });

});
