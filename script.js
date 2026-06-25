/* ==========================================================================
   FIFA World Cup 2026 Dashboard - JS Controller
   ========================================================================== */

// --- 1. Realistic Sample Data for 16 Teams ---
const teamsData = [
  // Group A
  { id: "MX", name: "Mexico", group: "A", flagCode: "mx", ranking: 15, played: 3, wins: 2, draws: 1, losses: 0, goalsScored: 6, goalsAgainst: 2, form: ["W", "D", "W"] },
  { id: "ZA", name: "South Africa", group: "A", flagCode: "za", ranking: 59, played: 3, wins: 0, draws: 2, losses: 1, goalsScored: 2, goalsAgainst: 5, form: ["D", "D", "L"] },
  { id: "KR", name: "South Korea", group: "A", flagCode: "kr", ranking: 22, played: 3, wins: 1, draws: 1, losses: 1, goalsScored: 3, goalsAgainst: 3, form: ["W", "D", "L"] },
  { id: "CZ", name: "Czechia", group: "A", flagCode: "cz", ranking: 36, played: 3, wins: 1, draws: 0, losses: 2, goalsScored: 4, goalsAgainst: 5, form: ["L", "W", "L"] },
  
  // Group B
  { id: "CA", name: "Canada", group: "B", flagCode: "ca", ranking: 49, played: 3, wins: 2, draws: 0, losses: 1, goalsScored: 4, goalsAgainst: 3, form: ["W", "L", "W"] },
  { id: "BA", name: "Bosnia & Herzegovina", group: "B", flagCode: "ba", ranking: 74, played: 3, wins: 1, draws: 0, losses: 2, goalsScored: 3, goalsAgainst: 5, form: ["L", "W", "L"] },
  { id: "QA", name: "Qatar", group: "B", flagCode: "qa", ranking: 34, played: 3, wins: 0, draws: 1, losses: 2, goalsScored: 2, goalsAgainst: 5, form: ["D", "L", "L"] },
  { id: "CH", name: "Switzerland", group: "B", flagCode: "ch", ranking: 19, played: 3, wins: 2, draws: 1, losses: 0, goalsScored: 5, goalsAgainst: 1, form: ["W", "W", "D"] },
  
  // Group C
  { id: "BR", name: "Brazil", group: "C", flagCode: "br", ranking: 5, played: 3, wins: 3, draws: 0, losses: 0, goalsScored: 8, goalsAgainst: 1, form: ["W", "W", "W"] },
  { id: "MA", name: "Morocco", group: "C", flagCode: "ma", ranking: 12, played: 3, wins: 1, draws: 1, losses: 1, goalsScored: 4, goalsAgainst: 4, form: ["L", "D", "W"] },
  { id: "HT", name: "Haiti", group: "C", flagCode: "ht", ranking: 86, played: 3, wins: 0, draws: 1, losses: 2, goalsScored: 1, goalsAgainst: 6, form: ["L", "D", "L"] },
  { id: "SCT", name: "Scotland", group: "C", flagCode: "gb-sct", ranking: 39, played: 3, wins: 1, draws: 0, losses: 2, goalsScored: 3, goalsAgainst: 5, form: ["W", "L", "L"] },
  
  // Group D
  { id: "US", name: "United States", group: "D", flagCode: "us", ranking: 11, played: 3, wins: 2, draws: 1, losses: 0, goalsScored: 7, goalsAgainst: 2, form: ["W", "D", "W"] },
  { id: "PY", name: "Paraguay", group: "D", flagCode: "py", ranking: 56, played: 3, wins: 0, draws: 1, losses: 2, goalsScored: 2, goalsAgainst: 6, form: ["L", "D", "L"] },
  { id: "AU", name: "Australia", group: "D", flagCode: "au", ranking: 23, played: 3, wins: 1, draws: 0, losses: 2, goalsScored: 3, goalsAgainst: 5, form: ["L", "L", "W"] },
  { id: "TR", name: "Türkiye", group: "D", flagCode: "tr", ranking: 40, played: 3, wins: 1, draws: 2, losses: 0, goalsScored: 4, goalsAgainst: 3, form: ["W", "D", "D"] }
];

// --- 2. Application State Variables ---
let currentGroupFilter = "all";
let currentSearchQuery = "";
let currentSortField = "points";
let currentSortDirection = "desc"; // desc or asc

// --- 3. DOM Elements Cache ---
const elements = {
  standingsBody: document.getElementById("standings-body"),
  emptyState: document.getElementById("empty-state"),
  teamSearch: document.getElementById("team-search"),
  clearSearchBtn: document.getElementById("clear-search-btn"),
  currentGroupBadge: document.getElementById("current-group-badge"),
  lastUpdated: document.getElementById("last-updated"),
  footerYear: document.getElementById("footer-year"),
  themeToggle: document.getElementById("theme-toggle"),
  refreshBtn: document.getElementById("refresh-btn"),
  toastContainer: document.getElementById("toast-container"),
  particlesContainer: document.getElementById("particles-container"),
  
  // Stats Elements
  statTeams: document.getElementById("stat-teams"),
  statMatches: document.getElementById("stat-matches"),
  statLeader: document.getElementById("stat-leader"),
  statAvgPoints: document.getElementById("stat-avg-points")
};

// --- 4. Initialize Application ---
document.addEventListener("DOMContentLoaded", () => {
  setLastUpdatedTime();
  setDynamicFooterYear();
  initBackgroundParticles();
  initTheme();
  
  // Render initial components
  renderGroups();
  updateStandings();
  
  // Stats Counters
  animateCounters();
  
  // Bind Event Listeners
  setupEventListeners();
  
  // Trigger welcome notification
  showToast("Welcome to FIFA Hackathon World Cup 2026 Dashboard!", "info");
});

// --- 5. Background Particle Effect Generator ---
function initBackgroundParticles() {
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    
    // Random positioning, sizes, and delays
    const size = Math.random() * 6 + 2; // 2px to 8px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`; // 10s to 20s
    
    elements.particlesContainer.appendChild(particle);
  }
}

// --- 6. Set Metadata & Timestamps ---
function setLastUpdatedTime() {
  const now = new Date();
  elements.lastUpdated.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function setDynamicFooterYear() {
  elements.footerYear.textContent = new Date().getFullYear();
}

// --- 7. Theme Control System (Dark / Light) ---
function initTheme() {
  const savedTheme = localStorage.getItem("fifa-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("fifa-theme", newTheme);
  
  showToast(`Switched to ${newTheme.toUpperCase()} theme`, "info");
}

// --- 8. Toast Notifications ---
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.classList.add("toast", `toast-${type}`);
  
  const icon = type === "success" ? "✅" : type === "info" ? "ℹ️" : "⚠️";
  toast.innerHTML = `
    <span>${icon}</span>
    <p>${message}</p>
  `;
  
  elements.toastContainer.appendChild(toast);
  
  // Auto-remove toast
  setTimeout(() => {
    toast.classList.add("hide");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 4000);
}

// --- 9. Stats Counter Animation ---
function animateCounters() {
  // Teams Count
  const teamsTarget = parseInt(elements.statTeams.getAttribute("data-target"));
  animateValue(elements.statTeams, 0, teamsTarget, 1000);
  
  // Matches Count
  const matchesTarget = parseInt(elements.statMatches.getAttribute("data-target"));
  animateValue(elements.statMatches, 0, matchesTarget, 1200);

  // Avg Points Calculations
  const calculatedAvg = calculateAveragePoints();
  elements.statAvgPoints.textContent = calculatedAvg.toFixed(2);
  
  // Leader display
  const leaderTeam = getLeaderTeam();
  elements.statLeader.innerHTML = `${leaderTeam.name} <img src="https://flagcdn.com/w40/${leaderTeam.flagCode}.png" alt="${leaderTeam.name}" style="width: 20px; vertical-align: middle; margin-left: 5px; border-radius: 2px;">`;
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function calculateAveragePoints() {
  const totalPoints = teamsData.reduce((acc, curr) => acc + (curr.wins * 3 + curr.draws * 1), 0);
  return totalPoints / teamsData.length;
}

function getLeaderTeam() {
  // Leader is determined by Points, GD, GS descending
  const sorted = [...teamsData].sort((a, b) => {
    const ptsA = a.wins * 3 + a.draws * 1;
    const ptsB = b.wins * 3 + b.draws * 1;
    if (ptsB !== ptsA) return ptsB - ptsA;
    
    const gdA = a.goalsScored - a.goalsAgainst;
    const gdB = b.goalsScored - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    
    return b.goalsScored - a.goalsScored;
  });
  return sorted[0];
}

// --- 10. Group Stage Explorer (Accordions) ---
function renderGroups() {
  const groups = ["A", "B", "C", "D"];
  
  groups.forEach(groupLetter => {
    const container = document.getElementById(`group-${groupLetter.toLowerCase()}-teams-list`);
    if (!container) return;
    
    const groupTeams = teamsData.filter(t => t.group === groupLetter);
    
    container.innerHTML = "";
    groupTeams.forEach(team => {
      const row = document.createElement("div");
      row.className = "team-row-item";
      row.setAttribute("data-team-name", team.name.toLowerCase());
      
      row.innerHTML = `
        <div class="team-row-info">
          <img class="flag-img" src="https://flagcdn.com/w40/${team.flagCode}.png" alt="${team.name}">
          <span class="team-row-name">${team.name}</span>
        </div>
        <span class="team-row-rank">Rank: #${team.ranking}</span>
      `;
      container.appendChild(row);
    });
  });
}

// --- 11. Standings Calculation and Render ---
function updateStandings() {
  // Calculate points and goal difference dynamically before rendering
  const computedTeams = teamsData.map(team => {
    return {
      ...team,
      points: team.wins * 3 + team.draws * 1,
      goalDifference: team.goalsScored - team.goalsAgainst
    };
  });

  // Filter based on Group selected & Search query
  let filteredTeams = computedTeams.filter(team => {
    const matchesGroup = currentGroupFilter === "all" || team.group === currentGroupFilter;
    const matchesSearch = team.name.toLowerCase().includes(currentSearchQuery) || 
                          team.group.toLowerCase() === currentSearchQuery ||
                          `group ${team.group}`.toLowerCase().includes(currentSearchQuery);
    return matchesGroup && matchesSearch;
  });

  // Sorting
  filteredTeams.sort((a, b) => {
    let valA = a[currentSortField];
    let valB = b[currentSortField];
    
    // Secondary sort condition to remain deterministic
    if (valA === valB && currentSortField !== "points") {
      valA = a.points;
      valB = b.points;
    }
    
    if (currentSortDirection === "desc") {
      return valB > valA ? 1 : valB < valA ? -1 : 0;
    } else {
      return valA > valB ? 1 : valA < valB ? -1 : 0;
    }
  });

  // Render Rows
  elements.standingsBody.innerHTML = "";
  
  if (filteredTeams.length === 0) {
    elements.emptyState.classList.remove("hidden");
  } else {
    elements.emptyState.classList.add("hidden");
  }

  filteredTeams.forEach((team, idx) => {
    const row = document.createElement("tr");
    
    // Determine podium rank tags
    let rowClass = "";
    if (idx === 0 && currentGroupFilter === "all" && currentSearchQuery === "") {
      rowClass = "first-place first-place-accent";
    } else if (idx === 1 && currentGroupFilter === "all" && currentSearchQuery === "") {
      rowClass = "second-place";
    } else if (idx === 2 && currentGroupFilter === "all" && currentSearchQuery === "") {
      rowClass = "third-place";
    }

    if (rowClass) row.className = rowClass;

    // Generate Form Badges
    const formBadgesHTML = team.form.map(f => `<span class="form-badge ${f}">${f}</span>`).join("");

    row.innerHTML = `
      <td class="td-rank">${idx + 1}</td>
      <td>
        <div class="td-team-wrapper">
          <img class="flag-img" src="https://flagcdn.com/w40/${team.flagCode}.png" alt="${team.name}">
          <div>
            <span class="td-team-name">${team.name}</span>
            <span class="td-team-group">Group ${team.group}</span>
          </div>
        </div>
      </td>
      <td class="td-numeric">${team.played}</td>
      <td class="td-numeric">${team.wins}</td>
      <td class="td-numeric">${team.draws}</td>
      <td class="td-numeric">${team.losses}</td>
      <td class="td-numeric">${team.goalsScored}</td>
      <td class="td-numeric">${team.goalsAgainst}</td>
      <td class="td-numeric">${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
      <td class="td-numeric" style="font-weight: 800; color: var(--accent);">${team.points}</td>
      <td>
        <div class="form-cell">${formBadgesHTML}</div>
      </td>
    `;
    elements.standingsBody.appendChild(row);
  });

  // Highlight Group Accordion Items corresponding to Search Query
  filterGroupAccordions();
}

// Helper to filter teams in Group stage explorer dynamically as user searches
function filterGroupAccordions() {
  const teamItems = document.querySelectorAll(".team-row-item");
  teamItems.forEach(item => {
    const teamName = item.getAttribute("data-team-name");
    if (teamName.includes(currentSearchQuery)) {
      item.style.display = "flex";
      item.style.opacity = "1";
    } else {
      item.style.display = "none";
      item.style.opacity = "0";
    }
  });
}

// --- 12. Setup Event Listeners ---
function setupEventListeners() {
  // Sticky Navigation smooth scrolling & active tag indicator
  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      
      navBtns.forEach(b => b.classList.remove("active-nav"));
      btn.classList.add("active-nav");
      
      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Accordion Expand/Collapse Logic (Only one group open at a time)
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const parentItem = trigger.parentElement;
      const content = parentItem.querySelector(".accordion-content");
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      
      // Close all other accordions
      document.querySelectorAll(".accordion-item").forEach(item => {
        if (item !== parentItem) {
          item.classList.remove("active");
          item.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
          item.querySelector(".accordion-content").style.maxHeight = "0px";
        }
      });
      
      // Toggle current accordion
      if (isExpanded) {
        trigger.setAttribute("aria-expanded", "false");
        parentItem.classList.remove("active");
        content.style.maxHeight = "0px";
      } else {
        trigger.setAttribute("aria-expanded", "true");
        parentItem.classList.add("active");
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });

  // Search Input Handler
  elements.teamSearch.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value.toLowerCase().trim();
    
    // Toggle clear search button visibility
    if (currentSearchQuery.length > 0) {
      elements.clearSearchBtn.style.display = "flex";
    } else {
      elements.clearSearchBtn.style.display = "none";
    }
    
    updateStandings();
  });

  // Clear Search Button
  elements.clearSearchBtn.addEventListener("click", () => {
    elements.teamSearch.value = "";
    currentSearchQuery = "";
    elements.clearSearchBtn.style.display = "none";
    elements.teamSearch.focus();
    updateStandings();
  });

  // Filter Group Quick Tags
  const filterTagBtns = document.querySelectorAll(".tag-btn");
  filterTagBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterTagBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      currentGroupFilter = btn.getAttribute("data-filter");
      elements.currentGroupBadge.textContent = currentGroupFilter === "all" ? "All Groups" : `Group ${currentGroupFilter}`;
      
      updateStandings();
    });
  });

  // Table Headers Sorting
  const tableHeaders = document.querySelectorAll(".standings-table th.sortable");
  tableHeaders.forEach(th => {
    th.addEventListener("click", () => {
      const field = th.getAttribute("data-sort");
      
      // Toggle directions
      if (currentSortField === field) {
        currentSortDirection = currentSortDirection === "desc" ? "asc" : "desc";
      } else {
        currentSortField = field;
        currentSortDirection = "desc"; // Default desc on new sort
      }

      // Update active indicators
      tableHeaders.forEach(header => {
        header.classList.remove("active-sort");
        const indicator = header.querySelector(".sort-indicator");
        indicator.className = "sort-indicator"; // reset classes
      });

      th.classList.add("active-sort");
      const indicator = th.querySelector(".sort-indicator");
      indicator.classList.add(currentSortDirection);

      updateStandings();
      showToast(`Sorted standings by ${field.toUpperCase()} (${currentSortDirection.toUpperCase()})`, "info");
    });
  });

  // Theme Toggle Button
  elements.themeToggle.addEventListener("click", toggleTheme);

  // Refresh Statistics Button
  elements.refreshBtn.addEventListener("click", () => {
    // Add small random noise to simulated goals to show dynamic updates
    teamsData.forEach(team => {
      if (Math.random() > 0.7) {
        // Randomly modify a stat realistically (either a draw or win change)
        const chance = Math.random();
        if (chance > 0.6) {
          team.wins += 1;
          team.goalsScored += Math.floor(Math.random() * 2) + 1;
          team.played += 1;
          team.form.unshift("W");
          team.form.pop();
        } else if (chance > 0.3) {
          team.draws += 1;
          team.goalsScored += Math.floor(Math.random() * 2);
          team.goalsAgainst += Math.floor(Math.random() * 2);
          team.played += 1;
          team.form.unshift("D");
          team.form.pop();
        }
      }
    });

    setLastUpdatedTime();
    updateStandings();
    animateCounters();
    
    showToast("Dashboard analytics refreshed. Standings updated in real-time!", "success");
  });
}
