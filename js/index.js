// ------------------------------
// 🔍 検索ボタン押下イベント
// ------------------------------
document.querySelector('.js-search-button').addEventListener('click', async () => {
    const query = document.querySelector('.js-search-input').value.trim();
    if (!query) return;

    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!data.items) {
            console.log('検索結果なし');
            return;
        }

        const searchList = document.querySelector('.js-search-list');
        searchList.innerHTML = '';

        // 書籍カードを生成
        data.items.forEach((book) => {
            const info = book.volumeInfo;
            const card = createBookCard(info);
            searchList.appendChild(card);
        });
    } catch (error) {
        console.error('検索エラー:', error);
    }
});

// ------------------------------
// 📖 書籍カード生成関数
// ------------------------------
function createBookCard(info, isFavorite = false) {
    const card = document.createElement('div');
    card.className = 'book-card';

    // 画像URLを選択
    const imgSrc = isFavorite
        ? info.thumbnail || '' // お気に入りは dataset に保存してある URL を使う
        : info.imageLinks?.extraLarge || info.imageLinks?.large || info.imageLinks?.medium || info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || '';

    const description = info.description || '説明なし';
    const shortDesc = description.length > 80 ? description.slice(0, 80) + '･･･' : description;

    card.innerHTML = `
        <h2 class="book-title">${info.title || 'タイトル不明'}</h2>
        <p class="book-author">著者：${info.authors?.join(', ') || '不明'}</p>
        <p class="book-description">${shortDesc}</p>
        <div class="book-image">
            <img src="${imgSrc}" alt="${info.title || '書籍画像'}">
        </div>
        ${!isFavorite ? '<button type="button" class="book-favorite">お気に入りに追加</button>' : ''}
    `;

    if (!isFavorite) {
        card.dataset.book = JSON.stringify({
            title: info.title,
            authors: info.authors,
            description: info.description,
            thumbnail: imgSrc,
        });

        card.querySelector('.book-favorite').addEventListener('click', () => {
            const bookData = JSON.parse(card.dataset.book);
            addToFavorites(bookData);
        });
    }

    return card;
}

// ------------------------------
// 💾 お気に入り追加処理
// ------------------------------
function addToFavorites(book) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.some((f) => f.title === book.title)) {
        alert('すでにお気に入りに追加されています');
        return;
    }
    favorites.push(book);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('お気に入りに追加しました');
}

// ------------------------------
// 🔁 タブ切り替え処理
// ------------------------------
document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
        const selected = tab.dataset.tab;

        // タブの見た目切り替え
        document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t === tab));

        // コンテンツ表示切り替え
        document.querySelectorAll('.results-container').forEach((c) => c.classList.toggle('hidden', c.dataset.tab !== selected));

        // お気に入りタブなら一覧を更新
        if (selected === 'favorites') renderFavorites();
    });
});

// ------------------------------
// ⭐ お気に入り一覧表示
// ------------------------------
function renderFavorites() {
    const favoritesList = document.querySelector('.js-favorites-list');
    favoritesList.innerHTML = '';

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.length) {
        favoritesList.innerHTML = '<p>お気に入りはまだありません。</p>';
        return;
    }

    favorites.forEach((book) => {
        const card = createBookCard(book, true); // お気に入りモード
        favoritesList.appendChild(card);
    });
}
