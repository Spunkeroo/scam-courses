const Learn = {
  render(course) {
    if (!course) {
      return `<div class="empty-state"><div class="icon">&#128683;</div><p>Course not found.</p></div>`;
    }

    return `
      <div class="course-detail">
        <a href="#/learn" style="font-size:13px;color:var(--text-dim);display:inline-block;margin-bottom:16px">&larr; Back to Free Courses</a>

        <div class="course-header">
          <h1>${course.title}</h1>
          <div class="meta-row">
            <span class="free-badge">FREE</span>
            <span style="font-size:13px;color:var(--text-dim)">${course.difficulty}</span>
            <span style="font-size:13px;color:var(--text-dim)">${course.duration}</span>
            <span style="font-size:13px;color:var(--text-dim)">${course.lessons.length} lessons</span>
          </div>
          <p>${course.description}</p>
        </div>

        ${course.lessons.map((lesson, i) => `
          <div class="lesson">
            <h2>Lesson ${i + 1}: ${lesson.title}</h2>
            <div class="lesson-content">${this.formatContent(lesson.content)}</div>
          </div>
        `).join('')}

        ${course.resources && course.resources.length ? `
          <div class="resources-box">
            <h3>Resources</h3>
            ${course.resources.map(r => `
              <a href="${r.url}" target="_blank" rel="noopener" class="resource-link">${r.name} &rarr;</a>
            `).join('')}
          </div>
        ` : ''}

        ${Votes.render('course', course.id)}
      </div>
    `;
  },

  formatContent(content) {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p style="margin-top:12px">')
      .replace(/\n(\d+)\. /g, '</p><p style="margin-top:8px;padding-left:16px">$1. ')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }
};