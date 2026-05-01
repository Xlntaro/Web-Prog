import Dashboard from './pages/Dashboard.js';
import Transactions from './pages/Transactions.js';
import Settings from './pages/Settings.js';

export const Router = {
    routes: {
        '/': Dashboard,
        '/transactions': Transactions,
        '/settings': Settings
    },
    
    init() {
        // Handle navigation clicks
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.getAttribute('href'));
            }
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => this.route());
        
        // Initial route
        this.route();
    },
    
    navigateTo(url) {
        history.pushState(null, null, url);
        this.route();
    },
    
    async route() {
        const path = location.pathname;
        const page = this.routes[path] || this.routes['/'];
        
        const appContent = document.getElementById('app-content');
        appContent.innerHTML = await page.render();
        
        if (page.afterRender) {
            await page.afterRender();
        }
        
        // Update active link in sidebar
        document.querySelectorAll('.sidebar nav a').forEach(link => {
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};
