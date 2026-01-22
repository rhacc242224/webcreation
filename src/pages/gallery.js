import { routes, router, addListener } from '../router.js';
import createPageContainer from '../createpagecontainer.js';

export default function Gallery() {
  let container = createPageContainer();
  container.innerHTML = `<h1>hi</h1>`;
}
