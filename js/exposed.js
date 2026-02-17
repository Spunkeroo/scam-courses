const Exposed = {
  render(entry) {
    if (!entry) {
      return `<div class="empty-state"><div class="icon">&#128683;</div><p>Course not found.</p></div>`;
    }

    const verdictClass = entry.verdict === 'AVOID' ? 'verdict-avoid' : 'verdict-caution';
    const verdictBoxClass = entry.verdict === 'AVOID' ? '' : 'caution';

    return `
      <div class="exposed-detail">
        <a href="#/exposed" style="font-size:13px;color:var(--text-dim);display:inline-block;margin-bottom:16px">&larr; Back to Exposed Courses</a>

        <div class="exposed-header">
          <h1>${entry.name}</h1>
          <div class="course-name">${entry.course}</div>
          <div class="meta-row">
            <span class="category-tag tag-${entry.category}">${entry.category}</span>
            <span class="verdict-badge ${verdictClass}">${entry.verdict}</span>
            <span style="font-size:14px;font-weight:700;color:var(--red)">${entry.price}</span>
          </div>
        </div>

        <div class="exposed-section">
          <h2>&#128172; What They Claim</h2>
          <ul class="claims">
            ${entry.claims.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div class="exposed-section">
          <h2>&#128270; The Reality</h2>
          <div class="reality-text">${entry.reality}</div>
        </div>

        <div class="exposed-section">
          <h2>&#9888; Red Flags</h2>
          <ul class="red-flags">
            ${entry.redFlags.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>

        <div class="verdict-box ${verdictBoxClass}">
          <h2>Verdict: ${entry.verdict}</h2>
          <p>${entry.verdictDetail}</p>
        </div>

        ${entry.sources.length ? `
          <div class="exposed-section">
            <h2>&#128279; Sources</h2>
            <ul>
              ${entry.sources.map(s => `<li style="padding-left:0"><a href="${s}" target="_blank" rel="noopener">${s}</a></li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${Votes.render('exposed', entry.id)}

        <div class="affiliate-box" style="margin-top:24px">
          <h4>Learn For Free Instead</h4>
          <a href="https://www.khanacademy.org" target="_blank" rel="noopener" class="affiliate-link">&#127891; Khan Academy (Free)</a>
          <a href="https://www.coursera.org" target="_blank" rel="noopener" class="affiliate-link">&#127891; Coursera (Free Courses)</a>
          <a href="https://www.freecodecamp.org" target="_blank" rel="noopener" class="affiliate-link">&#128187; freeCodeCamp (Free)</a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener" class="affiliate-link">&#127909; YouTube (Free)</a>
        </div>
      </div>
    `;
  }
};