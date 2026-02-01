/* ============================================
   VALENTINE SURPRISE - SIMPLE & WORKING SCRIPT
   ============================================ */

console.log("💝 Valentine Surprise Started!");

// ======================
// SIMPLE PAGE NAVIGATION
// ======================

function goToPage(pageNumber) {
    console.log("Going to page", pageNumber);
    
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the target page
    const targetPage = document.getElementById('page' + pageNumber);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Initialize page if needed
        initializePage(pageNumber);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update skip panel
        updateSkipPanel();
    } else {
        console.error("Page not found: page" + pageNumber);
    }
}

function initializePage(pageNumber) {
    console.log("Initializing page", pageNumber);
    
    switch(pageNumber) {
        case 3:
            setupHeartsGame();
            break;
        case 6:
            setupMaze();
            break;
        case 17:
            setupRiddles();
            break;
        case 18:
            setupMemoryGame();
            break;
        case 15:
            setupMusicPlayer();
            break;
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
        "Try the YES button! 😊"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create a floating message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(231, 76, 137, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.5rem;
        z-index: 9999;
        animation: fadeInOut 2s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove after animation
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        40% { transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// ======================
// GAME 1: 10 HEARTS
// ======================

let heartsCollected = 0;

function setupHeartsGame() {
    heartsCollected = 0;
    updateHeartCounter();
    
    const container = document.getElementById('hearts-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create 10 empty hearts
    for (let i = 0; i < 10; i++) {
        const heartBtn = document.createElement('button');
        heartBtn.className = 'heart-btn';
        heartBtn.innerHTML = '🤍';
        heartBtn.style.animationDelay = (i * 0.2) + 's';
        
        heartBtn.onclick = function() {
            if (!heartBtn.classList.contains('clicked')) {
                heartBtn.innerHTML = '❤️';
                heartBtn.classList.add('clicked');
                heartsCollected++;
                updateHeartCounter();
                
                // Create floating heart
                createFloatingHeart(heartBtn);
                
                // Check if all hearts collected
                if (heartsCollected === 10) {
                    document.getElementById('next-btn').style.display = 'inline-block';
                }
            }
        };
        
        container.appendChild(heartBtn);
    }
    
    document.getElementById('next-btn').style.display = 'none';
}

function updateHeartCounter() {
    const counter = document.getElementById('heart-count');
    if (counter) {
        counter.textContent = heartsCollected;
    }
}

function checkHeartsGame() {
    if (heartsCollected === 10) {
        goToPage(4);
    } else {
        alert(`You need to collect all 10 hearts! You have ${heartsCollected}/10.`);
    }
}

// ======================
// GAME 2: MAZE
// ======================

let playerPosition = { x: 10, y: 10 };
let mazeCompleted = false;

function setupMaze() {
    playerPosition = { x: 10, y: 10 };
    mazeCompleted = false;
    
    const player = document.getElementById('player');
    if (player) {
        player.style.left = '10px';
        player.style.top = '10px';
    }
    
    // Add keyboard controls
    document.addEventListener('keydown', handleMazeKeyPress);
}

function handleMazeKeyPress(event) {
    if (mazeCompleted) return;
    
    const step = 20;
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            newY -= step;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            newY += step;
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            newX -= step;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            newX += step;
            break;
        default:
            return;
    }
    
    // Check boundaries (simple maze)
    if (newX >= 0 && newX <= 460 && newY >= 0 && newY <= 360) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        
        const player = document.getElementById('player');
        if (player) {
            player.style.left = newX + 'px';
            player.style.top = newY + 'px';
        }
        
        // Check if reached end (bottom right corner)
        if (newX > 400 && newY > 300) {
            mazeCompleted = true;
            document.removeEventListener('keydown', handleMazeKeyPress);
            
            setTimeout(() => {
                alert('🎉 You found your way to my heart!');
                goToPage(7);
            }, 500);
        }
    }
}

function resetMaze() {
    setupMaze();
}

// ======================
// MUSIC PLAYER
// ======================

function setupMusicPlayer() {
    console.log("Music player ready");
}

function playMusic() {
    alert("🎵 Music playing! Enjoy our song for 45 seconds!");
}

function pauseMusic() {
    alert("⏸️ Music paused");
}

function replayMusic() {
    alert("🔄 Replaying our song!");
}

// ======================
// GAME 3: RIDDLES
// ======================

let currentRiddle = 0;
const riddles = [
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        answer: "echo",
        hint: "It's what you hear in mountains"
    },
    {
        question: "What has keys but can't open locks?",
        answer: "piano",
        hint: "You play music with it"
    },
    {
        question: "The more you take, the more you leave behind. What am I?",
        answer: "footsteps",
        hint: "You make them when you walk"
    }
];

function setupRiddles() {
    currentRiddle = 0;
    showRiddle();
}

function showRiddle() {
    if (currentRiddle < riddles.length) {
        document.getElementById('riddle-text').textContent = riddles[currentRiddle].question;
        document.getElementById('riddle-number').textContent = currentRiddle + 1;
        document.getElementById('answer-input').value = '';
        document.getElementById('hint').style.display = 'none';
    } else {
        goToPage(18); // Go to memory game after all riddles
    }
}

function checkRiddle() {
    const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    const correctAnswer = riddles[currentRiddle].answer;
    
    if (userAnswer === correctAnswer) {
        currentRiddle++;
        if (currentRiddle < riddles.length) {
            alert('✅ Correct! Next riddle...');
            showRiddle();
        } else {
            alert('🎊 Brilliant! You solved all riddles!');
            goToPage(18);
        }
    } else {
        alert('❌ Not quite right. Try again!');
        document.getElementById('answer-input').select();
    }
}

function showHint() {
    document.getElementById('hint').style.display = 'block';
}

// ======================
// GAME 4: MEMORY GAME
// ======================

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

function setupMemoryGame() {
    memoryCards = ['❤️', '🎁', '💌', '💝', '🎀', '🎊', '💖', '💕'];
    memoryCards = [...memoryCards, ...memoryCards]; // Duplicate for pairs
    
    // Shuffle
    for (let i = memoryCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
    }
    
    flippedCards = [];
    matchedPairs = 0;
    updateMatchCounter();
    
    const container = document.getElementById('memory-game');
    if (!container) return;
    
    container.innerHTML = '';
    
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.textContent = '?';
        
        card.onclick = function() {
            if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
                flipCard(card);
            }
        };
        
        container.appendChild(card);
    });
    
    document.getElementById('memory-next-btn').style.display = 'none';
}

function flipCard(card) {
    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Match found
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                flippedCards = [];
                matchedPairs++;
                updateMatchCounter();
                
                if (matchedPairs === 8) {
                    document.getElementById('memory-next-btn').style.display = 'inline-block';
                }
            }, 500);
        } else {
            // No match, flip back
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
                flippedCards = [];
            }, 1000);
        }
    }
}

function updateMatchCounter() {
    const counter = document.getElementById('match-count');
    if (counter) {
        counter.textContent = matchedPairs;
    }
}

function resetMemoryGame() {
    setupMemoryGame();
}

// ======================
// SKIP PANEL
// ======================

function setupSkipPanel() {
    let clickCount = 0;
    let clickTimer;
    
    document.getElementById('skip-trigger').onclick = function() {
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
    
    // Keyboard shortcut
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            event.preventDefault();
            openSkipPanel();
        }
    });
    
    // Close when clicking overlay
    document.getElementById('skip-overlay').onclick = closeSkipPanel;
}

function openSkipPanel() {
    document.getElementById('skip-overlay').classList.add('active');
    document.getElementById('skip-panel').classList.add('active');
    updateSkipPanel();
}

function closeSkipPanel() {
    document.getElementById('skip-overlay').classList.remove('active');
    document.getElementById('skip-panel').classList.remove('active');
}

function updateSkipPanel() {
    const skipPages = document.getElementById('skip-pages');
    if (!skipPages) return;
    
    skipPages.innerHTML = '';
    
    // Create buttons for all 19 pages
    for (let i = 1; i <= 19; i++) {
        const btn = document.createElement('button');
        btn.className = 'skip-page-btn';
        btn.textContent = getPageName(i);
        
        // Mark current page
        const currentPage = document.querySelector('.page.active');
        if (currentPage && currentPage.id === 'page' + i) {
            btn.classList.add('current');
        }
        
        btn.onclick = function() {
            goToPage(i);
            closeSkipPanel();
        };
        
        skipPages.appendChild(btn);
    }
}

function getPageName(pageNumber) {
    const names = {
        1: "Start",
        2: "Question",
        3: "10 Hearts Game",
        4: "Transition",
        5: "Maze Intro",
        6: "Maze Game",
        7: "7 Days Intro",
        8: "Day 1",
        9: "Day 2",
        10: "Day 3",
        11: "Day 4",
        12: "Day 5",
        13: "Day 6",
        14: "Day 7",
        15: "Music Player",
        16: "Riddles Intro",
        17: "Riddles Game",
        18: "Memory Game",
        19: "Final Message"
    };
    
    return names[pageNumber] || `Page ${pageNumber}`;
}

// ======================
// UTILITY FUNCTIONS
// ======================

function createFloatingHeart(sourceElement) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: absolute;
        font-size: 30px;
        pointer-events: none;
        z-index: 100;
        animation: floatUp 2s ease forwards;
    `;
    
    const rect = sourceElement.getBoundingClientRect();
    heart.style.left = (rect.left + rect.width / 2 - 15) + 'px';
    heart.style.top = (rect.top - 15) + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Add floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
        }
    }
`;
document.head.appendChild(floatStyle);

// ======================
// INITIALIZE EVERYTHING
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Website loaded!");
    
    // Setup skip panel
    setupSkipPanel();
    
    // Setup games
    setupHeartsGame();
    setupMaze();
    setupRiddles();
    setupMemoryGame();
    
    // Make goToPage available globally (for onclick in HTML)
    window.goToPage = goToPage;
    window.funnyNo = funnyNo;
    window.checkHeartsGame = checkHeartsGame;
    window.resetMaze = resetMaze;
    window.playMusic = playMusic;
    window.pauseMusic = pauseMusic;
    window.replayMusic = replayMusic;
    window.checkRiddle = checkRiddle;
    window.showHint = showHint;
    window.resetMemoryGame = resetMemoryGame;
    window.closeSkipPanel = closeSkipPanel;
    
    console.log("🎉 Everything ready! Starting on page 1");
});

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Error:", message);
    // Don't show alert to avoid disturbing user
    return true;
};
