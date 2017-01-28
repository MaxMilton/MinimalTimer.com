import Vue from 'vue';
import App from './App';
import About from './About';
import NotFound from './NotFound';

const routes = {
  '/': App,
  '/about': About,
};

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname,
  },
  computed: {
    viewComponent() {
      return routes[this.currentRoute] || NotFound;
    },
  },
  render(h) {
    return h(this.viewComponent);
  },
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname;
});
