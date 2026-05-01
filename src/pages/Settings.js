import { Store } from '../store.js';

const Settings = {
    async render() {
        return `
            <h1>Налаштування</h1>
            <div class="glass-panel">
                <h3>Небезпечна зона</h3>
                <p style="margin-bottom: 15px; color: #94a3b8;">Ця дія видалить всі ваші транзакції без можливості відновлення.</p>
                <button id="clear-btn" class="btn btn-danger">Очистити всі дані</button>
            </div>
            
            <div class="glass-panel" style="margin-top: 20px;">
                <h3>Про додаток</h3>
                <p>Курсова робота з веб-програмування.</p>
                <p>Версія: 2.0 (SPA)</p>
            </div>
        `;
    },
    
    async afterRender() {
        document.getElementById('clear-btn').addEventListener('click', () => {
            if (confirm('Ви впевнені, що хочете видалити всі дані?')) {
                Store.clearAll();
                alert('Дані успішно видалено!');
            }
        });
    }
};
export default Settings;
