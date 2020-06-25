const COVERPHOTO = "https://cdn.animeultima.tv/cover-photo";
const AUENGINE = "https://storage.googleapis.com/auengine.appspot.com";

const getCoverPhoto = (key, name) => `${COVERPHOTO}/${key}/${name}`;

const ANIMELIST = [
    {
        name: "FairyTail",
        key: "119",
        coverImage: getCoverPhoto(119, "original.jpeg"),
        maxEpisodes: 175,
        server: "auengine",
        source: (episodeNo) => `${AUENGINE}/119/sub/${episodeNo}_${3374 + episodeNo}.mp4`,
    },
    {
        name: "FairyTail (2014)",
        key: "120",
        coverImage: getCoverPhoto(120, "Phr4bCBebQvgOoXK1Rv9qPfZOYKMkqHlQD414mAn.jpeg"),
        maxEpisodes: 102,
        server: "auengine",
        source: (episodeNo) => `${AUENGINE}/120/sub/${episodeNo}_${3549 + episodeNo}.mp4`,
    },
    {
        name: "Weathering With You",
        key: "2570",
        coverImage: getCoverPhoto(2570, "hGGBSUn2uQiHwJesPzHaFvbs6uOywht2DZWz8O7k.jpeg"),
        maxEpisodes: 1,
        server: "auengine",
        source: (episodeNo) => `${AUENGINE}/2570/sub/1_42996.mp4`,
    },
    {
        name: "Naruto",
        key: 118,
        coverImage: getCoverPhoto(118, "original.jpeg"),
        maxEpisodes: 220,
        server: "auengine",
        source: (episodeNo) => `${AUENGINE}/118/sub/${episodeNo}_${10848 + episodeNo}.mp4`,
    },
];
