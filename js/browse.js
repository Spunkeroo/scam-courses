const Browse = {
  renderExposed(exposed, params) {
    const category = params.get('category') || 'all';
    const categories = ['all', 'crypto', 'dropshipping', 'forex', 'marketing', 'sales', 'consulting', 'real-estate'];

    let filtered = [...exposed];
    if (category !== 'all') {
      filtered = filtered.filter(e => e.category === category);
    }

    return `
      <h1 class="page-title"><span class="accent">Exposed</span> Courses</h1>
      <p class="page-subtitle">${filtered.length} fake guru courses exposed with red flags and verdicts.</p>

      <div class="filter-bar">
        ${categories.map(cat => `
          <button class="filter-btn ${category === cat ? 'active' : ''}"
            onclick="location.hash='/exposed?category=${cat}'">
            ${cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
          </button>
        `).join('')}
      </div>

      ${filtered.length ? `
        <div class="exposed-grid">
          ${filtered.map(e => Home.renderExposedCard(e)).join('')}
        </div>
      ` : `
        <div class="empty-state">
          <div class="icon">&#128269;</div>
          <p>No exposed courses found for this category.</p>
        </div>
      `}
    `;
  },

  renderLearn(courses) {
    return `
      <h1 class="page-title"><span class="green">Free</span> Courses</h1>
      <p class="page-subtitle">${courses.length} free courses to protect yourself from scams. No signup required.</p>

      <div class="courses-grid">
        ${courses.map(c => Home.renderCourseCard(c)).join('')}
      </div>
    `;
  }
};