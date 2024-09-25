// 各画面の取得
const homeScreen = document.getElementById('homeScreen');
const lotteryScreen = document.getElementById('lotteryScreen');
const resultScreen = document.getElementById('resultScreen');

// ボタンや画像の取得
const startButton = document.getElementById('startButton');
const lotteryContainer = document.getElementById('lotteryContainer');
const resultImage = document.getElementById('resultImage');
const resultText = document.getElementById('resultText');
const backButton = document.getElementById('backButton');

// 結果画像のパス
const resultImages = {
    'A': 'results/a.png',
    'B': 'results/b.png',
    'C': 'results/c.png',
    'D': 'results/d.png',
    'E': 'results/e.png',
    'F': 'results/f.png',
    'G': 'results/g.png'
};

// 結果確率の範囲
const lotteryResults = [
    { letter: 'A', probability: 3 },
    { letter: 'B', probability: 6 },
    { letter: 'C', probability: 11 },
    { letter: 'D', probability: 15 },
    { letter: 'E', probability: 20 },
    { letter: 'F', probability: 25 },
    { letter: 'G', probability: 30 }
];

// ホーム画面からクジ画面に移動
startButton.addEventListener('click', function() {
    homeScreen.style.display = 'none';
    lotteryScreen.style.display = 'flex';
    displayLotteryOptions(); // クジを表示
});

// クジをクリックして抽選を行う
function displayLotteryOptions() {
    // クジ画像を10個生成
    for (let i = 0; i < 10; i++) {
        const lotteryItem = document.createElement('img');
        lotteryItem.src = 'unopened.png';
        lotteryItem.alt = 'クジ';
        lotteryItem.classList.add('lottery-image');

        // クジがクリックされたら抽選
        lotteryItem.addEventListener('click', function() {
            const result = drawLottery();
            showResult(result);
        });

        // クジをコンテナに追加
        lotteryContainer.appendChild(lotteryItem);
    }
}

// 抽選の実行
function drawLottery() {
    let random = Math.random() * 100;
    let cumulativeProbability = 0;
    
    for (let result of lotteryResults) {
        cumulativeProbability += result.probability;
        if (random < cumulativeProbability) {
            return result.letter;
        }
    }
    return 'G';  // 万が一、範囲外の値が出た場合はG賞を返す
}

// 結果画面を表示
function showResult(result) {
    lotteryScreen.style.display = 'none';
    resultScreen.style.display = 'flex';
    
    resultImage.src = resultImages[result];
    resultText.textContent = `${result}賞が当たりました！`;
}

// 結果画面からホームに戻る
backButton.addEventListener('click', function() {
    resultScreen.style.display = 'none';
    homeScreen.style.display = 'flex';
    lotteryContainer.innerHTML = '';  // クジ画像をクリア
});
