import { Store } from '../store.js';

const Dashboard = {
    async render() {
        return `
            <h1>Головна панель</h1>
            <div class="glass-panel" style="margin-bottom: 20px;">
                <h2>Загальний баланс</h2>
                <p style="font-size: 3rem; font-weight: 600;">
                    ${Store.getTotal().toLocaleString('uk-UA', { minimumFractionDigits: 2 })} ₴
                </p>
            </div>
            
            <div class="glass-panel">
                <h3>Останні транзакції</h3>
                ${this.renderRecent()}
            </div>
        `;
    },
    
    renderRecent() {
        const recent = [...Store.state.transactions].reverse().slice(0, 3);
        if (recent.length === 0) return '<p>У вас ще немає витрат.</p>';
        
        return `
            <ul style="list-style: none;">
                ${recent.map(t => `
                    <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between;">
                        <span>${t.text} <small style="color: #94a3b8; display: block;">${t.category} • ${t.date}</small></span>
                        <span style="font-weight: 600;">- ${t.amount.toFixed(2)} ₴</span>
                    </li>
                `).join('')}
            </ul>
            <a href="/transactions" data-link style="display: inline-block; margin-top: 15px; color: var(--primary-color); text-decoration: none;">Всі транзакції →</a>
        `;
    },
    
    async afterRender() {}
};
export default Dashboard;
