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
    // audio: true,
    // notifications: true,
    // autoContinue: false,
    // cycles: 4,
    // timerLength: 1500,   // seconds = 25 minutes
    // shortBreak: 300,  // seconds = 5 minutes
    // longBreak: 1800,  // seconds = 30 minutes
    // remainingTime: 0,
    // remainingPercent: 100,
    // remainingCycles: 0,
    // status: '',       // Shown in UI
    // state: 'init',    // Used internally
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
