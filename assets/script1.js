    // generate scores
    intScore = JSON.parse(localStorage.getItem("intScore"));
    for (var i = 0; i < intScore.length; i++) {
        var userscoreEl = document.querySelector("#userScore");
        var lastScore = document.createElement("p");
        lastScore.textContent = intScore[i];
        userscoreEl.append(lastScore);
    };
    var reTake = document.querySelector("#Retake");
    reTake.addEventListener("click", function() {
      window.location.replace("index.html")
    })