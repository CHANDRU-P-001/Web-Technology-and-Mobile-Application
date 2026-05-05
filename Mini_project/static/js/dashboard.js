// ===========================
//  AI Tools Hub - Dashboard JS
// ===========================

// ---- LIVE CLOCK ----
function updateClock() {
  const el = document.getElementById('clockDisplay');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}
setInterval(updateClock, 1000);
updateClock();

// ---- TOOLS DATA ----
const TOOLS = [
  { icon:'🎬', title:'Video Editing', sub:'Cut, edit, generate videos with AI', color:'#f43f5e', glow:'rgba(244,63,94,0.12)', bg:'rgba(244,63,94,0.1)', border:'rgba(244,63,94,0.3)', tools:['Runway ML','CapCut','Descript'], badge:'FREE', url:'https://runwayml.com' },
  { icon:'🧮', title:'Math Solver', sub:'Solve any equation step-by-step', color:'#00e5ff', glow:'rgba(0,229,255,0.12)', bg:'rgba(0,229,255,0.1)', border:'rgba(0,229,255,0.3)', tools:['Wolfram Alpha','Photomath','Mathway'], badge:'FREE', url:'https://wolframalpha.com' },
  { icon:'🌐', title:'Website Builder', sub:'Build websites by describing them', color:'#a78bfa', glow:'rgba(167,139,250,0.12)', bg:'rgba(167,139,250,0.1)', border:'rgba(167,139,250,0.3)', tools:['Bolt.new','v0.dev','Wix ADI'], badge:'FREE', url:'https://bolt.new' },
  { icon:'🛒', title:'Price Compare', sub:'Find best deals & prices', color:'#f59e0b', glow:'rgba(245,158,11,0.12)', bg:'rgba(245,158,11,0.1)', border:'rgba(245,158,11,0.3)', tools:['Google Shopping','Perplexity','CamelX3'], badge:'FREE', url:'https://google.com/shopping' },
  { icon:'💊', title:'Medicine Info', sub:'Drug info, side effects, dosage', color:'#10b981', glow:'rgba(16,185,129,0.12)', bg:'rgba(16,185,129,0.1)', border:'rgba(16,185,129,0.3)', tools:['Claude AI','Drugs.com','WebMD'], badge:'FREE', url:'https://claude.ai' },
  { icon:'🚌', title:'Transport AI', sub:'Routes, traffic, transit planning', color:'#38bdf8', glow:'rgba(56,189,248,0.12)', bg:'rgba(56,189,248,0.1)', border:'rgba(56,189,248,0.3)', tools:['Google Maps','Moovit','Rome2Rio'], badge:'FREE', url:'https://maps.google.com' },
  { icon:'⚡', title:'Electrical Help', sub:'Fix appliance issues with AI', color:'#fbbf24', glow:'rgba(251,191,36,0.12)', bg:'rgba(251,191,36,0.1)', border:'rgba(251,191,36,0.3)', tools:['Perplexity','Claude AI','FixYa'], badge:'FREE', url:'https://perplexity.ai' },
  { icon:'📚', title:'Student Study', sub:'PDF upload, image Q&A, concepts', color:'#818cf8', glow:'rgba(129,140,248,0.12)', bg:'rgba(129,140,248,0.1)', border:'rgba(129,140,248,0.3)', tools:['NotebookLM','Khanmigo','Claude AI'], badge:'FREE', url:'https://notebooklm.google.com' },
  { icon:'🔍', title:'Error Detection', sub:'Grammar, code, writing errors', color:'#f43f5e', glow:'rgba(244,63,94,0.12)', bg:'rgba(244,63,94,0.1)', border:'rgba(244,63,94,0.3)', tools:['Grammarly','Codeium','DeepL Write'], badge:'FREE', url:'https://grammarly.com' },
  { icon:'💻', title:'Learn Coding', sub:'Fun gamified coding with streaks', color:'#34d399', glow:'rgba(52,211,153,0.12)', bg:'rgba(52,211,153,0.1)', border:'rgba(52,211,153,0.3)', tools:['Grasshopper','Codecademy','Cursor AI'], badge:'FREE', url:'https://grasshopper.app' },
  { icon:'🎥', title:'Movie Finder', sub:'Where to watch, ratings, details', color:'#f472b6', glow:'rgba(244,114,182,0.12)', bg:'rgba(244,114,182,0.1)', border:'rgba(244,114,182,0.3)', tools:['JustWatch','IMDb','Perplexity'], badge:'FREE', url:'https://justwatch.com' },
  { icon:'🌦️', title:'Weather AI', sub:'Hourly forecast, rain radar, UV', color:'#60a5fa', glow:'rgba(96,165,250,0.12)', bg:'rgba(96,165,250,0.1)', border:'rgba(96,165,250,0.3)', tools:['Weather.com','Windy.com','IMD India'], badge:'FREE', url:'https://windy.com' },
  { icon:'🗣️', title:'Communication', sub:'Speaking, accent, confidence', color:'#fb923c', glow:'rgba(251,146,60,0.12)', bg:'rgba(251,146,60,0.1)', border:'rgba(251,146,60,0.3)', tools:['ELSA Speak','Speeko','Yoodli'], badge:'FREE', url:'https://elsa-speak.com' },
  { icon:'🎨', title:'Image Generator', sub:'Text-to-image, art, design', color:'#e879f9', glow:'rgba(232,121,249,0.12)', bg:'rgba(232,121,249,0.1)', border:'rgba(232,121,249,0.3)', tools:['Ideogram','Bing Creator','Leonardo'], badge:'FREE', url:'https://ideogram.ai' },
  { icon:'▶️', title:'YouTube Analyst', sub:'Channel stats, growth, niche', color:'#f87171', glow:'rgba(248,113,113,0.12)', bg:'rgba(248,113,113,0.1)', border:'rgba(248,113,113,0.3)', tools:['VidIQ','Social Blade','TubeBuddy'], badge:'FREE', url:'https://vidiq.com' },
  { icon:'✈️', title:'Trip Planner', sub:'Itinerary, food, routes, crowds', color:'#2dd4bf', glow:'rgba(45,212,191,0.12)', bg:'rgba(45,212,191,0.1)', border:'rgba(45,212,191,0.3)', tools:['Wanderlog','TripAdvisor','Perplexity'], badge:'FREE', url:'https://wanderlog.com' },
  { icon:'💪', title:'Fitness AI', sub:'Workout plans, calorie tracking', color:'#4ade80', glow:'rgba(74,222,128,0.12)', bg:'rgba(74,222,128,0.1)', border:'rgba(74,222,128,0.3)', tools:['MyFitnessPal','Freeletics','Cronometer'], badge:'FREE', url:'https://myfitnesspal.com' },
  { icon:'📊', title:'Data Analysis', sub:'Upload CSV, chat with data', color:'#a3e635', glow:'rgba(163,230,53,0.12)', bg:'rgba(163,230,53,0.1)', border:'rgba(163,230,53,0.3)', tools:['Julius AI','Tableau Public','Akkio'], badge:'FREE', url:'https://julius.ai' },
  { icon:'🤖', title:'General AI', sub:'Ask anything, best free AIs', color:'#c084fc', glow:'rgba(192,132,252,0.12)', bg:'rgba(192,132,252,0.1)', border:'rgba(192,132,252,0.3)', tools:['Claude AI','Perplexity','Gemini'], badge:'FREE', url:'https://claude.ai' },
  { icon:'✍️', title:'Writing & Research', sub:'Blogs, essays, citations', color:'#fb7185', glow:'rgba(251,113,133,0.12)', bg:'rgba(251,113,133,0.1)', border:'rgba(251,113,133,0.3)', tools:['Perplexity','Jenni AI','Copy.ai'], badge:'FREE', url:'https://perplexity.ai' },
];

// ---- RENDER TOOLS GRID ----
function renderTools(list) {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.style.cssText = `--tc:${t.color};--tc-glow:${t.glow};--tc-bg:${t.bg};--tc-border:${t.border};animation-delay:${i * 0.04}s`;
    card.innerHTML = `
      <div class="tc-top">
        <div class="tc-icon">${t.icon}</div>
        <div class="tc-info">
          <div class="tc-title">${t.title}</div>
          <div class="tc-sub">${t.sub}</div>
        </div>
      </div>
      <div class="tc-tools">
        ${t.tools.map(tool => `<span class="tc-tool-pill">${tool}</span>`).join('')}
      </div>
      <div class="tc-action">
        <span class="tc-badge badge-free">${t.badge}</span>
        <span class="tc-arrow">→</span>
      </div>
    `;
    card.addEventListener('click', () => window.open(t.url, '_blank'));
    grid.appendChild(card);
  });

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#64748b;font-size:16px">😔 No tools found. Try different keywords.</div>`;
  }
}

renderTools(TOOLS);

// ---- SEARCH ----
function searchTools(q) {
  const filtered = TOOLS.filter(t =>
    t.title.toLowerCase().includes(q.toLowerCase()) ||
    t.sub.toLowerCase().includes(q.toLowerCase()) ||
    t.tools.some(tool => tool.toLowerCase().includes(q.toLowerCase()))
  );
  renderTools(filtered);
}

// ---- SIDEBAR TOGGLE ----
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('collapsed');
  sb.classList.toggle('open');
}

// ---- NAV ACTIVE STATE ----
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ============================
//  CHATBOT LOGIC
// ============================

let chatOpen = false;

function toggleChat() {
  const win = document.getElementById('chatWindow');
  chatOpen = !chatOpen;
  if (chatOpen) {
    win.classList.add('open');
    document.getElementById('chatInput').focus();
  } else {
    win.classList.remove('open');
  }
}

// AI knowledge base about tools
const AI_KNOWLEDGE = {
  video: {
    best: "Runway ML",
    tools: [
      { name: "Runway ML", desc: "Best overall! Text-to-video, background removal, motion tracking. Free tier: 125 credits/month. No complex subscription needed.", free: true },
      { name: "CapCut AI", desc: "Best for mobile! Auto captions, AI effects, completely FREE. Great for social media content.", free: true },
      { name: "Descript", desc: "Edit video by editing text transcript. 1 hour free/month. Perfect for podcasts & tutorials.", free: true },
    ]
  },
  math: {
    best: "Wolfram Alpha",
    tools: [
      { name: "Wolfram Alpha", desc: "King of math! Solves calculus, algebra, statistics with step-by-step solutions. FREE basic, $5/month for steps.", free: true },
      { name: "Photomath", desc: "Point phone camera at problem → instant solution! 100% FREE, works offline.", free: true },
      { name: "Mathway", desc: "Type any math problem → get solution. FREE to see answers, $10/month for steps.", free: true },
    ]
  },
  website: {
    best: "Bolt.new",
    tools: [
      { name: "Bolt.new", desc: "Describe your website → full React app in seconds! Deploy instantly. FREE tier available.", free: true },
      { name: "v0 by Vercel", desc: "AI generates beautiful UI components. Copy-paste into your project. 200 free credits.", free: true },
      { name: "Wix ADI", desc: "Answer a few questions → complete business website built for you. Hosting free tier.", free: true },
    ]
  },
  study: {
    best: "NotebookLM",
    tools: [
      { name: "NotebookLM (Google)", desc: "⭐ BEST for students! Upload PDFs/images → ask any question. Creates audio summaries. 100% FREE!", free: true },
      { name: "Khanmigo", desc: "Khan Academy's AI tutor. Socratic method — guides you to answers, doesn't just give them. FREE!", free: true },
      { name: "Claude AI", desc: "Upload any image or PDF → ask to explain simply or deeply. Understands Tamil too! FREE.", free: true },
    ]
  },
  image: {
    best: "Ideogram AI",
    tools: [
      { name: "Ideogram AI", desc: "Best for text-in-images! 10 free high-quality images per day. No login hassle.", free: true },
      { name: "Bing Image Creator", desc: "DALL-E 3 powered, FREE with Microsoft account. Unlimited generations!", free: true },
      { name: "Leonardo AI", desc: "150 free image credits daily! Multiple art styles, HD quality. Amazing for creative work.", free: true },
    ]
  },
  coding: {
    best: "Grasshopper",
    tools: [
      { name: "Grasshopper (Google)", desc: "Gamified coding! Daily streak system, fun puzzles. JavaScript from zero. 100% FREE!", free: true },
      { name: "Codecademy", desc: "Interactive lessons with AI hints. Python, JS, SQL, HTML. Free tier with limited projects.", free: true },
      { name: "Cursor AI", desc: "AI pair programmer — explains and writes code live. Free tier for personal use.", free: true },
    ]
  },
  fitness: {
    best: "MyFitnessPal",
    tools: [
      { name: "MyFitnessPal", desc: "Best food tracker! 14M+ food database. Tracks calories, protein, carbs automatically. FREE!", free: true },
      { name: "Freeletics", desc: "AI workout coach adapts to your level. Bodyweight exercises, no gym needed. Free workouts.", free: true },
      { name: "Cronometer", desc: "Tracks micronutrients too! Has Indian food database. Best for understanding your diet. FREE.", free: true },
    ]
  },
  travel: {
    best: "Wanderlog",
    tools: [
      { name: "Wanderlog", desc: "Best trip planner! AI itinerary builder, restaurant suggestions, route maps all-in-one. FREE!", free: true },
      { name: "TripAdvisor AI", desc: "Best place rankings, crowd times, reviews. Ask AI for personalized recommendations.", free: true },
      { name: "Perplexity AI", desc: "Ask 'Plan 2 days Chennai to Ooty budget trip' → instant full plan with details!", free: true },
    ]
  },
  weather: {
    best: "Windy.com",
    tools: [
      { name: "Windy.com", desc: "Beautiful live weather maps! Wind patterns, rain radar, temperature layers. All FREE!", free: true },
      { name: "Weather Channel AI", desc: "15-day forecast, hourly rain predictions, storm alerts, UV index. FREE app & website.", free: true },
      { name: "IMD India", desc: "Official Indian weather! Tamil Nadu specific forecasts and cyclone alerts. Completely FREE.", free: true },
    ]
  },
  movie: {
    best: "JustWatch",
    tools: [
      { name: "JustWatch", desc: "Find where any movie is streaming! Netflix, Prime, Hotstar — all in one search. FREE!", free: true },
      { name: "IMDb + AI", desc: "Ratings, cast, plot, streaming links, recommendations. Most complete movie database. FREE.", free: true },
      { name: "Perplexity AI", desc: "Ask 'Where to watch [movie name] in India?' → instant answer with all platforms!", free: true },
    ]
  },
  data: {
    best: "Julius AI",
    tools: [
      { name: "Julius AI", desc: "Upload CSV/Excel → chat with your data! Auto charts, insights, predictions. Free tier!", free: true },
      { name: "Tableau Public", desc: "Create professional data dashboards. Drag and drop. Free for public data sharing.", free: true },
      { name: "Akkio", desc: "No-code ML! Upload data → get predictions and forecasts automatically. Free tier.", free: true },
    ]
  },
};

// Smart response generator
function generateResponse(userMsg) {
  const msg = userMsg.toLowerCase();

  // Video
  if (msg.includes('video') || msg.includes('edit') || msg.includes('film') || msg.includes('cut')) {
    const data = AI_KNOWLEDGE.video;
    return formatToolResponse('Video Editing AI', data.tools, '🎬');
  }
  // Math
  if (msg.includes('math') || msg.includes('equation') || msg.includes('calculate') || msg.includes('solve') || msg.includes('algebra')) {
    return formatToolResponse('Math Problem Solver', AI_KNOWLEDGE.math.tools, '🧮');
  }
  // Website
  if (msg.includes('website') || msg.includes('web') || msg.includes('build') || msg.includes('create site')) {
    return formatToolResponse('Website Builder AI', AI_KNOWLEDGE.website.tools, '🌐');
  }
  // Study
  if (msg.includes('study') || msg.includes('student') || msg.includes('pdf') || msg.includes('learn') || msg.includes('concept') || msg.includes('explain')) {
    return formatToolResponse('Student Study AI', AI_KNOWLEDGE.study.tools, '📚');
  }
  // Image
  if (msg.includes('image') || msg.includes('picture') || msg.includes('art') || msg.includes('generate') || msg.includes('draw')) {
    return formatToolResponse('Image Generator AI', AI_KNOWLEDGE.image.tools, '🎨');
  }
  // Coding
  if (msg.includes('cod') || msg.includes('program') || msg.includes('python') || msg.includes('javascript') || msg.includes('streak')) {
    return formatToolResponse('Learn Coding AI', AI_KNOWLEDGE.coding.tools, '💻');
  }
  // Fitness
  if (msg.includes('fitness') || msg.includes('exercise') || msg.includes('workout') || msg.includes('food') || msg.includes('diet') || msg.includes('calorie')) {
    return formatToolResponse('Fitness AI', AI_KNOWLEDGE.fitness.tools, '💪');
  }
  // Travel
  if (msg.includes('trip') || msg.includes('travel') || msg.includes('tour') || msg.includes('route') || msg.includes('hotel') || msg.includes('visit')) {
    return formatToolResponse('Trip Planner AI', AI_KNOWLEDGE.travel.tools, '✈️');
  }
  // Weather
  if (msg.includes('weather') || msg.includes('rain') || msg.includes('forecast') || msg.includes('temperature') || msg.includes('wind')) {
    return formatToolResponse('Weather AI', AI_KNOWLEDGE.weather.tools, '🌦️');
  }
  // Movie
  if (msg.includes('movie') || msg.includes('film') || msg.includes('watch') || msg.includes('stream') || msg.includes('imdb') || msg.includes('rating')) {
    return formatToolResponse('Movie Finder AI', AI_KNOWLEDGE.movie.tools, '🎥');
  }
  // Data
  if (msg.includes('data') || msg.includes('analy') || msg.includes('excel') || msg.includes('chart') || msg.includes('csv')) {
    return formatToolResponse('Data Analysis AI', AI_KNOWLEDGE.data.tools, '📊');
  }
  // Free
  if (msg.includes('free') || msg.includes('no subscription') || msg.includes('without paying')) {
    return `🆓 <strong>Great news!</strong> ALL 60+ tools in this hub have FREE tiers! Here are the most powerful 100% free ones:<br><br>
    ⭐ <strong>NotebookLM</strong> — Upload PDFs, ask anything (Google, 100% FREE)<br>
    ⭐ <strong>Wolfram Alpha</strong> — Math solver (FREE answers)<br>
    ⭐ <strong>Runway ML</strong> — Video AI (125 free credits/month)<br>
    ⭐ <strong>Ideogram AI</strong> — Image generator (10/day free)<br>
    ⭐ <strong>Grasshopper</strong> — Coding with streaks (100% FREE)<br>
    ⭐ <strong>Claude AI</strong> — PDF, image Q&A (FREE tier)<br>
    ⭐ <strong>Perplexity AI</strong> — Web search AI (FREE)<br><br>
    None require subscription to start! 🚀`;
  }
  // Best
  if (msg.includes('best') || msg.includes('top') || msg.includes('recommend')) {
    return `🏆 <strong>Top picks across all categories:</strong><br><br>
    🎬 Video: <strong>Runway ML</strong> — best free video AI<br>
    🧮 Math: <strong>Wolfram Alpha + Photomath</strong><br>
    🌐 Website: <strong>Bolt.new</strong> — describe & build<br>
    📚 Study: <strong>NotebookLM</strong> — PDF chat (Google, FREE)<br>
    🎨 Image: <strong>Ideogram AI</strong> — 10 free/day<br>
    💻 Code: <strong>Grasshopper</strong> — fun + streaks<br>
    ✈️ Travel: <strong>Wanderlog</strong> — full trip AI<br>
    💪 Fitness: <strong>MyFitnessPal</strong> — best tracker<br><br>
    Want details on any specific category? Just ask! 😊`;
  }
  // Hello
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('how are')) {
    return `👋 Hey there! I'm <strong>NEXUS</strong>, your AI Hero!<br><br>I know everything about all 60+ AI tools in this hub. You can ask me:<br>
    • "Which AI is best for video editing?"<br>
    • "Free AI tools for students?"<br>
    • "Best math solver AI?"<br>
    • "AI for trip planning?"<br><br>
    What do you need help with? 🚀`;
  }
  // Default
  return `🤔 I understand you're asking about <em>"${userMsg}"</em>.<br><br>
  Let me help! I'm specialized in recommending the <strong>best AI tools</strong> for your needs. Try asking:<br>
  • "Best AI for video editing?"<br>
  • "Which AI can help with maths?"<br>
  • "Free AI image generator?"<br>
  • "AI for student study?"<br>
  • "Trip planning AI?"<br><br>
  I know all 60+ tools in detail — fire away! ⚡`;
}

function formatToolResponse(category, tools, icon) {
  let html = `${icon} <strong>${category}</strong><br><br>`;
  tools.forEach((t, i) => {
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
    html += `${medal} <strong>${t.name}</strong>${t.free ? ' <span style="color:#10b981;font-size:11px">[FREE]</span>' : ''}<br>`;
    html += `<span style="color:#94a3b8;font-size:12px">${t.desc}</span><br><br>`;
  });
  html += `<span style="color:#00e5ff;font-size:12px">💡 All have free tiers — no subscription needed to start!</span>`;
  return html;
}

// Send message
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, 'user');
  input.value = '';

  // Show typing
  const typing = document.getElementById('typingIndicator');
  typing.style.display = 'flex';
  scrollChat();

  // Simulate AI thinking
  setTimeout(() => {
    typing.style.display = 'none';
    const response = generateResponse(msg);
    addMessage(response, 'bot', true);
  }, 800 + Math.random() * 700);
}

function askQuick(question) {
  document.getElementById('chatInput').value = question;
  sendMessage();
}

function addMessage(text, type, isHtml = false) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `msg ${type}-msg`;
  div.innerHTML = `
    <div class="msg-avatar">${type === 'bot' ? '🦸' : '😊'}</div>
    <div class="msg-bubble">${isHtml ? text : escapeHtml(text)}</div>
  `;
  msgs.appendChild(div);
  scrollChat();
}

function scrollChat() {
  const msgs = document.getElementById('chatMessages');
  msgs.scrollTop = msgs.scrollHeight;
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Enter key on chat
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendMessage();
    });
  }
});
