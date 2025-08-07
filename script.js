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

// Execute policy and update indicators
function executePolicy(policy) {
  const effect = policyEffects[policy];
  if (!effect) return;

  // Add to log
  const log = document.getElementById("log");
  const logEntry = document.createElement("div");
  logEntry.className = "log-entry";
  logEntry.textContent = `[ACTION] ${effect.message}`;
  log.prepend(logEntry);

  // Update indicators
  for (const [indicator, change] of Object.entries(effect.effects)) {
    updateIndicator(indicator, change);
  }

  // Scroll log to top
  log.scrollTop = 0;
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
    element.style.color = "#00ff9d";
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
    const log = document.getElementById("log");
    const logEntry = document.createElement("div");
    logEntry.className = "log-entry";
    logEntry.textContent = `[SYSTEM] Data refresh completed at ${new Date().toLocaleTimeString()}`;
    log.prepend(logEntry);
    log.scrollTop = 0;
  }, 60000);
});
