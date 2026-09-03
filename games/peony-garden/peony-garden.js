(function () {
  "use strict";

  var MONTHS = [
    { label: "六月", en: "JUNE", phase: 0, objective: "先整理这方小花圃", nextCopy: "盛夏的光，落在刚刚翻松的土上。", tip: "牡丹喜欢肥沃、疏松又排水好的土，准备花圃比急着下苗更重要。", speech: "先把土养好，花才会安心长大。" },
    { label: "七月", en: "JULY", phase: 0, objective: "让土壤松软又有力量", nextCopy: "土地慢慢松软，雨水也有了离开的路。", tip: "腐熟堆肥能增加有机质，让土壤更疏松；肥料不是越多越好。", speech: "土有了力气，根才住得舒服。" },
    { label: "八月", en: "AUGUST", phase: 0, objective: "把排水和日照照顾好", nextCopy: "暑气将尽，花圃已经收拾得像模像样。", tip: "牡丹需要充足日照，也怕根部长期积水；选对位置很重要。", speech: "秋天快到了，我们把它的家再整理一下。" },
    { label: "九月", en: "SEPTEMBER", phase: 1, objective: "趁秋意种下牡丹", nextCopy: "秋风拂过院墙，适合栽种的日子到了。", tip: "秋季栽种更利于根系在冬前安稳下来，种得太深会影响来年开花。", speech: "慢一点，看清芽眼再下土。" },
    { label: "十月", en: "OCTOBER", phase: 1, objective: "让新根安稳住下来", nextCopy: "土面归于平静，新的根正在看不见的地方伸展。", tip: "栽下后浇一次安根水即可，持续湿漉漉反而容易伤根。", speech: "地上看着安静，地下已经开始忙啦。" },
    { label: "十一月", en: "NOVEMBER", phase: 2, objective: "轻轻守护越冬根系", nextCopy: "风更凉了，花圃收起了热闹。", tip: "入冬后的牡丹会休眠，地上安静不等于停止生长。", speech: "别急，冬天看起来安静，其实它在蓄力。" },
    { label: "十二月", en: "DECEMBER", phase: 2, objective: "少打扰，也是一种照料", nextCopy: "冬光很薄，时间却在土里慢慢积累。", tip: "休眠期不需要频繁浇水，保持根部不过湿更重要。", speech: "我们陪它安静一会儿。" },
    { label: "一月", en: "JANUARY", phase: 2, objective: "听一听冬日花圃", nextCopy: "一场薄雪落下，又被院里的日光慢慢融化。", tip: "排水良好的土壤能减少冬季湿冷对根系的影响。", speech: "看不见的生长，也值得被等待。" },
    { label: "二月", en: "FEBRUARY", phase: 2, objective: "为春天留出呼吸", nextCopy: "风里有了一点柔软，春天正从远处走来。", tip: "早春前清理枯叶、检查排水，就够了，不必急着大肥大水。", speech: "再等一等，春风已经在路上了。" },
    { label: "三月", en: "MARCH", phase: 3, objective: "稳稳照顾新芽与嫩叶", nextCopy: "红芽破土，新叶在一夜夜春风里舒展开来。", tip: "春季萌发后需要稳定水分与光照，但大水催长会让根不舒服。", speech: "你看，春天真的来了。" },
    { label: "四月", en: "APRIL", phase: 4, objective: "守住花苞的最后一程", nextCopy: "花苞圆润起来，第一层花瓣正试着打开。", tip: "4—5月是主要花期；偏氮肥太多，容易叶旺花少。", speech: "花苞在长大，最后这段也别着急。" },
    { label: "五月", en: "MAY", phase: 4, objective: "迎接这一年的花开", nextCopy: "洛阳春深，终于到了看见答案的时候。", tip: "到了花期也不一定盛放，花量仍取决于此前的土壤、根系、水肥与日照。", speech: "四季的耐心，就要有答案啦。" }
  ];

  var PHASES = ["准备花圃", "秋日栽种", "越冬蓄力", "春季生长", "孕蕾盛花"];
  var STAGES = {
    1: { name: "一方素土", alt: "六月里安静而普通的洛阳小花圃" },
    2: { name: "土壤整理完成", alt: "松软平整并改善了排水的牡丹花圃" },
    3: { name: "秋日栽种", alt: "秋日里刚刚种下牡丹的花圃" },
    4: { name: "冬季静默", alt: "薄雪覆盖、正在休眠蓄力的牡丹花圃" },
    5: { name: "春芽初醒", alt: "三月里冒出红色新芽的牡丹花圃" },
    6: { name: "新叶舒展", alt: "新叶逐渐舒展、充满春意的牡丹花圃" },
    7: { name: "花苞初放", alt: "四月里长满花苞并有少量初花的牡丹花圃" },
    8: { name: "牡丹满园", alt: "粉白红紫牡丹层层盛放的洛阳春日花圃" }
  };

  var ACTIONS = {
    loosen: { seal: "松", title: "轻轻松土", desc: "让土更透气", tip: "松土让板结的土重新有空隙，根系呼吸和排水都会更顺畅。", speech: "土松一点，根就能自在一点。", delta: { soil: 15, drainage: 4, seasonalCare: 4, prepared: 1 } },
    weed: { seal: "清", title: "清理杂草", desc: "先把花圃收拾好", tip: "清掉杂草能减少养分竞争，也方便观察土壤是不是长期过湿。", speech: "一小块一小块来，花圃已经精神多啦。", delta: { soil: 9, rootHealth: 3, seasonalCare: 3, prepared: 1 } },
    sun: { seal: "光", title: "调整种植位", desc: "选择日照更好的角落", tip: "牡丹喜欢充足日照。光线太弱，枝叶会长，花芽却不容易充实。", speech: "这里能接住更多阳光，就选这里吧。", delta: { sunlight: 15, seasonalCare: 5, prepared: 1 } },
    compost: { seal: "肥", title: "加入腐熟堆肥", desc: "改善土壤与有机质", tip: "腐熟有机质能改善土壤结构；使用未腐熟材料反而可能伤根。", speech: "不是越多越好，刚刚够用最舒服。", delta: { soil: 11, nutrients: 12, seasonalCare: 5, prepared: 1 } },
    drain: { seal: "排", title: "整理排水沟", desc: "让多余雨水离开", tip: "牡丹怕长期“湿脚”。排水通畅，通常比频繁补救烂根更重要。", speech: "给雨水留条路，根就不用泡着啦。", delta: { drainage: 17, moisture: -6, rootHealth: 2, seasonalCare: 6, prepared: 1 } },
    nitrogen: { seal: "氮", title: "多加一点氮肥", desc: "叶子也许会长得更快", tip: "氮肥过多容易叶旺花少，看起来很绿，却不一定有好花。", speech: "叶子长得快，不一定等于花会更多哦。", delta: { nutrients: 24, seasonalCare: -8, leafRisk: 1 } },
    overwater: { seal: "水", title: "多浇一点水", desc: "让土一直湿润", tip: "牡丹不喜欢长期积水。土总是湿漉漉，根系会缺氧受伤。", speech: "先摸摸土，湿着就别再添水啦。", delta: { moisture: 24, rootHealth: -5, seasonalCare: -7 } },
    plant: { seal: "栽", title: "种下牡丹", desc: "观察芽眼，选择深浅", special: "plant" },
    firstWater: { seal: "水", title: "浇安根水", desc: "一次浇透，不反复泡根", tip: "栽种后的安根水帮助土壤贴合根系，之后仍要避免持续积水。", speech: "这一遍浇稳就好，接下来让根慢慢呼吸。", delta: { moisture: 12, rootHealth: 5, seasonalCare: 6 } },
    baseFeed: { seal: "底", title: "少量底肥", desc: "给根系留一份储备", tip: "合理施肥比乱施肥更重要，底肥少量、均衡并与根部保持距离更稳妥。", speech: "留一点力气给它，但别把饭碗塞得太满。", delta: { nutrients: 11, soil: 3, rootHealth: 2, seasonalCare: 6 } },
    autumnNitrogen: { seal: "氮", title: "再补氮肥", desc: "想让它快快长", tip: "秋栽后继续猛追氮肥没有必要，还可能让养分失衡。", speech: "现在先养根，不急着催叶子。", delta: { nutrients: 22, rootHealth: -3, seasonalCare: -8, leafRisk: 1 } },
    mulch: { seal: "护", title: "薄薄覆盖", desc: "给根部一点冬日保护", tip: "轻薄覆盖能缓冲温度变化，但过厚、过湿也不合适。", speech: "盖薄薄一层就好，别让它闷住。", delta: { rootHealth: 7, moisture: 3, seasonalCare: 6 } },
    inspect: { seal: "看", title: "查看土壤", desc: "少打扰，先观察", tip: "养护并不总是做得越多越好。休眠期先观察土壤与排水。", speech: "今天不用忙很多，看看它安不安稳就好。", delta: { rootHealth: 3, seasonalCare: 5 } },
    wait: { seal: "候", title: "安静守候", desc: "让时间在土里工作", tip: "冬季地上部分安静，根系和花芽仍在完成自己的节奏。", speech: "等待不是空白，它也在悄悄发生。", delta: { rootHealth: 2, seasonalCare: 6 } },
    lightCover: { seal: "暖", title: "整理薄覆盖", desc: "挡风，但保持透气", tip: "冬季防护要兼顾透气和排水，厚重闷湿并不是更安全。", speech: "挡一点风，也给土留一点呼吸。", delta: { rootHealth: 5, drainage: 2, seasonalCare: 5 } },
    winterWater: { seal: "灌", title: "频繁补水", desc: "担心它冬天口渴", tip: "休眠期蒸腾少，频繁补水更容易造成湿冷和积水。", speech: "冬天喝得少，先别把土泡湿呀。", delta: { moisture: 20, rootHealth: -5, seasonalCare: -8 } },
    clear: { seal: "清", title: "清理枯叶", desc: "给新芽留出空间", tip: "早春清理枯叶、保持环境整洁，方便观察萌芽与土壤状态。", speech: "把旧叶收好，春天就有地方探头啦。", delta: { sunlight: 3, rootHealth: 4, seasonalCare: 5 } },
    drainCheck: { seal: "排", title: "再查排水", desc: "迎接早春雨水", tip: "春季雨水增多前检查排水，能避免刚萌动的根系长期泡水。", speech: "春雨要来了，再给水留一条路。", delta: { drainage: 9, rootHealth: 3, seasonalCare: 6 } },
    winterFeed: { seal: "肥", title: "提前追一轮肥", desc: "想让春天更快一点", tip: "植物尚未旺盛生长时急着重肥，未必能被有效利用。", speech: "春天还没完全醒，先别急着添太多。", delta: { nutrients: 18, rootHealth: -2, seasonalCare: -6 } },
    springWater: { seal: "润", title: "适量浇水", desc: "让新芽稳定舒展", tip: "春季保持稳定水分即可。浇水前看土，不让根部忽干忽湿。", speech: "慢慢润透，不用一口气灌满。", delta: { moisture: 12, rootHealth: 4, seasonalCare: 8 } },
    springFeed: { seal: "养", title: "轻量追肥", desc: "给生长一份均衡支持", tip: "春季追肥应适量、均衡；只偏氮会让叶片旺盛而花量减少。", speech: "给得均衡一点，叶和花才能一起长好。", delta: { nutrients: 9, soil: 3, rootHealth: 2, seasonalCare: 8 } },
    flood: { seal: "催", title: "大水催芽", desc: "想让嫩芽长快些", tip: "大水不能把春天催快，反而可能让土壤缺氧、根系受损。", speech: "春天有自己的速度，我们别催它。", delta: { moisture: 27, rootHealth: -7, seasonalCare: -9 } },
    budWater: { seal: "润", title: "稳稳补水", desc: "花苞期不忽干忽湿", tip: "孕蕾期水分要稳定，但依然不能积水。稳定比一次浇很多更重要。", speech: "稳稳的就好，花苞最喜欢安心。", delta: { moisture: 9, rootHealth: 3, seasonalCare: 9 } },
    balancedFeed: { seal: "衡", title: "少量均衡肥", desc: "不偏氮，不过量", tip: "花前少量均衡养分更合适，过度偏氮容易出现叶旺花少。", speech: "够用、均衡，就是最好的分寸。", delta: { nutrients: 7, rootHealth: 2, seasonalCare: 9 } },
    springNitrogen: { seal: "氮", title: "再追一把氮肥", desc: "让叶子更茂盛", tip: "花前氮肥过多，最典型的结果就是叶子很旺，花却变少。", speech: "绿油油很漂亮，但我们还在等花呀。", delta: { nutrients: 23, seasonalCare: -10, leafRisk: 2 } },
    steady: { seal: "守", title: "保持稳定", desc: "按土壤状态补水", tip: "花期不需要突然改变养护节奏，稳定光照、水分与根系状态最重要。", speech: "最后也不慌，照旧稳稳陪着它。", delta: { moisture: 7, rootHealth: 3, seasonalCare: 8 } },
    inspectBuds: { seal: "看", title: "观察花苞", desc: "让它按自己的节奏打开", tip: "牡丹主要在春季开花，花苞能否顺利打开，是此前数月养护的结果。", speech: "别碰它，让第一层花瓣自己打开吧。", delta: { rootHealth: 2, seasonalCare: 9 } },
    floodMay: { seal: "催", title: "再浇透一点", desc: "想让花一次全开", tip: "临近开花也不能靠大水催花。积水依然会伤根、影响花朵状态。", speech: "花不是催开的，是一路照料后等来的。", delta: { moisture: 24, rootHealth: -7, seasonalCare: -10 } }
  };

  var MONTH_ACTIONS = [
    ["loosen", "weed", "sun"],
    ["compost", "drain", "nitrogen"],
    ["drain", "compost", "overwater"],
    ["plant", "drain", "compost"],
    ["firstWater", "baseFeed", "autumnNitrogen"],
    ["mulch", "inspect", "winterWater"],
    ["wait", "lightCover", "winterWater"],
    ["wait", "inspect", "winterWater"],
    ["clear", "drainCheck", "winterFeed"],
    ["springWater", "springFeed", "flood"],
    ["budWater", "balancedFeed", "springNitrogen"],
    ["steady", "inspectBuds", "floodMay"]
  ];

  var dom = {
    startScreen: document.getElementById("start-screen"),
    startButton: document.getElementById("start-button"),
    yearLabel: document.getElementById("year-label"),
    monthLabel: document.getElementById("month-label"),
    seasonRoute: document.getElementById("season-route"),
    sceneFrame: document.getElementById("scene-frame"),
    sceneA: document.getElementById("scene-layer-a"),
    sceneB: document.getElementById("scene-layer-b"),
    stageNumber: document.getElementById("stage-number"),
    stageName: document.getElementById("stage-name"),
    speech: document.getElementById("speech-bubble"),
    petalDrift: document.getElementById("petal-drift"),
    readinessSummary: document.getElementById("readiness-summary"),
    statGrid: document.getElementById("stat-grid"),
    phaseKicker: document.getElementById("phase-kicker"),
    monthObjective: document.getElementById("month-objective"),
    actionCount: document.getElementById("action-count"),
    actionGrid: document.getElementById("action-grid"),
    nextButton: document.getElementById("next-month-button"),
    nextLabel: document.getElementById("next-button-label"),
    tipText: document.getElementById("tip-text"),
    plantingModal: document.getElementById("planting-modal"),
    transition: document.getElementById("month-transition"),
    transitionYear: document.getElementById("transition-year"),
    transitionMonth: document.getElementById("transition-month"),
    transitionCopy: document.getElementById("transition-copy"),
    ending: document.getElementById("ending-screen"),
    endingSeal: document.getElementById("ending-seal"),
    endingTitle: document.getElementById("ending-title"),
    endingLine: document.getElementById("ending-line"),
    endingScore: document.getElementById("ending-score"),
    endingNote: document.getElementById("ending-note"),
    nextYearButton: document.getElementById("next-year-button"),
    restartButton: document.getElementById("restart-button"),
    settingsButton: document.getElementById("settings-button"),
    settingsPanel: document.getElementById("settings-panel"),
    settingsClose: document.getElementById("settings-close"),
    motionToggle: document.getElementById("motion-toggle"),
    settingsReset: document.getElementById("settings-reset")
  };

  var currentSceneStage = 1;
  var activeScene = "a";
  var transitionTimer = 0;
  var endingTimer = 0;
  var state = freshState();

  function freshState() {
    return {
      year: 1,
      experienceYears: 0,
      monthIndex: 0,
      actionUsed: false,
      selectedAction: null,
      planted: false,
      depth: null,
      prepared: 0,
      seasonalCare: 50,
      leafRisk: 0,
      bloom: 0,
      endingStage: null,
      stats: {
        soil: 42,
        sunlight: 78,
        drainage: 45,
        moisture: 56,
        nutrients: 42,
        rootHealth: 58
      }
    };
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function yearText(year) {
    var numbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    return "第" + (numbers[year] || String(year)) + "年";
  }

  function applyDelta(delta) {
    Object.keys(delta || {}).forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(state.stats, key)) {
        state.stats[key] = clamp(state.stats[key] + delta[key], 0, 100);
      } else {
        state[key] = (state[key] || 0) + delta[key];
      }
    });
    state.seasonalCare = clamp(state.seasonalCare, 0, 100);
    state.prepared = clamp(state.prepared, 0, 6);
    state.leafRisk = clamp(state.leafRisk, 0, 5);
  }

  function calculateBloom() {
    if (!state.planted) {
      state.bloom = clamp(Math.round((state.stats.soil + state.stats.sunlight + state.stats.drainage) / 15), 0, 22);
      return state.bloom;
    }

    var moistureScore = clamp(100 - Math.abs(state.stats.moisture - 56) * 2.2, 0, 100);
    var nutrientScore = state.stats.nutrients <= 75
      ? clamp(100 - Math.abs(state.stats.nutrients - 58) * 1.3, 0, 100)
      : clamp(100 - (state.stats.nutrients - 75) * 3.2, 0, 100);
    var depthBonus = state.depth === "right" ? 7 : state.depth === "shallow" ? -4 : -15;
    var experienceBonus = Math.min(10, state.experienceYears * 4);
    var weighted =
      state.stats.soil * 0.14 +
      state.stats.sunlight * 0.12 +
      state.stats.drainage * 0.15 +
      moistureScore * 0.14 +
      nutrientScore * 0.13 +
      state.stats.rootHealth * 0.18 +
      state.seasonalCare * 0.14;

    state.bloom = clamp(Math.round(weighted + depthBonus + experienceBonus - state.leafRisk * 6), 0, 100);
    return state.bloom;
  }

  function stageForState() {
    if (state.endingStage) return state.endingStage;
    if (state.monthIndex <= 2) return state.prepared >= 2 ? 2 : 1;
    if (state.monthIndex <= 4) return state.planted ? 3 : 2;
    if (state.monthIndex <= 8) return state.planted ? 4 : 2;
    if (state.monthIndex === 9) return state.actionUsed ? 6 : 5;
    return 7;
  }

  function sceneSeason() {
    if (state.endingStage && state.endingStage >= 6) return "spring";
    if (state.monthIndex >= 5 && state.monthIndex <= 8) return "winter";
    if (state.monthIndex >= 9) return "spring";
    if (state.monthIndex >= 3) return "autumn";
    return "summer";
  }

  function updateScene(stage, immediate) {
    var info = STAGES[stage];
    dom.sceneFrame.dataset.stage = String(stage);
    dom.sceneFrame.dataset.season = sceneSeason();
    dom.stageNumber.textContent = String(stage).padStart(2, "0");
    dom.stageName.textContent = info.name;
    dom.petalDrift.classList.toggle("is-visible", stage === 8);

    if (stage === currentSceneStage) return;
    var next = activeScene === "a" ? dom.sceneB : dom.sceneA;
    var previous = activeScene === "a" ? dom.sceneA : dom.sceneB;
    next.src = "assets/garden-stage-" + String(stage).padStart(2, "0") + ".webp";
    next.alt = info.alt;

    if (immediate) {
      previous.classList.remove("is-active");
      next.classList.add("is-active");
    } else {
      window.requestAnimationFrame(function () {
        previous.classList.remove("is-active");
        next.classList.add("is-active");
      });
    }
    activeScene = activeScene === "a" ? "b" : "a";
    currentSceneStage = stage;
  }

  function setSpeech(text) {
    dom.speech.classList.add("is-changing");
    window.setTimeout(function () {
      dom.speech.textContent = text;
      dom.speech.classList.remove("is-changing");
    }, 170);
  }

  function statLabel(key, value) {
    if (key === "soil") return value < 45 ? "待改善" : value < 70 ? "渐松软" : "很肥沃";
    if (key === "sunlight") return value < 45 ? "稍阴" : value < 68 ? "尚可" : "充足";
    if (key === "drainage") return value < 48 ? "待改善" : value < 70 ? "较通畅" : "很通畅";
    if (key === "moisture") return value < 28 ? "偏干" : value <= 70 ? "适中" : value <= 82 ? "偏湿" : "积水风险";
    if (key === "nutrients") return value < 38 ? "稍少" : value <= 75 ? "均衡" : value <= 86 ? "偏多" : "过量";
    if (key === "rootHealth") return value < 40 ? "有些疲惫" : value < 70 ? "安稳" : "很健康";
    return value + "%";
  }

  function renderStats() {
    calculateBloom();
    var values = {
      soil: state.stats.soil,
      sunlight: state.stats.sunlight,
      drainage: state.stats.drainage,
      moisture: state.stats.moisture,
      nutrients: state.stats.nutrients,
      rootHealth: state.stats.rootHealth,
      bloom: state.bloom
    };

    Object.keys(values).forEach(function (key) {
      var item = dom.statGrid.querySelector('[data-stat="' + key + '"]');
      var value = values[key];
      var text = item.querySelector("em");
      var bar = item.querySelector("u");
      text.textContent = key === "bloom" ? value + "%" : statLabel(key, value);
      bar.style.width = value + "%";
      item.classList.toggle("is-low", value < 40);
      item.classList.toggle("is-high", value > 78);
      var risky = (key === "moisture" && value > 82) || (key === "nutrients" && value > 86) || (key === "rootHealth" && value < 35);
      item.classList.toggle("is-risk", risky);
    });

    dom.readinessSummary.textContent = state.bloom < 25 ? "花期尚远" : state.bloom < 48 ? "正在蓄力" : state.bloom < 66 ? "已有希望" : state.bloom < 82 ? "花苞可期" : "盛放在望";
  }

  function availableActionKeys() {
    if (state.monthIndex === 4 && !state.planted) return ["plant"];
    return MONTH_ACTIONS[state.monthIndex];
  }

  function renderActions() {
    var keys = availableActionKeys();
    dom.actionGrid.innerHTML = "";
    keys.forEach(function (key) {
      var action = ACTIONS[key];
      var button = document.createElement("button");
      button.type = "button";
      button.className = "action-button" + (state.selectedAction === key ? " is-selected" : "");
      button.dataset.action = key;
      button.disabled = state.actionUsed;
      button.innerHTML = "<span>" + action.seal + "</span><strong>" + action.title + "</strong><small>" + action.desc + "</small>";
      dom.actionGrid.appendChild(button);
    });

    dom.actionCount.textContent = state.actionUsed ? "本月照料已完成" : "本月可做 1 件事";
    dom.nextButton.disabled = !state.actionUsed;
    if (!state.actionUsed) {
      dom.nextLabel.textContent = state.monthIndex === 4 && !state.planted ? "先把牡丹种下" : "先完成本月照料";
    } else if (state.monthIndex === 11) {
      dom.nextLabel.textContent = "迎接花开";
    } else {
      dom.nextLabel.textContent = "进入下一月 · " + MONTHS[state.monthIndex + 1].label;
    }
  }

  function renderRoute() {
    Array.prototype.forEach.call(dom.seasonRoute.children, function (item, index) {
      item.classList.toggle("is-current", index === MONTHS[state.monthIndex].phase);
      item.classList.toggle("is-done", index < MONTHS[state.monthIndex].phase);
    });
  }

  function render() {
    var month = MONTHS[state.monthIndex];
    dom.yearLabel.textContent = yearText(state.year);
    dom.monthLabel.textContent = month.label;
    dom.phaseKicker.textContent = month.en + " · " + PHASES[month.phase].toUpperCase();
    dom.monthObjective.textContent = month.objective;
    dom.tipText.textContent = month.tip;
    updateScene(stageForState());
    renderRoute();
    renderStats();
    renderActions();
  }

  function showPlantingChoice() {
    dom.plantingModal.hidden = false;
  }

  function chooseDepth(depth) {
    state.planted = true;
    state.depth = depth;
    state.actionUsed = true;
    state.selectedAction = "plant";
    state.stats.moisture = clamp(state.stats.moisture + 6, 0, 100);

    if (depth === "right") {
      applyDelta({ rootHealth: 8, seasonalCare: 11 });
      dom.tipText.textContent = "芽眼靠近土面，既能让根部安稳，也不容易因为埋得太深而影响花芽。";
      setSpeech("刚刚好。让它在秋天里慢慢安家吧。");
    } else if (depth === "shallow") {
      applyDelta({ rootHealth: 1, seasonalCare: -2 });
      dom.tipText.textContent = "栽得稍浅，通气不错，但根部稳定性会弱一些，后续要多观察。";
      setSpeech("有一点浅，不过我们还能慢慢照顾。");
    } else {
      applyDelta({ rootHealth: -9, seasonalCare: -9 });
      dom.tipText.textContent = "牡丹种得太深容易影响来年开花；它能继续生长，但花量可能变少。";
      setSpeech("埋得有点深啦，明年可能更想长叶子。");
    }

    dom.plantingModal.hidden = true;
    render();
  }

  function postActionCheck(actionKey) {
    if (state.stats.moisture > 82 && state.stats.drainage < 60) {
      state.stats.rootHealth = clamp(state.stats.rootHealth - 7, 0, 100);
      state.seasonalCare = clamp(state.seasonalCare - 4, 0, 100);
      dom.tipText.textContent = "土里出现了积水，根系有些不舒服。下个月优先检查排水会更稳妥。";
      setSpeech("水停在根边了，下一次先帮它排出去吧。");
    }
    if ((actionKey === "nitrogen" || actionKey === "autumnNitrogen" || actionKey === "springNitrogen") && state.stats.nutrients > 78) {
      dom.tipText.textContent = "养分已经偏多，尤其偏氮会让叶片很旺、花量却减少。";
    }
  }

  function chooseAction(actionKey) {
    if (state.actionUsed) return;
    var action = ACTIONS[actionKey];
    if (!action) return;
    if (action.special === "plant") {
      showPlantingChoice();
      return;
    }

    applyDelta(action.delta);
    state.actionUsed = true;
    state.selectedAction = actionKey;
    dom.tipText.textContent = action.tip;
    setSpeech(action.speech);
    postActionCheck(actionKey);
    renderStats();
    updateScene(stageForState());
    renderActions();
  }

  function applyMonthPassage() {
    var index = state.monthIndex;
    var moistureShift = index <= 2 ? -4 : index <= 4 ? -2 : index <= 8 ? -1 : -3;
    state.stats.moisture = clamp(state.stats.moisture + moistureShift, 0, 100);

    if (index >= 5 && index <= 8 && state.stats.moisture >= 30 && state.stats.moisture <= 70) {
      state.stats.rootHealth = clamp(state.stats.rootHealth + 1, 0, 100);
    }
    if (state.stats.moisture < 24) {
      state.stats.rootHealth = clamp(state.stats.rootHealth - 5, 0, 100);
      state.seasonalCare = clamp(state.seasonalCare - 3, 0, 100);
    }
    if (state.stats.moisture > 82 && state.stats.drainage < 65) {
      state.stats.rootHealth = clamp(state.stats.rootHealth - 6, 0, 100);
      state.seasonalCare = clamp(state.seasonalCare - 3, 0, 100);
    }
  }

  function showMonthTransition() {
    var month = MONTHS[state.monthIndex];
    dom.transitionYear.textContent = yearText(state.year);
    dom.transitionMonth.textContent = month.label;
    dom.transitionCopy.textContent = month.nextCopy;
    dom.transition.hidden = false;
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(function () {
      dom.transition.hidden = true;
    }, document.body.classList.contains("reduce-motion") ? 80 : 950);
  }

  function advanceMonth() {
    if (!state.actionUsed) return;
    if (state.monthIndex === 11) {
      finishYear();
      return;
    }

    applyMonthPassage();
    state.monthIndex += 1;
    state.actionUsed = false;
    state.selectedAction = null;
    state.endingStage = null;
    showMonthTransition();
    setSpeech(MONTHS[state.monthIndex].speech);
    render();
  }

  function endingResult(score) {
    if (score < 48) {
      return {
        stage: 6,
        seal: "候",
        title: "春意未满",
        line: "花还没开到最好，但春天已经在路上了。",
        note: "这一年枝叶长起来了，根系或水肥还有些疲惫。再养一年，会更接近那片花海。"
      };
    }
    if (score < 65) {
      return {
        stage: 7,
        seal: "初",
        title: "初见花开",
        line: "几朵牡丹先替春天开了门。",
        note: "花苞与初花已经出现，前期照料有了回应；让水肥更稳定，明年会更整齐。"
      };
    }
    if (score < 82) {
      return {
        stage: 8,
        seal: "春",
        title: "满园春意",
        line: "从一块小花圃，到一整个春天。",
        note: "土壤、日照与根系大多照顾得很好，花园已经有了丰盛而温柔的层次。"
      };
    }
    return {
      stage: 8,
      seal: "牡",
      title: "牡丹满庭",
      line: "这一园牡丹，终于等来了洛阳的春风。",
      note: "土壤、根系、水肥与春季养护都很安稳，花开得丰盛、整齐又从容。"
    };
  }

  function finishYear() {
    applyMonthPassage();
    var score = calculateBloom();
    var result = endingResult(score);
    state.endingStage = result.stage;
    updateScene(result.stage);
    setSpeech(score >= 82 ? "开了！今年的洛阳，真好看呀。" : score >= 48 ? "开花啦。每一朵都是慢慢等来的。" : "这一年已经很努力啦，明年我们再一起试试。");

    dom.endingSeal.textContent = result.seal;
    dom.endingTitle.textContent = result.title;
    dom.endingLine.textContent = result.line;
    dom.endingScore.textContent = String(score);
    dom.endingNote.textContent = result.note;
    dom.ending.classList.toggle("is-perfect", score >= 82);

    window.clearTimeout(endingTimer);
    endingTimer = window.setTimeout(function () {
      dom.ending.hidden = false;
    }, document.body.classList.contains("reduce-motion") ? 50 : 900);
  }

  function startNextYear() {
    var old = state;
    var next = freshState();
    next.year = old.year + 1;
    next.experienceYears = old.experienceYears + 1;
    next.prepared = 2;
    next.seasonalCare = clamp(54 + next.experienceYears * 3, 0, 70);
    next.stats.soil = clamp(Math.round(old.stats.soil * 0.72), 48, 68);
    next.stats.sunlight = clamp(old.stats.sunlight, 68, 88);
    next.stats.drainage = clamp(Math.round(old.stats.drainage * 0.78), 48, 70);
    next.stats.moisture = 55;
    next.stats.nutrients = clamp(Math.round(old.stats.nutrients * 0.66), 40, 58);
    next.stats.rootHealth = clamp(Math.round(old.stats.rootHealth * 0.76), 56, 72);
    state = next;
    dom.ending.hidden = true;
    dom.petalDrift.classList.remove("is-visible");
    setSpeech("我们更熟练啦，这片土也比去年更有底子。");
    render();
  }

  function restart(showStart) {
    window.clearTimeout(endingTimer);
    window.clearTimeout(transitionTimer);
    state = freshState();
    dom.ending.hidden = true;
    dom.transition.hidden = true;
    dom.plantingModal.hidden = true;
    dom.settingsPanel.hidden = true;
    dom.settingsButton.setAttribute("aria-expanded", "false");
    setSpeech(MONTHS[0].speech);
    render();
    if (showStart) dom.startScreen.hidden = false;
  }

  function toggleSettings(open) {
    var shouldOpen = typeof open === "boolean" ? open : dom.settingsPanel.hidden;
    dom.settingsPanel.hidden = !shouldOpen;
    dom.settingsButton.setAttribute("aria-expanded", String(shouldOpen));
  }

  function preloadScenes() {
    for (var i = 2; i <= 8; i += 1) {
      var image = new Image();
      image.src = "assets/garden-stage-" + String(i).padStart(2, "0") + ".webp";
    }
  }

  dom.startButton.addEventListener("click", function () {
    dom.startScreen.hidden = true;
    preloadScenes();
    setSpeech(MONTHS[0].speech);
  });

  dom.actionGrid.addEventListener("click", function (event) {
    var button = event.target.closest("[data-action]");
    if (!button) return;
    chooseAction(button.dataset.action);
  });

  dom.plantingModal.addEventListener("click", function (event) {
    var button = event.target.closest("[data-depth]");
    if (!button) return;
    chooseDepth(button.dataset.depth);
  });

  dom.nextButton.addEventListener("click", advanceMonth);
  dom.nextYearButton.addEventListener("click", startNextYear);
  dom.restartButton.addEventListener("click", function () { restart(false); });
  dom.settingsButton.addEventListener("click", function () { toggleSettings(); });
  dom.settingsClose.addEventListener("click", function () { toggleSettings(false); });
  dom.settingsReset.addEventListener("click", function () { restart(true); });
  dom.motionToggle.addEventListener("change", function () {
    document.body.classList.toggle("reduce-motion", !dom.motionToggle.checked);
    try { window.localStorage.setItem("peony-garden-motion", dom.motionToggle.checked ? "on" : "off"); } catch (error) { /* local preference is optional */ }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !dom.settingsPanel.hidden) toggleSettings(false);
  });

  var reducedBySystem = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var storedMotion = null;
  try { storedMotion = window.localStorage.getItem("peony-garden-motion"); } catch (error) { /* local preference is optional */ }
  var motionOn = storedMotion ? storedMotion === "on" : !reducedBySystem;
  dom.motionToggle.checked = motionOn;
  document.body.classList.toggle("reduce-motion", !motionOn);

  render();
})();
