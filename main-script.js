const ANIMELIST = [
  {
    name: "FairyTail",
    key: "fairytail",
    coverImage: "https://cdn.animeultima.tv/cover-photo/119/original.jpeg",
  },
  {
    name: "FairyTail (2014)",
    key: "fairytail2",
    coverImage: "https://cdn.animeultima.tv/cover-photo/120/Phr4bCBebQvgOoXK1Rv9qPfZOYKMkqHlQD414mAn.jpeg",
  },
  {
    name: "FairyTail: Final Series",
    key: "fairytail3",
    coverImage: "https://cdn.animeultima.tv/cover-photo/593/50Y283QZDfpjJRG5ecMlmBw3gFfytZb15cMGdEY6.jpeg",
  },
];

const BODY = document.getElementById("body");

function animeCardContainer(cards) {
  return `<div class="row row-cols-2 row-cols-md-3 row-cols-lg-5">${cards}</div>`;
}

function animeCard(anime) {
  return `<div class="col mb-4"><div class="card cursor-pointer" id="${anime.key}"><img class="card-img-top" src="${anime.coverImage}" /><div class="card-body"><h5 class="card-title">${anime.name}</h5></div></div></div>`;
}

function displayList() {
  var cards = "";
  ANIMELIST.forEach(function (anime) {
    cards += animeCard(anime);
  });

  BODY.innerHTML = animeCardContainer(cards);

  document.getElementById("fairytail2").addEventListener("mousedown", displayFairyTail2);
}

displayList();

function viewingTemplate(name, maxEpisodes) {
  return `<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="#" onclick="displayList()">Home</a></li><li class="breadcrumb-item active" aria-current="page">${name}</li></ol></nav><div class="form-group row"><label for="episode" class="col-2 col-form-label">Episode</label><div class="col-10 input-group"><input type="number" class="form-control" id="episode" value="1" min="1" max="${maxEpisodes}" /><div class="input-group-append"><button type="button" class="btn btn-outline-primary" onclick="watch()">Watch</button></div></div></div><div class="btn-group" role="group" aria-label="pagination"><button type="button" class="btn btn-outline-success btn-sm" onclick="navigate(-1)">Previous</button><button type="button" class="btn btn-outline-success btn-sm" onclick="navigate(1)">Next</button></div><div id="video-container" class="embed-responsive embed-responsive-16by9"></div>`;
}

function videoTemplate(source) {
  return `<video class="embed-responsive-item" controls><source src="${source}"></source></video>`;
}

const PATH = "https://storage.googleapis.com/auengine.appspot.com";
var navigate;
var watch;

function displayFairyTail2(e) {
  var episode = 1;
  BODY.innerHTML = viewingTemplate("FairyTail", 102);

  function displayVideo(episodeNo) {
    document.getElementById("video-container").innerHTML = videoTemplate(
      `${PATH}/120/sub/${episodeNo}_${3549 + episodeNo}.mp4`
    );
  }

  displayVideo(episode);

  navigate = function (number) {
    episode += number;
    document.getElementById("episode").value = episode;
    displayVideo(episode);
  };

  watch = function () {
    episode = parseInt(document.getElementById("episode").value);
    displayVideo(episode);
  };
}
