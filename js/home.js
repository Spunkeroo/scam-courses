const Home = {
  render(exposed, courses) {
    const recentExposed = exposed.slice(0, 4);
    const recentCourses = courses.slice(0, 3);

    return `
      <div class="hero">
        <div class="hero-logo">
          <span class="red">scam</span><span class="dot">.</span>courses
        </div>
        <p class="hero-tagline">Fake Guru Exposer + Free Scam Education</p>
        <p class="hero-description">
          Exposing ${exposed.length} fake guru courses with red flags, earnings claim debunks, and verdicts.
          Plus ${courses.length} free courses teaching you how to protect yourself.
        </p>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="number">${exposed.length}</span>
            <span class="label">Gurus Exposed</span>
          </div>
          <div class="hero-stat">
            <span class="number">${courses.length}</span>
            <span class="label">Free Courses</span>
          </div>
          <div class="hero-stat">
            <span class="number">$0</span>
            <span class="label">Cost to Learn</span>
          </div>
        </div>
        <div class="hero-cta">
          <a href="#/exposed" class="btn btn-primary">&#9888; Browse Exposed Courses</a>
          <a href="#/learn" class="btn btn-green">&#127891; Free Courses</a>
        </div>
      </div>

      <!-- Split Section -->
      <div class="split-section">
        <div class="split-card exposed-card" onclick="location.hash='/exposed'" style="cursor:pointer">
          <div class="count">${exposed.length}</div>
          <h2>Exposed Courses</h2>
          <p>Fake gurus, scam courses, and MLM schemes — broken down with red flags, earnings claims vs reality, and our verdict.</p>
          <a href="#/exposed" class="btn btn-outline" style="margin-top:16px">View All Exposed &rarr;</a>
        </div>
        <div class="split-card learn-card" onclick="location.hash='/learn'" style="cursor:pointer">
          <div class="count">${courses.length}</div>
          <h2>Free Courses</h2>
          <p>Learn to protect yourself from scams — completely free. Crypto safety, phishing defense, romance scam red flags, and more.</p>
          <a href="#/learn" class="btn btn-outline" style="margin-top:16px;border-color:var(--green);color:var(--green)">Start Learning &rarr;</a>
        </div>
      </div>

      <!-- Recently Exposed -->
      <div class="section-header">
        <h2 class="section-title"><span class="accent">Recently</span> Exposed</h2>
        <a href="#/exposed" class="section-link">View all &rarr;</a>
      </div>
      <div class="exposed-grid" style="margin-bottom:48px">
        ${recentExposed.map(e => this.renderExposedCard(e)).join('')}
      </div>

      <!-- Free Courses -->
      <div class="section-header">
        <h2 class="section-title"><span class="green">Free</span> Courses</h2>
        <a href="#/learn" class="section-link">View all &rarr;</a>
      </div>
      <div class="courses-grid">
        ${recentCourses.map(c => this.renderCourseCard(c)).join('')}
      </div>
    `;
  },

  renderExposedCard(e) {
    const verdictClass = e.verdict === 'AVOID' ? 'verdict-avoid' : 'verdict-caution';
    return `
      <div class="exposed-card-item" onclick="location.hash='/exposed/${e.slug}'">
        <h3>${e.name}</h3>
        <div class="course-name">${e.course}</div>
        <div class="price">${e.price}</div>
        <span class="category-tag tag-${e.category}">${e.category}</span>
        <span class="verdict-badge ${verdictClass}">${e.verdict}</span>
      </div>
    `;
  },

  renderCourseCard(c) {
    return `
      <div class="course-card" onclick="location.hash='/course/${c.slug}'">
        <h3>${c.title}</h3>
        <div class="course-meta">
          <span class="free-badge">FREE</span>
          <span>${c.difficulty}</span>
          <span>${c.duration}</span>
          <span>${c.lessons.length} lessons</span>
        </div>
        <p>${c.description}</p>
      </div>
    `;
  }
};