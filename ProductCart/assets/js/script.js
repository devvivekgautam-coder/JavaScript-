(function () {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((W * H) / 14000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.5 + 0.3,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.5 + 0.1,
                color: ['108,99,255', '255,107,157', '0,212,170'][Math.floor(Math.random() * 3)]
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108,99,255,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });
})();


let products = JSON.parse(localStorage.getItem("products") || "[]");
let cart = JSON.parse(localStorage.getItem("cart") || "[]");


function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn:not(.cart-btn)').forEach(b => b.classList.remove('active'));

    const pageMap = { add: 'addPage', view: 'viewPage', cart: 'cartPage' };
    const btnMap = { add: 'btnAdd', view: 'btnView' };

    document.getElementById(pageMap[page]).classList.add('active');
    if (btnMap[page]) document.getElementById(btnMap[page]).classList.add('active');

    if (page === 'view') renderProducts();
    if (page === 'cart') renderCart();
}


function preview() {
    const url = document.getElementById("image").value.trim();
    const img = document.getElementById("preview");
    const box = document.getElementById("previewBox");
    const ph = document.getElementById("previewPlaceholder");

    if (url) {
        img.src = url;
        img.style.display = "block";
        ph.style.display = "none";
        box.classList.add('has-image');
    } else {
        img.style.display = "none";
        ph.style.display = "";
        box.classList.remove('has-image');
    }
}


function addProduct() {
    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const image = document.getElementById("image").value.trim();

    if (!name || !price) {
        showToast("⚠️", "Please fill in name and price!");
        return;
    }

    products.push({ id: Date.now(), name, price: parseFloat(price), image });
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
    document.getElementById("preview").style.display = "none";
    document.getElementById("previewPlaceholder").style.display = "";
    document.getElementById("previewBox").classList.remove('has-image');

    showToast("✅", `"${name}" added successfully!`);
}


function renderProducts() {
    const container = document.getElementById("products");
    const search = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(search));

    // Stats
    const statsBar = document.getElementById("statsBar");
    const total = products.reduce((s, p) => s + parseFloat(p.price), 0);
    statsBar.innerHTML = `
    <div class="stat-pill">🛍️ <strong>${products.length}</strong> Products</div>
    <div class="stat-pill">🔍 <strong>${filtered.length}</strong> Shown</div>
    <div class="stat-pill">💰 Avg ₹<strong>${products.length ? Math.round(total / products.length).toLocaleString() : 0}</strong></div>
  `;

    if (!filtered.length) {
        container.innerHTML = `
      <div class="empty-state">
        <span class="icon">📦</span>
        <p>${search ? 'No products match your search.' : 'No products yet. Add one!'}</p>
      </div>`;
        return;
    }

    container.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.06}s">
      <div class="product-img-wrap">
        ${p.image
            ? `<img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">`
            : `<span class="no-img-placeholder">🛒</span>`}
      </div>
      <div class="product-info">
        <div class="product-name" title="${p.name}">${p.name}</div>
        <div class="product-price">₹${parseFloat(p.price).toLocaleString()}</div>
        <div class="product-actions">
          <button class="btn-view" onclick="viewProduct(${p.id})">👁 View</button>
          <button class="btn-cart" onclick="addToCart(${p.id})">+ Cart</button>
        </div>
      </div>
    </div>
  `).join("");
}


function viewProduct(id) {
    const p = products.find(x => x.id === id);
    const modal = document.getElementById("modal");
    document.getElementById("modalContent").innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕</button>
    ${p.image ? `<img class="modal-img" src="${p.image}" alt="${p.name}">` : ''}
    <div class="modal-name">${p.name}</div>
    <div class="modal-price">₹${parseFloat(p.price).toLocaleString()}</div>
    <button class="btn-primary" onclick="addToCart(${p.id}); closeModal()">🛒 Add to Cart</button>
  `;
    modal.classList.add('open');
}

function closeModal() {
    document.getElementById("modal").classList.remove('open');
}

function handleModalClick(e) {
    if (e.target === document.getElementById('modal')) closeModal();
}


function addToCart(id) {
    const p = products.find(x => x.id === id);
    cart.push(p);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast("🛒", `"${p.name}" added to cart!`);
}

function renderCart() {
    const container = document.getElementById("cartItems");

    if (!cart.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">🛒</span><p>Your cart is empty.</p></div>`;
        return;
    }

    const total = cart.reduce((s, p) => s + parseFloat(p.price), 0);

    container.innerHTML = cart.map((p, i) => `
    <div class="cart-item" style="animation-delay:${i * 0.07}s">
      ${p.image ? `<img class="cart-item-img" src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">` : ''}
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">₹${parseFloat(p.price).toLocaleString()}</div>
      </div>
    </div>
  `).join("") + `
    <div class="cart-total">
      <div>
        <div class="cart-total-label">Total Amount</div>
        <div style="color:var(--muted);font-size:0.8rem">${cart.length} item${cart.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="cart-total-amount">₹${total.toLocaleString()}</div>
    </div>
  `;
}

function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.length;
}


let toastTimer;
function showToast(icon, msg) {
    const toast = document.getElementById("toast");
    document.querySelector(".toast-icon").textContent = icon;
    document.getElementById("toastMsg").textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}


updateCartCount();
document.getElementById('btnAdd').classList.add('active');