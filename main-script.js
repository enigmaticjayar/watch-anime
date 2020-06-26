const BODY = document.getElementById("body");

function displayList() {
    var cards = "";

    ANIMELIST.forEach(function (anime) {
        cards += `
            <div class="col mb-4">
                <div class="card cursor-pointer" id="${anime.key}">
                    <img class="card-img-top" src="${anime.coverImage}" />
                    <div class="card-body">
                        <h5 class="card-title">${anime.name}</h5>
                    </div>
                </div>
            </div>
        `;
    });

    BODY.innerHTML = `
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Watch Anime Online</h1>
                <p class="lead">This is a personal website for watching anime.</p>
            </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5">${cards}</div>
    `;

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

    BODY.innerHTML = `
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="#" id="home">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">${anime.name}</li>
            </ol>
        </nav>
        <div class="form-group row">
            <label for="episode" class="col-2 col-form-label">Episode</label>
            <div class="col-10 input-group">
                <input type="number" class="form-control" id="episode" value="1" min="1" max="${anime.maxEpisodes}" />
                <div class="input-group-append">
                    <button type="button" class="btn btn-outline-primary" onclick="watch()">Watch</button>
                    <button type="button" id="prev" class="btn" onclick="navigate(-1)">Previous</button>
                    <button type="button" id="next" class="btn" onclick="navigate(1)">Next</button>
                </div>
            </div>
        </div>
        <div id="video-container" class="embed-responsive embed-responsive-16by9"></div>
    `;

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

        if (anime.server === "auengine") {
            document.getElementById(
                "video-container"
            ).innerHTML = `<video class="embed-responsive-item" controls><source src="${source}"></source></video>`;
        }
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
