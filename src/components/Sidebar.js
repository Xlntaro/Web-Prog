export const Sidebar = {
    render() {
        return `
            <aside class="sidebar glass-panel">
                <div class="logo">Скарбничка</div>
                <nav>
                    <a href="/" data-link>Головна</a>
                    <a href="/transactions" data-link>Транзакції</a>
                    <a href="/settings" data-link>Налаштування</a>
                </nav>
            </aside>
        `;
    }
};
