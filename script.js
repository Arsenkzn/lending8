// Sound effects
const sounds = {
  click: new Audio("sounds/click.mp3"),
  action: new Audio("sounds/action.mp3"),
  confirm: new Audio("sounds/confirm.mp3"),
  error: new Audio("sounds/error.mp3"),
};

// Current date and time
function updateDateTime() {
  const now = new Date();
  document.getElementById("refresh-time").textContent = now.toLocaleString();
  document.querySelectorAll(".log-time").forEach((el) => {
    el.textContent = now.toLocaleTimeString();
  });
}

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
  box.style.transform = "scale(0.5)";
  box.style.opacity = "0";

  setTimeout(() => {
    if (overlay) document.body.removeChild(overlay);
  }, 300);

  if (confirmed && currentAction) {
    const effect = policyEffects[currentAction];

    // Confetti effect
    const btn = document.querySelector(
      `[onclick="executePolicy('${currentAction}')"]`
    );
    if (btn) {
      const rect = btn.getBoundingClientRect();
      createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

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

// Execute policy
function executePolicy(policy) {
  sounds.click.play();

  // Button press effect
  event.target.classList.add("button-press");
  setTimeout(() => {
    event.target.classList.remove("button-press");
  }, 200);

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
}

// Confetti effect
function createConfetti(x, y) {
  const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ffffff"];
  const confetti = document.createElement("div");
  confetti.className = "confetti-container";
  confetti.style.left = `${x}px`;
  confetti.style.top = `${y}px`;

  for (let i = 0; i < 50; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = `${Math.random() * 20 - 10}px`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    confetti.appendChild(piece);
  }

  document.body.appendChild(confetti);

  setTimeout(() => {
    document.body.removeChild(confetti);
  }, 3000);
}

// Shake element
function shakeElement(element) {
  element.classList.add("shake");
  setTimeout(() => {
    element.classList.remove("shake");
  }, 500);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateDateTime();

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

  // Category toggle functionality
  document.querySelectorAll(".category h3").forEach((header) => {
    header.addEventListener("click", function () {
      const category = this.parentElement;
      category.classList.toggle("active");

      // Close other open categories
      document.querySelectorAll(".category").forEach((c) => {
        if (c !== category && c.classList.contains("active")) {
          c.classList.remove("active");
        }
      });
    });
  });

  // Initial log entries
  addLogEntry("System initialized");
  addLogEntry("Connected to Federal Reserve data feed");
  addLogEntry("Awaiting policy decisions");
});
