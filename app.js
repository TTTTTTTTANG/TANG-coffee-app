const knowledge = [
  { category: "豆种", title: "阿拉比卡", body: "香气细腻、酸质更清晰，常见于精品咖啡，适合表现花香、果香与层次感。" },
  { category: "豆种", title: "罗布斯塔", body: "咖啡因更高，苦感和厚重感更明显，常用于意式拼配来增强油脂与力度。" },
  { category: "烘焙", title: "浅烘焙", body: "保留更多产地个性，酸质明亮，适合手冲、冰滴和强调香气的喝法。" },
  { category: "烘焙", title: "中烘焙", body: "酸甜苦更均衡，适合多数日常冲煮，兼顾香气、甜感与醇厚度。" },
  { category: "烘焙", title: "深烘焙", body: "焦糖、坚果、黑巧克力调性明显，苦感与厚度更强，适合意式浓缩。" },
  { category: "萃取", title: "粉水比", body: "粉水比决定浓度基础。手冲常用 1:15 到 1:17，意式则依赖粉量与出液比例。" },
  { category: "萃取", title: "研磨度", body: "研磨越细，萃取越快也越充分；过细易苦涩，过粗易寡淡发酸。" },
  { category: "萃取", title: "水温", body: "高温增强萃取，低温保留柔和口感。浅烘可略高，深烘可略低。" },
  { category: "品鉴", title: "酸质", body: "好的酸不是尖锐刺激，而是像柑橘、莓果或苹果一样清爽、有支撑。" },
  { category: "品鉴", title: "醇厚度", body: "指口腔中的重量感和质地，可能像茶、牛奶、奶油或糖浆。" },
  { category: "品鉴", title: "余韵", body: "喝完后停留在口腔和鼻腔中的香气与味道，越干净持久越有辨识度。" },
  { category: "品鉴", title: "平衡感", body: "酸、甜、苦、香气、口感互相支撑，没有某个维度突兀压过其他部分。" }
];

const methods = [
  { name: "手冲 V60", ratio: "1:16", temp: "92-96°C", time: "2:30-3:30", grind: "中细", notes: "突出香气和层次。适合浅烘到中烘，注水节奏会明显影响酸甜平衡。" },
  { name: "法压壶", ratio: "1:15", temp: "90-94°C", time: "4:00", grind: "中粗", notes: "口感厚实，油脂保留多。适合喜欢圆润、低门槛冲煮的人。" },
  { name: "爱乐压", ratio: "1:13", temp: "85-92°C", time: "1:30-2:30", grind: "中细", notes: "变化空间大，能做出干净或浓郁两种方向，适合练习变量控制。" },
  { name: "摩卡壶", ratio: "1:8", temp: "预热水", time: "3:00-5:00", grind: "细", notes: "高浓度、厚重，适合牛奶咖啡。火力太大会带来焦苦。" },
  { name: "意式浓缩", ratio: "1:2", temp: "92-94°C", time: "25-30s", grind: "极细", notes: "强调压力、研磨和布粉。适合观察甜感、油脂和醇厚度。" },
  { name: "冷萃", ratio: "1:12", temp: "冷藏", time: "12-16h", grind: "粗", notes: "酸度低、甜感柔和、口感顺滑，适合夏天或做冷饮基底。" }
];

const flavors = {
  香气: ["茉莉", "柑橘皮", "烤坚果", "可可", "焦糖", "蜂蜜"],
  酸质: ["柠檬", "青苹果", "莓果", "葡萄", "李子", "橙子"],
  甜感: ["红糖", "枫糖", "太妃糖", "奶油", "熟水果", "麦芽"],
  口感: ["茶感", "丝滑", "奶油感", "糖浆感", "厚重", "干净"]
};

const glossary = [
  ["Body", "咖啡在口腔里的重量感，也常说醇厚度。"],
  ["Crema", "意式浓缩表面的金色油脂层，和新鲜度、萃取状态有关。"],
  ["Bloom", "手冲开始的闷蒸阶段，用于释放咖啡粉中的二氧化碳。"],
  ["Channeling", "水流从粉饼薄弱处穿过，导致萃取不均。"],
  ["TDS", "总溶解固体，通常用于描述咖啡液体浓度。"],
  ["Extraction", "萃取率，表示咖啡粉中被水带出的可溶物比例。"],
  ["Cupping", "杯测，用标准化方式评价咖啡香气、风味和缺陷。"],
  ["Origin", "产地，影响咖啡的风味基础和辨识度。"]
];

let currentCategory = "全部";
let currentMethod = methods[0].name;

const searchInput = document.querySelector("#searchInput");
const categoryFilters = document.querySelector("#categoryFilters");
const knowledgeGrid = document.querySelector("#knowledgeGrid");
const methodList = document.querySelector("#methodList");
const methodDetail = document.querySelector("#methodDetail");
const flavorBoard = document.querySelector("#flavorBoard");
const glossaryGrid = document.querySelector("#glossaryGrid");

function includesQuery(text) {
  const query = searchInput.value.trim().toLowerCase();
  return !query || text.toLowerCase().includes(query);
}

function renderCategories() {
  const categories = ["全部", ...new Set(knowledge.map((item) => item.category))];
  categoryFilters.innerHTML = categories
    .map((category) => `<button class="chip ${category === currentCategory ? "active" : ""}" data-category="${category}">${category}</button>`)
    .join("");
}

function renderKnowledge() {
  const items = knowledge.filter((item) => {
    const inCategory = currentCategory === "全部" || item.category === currentCategory;
    return inCategory && includesQuery(`${item.category} ${item.title} ${item.body}`);
  });

  knowledgeGrid.innerHTML = items.length
    ? items
        .map(
          (item) => `
          <article class="card">
            <span class="tag">${item.category}</span>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `
        )
        .join("")
    : `<div class="empty">没有找到匹配的咖啡知识。</div>`;
}

function renderMethods() {
  methodList.innerHTML = methods
    .map((method) => `<button class="method-button ${method.name === currentMethod ? "active" : ""}" data-method="${method.name}">${method.name}</button>`)
    .join("");

  const method = methods.find((item) => item.name === currentMethod) || methods[0];
  methodDetail.innerHTML = `
    <h3>${method.name}</h3>
    <p>${method.notes}</p>
    <div class="param-grid">
      <div class="param"><span>粉水比</span><strong>${method.ratio}</strong></div>
      <div class="param"><span>水温</span><strong>${method.temp}</strong></div>
      <div class="param"><span>时间</span><strong>${method.time}</strong></div>
      <div class="param"><span>研磨</span><strong>${method.grind}</strong></div>
    </div>
    <p>建议先固定粉水比和水温，只微调研磨度。味道尖酸可磨细或延长时间，苦涩明显可磨粗或降低水温。</p>
  `;
}

function renderFlavors() {
  flavorBoard.innerHTML = Object.entries(flavors)
    .map(
      ([group, words]) => `
        <div class="flavor-column">
          <h3>${group}</h3>
          ${words.map((word) => `<span class="flavor-pill">${word}</span>`).join("")}
        </div>
      `
    )
    .join("");
}

function renderGlossary() {
  const items = glossary.filter(([term, body]) => includesQuery(`${term} ${body}`));
  glossaryGrid.innerHTML = items.length
    ? items
        .map(
          ([term, body]) => `
          <article class="card">
            <span class="tag">Glossary</span>
            <h3>${term}</h3>
            <p>${body}</p>
          </article>
        `
        )
        .join("")
    : `<div class="empty">没有找到匹配的术语。</div>`;
}

function renderAll() {
  renderCategories();
  renderKnowledge();
  renderMethods();
  renderFlavors();
  renderGlossary();
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.view}`).classList.add("active");
  });
});

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  currentCategory = button.dataset.category;
  renderCategories();
  renderKnowledge();
});

methodList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-method]");
  if (!button) return;
  currentMethod = button.dataset.method;
  renderMethods();
});

searchInput.addEventListener("input", () => {
  renderKnowledge();
  renderGlossary();
});

renderAll();