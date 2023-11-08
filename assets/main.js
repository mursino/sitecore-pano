window.onhashchange = function () {
  window.location.reload();
};

const json = fetch("/api/content").then((response) => response.json());

json.then((res) => {
  const count = res.data.scenes.results.length;

  if (window.location.href.indexOf("#") != -1) {
    const sceneId = location.href.substring(location.href.indexOf("#") + 1);

    res.data.scenes.results.forEach((sc) => {
      if (sc.id === sceneId) {
        const scene = sc;
        const backgroundImage = scene.sceneImage.results[0];
        const backgroundImageDescription = backgroundImage.description;
        const backgroundImageUrl = backgroundImage.fileUrl;

        if (backgroundImageDescription !== "") {
          document.querySelector("#photo-credit").href =
            backgroundImageDescription;
          document.querySelector(".credit").style = "display: block";
        }

        let hotSpots = scene.hotspots.results.map(function (item) {
          return {
            pitch: parseFloat(item.pitchstring),
            yaw: parseFloat(item.yawstring),
            type: "info",
            text: item.hotspotName,
          };
        });

        const debug =
          new URLSearchParams(window.location.search).get("debug") === "true";

        document.querySelector("#reload").style = "display: block";
        document.querySelector("#reloadlink").href =
          location.protocol + "//" + location.host + location.pathname;

        pannellum.viewer("panorama", {
          type: "equirectangular",
          panorama: backgroundImageUrl,
          autoLoad: true,
          hotSpotDebug: debug,
          hotSpots: hotSpots,
        });

        return;
      }
    });

    return;
  }

  if (count > 1) {
    let links = [];
    res.data.scenes.results.forEach((element) => {
      const name = element.sceneName;
      let link = `<li><a href="#${element.id}">${name}</a></li>`;
      links.push(link);
    });
    const list = links.join("");
    document.querySelector("#list").innerHTML = `
    <div class="selection"><p>Pick a panorama scene:</p>
    <ul>${list}</ul></div>
    `;
    return;
  }
});
