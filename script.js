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
/* VALENTINE'S WEEK JAVASCRIPT - ADD TO END   */
/* =========================================== */

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
          onerror: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w-400&h=300&fit=crop"
        }
      ],
      interactive: {
        type: "rose_garden",
        rosesFound: 0,
        totalRoses: 7,
        roseMessages: [
          "You make my heart bloom",
          "Every day with you is beautiful",
          "Your smile is my sunshine",
          "I love watching our love grow",
          "You're more precious than any rose",
          "My love for you has no thorns",
          "Forever blooming with you"
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
          { type: "romantic", icon: "🌅", title: "Romantic Sunset", description: "Beach, candles, and forever promises" },
          { type: "funny", icon: "😂", title: "Funny & Us", description: "Laughter, inside jokes, and happiness" },
          { type: "surprise", icon: "🎉", title: "Surprise Adventure", description: "Unexpected moments, lifelong memories" }
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
          "You make everything sweeter",
          "My favorite flavor is you",
          "Sharing chocolate, sharing love",
          "You're my sweetest addiction",
          "Life is sweeter with you",
          "You're better than chocolate",
          "My heart melts for you",
          "You're my guilty pleasure",
          "Forever my sweetheart"
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
          { id: "bow", icon: "🎀", name: "Elegant Bow", collected: false, requirement: "view_photo" },
          { id: "heart", icon: "💖", name: "Golden Heart", collected: false, requirement: "read_message" },
          { id: "flower", icon: "🌺", name: "Flower Crown", collected: false, requirement: "complete_quiz" }
        ],
        quizCompleted: false
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
          "Always listen to you",
          "Make you laugh every day",
          "Support your dreams",
          "Be honest always",
          "Cherish every moment",
          "Grow together",
          "Never give up on us"
        ]
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
        warmthLevel: 0
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
          { type: "forehead", icon: "💋", name: "Forehead Kiss", unlocked: false, description: "Gentle and protective" },
          { type: "cheek", icon: "😘", name: "Cheek Kiss", unlocked: false, description: "Sweet and affectionate" },
          { type: "lips", icon: "❤️", name: "Lip Kiss", unlocked: false, description: "Passionate and loving" }
        ],
        allUnlocked: false
      },
      message: "Every kiss with you feels like the first - electric, sweet, and unforgettable. Each one tells a story words could never express.",
      promise: "I'll never stop kissing you goodnight, or good morning, or just because"
    }
  ]
};

// Valentine Week Functions
function goToValentineDay(dayNumber) {
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
  
  // Load the day
  loadValentineDay(dayNumber);
}

function loadValentineDay(dayNumber) {
  const dayData = valentineWeekData.days.find(d => d.id === dayNumber);
  if (!dayData) return;
  
  // Update progress
  updateValentineProgress();
  
  // Generate day HTML
  const dayHTML = generateDayHTML(dayData);
  document.getElementById('day-content').innerHTML = dayHTML;
  
  // Initialize the interactive game
  setTimeout(() => {
    initializeDayGame(dayData);
  }, 100);
  
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
            i < dayData.id ? '●' : '○'
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
          <span>Day completed! Memory unlocked in your heart</span>
        </div>
      ` : ''}
    </div>
    
    <!-- Navigation -->
    <div class="day-navigation">
      <button class="btn prev-day-btn" onclick="prevValentineDay()" ${dayData.id === 1 ? 'disabled style="opacity:0.5"' : ''}>
        <i class="fas fa-arrow-left"></i> Previous Day
      </button>
      
      <div class="day-controls">
        <button class="sound-btn" onclick="toggleDaySound(${dayData.id})">
          <i class="fas fa-music"></i>
        </button>
        <button class="hint-btn" onclick="showDayHint(${dayData.id})">
          <i class="fas fa-lightbulb"></i>
        </button>
        <button class="save-btn" onclick="completeValentineDay(${dayData.id})">
          <i class="fas fa-bookmark"></i> Complete Day
        </button>
      </div>
      
      <button class="btn next-day-btn" onclick="nextValentineDay()" ${dayData.id === 7 ? 'onclick="goToPage(17)"' : ''}>
        ${dayData.id === 7 ? 'Complete Week <i class="fas fa-trophy"></i>' : 'Next Day <i class="fas fa-arrow-right"></i>'}
      </button>
    </div>
  `;
}

function initializeDayGame(dayData) {
  const gameArea = document.getElementById('interactive-game');
  
  switch(dayData.interactive.type) {
    case 'rose_garden':
      loadRoseGardenGame(dayData);
      break;
    case 'proposal_scenarios':
      loadProposalGame(dayData);
      break;
    case 'chocolate_box':
      loadChocolateGame(dayData);
      break;
    case 'teddy_dressup':
      loadTeddyGame(dayData);
      break;
    case 'promise_tree':
      loadPromiseGame(dayData);
      break;
    case 'hug_simulator':
      loadHugGame(dayData);
      break;
    case 'kiss_collection':
      loadKissGame(dayData);
      break;
  }
}

// Day 1: Rose Garden Game
function loadRoseGardenGame(dayData) {
  const game = dayData.interactive;
  const html = `
    <div class="rose-garden-game">
      <h3 style="color: ${dayData.color}">Find the 7 Hidden Roses</h3>
      <p>Each rose holds a sweet message about us. Click to find them!</p>
      
      <div class="garden-container">
        <div class="rose-counter" style="border-color: ${dayData.color}">
          Roses Found: <span id="roses-found">${game.rosesFound}</span>/7
        </div>
        
        <div class="garden-area" id="garden-area">
          ${Array(game.totalRoses).fill().map((_, i) => `
            <div class="hidden-rose ${game.rosesFound > i ? 'found' : ''}" 
                 data-index="${i}" 
                 onclick="findRose(${i}, ${dayData.id})">
              <div class="rose-bud"></div>
            </div>
          `).join('')}
        </div>
        
        <div class="rose-messages" id="rose-messages">
          ${game.rosesFound > 0 ? 
            `<p>"${game.roseMessages[game.rosesFound - 1]}"</p>` : 
            '<p>Click a rose to reveal a sweet message!</p>'
          }
        </div>
      </div>
      
      <div class="garden-progress">
        <div class="rose-bush">
          <div class="bush-fill" style="width: ${(game.rosesFound / game.totalRoses) * 100}%"></div>
        </div>
        <p>Garden blooms as you find roses! ${game.rosesFound === game.totalRoses ? '🌹 Garden Complete!' : ''}</p>
      </div>
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
}

function findRose(index, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData || dayData.interactive.rosesFound > index) return;
  
  dayData.interactive.rosesFound = index + 1;
  
  // Update UI
  const roseElement = document.querySelector(`.hidden-rose[data-index="${index}"]`);
  if (roseElement) {
    roseElement.classList.add('found');
    roseElement.style.pointerEvents = 'none';
  }
  
  // Update counter
  document.getElementById('roses-found').textContent = dayData.interactive.rosesFound;
  
  // Show message
  const messageElement = document.getElementById('rose-messages');
  if (messageElement) {
    messageElement.innerHTML = `<p>"${dayData.interactive.roseMessages[index]}"</p>`;
    messageElement.style.animation = 'fadeIn 0.5s ease';
  }
  
  // Update progress bar
  const bushFill = document.querySelector('.bush-fill');
  if (bushFill) {
    bushFill.style.width = `${(dayData.interactive.rosesFound / dayData.interactive.totalRoses) * 100}%`;
  }
  
  // If all roses found, mark day as completed
  if (dayData.interactive.rosesFound === dayData.interactive.totalRoses) {
    setTimeout(() => {
      completeValentineDay(dayId);
    }, 1000);
  }
}

// Day 2: Proposal Scenarios
function loadProposalGame(dayData) {
  const game = dayData.interactive;
  const html = `
    <div class="proposal-game">
      <h3 style="color: ${dayData.color}">How Would You Like Me To Propose?</h3>
      <p>Choose a scenario to explore our imaginary proposals!</p>
      
      <div class="scenarios-container">
        ${game.scenarios.map(scenario => `
          <div class="scenario-card ${game.selectedScenario === scenario.type ? 'selected' : ''}" 
               data-type="${scenario.type}" 
               onclick="chooseProposalScenario('${scenario.type}', ${dayData.id})">
            <div class="scenario-icon">${scenario.icon}</div>
            <h4>${scenario.title}</h4>
            <p>${scenario.description}</p>
          </div>
        `).join('')}
      </div>
      
      ${game.selectedScenario ? `
        <div class="scenario-result" id="scenario-result">
          <h4>If I proposed ${game.selectedScenario === 'romantic' ? 'romantically' : game.selectedScenario === 'funny' ? 'in our funny way' : 'with a surprise'}:</h4>
          <p>I would make sure it's perfect for you, because you deserve nothing less than magical moments that take your breath away.</p>
          <p><strong>But the truth is...</strong> I want to propose to you every day, in every way, because every moment with you feels like a "yes" to forever.</p>
          
          ${!valentineWeekData.progress.includes(dayData.id) ? `
            <button class="btn" onclick="completeValentineDay(${dayData.id})" style="background: ${dayData.color}">
              <i class="fas fa-heart"></i> Accept All My Proposals
            </button>
          ` : ''}
        </div>
      ` : ''}
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

// Day 3: Chocolate Box
function loadChocolateGame(dayData) {
  const game = dayData.interactive;
  const html = `
    <div class="chocolate-game">
      <h3 style="color: ${dayData.color}">Unwrap Sweet Surprises</h3>
      <p>Click chocolates to reveal sweet messages about us!</p>
      
      <div class="chocolate-box">
        <div class="box-lid">
          <div class="ribbon">For My Sweetheart</div>
        </div>
        
        <div class="chocolate-grid" id="chocolate-grid">
          ${Array(game.totalChocolates).fill().map((_, i) => `
            <div class="chocolate-piece ${game.chocolatesOpened > i ? 'opened' : ''}" 
                 data-index="${i}" 
                 onclick="unwrapChocolate(${i}, ${dayData.id})">
              <div class="wrapper">
                <div class="chocolate-top"></div>
                <div class="chocolate-message">
                  <p>${game.messages[i]}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="chocolate-counter">
        Unwrapped: <span id="chocolates-opened">${game.chocolatesOpened}</span>/9
        <div class="sweetness-meter">
          <div class="meter-fill" id="sweetness-fill" style="width: ${(game.chocolatesOpened / game.totalChocolates) * 100}%"></div>
        </div>
      </div>
      
      ${game.chocolatesOpened === game.totalChocolates ? `
        <div class="memory-unlocked" style="margin-top: 20px;">
          <i class="fas fa-crown"></i>
          <span>All chocolates unwrapped! You're my sweetest treasure!</span>
        </div>
      ` : ''}
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
}

function unwrapChocolate(index, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData || dayData.interactive.chocolatesOpened > index) return;
  
  dayData.interactive.chocolatesOpened = index + 1;
  
  // Update UI
  const chocolateElement = document.querySelector(`.chocolate-piece[data-index="${index}"]`);
  if (chocolateElement) {
    chocolateElement.classList.add('opened');
    chocolateElement.style.pointerEvents = 'none';
    
    // Show message with animation
    const messageElement = chocolateElement.querySelector('.chocolate-message');
    if (messageElement) {
      messageElement.style.display = 'flex';
      messageElement.style.animation = 'fadeIn 0.5s ease';
    }
  }
  
  // Update counter
  document.getElementById('chocolates-opened').textContent = dayData.interactive.chocolatesOpened;
  
  // Update sweetness meter
  const sweetnessFill = document.getElementById('sweetness-fill');
  if (sweetnessFill) {
    sweetnessFill.style.width = `${(dayData.interactive.chocolatesOpened / dayData.interactive.totalChocolates) * 100}%`;
  }
  
  // If all chocolates unwrapped, mark day as completed
  if (dayData.interactive.chocolatesOpened === dayData.interactive.totalChocolates) {
    setTimeout(() => {
      completeValentineDay(dayId);
    }, 1500);
  }
}

// Day 4: Teddy Dress-Up
function loadTeddyGame(dayData) {
  const game = dayData.interactive;
  const collectedCount = game.accessories.filter(a => a.collected).length;
  
  const html = `
    <div class="teddy-game">
      <h3 style="color: ${dayData.color}">Dress Up Our Teddy</h3>
      <p>Collect accessories by exploring our memories!</p>
      
      <div class="teddy-workspace">
        <div class="teddy-base">
          <div class="teddy-body" id="teddy-body">
            <!-- Teddy base -->
            <div class="teddy" style="font-size: 5rem; margin: 20px 0;">🧸</div>
            
            <!-- Accessories on teddy -->
            ${game.accessories.filter(a => a.collected).map(accessory => `
              <div class="teddy-accessory" style="color: ${dayData.color}; font-size: 2rem; margin: 10px;">
                ${accessory.icon}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="accessory-collection">
          <h4>Collect Accessories (${collectedCount}/3):</h4>
          <div class="accessory-list">
            ${game.accessories.map(accessory => `
              <div class="accessory-item ${accessory.collected ? 'collected' : ''}" 
                   data-item="${accessory.id}" 
                   onclick="${!accessory.collected ? `collectAccessory('${accessory.id}', ${dayData.id})` : ''}">
                <div class="accessory-icon">${accessory.icon}</div>
                <h5>${accessory.name}</h5>
                <p>${accessory.collected ? '✓ Collected!' : 
                    accessory.requirement === 'view_photo' ? 'View all photos to collect' :
                    accessory.requirement === 'read_message' ? 'Read the love message' :
                    'Complete the quiz to collect'}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      ${!game.quizCompleted && collectedCount >= 2 ? `
        <div class="teddy-quiz" id="teddy-quiz">
          <h4>Quick Quiz: How well do you know us?</h4>
          <div class="quiz-question">
            <p>What's our favorite way to cuddle?</p>
            <button class="quiz-option" onclick="answerTeddyQuiz(1, ${dayData.id})">Spooning while sleeping</button>
            <button class="quiz-option" onclick="answerTeddyQuiz(2, ${dayData.id})">Face to face talking</button>
            <button class="quiz-option" onclick="answerTeddyQuiz(3, ${dayData.id})">Head on chest listening to heartbeat</button>
          </div>
        </div>
      ` : ''}
      
      ${collectedCount === 3 ? `
        <div class="memory-unlocked" style="margin-top: 20px;">
          <i class="fas fa-award"></i>
          <span>Teddy fully dressed! Our cuddles are complete! 🧸💖</span>
        </div>
      ` : ''}
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
}

function collectAccessory(accessoryId, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  const accessory = dayData.interactive.accessories.find(a => a.id === accessoryId);
  if (!accessory || accessory.collected) return;
  
  // Check requirement
  let canCollect = false;
  switch(accessory.requirement) {
    case 'view_photo':
      // Assume user viewed photos if they're interacting
      canCollect = true;
      break;
    case 'read_message':
      canCollect = true;
      break;
    case 'complete_quiz':
      canCollect = dayData.interactive.quizCompleted;
      break;
  }
  
  if (canCollect) {
    accessory.collected = true;
    loadTeddyGame(dayData);
    
    // Check if all accessories collected
    const allCollected = dayData.interactive.accessories.every(a => a.collected);
    if (allCollected) {
      setTimeout(() => {
        completeValentineDay(dayId);
      }, 1000);
    }
  } else {
    showToast(`Complete the requirement to collect this accessory!`);
  }
}

function answerTeddyQuiz(answer, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  // All answers are "correct" for this sweet quiz
  dayData.interactive.quizCompleted = true;
  showToast("Perfect answer! You know us so well! 💖");
  
  // Reload the game to show quiz completion
  setTimeout(() => {
    loadTeddyGame(dayData);
  }, 500);
}

// Day 5: Promise Tree
function loadPromiseGame(dayData) {
  const game = dayData.interactive;
  const promiseCount = game.promises.length;
  
  const html = `
    <div class="promise-game">
      <h3 style="color: ${dayData.color}">Grow Our Promise Tree</h3>
      <p>Add promises to make our love tree bloom! Each promise is a leaf.</p>
      
      <div class="tree-container">
        <div class="tree-base" id="tree-base">
          <!-- Tree trunk -->
          <div class="tree-trunk" style="background: ${dayData.color}"></div>
          
          <!-- Tree leaves (promises) -->
          <div class="tree-leaves" id="tree-leaves">
            ${game.promises.map((promise, index) => `
              <div class="tree-leaf" style="
                transform: rotate(${index * 15}deg);
                animation-delay: ${index * 0.1}s;
                background: ${dayData.color}40;
                border-color: ${dayData.color};
              ">
                <span>${promise}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="promise-input">
          <input type="text" id="promise-input" placeholder="Type your promise here...">
          <button onclick="addPromiseToTree(${dayData.id})" style="background: ${dayData.color}">
            <i class="fas fa-leaf"></i> Add Leaf
          </button>
        </div>
        
        <div class="promise-suggestions">
          <p>Need inspiration? Try these:</p>
          <div class="suggestion-buttons">
            ${game.promiseSuggestions.map(suggestion => `
              <button class="suggestion-btn" onclick="addSuggestedPromise('${suggestion}', ${dayData.id})" 
                      style="border-color: ${dayData.color}; color: ${dayData.color}">
                ${suggestion}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      
      <div class="promise-counter" style="border-color: ${dayData.color}">
        Promises: <span id="promise-count">${promiseCount}</span>
        <div class="tree-progress">
          <div class="progress-ring">
            <div class="ring-fill" id="ring-fill" style="
              background: conic-gradient(${dayData.color} 0% ${(promiseCount / 7) * 100}%, #eee ${(promiseCount / 7) * 100}% 100%);
            "></div>
          </div>
          <p>${promiseCount >= 7 ? '🌳 Tree fully bloomed!' : 'Add more promises to grow!'}</p>
        </div>
      </div>
      
      ${promiseCount >= 7 ? `
        <button class="btn" onclick="completeValentineDay(${dayData.id})" style="background: ${dayData.color}; margin-top: 20px;">
          <i class="fas fa-heart"></i> Seal Our Promises
        </button>
      ` : ''}
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
  
  // Add leaf animations
  setTimeout(() => {
    document.querySelectorAll('.tree-leaf').forEach(leaf => {
      leaf.style.opacity = '1';
      leaf.style.transform += ' scale(1)';
    });
  }, 100);
}

function addPromiseToTree(dayId) {
  const input = document.getElementById('promise-input');
  const promise = input.value.trim();
  
  if (!promise) {
    showToast("Please type a promise first!");
    input.focus();
    return;
  }
  
  addSuggestedPromise(promise, dayId);
  input.value = '';
  input.focus();
}

function addSuggestedPromise(promise, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  // Add promise if not already there
  if (!dayData.interactive.promises.includes(promise)) {
    dayData.interactive.promises.push(promise);
    showToast(`Promise added: "${promise}"`);
    loadPromiseGame(dayData);
    
    // If we have enough promises, offer to complete day
    if (dayData.interactive.promises.length >= 7) {
      setTimeout(() => {
        showToast("Our promise tree is fully grown! 🌳");
      }, 500);
    }
  } else {
    showToast("That promise is already on our tree!");
  }
}

// Day 6: Hug Simulator
function loadHugGame(dayData) {
  const game = dayData.interactive;
  const warmthPercent = (game.warmthLevel / 100) * 100;
  
  const html = `
    <div class="hug-game">
      <h3 style="color: ${dayData.color}">Virtual Hug Simulator</h3>
      <p>Give hugs to fill our warmth meter! Hold for extra love!</p>
      
      <div class="hug-simulator">
        <div class="hug-characters">
          <div class="character you">
            <div class="avatar" style="background: ${dayData.color}">You</div>
            <div class="arms" id="your-arms"></div>
          </div>
          
          <div class="character me">
            <div class="avatar" style="background: ${dayData.color}">Me</div>
            <div class="arms" id="my-arms"></div>
          </div>
        </div>
        
        <div class="hug-controls">
          <div class="hug-types">
            <button class="hug-type-btn" data-type="bear" onclick="giveHug('bear', ${dayData.id})">
              <div class="hug-icon">🐻</div>
              Bear Hug
            </button>
            <button class="hug-type-btn" data-type="side" onclick="giveHug('side', ${dayData.id})">
              <div class="hug-icon">👫</div>
              Side Hug
            </button>
            <button class="hug-type-btn" data-type="surprise" onclick="giveHug('surprise', ${dayData.id})">
              <div class="hug-icon">🎁</div>
              Surprise Hug
            </button>
          </div>
          
          <div class="hug-timer" id="hug-timer">
            Hold hug for <span id="timer-count">3</span>s for extra warmth!
          </div>
        </div>
      </div>
      
      <div class="hug-stats">
        <div class="hug-counter" style="border-color: ${dayData.color}">
          Hugs Given: <span id="hugs-given">${game.hugsGiven}</span>/12
        </div>
        
        <div class="warmth-meter">
          <div class="warmth-fill" id="warmth-fill" style="width: ${warmthPercent}%; background: ${dayData.color}"></div>
          <div class="meter-labels">
            <span>Cool</span>
            <span>Warm</span>
            <span style="color: ${dayData.color}">Hot!</span>
          </div>
        </div>
        
        ${game.hugsGiven >= game.targetHugs ? `
          <div class="achievement" id="hug-achievement" style="background: ${dayData.color}">
            🏆 Hug Master Unlocked! You've warmed my heart completely!
          </div>
        ` : ''}
      </div>
      
      ${game.hugsGiven >= game.targetHugs ? `
        <button class="btn" onclick="completeValentineDay(${dayData.id})" style="background: ${dayData.color}; margin-top: 20px;">
          <i class="fas fa-heart"></i> Seal with a Warm Hug
        </button>
      ` : ''}
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
  
  // Animate arms if hugging
  if (game.hugsGiven > 0) {
    animateHug();
  }
}

function giveHug(type, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  const game = dayData.interactive;
  game.hugsGiven = Math.min(game.hugsGiven + 1, game.targetHugs);
  game.warmthLevel = Math.min(game.warmthLevel + 10, 100);
  
  // Animate hug
  animateHug();
  
  // Update UI
  const hugsGivenElement = document.getElementById('hugs-given');
  const warmthFillElement = document.getElementById('warmth-fill');
  
  if (hugsGivenElement) hugsGivenElement.textContent = game.hugsGiven;
  if (warmthFillElement) {
    warmthFillElement.style.width = `${game.warmthLevel}%`;
  }
  
  // Show hug message
  const messages = {
    bear: "🐻 A strong, comforting bear hug!",
    side: "👫 A sweet, casual side hug!",
    surprise: "🎁 A surprise hug from behind!"
  };
  showToast(messages[type] || "💖 A loving hug!");
  
  // Check if target reached
  if (game.hugsGiven >= game.targetHugs) {
    setTimeout(() => {
      loadHugGame(dayData);
      showToast("🏆 You've become a Hug Master! My heart is so warm!");
    }, 500);
  }
}

function animateHug() {
  const yourArms = document.getElementById('your-arms');
  const myArms = document.getElementById('my-arms');
  
  if (yourArms && myArms) {
    yourArms.style.animation = 'hugAnimation 0.5s ease';
    myArms.style.animation = 'hugAnimation 0.5s ease';
    
    setTimeout(() => {
      yourArms.style.animation = '';
      myArms.style.animation = '';
    }, 500);
  }
}

// Day 7: Kiss Collection
function loadKissGame(dayData) {
  const game = dayData.interactive;
  const collected = game.kisses.filter(k => k.unlocked).length;
  
  const html = `
    <div class="kiss-game">
      <h3 style="color: ${dayData.color}">Collect Kiss Memories</h3>
      <p>Complete all kiss types to unlock our special Valentine's memory!</p>
      
      <div class="kiss-collection">
        ${game.kisses.map(kiss => `
          <div class="kiss-card ${kiss.unlocked ? 'unlocked' : ''}" 
               style="border-color: ${kiss.unlocked ? dayData.color : '#ddd'}"
               onclick="${!kiss.unlocked ? `unlockKiss('${kiss.type}', ${dayData.id})` : ''}">
            <div class="kiss-icon">${kiss.icon}</div>
            <h4>${kiss.name}</h4>
            <p>${kiss.description}</p>
            <div class="kiss-status">
              ${kiss.unlocked ? '✓ Unlocked' : '🔒 Locked'}
            </div>
            ${!kiss.unlocked ? `
              <button class="unlock-btn" style="background: ${dayData.color}">
                Click to unlock
              </button>
            ` : ''}
          </div>
        `).join('')}
      </div>
      
      <div class="kiss-progress">
        <div class="collection-progress" style="border-color: ${dayData.color}">
          Collected: <span id="kisses-collected">${collected}</span>/3
        </div>
        
        <div class="heartbeat-visualizer">
          <div class="heartbeat-line">
            <div class="beat" style="animation-delay: 0s; background: ${dayData.color}"></div>
            <div class="beat" style="animation-delay: 0.5s; background: ${dayData.color}"></div>
            <div class="beat" style="animation-delay: 1s; background: ${dayData.color}"></div>
          </div>
          <p>Our heartbeat syncs with each collected kiss 💓</p>
        </div>
      </div>
      
      ${collected === 3 ? `
        <div class="final-unlock" id="final-unlock">
          <div class="fireworks-container" id="fireworks"></div>
          <h3>💖 All Kisses Collected! 💖</h3>
          <p>You've unlocked the complete collection of our loving kisses!</p>
          <p>Every kiss with you tells a story of love, passion, and forever.</p>
          
          <button class="btn celebration-btn" onclick="completeValentineDay(${dayData.id})" 
                  style="background: ${dayData.color}; margin-top: 20px;">
            Complete Valentine's Week <i class="fas fa-trophy"></i>
          </button>
        </div>
      ` : ''}
    </div>
  `;
  
  document.getElementById('interactive-game').innerHTML = html;
  
  // Add fireworks if all collected
  if (collected === 3) {
    createFireworks();
  }
}

function unlockKiss(type, dayId) {
  const dayData = valentineWeekData.days.find(d => d.id === dayId);
  if (!dayData) return;
  
  const kiss = dayData.interactive.kisses.find(k => k.type === type);
  if (!kiss || kiss.unlocked) return;
  
  kiss.unlocked = true;
  
  // Show unlock message
  const messages = {
    forehead: "💋 A gentle forehead kiss - protective and loving",
    cheek: "😘 A sweet cheek kiss - affectionate and tender", 
    lips: "❤️ A passionate lip kiss - deep and meaningful"
  };
  showToast(messages[type] || "💖 Kiss unlocked!");
  
  // Reload game to show updated state
  loadKissGame(dayData);
  
  // Check if all kisses collected
  const allUnlocked = dayData.interactive.kisses.every(k => k.unlocked);
  if (allUnlocked) {
    dayData.interactive.allUnlocked = true;
    setTimeout(() => {
      showToast("🎉 All kisses collected! Our love is complete!");
    }, 1000);
  }
}

function createFireworks() {
  const container = document.getElementById('fireworks');
  if (!container) return;
  
  container.innerHTML = '';
  
  for (let i = 0; i < 20; i++) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.cssText = `
      position: absolute;
      width: 5px;
      height: 5px;
      background: ${['#e74c89', '#ff6b8b', '#ffccd5', '#9b59b6'][i % 4]};
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: fireworkExplode 1s ease-out infinite;
      animation-delay: ${i * 0.1}s;
    `;
    container.appendChild(firework);
  }
}

// Helper Functions
function prevValentineDay() {
  if (valentineWeekData.currentDay > 1) {
    goToValentineDay(valentineWeekData.currentDay - 1);
  }
}

function nextValentineDay() {
  if (valentineWeekData.currentDay < 7) {
    goToValentineDay(valentineWeekData.currentDay + 1);
  }
}

function completeValentineDay(dayId) {
  if (!valentineWeekData.progress.includes(dayId)) {
    valentineWeekData.progress.push(dayId);
    localStorage.setItem('valentineProgress', JSON.stringify(valentineWeekData.progress));
    
    // Update UI
    updateValentineProgress();
    
    // Show celebration
    showToast(`🎉 Day ${dayId} completed! Memory saved in your heart!`);
    
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
    "💡 Hint: Click all interactive elements to unlock everything!",
    "💡 Hint: Don't forget to view all photos for special unlocks!",
    "💡 Hint: Complete the games to mark the day as finished!",
    "💡 Hint: Your progress is saved automatically!",
    "💡 Hint: You can return to any day from the week hub!",
    "💡 Hint: Try different interactions for surprises!",
    "💡 Hint: The more you explore, the more you unlock!"
  ];
  showToast(hints[dayId - 1] || "💡 Explore everything on this page!");
}

// Initialize Valentine Week on page load
document.addEventListener('DOMContentLoaded', function() {
  // Update progress display
  updateValentineProgress();
  
  // Make functions globally available
  window.goToValentineDay = goToValentineDay;
  window.prevValentineDay = prevValentineDay;
  window.nextValentineDay = nextValentineDay;
  window.completeValentineDay = completeValentineDay;
  window.findRose = findRose;
  window.chooseProposalScenario = chooseProposalScenario;
  window.unwrapChocolate = unwrapChocolate;
  window.collectAccessory = collectAccessory;
  window.answerTeddyQuiz = answerTeddyQuiz;
  window.addPromiseToTree = addPromiseToTree;
  window.addSuggestedPromise = addSuggestedPromise;
  window.giveHug = giveHug;
  window.unlockKiss = unlockKiss;
  window.viewMemory = viewMemory;
  window.toggleDaySound = toggleDaySound;
  window.showDayHint = showDayHint;
});

// Add animation for hug
if (!document.querySelector('#hugAnimation')) {
  const style = document.createElement('style');
  style.id = 'hugAnimation';
  style.textContent = `
    @keyframes hugAnimation {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    @keyframes fireworkExplode {
      0% { transform: scale(0); opacity: 1; }
      50% { opacity: 1; }
      100% { transform: scale(2); opacity: 0; }
    }
    
    .tree-leaf {
      position: absolute;
      width: 80px;
      height: 80px;
      background: rgba(46, 204, 113, 0.2);
      border: 2px solid #2ecc71;
      border-radius: 50% 0 50% 0;
      transform: scale(0);
      opacity: 0;
      transition: all 0.5s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      text-align: center;
      padding: 10px;
      color: #27ae60;
    }
    
    .accessory-item {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 15px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .accessory-item:hover {
      transform: translateY(-5px);
      border-color: #e74c89;
    }
    
    .accessory-item.collected {
      background: #fff9fa;
      border-color: #e74c89;
    }
    
    .accessory-icon {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    
    .quiz-option {
      background: #f8f9fa;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      padding: 15px;
      margin: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .quiz-option:hover {
      background: #e74c89;
      color: white;
      border-color: #e74c89;
    }
    
    .fireworks-container {
      position: relative;
      width: 100%;
      height: 100px;
      overflow: hidden;
      margin: 20px 0;
    }
  `;
  document.head.appendChild(style);
}
