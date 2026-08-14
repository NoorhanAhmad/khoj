// ==========================================================================
// KHOJ — UNIFIED MONOLITH APPLICATION SCRIPT (app.js)
// Client-side single-page router, reactive state, components, and pages.
// ==========================================================================

/* ==========================================
   1. STATIC DATA CATALOG (mockData)
   ========================================== */
import { supabase } from './supabaseClient.js';
const categories = [
    { id: 'streetwear', name: 'gully wear', icon: '👕', description: 'oversized tees, cargos, and street essentials' },
    { id: 'thrift', name: 'retro thrift', icon: '🎒', description: 'handpicked 90s windbreakers, denim, and preloved jackets' },
    { id: 'accessories', name: 'accessories', icon: '💍', description: 'custom silver rings, beaded chains, and quirky keychains' },
    { id: 'totes', name: 'bags & totes', icon: '👜', description: 'eco-friendly canvas tote bags with hand-painted designs' },
    { id: 'zines-prints', name: 'zines & art', icon: '🎨', description: 'indie stickers, art prints, and local zines' }
];

const initialSellers = {
    'gully-wear': {
        id: 'gully-wear',
        name: 'gully wear',
        logo: '⚡',
        city: 'karachi',
        joined: 'Jan 2026',
        followers: 1240,
        bio: 'karachi-based heavy streetwear. oversized fits & raw aesthetics. Support your local gully.',
        bannerGradient: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
        instagram: '@gullywear.pk'
    },
    'khaas-finds': {
        id: 'khaas-finds',
        name: 'khaas finds',
        logo: '✨',
        city: 'lahore',
        joined: 'Oct 2025',
        followers: 890,
        bio: 'curating premium preloved clothing. lahore-based thrift vault. 1-of-1 vintage tees, retro denim, and classic windbreakers.',
        bannerGradient: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
        instagram: '@khaasfinds.lh'
    },
    'challa-studio': {
        id: 'challa-studio',
        name: 'challa studio',
        logo: '💍',
        city: 'rawalpindi',
        joined: 'Mar 2026',
        followers: 320,
        bio: 'handmade silver trinkets & chunky metal rings. custom sizes available.',
        bannerGradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        instagram: '@challa.studio'
    },
    'sandook-thrift': {
        id: 'sandook-thrift',
        name: 'sandook thrift',
        logo: '📦',
        city: 'islamabad',
        joined: 'Sep 2025',
        followers: 670,
        bio: 'digging through the old trunks so you don\'t have to. unisex retro pieces. sustainable fashion from ISB.',
        bannerGradient: 'linear-gradient(135deg, #10B981 0%, #F59E0B 100%)',
        instagram: '@sandook.thrift'
    }
};

const initialProducts = [
    {
        id: 'p1',
        name: 'oversized "sard-duniya" heavy hoodie',
        price: 3450,
        category: 'streetwear',
        sellerId: 'gully-wear',
        sizes: ['M', 'L', 'XL'],
        condition: 'brand new',
        details: '400GSM ultra-thick cotton fleece. puff print details. loose streetwear fit. made in karachi.',
        location: 'karachi',
        rating: 4.8,
        reviewsCount: 14,
        stickerText: 'trending rn',
        stickerColor: 'blue',
        gradient: 'linear-gradient(45deg, #1A1A1A 0%, #4B5563 100%)'
    },
    {
        id: 'p2',
        name: 'vintage 90s colorblock windbreaker',
        price: 2800,
        category: 'thrift',
        sellerId: 'khaas-finds',
        sizes: ['L'],
        condition: 'excellent preloved',
        details: 'genuine retro activewear from the 90s. neon teal, purple, and yellow accents.',
        location: 'lahore',
        rating: 5.0,
        reviewsCount: 3,
        stickerText: '1 of 1 find',
        stickerColor: 'pink',
        gradient: 'linear-gradient(45deg, #0D9488 0%, #0F766E 100%)'
    },
    {
        id: 'p3',
        name: 'hand-welded chunky "challa" ring',
        price: 950,
        category: 'accessories',
        sellerId: 'challa-studio',
        sizes: ['7', '8', '9'],
        condition: 'handmade new',
        details: 'pure solid sterling silver ring with raw hammered texture. every piece is unique.',
        location: 'rawalpindi',
        rating: 4.6,
        reviewsCount: 22,
        stickerText: 'best seller',
        stickerColor: 'yellow',
        gradient: 'linear-gradient(45deg, #D1D5DB 0%, #9CA3AF 100%)'
    },
    {
        id: 'p4',
        name: 'retro y2k washed cargo pants',
        price: 2400,
        category: 'thrift',
        sellerId: 'sandook-thrift',
        sizes: ['32'],
        condition: 'vintage preloved',
        details: 'heavy-duty sage green cotton cargos. 6 functional pockets. sustainable fashion.',
        location: 'islamabad',
        rating: 4.9,
        reviewsCount: 8,
        stickerText: 'just dropped',
        stickerColor: 'green',
        gradient: 'linear-gradient(45deg, #3F6212 0%, #1A2E05 100%)'
    },
    {
        id: 'p5',
        name: 'hand-painted "khoji" canvas tote',
        price: 1200,
        category: 'totes',
        sellerId: 'khaas-finds',
        sizes: ['standard'],
        condition: 'new item',
        details: 'thick heavy duty canvas tote. hand-drawn doodle designs in fabric paint.',
        location: 'lahore',
        rating: 4.7,
        reviewsCount: 19,
        stickerText: 'limited edition',
        stickerColor: 'yellow',
        gradient: 'linear-gradient(45deg, #FDE68A 0%, #F59E0B 100%)'
    },
    {
        id: 'p6',
        name: 'acid-wash oversized heavy tee',
        price: 1850,
        category: 'streetwear',
        sellerId: 'gully-wear',
        sizes: ['S', 'M', 'L'],
        condition: 'brand new',
        details: '260GSM cotton tee. custom acid wash effect. screen printed graphics.',
        location: 'karachi',
        rating: 4.5,
        reviewsCount: 11,
        stickerText: 'trending rn',
        stickerColor: 'blue',
        gradient: 'linear-gradient(45deg, #4B5563 0%, #1F2937 100%)'
    },
    {
        id: 'p7',
        name: 'vintage denim sherpa-lined jacket',
        price: 4500,
        category: 'thrift',
        sellerId: 'sandook-thrift',
        sizes: ['M'],
        condition: 'great preloved',
        details: 'heavy blue denim jacket with warm fleece lining. levi classic look.',
        location: 'islamabad',
        rating: 5.0,
        reviewsCount: 2,
        stickerText: 'hella warm',
        stickerColor: 'pink',
        gradient: 'linear-gradient(45deg, #2563EB 0%, #1E3A8A 100%)'
    },
    {
        id: 'p8',
        name: 'quirky chaand-sitara keychains',
        price: 450,
        category: 'accessories',
        sellerId: 'challa-studio',
        sizes: ['one size'],
        condition: 'handmade new',
        details: 'brass keychains with hand-engraved crescent moon and stars.',
        location: 'rawalpindi',
        rating: 4.9,
        reviewsCount: 35,
        stickerText: 'cute finds',
        stickerColor: 'green',
        gradient: 'linear-gradient(45deg, #FB7185 0%, #FDA4AF 100%)'
    }
];

const initialOrders = [
    {
        id: 'ord-101',
        date: '2026-07-02',
        items: [
            {
                productId: 'p3',
                productName: 'hand-welded chunky "challa" ring',
                price: 950,
                selectedSize: '8',
                quantity: 1,
                sellerId: 'challa-studio'
            }
        ],
        subtotal: 950,
        shipping: 150,
        total: 1100,
        paymentMethod: 'cod',
        status: 'delivered',
        shippingDetails: {
            name: 'Mazin',
            phone: '03001234567',
            address: 'House 42, Street 7, DHA Phase 6',
            city: 'karachi'
        }
    }
];

const initialApplications = [
    {
        id: 'app-501',
        brandName: 'Khaadi Art',
        ownerName: 'Zainab Bibi',
        city: 'multan',
        instagram: '@khaadi_art_multan',
        bio: 'hand-spun handwoven block printed cotton wear directly from weavers of multan.',
        status: 'pending'
    },
    {
        id: 'app-502',
        brandName: 'Vibe Thrift',
        ownerName: 'Ali Raza',
        city: 'lahore',
        instagram: '@vibethrift.pk',
        bio: 'preloved vintage hoodies, varsity jackets and graphic t-shirts.',
        status: 'pending'
    }
];

const defaultUserProfile = {
    name: 'Mazin',
    phone: '03001234567',
    email: 'mazin@gmail.com',
    addresses: [
        { id: 'addr-1', label: 'Home (Karachi)', text: 'House 42, Street 7, DHA Phase 6, Karachi' }
    ]
};

/* ==========================================
   2. REACTIVE STATE STORE (state)
   ========================================== */
class StateStore {
    constructor() {
        this.currentUserRole = this.loadState('khoj_user_role', 'buyer');
        this.activeSellerId = 'gully-wear';
       
        this.products = this.loadState('khoj_products', initialProducts);
        this.sellers = this.loadState('khoj_sellers', initialSellers);
        this.orders = this.loadState('khoj_orders', initialOrders);
        this.applications = this.loadState('khoj_applications', initialApplications);
        this.cart = this.loadState('khoj_cart', []);
        this.currentUser = null;

        this.searchQuery = '';
        this.selectedCategory = null;
        this.selectedCity = null;
        this.priceRange = [0, 6000];
       
        this.listeners = [];
        this.toastListeners = [];
    }

    loadState(key, defaultValue) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) { return defaultValue; }
    }

    saveState(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    }

    async loadProductsFromSupabase() {
        const { data, error } = await supabase.from('products').select('*, sellers(*)');
        if (error) {
            console.log('Supabase error:', error);
            return;
        }
        this.products = data;
        this.notify();
    }

    async loadCurrentUser() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { this.currentUser = null; this.mySellerId = null; this.mySeller = null; return; }

        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        this.currentUser = profile;
        this.currentUserRole = profile ? profile.role : 'buyer';

        if (profile && profile.role === 'seller') {
            const { data: seller, error: sellerLookupErr } = await supabase.from('sellers').select('*').eq('owner_id', session.user.id).single();
            if (sellerLookupErr) console.log('seller lookup error:', sellerLookupErr, 'for user:', session.user.id);
            this.mySellerId = seller ? seller.id : null;
            this.mySeller = seller || null;
        } else {
            this.mySellerId = null;
            this.mySeller = null;
        }
        this.notify();
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => { this.listeners = this.listeners.filter(l => l !== callback); };
    }

    notify() {
        this.listeners.forEach(cb => cb(this));
    }

    subscribeToToasts(callback) {
        this.toastListeners.push(callback);
        return () => { this.toastListeners = this.toastListeners.filter(l => l !== callback); };
    }

    showToast(message, type = 'info') {
        this.toastListeners.forEach(cb => cb(message, type));
    }

    setUserRole(role) {
        this.currentUserRole = role;
        this.saveState('khoj_user_role', role);
        this.showToast(`switched to ${role} view 🕶️`);
        this.notify();
    }

    saveCart() {
        this.saveState('khoj_cart', this.cart);
        this.notify();
    }

    addToCart(product, size = 'standard') {
        const existingItem = this.cart.find(
            item => item.product.id === product.id && item.selectedSize === size
        );
        if (existingItem) {
            existingItem.quantity += 1;
            this.showToast(`added another "${product.name}" to khazana! 👜`);
        } else {
            this.cart.push({ product, selectedSize: size, quantity: 1 });
            this.showToast(`added "${product.name}" to khazana! 🎉`);
        }
        this.saveCart();
    }

    removeFromCart(productId, size) {
        const itemIndex = this.cart.findIndex(
            item => item.product.id === productId && item.selectedSize === size
        );
        if (itemIndex > -1) {
            const name = this.cart[itemIndex].product.name;
            this.cart.splice(itemIndex, 1);
            this.showToast(`removed "${name}" from khazana 🗑️`);
        }
        this.saveCart();
    }

    updateQuantity(productId, size, change) {
        const item = this.cart.find(
            item => item.product.id === productId && item.selectedSize === size
        );
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId, size);
            } else {
                this.saveCart();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    getCartCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    }

    addProduct(productData) {
        const newProduct = {
            id: 'p-' + Date.now(),
            rating: 5.0,
            reviewsCount: 0,
            gradient: 'linear-gradient(45deg, #3B82F6 0%, #EC4899 100%)',
            ...productData
        };
        this.products.unshift(newProduct);
        this.saveState('khoj_products', this.products);
        this.showToast(`new listing "${newProduct.name}" is now live! 📦`);
        this.notify();
    }

    deleteProduct(productId) {
        const name = this.products.find(p => p.id === productId)?.name || '';
        this.products = this.products.filter(p => p.id !== productId);
        this.saveState('khoj_products', this.products);
        this.showToast(`deleted listing "${name}" 🗑️`);
        this.notify();
    }

    createOrder(shippingDetails, paymentMethod) {
        const newOrder = {
            id: 'ord-' + Math.floor(100 + Math.random() * 900),
            date: new Date().toISOString().split('T')[0],
            items: this.cart.map(item => ({
                productId: item.product.id,
                productName: item.product.name,
                price: item.product.price,
                selectedSize: item.selectedSize,
                quantity: item.quantity,
                sellerId: item.product.sellerId
            })),
            subtotal: this.getCartTotal(),
            shipping: 150,
            total: this.getCartTotal() + 150,
            paymentMethod,
            status: 'processing',
            shippingDetails
        };
        this.orders.unshift(newOrder);
        this.saveState('khoj_orders', this.orders);
        this.clearCart();
        return newOrder.id;
    }

    updateOrderStatus(orderId, newStatus) {
        this.orders = this.orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        this.saveState('khoj_orders', this.orders);
        this.showToast(`order ${orderId} marked as ${newStatus}! 🚚`);
        this.notify();
    }

    addApplication(appData) {
        const newApp = {
            id: 'app-' + Date.now(),
            status: 'pending',
            ...appData
        };
        this.applications.unshift(newApp);
        this.saveState('khoj_applications', this.applications);
        this.showToast(`submitted application for "${newApp.brandName}"! 🏪`);
        this.notify();
    }

    updateApplicationStatus(appId, newStatus) {
        this.applications = this.applications.map(app => {
            if (app.id === appId) {
                if (newStatus === 'approved') {
                    const sellerId = app.brandName.toLowerCase().replace(/\s+/g, '-');
                    this.sellers[sellerId] = {
                        id: sellerId,
                        name: app.brandName,
                        logo: '✨',
                        city: app.city,
                        joined: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
                        followers: 0,
                        bio: app.bio,
                        bannerGradient: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
                        instagram: app.instagram
                    };
                    this.saveState('khoj_sellers', this.sellers);
                    this.showToast(`brand "${app.brandName}" is now an active seller! 🏪`);
                }
                return { ...app, status: newStatus };
            }
            return app;
        });
        this.saveState('khoj_applications', this.applications);
        this.notify();
    }

    setSearchQuery(query) { this.searchQuery = query; this.notify(); }
    setCategoryFilter(category) { this.selectedCategory = category; this.notify(); }
    setCityFilter(city) { this.selectedCity = city; this.notify(); }
    setPriceFilter(min, max) { this.priceRange = [min, max]; this.notify(); }

    resetFilters() {
        this.searchQuery = '';
        this.selectedCategory = null;
        this.selectedCity = null;
        this.priceRange = [0, 6000];
        this.notify();
    }
}

const store = new StateStore();

/* ==========================================
   3. HASH ROUTER DEFINITIONS (router)
   ========================================== */
const routes = {
    '/': renderHome,
    '/explore': renderExplore,
    '/login': renderLogin,
    '/signup': renderSignup,
    '/product/:id': renderProductDetails,
    '/shop/:id': renderStorefront,
    '/checkout': renderCheckout,
    '/order-success/:id': renderOrderSuccess,
    '/account': renderAccount,
    '/seller-apply': renderSellerApply,
    '/seller-dashboard': renderSellerDashboard,
    '/admin-dashboard': renderAdminDashboard
};

function getRouteInfo() {
    const hash = window.location.hash || '#/';
    const path = hash.substring(1);
    const pathSegments = path.split('/').filter(Boolean);
   
    for (const routePattern in routes) {
        const routeSegments = routePattern.split('/').filter(Boolean);
        if (routeSegments.length !== pathSegments.length) continue;
       
        const params = {};
        let match = true;
       
        for (let i = 0; i < routeSegments.length; i++) {
            if (routeSegments[i].startsWith(':')) {
                params[routeSegments[i].substring(1)] = pathSegments[i];
            } else if (routeSegments[i] !== pathSegments[i]) {
                match = false;
                break;
            }
        }
        if (match) { return { handler: routes[routePattern], params }; }
    }
    return { handler: renderHome, params: {} };
}

function navigate(hashPath) { window.location.hash = hashPath; }

async function handleRouting() {
    const appRoot = document.getElementById('app-root');
    window.scrollTo(0, 0);
    const { handler, params } = getRouteInfo();
   
    appRoot.innerHTML = `
        <div class="loader-container" style="display: flex; justify-content: center; align-items: center; min-height: 50vh; flex-direction: column; gap: 16px;">
            <div class="spinner" style="width: 40px; height: 40px; border: 4px solid var(--color-text); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
            <div style="font-family: var(--font-heading); font-weight: 700;">digging up the finds...</div>
        </div>
        <style> @keyframes spin { to { transform: rotate(360deg); } } </style>
    `;
   
    try {
        appRoot.innerHTML = await handler(params);
        if (handler.onMount) {
            setTimeout(() => handler.onMount(params), 50);
        }
    } catch (error) {
        console.error('Error rendering page:', error);
        appRoot.innerHTML = `
            <div class="error-container" style="max-width: 500px; margin: 80px auto; padding: 40px; border: var(--border-width) solid var(--color-border); box-shadow: var(--shadow-flat); border-radius: var(--border-radius-md); background: white; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 16px;">😰</div>
                <h2 style="font-family: var(--font-heading); margin-bottom: 12px; font-weight: 800;">khoj ran into a glitch!</h2>
                <a href="#/" class="btn-khoj">go back home</a>
            </div>
        `;
    }
}

function renderLogin() {
    return `
        <div class="container" style="max-width: 420px; margin: 60px auto;">
            <h2 style="font-family: var(--font-heading); margin-bottom: 20px;">log in to khoj</h2>
            <input type="email" id="login-email" class="input-khoj" placeholder="email" style="width:100%; margin-bottom:10px;">
            <input type="password" id="login-password" class="input-khoj" placeholder="password" style="width:100%; margin-bottom:16px;">
            <button id="login-submit" class="btn-khoj" style="width:100%;">log in</button>
            <p style="margin-top:14px;">no account? <a href="#/signup">sign up</a></p>
        </div>
    `;
}
renderLogin.onMount = () => {
    document.getElementById('login-submit').addEventListener('click', async () => {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { store.showToast(error.message, 'error'); return; }
        await store.loadCurrentUser();
        navigate('/');
    });
};

function renderSignup() {
    return `
        <div class="container" style="max-width: 420px; margin: 60px auto;">
            <h2 style="font-family: var(--font-heading); margin-bottom: 20px;">create your khoj account</h2>
            <input type="text" id="signup-name" class="input-khoj" placeholder="full name" style="width:100%; margin-bottom:10px;">
            <input type="email" id="signup-email" class="input-khoj" placeholder="email" style="width:100%; margin-bottom:10px;">
            <input type="password" id="signup-password" class="input-khoj" placeholder="password" style="width:100%; margin-bottom:16px;">
            <button id="signup-submit" class="btn-khoj" style="width:100%;">sign up</button>
            <p style="margin-top:14px;">already have an account? <a href="#/login">log in</a></p>
        </div>
    `;
}
renderSignup.onMount = () => {
    document.getElementById('signup-submit').addEventListener('click', async () => {
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) { store.showToast(error.message, 'error'); return; }
        await supabase.from('profiles').insert({ id: data.user.id, name, role: 'buyer' });
        await store.loadCurrentUser();
        store.showToast('welcome to khoj! 🎉');
        navigate('/');
    });
};

/* ==========================================
   4. LAYOUT COMPONENTS (components)
   ========================================== */
function Navbar() {
    const cartCount = store.getCartCount();
    const role = store.currentUserRole;
    const isLoggedIn = !!store.currentUser;

    let roleLinksHTML = '';
    if (role === 'buyer') {
        roleLinksHTML = `
            <a href="#/explore" class="nav-link">explore</a>
            <a href="#/seller-apply" class="nav-link nav-link-highlight">sell on khoj 🏪</a>
            <a href="#/account" class="nav-link">my profile</a>
        `;
    } else if (role === 'seller') {
        roleLinksHTML = `
            <a href="#/explore" class="nav-link">explore</a>
            <a href="#/seller-dashboard" class="nav-link nav-link-highlight">seller panel ⚡</a>
            <a href="#/account" class="nav-link">my profile</a>
        `;
    } else if (role === 'admin') {
        roleLinksHTML = `
            <a href="#/explore" class="nav-link">explore</a>
            <a href="#/admin-dashboard" class="nav-link nav-link-highlight">admin console 🛡️</a>
        `;
    }
   
    return `
        <nav class="navbar-wrapper">
            <div class="container navbar-container">
                <a href="#/" class="nav-brand">
                <img src="assets/logo1.png" alt="Khoj Logo" class="nav-logo-img">
            </a>
                <div class="nav-search-container">
                    <input type="text" id="nav-search-input" class="input-khoj nav-search-input" placeholder="search brands, cargos, accessories..." value="${store.searchQuery}">
                    <span class="search-icon">🔍</span>
                </div>
                <div class="nav-actions">
                    ${roleLinksHTML}
                    <div class="role-switcher-widget">
                        ${isLoggedIn
            ? `<button id="logout-btn" class="btn-khoj">log out</button>`
            : `<a href="#/login" class="btn-khoj">log in</a>`
                        }
                    </div>
                    <button id="cart-toggle-btn" class="btn-khoj cart-toggle-btn">
                        <span>khazana</span>
                        <span class="cart-badge">${cartCount}</span>
                    </button>
                </div>
            </div>
        </nav>
    `;
}

Navbar.onMount = () => {
    const searchInput = document.getElementById('nav-search-input');
    const cartBtn = document.getElementById('cart-toggle-btn');
    const roleSelect = document.getElementById('role-select');
    const logoutBtn = document.getElementById('logout-btn');

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                store.setSearchQuery(query);
                navigate('/explore');
            }
        });
        searchInput.addEventListener('input', (e) => { store.searchQuery = e.target.value; });
    }
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            const drawer = document.getElementById('cart-drawer');
            if (drawer) drawer.classList.add('open');
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabase.auth.signOut();
            store.currentUser = null;
            store.currentUserRole = 'buyer';
            store.notify();
            navigate('/');
            handleRouting();
        });
    }
    if (roleSelect) {
        roleSelect.addEventListener('change', (e) => {
            const selectedRole = e.target.value;
            store.setUserRole(selectedRole);
            if (selectedRole === 'seller') navigate('/seller-dashboard');
            else if (selectedRole === 'admin') navigate('/admin-dashboard');
            else navigate('/');
        });
    }
};
function ProductCard(product, index = 0) {
    const seller = product.sellers || { name: 'independent brand', logo: '✨' };
    const rotationDeg = (index % 2 === 0) ? '-1.2deg' : '1deg';
    const formattedPrice = `Rs. ${product.price.toLocaleString()}`;
    const stickerRotation = (index % 3 === 0) ? '-3deg' : '3deg';
    const hasImage = !!product.image_url;

    return `
        <div class="product-card" style="--rotation: ${rotationDeg};">
            <a href="#/product/${product.id}" class="card-visual-wrapper" style="${hasImage ? '' : `background: ${product.gradient || 'linear-gradient(45deg, #4B5563 0%, #1F2937 100%)'};`}">
                ${hasImage
            ? `<img src="${product.image_url}" alt="${product.name}" class="product-real-image">`
            : `<div class="visual-placeholder"><span class="visual-emoji">${getCategoryEmoji(product.category)}</span></div>`
        }
                ${product.sticker_text ? `
                    <div class="sticker ${product.sticker_color || 'yellow'} card-sticker" style="--rotate-deg: ${stickerRotation};">
                        ${product.sticker_text}
                    </div>
                ` : ''}
                ${product.location ? `<div class="visual-location">📍 ${product.location}</div>` : ''}
            </a>
            <div class="card-details">
                <a href="#/shop/${seller.id || ''}" class="card-seller-link">
                    <span class="seller-logo">${seller.logo || '✨'}</span>
                    <span>${seller.name}</span>
                </a>
                <h3 class="card-title">
                    <a href="#/product/${product.id}">${product.name}</a>
                </h3>
                <div class="card-footer">
                    <span class="card-price">${formattedPrice}</span>
                    <button class="btn-khoj card-add-btn" data-product-id="${product.id}">
                        + khoj
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getCategoryEmoji(category) {
    switch (category) {
        case 'streetwear': return '👕';
        case 'thrift': return '🧥';
        case 'accessories': return '💍';
        case 'totes': return '👜';
        case 'zines-prints': return '🎨';
        default: return '📦';
    }
}

function CartDrawer() {
    const cartItems = store.cart;
    const cartCount = store.getCartCount();
    const cartTotal = store.getCartTotal();
    const shippingCost = cartCount > 0 ? 150 : 0;
    const grandTotal = cartTotal + shippingCost;
   
    return `
        <div id="cart-drawer" class="cart-drawer-overlay">
            <div id="cart-drawer-backdrop" class="cart-drawer-backdrop"></div>
            <div class="cart-drawer-content">
                <div class="cart-drawer-header">
                    <h2 class="drawer-title">
                        <span>khazana bag</span>
                        <span class="sticker pink drawer-badge">${cartCount} items</span>
                    </h2>
                    <button id="cart-close-btn" class="drawer-close-btn">✕</button>
                </div>
                <div class="cart-drawer-body">
                    ${cartItems.length === 0 ? `
                        <div class="cart-empty-state">
                            <div class="empty-emoji">👀</div>
                            <h3>cart's empty, go find something good</h3>
                            <p>your sandook is empty. head back to the explore page to dig up some cool finds.</p>
                            <a href="#/explore" class="btn-khoj empty-cta-btn">explore finds</a>
                        </div>
                    ` : `
                        <div class="cart-items-list">
                            ${cartItems.map(item => `
                                <div class="cart-item">
                                    <div class="cart-item-visual" style="background: ${item.product.gradient}">
                                        ${getCategoryEmoji(item.product.category)}
                                    </div>
                                    <div class="cart-item-info">
                                        <h4 class="cart-item-title">${item.product.name}</h4>
                                        <div class="cart-item-meta">size: ${item.selectedSize}</div>
                                        <div class="cart-item-price">Rs. ${item.product.price.toLocaleString()}</div>
                                        <div class="cart-item-actions">
                                            <div class="qty-controls">
                                                <button class="qty-btn dec-qty" data-product-id="${item.product.id}" data-size="${item.selectedSize}">-</button>
                                                <span class="qty-val">${item.quantity}</span>
                                                <button class="qty-btn inc-qty" data-product-id="${item.product.id}" data-size="${item.selectedSize}">+</button>
                                            </div>
                                            <button class="cart-item-remove-btn remove-item" data-product-id="${item.product.id}" data-size="${item.selectedSize}">remove</button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
                ${cartItems.length > 0 ? `
                    <div class="cart-drawer-footer">
                        <div class="cart-summary-row">
                            <span>subtotal</span>
                            <span class="summary-value">Rs. ${cartTotal.toLocaleString()}</span>
                        </div>
                        <div class="cart-summary-row">
                            <span>shipping (flat rate)</span>
                            <span class="summary-value">Rs. ${shippingCost}</span>
                        </div>
                        <div class="cart-divider"></div>
                        <div class="cart-summary-row grand-total-row">
                            <span>total amount</span>
                            <span class="grand-total-val">Rs. ${grandTotal.toLocaleString()}</span>
                        </div>
                        <button id="checkout-btn" class="btn-khoj btn-blue checkout-btn">
                            proceed to checkout 🛒
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

CartDrawer.onMount = () => {
    const closeBtn = document.getElementById('cart-close-btn');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const checkoutBtn = document.getElementById('checkout-btn');
   
    const closeDrawer = () => {
        const drawer = document.getElementById('cart-drawer');
        if (drawer) drawer.classList.remove('open');
    };
   
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
   
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            closeDrawer();
            setTimeout(() => { navigate('/checkout'); }, 150);
        });
    }
   
    const body = document.querySelector('.cart-drawer-body');
    if (body) {
        body.addEventListener('click', (e) => {
            const decBtn = e.target.closest('.dec-qty');
            const incBtn = e.target.closest('.inc-qty');
            const removeBtn = e.target.closest('.remove-item');
           
            if (decBtn) store.updateQuantity(decBtn.dataset.productId, decBtn.dataset.size, -1);
            if (incBtn) store.updateQuantity(incBtn.dataset.productId, incBtn.dataset.size, 1);
            if (removeBtn) store.removeFromCart(removeBtn.dataset.productId, removeBtn.dataset.size);
        });
    }
};

/* ==========================================
   5. VIEW PAGES RENDERING (pages)
   ========================================== */

// --- HOME PAGE VIEW ---
function renderHome() {
    const featuredProducts = store.products.slice(0, 4);
   
    return `
        <div class="home-page-container">
            <section class="hero-section container">
                <div class="hero-content">
                    <div class="sticker yellow hero-sticker">🔥 new wave of local brands</div>
                    <h1 class="hero-title">
                        your funny friend's shop, <br>
                        but make it a <span class="highlight">khazana</span>.
                    </h1>
                    <p class="hero-subtitle">
                        no boring templates. no corporate jargon. just pure curated finds, local streetwear, and 1-of-1 thrifted gems from across pakistan.
                    </p>
                    <div class="hero-ctas">
                        <a href="#/explore" class="btn-khoj btn-blue hero-primary-btn">start digging 🔎</a>
                        <a href="#/explore" class="btn-khoj hero-secondary-btn">fresh drops ⚡</a>
                    </div>
                </div>
               
                <div class="hero-graphic-collage">
                    <div class="collage-item collage-card-1" style="background: linear-gradient(45deg, #EC4899 0%, #F59E0B 100%);">
                        <span class="collage-emoji">🧥</span>
                        <div class="collage-sticker pink">retro fits</div>
                    </div>
                    <div class="collage-item collage-card-2" style="background: linear-gradient(45deg, #3B82F6 0%, #10B981 100%);">
                        <span class="collage-emoji">💍</span>
                        <div class="collage-sticker yellow">chunky challas</div>
                    </div>
                </div>
            </section>

            <section class="categories-section container">
                <h2 class="section-title">
                    <span>dig through the sandook</span>
                    <span class="title-sub">explore items by category</span>
                </h2>
                <div class="categories-grid">
                    ${categories.map(cat => `
                        <div class="category-card" data-category-id="${cat.id}">
                            <div class="cat-icon">${cat.icon}</div>
                            <h3 class="cat-name">${cat.name}</h3>
                            <p class="cat-desc">${cat.description}</p>
                            <span class="sticker yellow cat-tag">explore →</span>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="featured-section container">
                <div class="section-header-flex">
                    <h2 class="section-title">
                        <span>freshly dug up</span>
                        <span class="title-sub">what everyone's into right now</span>
                    </h2>
                    <a href="#/explore" class="btn-khoj btn-pink view-all-btn">see all finds 👀</a>
                </div>
                <div class="products-grid">
                    ${featuredProducts.map((prod, idx) => ProductCard(prod, idx)).join('')}
                </div>
            </section>
           
            <section class="stats-banner-section container">
                <div class="stats-card">
                    <div class="stat-item">
                        <span class="stat-number">50+</span>
                        <span class="stat-label">local IG thrift pages</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">100%</span>
                        <span class="stat-label">hand-inspected finds</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">0</span>
                        <span class="stat-label">corporate vibes</span>
                    </div>
                </div>
            </section>
        </div>
    `;
}

renderHome.onMount = () => {
    const catCards = document.querySelectorAll('.category-card');
    catCards.forEach(card => {
        card.addEventListener('click', () => {
            const catId = card.dataset.categoryId;
            store.resetFilters();
            store.setCategoryFilter(catId);
            navigate('/explore');
        });
    });
   
    const addBtns = document.querySelectorAll('.card-add-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const productId = btn.dataset.productId;
            const product = store.products.find(p => p.id === productId);
            if (product) store.addToCart(product);
        });
    });
};

// --- EXPLORE VIEW ---
function renderExplore() {
    const filteredProducts = store.products.filter(prod => {
        if (store.searchQuery) {
            const query = store.searchQuery.toLowerCase();
            const seller = store.sellers[prod.sellerId] || { name: '' };
            const nameMatch = prod.name.toLowerCase().includes(query);
            const detailMatch = prod.details.toLowerCase().includes(query);
            const sellerMatch = seller.name.toLowerCase().includes(query);
            const categoryMatch = prod.category.toLowerCase().includes(query);
           
            if (!nameMatch && !detailMatch && !sellerMatch && !categoryMatch) return false;
        }
        if (store.selectedCategory && prod.category !== store.selectedCategory) return false;
        if (store.selectedCity && prod.location !== store.selectedCity) return false;
        if (prod.price < store.priceRange[0] || prod.price > store.priceRange[1]) return false;
        return true;
    });
   
    const cities = [...new Set(store.products.map(p => p.location))];
   
    return `
        <div class="explore-pagecontainer container">
            <div class="explore-header">
                <h1 class="page-title">
                    <span>dig the finds</span>
                    <span class="title-sub">explore items across independent local stores</span>
                </h1>
                ${store.searchQuery ? `
                    <div class="sticker yellow search-status-sticker">
                        searching for "${store.searchQuery}"
                        <button id="clear-search-btn" class="clear-search-btn">✕</button>
                    </div>
                ` : ''}
            </div>
           
            <div class="explore-layout">
                <aside class="filters-sidebar">
                    <div class="filter-group-header">
                        <h3>filters</h3>
                        <button id="reset-filters-btn" class="reset-filters-btn">clear all</button>
                    </div>
                    <div class="filter-section">
                        <h4>categories</h4>
                        <div class="filter-options-stack">
                            <button class="filter-tag-btn ${!store.selectedCategory ? 'active' : ''}" data-cat-id="all">all categories</button>
                            ${categories.map(cat => `
                                <button class="filter-tag-btn ${store.selectedCategory === cat.id ? 'active' : ''}" data-cat-id="${cat.id}">
                                    ${cat.icon} ${cat.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="filter-section">
                        <h4>max price (Rs.)</h4>
                        <div class="price-slider-container">
                            <input type="range" id="price-range-input" min="0" max="6000" step="100" value="${store.priceRange[1]}" class="slider-input">
                            <div class="price-labels">
                                <span>Rs. 0</span>
                                <span id="price-limit-label" class="sticker yellow price-limit-label">Rs. ${store.priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    <div class="filter-section">
                        <h4>location</h4>
                        <div class="filter-options-stack">
                            <button class="filter-tag-btn ${!store.selectedCity ? 'active' : ''}" data-city="all">pakistan (all)</button>
                            ${cities.map(city => `
                                <button class="filter-tag-btn ${store.selectedCity === city ? 'active' : ''}" data-city="${city}">📍 ${city}</button>
                            `).join('')}
                        </div>
                    </div>
                </aside>
               
                <main class="explore-products-area">
                    ${filteredProducts.length === 0 ? `
                        <div class="explore-empty-state">
                            <div class="empty-emoji">👀</div>
                            <h2>khoj came up empty, try something else</h2>
                            <p>nothing here yet. try clearing your search terms or picking another category filter.</p>
                            <button id="empty-reset-btn" class="btn-khoj btn-pink">reset all filters</button>
                        </div>
                    ` : `
                        <div class="products-grid">
                            ${filteredProducts.map((prod, idx) => ProductCard(prod, idx)).join('')}
                        </div>
                    `}
                </main>
            </div>
        </div>
    `;
}

renderExplore.onMount = () => {
    const clearSearchBtn = document.getElementById('clear-search-btn');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => { store.setSearchQuery(''); handleRouting(); });
    }

    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    const emptyResetBtn = document.getElementById('empty-reset-btn');
    const handleReset = () => { store.resetFilters(); handleRouting(); };
    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', handleReset);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', handleReset);
   
    const catBtns = document.querySelectorAll('[data-cat-id]');
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const catId = btn.dataset.catId;
            store.setCategoryFilter(catId === 'all' ? null : catId);
            handleRouting();
        });
    });

    const cityBtns = document.querySelectorAll('[data-city]');
    cityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const city = btn.dataset.city;
            store.setCityFilter(city === 'all' ? null : city);
            handleRouting();
        });
    });

    const priceInput = document.getElementById('price-range-input');
    if (priceInput) {
        priceInput.addEventListener('input', (e) => {
            const maxVal = parseInt(e.target.value);
            const label = document.getElementById('price-limit-label');
            if (label) label.textContent = `Rs. ${maxVal.toLocaleString()}`;
        });
        priceInput.addEventListener('change', (e) => {
            const maxVal = parseInt(e.target.value);
            store.setPriceFilter(0, maxVal);
            handleRouting();
        });
    }
   
    const addBtns = document.querySelectorAll('.card-add-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const productId = btn.dataset.productId;
            const product = store.products.find(p => p.id === productId);
            if (product) store.addToCart(product);
        });
    });
};

// --- PRODUCT DETAILS VIEW ---
function renderProductDetails({ id }) {
    const product = store.products.find(p => p.id === id);
    if (!product) {
        return `
            <div class="container error-container" style="max-width: 500px; margin: 80px auto; padding: 40px; text-align: center;">
                <h2>finding empty box 👀</h2>
                <p>couldn't find that item. it might have been sold out or deleted by the brand.</p>
                <a href="#/explore" class="btn-khoj" style="margin-top: 16px;">explore finds</a>
            </div>
        `;
    }
   
    const seller = store.sellers[product.sellerId] || { name: 'independent storefront', logo: '✨', city: 'pakistan', joined: 'recent', bio: 'independent merchant catalog.' };
    const formattedPrice = `Rs. ${product.price.toLocaleString()}`;
   
    return `
        <div class="product-details-container container">
            <a href="#/explore" class="back-link">← back to explores</a>
            <div class="details-layout">
                <div class="visual-pane" style="background: ${product.gradient};">
                    <div class="visual-pane-emoji">${getCategoryEmoji(product.category)}</div>
                    ${product.stickerText ? `
                        <div class="sticker ${product.stickerColor || 'yellow'} detail-pane-sticker">${product.stickerText}</div>
                    ` : ''}
                    <div class="visual-pane-location">📍 ${product.location}</div>
                </div>
                <div class="info-pane">
                    <a href="#/shop/${seller.id}" class="info-brand-tag">
                        <span class="brand-logo">${seller.logo}</span>
                        <span>${seller.name}</span>
                    </a>
                    <h1 class="info-title">${product.name}</h1>
                    <div class="info-rating-row">
                        <span class="rating-stars">⭐ ${product.rating.toFixed(1)}</span>
                        <span class="reviews-count">(${product.reviewsCount} reviews)</span>
                        <span class="status-divider">|</span>
                        <span class="condition-badge sticker green">${product.condition}</span>
                    </div>
                    <div class="info-price">${formattedPrice}</div>
                    <div class="info-description-card">
                        <h4>details:</h4>
                        <p>${product.details}</p>
                    </div>
                    <div class="size-selector-section">
                        <h4>select size:</h4>
                        <div class="size-options">
                            ${product.sizes.map((size, idx) => `
                                <label class="size-option-label">
                                    <input type="radio" name="product_size" value="${size}" ${idx === 0 ? 'checked' : ''}>
                                    <span class="size-btn-visual">${size}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    <button id="add-to-khazana-btn" class="btn-khoj btn-blue main-add-btn">add to khazana 👜</button>
                    <div class="seller-summary-card">
                        <div class="seller-card-header">
                            <div class="seller-avatar">${seller.logo}</div>
                            <div class="seller-meta">
                                <h3>${seller.name}</h3>
                                <p>📍 ${seller.city} • joined ${seller.joined}</p>
                            </div>
                        </div>
                        <p class="seller-card-bio">${seller.bio}</p>
                        <div class="seller-card-footer">
                            <span class="seller-followers">👥 ${(seller.followers || 0).toLocaleString()} followers</span>
                            <a href="#/shop/${seller.id}" class="btn-khoj btn-pink seller-visit-btn">visit storefront →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

renderProductDetails.onMount = (params) => {
    const addBtn = document.getElementById('add-to-khazana-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const product = store.products.find(p => p.id === params.id);
            if (product) {
                const checkedRadio = document.querySelector('input[name="product_size"]:checked');
                const selectedSize = checkedRadio ? checkedRadio.value : 'standard';
                store.addToCart(product, selectedSize);
            }
        });
    }
};

// --- STOREFRONT VIEW ---
function renderStorefront({ id }) {
    const seller = store.sellers[id];
    if (!seller) {
        return `
            <div class="container error-container" style="max-width: 500px; margin: 80px auto; padding: 40px; text-align: center;">
                <h2>brand not found 👀</h2>
                <p>we couldn't find that seller. they might have deactivated their sandook.</p>
                <a href="#/explore" class="btn-khoj" style="margin-top: 16px;">explore finds</a>
            </div>
        `;
    }
   
    const sellerProducts = store.products.filter(p => p.sellerId === id);
    const followList = JSON.parse(localStorage.getItem('khoj_followed') || '[]');
    const isActuallyFollowing = followList.includes(id);
    const followersDisplay = isActuallyFollowing ? seller.followers + 1 : seller.followers;
   
    return `
        <div class="storefront-page-container container">
            <a href="#/explore" class="back-link">← back to explores</a>
            <header class="storefront-header">
                <div class="storefront-banner" style="background: ${seller.bannerGradient};">
                    <div class="storefront-logo">${seller.logo}</div>
                </div>
                <div class="storefront-profile-details">
                    <div class="storefront-title-row">
                        <div class="title-meta-group">
                            <h1 class="storefront-name">${seller.name}</h1>
                            <div class="storefront-meta">
                                <span>📍 ${seller.city}</span>
                                <span class="dot">•</span>
                                <span>joined ${seller.joined}</span>
                                <span class="dot">•</span>
                                <a href="https://instagram.com" target="_blank" class="instagram-link">🔗 ${seller.instagram}</a>
                            </div>
                        </div>
                        <button id="follow-brand-btn" class="btn-khoj ${isActuallyFollowing ? 'btn-green' : 'btn-pink'} follow-btn">
                            ${isActuallyFollowing ? 'following ✓' : 'follow brand 👥'}
                        </button>
                    </div>
                    <p class="storefront-bio">${seller.bio}</p>
                    <div class="storefront-stats-ribbon">
                        <span class="sticker yellow stat-badge">👥 ${followersDisplay.toLocaleString()} followers</span>
                        <span class="sticker blue stat-badge">📦 ${sellerProducts.length} items listed</span>
                    </div>
                </div>
            </header>
           
            <main class="storefront-products-section">
                <h2 class="section-title">
                    <span>shop catalog</span>
                    <span class="title-sub">finds listed by ${seller.name}</span>
                </h2>
                ${sellerProducts.length === 0 ? `
                    <div class="storefront-empty-state">
                        <h3>nothing listed right now!</h3>
                        <p>check back soon. this brand is cooking up a new drop.</p>
                    </div>
                ` : `
                    <div class="products-grid">
                        ${sellerProducts.map((prod, idx) => ProductCard(prod, idx)).join('')}
                    </div>
                `}
            </main>
        </div>
    `;
}

renderStorefront.onMount = (params) => {
    const followBtn = document.getElementById('follow-brand-btn');
    if (followBtn) {
        followBtn.addEventListener('click', () => {
            const sellerId = params.id;
            const followList = JSON.parse(localStorage.getItem('khoj_followed') || '[]');
            if (followList.includes(sellerId)) {
                const index = followList.indexOf(sellerId);
                followList.splice(index, 1);
                localStorage.setItem('khoj_followed', JSON.stringify(followList));
                store.showToast(`unfollowed "${store.sellers[sellerId].name}"`);
            } else {
                followList.push(sellerId);
                localStorage.setItem('khoj_followed', JSON.stringify(followList));
                store.showToast(`following "${store.sellers[sellerId].name}"! 👥`);
            }
            handleRouting();
        });
    }
   
    const addBtns = document.querySelectorAll('.card-add-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const productId = btn.dataset.productId;
            const product = store.products.find(p => p.id === productId);
            if (product) store.addToCart(product);
        });
    });
};

// --- CHECKOUT VIEW ---
function renderCheckout() {
    const cartItems = store.cart;
    const cartCount = store.getCartCount();
    const cartTotal = store.getCartTotal();
    const shippingCost = cartCount > 0 ? 150 : 0;
    const grandTotal = cartTotal + shippingCost;
   
    if (cartItems.length === 0) {
        return `
            <div class="checkout-empty-container container" style="max-width: 500px; margin: 80px auto; padding: 40px; border: var(--border-width) solid var(--color-border); box-shadow: var(--shadow-flat); border-radius: var(--border-radius-md); background: white; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 16px;">👜</div>
                <h2 style="font-family: var(--font-heading); margin-bottom: 12px; font-weight: 800;">your khazana bag is empty!</h2>
                <p style="margin-bottom: 20px;">you can't checkout with nothing. go explore some cool 1-of-1 finds first.</p>
                <a href="#/explore" class="btn-khoj">go find things</a>
            </div>
        `;
    }
   
    return `
        <div class="checkout-page-container container">
            <h1 class="checkout-page-title">secure checkout</h1>
            <div class="checkout-layout">
                <form id="checkout-form" class="checkout-form-box">
                    <h2 class="form-section-title">1. delivery details</h2>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="co-name">full name</label>
                            <input type="text" id="co-name" class="input-khoj" placeholder="e.g. mazin ali" value="${defaultUserProfile.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="co-phone">phone number</label>
                            <input type="tel" id="co-phone" class="input-khoj" placeholder="e.g. 03001234567" value="${defaultUserProfile.phone}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="co-address">complete shipping address</label>
                        <input type="text" id="co-address" class="input-khoj" placeholder="house number, street name, area/sector" value="${defaultUserProfile.addresses[0].text}" required>
                    </div>
                    <div class="form-group">
                        <label for="co-city">city</label>
                        <select id="co-city" class="input-khoj city-select">
                            <option value="karachi" selected>Karachi</option>
                            <option value="lahore">Lahore</option>
                            <option value="islamabad">Islamabad</option>
                            <option value="rawalpindi">Rawalpindi</option>
                            <option value="peshawar">Peshawar</option>
                            <option value="multan">Multan</option>
                            <option value="faisalabad">Faisalabad</option>
                        </select>
                    </div>
                    <h2 class="form-section-title" style="margin-top: 24px;">2. payment option</h2>
                    <div class="payment-options-grid">
                        <label class="payment-card-option">
                            <input type="radio" name="co_payment" value="cod" checked>
                            <div class="pay-card-details">
                                <span class="pay-emoji">💸</span>
                                <span class="pay-name">cash on delivery (COD)</span>
                                <span class="pay-sub">pay cash at your doorstep</span>
                            </div>
                        </label>
                        <label class="payment-card-option">
                            <input type="radio" name="co_payment" value="easypaisa">
                            <div class="pay-card-details">
                                <span class="pay-emoji">📱</span>
                                <span class="pay-name">easypaisa / jazzcash</span>
                                <span class="pay-sub">transfer details sent on placement</span>
                            </div>
                        </label>
                    </div>
                    <button type="submit" class="btn-khoj btn-blue place-order-btn">
                        complete purchase (Rs. ${grandTotal.toLocaleString()})
                    </button>
                </form>
               
                <aside class="checkout-summary-box">
                    <h2 class="summary-section-title">order summary</h2>
                    <div class="summary-items-list">
                        ${cartItems.map(item => `
                            <div class="summary-item-row">
                                <div class="sum-item-visual" style="background: ${item.product.gradient};">
                                    <span>${getCategoryEmoji(item.product.category)}</span>
                                </div>
                                <div class="sum-item-meta">
                                    <h4 class="sum-item-name">${item.product.name}</h4>
                                    <span class="sum-item-qty">qty: ${item.quantity} • size: ${item.selectedSize}</span>
                                </div>
                                <span class="sum-item-price">Rs. ${(item.product.price * item.quantity).toLocaleString()}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="summary-breakdowns">
                        <div class="sum-breakdown-row">
                            <span>subtotal</span>
                            <span>Rs. ${cartTotal.toLocaleString()}</span>
                        </div>
                        <div class="sum-breakdown-row">
                            <span>shipping (flat rate)</span>
                            <span>Rs. ${shippingCost}</span>
                        </div>
                        <div class="summary-flat-divider"></div>
                        <div class="sum-breakdown-row grand-total-row">
                            <span>total due</span>
                            <span class="sum-grand-price">Rs. ${grandTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    `;
}

renderCheckout.onMount = () => {
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('co-name').value.trim();
            const phone = document.getElementById('co-phone').value.trim();
            const address = document.getElementById('co-address').value.trim();
            const city = document.getElementById('co-city').value;
            const paymentMethod = document.querySelector('input[name="co_payment"]:checked').value;
           
            const shippingDetails = { name, phone, address, city };
            const orderId = store.createOrder(shippingDetails, paymentMethod);
            navigate(`/order-success/${orderId}`);
        });
    }
};

// --- ORDER SUCCESS VIEW ---
function renderOrderSuccess({ id }) {
    const order = store.orders.find(o => o.id === id);
    if (!order) {
        return `
            <div class="container error-container" style="max-width: 500px; margin: 80px auto; padding: 40px; text-align: center;">
                <h2>finding missing parcel 👀</h2>
                <p>couldn't locate this order detail record. it might still be generating in the background.</p>
                <a href="#/explore" class="btn-khoj">explore finds</a>
            </div>
        `;
    }
   
    const trackingSteps = [
        { label: 'order placed', done: true },
        { label: 'processing', done: order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' },
        { label: 'dispatched', done: order.status === 'shipped' || order.status === 'delivered' },
        { label: 'delivered', done: order.status === 'delivered' }
    ];
   
    return `
        <div class="order-success-page-container container">
            <div class="success-card">
                <div class="sticker green success-sticker">🎉 khoj complete!</div>
                <h1 class="success-title">your package is on its way</h1>
                <p class="success-subtitle">we've notified the brand(s). they're packing up your vintage/handcrafted finds right now.</p>
                <div class="order-id-ribbon">
                    <span>Order Reference:</span>
                    <strong class="order-id-text">${order.id}</strong>
                </div>
                <div class="tracking-pipeline-container">
                    <h3 class="track-title">parcel timeline</h3>
                    <div class="pipeline-track">
                        ${trackingSteps.map((step, idx) => `
                            <div class="pipeline-step ${step.done ? 'active' : ''}">
                                <div class="step-dot">${step.done ? '✓' : idx + 1}</div>
                                <span class="step-label">${step.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="specs-grid">
                    <div class="specs-box">
                        <h4>delivering to:</h4>
                        <p><strong>${order.shippingDetails.name}</strong></p>
                        <p>${order.shippingDetails.address}</p>
                        <p>${order.shippingDetails.city} • ${order.shippingDetails.phone}</p>
                    </div>
                    <div class="specs-box">
                        <h4>payment:</h4>
                        <p>method: <strong>${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Easypaisa / Jazzcash'}</strong></p>
                        <p>total: <strong>Rs. ${order.total.toLocaleString()}</strong></p>
                    </div>
                </div>
                <div class="success-ctas">
                    <a href="#/explore" class="btn-khoj btn-blue">keep digging finds</a>
                    <a href="#/account" class="btn-khoj success-secondary-btn">view all orders</a>
                </div>
            </div>
        </div>
    `;
}

// --- USER ACCOUNT VIEW ---
function renderAccount() {
    const user = defaultUserProfile;
    const userOrders = store.orders;
   
    return `
        <div class="account-page-container container">
            <h1 class="page-title">my profile</h1>
            <div class="account-layout">
                <aside class="profile-sidebar">
                    <div class="profile-card">
                        <div class="profile-avatar">👨‍💻</div>
                        <h2 class="profile-name">${user.name}</h2>
                        <p class="profile-email">${user.email}</p>
                        <p class="profile-phone">${user.phone}</p>
                    </div>
                    <div class="addresses-card">
                        <h3>saved addresses</h3>
                        <div class="address-item">
                            <span class="address-label">🏠 home</span>
                            <p class="address-text">${user.addresses[0].text}</p>
                        </div>
                    </div>
                    <div class="sandbox-card">
                        <h3>sandbox settings</h3>
                        <p class="sandbox-info">running on browser local storage. you can reset the collections to seed defaults here.</p>
                        <button id="reset-db-btn" class="btn-khoj btn-pink reset-db-btn">reset database ⚡</button>
                    </div>
                </aside>
               
                <main class="orders-history-area">
                    <h2 class="section-title">
                        <span>order history</span>
                        <span class="title-sub">track your finds and orders</span>
                    </h2>
                    ${userOrders.length === 0 ? `
                        <div class="orders-empty-state">
                            <span class="empty-emoji">👀</span>
                            <h3>you haven't placed any orders yet</h3>
                            <p>fill up your sandook with local brand designs and complete a checkout to see orders here.</p>
                            <a href="#/explore" class="btn-khoj">browse items</a>
                        </div>
                    ` : `
                        <div class="orders-list-stack">
                            ${userOrders.map(order => {
                                const statusColor = order.status === 'delivered' ? 'green' : order.status === 'shipped' ? 'blue' : 'yellow';
                                return `
                                    <div class="order-row-card">
                                        <div class="order-row-header">
                                            <div class="order-header-info">
                                                <a href="#/order-success/${order.id}" class="ord-ref-num">${order.id}</a>
                                                <span class="ord-date">Placed: ${order.date}</span>
                                            </div>
                                            <span class="sticker ${statusColor} ord-status-sticker">${order.status}</span>
                                        </div>
                                        <div class="order-row-body">
                                            ${order.items.map(item => `
                                                <div class="order-product-item">
                                                    <div>
                                                        <span class="ord-prod-name">${item.productName}</span>
                                                        <span class="ord-prod-qty">(${item.selectedSize}) x ${item.quantity}</span>
                                                    </div>
                                                    <span class="ord-prod-price">Rs. ${(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                        <div class="order-row-footer">
                                            <div>
                                                <span class="ord-total-label">total order: </span>
                                                <strong class="ord-total-val">Rs. ${order.total.toLocaleString()}</strong>
                                            </div>
                                            <a href="#/order-success/${order.id}" class="track-link">track parcel →</a>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `}
                </main>
            </div>
        </div>
    `;
}

renderAccount.onMount = () => {
    const resetBtn = document.getElementById('reset-db-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm("⚠️ are you sure you want to clear your local storage changes and reset the app back to seed mock data?")) {
                localStorage.clear();
                window.location.reload();
            }
        });
    }
};

// --- SELLER APPLY VIEW ---
function renderSellerApply() {
    return `
        <div class="seller-apply-container container" style="max-width: 600px; margin: 40px auto; padding-bottom: 60px;">
            <div class="apply-card">
                <div class="sticker yellow apply-sticker">🏪 start trading on khoj</div>
                <h1 class="apply-title">claim your sandook storefront</h1>
                <p class="apply-subtitle">skip the generic web builders. list your thrifted items, handmade jewelry, or local clothing drops in front of pakistan's Gen-Z. no monthly fees.</p>
                <form id="seller-apply-form" class="apply-form-element">
                    <div class="form-group">
                        <label for="app-brand">brand name</label>
                        <input type="text" id="app-brand" class="input-khoj" placeholder="e.g. Vibe Vintage" required>
                    </div>
                    <div class="form-group">
                        <label for="app-owner">your full name</label>
                        <input type="text" id="app-owner" class="input-khoj" placeholder="e.g. Zainab Ali" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="app-city">base city</label>
                            <input type="text" id="app-city" class="input-khoj" placeholder="e.g. lahore" required>
                        </div>
                        <div class="form-group">
                            <label for="app-ig">instagram handle</label>
                            <input type="text" id="app-ig" class="input-khoj" placeholder="e.g. @vibevintage.pk" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="app-bio">store bio (what do you sell?)</label>
                        <textarea id="app-bio" class="input-khoj textarea-khoj" placeholder="briefly describe your product catalog drops, aesthetics, and values..." rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn-khoj btn-blue submit-apply-btn">submit storefront application 🚀</button>
                </form>
            </div>
        </div>
    `;
}

renderSellerApply.onMount = () => {
    const form = document.getElementById('seller-apply-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!store.currentUser) {
                store.showToast('log in first to apply as a seller', 'info');
                navigate('/login');
                return;
            }

            const brandName = document.getElementById('app-brand').value.trim();
            const ownerName = document.getElementById('app-owner').value.trim();
            const city = document.getElementById('app-city').value.trim().toLowerCase();
            const instagram = document.getElementById('app-ig').value.trim();
            const bio = document.getElementById('app-bio').value.trim();

            const { error } = await supabase.from('seller_applications').insert({
                applicant_id: store.currentUser.id,
                brand_name: brandName,
                owner_name: ownerName,
                city, instagram, bio
            });

            if (error) { store.showToast('application failed, try again', 'error'); return; }

            store.showToast('🎉 application submitted! an admin will review it soon.');
            navigate('/');
        });
    }
};

// --- SELLER DASHBOARD VIEW ---
function renderSellerDashboard() {
    const sellerId = store.mySellerId;
    const sellerProfile = store.mySeller || { name: 'my store', logo: '⚡', city: '' };
    if (!sellerProfile.logo) sellerProfile.logo = '⚡';    const sellerProducts = store.products.filter(p => p.seller_id === sellerId);    const sellerOrders = store.orders.filter(order => order.items.some(item => item.sellerId === sellerId));
    const fulfilledOrders = sellerOrders.filter(o => o.status === 'delivered');
    const revenue = fulfilledOrders.reduce((sum, order) => {
        const sellerItemsSum = order.items
            .filter(item => item.sellerId === sellerId)
            .reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
        return sum + sellerItemsSum;
    }, 0);
   
    return `
        <div class="seller-dashboard-container container">
            <header class="dashboard-header">
                <div class="dashboard-title-group">
                    <h1 class="page-title">
                        <span>seller console</span>
                        <span class="title-sub">manage your sandook storefront: <strong>${sellerProfile.name}</strong></span>
                    </h1>
                </div>
                <div class="seller-badge-circle">${sellerProfile.logo}</div>
            </header>
            <div class="analytics-row">
                <div class="analytics-card">
                    <span class="anal-label">total revenue</span>
                    <h2 class="anal-value">Rs. ${revenue.toLocaleString()}</h2>
                    <span class="anal-sub">from completed orders</span>
                </div>
                <div class="analytics-card">
                    <span class="anal-label">listed items</span>
                    <h2 class="anal-value">${sellerProducts.length}</h2>
                    <span class="anal-sub">active listings in catalog</span>
                </div>
                <div class="analytics-card">
                    <span class="anal-label">orders received</span>
                    <h2 class="anal-value">${sellerOrders.length}</h2>
                    <span class="anal-sub">all incoming requests</span>
                </div>
            </div>
           
            <div class="dashboard-layout-split">
                <section class="dashboard-main-section">
                    <div class="dashboard-panel-card">
                        <div class="panel-header-row">
                            <h3>my active listings</h3>
                            <button id="show-add-modal-btn" class="btn-khoj btn-blue list-add-trigger">+ list new find</button>
                        </div>
                        <div class="listings-table-container">
                            ${sellerProducts.length === 0 ? `
                                <div class="table-empty-state"><p>you have no active listings. click "+ list new find" to add one!</p></div>
                            ` : `
                                <table class="dashboard-table">
                                    <thead>
                                        <tr>
                                            <th>item</th>
                                            <th>category</th>
                                            <th>price</th>
                                            <th>condition</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${sellerProducts.map(p => `
                                            <tr>
                                                <td class="bold-cell">${p.name}</td>
                                                <td>${p.category}</td>
                                                <td class="bold-cell">Rs. ${p.price.toLocaleString()}</td>
                                                <td><span class="sticker green table-sticker">${p.condition}</span></td>
                                                <td><button class="btn-khoj btn-pink delete-listing-btn" data-prod-id="${p.id}">delete</button></td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            `}
                        </div>
                    </div>
                   
                    <div class="dashboard-panel-card" style="margin-top: 28px;">
                        <h3>incoming orders queue</h3>
                        <div class="listings-table-container">
                            ${sellerOrders.length === 0 ? `
                                <div class="table-empty-state"><p>no orders received yet. when buyers purchase your listings, they will show up here.</p></div>
                            ` : `
                                <table class="dashboard-table">
                                    <thead>
                                        <tr>
                                            <th>order ID</th>
                                            <th>customer</th>
                                            <th>items ordered</th>
                                            <th>status</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${sellerOrders.map(order => {
                                            const sellerItems = order.items.filter(i => i.sellerId === sellerId);
                                            const statusClass = order.status === 'delivered' ? 'green' : order.status === 'shipped' ? 'blue' : 'yellow';
                                            let actionBtnHTML = '';
                                            if (order.status === 'processing') {
                                                actionBtnHTML = `<button class="btn-khoj btn-blue status-update-btn" data-ord-id="${order.id}" data-next-status="shipped">mark dispatched 🚚</button>`;
                                            } else if (order.status === 'shipped') {
                                                actionBtnHTML = `<button class="btn-khoj btn-green status-update-btn" data-ord-id="${order.id}" data-next-status="delivered">mark delivered ✓</button>`;
                                            } else {
                                                actionBtnHTML = `<span style="font-size: 0.8rem; font-weight: 700; color: green;">completed ✓</span>`;
                                            }
                                            return `
                                                <tr>
                                                    <td class="bold-cell">${order.id}</td>
                                                    <td>
                                                        <div style="font-weight: 700;">${order.shippingDetails.name}</div>
                                                        <div style="font-size: 0.75rem; color: #666;">${order.shippingDetails.city} • ${order.shippingDetails.phone}</div>
                                                    </td>
                                                    <td>
                                                        ${sellerItems.map(item => `
                                                            <div style="font-size: 0.8rem;">${item.productName} <strong>(x${item.quantity})</strong></div>
                                                        `).join('')}
                                                    </td>
                                                    <td><span class="sticker ${statusClass} table-sticker">${order.status}</span></td>
                                                    <td>${actionBtnHTML}</td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            `}
                        </div>
                    </div>
                </section>
            </div>
           
            <div id="add-listing-modal" class="modal-overlay">
                <div class="modal-backdrop"></div>
                <div class="modal-content-box">
                    <div class="modal-header">
                        <h2>list a new find</h2>
                        <button id="close-modal-btn" class="modal-close-btn">✕</button>
                    </div>
                    <form id="add-product-form" class="modal-form">
                        <div class="form-group">
                            <label for="prod-name">product title</label>
                            <input type="text" id="prod-name" class="input-khoj" placeholder="e.g. vintage oversized graphic t-shirt" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="prod-price">price (Rs.)</label>
                                <input type="number" id="prod-price" class="input-khoj" placeholder="e.g. 1800" min="0" required>
                            </div>
                            <div class="form-group">
                                <label for="prod-cat">category</label>
                                <select id="prod-cat" class="input-khoj">
                                    <option value="streetwear">gully wear</option>
                                    <option value="thrift">retro thrift</option>
                                    <option value="accessories">accessories</option>
                                    <option value="totes">bags & totes</option>
                                    <option value="zines-prints">zines & art</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="prod-condition">item condition</label>
                                <input type="text" id="prod-condition" class="input-khoj" placeholder="e.g. brand new / vintage preloved" required>
                            </div>
                            <div class="form-group">
                                <label for="prod-sizes">available sizes (comma separated)</label>
                                <input type="text" id="prod-sizes" class="input-khoj" placeholder="e.g. S, M, L" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="prod-details">product details & description</label>
                            <textarea id="prod-details" class="input-khoj textarea-khoj" placeholder="describe the fabric weight, vintage washing, exact sizing fits..." rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="prod-image">product photo</label>
                            <input type="file" id="prod-image" accept="image/*" class="input-khoj">
                        </div>
                        <button type="submit" class="btn-khoj btn-blue modal-submit-btn">launch listing live 🚀</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

renderSellerDashboard.onMount = () => {
    const showModalBtn = document.getElementById('show-add-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('add-listing-modal');
    const addProductForm = document.getElementById('add-product-form');
   
    const openModal = () => modal.classList.add('open');
    const closeModal = () => modal.classList.remove('open');
    if (showModalBtn) showModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
   
    if (addProductForm) {
        addProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!store.mySellerId) {
                store.showToast('seller account not found, try logging out and back in', 'error');
                return;
            }

            const name = document.getElementById('prod-name').value.trim();
            const price = parseInt(document.getElementById('prod-price').value);
            const category = document.getElementById('prod-cat').value;
            const condition = document.getElementById('prod-condition').value.trim();
            const sizesRaw = document.getElementById('prod-sizes').value;
            const details = document.getElementById('prod-details').value.trim();
            const sizes = sizesRaw.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
            const location = 'karachi';

            const imageFile = document.getElementById('prod-image').files[0];
            let imageUrl = null;

            if (imageFile) {
                const fileName = `${Date.now()}-${imageFile.name}`;
                const { error: uploadErr } = await supabase.storage.from('product-images').upload(fileName, imageFile);
                if (uploadErr) {
                    store.showToast('image upload failed, try a smaller photo', 'error');
                    return;
                }
                const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
                imageUrl = urlData.publicUrl;
            }

            const { error } = await supabase.from('products').insert({
                seller_id: store.mySellerId,
                name, price, category, condition, sizes, details, location,
                image_url: imageUrl
            });

            if (error) { store.showToast('failed to list product', 'error'); return; }

            store.showToast(`"${name}" is now live! 📦`);
            await store.loadProductsFromSupabase();
            closeModal();
            addProductForm.reset();
            handleRouting();
        });
    }
   
    const deleteBtns = document.querySelectorAll('.delete-listing-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prodId = btn.dataset.prodId;
            if (confirm("⚠️ are you sure you want to delete this listing from catalog?")) {
                store.deleteProduct(prodId);
                handleRouting();
            }
        });
    });
   
    const statusBtns = document.querySelectorAll('.status-update-btn');
    statusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const orderId = btn.dataset.ordId;
            const nextStatus = btn.dataset.nextStatus;
            store.updateOrderStatus(orderId, nextStatus);
            handleRouting();
        });
    });
};

// --- ADMIN DASHBOARD VIEW ---
async function renderAdminDashboard() {
    const { data: apps } = await supabase.from('seller_applications').select('*');
    const products = store.products;
    const activeSellersCount = Object.keys(store.sellers).length;
    const totalEarnings = store.orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.subtotal, 0);
   
    return `
        <div class="admin-dashboard-container container">
            <header class="dashboard-header">
                <h1 class="page-title">
                    <span>admin console</span>
                    <span class="title-sub">moderation panel & platform metrics</span>
                </h1>
                <div class="admin-badge">🛡️ system admin</div>
            </header>
           
            <div class="analytics-row">
                <div class="analytics-card">
                    <span class="anal-label">platform GMV</span>
                    <h2 class="anal-value">Rs. ${totalEarnings.toLocaleString()}</h2>
                    <span class="anal-sub">completed checkout sales</span>
                </div>
                <div class="analytics-card">
                    <span class="anal-label">active shops</span>
                    <h2 class="anal-value">${activeSellersCount}</h2>
                    <span class="anal-sub">approved seller storefronts</span>
                </div>
                <div class="analytics-card">
                    <span class="anal-label">active listings</span>
                    <h2 class="anal-value">${products.length}</h2>
                    <span class="anal-sub">items available in catalog</span>
                </div>
            </div>
           
            <div class="dashboard-split-panels">
                <div class="admin-panel-card">
                    <h3>storefront applications</h3>
                    <p class="panel-subtext">review pending requests from instagram pages to start selling.</p>
                    <div class="table-container">
                        ${apps.length === 0 ? `
                            <div class="empty-placeholder">no application requests submitted.</div>
                        ` : `
                            <table class="admin-table">
                                <thead>
                                    <tr>
                                        <th>brand / owner</th>
                                        <th>socials</th>
                                        <th>pitch / bio</th>
                                        <th>status</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   ${apps.map(app => {
                                       const isPending = app.status === 'pending';
                                       const statusClass = app.status === 'approved' ? 'green' : app.status === 'rejected' ? 'pink' : 'yellow';
                                       return `
                                            <tr>
                                                <td class="bold-cell">
                                                    <div>${app.brand_name}</div>
                                                    <span style="font-size: 0.75rem; color: #666; font-weight: 500;">👤 ${app.owner_name} • ${app.city}</span>
                                                </td>
                                                <td><a href="https://instagram.com" target="_blank" class="ig-link">${app.instagram}</a></td>
                                                <td style="font-size: 0.8rem; line-height: 1.4; max-width: 200px;">${app.bio}</td>
                                                <td><span class="sticker ${statusClass} table-sticker">${app.status}</span></td>
                                                <td>
                                                    ${isPending ? `
                                                        <div class="action-buttons-group">
                                                            <button class="btn-khoj btn-green app-action-btn" data-app-id="${app.id}" data-action="approved">approve</button>
                                                            <button class="btn-khoj btn-pink app-action-btn" data-app-id="${app.id}" data-action="rejected">reject</button>
                                                        </div>
                                                    ` : `<span style="font-size: 0.8rem; font-weight: 700; color: #555;">moderated</span>`}
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
               
                <div class="admin-panel-card" style="margin-top: 28px;">
                    <h3>flag & moderate products</h3>
                    <p class="panel-subtext">remove inappropriate listings or duplicate items from the catalog database.</p>
                    <div class="table-container">
                        ${products.length === 0 ? `
                            <div class="empty-placeholder">no products active in catalog.</div>
                        ` : `
                            <table class="admin-table">
                                <thead>
                                    <tr>
                                        <th>product</th>
                                        <th>seller account</th>
                                        <th>price</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${products.map(p => `
                                        <tr>
                                            <td class="bold-cell">${p.name}</td>
                                            <td>${p.sellerId}</td>
                                            <td class="bold-cell">Rs. ${p.price.toLocaleString()}</td>
                                            <td><button class="btn-khoj btn-pink flag-btn" data-prod-id="${p.id}">flag & delete</button></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;
}

renderAdminDashboard.onMount = () => {
    const appBtns = document.querySelectorAll('.app-action-btn');
    appBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const appId = btn.dataset.appId;
            const action = btn.dataset.action;
            if (!confirm(`are you sure you want to ${action === 'approved' ? 'approve' : 'reject'} this brand storefront application?`)) return;

            const { data: app } = await supabase.from('seller_applications').select('*').eq('id', appId).single();

            await supabase.from('seller_applications').update({ status: action }).eq('id', appId);

            if (action === 'approved') {
                const { error: sellerErr } = await supabase.from('sellers').insert({
                    owner_id: app.applicant_id,
                    name: app.brand_name,
                    city: app.city,
                    bio: app.bio,
                    instagram: app.instagram
                });
                if (sellerErr) console.log('seller insert error:', sellerErr);

                const { error: roleErr } = await supabase.from('profiles').update({ role: 'seller' }).eq('id', app.applicant_id);
                if (roleErr) console.log('role update error:', roleErr);
            }

            handleRouting();
        });
    });
   
    const flagBtns = document.querySelectorAll('.flag-btn');
    flagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prodId = btn.dataset.prodId;
            if (confirm("⚠️ are you sure you want to flag and delete this listing? it will be permanently removed from the website catalog.")) {
                store.deleteProduct(prodId);
                handleRouting();
            }
        });
    });
};

/* ==========================================
   6. APP INITIALIZATION & LIFE BOOTSTRAP
   ========================================== */
function renderGlobalShell() {
    const headerRoot = document.getElementById('header-root');
    if (headerRoot) {
        headerRoot.innerHTML = Navbar();
        Navbar.onMount();
    }
    const cartRoot = document.getElementById('cart-drawer-root');
    if (cartRoot) {
        cartRoot.innerHTML = CartDrawer();
        CartDrawer.onMount();
    }
}

function initToastSystem() {
    const toastRoot = document.getElementById('toast-root');
    store.subscribeToToasts((message, type) => {
        if (!toastRoot) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const emoji = type === 'info' ? '💡' : type === 'success' ? '🎉' : '✨';
        toast.innerHTML = `<span class="toast-emoji">${emoji}</span><span class="toast-message">${message}</span>`;
        toastRoot.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('removing');
            toast.addEventListener('animationend', () => { toast.remove(); });
        }, 2800);
    });
}

async function bootstrap() {
    renderGlobalShell();
    initToastSystem();
    store.subscribe(() => { renderGlobalShell(); });
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('DOMContentLoaded', handleRouting);
    await store.loadProductsFromSupabase();
    await store.loadCurrentUser();
    handleRouting();
}

bootstrap();