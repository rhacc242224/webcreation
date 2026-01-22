import './index.css';

export default function createPageContainer() {
  let container = document.getElementById('wrap');
  if (!container) {
    container = document.createElement('div');
    container.id = 'wrap';
    container.className = 'page';
    const app = document.getElementById('app');
    app.appendChild(container);
  }
  return container;
}