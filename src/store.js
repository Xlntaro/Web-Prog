// Simple reactive store using ES Modules and LocalStorage
export const Store = {
    state: {
        transactions: JSON.parse(localStorage.getItem('transactions')) || []
    },
    
    // Subscribe to state changes
    listeners: [],
    subscribe(listener) {
        this.listeners.push(listener);
    },
    
    // Notify all listeners
    notify() {
        localStorage.setItem('transactions', JSON.stringify(this.state.transactions));
        this.listeners.forEach(listener => listener(this.state));
    },
    
    // Actions
    addTransaction(transaction) {
        this.state.transactions.push({ ...transaction, id: Date.now(), date: new Date().toLocaleDateString('uk-UA') });
        this.notify();
    },
    
    removeTransaction(id) {
        this.state.transactions = this.state.transactions.filter(t => t.id !== id);
        this.notify();
    },
    
    clearAll() {
        this.state.transactions = [];
        this.notify();
    },
    
    getTotal() {
        return this.state.transactions.reduce((acc, curr) => acc + curr.amount, 0);
    }
};
