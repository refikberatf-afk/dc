let players = [];

// Oyuncu ekleme fonksiyonu
function addPlayer() {
    const input = document.getElementById('player-input');
    const name = input.value.trim();

    if (name && !players.includes(name)) {
        players.push(name);
        input.value = '';
        updatePlayerList();
    }
}

// Oyuncu listesini ekranda güncelleme
function updatePlayerList() {
    const list = document.getElementById('player-list');
    list.innerHTML = '';

    players.forEach((player, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${player} <button onclick="removePlayer(${index})" style="background:none; border:none; color:red; cursor:pointer;">❌</button>`;
        list.appendChild(li);
    });

    // En az 2 oyuncu varsa başlat butonunu aç
    const startBtn = document.getElementById('start-btn');
    if (players.length >= 2) {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
}

function removePlayer(index) {
    players.splice(index, 1);
    updatePlayerList();
}

// Oyunu Başlatma
function startGame() {
    if (players.length < 2) return;

    document.getElementById('setup-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    nextTurn();
}

// Sonraki Tur / Rastgele Eşleşme ve Mod Belirleme
function nextTurn() {
    if (players.length < 2) return;

    // Rastgele iki farklı oyuncu seç (Soran ve Cevaplayan/Yapan)
    let index1 = Math.floor(Math.random() * players.length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * players.length);
    } while (index2 === index1);

    let soran = players[index1];
    let hedef = players[index2];

    document.getElementById('soran-kisi').innerHTML = `<span style="font-size:12px; color:#64748b; display:block; margin-bottom:5px;">Soran:</span>${soran}`;
    document.getElementById('hedef-kisi').innerHTML = `<span style="font-size:12px; color:#64748b; display:block; margin-bottom:5px;">Seçilen:</span>${hedef}`;

    // Mod Seçimine Göre Doğruluk mu Cesaret mi? belirle
    const selectedMode = document.getElementById('game-mode').value;
    const badge = document.getElementById('action-badge');

    let actionType = '';

    if (selectedMode === 'truth') {
        actionType = 'truth';
        badge.textContent = '🧠 DOĞRULUK';
    } else if (selectedMode === 'dare') {
        actionType = 'dare';
        badge.textContent = '🦁 CESARET';
    } else {
        // Karışık mod: %60 ihtimalle Doğruluk, %40 ihtimalle Cesaret (istediğin oran dengesi)
        let randomChance = Math.random();
        if (randomChance < 0.6) {
            actionType = 'truth';
            badge.textContent = '🧠 DOĞRULUK';
        } else {
            actionType = 'dare';
            badge.textContent = '🦁 CESARET';
        }
    }

    badge.className = `badge ${actionType}`;
}

// Oyunu Sıfırlayıp Başa Dönme
function resetGame() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('setup-screen').classList.add('active');
}
