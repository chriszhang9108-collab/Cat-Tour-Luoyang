(function () {
  var data = window.CAT_LUOYANG_DATA || {};
  var root = document.documentElement;
  var shell = document.getElementById("homepage-shell");
  var drawer = document.getElementById("brand-drawer");
  var menu = document.querySelector(".brand-menu");
  var langToggle = document.querySelector(".language-toggle");
  var lang = "zh";
  var destinationModal = document.getElementById("destination-modal");
  var destinationModalImage = document.getElementById("destination-modal-image");
  var destinationModalBlur = document.getElementById("destination-modal-blur");
  var destinationImageFallback = document.getElementById("destination-image-fallback");
  var activeDestination = null;
  var activeDestinationTrigger = null;
  var destinationModalTimer = null;

  var i18n = {
    zh: {
      heroEyebrow: "洛阳城市情绪寓言",
      heroTitle: "猫游洛阳",
      heroSubtitle: "一只小猫，带你慢慢走过千年神都。",
      heroEnglish: "A gentle city fable about cats, Luoyang, and ordinary hearts.",
      learnMore: "了解我们",
      viewGuide: "查看导览",
      scrollCue: "向下滚动",
      videosEyebrow: "Cat Tour Stories",
      videosTitle: "往期影像",
      videosSubtitle: "用一只小猫的视角，看见洛阳的风光、街巷与故事。",
      visionEyebrow: "Our Vision",
      visionTitle: "我们的愿景",
      visionBody: "《猫游洛阳》不是普通旅游号，也不是普通AI萌宠号。它是一场关于洛阳、猫和普通人心事的城市情绪寓言。我们希望用一只小猫的视角，让更多人重新看见千年神都里的风景、烟火、时间和自己。",
      visionQuote: "用洛阳地标，讲普通人的心事。让历史不只被观看，也能轻轻接住今天的人。",
      gamesEyebrow: "Play With Ju Xiaoluo",
      gamesTitle: "和橘小洛一起玩",
      gamesSubtitle: "在洛阳慢慢走，也可以轻轻玩一会。",
      guideEyebrow: "Seasonal Luoyang Guide",
      guideTitle: "橘小洛的当季洛阳导览",
      guideSubtitle: "这个夏天，先去有风、有水、有树荫的地方。",
      cooperationEyebrow: "Cooperation",
      cooperationTitle: "猫游洛阳开放文旅内容共创",
      cooperationText: "文旅内容共创、景区/博物馆主题短片、店铺联动、文创开发、AI文旅内容制作、城市治愈内容共创。",
      cooperationButton: "合作联系"
    },
    en: {
      heroEyebrow: "A Luoyang Emotional Fable",
      heroTitle: "Cat Tour Luoyang",
      heroSubtitle: "A small cat walks you slowly through the ancient capital.",
      heroEnglish: "A gentle city fable about cats, Luoyang, and ordinary hearts.",
      learnMore: "About The IP",
      viewGuide: "View Guide",
      scrollCue: "Scroll",
      videosEyebrow: "Cat Tour Stories",
      videosTitle: "Stories In Motion",
      videosSubtitle: "See Luoyang's scenery, lanes, and stories through a cat's eyes.",
      visionEyebrow: "Our Vision",
      visionTitle: "A Gentle IP For The City",
      visionBody: "Cat Tour Luoyang is not a generic travel channel or a simple AI pet account. It is a city fable about Luoyang, cats and the emotions of everyday people.",
      visionQuote: "We tell ordinary feelings through Luoyang landmarks, so history can gently hold people today.",
      gamesEyebrow: "Play With Ju Xiaoluo",
      gamesTitle: "Play With Ju Xiaoluo",
      gamesSubtitle: "Walk slowly in Luoyang, and play gently for a while.",
      guideEyebrow: "Seasonal Luoyang Guide",
      guideTitle: "Ju Xiaoluo's Seasonal Luoyang Guide",
      guideSubtitle: "This summer, follow the breeze, water and shade.",
      cooperationEyebrow: "Cooperation",
      cooperationTitle: "Cat Tour Luoyang is open for cultural tourism collaborations",
      cooperationText: "Content co-creation, scenic short films, store collaborations, merch development, AI cultural tourism content and city-healing stories.",
      cooperationButton: "Contact Us"
    }
  };

  function setLanguage(next) {
    lang = next;
    root.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (i18n[lang][key]) {
        node.textContent = i18n[lang][key];
      }
    });
    if (langToggle) {
      langToggle.classList.toggle("is-en", lang === "en");
    }
    updateSeasonalLanguage();
    syncDestinationModalLanguage();
  }

  function makeEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function setupCarousel() {
    var frame = document.getElementById("hero-frame");
    var blur = document.getElementById("hero-blur");
    var bg = document.getElementById("hero-bg");
    var slides = data.slides || [];
    if (!frame || !slides.length) return;

    frame.innerHTML = "";
    slides.forEach(function (src, index) {
      var img = new Image();
      img.src = src;
      img.alt = "猫游洛阳主视觉 " + String(index + 1).padStart(2, "0");
      img.className = "hero-slide" + (index === 0 ? " is-active" : "");
      img.addEventListener("error", function () {
        img.classList.add("is-missing");
      });
      frame.appendChild(img);
    });

    var active = 0;
    function showSlide(next) {
      var slideEls = frame.querySelectorAll(".hero-slide");
      if (!slideEls.length) return;
      slideEls[active].classList.remove("is-active");
      active = next % slideEls.length;
      slideEls[active].classList.add("is-active");
      var src = slideEls[active].getAttribute("src");
      if (blur) blur.style.backgroundImage = "url('" + src + "')";
      if (bg) bg.style.backgroundImage = "url('" + src + "')";
    }

    showSlide(0);
    setInterval(function () {
      showSlide(active + 1);
    }, 5200);
  }

  function renderVideos() {
    var list = document.getElementById("home-video-list");
    if (!list) return;
    list.innerHTML = "";
    (data.videos || []).forEach(function (item) {
      var card = makeEl("article", "home-video-card");
      var hasVideo = Boolean(item.video);
      card.style.setProperty("--cover", "url('" + new URL(item.cover, document.baseURI).href + "')");
      card.classList.toggle("is-pending", !hasVideo);
      card.innerHTML =
        '<div class="home-video-cover">' +
        (hasVideo
          ? '<button type="button" aria-label="播放“' + item.title + '”">▶</button>'
          : '<span class="home-video-pending">即将上线</span>') +
        "</div>" +
        '<div class="home-video-info"><span>' + item.platform + '</span><h3>' + item.title + '</h3><p>' + item.mood + "</p></div>";
      if (hasVideo) {
        card.querySelector("button").addEventListener("click", function () {
          openVideo(item.video);
        });
      }
      list.appendChild(card);
    });
  }

  function openVideo(src) {
    var modal = document.getElementById("video-modal");
    var video = document.getElementById("modal-video");
    if (!src) {
      alert("视频链接待补充");
      return;
    }
    video.src = src;
    modal.setAttribute("aria-hidden", "false");
    video.play().catch(function () {});
  }

  function closeVideo() {
    var modal = document.getElementById("video-modal");
    var video = document.getElementById("modal-video");
    if (!modal || !video) return;
    video.pause();
    video.removeAttribute("src");
    modal.setAttribute("aria-hidden", "true");
  }

  function renderSymbols() {
    var list = document.getElementById("symbol-list");
    if (!list) return;
    list.innerHTML = "";
    (data.symbols || []).forEach(function (item) {
      var card = makeEl("article", "symbol-card");
      card.innerHTML = "<span>" + item[0] + "</span><strong>" + item[1] + "</strong><p>" + item[2] + "</p>";
      list.appendChild(card);
    });
  }

  function renderGames() {
    var list = document.getElementById("game-list");
    if (!list) return;
    list.innerHTML = "";
    (data.games || []).forEach(function (item, index) {
      var card = document.createElement("a");
      card.className = "home-game-card";
      card.href = item[3];
      if (/^https?:\/\//.test(item[3])) {
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }
      card.innerHTML = '<span>0' + (index + 1) + '</span><h3>' + item[0] + '</h3><p>' + item[1] + '</p><b>' + item[2] + "</b>";
      list.appendChild(card);
    });
  }

  function destinationText(item, key) {
    return item[(lang === "zh" ? "zh" : "en") + key] || "";
  }

  function destinationById(id) {
    return (data.seasonalDestinations || []).find(function (item) {
      return item.id === id;
    });
  }

  function renderSeasonalDestinations() {
    var list = document.getElementById("seasonal-destination-list");
    if (!list) return;
    list.innerHTML = "";
    (data.seasonalDestinations || []).forEach(function (item, index) {
      var row = makeEl("div", "destination-strip-item");
      row.setAttribute("role", "listitem");

      var button = makeEl("button", "destination-strip");
      button.type = "button";
      button.setAttribute("data-destination-id", item.id);
      button.style.setProperty("--strip-index", index);

      var image = makeEl("img", "destination-strip-image");
      image.src = item.stripImage;
      image.loading = "lazy";
      image.decoding = "async";

      var shade = makeEl("span", "destination-strip-shade");
      shade.setAttribute("aria-hidden", "true");

      var copy = makeEl("span", "destination-strip-copy");
      copy.appendChild(makeEl("strong", "destination-strip-name"));
      copy.appendChild(makeEl("span", "destination-strip-english"));

      var meta = makeEl("span", "destination-strip-meta");
      meta.appendChild(makeEl("span", "destination-strip-season"));
      meta.appendChild(makeEl("span", "destination-strip-action"));

      button.appendChild(image);
      button.appendChild(shade);
      button.appendChild(copy);
      button.appendChild(meta);
      button.addEventListener("click", function () {
        openDestination(item, button);
      });
      button.addEventListener("focus", function () {
        list.classList.add("has-focus");
        row.classList.add("is-focused");
      });
      button.addEventListener("blur", function () {
        list.classList.remove("has-focus");
        row.classList.remove("is-focused");
      });

      row.appendChild(button);
      list.appendChild(row);
    });
    updateSeasonalLanguage();
  }

  function updateSeasonalLanguage() {
    document.querySelectorAll(".destination-strip[data-destination-id]").forEach(function (button) {
      var item = destinationById(button.getAttribute("data-destination-id"));
      if (!item) return;
      var name = destinationText(item, "Name");
      button.querySelector(".destination-strip-name").textContent = name;
      button.querySelector(".destination-strip-english").textContent = lang === "zh" ? item.enName : item.zhName;
      button.querySelector(".destination-strip-season").textContent = destinationText(item, "SeasonTag");
      button.querySelector(".destination-strip-action").textContent = lang === "zh" ? "查看大图与出游计划" : "View image & travel plan";
      button.querySelector("img").alt = destinationText(item, "ImageAlt");
      button.setAttribute("aria-label", name + (lang === "zh" ? "，打开大图与出游计划" : ", open image and travel plan"));
    });
  }

  function syncDestinationModalLanguage() {
    if (!activeDestination || !destinationModal) return;
    document.getElementById("destination-modal-season").textContent = destinationText(activeDestination, "SeasonTag");
    document.getElementById("destination-modal-title").textContent = destinationText(activeDestination, "Name");
    document.getElementById("destination-modal-summary").textContent = destinationText(activeDestination, "Summary");
    var planButton = document.getElementById("destination-plan-button");
    planButton.textContent = destinationText(activeDestination, "CtaLabel");
    destinationModalImage.alt = destinationText(activeDestination, "ImageAlt");
    destinationImageFallback.textContent = lang === "zh" ? "图片暂时无法载入，请稍后重试。" : "The image could not be loaded. Please try again later.";
    destinationModal.querySelector(".destination-modal-close").setAttribute("aria-label", lang === "zh" ? "关闭景点预览" : "Close destination preview");
  }

  function setPageBehindModal(isHidden) {
    var header = document.querySelector(".brand-header");
    [header, shell].forEach(function (node) {
      if (!node) return;
      node.inert = isHidden;
      if (isHidden) {
        node.setAttribute("aria-hidden", "true");
      } else {
        node.removeAttribute("aria-hidden");
      }
    });
  }

  function openDestination(item, trigger) {
    if (!destinationModal || !destinationModalImage || !destinationModalBlur) return;
    window.clearTimeout(destinationModalTimer);
    activeDestination = item;
    activeDestinationTrigger = trigger;
    destinationImageFallback.hidden = true;
    destinationModal.querySelector(".destination-modal-stage").classList.remove("is-image-missing");
    destinationModalImage.src = item.fullImage;
    destinationModalBlur.src = item.fullImage;
    document.getElementById("destination-plan-button").href = item.planPdf;
    syncDestinationModalLanguage();
    destinationModal.hidden = false;
    document.body.classList.add("modal-open");
    setPageBehindModal(true);
    window.requestAnimationFrame(function () {
      destinationModal.classList.add("is-open");
      window.setTimeout(function () {
        destinationModal.querySelector(".destination-modal-close").focus({ preventScroll: true });
      }, 30);
    });
  }

  function closeDestination() {
    if (!destinationModal || destinationModal.hidden) return;
    destinationModal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    setPageBehindModal(false);
    destinationModalTimer = window.setTimeout(function () {
      destinationModal.hidden = true;
      destinationModalImage.removeAttribute("src");
      destinationModalBlur.removeAttribute("src");
      activeDestination = null;
      if (activeDestinationTrigger) activeDestinationTrigger.focus();
      activeDestinationTrigger = null;
    }, 240);
  }

  function setupDestinationModal() {
    if (!destinationModal) return;
    destinationModal.querySelectorAll("[data-destination-close]").forEach(function (control) {
      control.addEventListener("click", closeDestination);
    });
    destinationModalImage.addEventListener("load", function () {
      destinationImageFallback.hidden = true;
      destinationModal.querySelector(".destination-modal-stage").classList.remove("is-image-missing");
    });
    destinationModalImage.addEventListener("error", function () {
      destinationImageFallback.hidden = false;
      destinationModal.querySelector(".destination-modal-stage").classList.add("is-image-missing");
    });
    window.addEventListener("keydown", function (event) {
      if (destinationModal.hidden) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeDestination();
        return;
      }
      if (event.key !== "Tab") return;
      var focusable = Array.prototype.slice.call(destinationModal.querySelectorAll('button:not([disabled]), a[href]:not([aria-disabled="true"])'));
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function setupSectionState() {
    var sections = document.querySelectorAll("[data-section]");
    if (!sections.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute("data-section");
        sections.forEach(function (section) {
          section.classList.toggle("is-active", section === entry.target);
        });
        document.body.setAttribute("data-active-section", id);
        document.querySelectorAll("[data-dot], [data-home-nav]").forEach(function (node) {
          var key = node.getAttribute("data-dot") || node.getAttribute("data-home-nav");
          node.classList.toggle("is-active", key === id);
        });
        if (langToggle) {
          langToggle.classList.toggle("is-visible", id !== "hero");
        }
      });
    }, {
      root: shell,
      threshold: 0.58
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function setupFullpageNavigation() {
    if (!shell) return;
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));
    var isLocked = false;
    var current = 0;

    function isDesktopFullpage() {
      return window.matchMedia("(min-width: 901px)").matches;
    }

    function setCurrent(index) {
      current = Math.max(0, Math.min(sections.length - 1, index));
      var id = sections[current].getAttribute("data-section");
      sections.forEach(function (section, sectionIndex) {
        section.classList.toggle("is-active", sectionIndex === current);
      });
      document.body.setAttribute("data-active-section", id);
      document.querySelectorAll("[data-dot], [data-home-nav]").forEach(function (node) {
        var key = node.getAttribute("data-dot") || node.getAttribute("data-home-nav");
        node.classList.toggle("is-active", key === id);
      });
      if (langToggle) {
        langToggle.classList.toggle("is-visible", id !== "hero");
      }
    }

    function goTo(index, behavior) {
      if (!sections[index]) return;
      setCurrent(index);
      sections[index].scrollIntoView({ behavior: behavior || "smooth", block: "start" });
    }

    function indexFromHash(hash) {
      if (!hash) return -1;
      return sections.findIndex(function (section) {
        return "#" + section.id === hash;
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var next = indexFromHash(link.getAttribute("href"));
        if (next < 0) return;
        event.preventDefault();
        goTo(next);
        history.replaceState(null, "", link.getAttribute("href"));
      });
    });

    shell.addEventListener("wheel", function (event) {
      if (document.body.classList.contains("modal-open")) {
        event.preventDefault();
        return;
      }
      if (!isDesktopFullpage()) return;
      if (sections[current] && sections[current].classList.contains("last-guide-section")) {
        var section = sections[current];
        var canScrollInside = section.scrollHeight > section.clientHeight;
        var atTop = section.scrollTop <= 0;
        var atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 1;
        if (canScrollInside && ((event.deltaY > 0 && !atBottom) || (event.deltaY < 0 && !atTop))) {
          return;
        }
      }
      event.preventDefault();
      if (isLocked || Math.abs(event.deltaY) < 8) return;
      isLocked = true;
      goTo(current + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(function () {
        isLocked = false;
      }, 760);
    }, { passive: false });

    window.addEventListener("keydown", function (event) {
      if (document.body.classList.contains("modal-open")) return;
      if (!isDesktopFullpage()) return;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goTo(current + 1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goTo(current - 1);
      }
    });

    window.addEventListener("resize", function () {
      if (!isDesktopFullpage()) {
        shell.style.scrollBehavior = "";
      }
    });

    var initial = indexFromHash(window.location.hash);
    setCurrent(initial > -1 ? initial : 0);
    if (initial > -1) {
      goTo(initial, "auto");
    }
  }

  if (menu && drawer) {
    menu.addEventListener("click", function () {
      var open = drawer.classList.toggle("is-open");
      menu.setAttribute("aria-expanded", String(open));
    });
    drawer.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        drawer.classList.remove("is-open");
        menu.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      setLanguage(lang === "zh" ? "en" : "zh");
    });
  }

  document.querySelector(".modal-close")?.addEventListener("click", closeVideo);
  document.getElementById("video-modal")?.addEventListener("click", function (event) {
    if (event.target.id === "video-modal") closeVideo();
  });

  setupCarousel();
  renderVideos();
  renderSymbols();
  renderGames();
  renderSeasonalDestinations();
  setupDestinationModal();
  setupSectionState();
  setupFullpageNavigation();
  setLanguage("zh");
})();
