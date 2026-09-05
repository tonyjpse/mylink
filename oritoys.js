(function() {
    // 1. INJECT STYLESHEET (CSS)
    const style = document.createElement('style');
    style.innerHTML = `
      .spa-app-container {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 15px;
        color: #333;
      }
      .search-container { margin-bottom: 20px; }
      .search-input {
        width: 100%;
        padding: 12px 16px;
        font-size: 15px;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .search-input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
      }
      .no-result {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px 20px;
        color: #64748b;
        font-size: 15px;
        background: #ffffff;
        border: 1px dashed #cbd5e1;
        border-radius: 8px;
      }
      .product-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
      }
      @media (max-width: 768px) {
        .product-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
      }
      .product-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .product-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }
      .product-card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 6px;
        margin-bottom: 10px;
      }
      .product-title {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 6px;
        line-height: 1.3;
      }
      .product-price {
        font-size: 16px;
        font-weight: 700;
        color: #d97706;
        margin-bottom: 10px;
      }
      .btn-detail, .btn-buy, .btn-back {
        display: block;
        text-align: center;
        padding: 8px 12px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        border: none;
      }
      .btn-detail { background-color: #2563eb; color: #ffffff; }
      .btn-detail:hover { background-color: #1d4ed8; }
      .btn-buy {
        background-color: #16a34a;
        color: #ffffff;
        font-size: 16px;
        padding: 12px 20px;
        margin-top: 15px;
      }
      .btn-buy:hover { background-color: #15803d; }
      .btn-back {
        background-color: #64748b;
        color: #ffffff;
        display: inline-block;
        margin-bottom: 15px;
      }
      .detail-container {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }
      .detail-image-box { flex: 1; min-width: 280px; }
      .detail-image-box img {
        width: 100%;
        max-height: 380px;
        object-fit: cover;
        border-radius: 8px;
      }
      .detail-info-box { flex: 1.2; min-width: 280px; }
      .detail-rating { font-size: 16px; margin: 8px 0; }
      .detail-desc {
        font-size: 14px;
        color: #4b5563;
        line-height: 1.6;
        margin-top: 10px;
        white-space: pre-line;
      }
      .spa-page { display: none; }
      .spa-page.active { display: block; }
    `;
    document.head.appendChild(style);

    // 2. INJECT STRUCTURE (HTML)
    const appContainer = document.getElementById('oritoys-app');
    if (!appContainer) return;

    appContainer.innerHTML = `
      <div class="spa-app-container">
        <div id="page-catalog" class="spa-page active">
          <div class="search-container">
            <input 
              type="text" 
              id="search-input" 
              class="search-input" 
              placeholder="Cari produk mainan..." 
            />
          </div>
          <div class="product-grid" id="catalog-grid"></div>
        </div>
        <div id="page-detail" class="spa-page">
          <button class="btn-back" id="btn-back-trigger">&#8592; Kembali ke Katalog</button>
          <div class="detail-container">
            <div class="detail-image-box">
              <img id="detail-img" src="" alt="toko mainan terpercaya" />
            </div>
            <div class="detail-info-box">
              <h2 id="detail-title">Judul Produk</h2>
              <div class="detail-rating">Reputasi toko: ⭐⭐⭐⭐⭐</div>
              <div class="product-price" id="detail-price">Rp. 0</div>
              <div class="detail-desc" id="detail-desc">Deskripsi produk...</div>
              <a id="detail-aff-link" href="#" target="_blank" rel="noopener noreferrer" class="btn-buy">
                Beli Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    // 3. LOGIKA SPA & DATA
    const productsData = [
      {
        id: "prod-1",
        title: "Tamiya mini4wd original asli terlengkap",
        price: "Rp. 155.750",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBN3wU2rP4HmI4vMjyGLCfJqsyjDr5LMPYZ7euB6aB-sAJ-lXLK5nMrr9GW7G0ZM0ZSY55uZa5er_M2d3vBl52LPq4dCj8sP-1KbsPIhy8g1WUMQk2oqqYoN_XNXp_UDdCAFDHvzc8MfRy5n1LhUH7isfpCb5RshHpu3zsQV_DsIyKw1LmQZPga2XK5k9Y/s1600/sg-11134201-8259n-mrgyj12pxyx05e.jpg?auto=format&fit=crop&w=600&q=80",
        description: "Harga bisa berubah sewaktu-waktu. Tamiya mini 4WD original asli mulai seri lama seperti avante, astute, Dash emperor yankuro hingga let's & go sonic saber, magnum saber, broken gigant dan lainnya.\nCek out sekarang lewat oritoys yang memberikan pilihan toko terbaik dan terpercaya di Shopee.",
        affiliateUrl: "https://invl.io/clnudgv"
      },
      {
        id: "prod-2",
        title: "Tamiya Replika Mini 4wd Merk Jiepin harga terjangkau",
        price: "Rp. 57.000",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-R4s-9tCKvCOcrr1oDb6DC_XJhrKZ4UbClfFusOkdHOicUFrDxblkTw5yH6tmVtvifyjxdjeWJtTs_uFU-NghAT_1rST9oxNncs_8sbxCg2Dtq4AaXxulUgPfCShAFSv0-i-mvYCspr-ZGwO9mirHRa3u8a1uUbR-bteX7J_4pQWTMcRaB0hkozoAZ_9N/s320/t96qoid-11134207-8224w-mhlrs4xs47pf0e.jpg?auto=format&fit=crop&w=600&q=80",
        description: "Harga bisa berubah sewaktu-waktu. Tamiya Replika Mini 4wd Merk Jiepin Lets and Go Series Chasis Super 1 dengan harga.\nCek out lewat oritoys yang memberikan pilihan toko terbaik dan terpercaya di Shopee.",
        affiliateUrl: "https://invl.io/clnv5ul"
      },
      {
        id: "prod-3",
        title: "Tamiya STO 50 RTR MS Suspension Winning Bird",
        price: "Rp. 1.770.000",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6Wt64ScJoq5QyWtCMauTph94Nt4zkgxUv4y_E1QqVDeVJ2cxCOgoSarznqRbR9eaD7SVYJKVC2YIzVidosJ_zgpSaW18XSSFvqQCDyz6OzNYYYXm6PKEg0yNnPJci8WlWVQCUjPhINbSRqWkSYAXAWpOp0jU8JZmtHEnp9JVyEnbkJunh1x3TpQB-GI4g/s720/1rvewid-11134207-7rase-m4h2p3np4d2y07.jpg?auto=format&fit=crop&w=600&q=80",
        description: "Harga bisa berubah sewaktu-waktu. Pilihan tepat toko untuk pecinta Tamiya kelas STO yang sudah punya adrenalin adu balap di track perlombaan.\nTamiya Rakit siap pakai bagi kamu yang ingin balapan level STO. \nCek out sekarang melalui oritoys onlapak memberikan pilihan toko terbaik dan terpercaya di Shopee.",
        affiliateUrl: "https://invl.io/clnv5x6"
      },
      {
        id: "prod-4",
        title: "Mainan Drone E99 merk Sorenling harga terjangkau",
        price: "Rp158.675",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgQLYcmCqjLCYlvV8HGWVDYkqK53BvF_Kwc-lzRj9sbztokyBy-jUakyZd-a6WjacLciK0C6sm5KKRd51iOH9t4fMjL7sRU8C4tMUAeCG12bAu7qJBViLNnFQcPx2ughLsbA0izIbzo2nSA31o8DBgT3JrKZUH-UDI8DUUD0ZRwIWZMHAecYw4wUZSuDKCr/s1024/drone_murah_onlapak.jpg?auto=format&fit=crop&w=600&q=80",
        description: "Harga bisa berubah sewaktu-waktu. Ini merupakan drone kelas mainan, yang mempunyai jarak sekitar 100meter dari remote control.\nDengan durasi terbang hanya 8 hingga 10menitan. Membutuhkan waktu 2 jam untuk mengisi ulang daya baterai.\nDrone ini sudah menggunakan kamera fpv untuk membuat video atau photo.\nBeli sekarang melalui oritoys onlapak yang memberikan pilihan toko terbaik dan terpercaya.",
        affiliateUrl: "https://invl.io/clnv65x"
      }, 
      {
        id: "prod-5",
        title: "Tamiya Replika merk jeipin Dash Warrior stok terbatas.",
        price: "Rp72.000",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgUan-zH-pEYp-dqhOfSwRiUTiReZJ5Q2_Iw-f3oQfYpVsI1J9A9UbERG2nUzAvB5MDR1NCYlF3lKEFckNmZqMmdKmerU1t9gZOLUyOKhNa-Wj86Zt9XGsQ6Vt6hlihq2AiVLrThO6TqRR-dKwjSu1867vIrktF-wnc277oRKBEnVl1T4IlsJsH5MXMOmZf/s1024/id-11134207-81zte-mfmoqjsdpkax6b.jpg?auto=format&fit=crop&w=600&q=80",
        description: "Harga bisa berubah sewaktu-waktu. Ini adalah Replika Tamiya Dash Warrior , Yonkuro series Emperor, Burning sun, Shooting star, Canon ball, Dancing doll mengenang masa lalu dengan memiliki koleksi tamiya ini stok sangat terbatas. \nBeli sekarang melalui oritoys onlapak yang memberikan pilihan toko terbaik dan terpercaya di Shopee.",
        affiliateUrl: "https://invl.io/clnvdji"
      }
    ];

    function renderCatalog(itemsToRender) {
      const gridContainer = document.getElementById('catalog-grid');
      gridContainer.innerHTML = '';

      if (itemsToRender.length === 0) {
        gridContainer.innerHTML = `<div class="no-result">Produk yang kamu cari tidak ditemukan.</div>`;
        return;
      }

      itemsToRender.forEach(item => {
        const cardHtml = `
          <div class="product-card">
            <div>
              <img src="${item.image}" alt="${item.title}" />
              <div class="product-title">${item.title}</div>
              <div class="product-price">${item.price}</div>
            </div>
            <button class="btn-detail" data-id="${item.id}">Detail</button>
          </div>
        `;
        gridContainer.innerHTML += cardHtml;
      });

      // Event listener untuk tombol detail
      document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', function() {
          showDetail(this.getAttribute('data-id'));
        });
      });
    }

    function filterProducts() {
      const keyword = document.getElementById('search-input').value.toLowerCase().trim();
      const filteredProducts = productsData.filter(product => 
        product.title.toLowerCase().includes(keyword)
      );
      renderCatalog(filteredProducts);
    }

    function showDetail(productId) {
      const product = productsData.find(p => p.id === productId);
      if (!product) return;

      document.getElementById('detail-img').src = product.image;
      document.getElementById('detail-title').innerText = product.title;
      document.getElementById('detail-price').innerText = product.price;
      document.getElementById('detail-desc').innerText = product.description;
      document.getElementById('detail-aff-link').href = product.affiliateUrl;

      document.getElementById('page-catalog').classList.remove('active');
      document.getElementById('page-detail').classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showCatalog() {
      document.getElementById('page-detail').classList.remove('active');
      document.getElementById('page-catalog').classList.add('active');
    }

    // Event Listeners
    document.getElementById('search-input').addEventListener('input', filterProducts);
    document.getElementById('btn-back-trigger').addEventListener('click', showCatalog);

    // Initial Render
    renderCatalog(productsData);
})();
