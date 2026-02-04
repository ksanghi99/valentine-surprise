/* ============================================
   VALENTINE SURPRISE - COMPLETE JAVASCRIPT
   ============================================ */

console.log("💝 Valentine Surprise Started!");

// ======================
// GLOBAL VARIABLES
// ======================
let currentPage = 1;
let autoTransitionTimers = [];

// Game 1: Tap Hearts
let heartsCollected = 0;
let totalHearts = 10;
let game1Timer = null;
let currentHeart = null;
const compliments = [
    "You have the most beautiful smile!",
    "Your eyes sparkle like stars!",
    "You make my heart skip a beat!",
    "You're the best thing that ever happened to me!",
    "Your laugh is my favorite sound!",
    "You're more amazing than you know!",
    "Being with you feels like home!",
    "You make every day brighter!",
    "You're my dream come true!",
    "I fall for you more every day!"
];

// Game 2: LOVE SCRAMBLE
let scrambleGame = {
    originalSentence: [
        "Under", "the", "moon", "I", "want", "to", "trace", "every", 
        "curve", "of", "your", "body", "with", "my", "lips", "until", 
        "you", "whisper", "my", "name", "breathlessly"
    ],
    scrambledWords: [],
    selectedWords: [],
    hintUsed: false,
    startTime: null,
    timerInterval: null
};

// Valentine Week Data
const valentineWeekData = {
  currentDay: 1,
  progress: JSON.parse(localStorage.getItem('valentineProgress')) || [],
  unlockedMemories: JSON.parse(localStorage.getItem('valentineMemories')) || [],
  
  days: [
    {
      id: 1,
      name: "Rose Day",
      date: "February 7",
      icon: "🌹",
      color: "#e74c89",
      subtitle: "Where Our Love Bloomed",
      photos: [
        { 
          src: "images/day1/rose1.jpg", 
          caption: "Like this rose, my love for you grows each day", 
          memory: "Our first flower together",
          onerror: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day1/rose2.jpg", 
          caption: "Every petal holds a promise to you", 
          memory: "Promises in petals",
          onerror: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day1/rose3.jpg", 
          caption: "Delicate yet strong, like our love", 
          memory: "Strength in tenderness",
          onerror: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&h=300&fit=crop"
        }
      ],
      interactive: {
        type: "rose_garden",
        rosesFound: 0,
        totalRoses: 7,
        roseMessages: [
          "You make my heart bloom like the first spring rose",
          "Every day with you is more beautiful than a garden in full bloom",
          "Your smile is my sunshine that helps our love grow",
          "I love watching our love grow stronger every day",
          "You're more precious than the rarest rose in the world",
          "My love for you has no thorns, only petals of affection",
          "Forever blooming together in the garden of our love"
        ]
      },
      message: "Just as roses need care to bloom, I promise to nurture our love every single day. Your presence in my life makes everything more beautiful.",
      promise: "I'll bring you roses every year on this day"
    },
    {
      id: 2,
      name: "Propose Day",
      date: "February 8",
      icon: "💍",
      color: "#9b59b6",
      subtitle: "My Forever Yes",
      photos: [
        { 
          src: "images/day2/propose1.jpg", 
          caption: "The moment I knew you were my forever", 
          memory: "The realization",
          onerror: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day2/propose2.jpg", 
          caption: "Your smile is my favorite answer", 
          memory: "Your beautiful smile",
          onerror: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day2/propose3.jpg", 
          caption: "Building our forever, one moment at a time", 
          memory: "Our future together",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        }
      ],
      interactive: {
        type: "proposal_scenarios",
        selectedScenario: null,
        scenarios: [
          { 
            type: "romantic", 
            icon: "🌅", 
            title: "Sunset Proposal", 
            description: "On a beach at sunset, with candles forming a heart around us",
            result: "I'd kneel as the sun dips below the horizon, telling you how every sunset reminds me of the beauty you bring to my life."
          },
          { 
            type: "funny", 
            icon: "😂", 
            title: "Funny Proposal", 
            description: "During our favorite comedy show, with a ring in the popcorn",
            result: "I'd wait for the funniest moment, then whisper 'This is funny, but I'm serious about forever with you' as I show you the ring."
          },
          { 
            type: "surprise", 
            icon: "🎉", 
            title: "Surprise Adventure", 
            description: "During a hike to our favorite spot, with a hidden photographer",
            result: "At the peak, with the world at our feet, I'd tell you that every adventure is better with you by my side."
          }
        ]
      },
      message: "Every day with you feels like Propose Day - I'd choose you again and again, in a hundred lifetimes. You are not just my valentine, you are my always and forever.",
      promise: "I'll keep proposing new adventures with you forever"
    }
  ]
};

// ======================
// PAGE NAVIGATION - UPDATED
// ======================

function goToPage(pageNumber) {
    console.log("Navigating to page", pageNumber);
    currentPage = pageNumber;
    
    // Clear all auto-transition timers
    clearAllAutoTimers();
    
    // Stop any running games
    stopGame1();
    stopScrambleTimer();
    
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Handle special pages
    if (pageNumber === 9) {
        // Valentine Week Hub
        const page9 = document.getElementById('page9');
        if (page9) {
            page9.style.display = 'flex';
            page9.classList.add('active');
            updateValentineProgress();
        }
    } else if (pageNumber >= 10 && pageNumber <= 16) {
        // Direct day access (for skip panel)
        goToValentineDay(pageNumber - 9);
        return;
    } else {
        // Normal page
        const targetPage = document.getElementById('page' + pageNumber);
        if (targetPage) {
            targetPage.style.display = 'flex';
            targetPage.classList.add('active');
            
            // Initialize the page
            initializePage(pageNumber);
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }
    
    // Update skip panel
    updateSkipPanel();
}

// ======================
// VALENTINE WEEK FUNCTIONS
// ======================

function goToValentineDay(dayNumber) {
    console.log("Going to Valentine Day", dayNumber);
    currentPage = 9; // Set as week hub page
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Show valentine day container
    const dayContainer = document.getElementById('valentine-day-container');
    if (dayContainer) {
        dayContainer.style.display = 'flex';
        dayContainer.classList.add('active');
        
        // Load the day
        loadValentineDay(dayNumber);
    } else {
        console.error("Valentine day container not found!");
    }
}

function loadValentineDay(dayNumber) {
    const dayData = valentineWeekData.days.find(d => d.id === dayNumber);
    if (!dayData) {
        console.error("Day data not found for day", dayNumber);
        return;
    }
    
    valentineWeekData.currentDay = dayNumber;
    
    // Update progress
    updateValentineProgress();
    
    // Generate day HTML
    const dayHTML = generateDayHTML(dayData);
    const dayContent = document.getElementById('day-content');
    if (dayContent) {
        dayContent.innerHTML = dayHTML;
        
        // Initialize the interactive game
        setTimeout(() => {
            initializeDayGame(dayData);
        }, 100);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function generateDayHTML(dayData) {
    const isCompleted = valentineWeekData.progress.includes(dayData.id);
    
    return `
    <!-- Day Header -->
    <div class="day-header">
      <button class="back-to-hub" onclick="goToPage(9)">
        <i class="fas fa-calendar"></i> Back to Week
      </button>
      
      <div class="day-title-container">
        <div class="day-icon-large" style="background: ${dayData.color}20; color: ${dayData.color}">
          ${dayData.icon}
        </div>
        <div>
          <h1 style="color: ${dayData.color}">${dayData.name}</h1>
          <p class="day-subtitle-large">${dayData.subtitle}</p>
          <p class="day-date-large">${dayData.date}</p>
        </div>
      </div>
      
      <div class="day-progress-indicator" style="border-color: ${dayData.color}">
        Day <span style="color: ${dayData.color}">${dayData.id}</span>/7
        <div class="mini-progress">
          ${Array(7).fill().map((_, i) => 
            i + 1 === dayData.id ? '●' : i + 1 < dayData.id ? '✓' : '○'
          ).join('')}
        </div>
      </div>
    </div>
    
    <!-- Interactive Game Area -->
    <div class="interactive-area" id="interactive-area">
      <div id="interactive-game">
        <!-- Game loads here -->
      </div>
    </div>
    
    <!-- Photo Gallery -->
    <div class="day-gallery">
      <div class="photo-gallery-title">
        <i class="fas fa-camera" style="color: ${dayData.color}"></i>
        <span>Today's Memories</span>
      </div>
      <div class="photo-grid" id="photo-grid">
        ${dayData.photos.map((photo, index) => `
          <div class="photo-item" onclick="viewMemory('${photo.memory}')">
            <div class="photo-frame">
              <img src="${photo.src}" alt="${photo.caption}" 
                   onerror="this.src='${photo.onerror}'">
              <div class="photo-overlay">
                <i class="fas fa-heart"></i>
                <p>Click to view memory</p>
              </div>
            </div>
            <div class="photo-caption">${photo.caption}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Love Message -->
    <div class="day-message-container">
      <div class="message-bubble">
        <p>${dayData.message}</p>
        <div class="day-promise" style="background: ${dayData.color}">
          <i class="fas fa-star"></i>
          <span>My promise: ${dayData.promise}</span>
        </div>
      </div>
      
      ${isCompleted ? `
        <div class="memory-unlocked">
          <i class="fas fa-lock-open"></i>
          <span>Day completed! Memory saved forever in your heart</span>
        </div>
      ` : ''}
    </div>
    
    <!-- Navigation -->
    <div class="day-navigation-enhanced">
      <button class="btn nav-btn prev-day-btn" onclick="prevValentineDay()" 
              ${dayData.id === 1 ? 'disabled' : ''}>
        <i class="fas fa-arrow-left"></i> Day ${dayData.id - 1 || ''}
      </button>
      
      <div class="day-controls">
        <button class="sound-btn" onclick="toggleDaySound(${dayData.id})" title="Toggle sound">
          <i class="fas fa-music"></i>
        </button>
        <button class="hint-btn" onclick="showDayHint(${dayData.id})" title="Get hint">
          <i class="fas fa-lightbulb"></i>
        </button>
        <button class="save-btn" onclick="completeValentineDay(${dayData.id})" 
                ${isCompleted ? 'disabled style="opacity:0.5"' : ''} title="Complete day">
          <i class="fas fa-bookmark"></i> Complete Day
        </button>
      </div>
      
      <button class="btn nav-btn next-day-btn" 
              onclick="${dayData.id === 7 ? 'goToPage(17)' : 'nextValentineDay()'}">
        ${dayData.id === 7 ? 'Complete Week <i class="fas fa-trophy"></i>' : `Day ${dayData.id + 1} <i class="fas fa-arrow-right"></i>`}
      </button>
    </div>
  `;
}

function initializeDayGame(dayData) {
    const gameArea = document.getElementById('interactive-game');
    if (!gameArea) return;
    
    switch(dayData.interactive.type) {
        case 'rose_garden':
            loadRoseGardenGame(dayData);
            break;
        case 'proposal_scenarios':
            loadProposalGame(dayData);
            break;
        default:
            gameArea.innerHTML = `<p>Game loading for ${dayData.name}...</p>`;
    }
}

function loadRoseGardenGame(dayData) {
    const game = dayData.interactive;
    const html = `
    <div class="rose-garden-game">
      <h3 style="color: ${dayData.color}">Find the 7 Hidden Roses</h3>
      <p>Click each rose to reveal sweet messages about our love!</p>
      
      <div class="garden-container">
        <div class="rose-counter" style="border-color: ${dayData.color}">
          Roses Found: <span id="roses-found">${game.rosesFound}</span>/7
          ${game.rosesFound === game.totalRoses ? ' 🌹 Complete!' : ''}
        </div>
        
        <div class="garden-area" id="garden-area" style="
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          padding: 40px;
          border-radius: 25px;
          border: 4px solid #2ecc71;
          min-height: 250px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          justify-items: center;
          align-items: center;
        ">
          ${Array(game.totalRoses).fill().map((_, i) => `
            <div class="rose-visual ${game.rosesFound > i ? 'found' : ''}" 
                 data-index="${i}" 
                 onclick="findRose(${i}, ${dayData.id})"
                 style="animation-delay: ${i * 0.2}s;">
              ${game.rosesFound > i ? '🌹' : '🥀'}
            </div>
          `).join('')}
        </div>
        
        <div class="rose-message-bubble" id="rose-message-bubble">
          ${game.rosesFound > 0 ? 
            `<p style="color: ${dayData.color}; font-weight: bold;">"${game.roseMessages[game.rosesFound - 1]}"</p>` : 
            '<p>Click a rose to reveal a sweet message about our love! 💖</p>'
          }
        </div>
      </div>
      
      <div class="garden-progress">
        <div class="rose-bush">
          <div class="bush-fill" style="width: ${(game.rosesFound / game.totalRoses) * 100}%"></div>
        </div>
        <p style="color: ${dayData.color}; font-weight: bold;">
          ${game.rosesFound === game.totalRoses ? 
            '🌸 Our love garden is in full bloom! 🌸' : 
            'Garden blooms as you find roses!'}
        </p>
      </div>
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
}

function findRose(index, dayId) {
    const dayData = valentineWeekData.days.find(d => d.id === dayId);
    if (!dayData || dayData.interactive.rosesFound > index) return;
    
    dayData.interactive.rosesFound = index + 1;
    
    // Update rose visual
    const roseElement = document.querySelector(`.rose-visual[data-index="${index}"]`);
    if (roseElement) {
        roseElement.classList.add('found');
        roseElement.textContent = '🌹';
        roseElement.style.pointerEvents = 'none';
    }
    
    // Update counter
    const rosesFoundElement = document.getElementById('roses-found');
    if (rosesFoundElement) {
        rosesFoundElement.textContent = dayData.interactive.rosesFound;
    }
    
    // Show message
    const messageElement = document.getElementById('rose-message-bubble');
    if (messageElement) {
        messageElement.innerHTML = `<p style="color: ${dayData.color}; font-weight: bold;">"${dayData.interactive.roseMessages[index]}"</p>`;
        messageElement.style.animation = 'none';
        setTimeout(() => {
            messageElement.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }
    
    // Update progress bar
    const bushFill = document.querySelector('.bush-fill');
    if (bushFill) {
        bushFill.style.width = `${(dayData.interactive.rosesFound / dayData.interactive.totalRoses) * 100}%`;
    }
    
    // If all roses found, mark day as completed
    if (dayData.interactive.rosesFound === dayData.interactive.totalRoses) {
        setTimeout(() => {
            showToast("🌹 Beautiful! You've found all the roses!");
            setTimeout(() => {
                completeValentineDay(dayId);
            }, 1500);
        }, 1000);
    }
}

function loadProposalGame(dayData) {
    const game = dayData.interactive;
    const html = `
    <div class="proposal-game">
      <h3 style="color: ${dayData.color}">Choose Your Dream Proposal</h3>
      <p>Each scenario tells a different story of how I'd ask for forever with you</p>
      
      <div class="scenarios-container">
        ${game.scenarios.map(scenario => `
          <div class="scenario-card-enhanced ${scenario.type} ${game.selectedScenario === scenario.type ? 'selected' : ''}" 
               data-type="${scenario.type}" 
               onclick="chooseProposalScenario('${scenario.type}', ${dayData.id})">
            <div class="scenario-content">
              <div class="scenario-icon-large">${scenario.icon}</div>
              <h4 class="scenario-title">${scenario.title}</h4>
              <p class="scenario-description">${scenario.description}</p>
            </div>
            <div class="scenario-hint">
              Click to explore this proposal
            </div>
          </div>
        `).join('')}
      </div>
      
      ${game.selectedScenario ? `
        <div class="scenario-result-enhanced" id="scenario-result">
          <h3>${game.scenarios.find(s => s.type === game.selectedScenario).title}</h3>
          <p style="font-size: 1.4rem; line-height: 1.6; margin: 20px 0;">
            ${game.scenarios.find(s => s.type === game.selectedScenario).result}
          </p>
          <p style="font-style: italic; margin-top: 25px;">
            But in truth, I don't need a perfect moment...<br>
            Every moment with you feels like the right time to say "forever".
          </p>
          
          ${!valentineWeekData.progress.includes(dayData.id) ? `
            <button class="btn" onclick="completeValentineDay(${dayData.id})" 
                    style="background: ${dayData.color}; margin-top: 30px; padding: 18px 40px; font-size: 1.4rem;">
              <i class="fas fa-heart"></i> Accept All My Proposals
            </button>
          ` : ''}
        </div>
      ` : `
        <div style="text-align: center; margin: 40px 0; color: #666; font-style: italic;">
          Select a proposal scenario above to see how I'd ask for forever with you...
        </div>
      `}
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
}

function chooseProposalScenario(type, dayId) {
    const dayData = valentineWeekData.days.find(d => d.id === dayId);
    if (!dayData) return;
    
    dayData.interactive.selectedScenario = type;
    loadProposalGame(dayData);
}

function prevValentineDay() {
    if (valentineWeekData.currentDay > 1) {
        goToValentineDay(valentineWeekData.currentDay - 1);
    }
}

function nextValentineDay() {
    if (valentineWeekData.currentDay < 2) { // Change to 7 when all days are added
        goToValentineDay(valentineWeekData.currentDay + 1);
    } else {
        goToPage(17);
    }
}

function completeValentineDay(dayId) {
    if (!valentineWeekData.progress.includes(dayId)) {
        valentineWeekData.progress.push(dayId);
        localStorage.setItem('valentineProgress', JSON.stringify(valentineWeekData.progress));
        
        // Update UI
        updateValentineProgress();
        
        // Show celebration
        showToast(`🎉 Day ${dayId} completed! Memory saved!`);
        
        // Reload current day to show completion status
        setTimeout(() => {
            loadValentineDay(dayId);
        }, 500);
    }
}

function updateValentineProgress() {
    const completed = valentineWeekData.progress.length;
    const progressFill = document.getElementById('week-progress-fill');
    const currentDayElement = document.getElementById('current-day');
    const completedDaysElement = document.getElementById('completed-days');
    
    if (progressFill) {
        progressFill.style.width = `${(completed / 7) * 100}%`;
    }
    
    if (currentDayElement) {
        currentDayElement.textContent = valentineWeekData.currentDay;
    }
    
    if (completedDaysElement) {
        completedDaysElement.textContent = completed;
    }
    
    // Update day status indicators
    valentineWeekData.days.forEach(day => {
        const statusElement = document.getElementById(`day${day.id}-status`);
        if (statusElement) {
            statusElement.innerHTML = Array(7).fill().map((_, i) => 
                i < day.id ? '●' : '○'
            ).join('');
            statusElement.style.color = valentineWeekData.progress.includes(day.id) ? '#2ecc71' : day.color;
        }
        
        // Update day card completion status
        const dayCard = document.querySelector(`.day-card[data-day="${day.id}"]`);
        if (dayCard) {
            if (valentineWeekData.progress.includes(day.id)) {
                dayCard.classList.add('completed');
            } else {
                dayCard.classList.remove('completed');
            }
        }
    });
}

function viewMemory(memoryName) {
    showToast(`💭 Remembering: ${memoryName}`);
}

function toggleDaySound(dayId) {
    showToast("🔊 Day music coming soon!");
}

function showDayHint(dayId) {
    const hints = [
        "💡 Hint: Click all 7 roses to complete the garden!",
        "💡 Hint: Choose a proposal scenario to see my romantic response!",
        "💡 Hint: Coming soon for other days!",
        "💡 Hint: Coming soon!",
        "💡 Hint: Coming soon!",
        "💡 Hint: Coming soon!",
        "💡 Hint: Coming soon!"
    ];
    
    showToast(hints[dayId - 1] || "💡 Explore everything on this page!");
}

// ======================
// PAGE INITIALIZATION
// ======================

function initializePage(pageNumber) {
    console.log("Initializing page", pageNumber);
    
    switch(pageNumber) {
        case 3: // Transition 1
            startAutoTransition(8, 4, 'countdown1');
            break;
        case 4: // Game 1
            setupGame1();
            break;
        case 5: // Transition 2
            startAutoTransition(8, 6, 'countdown2');
            break;
        case 7: // GAME 2 - LOVE SCRAMBLE
            setTimeout(() => {
                setupScrambleGame();
            }, 100);
            break;
        case 8: // Transition 3
            startAutoTransition(8, 9, 'countdown3');
            break;
        case 17: // Transition 4
            startAutoTransition(8, 18, 'countdown4');
            break;
        case 18: // Game 3
            setupRiddles();
            break;
        case 19: // Transition 5
            startAutoTransition(8, 20, 'countdown5');
            break;
        case 20: // Game 4
            initializeMatchGame();
            break;
        case 21: // Video Page
            console.log("🎬 Video page loaded");
            break;
    }
}

function startAutoTransition(seconds, nextPage, countdownId) {
    let countdown = seconds;
    const countdownElement = document.getElementById(countdownId);
    
    if (countdownElement) {
        const updateCountdown = () => {
            countdownElement.textContent = countdown;
            countdown--;
            
            if (countdown < 0) {
                clearInterval(timer);
                goToPage(nextPage);
            }
        };
        
        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        autoTransitionTimers.push({ timer: timer });
    }
}

function clearAllAutoTimers() {
    autoTransitionTimers.forEach(timerObj => {
        if (timerObj.timer) clearInterval(timerObj.timer);
    });
    autoTransitionTimers = [];
}

// ======================
// GAME 2: LOVE SCRAMBLE
// ======================

function setupScrambleGame() {
    console.log("🔤 Setting up Love Scramble Game...");
    
    // Reset game state
    scrambleGame.selectedWords = [];
    scrambleGame.hintUsed = false;
    scrambleGame.startTime = new Date();
    
    // Create shuffled copy of words
    scrambleGame.scrambledWords = [...scrambleGame.originalSentence];
    shuffleArray(scrambleGame.scrambledWords);
    
    // Clear previous display
    const scrambleArea = document.getElementById('scramble-area');
    const sentenceArea = document.getElementById('sentence-area');
    
    if (scrambleArea && sentenceArea) {
        scrambleArea.innerHTML = '';
        sentenceArea.innerHTML = '<p id="empty-message">Click words below to build the sentence...</p>';
        
        // Create word tiles
        scrambleGame.scrambledWords.forEach((word, index) => {
            const wordTile = document.createElement('div');
            wordTile.className = 'word-tile';
            wordTile.textContent = word;
            wordTile.dataset.index = index;
            wordTile.onclick = () => selectWord(word, index);
            scrambleArea.appendChild(wordTile);
        });
        
        // Update stats
        updateScrambleStats();
        
        // Start timer
        startScrambleTimer();
        
        // Reset success message
        const successMsg = document.getElementById('success-message');
        if (successMsg) successMsg.style.display = 'none';
        
        // Enable buttons
        const hintBtn = document.getElementById('hint-btn');
        const checkBtn = document.getElementById('check-btn');
        if (hintBtn) hintBtn.disabled = false;
        if (checkBtn) checkBtn.disabled = false;
        
        console.log("✅ Love Scramble ready! 20 words to arrange.");
    }
}

function selectWord(word, originalIndex) {
    // Check if word is already used
    const wordTile = document.querySelector(`.word-tile[data-index="${originalIndex}"]`);
    if (wordTile.classList.contains('used')) {
        return; // Word already used
    }
    
    // Add to selected words
    scrambleGame.selectedWords.push(word);
    
    // Mark word as used
    wordTile.classList.add('used');
    wordTile.classList.remove('selected');
    
    // Update sentence area
    const sentenceArea = document.getElementById('sentence-area');
    const emptyMessage = document.getElementById('empty-message');
    
    if (emptyMessage) emptyMessage.remove();
    
    const sentenceWord = document.createElement('div');
    sentenceWord.className = 'sentence-word';
    sentenceWord.textContent = word;
    sentenceWord.style.animation = 'wordAppear 0.5s ease';
    sentenceArea.appendChild(sentenceWord);
    
    // Update stats
    updateScrambleStats();
    
    // Scroll to show new word
    sentenceWord.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateScrambleStats() {
    const placedCount = document.getElementById('placed-count');
    const wordCount = document.getElementById('word-count');
    const hintStatus = document.getElementById('hint-status');
    const progress = (scrambleGame.selectedWords.length / scrambleGame.originalSentence.length) * 100;
    
    if (placedCount) placedCount.textContent = scrambleGame.selectedWords.length;
    if (wordCount) wordCount.textContent = `${scrambleGame.selectedWords.length}/20`;
    if (hintStatus) hintStatus.textContent = scrambleGame.hintUsed ? '❌ Used' : '🌙 Available';
    
    // Update progress bar
    updateLoveBar('love-fill-2', 'love-percent-2', progress);
}

function startScrambleTimer() {
    stopScrambleTimer();
    
    scrambleGame.timerInterval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - scrambleGame.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        const timerElement = document.getElementById('scramble-timer');
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function stopScrambleTimer() {
    if (scrambleGame.timerInterval) {
        clearInterval(scrambleGame.timerInterval);
        scrambleGame.timerInterval = null;
    }
}

function useHint() {
    if (scrambleGame.hintUsed) {
        showToast("You've already used your moonlight hint! 🌙");
        return;
    }
    
    scrambleGame.hintUsed = true;
    
    // Show first 3 words in correct order
    const hintWords = scrambleGame.originalSentence.slice(0, 3);
    showToast(`Moonlight hint: Start with "${hintWords.join(' ')}..." 🌙`);
    
    // Update hint status
    updateScrambleStats();
    
    // Disable hint button
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
        hintBtn.disabled = true;
        hintBtn.innerHTML = '<i class="fas fa-moon"></i> Hint Used';
    }
}

function checkScramble() {
    // Check if all words are placed
    if (scrambleGame.selectedWords.length !== scrambleGame.originalSentence.length) {
        showToast(`Place all ${scrambleGame.originalSentence.length} words first! ❤️`);
        return;
    }
    
    // Check if sentence is correct
    const isCorrect = scrambleGame.selectedWords.join(' ') === scrambleGame.originalSentence.join(' ');
    
    if (isCorrect) {
        // SUCCESS!
        stopScrambleTimer();
        
        // Calculate time taken
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - scrambleGame.startTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        
        // Show success message
        const successMsg = document.getElementById('success-message');
        const revealedSentence = document.getElementById('revealed-sentence');
        
        if (successMsg && revealedSentence) {
            revealedSentence.innerHTML = `
                <div style="font-size: 1.5rem; color: #e74c89; font-style: italic; margin: 20px 0; padding: 20px; background: rgba(255, 255, 255, 0.9); border-radius: 15px; border: 2px solid #ffccd5;">
                    "${scrambleGame.originalSentence.join(' ')}"
                </div>
                <p>You decoded my desire in ${minutes}:${seconds.toString().padStart(2, '0')}! 🎯</p>
                <p style="font-style: italic; color: #666;">That's exactly what I dream about under the moonlight...</p>
            `;
            successMsg.style.display = 'block';
            
            // Scroll to success message
            setTimeout(() => {
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
        
        // Disable game buttons
        const hintBtn = document.getElementById('hint-btn');
        const checkBtn = document.getElementById('check-btn');
        if (hintBtn) hintBtn.disabled = true;
        if (checkBtn) checkBtn.disabled = true;
        
        // Add success animation
        const pageContent = document.querySelector('.page-content');
        if (pageContent) {
            pageContent.classList.add('success-flash');
            setTimeout(() => {
                pageContent.classList.remove('success-flash');
            }, 500);
        }
        
        console.log("✅ Love Scramble completed successfully!");
        
    } else {
        // WRONG - gentle feedback
        showToast("Not quite right... Try rearranging the words! 💭");
        
        // Shake the sentence area
        const sentenceArea = document.getElementById('sentence-area');
        if (sentenceArea) {
            sentenceArea.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                sentenceArea.style.animation = '';
            }, 500);
        }
    }
}

function resetScramble() {
    if (confirm("Start over? Your current progress will be lost.")) {
        setupScrambleGame();
        showToast("Scrambled words reset! Try again 🌙");
    }
}

// ======================
// GAME 1: TAP HEARTS
// ======================

function setupGame1() {
    heartsCollected = 0;
    updateLoveBar('love-fill-1', 'love-percent-1', 0);
    updateHeartCounter();
    
    const container = document.getElementById('game1-container');
    const complimentDisplay = document.getElementById('compliment-display');
    
    if (container) {
        container.innerHTML = '';
        if (complimentDisplay) {
            complimentDisplay.innerHTML = '';
            complimentDisplay.classList.remove('show');
        }
        
        setTimeout(() => {
            showNextHeart();
        }, 500);
    }
}

function showNextHeart() {
    if (heartsCollected >= totalHearts) {
        setTimeout(() => {
            goToPage(5);
        }, 2000);
        return;
    }
    
    const container = document.getElementById('game1-container');
    if (!container) return;
    
    if (currentHeart) currentHeart.remove();
    if (game1Timer) clearTimeout(game1Timer);
    
    currentHeart = document.createElement('button');
    currentHeart.className = 'floating-heart-btn';
    currentHeart.innerHTML = '❤️';
    currentHeart.title = 'Tap me!';
    
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 85;
    const maxY = containerRect.height - 85;
    const minPadding = 20;
    
    const randomX = minPadding + Math.random() * (maxX - 2 * minPadding);
    const randomY = minPadding + Math.random() * (maxY - 2 * minPadding);
    
    currentHeart.style.left = `${randomX}px`;
    currentHeart.style.top = `${randomY}px`;
    currentHeart.style.animationDelay = `${Math.random() * 2}s`;
    currentHeart.onclick = collectHeart;
    
    container.appendChild(currentHeart);
    
    game1Timer = setTimeout(() => {
        showNextHeart();
    }, 4000);
}

function collectHeart() {
    if (!currentHeart) return;
    
    heartsCollected++;
    showCompliment(compliments[heartsCollected - 1]);
    updateHeartCounter();
    const percent = (heartsCollected / totalHearts) * 100;
    updateLoveBar('love-fill-1', 'love-percent-1', percent);
    
    currentHeart.style.animation = 'pop 0.5s ease forwards';
    
    setTimeout(() => {
        if (currentHeart && currentHeart.parentNode) {
            currentHeart.remove();
            currentHeart = null;
        }
    }, 500);
    
    if (game1Timer) {
        clearTimeout(game1Timer);
        game1Timer = null;
    }
    
    setTimeout(() => {
        showNextHeart();
    }, 3000);
}

function showCompliment(text) {
    const complimentDisplay = document.getElementById('compliment-display');
    if (complimentDisplay) {
        complimentDisplay.innerHTML = `<i class="fas fa-heart" style="color:#e74c89; margin-right:10px;"></i> ${text}`;
        complimentDisplay.classList.add('show');
        
        setTimeout(() => {
            complimentDisplay.classList.remove('show');
        }, 3000);
    }
}

function updateHeartCounter() {
    const counter = document.getElementById('heart-count');
    if (counter) {
        counter.textContent = heartsCollected;
        counter.style.animation = 'none';
        setTimeout(() => {
            counter.style.animation = 'pop 0.3s ease';
        }, 10);
    }
}

function stopGame1() {
    if (game1Timer) {
        clearTimeout(game1Timer);
        game1Timer = null;
    }
    if (currentHeart) {
        currentHeart.remove();
        currentHeart = null;
    }
}

// ======================
// UTILITY FUNCTIONS
// ======================

function updateLoveBar(fillId, percentId, percent) {
    const fill = document.getElementById(fillId);
    const percentElement = document.getElementById(percentId);
    
    if (fill && percentElement) {
        fill.style.width = `${percent}%`;
        percentElement.textContent = `${Math.round(percent)}%`;
    }
}

function showToast(message) {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(231, 76, 137, 0.95);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: toastSlideUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlideDown 0.3s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 300);
    }, 3000);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ======================
// SKIP PANEL
// ======================

function setupSkipPanel() {
    let clickCount = 0;
    let clickTimer;
    
    const skipTrigger = document.getElementById('skip-trigger');
    if (skipTrigger) {
        skipTrigger.onclick = function() {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 500);
            }
            
            if (clickCount === 3) {
                clearTimeout(clickTimer);
                clickCount = 0;
                openSkipPanel();
            }
        };
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            openSkipPanel();
        }
    });
    
    const overlay = document.getElementById('skip-overlay');
    if (overlay) {
        overlay.onclick = closeSkipPanel;
    }
}

function openSkipPanel() {
    const overlay = document.getElementById('skip-overlay');
    const panel = document.getElementById('skip-panel');
    
    if (overlay) overlay.classList.add('active');
    if (panel) panel.classList.add('active');
    
    updateSkipPanel();
}

function closeSkipPanel() {
    const overlay = document.getElementById('skip-overlay');
    const panel = document.getElementById('skip-panel');
    
    if (overlay) overlay.classList.remove('active');
    if (panel) panel.classList.remove('active');
}

function updateSkipPanel() {
    const skipPages = document.getElementById('skip-pages');
    if (!skipPages) return;
    
    skipPages.innerHTML = '';
    
    const pageNames = {
        1: "Start",
        2: "Question",
        3: "Transition 1",
        4: "Game 1: Tap Hearts",
        5: "Transition 2",
        6: "Love Scramble Intro",
        7: "Game 2: Love Scramble",
        8: "Transition 3",
        9: "Valentine Week Hub",
        10: "Rose Day (Day 1)",
        11: "Propose Day (Day 2)",
        12: "Chocolate Day (Day 3)",
        13: "Teddy Day (Day 4)",
        14: "Promise Day (Day 5)",
        15: "Hug Day (Day 6)",
        16: "Kiss Day (Day 7)",
        17: "Transition to Video",
        18: "Nostalgic Dance Video",
        19: "Final Message"
    };
    
    for (let i = 1; i <= 19; i++) {
        const btn = document.createElement('button');
        btn.className = 'skip-page-btn';
        btn.textContent = `${i}. ${pageNames[i] || `Page ${i}`}`;
        
        if (i === currentPage) {
            btn.classList.add('current');
        }
        
        btn.onclick = function() {
            goToPage(i);
            closeSkipPanel();
        };
        
        skipPages.appendChild(btn);
    }
}

// ======================
// PAGE 2: FUNNY NO BUTTON
// ======================

function funnyNo() {
    const messages = [
        "Are you sure? 🥺",
        "Think about it again! 💖",
        "Pretty please? 🥰",
        "I'll wait forever for you! ⏳",
        "Try the YES button! 😊",
        "My heart says you mean YES! ❤️",
        "Let's try that again... 😉",
        "You know you want to say YES! 💕"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.className = 'funny-option';
    
    const randomOptions = document.getElementById('random-options');
    if (randomOptions) {
        randomOptions.appendChild(messageDiv);
        setTimeout(() => {
            if (messageDiv.parentNode) messageDiv.remove();
        }, 2000);
    }
}

// ======================
// VIDEO FUNCTIONS
// ======================

function playVideo() {
    const video = document.getElementById('nostalgic-video');
    const overlay = document.getElementById('video-overlay');
    
    if (video) {
        video.play().then(() => {
            console.log("🎬 Video playing...");
            if (overlay) overlay.style.display = 'none';
        }).catch(error => {
            console.error("Video error:", error);
            alert("⚠️ Video loading issue. Please check:\n1. Video file exists at videos/our-dance.mp4\n2. Refresh the page\n3. Try the download button if needed");
        });
    }
}

// ======================
// INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Valentine Website Loaded!");
    
    // Setup skip panel
    setupSkipPanel();
    
    // Setup page 2
    const funnyNoBtn = document.getElementById('funny-no-btn');
    if (funnyNoBtn) {
        funnyNoBtn.onclick = funnyNo;
    }
    
    // Create floating hearts
    createFloatingHearts();
    
    // Update valentine progress
    updateValentineProgress();
    
    console.log("🎉 Everything ready! Enjoy the Valentine's surprise!");
});

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: ${20 + Math.random() * 30}px;
            opacity: ${0.3 + Math.random() * 0.4};
            left: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 7}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
            pointer-events: none;
        `;
        container.appendChild(heart);
    }
}

// Add toast styles
if (!document.querySelector('#toastStyles')) {
    const style = document.createElement('style');
    style.id = 'toastStyles';
    style.textContent = `
        @keyframes toastSlideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(100%);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes toastSlideDown {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(100%);
            }
        }
        
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

// Make functions globally available
window.goToPage = goToPage;
window.funnyNo = funnyNo;
window.useHint = useHint;
window.checkScramble = checkScramble;
window.resetScramble = resetScramble;
window.playVideo = playVideo;
window.goToValentineDay = goToValentineDay;
window.prevValentineDay = prevValentineDay;
window.nextValentineDay = nextValentineDay;
window.completeValentineDay = completeValentineDay;
window.findRose = findRose;
window.chooseProposalScenario = chooseProposalScenario;
window.viewMemory = viewMemory;
window.toggleDaySound = toggleDaySound;
window.showDayHint = showDayHint;
