import { Store } from '../store.js';

const Transactions = {
    async render() {
        return `
            <h1>Управління транзакціями</h1>
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px;">
                <div class="glass-panel">
                    <h3>Додати витрату</h3>
                    <form id="add-form">
                        <div class="form-control">
                            <label>Назва</label>
                            <input type="text" id="t-text" required placeholder="Напр. Кава">
                        </div>
                        <div class="form-control">
                            <label>Сума (₴)</label>
                            <input type="number" id="t-amount" required min="0" step="0.01">
                        </div>
                        <div class="form-control">
                            <label>Категорія</label>
                            <select id="t-category" required>
                                <option value="Їжа">Їжа</option>
                                <option value="Транспорт">Транспорт</option>
                                <option value="Розваги">Розваги</option>
                                <option value="Інше">Інше</option>
                            </select>
                        </div>
                        <button type="submit" class="btn" style="width: 100%;">Додати</button>
                    </form>
                </div>
                
                <div class="glass-panel">
                    <h3>Історія</h3>
                    <div id="tx-list">
                        ${this.renderList()}
                    </div>
                </div>
            </div>
        `;
    },
    
    renderList() {
        const txs = Store.state.transactions;
        if (txs.length === 0) return '<p>Історія порожня.</p>';
        
        return `
            <ul style="list-style: none;">
                ${[...txs].reverse().map(t => `
                    <li style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); margin-bottom: 10px; border-radius: 8px;">
                        <div>
                            <strong>${t.text}</strong>
                            <small style="color: #94a3b8; display: block; margin-top: 5px;">${t.category} • ${t.date}</small>
                        </div>
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="font-weight: 600; font-size: 1.1rem;">- ${t.amount.toFixed(2)} ₴</span>
                            <button class="btn btn-danger delete-btn" data-id="${t.id}" style="padding: 5px 10px;">×</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;
    },
    
    async afterRender() {
        // Handle form submit
        document.getElementById('add-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const text = document.getElementById('t-text').value;
            const amount = parseFloat(document.getElementById('t-amount').value);
            const category = document.getElementById('t-category').value;
            
            Store.addTransaction({ text, amount, category });
            
            // Re-render list
            document.getElementById('tx-list').innerHTML = this.renderList();
            this.attachDeleteListeners();
            e.target.reset();
        });
        
        this.attachDeleteListeners();
    },
    
    attachDeleteListeners() {
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                Store.removeTransaction(id);
                document.getElementById('tx-list').innerHTML = this.renderList();
                this.attachDeleteListeners();
            });
        });
    }
};
export default Transactions;
