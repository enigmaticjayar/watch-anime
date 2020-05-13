const BODY = document.getElementById("body");
const PATH = "https://storage.googleapis.com/auengine.appspot.com";

const ANIMELIST = [
  {
    name: "FairyTail",
    key: "ft",
    coverImage: "https://cdn.animeultima.tv/cover-photo/119/original.jpeg",
    maxEpisodes: 175,
    source: function (episodeNo) {
      return `${PATH}/119/sub/${episodeNo}_${3374 + episodeNo}.mp4`;
    },
  },
  {
    name: "FairyTail (2014)",
    key: "ft2",
    coverImage: "https://cdn.animeultima.tv/cover-photo/120/Phr4bCBebQvgOoXK1Rv9qPfZOYKMkqHlQD414mAn.jpeg",
    maxEpisodes: 102,
    source: function (episodeNo) {
      return `${PATH}/120/sub/${episodeNo}_${3549 + episodeNo}.mp4`;
    },
  },
  {
    name: "Weathering With You",
    key: "weatheringwithyou",
    coverImage: "https://cdn.animeultima.tv/cover-photo/2570/hGGBSUn2uQiHwJesPzHaFvbs6uOywht2DZWz8O7k.jpeg",
    maxEpisodes: 1,
    source: function (episodeNo) {
      return `${PATH}/2570/sub/1_42996.mp4`;
    },
  },
];

function displayList() {
  var cards = "";
  ANIMELIST.forEach(function (anime) {
    cards += `<div class="col mb-4"><div class="card cursor-pointer" id="${anime.key}"><img class="card-img-top" src="${anime.coverImage}" /><div class="card-body"><h5 class="card-title">${anime.name}</h5></div></div></div>`;
  });
  BODY.innerHTML = `<div class="row row-cols-2 row-cols-md-3 row-cols-lg-5">${cards}</div>`;

  ANIMELIST.forEach(function (anime) {
    document.getElementById(anime.key).addEventListener("mousedown", function () {
      displayAnime(anime);
    });
  });
}

displayList();

var navigate;
var watch;

function displayAnime(anime) {
  var episode = 1;
  BODY.innerHTML = `<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="#" id="home">Home</a></li><li class="breadcrumb-item active" aria-current="page">${anime.name}</li></ol></nav><div class="form-group row"><label for="episode" class="col-2 col-form-label">Episode</label><div class="col-10 input-group"><input type="number" class="form-control" id="episode" value="1" min="1" max="${anime.maxEpisodes}" /><div class="input-group-append"><button type="button" class="btn btn-outline-primary" onclick="watch()">Watch</button></div></div></div><div class="btn-group" role="group" aria-label="pagination"><button type="button" id="prev" class="btn btn-outline-success btn-sm" onclick="navigate(-1)">Previous</button><button type="button" id="next" class="btn btn-outline-success btn-sm" onclick="navigate(1)">Next</button></div><div id="video-container" class="embed-responsive embed-responsive-16by9"></div>`;

  function displayVideo(episodeNo) {
    if (episode === 1) {
      document.getElementById("prev").disabled = true;
    } else {
      document.getElementById("prev").disabled = false;
    }

    if (episode === anime.maxEpisodes) {
      document.getElementById("next").disabled = true;
    } else {
      document.getElementById("next").disabled = false;
    }
    var source = anime.source(episodeNo);
    document.getElementById(
      "video-container"
    ).innerHTML = `<video class="embed-responsive-item" controls><source src="${source}"></source></video>`;
  }

  displayVideo(episode);

  navigate = function (number) {
    episode += number;
    document.getElementById("episode").value = episode;
    displayVideo(episode);
  };

  watch = function () {
    episode = parseInt(document.getElementById("episode").value);

    if (episode < 1) {
      episode = 1;
    } else if (episode > anime.maxEpisodes) {
      episode = anime.maxEpisodes;
      document.getElementById("episode").value = episode;
    }

    displayVideo(episode);
  };

  document.getElementById("home").addEventListener("click", function (event) {
    event.preventDefault();
    displayList();
  });
}
