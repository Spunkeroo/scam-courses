const Search = {
  exposed: [],
  courses: [],

  build(exposed, courses) {
    this.exposed = exposed;
    this.courses = courses;
  },

  search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results = [];

    this.exposed.forEach(e => {
      const text = `${e.name} ${e.course} ${e.category} ${e.verdictDetail}`.toLowerCase();
      if (text.includes(q)) results.push({ type: 'exposed', item: e });
    });

    this.courses.forEach(c => {
      const text = `${c.title} ${c.category} ${c.description}`.toLowerCase();
      if (text.includes(q)) results.push({ type: 'course', item: c });
    });

    return results.slice(0, 8);
  },

  bindInput(input, dropdown) {
    input.addEventListener('input', () => {
      const results = this.search(input.value);
      if (results.length && input.value.trim()) {
        dropdown.innerHTML = results.map(r => {
          if (r.type === 'exposed') {
            return `
              <div class="search-result-item" onclick="location.hash='/exposed/${r.item.slug}'">
                <span class="icon" style="color:var(--red)">&#9888;</span>
                <div class="info">
                  <h4>${r.item.name}</h4>
                  <p>${r.item.course} &middot; ${r.item.verdict}</p>
                </div>
              </div>`;
          }
          return `
            <div class="search-result-item" onclick="location.hash='/course/${r.item.slug}'">
              <span class="icon" style="color:var(--green)">&#127891;</span>
              <div class="info">
                <h4>${r.item.title}</h4>
                <p>Free Course &middot; ${r.item.duration}</p>
              </div>
            </div>`;
        }).join('');
        dropdown.classList.add('open');
      } else {
        dropdown.classList.remove('open');
      }
    });

    input.addEventListener('blur', () => {
      setTimeout(() => dropdown.classList.remove('open'), 200);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()) input.dispatchEvent(new Event('input'));
    });
  }
};