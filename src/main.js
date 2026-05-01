import { Router } from './router.js';
import { Sidebar } from './components/Sidebar.js';

// Inject sidebar into the app container
document.getElementById('app-container').insertAdjacentHTML('afterbegin', Sidebar.render());

// Initialize router
Router.init();
