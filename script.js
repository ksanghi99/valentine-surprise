/* ============================================
   VALENTINE SURPRISE - COMPLETE JAVASCRIPT
   GAME 2: LOVE SCRAMBLE (replaces Maze)
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

// Game 3: Riddles
let currentRiddle = 0;
let riddleScore = 0;
const riddles = [
    {
        section: "Cheesy",
        question: "What's my favorite midnight snack?",
        options: [
            "Your kisses under moonlight 🌙",
            "You 😉", 
            "Cold leftovers from dinner 🍕"
        ],
        correct: [0, 1],
        hint: "It's definitely not C!"
    },
    {
        section: "Cheesy",
        question: "If we were alone right now in a room, what would we be doing?",
        options: [
            "Slow dancing to silent music 💃",
            "Playing a game of 'who can stay quiet longest' 😏",
            "Watching paint dry 🎨"
        ],
        correct: [1],
        hint: "You Think too loud"
    },
    {
        section: "Romantic",
        question: "What's the most exciting sound I love to hear?",
        options: [
            "The whisper of sheets moving 🌙",
            "Your heartbeat against mine 💓",
            "Traffic noise outside 🚗"
        ],
        correct: [0, 1],
        hint: "It's definitely not boring!"
    },
    {
        section: "Romantic", 
        question: "What's the best way to warm up on a cold night?",
        options: [
            "Making our own heat ❤️🔥",
            "Skin-to-skin cuddles 🥵",
            "An electric blanket 🔌"
        ],
        correct: [0, 1],
        hint: "It's a good thing!"
    },
    {
        section: "Romantic",
        question: "What should be our secret code for 'I want you'?",
        options: [
            "Have you seen my socks? 🧦",
            "I'm feeling... adventurous 😈",
            "The moon looks beautiful tonight 🌝"
        ],
        correct: [1, 2],
        hint: "Too easy"
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's my favorite kind of workout?",
        options: [
            "The kind where we're both breathless 😮💨",
            "Late night cardio in bed 🛏️",
            "Doing laundry 💪"
        ],
        correct: [0, 1],
        hint: "Somewhere cozy..."
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's the most delicious thing I've ever tasted?",
        options: [
            "Apple Pie 🍑",
            "The nape of your neck 😘",
            "Store-bought cookies 🍪"
        ],
        correct: [0, 1],
        hint: "Definitely not cookies!"
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's the secret ingredient in our recipe for love?",
        options: [
            "Spice and everything nice 🌶️",
            "Late nights and soft whispers 🌙",
            "Boring routines ⏰"
        ],
        correct: [0, 1],
        hint: "Nothing boring about us!"
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's the game I'd never get tired of playing?",
        options: [
            "How many kisses before sunrise? 🌅",
            "Guess where I'm touching 👆",
            "Solitaire"
        ],
        correct: [0, 1],
        hint: "We're definitely exciting!"
    },
    {
        section: "Naughty/Adult Teasing",
        question: "What's the game I always want to play with you?",
        options: [
            "Hide and seek under covers 🙈",
            "Staring contest that ends with kisses 👄",
            "Monopoly (and argue about rules) 🎲"
        ],
        correct: [0, 1],
        hint: "It's more fun than board games!"
    }
];

// Game 4: Memory
const loveStoryMatchData = [
    {   id: 1,
        question: "🎯 What do I remember as our first meeting?",
        answer: "Mechanical Workshop 🔧",
        reveal: "Saloni, tera number dena! The start of everything...",
        hint: "Think about where things really began for us",
        image: "images/memory1.jpg"
    },
    {
        id: 2,
        question: "💖 Our first date - what was your favorite order?",
        answer: "Kathi King: Kaju Curry & Malai Kofta 🍛",
        reveal: "Watching you enjoy that food... I was already falling",
        hint: "Remember our first restaurant date?",
        image: "images/memory2.jpg"
    },
    {
        id: 3,
        question: "First trip?",
        answer: "✈️ Kasauli trip",
        reveal: "Tried to... you know 😂😂..... Adventures with you are always unforgettable!",
        hint: "Our first trip together had some firsts...",
        image: "images/memory3.jpg"
    },
    {
        id: 4,
        question: "our inside joke?",
        answer: "Krishna had fever, and in bukhar halat mein... bhi nahi baksha! 🤒",
        reveal: "Our laughs are my favorite soundtrack",
        hint: "Our funniest inside joke about being stubborn",
        image: "images/memory4.jpg"
    },
    {
        id: 5,
        question: "🛋️ What's my favorite cuddle spot?",
        answer: "Anywhere with you 🥰",
        reveal: "All spots are magical when you're in my arms",
        hint: "It's not about the place, but the company",
        image: "images/memory5.jpg"
    },
    {
        id: 6,
        question: "How our future looks like?",
        answer: "👶 One day we'll marry and have kids",
        reveal: "then...My son will take revenge from you! 😈. Can't wait for our chaotic, beautiful future",
        hint: "Our playful future parenting plans",
        image: "images/memory6.jpg"
    },
    {
        id: 7,
        question: "💝 Why do I love you the most?",
        answer: "Because you're MINE 👑",
        reveal: "You're my everything, always and forever",
        hint: "It's a possessive but loving reason",
        image: "images/memory7.jpg"
    },
    {
        id: 8,
        question: "❓ What's your most memorable moment?",
        answer: "Tosh trip ❄️",
        reveal: "Snow and you are the most deadly combination! ⛄",
        hint: "Think about our most adventurous trip",
        image: "images/memory8.jpg"
    }
];

// Game 4 state
let matchGameState = {
    selectedQuestion: null,
    completedPairs: [],
    wrongAttempts: {},
    shuffledAnswers: []
};

// ======================
// PAGE NAVIGATION
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
    });
    
    // Show target page
    const targetPage = document.getElementById('page' + pageNumber);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Initialize the page
        initializePage(pageNumber);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update skip panel
        updateSkipPanel();
    }
}

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
        case 10: case 11: case 12: case 13: case 14: case 15: case 16:
            updateDayNavigation(pageNumber - 9);
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
        document.querySelector('.page-content').classList.add('success-flash');
        setTimeout(() => {
            document.querySelector('.page-content').classList.remove('success-flash');
        }, 500);
        
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
// GAME 1: TAP HEARTS (Unchanged)
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
// GAME 3: RIDDLES (Unchanged)
// ======================

function setupRiddles() {
    currentRiddle = 0;
    riddleScore = 0;
    updateLoveBar('love-fill-3', 'love-percent-3', 0);
    showRiddle();
}

function showRiddle() {
    if (currentRiddle >= riddles.length) {
        setTimeout(() => {
            goToPage(19);
        }, 1500);
        return;
    }
    
    const riddle = riddles[currentRiddle];
    document.getElementById('riddle-text').textContent = riddle.question;
    document.getElementById('riddle-number').textContent = currentRiddle + 1;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    riddle.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.setAttribute('data-option', ['A', 'B', 'C'][index]);
        button.innerHTML = option;
        button.onclick = () => checkRiddleAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkRiddleAnswer(selectedIndex) {
    const riddle = riddles[currentRiddle];
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    buttons.forEach((btn, index) => {
        if (riddle.correct.includes(index)) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !riddle.correct.includes(index)) {
            btn.classList.add('wrong');
        }
    });
    
    if (riddle.correct.includes(selectedIndex)) {
        riddleScore++;
        const percent = (riddleScore / riddles.length) * 100;
        updateLoveBar('love-fill-3', 'love-percent-3', percent);
        
        setTimeout(() => {
            currentRiddle++;
            showRiddle();
        }, 1500);
    } else {
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.classList.remove('wrong');
                btn.style.pointerEvents = 'auto';
            });
            
            buttons.forEach((btn, index) => {
                if (riddle.correct.includes(index)) {
                    btn.classList.add('correct');
                }
            });
        }, 2000);
    }
}

function showHint() {
    const riddle = riddles[currentRiddle];
    const hintBtn = document.getElementById('hint-btn');
    
    if (hintBtn && riddle) {
        hintBtn.innerHTML = `Hint: ${riddle.hint} <i class="fas fa-lightbulb"></i>`;
        hintBtn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            hintBtn.innerHTML = `Need a hint? <i class="fas fa-lightbulb"></i>`;
            hintBtn.style.pointerEvents = 'auto';
        }, 5000);
    }
}

// ======================
// GAME 4: LOVE STORY MATCH (Unchanged)
// ======================

function initializeMatchGame() {
    matchGameState = {
        selectedQuestion: null,
        completedPairs: [],
        wrongAttempts: {},
        shuffledAnswers: []
    };
    
    const answers = loveStoryMatchData.map(item => item.answer);
    matchGameState.shuffledAnswers = shuffleArray([...answers]);
    
    renderQuestions();
    renderAnswers();
    updateProgress();
    clearQuestionDisplay();
    hideHint();
    
    document.getElementById('match-next-btn').style.display = 'none';
}

function renderQuestions() {
    const container = document.getElementById('question-items');
    container.innerHTML = '';
    
    loveStoryMatchData.forEach(item => {
        const questionItem = document.createElement('div');
        questionItem.className = 'match-item question-item';
        
        if (matchGameState.completedPairs.includes(item.id)) {
            questionItem.classList.add('completed');
        }
        
        questionItem.dataset.id = item.id;
        questionItem.onclick = () => selectQuestion(item.id);
        
        questionItem.innerHTML = `
            <div class="question-number">${item.id}</div>
            <div class="question-text">
                ${matchGameState.completedPairs.includes(item.id) ? '✓ Matched!' : 'Click to select'}
            </div>
        `;
        
        container.appendChild(questionItem);
    });
}

function renderAnswers() {
    const container = document.getElementById('answer-items');
    container.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    matchGameState.shuffledAnswers.forEach((answer, index) => {
        const answerItem = document.createElement('div');
        answerItem.className = 'match-item answer-item';
        answerItem.dataset.index = index;
        answerItem.onclick = () => selectAnswer(index);
        
        const completedItem = loveStoryMatchData.find(item => 
            matchGameState.completedPairs.includes(item.id) && 
            matchGameState.shuffledAnswers[index] === item.answer
        );
        
        if (completedItem) {
            answerItem.classList.add('completed');
        }
        
        answerItem.innerHTML = `
            <div class="answer-letter">${letters[index]}</div>
            <div class="answer-text">${answer}</div>
        `;
        
        container.appendChild(answerItem);
    });
}

function selectQuestion(questionId) {
    if (matchGameState.completedPairs.includes(questionId)) return;
    
    matchGameState.selectedQuestion = questionId;
    
    document.querySelectorAll('.question-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedItem = document.querySelector(`.question-item[data-id="${questionId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    const questionData = loveStoryMatchData.find(item => item.id === questionId);
    if (questionData) {
        document.getElementById('current-question-text').textContent = questionData.question;
        
        const pictureElement = document.getElementById('memory-picture');
        const placeholderElement = document.getElementById('picture-placeholder');
        const captionElement = document.getElementById('picture-caption');
        
        if (questionData.image) {
            pictureElement.src = questionData.image;
            pictureElement.classList.add('active');
            placeholderElement.style.display = 'none';
            captionElement.textContent = "This beautiful memory 💖";
            captionElement.classList.add('active');
        }
    }
}

function selectAnswer(answerIndex) {
    if (!matchGameState.selectedQuestion) {
        showHint("First select a question number from the left!");
        return;
    }
    
    const questionId = matchGameState.selectedQuestion;
    const questionData = loveStoryMatchData.find(item => item.id === questionId);
    const selectedAnswer = matchGameState.shuffledAnswers[answerIndex];
    
    const answerItems = document.querySelectorAll('.answer-item');
    const selectedAnswerItem = answerItems[answerIndex];
    
    if (questionData.answer === selectedAnswer) {
        if (!matchGameState.completedPairs.includes(questionId)) {
            matchGameState.completedPairs.push(questionId);
        }
        
        updateQuestionItem(questionId, 'completed');
        updateAnswerItem(answerIndex, 'completed');
        
        showRomanticReveal(questionData.reveal, '💖');
        updateProgress();
        
        matchGameState.selectedQuestion = null;
        clearQuestionDisplay();
        
        if (matchGameState.completedPairs.length === loveStoryMatchData.length) {
            setTimeout(() => {
                document.getElementById('match-next-btn').style.display = 'inline-block';
                showRomanticReveal("🎉 Perfect! You've matched all our beautiful memories! ❤️", '💖');
            }, 1000);
        }
        
    } else {
        selectedAnswerItem.classList.add('wrong');
        
        setTimeout(() => {
            selectedAnswerItem.classList.remove('wrong');
        }, 1000);
    }
}

function showRomanticReveal(message, icon) {
    const popup = document.getElementById('romantic-reveal-popup');
    const messageElement = document.getElementById('reveal-message');
    const iconElement = document.getElementById('reveal-icon');
    
    messageElement.textContent = message;
    iconElement.textContent = icon || '💖';
    popup.classList.add('active');
    
    setTimeout(() => {
        if (popup.classList.contains('active')) {
            closeReveal();
        }
    }, 5000);
}

function closeReveal() {
    document.getElementById('romantic-reveal-popup').classList.remove('active');
}

function showHint(hintText) {
    const hintBox = document.getElementById('hint-box');
    const hintTextElement = document.getElementById('hint-text');
    
    hintTextElement.textContent = hintText;
    hintBox.style.display = 'flex';
    
    setTimeout(() => {
        hideHint();
    }, 8000);
}

function hideHint() {
    document.getElementById('hint-box').style.display = 'none';
}

function updateProgress() {
    const connected = matchGameState.completedPairs.length;
    const total = loveStoryMatchData.length;
    const percent = (connected / total) * 100;
    
    document.getElementById('connected-count').textContent = connected;
    updateLoveBar('love-fill-4', 'love-percent-4', percent);
}

function updateQuestionItem(questionId, state) {
    const item = document.querySelector(`.question-item[data-id="${questionId}"]`);
    if (item) {
        item.className = 'match-item question-item';
        if (state === 'completed') {
            item.classList.add('completed');
        }
    }
}

function updateAnswerItem(answerIndex, state) {
    const item = document.querySelector(`.answer-item[data-index="${answerIndex}"]`);
    if (item) {
        item.className = 'match-item answer-item';
        if (state === 'completed') {
            item.classList.add('completed');
        }
    }
}

function clearQuestionDisplay() {
    document.getElementById('current-question-text').textContent = 'Click a question number to begin';
}

function resetMatchGame() {
    initializeMatchGame();
}

// ======================
// MOV VIDEO FUNCTIONS
// ======================

function playMOVVideo() {
    console.log("🎬 Attempting to play MOV video...");
    
    const video = document.getElementById('nostalgic-video');
    const placeholder = document.getElementById('video-placeholder');
    const statusDiv = document.getElementById('video-status');
    const errorDiv = document.getElementById('video-error');
    
    // Check browser support
    const canPlayMOV = video.canPlayType('video/quicktime');
    console.log("MOV support:", canPlayMOV);
    
    if (canPlayMOV === '' || canPlayMOV === 'no') {
        // MOV not supported
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.querySelector('h4').textContent = "MOV Format Not Supported";
            const errorMsg = errorDiv.querySelector('p');
            if (errorMsg) {
                errorMsg.innerHTML = `Your browser <strong>${navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Safari') ? 'Safari' : 'Browser'}</strong> has limited MOV support.`;
            }
        }
        if (placeholder) placeholder.style.display = 'none';
        return;
    }
    
    // Hide error and placeholder
    if (errorDiv) errorDiv.style.display = 'none';
    if (placeholder) placeholder.style.display = 'none';
    
    // Show loading status
    if (statusDiv) statusDiv.style.display = 'block';
    
    // Show video
    if (video) {
        video.style.display = 'block';
        video.classList.add('playing');
        
        // Set MOV source
        video.src = 'videos/our-dance.mov';
        video.type = 'video/quicktime';
        
        // Try to play
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("✅ MOV video playing!");
                if (statusDiv) statusDiv.style.display = 'none';
            }).catch(error => {
                console.error("❌ MOV play failed:", error);
                handleMOVError(error);
            });
        }
    }
}

function handleMOVError(error) {
    const placeholder = document.getElementById('video-placeholder');
    const errorDiv = document.getElementById('video-error');
    const statusDiv = document.getElementById('video-status');
    
    // Show error
    if (errorDiv) {
        let errorMsg = "MOV video failed to play.";
        if (error.name === 'NotSupportedError') {
            errorMsg = "MOV format not supported. Convert to MP4.";
        } else if (error.name === 'NotAllowedError') {
            errorMsg = "Click the play button on the video player.";
        }
        
        errorDiv.style.display = 'block';
        if (errorDiv.querySelector('span')) {
            errorDiv.querySelector('span').textContent = errorMsg;
        }
    }
    
    // Hide loading, show placeholder
    if (statusDiv) statusDiv.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
}

function retryVideo() {
    const errorDiv = document.getElementById('video-error');
    const placeholder = document.getElementById('video-placeholder');
    
    if (errorDiv) errorDiv.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
    
    console.log("🔄 Retrying MOV video...");
}

function downloadVideo() {
    // Create download link for MOV file
    const link = document.createElement('a');
    link.href = 'videos/our-dance.mov';
    link.download = 'Our_First_Dance.mov';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log("📥 Download initiated");
}

function testMOVSupport() {
    const video = document.getElementById('nostalgic-video');
    const canPlay = video.canPlayType('video/quicktime');
    
    let message = "";
    if (canPlay === 'probably') {
        message = "✅ Great! Your browser fully supports MOV format.";
    } else if (canPlay === 'maybe') {
        message = "⚠️ Your browser might support MOV. Try playing.";
    } else {
        message = "❌ Your browser doesn't support MOV. Convert to MP4.";
    }
    
    alert(message + "\n\nBrowser: " + navigator.userAgent.split(')')[0].split('(')[1]);
}

// Initialize video
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('nostalgic-video');
    const placeholder = document.getElementById('video-placeholder');
    
    if (video && placeholder) {
        // Check format support
        const canPlayMOV = video.canPlayType('video/quicktime');
        const canPlayMP4 = video.canPlayType('video/mp4');
        
        console.log("Format support - MOV:", canPlayMOV, "MP4:", canPlayMP4);
        
        // Update placeholder text based on support
        const formatNote = document.querySelector('.format-note');
        if (formatNote) {
            if (canPlayMOV === 'probably') {
                formatNote.textContent = "(MOV format - Full support detected)";
                formatNote.style.color = "rgba(46, 204, 113, 0.8)";
            } else if (canPlayMOV === 'maybe') {
                formatNote.textContent = "(MOV format - Limited support)";
                formatNote.style.color = "rgba(255, 204, 0, 0.8)";
            } else {
                formatNote.textContent = "(MOV format - May need conversion to MP4)";
                formatNote.style.color = "rgba(255, 107, 107, 0.8)";
            }
        }
    }
});

// Expose functions
window.playMOVVideo = playMOVVideo;
window.retryVideo = retryVideo;
window.downloadVideo = downloadVideo;
window.testMOVSupport = testMOVSupport;

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
    
    const pageNames = {
        1: "Start",
        2: "Question",
        3: "Transition 1",
        4: "Game 1: Tap Hearts",
        5: "Transition 2",
        6: "Love Scramble Intro",
        7: "Game 2: Love Scramble",
        8: "Transition 3",
        9: "7 Days Intro",
        10: "Day 1",
        11: "Day 2",
        12: "Day 3",
        13: "Day 4",
        14: "Day 5",
        15: "Day 6",
        16: "Day 7",
        17: "Transition 4",
        18: "Game 3: Riddles",
        19: "Transition 5",
        20: "Game 4: Memory Match",
        21: "Nostalgic Dance Video",
        22: "Final Message"
    };
    
    for (let i = 1; i <= 22; i++) {
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
    messageDiv.className = 'floating-message';
    
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        if (messageDiv.parentNode) messageDiv.remove();
    }, 2000);
}

// ======================
// INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Valentine Website Loaded!");
    
    setupSkipPanel();
    
    // Expose functions to global scope
    window.goToPage = goToPage;
    window.funnyNo = funnyNo;
    window.useHint = useHint;
    window.checkScramble = checkScramble;
    window.resetScramble = resetScramble;
    window.playVideo = playVideo;
    window.showHint = showHint;
    window.resetMatchGame = resetMatchGame;
    window.closeReveal = closeReveal;
    window.closeSkipPanel = closeSkipPanel;
    
    // Create floating hearts
    createFloatingHearts();
    
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

// Add message animation
if (!document.querySelector('#messageAnimation')) {
    const style = document.createElement('style');
    style.id = 'messageAnimation';
    style.textContent = `
        @keyframes floatMessage {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            20% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1);
            }
            40% {
                transform: translate(-50%, -50%) scale(1);
            }
            80% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);
}
/* =========================================== */
/* ENHANCED VALENTINE WEEK JAVASCRIPT */
/* =========================================== */

// Valentine Week Data - UPDATED
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
          onerror: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w-400&h=300&fit=crop"
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
    },
    {
      id: 3,
      name: "Chocolate Day",
      date: "February 9",
      icon: "🍫",
      color: "#8B4513",
      subtitle: "Sweet Moments With You",
      photos: [
        { 
          src: "images/day3/choco1.jpg", 
          caption: "Our shared sweetness makes everything better", 
          memory: "Sharing happiness",
          onerror: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day3/choco2.jpg", 
          caption: "Melting hearts together since day one", 
          memory: "Hearts melting",
          onerror: "https://images.unsplash.com/photo-1570913199992-91d07c140e7a?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day3/choco3.jpg", 
          caption: "Indulging in love, the sweetest treat", 
          memory: "Sweet indulgence",
          onerror: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=300&fit=crop"
        }
      ],
      interactive: {
        type: "chocolate_box",
        chocolatesOpened: 0,
        totalChocolates: 9,
        messages: [
          "You make everything in life sweeter",
          "My favorite flavor will always be you",
          "Sharing chocolate with you is sharing love",
          "You're my sweetest, most delicious addiction",
          "Life tastes infinitely better with you in it",
          "You're even sweeter than the finest chocolate",
          "My heart completely melts for you every day",
          "You're my favorite guilty pleasure, forever",
          "You will always be my ultimate sweetheart"
        ]
      },
      message: "Life with you is sweeter than the finest chocolate. Every moment shared with you feels like indulging in the most delicious treat that never ends.",
      promise: "I'll always save the last piece of chocolate for you"
    },
    {
      id: 4,
      name: "Teddy Day",
      date: "February 10",
      icon: "🧸",
      color: "#FFB6C1",
      subtitle: "Softness & Comfort",
      photos: [
        { 
          src: "images/day4/teddy1.jpg", 
          caption: "Cuddles that heal everything and make worries disappear", 
          memory: "Healing cuddles",
          onerror: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day4/teddy2.jpg", 
          caption: "Soft moments together that I'll cherish forever", 
          memory: "Cherished moments",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day4/teddy3.jpg", 
          caption: "Bear hugs that last forever and make everything right", 
          memory: "Perfect hugs",
          onerror: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop"
        }
      ],
      interactive: {
        type: "teddy_dressup",
        accessories: [
          { id: "bow", icon: "🎀", name: "Elegant Bow", collected: false, requirement: "view_photo", position: "top" },
          { id: "heart", icon: "💖", name: "Golden Heart", collected: false, requirement: "read_message", position: "right" },
          { id: "flower", icon: "🌺", name: "Flower Crown", collected: false, requirement: "complete_quiz", position: "left" }
        ],
        quizCompleted: false,
        teddyState: "plain" // plain, partial, complete
      },
      message: "Your embrace feels like home - warm, safe, and comforting. No matter what happens, being in your arms makes everything okay.",
      promise: "I'll always be your safe space to fall into"
    },
    {
      id: 5,
      name: "Promise Day",
      date: "February 11",
      icon: "🤝",
      color: "#2ecc71",
      subtitle: "Vows for Forever",
      photos: [
        { 
          src: "images/day5/promise1.jpg", 
          caption: "Promises whispered in moonlight, sealed in hearts", 
          memory: "Moonlight promises",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day5/promise2.jpg", 
          caption: "Trust built moment by moment, stronger each day", 
          memory: "Building trust",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day5/promise3.jpg", 
          caption: "Tomorrows planned together, dreams shared", 
          memory: "Shared dreams",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        }
      ],
      interactive: {
        type: "promise_tree",
        promises: [],
        promiseSuggestions: [
          "Always listen to your heart",
          "Make you laugh every single day",
          "Support every dream you have",
          "Be honest in all things, always",
          "Cherish every moment we share",
          "Grow together through all seasons",
          "Never give up on us, ever"
        ],
        treeGrowth: 0
      },
      message: "My promises to you aren't just for today - they're for every tomorrow we'll share. Each vow is a seed we plant together for our future.",
      promise: "I'll keep every promise, big and small"
    },
    {
      id: 6,
      name: "Hug Day",
      date: "February 12",
      icon: "🤗",
      color: "#FFA500",
      subtitle: "Embraces That Speak",
      photos: [
        { 
          src: "images/day6/hug1.jpg", 
          caption: "Hugs that say 'I'm here' louder than words ever could", 
          memory: "Supportive hugs",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day6/hug2.jpg", 
          caption: "Warmth in every embrace that melts away the cold", 
          memory: "Warm embraces",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day6/hug3.jpg", 
          caption: "Holding you close means holding my entire world", 
          memory: "My whole world",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        }
      ],
      interactive: {
        type: "hug_simulator",
        hugsGiven: 0,
        targetHugs: 12,
        hugTypes: ["bear", "side", "surprise"],
        warmthLevel: 0,
        lastHugType: null
      },
      message: "No words are needed when we hug - everything is said in that embrace. Your hugs heal, comfort, and remind me I'm home.",
      promise: "I'll always have hugs ready for you, anytime you need"
    },
    {
      id: 7,
      name: "Kiss Day",
      date: "February 13",
      icon: "💋",
      color: "#e74c3c",
      subtitle: "Whispers Without Words",
      photos: [
        { 
          src: "images/day7/kiss1.jpg", 
          caption: "First kisses that turned into forever memories", 
          memory: "First kiss magic",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day7/kiss2.jpg", 
          caption: "Love expressed in every gentle touch and caress", 
          memory: "Expressive touches",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        },
        { 
          src: "images/day7/kiss3.jpg", 
          caption: "Secrets shared in silence, understood in glances", 
          memory: "Silent understanding",
          onerror: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
        }
      ],
      interactive: {
        type: "kiss_collection",
        kisses: [
          { type: "romantic", icon: "🌹", name: "Romantic Kiss", unlocked: false, description: "Sweet and loving", intensity: "Romantic", requirement: "view_photos" },
          { type: "passionate", icon: "🔥", name: "Passionate Kiss", unlocked: false, description: "Deep and intense", intensity: "Passionate", requirement: "read_message" },
          { type: "playful", icon: "😘", name: "Playful Kiss", unlocked: false, description: "Fun and teasing", intensity: "Playful", requirement: "make_promise" },
          { type: "tender", icon: "💖", name: "Tender Kiss", unlocked: false, description: "Gentle and caring", intensity: "Tender", requirement: "complete_game" }
        ],
        allUnlocked: false
      },
      message: "Every kiss with you feels like the first - electric, sweet, and unforgettable. Each one tells a story words could never express.",
      promise: "I'll never stop kissing you goodnight, or good morning, or just because"
    }
  ]
};

// 1. Page 2 - Random Funny Options
function setupPage2() {
  const funnyNoBtn = document.getElementById('funny-no-btn');
  const randomOptionsDiv = document.getElementById('random-options');
  
  if (funnyNoBtn && randomOptionsDiv) {
    const funnyMessages = [
      "Are you sure? 🥺",
      "Think about it again! 💖", 
      "Pretty please? 🥰",
      "I'll wait forever for you! ⏳",
      "Try the YES button! 😊",
      "My heart says you mean YES! ❤️",
      "Let's try that again... 😉",
      "You know you want to say YES! 💕",
      "I'll be sad without you! 😢",
      "Don't break my heart! 💔",
      "Just kidding, click YES! 😂",
      "The YES button is lonely! 👉❤️"
    ];
    
    let messageIndex = 0;
    
    funnyNoBtn.onclick = function() {
      // Create floating message
      const messageDiv = document.createElement('div');
      messageDiv.className = 'funny-option';
      messageDiv.textContent = funnyMessages[messageIndex];
      messageDiv.style.animation = 'popIn 0.3s ease';
      
      // Add to container
      randomOptionsDiv.appendChild(messageDiv);
      
      // Remove after 3 seconds
      setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
          if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
          }
        }, 500);
      }, 3000);
      
      // Cycle through messages
      messageIndex = (messageIndex + 1) % funnyMessages.length;
      
      // Make button bounce
      funnyNoBtn.style.animation = 'none';
      setTimeout(() => {
        funnyNoBtn.style.animation = 'bounce 0.5s ease';
      }, 10);
    };
  }
}

// 2. Rose Day - Enhanced Game
function loadRoseGardenGameEnhanced(dayData) {
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
                 onclick="findRoseEnhanced(${i}, ${dayData.id})"
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

function findRoseEnhanced(index, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData || dayData.interactive.rosesFound > index) return;
  
  dayData.interactive.rosesFound = index + 1;
  
  // Update rose visual
  const roseElement = document.querySelector(`.rose-visual[data-index="${index}"]`);
  if (roseElement) {
    roseElement.classList.add('found');
    roseElement.textContent = '🌹';
    roseElement.style.pointerEvents = 'none';
    roseElement.style.cursor = 'default';
  }
  
  // Update counter
  document.getElementById('roses-found').textContent = dayData.interactive.rosesFound;
  
  // Show message with animation
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
  
  // Play rose sound
  playSound('rose');
  
  // If all roses found, mark day as completed
  if (dayData.interactive.rosesFound === dayData.interactive.totalRoses) {
    setTimeout(() => {
      showToast("🌹 Beautiful! You've found all the roses in our love garden!");
      setTimeout(() => {
        completeValentineDay(dayId);
      }, 1500);
    }, 1000);
  }
}

// 3. Propose Day - Enhanced with Different Copies
function loadProposalGameEnhanced(dayData) {
  const game = dayData.interactive;
  const html = `
    <div class="proposal-game">
      <h3 style="color: ${dayData.color}">Choose Your Dream Proposal</h3>
      <p>Each scenario tells a different story of how I'd ask for forever with you</p>
      
      <div class="scenarios-container">
        ${game.scenarios.map(scenario => `
          <div class="scenario-card-enhanced ${scenario.type} ${game.selectedScenario === scenario.type ? 'selected' : ''}" 
               data-type="${scenario.type}" 
               onclick="chooseProposalScenarioEnhanced('${scenario.type}', ${dayData.id})">
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

function chooseProposalScenarioEnhanced(type, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  dayData.interactive.selectedScenario = type;
  playSound('magic');
  loadProposalGameEnhanced(dayData);
}

// 4. Chocolate Day - Enhanced Visuals
function loadChocolateGameEnhanced(dayData) {
  const game = dayData.interactive;
  const percent = (game.chocolatesOpened / game.totalChocolates) * 100;
  
  const html = `
    <div class="chocolate-game">
      <h3 style="color: ${dayData.color}">Unwrap Sweet Surprises</h3>
      <p>Each chocolate holds a sweet message about our love. Click to unwrap!</p>
      
      <div class="chocolate-box-enhanced">
        <div style="text-align: center; margin-bottom: 20px;">
          <div class="ribbon" style="display: inline-block;">For My Sweetheart 💖</div>
        </div>
        
        <div class="chocolate-grid-enhanced" id="chocolate-grid">
          ${Array(game.totalChocolates).fill().map((_, i) => `
            <div class="chocolate-piece-enhanced ${game.chocolatesOpened > i ? 'opened' : ''}" 
                 data-index="${i}" 
                 onclick="unwrapChocolateEnhanced(${i}, ${dayData.id})">
              <div class="chocolate-wrapper">
                <div class="chocolate-foil">
                  ${i % 3 === 0 ? '🍫' : i % 3 === 1 ? '❤️' : '💝'}
                </div>
                <div class="chocolate-message-enhanced">
                  ${game.chocolatesOpened > i ? game.messages[i] : 'Click to unwrap!'}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div style="max-width: 600px; margin: 30px auto;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: ${dayData.color}; font-weight: bold;">
            Unwrapped: <span id="chocolates-opened">${game.chocolatesOpened}</span>/9
          </span>
          <span style="color: #FFD700; font-weight: bold;">
            Sweetness: ${Math.round(percent)}%
          </span>
        </div>
        
        <div class="sweetness-meter-enhanced">
          <div class="meter-fill-enhanced" id="sweetness-fill" style="width: ${percent}%"></div>
        </div>
        
        ${game.chocolatesOpened === game.totalChocolates ? `
          <div class="memory-unlocked" style="margin-top: 25px; background: linear-gradient(45deg, #FFD700, #FFA500);">
            <i class="fas fa-crown"></i>
            <span>All chocolates unwrapped! You're my sweetest treasure! 🍫💖</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
}

function unwrapChocolateEnhanced(index, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData || dayData.interactive.chocolatesOpened > index) return;
  
  dayData.interactive.chocolatesOpened = index + 1;
  
  // Update chocolate visual
  const chocolateElement = document.querySelector(`.chocolate-piece-enhanced[data-index="${index}"]`);
  if (chocolateElement) {
    chocolateElement.classList.add('opened');
    chocolateElement.style.pointerEvents = 'none';
    
    // Add unwrap animation
    const foil = chocolateElement.querySelector('.chocolate-foil');
    if (foil) {
      foil.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      foil.style.transform = 'translateY(-100%) rotate(20deg)';
    }
    
    // Show message
    const message = chocolateElement.querySelector('.chocolate-message-enhanced');
    if (message) {
      message.textContent = dayData.interactive.messages[index];
      message.style.animation = 'fadeIn 0.5s ease';
    }
  }
  
  // Update counter
  document.getElementById('chocolates-opened').textContent = dayData.interactive.chocolatesOpened;
  
  // Update sweetness meter
  const percent = (dayData.interactive.chocolatesOpened / dayData.interactive.totalChocolates) * 100;
  const sweetnessFill = document.getElementById('sweetness-fill');
  if (sweetnessFill) {
    sweetnessFill.style.width = `${percent}%`;
  }
  
  // Play unwrap sound
  playSound('unwrap');
  
  // Show toast message
  showToast(`🍫 ${dayData.interactive.messages[index]}`);
  
  // If all chocolates unwrapped, mark day as completed
  if (dayData.interactive.chocolatesOpened === dayData.interactive.totalChocolates) {
    setTimeout(() => {
      showToast("🎉 All chocolates unwrapped! You're my sweetest addiction!");
      setTimeout(() => {
        completeValentineDay(dayId);
      }, 2000);
    }, 1000);
  }
}

// 5. Teddy Day - Teddy Transformation
function loadTeddyGameEnhanced(dayData) {
  const game = dayData.interactive;
  const collectedCount = game.accessories.filter(a => a.collected).length;
  const allCollected = collectedCount === 3;
  
  // Determine teddy image based on collection
  let teddyImage = "images/day4/teddy-plain.jpg";
  if (allCollected) {
    teddyImage = "images/day4/teddy-complete.jpg";
  } else if (collectedCount > 0) {
    teddyImage = "images/day4/teddy-partial.jpg";
  }
  
  const html = `
    <div class="teddy-game">
      <h3 style="color: ${dayData.color}">Dress Up Our Teddy</h3>
      <p>Collect accessories to dress up our teddy! Click items below to collect them.</p>
      
      <div class="teddy-transformation-container">
        <div class="teddy-stage">
          <img src="${teddyImage}" alt="Our Teddy" class="teddy-image" 
               onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop'">
          
          <!-- Accessory overlays -->
          ${game.accessories.map(accessory => accessory.collected ? `
            <div class="accessory-overlay ${accessory.id} visible" style="color: ${dayData.color}">
              ${accessory.icon}
            </div>
          ` : '').join('')}
        </div>
        
        <div class="accessory-collection-enhanced">
          <h4 style="color: ${dayData.color}; margin-bottom: 20px;">
            Collect Accessories (${collectedCount}/3)
          </h4>
          <div>
            ${game.accessories.map(accessory => `
              <div class="accessory-item-enhanced ${accessory.collected ? 'collected' : ''}" 
                   data-item="${accessory.id}" 
                   onclick="${!accessory.collected ? `collectAccessoryEnhanced('${accessory.id}', ${dayData.id})` : ''}"
                   style="${accessory.collected ? `background: ${dayData.color}; color: white;` : ''}">
                <div class="accessory-icon-enhanced">${accessory.icon}</div>
                <h5 style="margin: 10px 0;">${accessory.name}</h5>
                <p style="font-size: 0.9rem; margin: 0;">
                  ${accessory.collected ? 
                    '✓ Collected!' : 
                    accessory.requirement === 'view_photo' ? 'View all 3 photos' :
                    accessory.requirement === 'read_message' ? 'Read the love message' :
                    'Answer the quiz below'
                  }
                </p>
              </div>
            `).join('')}
          </div>
        </div>
        
        ${collectedCount >= 2 && !game.quizCompleted ? `
          <div class="teddy-quiz" id="teddy-quiz" style="
            background: white;
            border-radius: 20px;
            padding: 25px;
            margin: 25px auto;
            max-width: 500px;
            border: 3px solid ${dayData.color};
          ">
            <h4 style="color: ${dayData.color}; margin-bottom: 20px;">
              Quick Quiz: Complete to get the final accessory!
            </h4>
            <div class="quiz-question">
              <p style="font-size: 1.2rem; margin-bottom: 15px;">What's our favorite way to spend cozy nights?</p>
              <button class="quiz-option" onclick="answerTeddyQuizEnhanced(1, ${dayData.id})" 
                      style="display: block; width: 100%; margin: 10px 0; padding: 15px;">
                Watching movies under blankets 🎬
              </button>
              <button class="quiz-option" onclick="answerTeddyQuizEnhanced(2, ${dayData.id})" 
                      style="display: block; width: 100%; margin: 10px 0; padding: 15px;">
                Talking for hours about everything 💬
              </button>
              <button class="quiz-option" onclick="answerTeddyQuizEnhanced(3, ${dayData.id})" 
                      style="display: block; width: 100%; margin: 10px 0; padding: 15px;">
                Just cuddling in comfortable silence 🤗
              </button>
            </div>
          </div>
        ` : ''}
        
        ${allCollected ? `
          <div class="memory-unlocked" style="margin-top: 25px; background: ${dayData.color};">
            <i class="fas fa-award"></i>
            <span>Teddy fully dressed! Our cuddle companion is complete! 🧸💖</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
}

function collectAccessoryEnhanced(accessoryId, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  const accessory = dayData.interactive.accessories.find(a => a.id === accessoryId);
  if (!accessory || accessory.collected) return;
  
  // Check requirement
  let requirementMet = false;
  switch(accessory.requirement) {
    case 'view_photo':
      // Assume requirement met if they're interacting
      requirementMet = true;
      break;
    case 'read_message':
      requirementMet = true;
      break;
    case 'complete_quiz':
      requirementMet = dayData.interactive.quizCompleted;
      break;
  }
  
  if (requirementMet) {
    accessory.collected = true;
    playSound('collect');
    showToast(`🎀 Collected ${accessory.name}! Our teddy looks cuter!`);
    
    // Reload game to show updated state
    setTimeout(() => {
      loadTeddyGameEnhanced(dayData);
      
      // Check if all accessories collected
      const allCollected = dayData.interactive.accessories.every(a => a.collected);
      if (allCollected) {
        setTimeout(() => {
          showToast("🎉 Teddy is fully dressed and ready for cuddles!");
          setTimeout(() => {
            completeValentineDay(dayId);
          }, 1500);
        }, 1000);
      }
    }, 500);
  } else {
    showToast(`Complete the requirement to collect ${accessory.name}!`);
  }
}

function answerTeddyQuizEnhanced(answer, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  // All answers are "correct" for this sweet quiz
  dayData.interactive.quizCompleted = true;
  playSound('correct');
  showToast("Perfect answer! You know us so well! 💖");
  
  // Reload the game to show quiz completion
  setTimeout(() => {
    loadTeddyGameEnhanced(dayData);
  }, 800);
}

// 6. Promise Day - Visual Tree
function loadPromiseGameEnhanced(dayData) {
  const game = dayData.interactive;
  const promiseCount = game.promises.length;
  const percent = Math.min((promiseCount / 7) * 100, 100);
  
  // Calculate leaf positions
  const leafPositions = [
    { top: '20%', left: '40%', rotation: '0deg' },
    { top: '15%', left: '60%', rotation: '45deg' },
    { top: '25%', left: '70%', rotation: '90deg' },
    { top: '40%', left: '75%', rotation: '135deg' },
    { top: '55%', left: '65%', rotation: '180deg' },
    { top: '60%', left: '45%', rotation: '225deg' },
    { top: '50%', left: '25%', rotation: '270deg' },
    { top: '35%', left: '20%', rotation: '315deg' }
  ];
  
  const html = `
    <div class="promise-game">
      <h3 style="color: ${dayData.color}">Grow Our Promise Tree</h3>
      <p>Each promise you add becomes a leaf on our love tree. Watch it grow!</p>
      
      <div class="promise-tree-container">
        <div class="tree-visual">
          <div class="tree-trunk-visual"></div>
          <div class="tree-canvas" id="tree-canvas">
            ${game.promises.map((promise, index) => `
              <div class="promise-leaf visible" 
                   style="
                     top: ${leafPositions[index].top};
                     left: ${leafPositions[index].left};
                     --rotation: ${leafPositions[index].rotation};
                     background: linear-gradient(135deg, ${dayData.color}40, ${dayData.color}80);
                     border-color: ${dayData.color};
                     color: ${dayData.color};
                   ">
                <span>${promise}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="promise-input-enhanced">
          <div style="display: flex; gap: 15px; align-items: center;">
            <input type="text" id="promise-input" placeholder="Type your promise here..." 
                   style="flex: 1; padding: 18px 25px; border-radius: 50px; border: 3px solid ${dayData.color}; font-size: 1.2rem;">
            <button onclick="addPromiseToTreeEnhanced(${dayData.id})" 
                    style="background: ${dayData.color}; color: white; border: none; padding: 18px 35px; border-radius: 50px; font-size: 1.2rem; cursor: pointer;">
              <i class="fas fa-leaf"></i> Add Leaf
            </button>
          </div>
        </div>
        
        <div class="promise-suggestions" style="margin: 25px 0;">
          <p style="color: ${dayData.color}; font-weight: bold; margin-bottom: 15px;">
            Need inspiration? Try these promises:
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
            ${game.promiseSuggestions.map(suggestion => `
              <button class="suggestion-btn" onclick="addSuggestedPromiseEnhanced('${suggestion}', ${dayData.id})" 
                      style="
                        background: white;
                        border: 2px solid ${dayData.color};
                        color: ${dayData.color};
                        padding: 12px 20px;
                        border-radius: 30px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 1.1rem;
                      "
                      onmouseover="this.style.background='${dayData.color}'; this.style.color='white'"
                      onmouseout="this.style.background='white'; this.style.color='${dayData.color}'">
                ${suggestion}
              </button>
            `).join('')}
          </div>
        </div>
        
        <div class="promise-counter" style="
          background: white;
          border-radius: 20px;
          padding: 25px;
          border: 3px solid ${dayData.color};
          max-width: 400px;
          margin: 30px auto;
          text-align: center;
        ">
          <div style="font-size: 1.5rem; color: ${dayData.color}; font-weight: bold; margin-bottom: 15px;">
            Promises: <span id="promise-count">${promiseCount}</span>/7
          </div>
          
          <div class="tree-progress">
            <div class="progress-ring" style="
              width: 120px;
              height: 120px;
              margin: 0 auto;
              position: relative;
            ">
              <div class="ring-fill" style="
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: conic-gradient(
                  ${dayData.color} 0% ${percent}%,
                  #eee ${percent}% 100%
                );
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 80px;
                  height: 80px;
                  background: white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 1.8rem;
                  color: ${dayData.color};
                  font-weight: bold;
                ">
                  ${Math.round(percent)}%
                </div>
              </div>
            </div>
            <p style="color: ${dayData.color}; margin-top: 15px; font-weight: bold;">
              ${promiseCount >= 7 ? '🌳 Our promise tree is fully grown! 🌳' : 'Add more promises to grow our tree!'}
            </p>
          </div>
        </div>
        
        ${promiseCount >= 7 ? `
          <button class="btn" onclick="completeValentineDay(${dayData.id})" 
                  style="background: ${dayData.color}; margin-top: 20px; padding: 20px 45px; font-size: 1.4rem;">
            <i class="fas fa-heart"></i> Seal Our Promises Forever
          </button>
        ` : ''}
      </div>
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
}

function addPromiseToTreeEnhanced(dayId) {
  const input = document.getElementById('promise-input');
  const promise = input.value.trim();
  
  if (!promise) {
    showToast("Please type a promise first!");
    input.focus();
    return;
  }
  
  if (promise.length > 50) {
    showToast("Promise is too long! Keep it short and sweet.");
    input.focus();
    return;
  }
  
  addSuggestedPromiseEnhanced(promise, dayId);
  input.value = '';
  input.focus();
}

function addSuggestedPromiseEnhanced(promise, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  // Add promise if not already there and limit to 7
  if (!dayData.interactive.promises.includes(promise) && dayData.interactive.promises.length < 7) {
    dayData.interactive.promises.push(promise);
    playSound('leaf');
    showToast(`🌿 Promise added: "${promise}"`);
    
    // Reload game to show new leaf
    loadPromiseGameEnhanced(dayData);
    
    // If we have 7 promises, offer to complete day
    if (dayData.interactive.promises.length === 7) {
      setTimeout(() => {
        showToast("🌳 Our promise tree is fully grown! Beautiful!");
      }, 500);
    }
  } else if (dayData.interactive.promises.length >= 7) {
    showToast("Our promise tree is full! You can complete the day now.");
  } else {
    showToast("That promise is already on our tree!");
  }
}

// 7. Hug Day - Enhanced Visuals
function loadHugGameEnhanced(dayData) {
  const game = dayData.interactive;
  const warmthPercent = game.warmthLevel;
  
  const html = `
    <div class="hug-game">
      <h3 style="color: ${dayData.color}">Virtual Hug Simulator</h3>
      <p>Give different types of hugs to warm my heart! Each hug adds warmth.</p>
      
      <div class="hug-simulator-enhanced">
        <div class="hug-characters-enhanced" id="hug-characters">
          <div class="hug-character you">
            YOU
            <div class="hug-arms left" style="--arm-color: ${dayData.color}; --hug-angle: -30deg;"></div>
          </div>
          
          <div class="hug-character me">
            ME
            <div class="hug-arms right" style="--arm-color: ${dayData.color}; --hug-angle: 30deg;"></div>
          </div>
        </div>
        
        <div class="hug-types-enhanced">
          <div class="hug-type-card bear" onclick="giveHugEnhanced('bear', ${dayData.id})">
            <div class="hug-type-icon">🐻</div>
            <h4 style="color: #8B4513;">Bear Hug</h4>
            <p style="color: #666; font-size: 0.9rem;">Strong, warm, and comforting</p>
            <div style="margin-top: 10px; color: #8B4513; font-weight: bold;">+3 Warmth</div>
          </div>
          
          <div class="hug-type-card side" onclick="giveHugEnhanced('side', ${dayData.id})">
            <div class="hug-type-icon">👫</div>
            <h4 style="color: #3498db;">Side Hug</h4>
            <p style="color: #666; font-size: 0.9rem;">Casual, sweet, and friendly</p>
            <div style="margin-top: 10px; color: #3498db; font-weight: bold;">+2 Warmth</div>
          </div>
          
          <div class="hug-type-card surprise" onclick="giveHugEnhanced('surprise', ${dayData.id})">
            <div class="hug-type-icon">🎁</div>
            <h4 style="color: #9b59b6;">Surprise Hug</h4>
            <p style="color: #666; font-size: 0.9rem;">Unexpected and exciting</p>
            <div style="margin-top: 10px; color: #9b59b6; font-weight: bold;">+4 Warmth</div>
          </div>
        </div>
        
        <div style="text-align: center; margin: 20px 0; color: #666; font-style: italic;">
          Click any hug type to give a virtual hug!
        </div>
      </div>
      
      <div class="hug-stats" style="max-width: 600px; margin: 30px auto;">
        <div class="hug-counter" style="
          background: white;
          border-radius: 20px;
          padding: 20px;
          border: 3px solid ${dayData.color};
          text-align: center;
          margin-bottom: 25px;
        ">
          <div style="font-size: 1.5rem; color: ${dayData.color}; font-weight: bold;">
            Hugs Given: <span id="hugs-given">${game.hugsGiven}</span>/12
          </div>
          <div style="margin-top: 10px; color: #666;">
            ${game.hugsGiven >= game.targetHugs ? '🏆 Hug Master Achieved!' : 'Keep hugging to warm my heart!'}
          </div>
        </div>
        
        <div style="margin-bottom: 25px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="color: #3498db; font-weight: bold;">Cool</span>
            <span style="color: ${dayData.color}; font-weight: bold;">Warmth: ${warmthPercent}%</span>
            <span style="color: #e74c3c; font-weight: bold;">Hot!</span>
          </div>
          
          <div class="warmth-meter-enhanced">
            <div class="warmth-fill-enhanced" id="warmth-fill" style="width: ${warmthPercent}%"></div>
          </div>
        </div>
        
        ${game.hugsGiven >= game.targetHugs ? `
          <div class="achievement" id="hug-achievement" style="
            background: linear-gradient(45deg, ${dayData.color}, #FF8C00);
            color: white;
            padding: 20px;
            border-radius: 20px;
            text-align: center;
            font-size: 1.4rem;
            font-weight: bold;
            animation: pulse 2s infinite;
          ">
            🏆 HUG MASTER! My heart is completely warm! 🏆
          </div>
          
          <button class="btn" onclick="completeValentineDay(${dayData.id})" 
                  style="background: ${dayData.color}; margin-top: 25px; width: 100%; padding: 20px;">
            <i class="fas fa-heart"></i> Seal with a Final Warm Hug
          </button>
        ` : ''}
      </div>
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
}

function giveHugEnhanced(type, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  const game = dayData.interactive;
  
  // Calculate warmth based on hug type
  let warmthIncrease = 0;
  const messages = {
    bear: { message: "🐻 A strong, comforting bear hug! So warm!", warmth: 3 },
    side: { message: "👫 A sweet, casual side hug! Lovely!", warmth: 2 },
    surprise: { message: "🎁 A surprise hug from behind! Exciting!", warmth: 4 }
  };
  
  const hugData = messages[type] || { message: "💖 A loving hug!", warmth: 2 };
  
  game.hugsGiven = Math.min(game.hugsGiven + 1, game.targetHugs);
  game.warmthLevel = Math.min(game.warmthLevel + hugData.warmth, 100);
  game.lastHugType = type;
  
  // Animate hug
  animateHugEnhanced(type);
  
  // Update UI
  const hugsGivenElement = document.getElementById('hugs-given');
  const warmthFillElement = document.getElementById('warmth-fill');
  
  if (hugsGivenElement) hugsGivenElement.textContent = game.hugsGiven;
  if (warmthFillElement) {
    warmthFillElement.style.width = `${game.warmthLevel}%`;
  }
  
  // Show hug message
  showToast(hugData.message);
  playSound('hug');
  
  // Check if target reached
  if (game.hugsGiven >= game.targetHugs) {
    setTimeout(() => {
      loadHugGameEnhanced(dayData);
      showToast("🏆 You've become a Hug Master! My heart is overflowing with warmth!");
    }, 800);
  }
}

function animateHugEnhanced(type) {
  const characters = document.getElementById('hug-characters');
  if (!characters) return;
  
  // Add hugging class for animation
  characters.classList.add('hugging');
  
  // Remove after animation
  setTimeout(() => {
    characters.classList.remove('hugging');
  }, 1000);
  
  // Specific animation based on hug type
  const hugAnimations = {
    bear: 'bounce',
    side: 'slide',
    surprise: 'pop'
  };
  
  characters.style.animation = `${hugAnimations[type] || 'pulse'} 0.5s ease`;
}

// 8. Kiss Day - 4 Kiss Types
function loadKissGameEnhanced(dayData) {
  const game = dayData.interactive;
  const collected = game.kisses.filter(k => k.unlocked).length;
  const allUnlocked = collected === game.kisses.length;
  
  const html = `
    <div class="kiss-game">
      <h3 style="color: ${dayData.color}">Collect Kiss Memories</h3>
      <p>Unlock all 4 types of kisses to complete our Valentine's collection!</p>
      
      <div class="kiss-collection-enhanced">
        ${game.kisses.map(kiss => `
          <div class="kiss-card-enhanced ${kiss.type} ${kiss.unlocked ? 'unlocked' : ''}" 
               onclick="${!kiss.unlocked ? `unlockKissEnhanced('${kiss.type}', ${dayData.id})` : ''}"
               style="cursor: ${kiss.unlocked ? 'default' : 'pointer'};">
            
            <div class="kiss-icon-large">${kiss.icon}</div>
            
            <div>
              <h4 style="color: ${kiss.unlocked ? dayData.color : '#5a3d5c'}; margin: 10px 0;">
                ${kiss.name}
              </h4>
              <p style="color: #666; margin-bottom: 15px;">${kiss.description}</p>
              
              <div class="kiss-intensity ${kiss.type}" style="
                display: inline-block;
                padding: 6px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: bold;
              ">
                ${kiss.intensity}
              </div>
            </div>
            
            <div style="margin-top: 20px;">
              ${kiss.unlocked ? `
                <div style="color: ${dayData.color}; font-weight: bold; font-size: 1.2rem;">
                  ✓ UNLOCKED
                </div>
              ` : `
                <div style="color: #888; font-size: 0.9rem;">
                  Click to unlock<br>
                  <small>(${kiss.requirement.replace(/_/g, ' ')})</small>
                </div>
              `}
            </div>
          </div>
        `).join('')}
      </div>
      
      <div style="max-width: 600px; margin: 40px auto; text-align: center;">
        <div style="
          background: white;
          border-radius: 20px;
          padding: 25px;
          border: 3px solid ${dayData.color};
          margin-bottom: 25px;
        ">
          <div style="font-size: 1.5rem; color: ${dayData.color}; font-weight: bold; margin-bottom: 10px;">
            Collection: <span id="kisses-collected">${collected}</span>/4
          </div>
          
          <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
            ${game.kisses.map((kiss, i) => `
              <div style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: ${kiss.unlocked ? dayData.color : '#eee'};
                color: ${kiss.unlocked ? 'white' : '#999'};
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                border: 2px solid ${dayData.color};
              ">
                ${kiss.unlocked ? '✓' : i + 1}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="heartbeat-visualizer" style="margin: 30px 0;">
          <div class="heartbeat-line" style="
            width: 100%;
            height: 4px;
            background: ${dayData.color}20;
            border-radius: 2px;
            position: relative;
            overflow: hidden;
          ">
            <div class="beat" style="
              position: absolute;
              width: 20px;
              height: 100%;
              background: ${dayData.color};
              border-radius: 2px;
              animation: heartbeat 1.5s infinite;
            "></div>
            <div class="beat" style="
              position: absolute;
              width: 20px;
              height: 100%;
              background: ${dayData.color};
              border-radius: 2px;
              animation: heartbeat 1.5s infinite;
              animation-delay: 0.5s;
            "></div>
            <div class="beat" style="
              position: absolute;
              width: 20px;
              height: 100%;
              background: ${dayData.color};
              border-radius: 2px;
              animation: heartbeat 1.5s infinite;
              animation-delay: 1s;
            "></div>
          </div>
          <p style="color: ${dayData.color}; margin-top: 15px; font-style: italic;">
            Our heartbeat syncs with each collected kiss 💓
          </p>
        </div>
        
        ${allUnlocked ? `
          <div class="final-unlock" id="final-unlock" style="
            background: linear-gradient(135deg, ${dayData.color}, #c0392b);
            color: white;
            border-radius: 25px;
            padding: 40px;
            margin-top: 30px;
            position: relative;
            overflow: hidden;
          ">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif') center/cover; opacity: 0.1;"></div>
            
            <div style="position: relative; z-index: 2;">
              <h3 style="font-size: 2.5rem; margin-bottom: 20px;">💖 ALL KISSES COLLECTED! 💖</h3>
              <p style="font-size: 1.3rem; line-height: 1.6; margin-bottom: 25px;">
                You've unlocked every type of kiss in our collection!<br>
                From romantic to passionate, each kiss tells our love story.
              </p>
              
              <button class="btn celebration-btn" onclick="showCompleteWeekConfirmation()" 
                      style="
                        background: white;
                        color: ${dayData.color};
                        border: none;
                        padding: 18px 45px;
                        font-size: 1.4rem;
                        font-weight: bold;
                        margin-top: 20px;
                      ">
                Complete Valentine's Week <i class="fas fa-trophy"></i>
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
  
  // Create fireworks if all unlocked
  if (allUnlocked) {
    createFireworksEnhanced();
  }
}

function unlockKissEnhanced(type, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  const kiss = dayData.interactive.kisses.find(k => k.type === type);
  if (!kiss || kiss.unlocked) return;
  
  kiss.unlocked = true;
  
  // Show unlock message
  const messages = {
    romantic: "🌹 Romantic kiss unlocked! Sweet and full of love",
    passionate: "🔥 Passionate kiss unlocked! Deep and intense",
    playful: "😘 Playful kiss unlocked! Fun and teasing", 
    tender: "💖 Tender kiss unlocked! Gentle and caring"
  };
  
  playSound('kiss');
  showToast(messages[type] || "💖 Kiss unlocked!");
  
  // Reload game to show updated state
  setTimeout(() => {
    loadKissGameEnhanced(dayData);
    
    // Check if all kisses collected
    const allUnlocked = dayData.interactive.kisses.every(k => k.unlocked);
    if (allUnlocked) {
      dayData.interactive.allUnlocked = true;
      setTimeout(() => {
        showToast("🎉 All kisses collected! Our love is complete in every way!");
      }, 1000);
    }
  }, 500);
}

function createFireworksEnhanced() {
  const container = document.querySelector('.final-unlock');
  if (!container) return;
  
  // Create multiple fireworks
  for (let i = 0; i < 15; i++) {
    const firework = document.createElement('div');
    firework.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background: ${['#e74c89', '#ff6b8b', '#ffccd5', '#9b59b6'][i % 4]};
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: fireworkExplode 1s ease-out infinite;
      animation-delay: ${i * 0.2}s;
      z-index: 1;
    `;
    container.appendChild(firework);
  }
}

// 9. Navigation Fixes
function showCompleteWeekConfirmation() {
  const modal = document.createElement('div');
  modal.className = 'confirmation-modal active';
  modal.innerHTML = `
    <div class="confirmation-content">
      <div class="confirmation-icon" style="font-size: 4rem; color: #e74c89; margin-bottom: 20px;">
        💖
      </div>
      <h2 style="color: #e74c89; margin-bottom: 15px;">Complete Valentine's Week?</h2>
      <p style="font-size: 1.2rem; line-height: 1.6; color: #5a3d5c; margin-bottom: 25px;">
        Are you ready to complete this beautiful journey through Valentine's Week?<br>
        You can always revisit any day from the Week Hub.
      </p>
      
      <div class="confirmation-buttons">
        <button class="confirmation-btn confirm" onclick="completeEntireWeek()">
          Yes, Complete Week! 🎉
        </button>
        <button class="confirmation-btn cancel" onclick="closeConfirmation()">
          Not Yet
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

function completeEntireWeek() {
  // Mark all days as completed
  valentineWeekData.days.forEach(day => {
    if (!valentineWeekData.progress.includes(day.id)) {
      valentineWeekData.progress.push(day.id);
    }
  });
  
  localStorage.setItem('valentineProgress', JSON.stringify(valentineWeekData.progress));
  
  // Close modal and go to celebration page
  closeConfirmation();
  
  // Show celebration and redirect
  setTimeout(() => {
    showToast("🎉 Valentine's Week Completed! What an amazing journey!");
    setTimeout(() => {
      goToPage(17); // Go to video page
    }, 1500);
  }, 500);
}

function closeConfirmation() {
  const modal = document.querySelector('.confirmation-modal');
  if (modal) {
    modal.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }
}

// Enhanced navigation functions
function prevValentineDayEnhanced() {
  if (valentineWeekData.currentDay > 1) {
    goToValentineDay(valentineWeekData.currentDay - 1);
  }
}

function nextValentineDayEnhanced() {
  if (valentineWeekData.currentDay < 7) {
    goToValentineDay(valentineWeekData.currentDay + 1);
  } else {
    showCompleteWeekConfirmation();
  }
}

// Update the generateDayHTML function with enhanced navigation
function generateDayHTMLEnhanced(dayData) {
  const isCompleted = valentineWeekData.progress.includes(dayData.id);
  
  return `
    <!-- Day Header -->
    <div class="day-header">
      <button class="back-to-hub" onclick="goToPage(9)">
        <i class="fas fa-calendar"></i> Back to Week Hub
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
                   onerror="this.src='${photo.onerror || 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop'}'">
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
    
    <!-- Enhanced Navigation -->
    <div class="day-navigation-enhanced">
      <button class="btn nav-btn prev-day-btn" onclick="prevValentineDayEnhanced()" 
              ${dayData.id === 1 ? 'disabled' : ''}>
        <i class="fas fa-arrow-left"></i> Day ${dayData.id - 1 || ''}
      </button>
      
      <div class="day-controls">
        <button class="sound-btn" onclick="toggleDaySound(${dayData.id})" title="Toggle sound">
          <i class="fas fa-music"></i>
        </button>
        <button class="hint-btn" onclick="showDayHintEnhanced(${dayData.id})" title="Get hint">
          <i class="fas fa-lightbulb"></i>
        </button>
        <button class="save-btn" onclick="completeValentineDay(${dayData.id})" 
                ${isCompleted ? 'disabled style="opacity:0.5"' : ''} title="Complete day">
          <i class="fas fa-bookmark"></i> Complete Day
        </button>
      </div>
      
      <button class="btn nav-btn next-day-btn ${dayData.id === 7 ? 'complete-week-btn' : ''}" 
              onclick="${dayData.id === 7 ? 'showCompleteWeekConfirmation()' : 'nextValentineDayEnhanced()'}">
        ${dayData.id === 7 ? 'Complete Week <i class="fas fa-trophy"></i>' : `Day ${dayData.id + 1} <i class="fas fa-arrow-right"></i>`}
      </button>
    </div>
  `;
}

// Enhanced hint function
function showDayHintEnhanced(dayId) {
  const hints = [
    "💡 Hint: Click all 7 roses to complete the garden!",
    "💡 Hint: Choose a proposal scenario to see my romantic response!",
    "💡 Hint: Unwrap all 9 chocolates for sweet surprises!",
    "💡 Hint: Collect all 3 accessories to dress up our teddy!",
    "💡 Hint: Add 7 promises to make our love tree bloom!",
    "💡 Hint: Give 12 hugs to become a Hug Master!",
    "💡 Hint: Unlock all 4 kiss types to complete the collection!"
  ];
  
  showToast(hints[dayId - 1] || "💡 Explore everything on this page to complete the day!");
}

// Sound effects
function playSound(type) {
  // In a real implementation, you'd play actual sounds
  console.log(`Playing ${type} sound`);
}

// Update the initializeDayGame function to use enhanced versions
function initializeDayGameEnhanced(dayData) {
  const gameArea = document.getElementById('interactive-game');
  
  switch(dayData.interactive.type) {
    case 'rose_garden':
      loadRoseGardenGameEnhanced(dayData);
      break;
    case 'proposal_scenarios':
      loadProposalGameEnhanced(dayData);
      break;
    case 'chocolate_box':
      loadChocolateGameEnhanced(dayData);
      break;
    case 'teddy_dressup':
      loadTeddyGameEnhanced(dayData);
      break;
    case 'promise_tree':
      loadPromiseGameEnhanced(dayData);
      break;
    case 'hug_simulator':
      loadHugGameEnhanced(dayData);
      break;
    case 'kiss_collection':
      loadKissGameEnhanced(dayData);
      break;
  }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Setup Page 2
  setupPage2();
  
  // Update progress display
  updateValentineProgress();
  
  // Make enhanced functions globally available
  window.goToValentineDay = goToValentineDay;
  window.prevValentineDayEnhanced = prevValentineDayEnhanced;
  window.nextValentineDayEnhanced = nextValentineDayEnhanced;
  window.completeValentineDay = completeValentineDay;
  window.findRoseEnhanced = findRoseEnhanced;
  window.chooseProposalScenarioEnhanced = chooseProposalScenarioEnhanced;
  window.unwrapChocolateEnhanced = unwrapChocolateEnhanced;
  window.collectAccessoryEnhanced = collectAccessoryEnhanced;
  window.answerTeddyQuizEnhanced = answerTeddyQuizEnhanced;
  window.addPromiseToTreeEnhanced = addPromiseToTreeEnhanced;
  window.addSuggestedPromiseEnhanced = addSuggestedPromiseEnhanced;
  window.giveHugEnhanced = giveHugEnhanced;
  window.unlockKissEnhanced = unlockKissEnhanced;
  window.viewMemory = viewMemory;
  window.toggleDaySound = toggleDaySound;
  window.showDayHintEnhanced = showDayHintEnhanced;
  window.showCompleteWeekConfirmation = showCompleteWeekConfirmation;
  window.completeEntireWeek = completeEntireWeek;
  window.closeConfirmation = closeConfirmation;
  
  // Override the original loadDay function
  const originalLoadDay = window.loadValentineDay;
  window.loadValentineDay = function(dayNumber) {
    valentineWeekData.currentDay = dayNumber;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
      page.style.display = 'none';
    });
    
    // Show valentine day container
    const dayContainer = document.getElementById('valentine-day-container');
    dayContainer.style.display = 'flex';
    dayContainer.classList.add('active');
    
    // Load the day with enhanced HTML
    const dayData = valentineWeekData.days.find(d => d.id === dayNumber);
    if (dayData) {
      // Update progress
      updateValentineProgress();
      
      // Generate enhanced day HTML
      const dayHTML = generateDayHTMLEnhanced(dayData);
      document.getElementById('day-content').innerHTML = dayHTML;
      
      // Initialize the enhanced interactive game
      setTimeout(() => {
        initializeDayGameEnhanced(dayData);
      }, 100);
      
      // Scroll to top
      window.scrollTo(0, 0);
    }
  };
});

// Add these animations to CSS if not present
const style = document.createElement('style');
style.textContent = `
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.1); opacity: 1; }
  }
  
  @keyframes fireworkExplode {
    0% { transform: scale(0); opacity: 1; }
    50% { opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  .hugging .hug-character {
    animation: hugPulse 0.5s ease;
  }
  
  @keyframes hugPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;
document.head.appendChild(style);
