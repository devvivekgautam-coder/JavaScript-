let products = JSON.parse(localStorage.getItem("products") || "[]");
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let currentSort = "default";

cart = cart.map(item => ({ ...item, qty: item.qty || 1 }));
saveCart();

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function totalCartItems() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

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
        showToast("⚠️", "Please fill all fields!");
        return;
    }

    products.push({ id: Date.now(), name, price: parseFloat(price), image });
    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";

    preview();
    showToast("✅", `${name} added!`);
}

function getSortedProducts(list) {
    const sorted = [...list];
    if (currentSort === "az") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "za") {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (currentSort === "lowhigh") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (currentSort === "highlow") {
        sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
}

function setSort(val) {
    currentSort = val;
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.sort === val);
    });
    renderProducts();
}

function renderProducts() {
    const container = document.getElementById("products");
    const search = document.getElementById("search").value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search)
    );

    const sorted = getSortedProducts(filtered);

    const statsBar = document.getElementById("statsBar");
    statsBar.style.display = "flex";

    const total = products.reduce((s, p) => s + p.price, 0);
    statsBar.innerHTML = `
        <div class="stat-pill">🛍️ <strong>${products.length}</strong> Products</div>
        <div class="stat-pill">🔍 <strong>${filtered.length}</strong> Shown</div>
        <div class="stat-pill">💰 Avg ₹<strong>${products.length ? Math.round(total / products.length) : 0}</strong></div>
    `;

    if (!sorted.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">📭</span><p>No products found</p></div>`;
        return;
    }

    container.innerHTML = sorted.map(p => `
        <div class="product-card">
            <div class="product-img-wrap">
                ${p.image ? `<img src="${p.image}" onerror="this.style.display='none'">` : '<span class="no-img-placeholder">🛒</span>'}
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-price">₹${p.price}</div>
                <div class="product-actions">
                    <button class="btn-view" onclick="viewProduct(${p.id})">View</button>
                    <button class="btn-cart" onclick="addToCart(${p.id})">+ Cart</button>
                </div>
                <button class="btn-buy" onclick="buyNow(${p.id})">Buy Now</button>
            </div>
        </div>
    `).join("");
}

function viewProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    content.innerHTML = `
        <button class="modal-close" onclick="closeModal()">✕</button>
        ${p.image ? `<img class="modal-img" src="${p.image}" onerror="this.style.display='none'" alt="${p.name}">` : ''}
        <div class="modal-name">${p.name}</div>
        <div class="modal-price">₹${p.price}</div>
        <div class="modal-meta">
            <div class="modal-meta-item"><span class="modal-meta-label">Product ID</span><span class="modal-meta-value">#${p.id}</span></div>
            <div class="modal-meta-item"><span class="modal-meta-label">Status</span><span class="modal-meta-value modal-badge">In Stock</span></div>
        </div>
        <div class="modal-actions">
            <button class="btn-primary" onclick="addToCart(${p.id}); closeModal()">🛒 Add to Cart</button>
            <button class="btn-buy-modal" onclick="buyNow(${p.id}); closeModal()">⚡ Buy Now</button>
        </div>
    `;

    modal.classList.add('open');
}

function closeModal() {
    document.getElementById("modal").classList.remove('open');
}

function handleModalClick(e) {
    if (e.target === document.getElementById("modal")) closeModal();
}

function buyNow(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const existing = cart.find(x => x.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...p, qty: 1 });
    }

    saveCart();
    updateCartCount();
    showToast("⚡", `Buying ${p.name}!`);
    showPage('cart');
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    const existing = cart.find(x => x.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...p, qty: 1 });
    }

    saveCart();
    updateCartCount();
    showToast("🛒", `${p.name} added`);
}

function increaseQty(id) {
    const item = cart.find(x => x.id === id);
    item.qty++;
    saveCart();
    renderCart();
    updateCartCount();
}

function decreaseQty(id) {
    const item = cart.find(x => x.id === id);
    if (item.qty > 1) item.qty--;
    saveCart();
    renderCart();
    updateCartCount();
}

function deleteItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
    showToast("❌", "Item removed");
}

function renderCart() {
    const container = document.getElementById("cartItems");

    if (!cart.length) {
        container.innerHTML = `<div class="empty-state"><span class="icon">🛒</span><p>Cart is empty</p></div>`;
        return;
    }

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img class="cart-item-img" src="${item.image}" onerror="this.style.opacity='0'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} × ${item.qty}</div>
            </div>

            <div class="btns">
                <button onclick="decreaseQty(${item.id})">-</button>
                <span>${item.qty}</span>
                <button onclick="increaseQty(${item.id})">+</button>
            </div>

            <div class="cart-item-subtotal">₹${item.price * item.qty}</div>
            <button class="cart-delete-btn" onclick="deleteItem(${item.id})">🗑</button>
        </div>
    `).join("") + `
        <div class="cart-total">
            <span class="cart-total-label">Total</span>
            <span class="cart-total-amount">₹${total}</span>
        </div>
    `;
}

function updateCartCount() {
    document.getElementById("cartCount").textContent = totalCartItems();
}

function showToast(icon, msg) {
    const toast = document.getElementById("toast");
    document.querySelector(".toast-icon").textContent = icon;
    document.getElementById("toastMsg").textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

updateCartCount();