(function () {
  var body = document.body;
  var currentPage = body ? body.getAttribute("data-page") : "";
  var nav = document.getElementById("site-nav");
  var navToggle = document.querySelector(".nav-toggle");

  document.querySelectorAll("[data-nav]").forEach(function (link) {
    if (link.getAttribute("data-nav") === currentPage) {
      link.classList.add("is-active");
    }
  });

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var filterButtons = document.querySelectorAll("[data-filter]");
  var guideCards = document.querySelectorAll("[data-mood]");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");

      filterButtons.forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });

      guideCards.forEach(function (card) {
        var mood = card.getAttribute("data-mood");
        card.classList.toggle("is-hidden", filter !== "all" && mood !== filter);
      });
    });
  });

  var gameData = {
    "too-fast": {
      title: "去龙门石窟，听一会儿沉默",
      text: "小灰说你必须再快一点。橘小洛想了想，决定带你去龙门石窟。那里有很多不着急回答的石头，也有很多终于可以放下的念头。"
    },
    "cannot-sleep": {
      title: "去洛河边，把夜晚走轻",
      text: "睡不着的时候，不必急着战胜黑夜。橘小洛会沿着洛河慢慢走，让水声替你把白天折好。"
    },
    "want-leave": {
      title: "去洛邑古城，短暂逃离也可以",
      text: "有些灯火不是答案，但可以让人喘口气。小灰负责承认想逃，橘小洛负责陪你回来。"
    },
    "missed": {
      title: "去牡丹园，和错过和解",
      text: "错过花期不是失败。橘小洛会告诉你，盛开过的东西已经发生过，它们不会因为你晚到就失去意义。"
    }
  };

  var result = document.getElementById("game-result");
  var choiceButtons = document.querySelectorAll("[data-game-choice]");

  choiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var choice = button.getAttribute("data-game-choice");
      var data = gameData[choice];

      choiceButtons.forEach(function (item) {
        item.classList.toggle("is-selected", item === button);
      });

      if (result && data) {
        result.innerHTML = '<span class="paw-track">ฅ</span><h2>' + data.title + "</h2><p>" + data.text + "</p>";
      }
    });
  });
})();
