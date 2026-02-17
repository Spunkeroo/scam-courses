const App = {
  data: { exposed: [], courses: [] },

  async init() {
    const [exposed, courses] = await Promise.all([
      fetch('data/exposed.json').then(r => r.json()),
      fetch('data/courses.json').then(r => r.json())
    ]);

    this.data = { exposed, courses };
    Search.build(exposed, courses);
    this.bindHeaderSearch();
    this.bindMobileMenu();

    window.addEventListener('hashchange', () => this.route());
    this.route();
  },

  bindHeaderSearch() {
    const input = document.getElementById('header-search-input');
    const dropdown = document.getElementById('header-search-results');
    if (input && dropdown) Search.bindInput(input, dropdown);
  },

  bindMobileMenu() {
    const btn = document.getElementById('mobile-menu');
    if (btn) {
      btn.addEventListener('click', () => {
        document.querySelector('.header-nav')?.classList.toggle('show');
      });
    }
  },

  route() {
    const hash = location.hash.slice(1) || '/';
    const content = document.getElementById('app');
    const [path, queryString] = hash.split('?');
    const params = new URLSearchParams(queryString || '');
    const parts = path.split('/').filter(Boolean);

    const { exposed, courses } = this.data;
    let html = '';

    if (parts[0] === 'exposed' && parts[1]) {
      const entry = exposed.find(e => e.slug === parts[1]);
      html = Exposed.render(entry);
      document.title = entry ? `${entry.name} Exposed — scam.courses` : 'Not Found — scam.courses';
    } else if (parts[0] === 'exposed') {
      html = Browse.renderExposed(exposed, params);
      document.title = 'Exposed Courses — scam.courses';
    } else if (parts[0] === 'course' && parts[1]) {
      const course = courses.find(c => c.slug === parts[1]);
      html = Learn.render(course);
      document.title = course ? `${course.title} — scam.courses` : 'Not Found — scam.courses';
    } else if (parts[0] === 'learn') {
      html = Browse.renderLearn(courses);
      document.title = 'Free Courses — scam.courses';
    } else {
      html = Home.render(exposed, courses);
      document.title = 'scam.courses — Fake Guru Exposer + Free Education';
    }

    content.innerHTML = `<div class="main-content">${html}</div>`;
    window.scrollTo(0, 0);
    document.querySelector('.header-nav')?.classList.remove('show');
  },

  toast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());