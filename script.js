// Массив смешных экономических новостей
const funnyNews = [
  "BREAKING: Economists discover money actually CAN buy happiness (but only in bulk purchases)",
  "Federal Reserve considers paying people to spend money to stimulate spending",
  "Wall Street traders spotted using lunch money to buy crypto",
  "New study: 99% of economists just making it up as they go",
  "Bitcoin price doubles after Elon Musk tweets a meme with a dog",
  "Treasury Department switches to pink ink for debt reports after red ink shortage",
  "Congress debates replacing dollar bills with TikTok coins for 'younger appeal'",
  "Economy grows 0.001% after everyone starts side hustles selling NFTs of their pets",
  "Inflation officially blamed on millennials buying too much avocado toast",
  "Stock market hits record high, then remembers today is Monday and corrects",
  "GDP now measured in 'likes' and 'retweets' for more accurate assessment",
  "New economic theory suggests printing money on both sides of paper could double wealth",
  "Banks introduce 'surprise fee' feature to keep customers on their toes",
  "Economists confirm trickle-down economics works - if you're the one doing the trickling",
  "Bitcoin miner accidentally solves world hunger while trying to mine more coins",
  "Government considers paying national debt in exposure and experience",
  "New crypto coin 'MaybeCoin' launches with 50/50 chance of being worth something",
  "Fed Chair seen flipping coin to decide next interest rate move",
  "Economy declared 'too big to fail' for the 127th time this year",
  "Study finds 100% of economic forecasts are 50% accurate",
  "New app lets you invest in your friend's startup ideas that will 'totally work'",
  "Goldman Sachs launches new 'Hope and Pray' investment portfolio",
  "Market volatility blamed on traders forgetting to take their morning coffee",
  "CEO pay now officially measured in 'regular worker lifetimes'",
  "Economists confirm recessions are just the economy's way of saying 'I need some me time'",
  "New cryptocurrency 'PretendCoin' valued at whatever you imagine it's worth",
  "Banks introduce 'mystery balance' feature to make checking accounts more exciting",
  "Government starts measuring unemployment in 'gig economy high fives'",
  "Economy improves slightly after everyone agrees to pretend it's fine",
  "New study shows money can't buy happiness, but it can buy a yacht big enough to sail right up to it",
  "Stock market introduces 'undo' button for bad trades (only works 10% of the time)",
  "Federal Reserve now accepting memes as collateral for loans",
  "Bitcoin drops 30% after someone points out it's not actually backed by anything",
  "Economists discover new economic principle: 'The more you print, the less it's worth'",
  "GDP recalculated to include the value of all unpaid internships",
  "New economic stimulus package just a box of 'good vibes' mailed to every citizen",
  "Banks announce new 'surprise mortgage rate' program to keep life interesting",
  "Economy declared 'mostly organic and free-range' by new government standards",
  "Study finds 78% of economic growth comes from people pretending to understand economics",
  "Government replaces entire tax code with 'just pay what you think is fair' system",
  "New crypto wallet automatically converts savings to 'worthless' when market crashes",
  "Fed announces new 'quantitative easing' program involving actual hugs",
  "Economists confirm inflation is just capitalism's way of keeping us on our toes",
  "Stock market introduces 'seasonal flavors' to boost investor interest",
  "Bitcoin mining now classified as performance art by SEC",
  "New economic indicator: 'How many lattes you could buy with your savings'",
  "Government considers replacing money with 'good boy points' system",
  "Study shows 100% of economic predictions are wrong, just at different times",
  "Banks introduce 'mood-based interest rates' that change with teller's feelings",
  "Economy now running on 90% hopes and dreams, 10% actual value",
  "New investment strategy: 'Close your eyes and point at the stock page'",
  "Federal Reserve chair admits they just google 'what is a good interest rate'",
  "GDP growth attributed entirely to one guy in Nebraska who's been working really hard",
  "Economists discover secret to infinite wealth (requires initial investment of infinite wealth)",
  "New study finds the best time to invest was 'probably before you heard about it'",
  "Stock market introduces 'loot box' system for more exciting trading experience",
  "Bitcoin enthusiasts declare latest crash 'a good thing actually'",
  "Government announces new 'thoughts and prayers' economic stimulus package",
  "Economy now powered by 100% renewable anxiety",
  "Banks to introduce 'surprise account balance' feature for added excitement",
];

// Звуки (заглушки)
const sounds = {
  click: { play: () => {} },
  action: { play: () => {} },
  confirm: { play: () => {} },
  error: { play: () => {} },
};

// Policy effects - predefined responses
const policyEffects = {
  taxes: {
    message: "Federal taxes increased by 2%. Public approval drops by 5%.",
    effects: {
      gdp: -0.3,
      confidence: -5,
    },
  },
  interest: {
    message:
      "Interest rates lowered by 0.5%. Housing market reacts positively.",
    effects: {
      interest: -0.5,
      gdp: 0.2,
      confidence: 3,
    },
  },
  print: {
    message: "Money printing initiated. Inflation concerns rise.",
    effects: {
      inflation: 1.2,
      debt: 0.5,
      confidence: -4,
    },
  },
  gas: {
    message: "Gas prices frozen. Oil companies file lawsuits.",
    effects: {
      inflation: -0.7,
      confidence: 2,
    },
  },
  spending: {
    message: "Public spending cuts announced. Protests organized.",
    effects: {
      debt: -0.8,
      unemployment: 0.4,
      confidence: -6,
    },
  },
  ubi: {
    message: "Universal Basic Income introduced! Public support surges.",
    effects: {
      debt: 1.2,
      confidence: 8,
      unemployment: -0.3,
    },
  },
  debt: {
    message: "Student debt cancellation approved. Millennials rejoice.",
    effects: {
      debt: 0.7,
      confidence: 7,
    },
  },
  wage: {
    message: "Minimum wage increased to $15/hr. Small businesses concerned.",
    effects: {
      unemployment: 0.5,
      confidence: 4,
    },
  },
  healthcare: {
    message: "Healthcare investment bill passed. Stocks rise.",
    effects: {
      debt: 0.4,
      confidence: 5,
    },
  },
  tech: {
    message: "Tech giants face new regulations. Stock prices volatile.",
    effects: {
      gdp: -0.2,
      confidence: -2,
    },
  },
  crypto: {
    message: "All cryptocurrencies legalized. Market cap doubles overnight.",
    effects: {
      confidence: 6,
    },
  },
  nft: {
    message: "NFT trading taxed at 15%. Digital artists protest.",
    effects: {
      confidence: -3,
    },
  },
  govcoin: {
    message: "GovCoin announced. Bitcoin drops 10%.",
    effects: {
      confidence: 2,
    },
  },
  voting: {
    message: "Blockchain voting system launched. Election security improved.",
    effects: {
      confidence: 5,
    },
  },
  ai: {
    message: "AI Oversight Agency funded. Tech leaders divided.",
    effects: {
      confidence: 1,
    },
  },
};

// Confirmation overlay
let currentAction = null;

function showConfirmation(message) {
  sounds.action.play();

  const overlay = document.createElement("div");
  overlay.className = "confirmation-overlay";

  const box = document.createElement("div");
  box.className = "confirmation-box";
  box.innerHTML = `
    <h3>CONFIRM POLICY CHANGE</h3>
    <p>${message}</p>
    <div class="confirmation-buttons">
      <button class="confirm-btn" onclick="confirmAction(true)">✅ APPROVE</button>
      <button class="cancel-btn" onclick="confirmAction(false)">❌ CANCEL</button>
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Animation
  setTimeout(() => {
    box.style.transform = "scale(1)";
    box.style.opacity = "1";
  }, 10);
}

function confirmAction(confirmed) {
  sounds.confirm.play();

  const overlay = document.querySelector(".confirmation-overlay");
  const box = document.querySelector(".confirmation-box");

  // Animation
  if (box) {
    box.style.transform = "scale(0.5)";
    box.style.opacity = "0";
  }

  setTimeout(() => {
    if (overlay) document.body.removeChild(overlay);
  }, 300);

  if (confirmed && currentAction) {
    const effect = policyEffects[currentAction];

    // Add to log
    addLogEntry(`[ACTION EXECUTED] ${effect.message}`);

    // Update indicators
    for (const [indicator, change] of Object.entries(effect.effects)) {
      updateIndicator(indicator, change);
    }
  } else {
    sounds.error.play();
    addLogEntry(`[ACTION CANCELLED] Policy change was not approved`);
  }
}

function createConfetti(x, y) {
  // Simplified confetti effect
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.style.left = `${x}px`;
  confetti.style.top = `${y}px`;
  document.body.appendChild(confetti);

  setTimeout(() => {
    document.body.removeChild(confetti);
  }, 1000);
}

// Execute policy
function executePolicy(policy, event) {
  sounds.click.play();

  if (event) {
    // Button press effect
    event.target.classList.add("button-press");
    setTimeout(() => {
      event.target.classList.remove("button-press");
    }, 200);
  }

  currentAction = policy;
  const effect = policyEffects[policy];
  if (effect) {
    showConfirmation(effect.message);
  }
}

// Update indicator values with animation
function updateIndicator(indicator, change) {
  const element = document.getElementById(indicator);
  const changeElement = document.getElementById(`${indicator}-change`);

  if (!element || !changeElement) return;

  // Get current value
  let currentValue = parseFloat(element.textContent.replace(/[^0-9.-]/g, ""));

  // Calculate new value
  const newValue = currentValue + change;

  // Format based on indicator
  let formattedValue;
  switch (indicator) {
    case "gdp":
      formattedValue = `$${newValue.toFixed(2)}`;
      break;
    case "debt":
      formattedValue = `$${newValue.toFixed(2)}T`;
      break;
    case "confidence":
      formattedValue = newValue.toFixed(1);
      break;
    default:
      formattedValue = `${newValue.toFixed(2)}%`;
  }

  // Animate change
  element.style.color = change > 0 ? "#00ff9d" : "#ff2d75";
  element.style.transform = "scale(1.1)";

  setTimeout(() => {
    element.textContent = formattedValue;
    element.style.transform = "scale(1)";
    element.style.color = "";
  }, 300);

  // Update change indicator
  changeElement.textContent =
    change > 0
      ? `▲ ${Math.abs(change).toFixed(2)}${
          indicator === "confidence" ? "" : "%"
        }`
      : change < 0
      ? `▼ ${Math.abs(change).toFixed(2)}${
          indicator === "confidence" ? "" : "%"
        }`
      : "▬ 0.00%";
  changeElement.style.color =
    change > 0 ? "#00ff9d" : change < 0 ? "#ff2d75" : "#00b4ff";
}

// Add entry to log
function addLogEntry(message) {
  const log = document.getElementById("log");
  if (!log) return;

  const logEntry = document.createElement("div");
  logEntry.className = "log-entry";

  const now = new Date();
  logEntry.innerHTML = `${message} <span class="log-time">${now.toLocaleTimeString()}</span>`;

  log.prepend(logEntry);
  log.scrollTop = 0;

  // Highlight new entry
  logEntry.style.backgroundColor = "rgba(255, 230, 109, 0.1)";
  setTimeout(() => {
    logEntry.style.backgroundColor = "";
  }, 1000);

  // Limit log entries
  if (log.children.length > 15) {
    log.removeChild(log.lastChild);
  }
}

// Shake element
function shakeElement(element) {
  if (!element) return;

  element.classList.add("shake");
  setTimeout(() => {
    element.classList.remove("shake");
  }, 500);
}

// Start news feed
function startNewsFeed() {
  const newsContainer = document.getElementById("news-feed");
  if (!newsContainer) return;

  // Add initial news items
  for (let i = 0; i < 5; i++) {
    const randomNews = funnyNews[Math.floor(Math.random() * funnyNews.length)];
    const newsEntry = document.createElement("div");
    newsEntry.className = "news-entry";
    newsEntry.textContent = randomNews;
    newsContainer.appendChild(newsEntry);
  }

  // Add new news every 2 seconds
  setInterval(() => {
    const randomNews = funnyNews[Math.floor(Math.random() * funnyNews.length)];
    const newsEntry = document.createElement("div");
    newsEntry.className = "news-entry";
    newsEntry.textContent = randomNews;
    newsContainer.prepend(newsEntry);

    // Limit news items
    if (newsContainer.children.length > 10) {
      newsContainer.removeChild(newsContainer.lastChild);
    }
  }, 2000);
}

// Current date and time
function updateDateTime() {
  const now = new Date();
  const refreshElement = document.getElementById("refresh-time");
  if (refreshElement) {
    refreshElement.textContent = now.toLocaleString();
  }

  document.querySelectorAll(".log-time").forEach((el) => {
    el.textContent = now.toLocaleTimeString();
  });
}

// Setup category toggles
function setupCategoryToggles() {
  document.querySelectorAll(".category h3").forEach((header) => {
    header.addEventListener("click", function (e) {
      e.stopPropagation();
      const category = this.closest(".category");
      const wasActive = category.classList.contains("active");

      // Close all categories
      document.querySelectorAll(".category").forEach((c) => {
        c.classList.remove("active");
      });

      // Open current if it wasn't active
      if (!wasActive) {
        category.classList.add("active");
        sounds.click.play();
      }
    });
  });

  // Prevent buttons from closing categories
  document.querySelectorAll(".category-buttons button").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
}

// Initialize
function init() {
  updateDateTime();
  startNewsFeed();
  setupCategoryToggles();

  // Add initial log entries
  addLogEntry("System initialized");
  addLogEntry("Connected to Federal Reserve data feed");
  addLogEntry("Economic simulation ready");

  // Simulate API data refresh every 60 seconds
  setInterval(() => {
    updateDateTime();

    // Random small fluctuations to simulate real data
    const indicators = [
      "gdp",
      "inflation",
      "unemployment",
      "interest",
      "debt",
      "confidence",
    ];
    indicators.forEach((ind) => {
      const change = (Math.random() - 0.5) * 0.1;
      if (Math.abs(change) > 0.03) {
        updateIndicator(ind, change);
      }
    });

    // Add to log
    addLogEntry("[SYSTEM] Data refresh completed");
  }, 60000);
}

// Start the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// Make functions available globally
window.executePolicy = executePolicy;
window.confirmAction = confirmAction;
window.updateIndicator = updateIndicator;
window.addLogEntry = addLogEntry;
window.shakeElement = shakeElement;
