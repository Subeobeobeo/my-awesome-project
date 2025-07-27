document.addEventListener('DOMContentLoaded', function() {
    // --- State Management ---
    const state = {
        exp: 150,
        maxExp: 1000,
        savedAlerts: []
    };

    // --- DOM Elements ---
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-btn');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close-btn');

    // --- Navigation ---
    function navigateTo(screenId) {
        screens.forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        navButtons.forEach(b => {
            b.classList.toggle('active', b.dataset.target === screenId);
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            if (target && target !== '#') {
                navigateTo(target);
            }
        });
    });
    
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', () => navigateTo(button.dataset.target));
    });

    // --- Modal/Popup Logic ---
    function showModal(modalId) {
        document.getElementById(modalId).classList.add('show');
    }

    function hideModals() {
        modals.forEach(m => m.classList.remove('show'));
    }

    modalCloseButtons.forEach(btn => btn.addEventListener('click', hideModals));

    // --- Gamification & EXP ---
    const expProgress = document.getElementById('exp-progress');
    const expText = document.getElementById('exp-text');

    function updateExpBar() {
        const percentage = (state.exp / state.maxExp) * 100;
        expProgress.style.width = `${percentage}%`;
        expText.textContent = `${state.exp} / ${state.maxExp} EXP`;
    }

    function addExp(amount) {
        state.exp += amount;
        if (state.exp > state.maxExp) state.exp = state.maxExp; // Cap at max
        updateExpBar();
    }

    document.getElementById('report-scam-btn').addEventListener('click', () => {
        hideModals();
        addExp(20);
        showNotification("Báo cáo thành công! Bạn nhận được 20 EXP.");
    });
    
    document.getElementById('gamification-shield-btn').addEventListener('click', () => navigateTo('gamification-screen'));

    // --- Community Feed Actions ---
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const span = this.querySelector('span');
            let count = parseInt(span.textContent);
            count = (count === 0) ? 1 : 0; // Toggle between 0 and 1
            span.textContent = count;
        });
    });

    // --- Safety Map ---
    const mapContainer = document.querySelector('.map-container');
    document.getElementById('safety-map-btn').addEventListener('click', () => {
        navigateTo('map-screen');
        // Add some random footprints
        mapContainer.innerHTML = ''; // Clear old ones
        for(let i=0; i<5; i++) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-shoe-prints footprint-icon';
            icon.style.top = `${Math.random() * 80 + 10}%`;
            icon.style.left = `${Math.random() * 80 + 10}%`;
            mapContainer.appendChild(icon);
        }
    });

    // --- Security Notebook ---
    const notebookList = document.getElementById('notebook-list');
    document.getElementById('notebook-btn').addEventListener('click', () => {
        navigateTo('notebook-screen');
        renderNotebook();
    });

    function renderNotebook() {
        notebookList.innerHTML = '';
        if (state.savedAlerts.length === 0) {
            notebookList.innerHTML = '<p>Chưa có cảnh báo nào được lưu.</p>';
            return;
        }
        state.savedAlerts.forEach(alert => {
            const item = document.createElement('div');
            item.className = 'notebook-item';
            item.innerHTML = `<p>${alert.text}</p><div class="time">Lưu lúc: ${alert.time}</div>`;
            notebookList.appendChild(item);
        });
    }

    document.getElementById('save-to-notebook-btn').addEventListener('click', () => {
        const alertText = document.getElementById('alert-content-text').textContent;
        const now = new Date();
        state.savedAlerts.push({
            text: alertText,
            time: now.toLocaleTimeString('vi-VN') + ' ' + now.toLocaleDateString('vi-VN')
        });
        hideModals();
        showNotification("Đã lưu vào Sổ tay an ninh!");
    });

    // --- Widget Simulation ---
    document.getElementById('widget-search-btn').addEventListener('click', () => {
        navigateTo('call-screen'); // Simulate opening app to search
        document.querySelector('.search-box input').focus();
    });

    const widgetAlert = document.getElementById('widget-alert');
    widgetAlert.addEventListener('click', () => {
        navigateTo('call-screen');
        showModal('smart-alert-popup');
    });

    // --- Initial App Load Logic ---
    function initializeApp() {
        navigateTo('android-homescreen'); // Start at the simulated homescreen
        updateExpBar();
        
        // Simulate a smart alert appearing on the widget after a delay
        setTimeout(() => {
            widgetAlert.classList.add('show');
        }, 5000);
        
        // Simulate after-call popup for demonstration
        setTimeout(() => {
            showModal('after-call-popup');
        }, 10000);

        // Show welcome popup
        setTimeout(() => {
             showModal('welcome-popup');
        }, 1500);
    }
    
    // --- General Notification Function ---
    function showNotification(message) {
        const notif = document.createElement('div');
        notif.className = 'notification show';
        notif.textContent = message;
        document.body.appendChild(notif);
        setTimeout(() => {
            notif.remove();
        }, 3000);
    }

    initializeApp();
});
