// ==========================================================================
// ByteByteGo Interactive Application Engine
// Dynamic Curriculum Navigation, State Management & Search
// ==========================================================================

let currentCourseIndex = 0;
let currentLessonIndex = 0;
let completedLessons = new Set(JSON.parse(localStorage.getItem('bbg_completed') || '[]'));

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCurriculum();
  loadLesson(0, 0);
  setupEventListeners();
  updateProgress();
});

// ==========================================================================
// Theme Management (Light / Dark)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('bbg_theme') || 'light';
  applyTheme(savedTheme);

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.body.classList.contains('theme-dark');
    applyTheme(isDark ? 'light' : 'dark');
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    document.getElementById('theme-icon-sun').classList.add('hidden');
    document.getElementById('theme-icon-moon').classList.remove('hidden');
  } else {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
    document.getElementById('theme-icon-sun').classList.remove('hidden');
    document.getElementById('theme-icon-moon').classList.add('hidden');
  }
  localStorage.setItem('bbg_theme', theme);
}

// ==========================================================================
// Curriculum Rendering
// ==========================================================================
function renderCurriculum() {
  const nav = document.getElementById('curriculum-nav');
  nav.innerHTML = '';

  let totalLessons = 0;

  COURSE_DATA.forEach((course, cIdx) => {
    const group = document.createElement('div');
    group.className = 'module-group';
    group.dataset.courseIndex = cIdx;

    const header = document.createElement('div');
    header.className = 'module-header';
    header.innerHTML = `
      <div class="module-header-left">
        <svg class="module-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        <span>${course.title}</span>
      </div>
      <span class="badge">${course.lessons.length}</span>
    `;

    header.addEventListener('click', () => {
      group.classList.toggle('collapsed');
    });

    const lessonList = document.createElement('div');
    lessonList.className = 'module-lessons';

    course.lessons.forEach((lesson, lIdx) => {
      totalLessons++;
      const item = document.createElement('div');
      item.className = `lesson-item ${completedLessons.has(lesson.id) ? 'completed' : ''}`;
      item.id = `nav-item-${cIdx}-${lIdx}`;
      item.innerHTML = `
        <div class="lesson-status-icon">
          ${completedLessons.has(lesson.id) ? '✓' : ''}
        </div>
        <span>${lesson.title}</span>
      `;

      item.addEventListener('click', () => {
        loadLesson(cIdx, lIdx);
        // Close mobile drawer if open
        document.getElementById('sidebar').classList.remove('open');
      });

      lessonList.appendChild(item);
    });

    group.appendChild(header);
    group.appendChild(lessonList);
    nav.appendChild(group);
  });

  document.getElementById('lesson-count-badge').textContent = `${totalLessons} Lessons`;
}

// ==========================================================================
// Load Active Lesson
// ==========================================================================
function loadLesson(courseIdx, lessonIdx) {
  currentCourseIndex = courseIdx;
  currentLessonIndex = lessonIdx;

  const course = COURSE_DATA[courseIdx];
  const lesson = course.lessons[lessonIdx];

  // Update Breadcrumbs
  document.getElementById('breadcrumb-course').textContent = course.title;
  document.getElementById('breadcrumb-lesson').textContent = lesson.title;

  // Update Header
  document.getElementById('lesson-title').textContent = lesson.title;
  document.getElementById('lesson-subtitle').textContent = lesson.subtitle;
  document.getElementById('lesson-read-time').textContent = lesson.readTime;
  document.getElementById('lesson-book-tag').textContent = course.bookTag;
  document.getElementById('lesson-badge').textContent = `Pillar 0${courseIdx + 1}`;

  // Update Body
  const bodyEl = document.getElementById('lesson-body');
  bodyEl.innerHTML = lesson.content;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update Active Class in Sidebar
  document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
  const activeItem = document.getElementById(`nav-item-${courseIdx}-${lessonIdx}`);
  if (activeItem) {
    activeItem.classList.add('active');
    // Ensure parent group is not collapsed
    activeItem.closest('.module-group').classList.remove('collapsed');
  }

  // Update Completed Button State
  const completeBtn = document.getElementById('complete-lesson-btn');
  if (completedLessons.has(lesson.id)) {
    completeBtn.classList.add('completed');
    completeBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Completed</span>
    `;
  } else {
    completeBtn.classList.remove('completed');
    completeBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Mark as Completed</span>
    `;
  }

  // Update Navigation Controls (Prev / Next)
  updateNavButtons();

  // Generate Right Table of Contents
  generateTOC();
}

// ==========================================================================
// Prev / Next Navigation Controls
// ==========================================================================
function updateNavButtons() {
  const prevBtn = document.getElementById('prev-lesson-btn');
  const nextBtn = document.getElementById('next-lesson-btn');

  // Check if previous exists
  let prevC = currentCourseIndex;
  let prevL = currentLessonIndex - 1;
  if (prevL < 0) {
    prevC--;
    if (prevC >= 0) {
      prevL = COURSE_DATA[prevC].lessons.length - 1;
    }
  }

  if (prevC >= 0) {
    prevBtn.disabled = false;
    document.getElementById('prev-lesson-title').textContent = COURSE_DATA[prevC].lessons[prevL].title;
    prevBtn.onclick = () => loadLesson(prevC, prevL);
  } else {
    prevBtn.disabled = true;
    document.getElementById('prev-lesson-title').textContent = 'None (First Lesson)';
    prevBtn.onclick = null;
  }

  // Check if next exists
  let nextC = currentCourseIndex;
  let nextL = currentLessonIndex + 1;
  if (nextL >= COURSE_DATA[nextC].lessons.length) {
    nextC++;
    nextL = 0;
  }

  if (nextC < COURSE_DATA.length) {
    nextBtn.disabled = false;
    document.getElementById('next-lesson-title').textContent = COURSE_DATA[nextC].lessons[nextL].title;
    nextBtn.onclick = () => loadLesson(nextC, nextL);
  } else {
    nextBtn.disabled = true;
    document.getElementById('next-lesson-title').textContent = 'Course Completed!';
    nextBtn.onclick = null;
  }
}

// ==========================================================================
// Table of Contents Generator (Right Sidebar)
// ==========================================================================
function generateTOC() {
  const tocNav = document.getElementById('toc-nav');
  tocNav.innerHTML = '';

  const headings = document.getElementById('lesson-body').querySelectorAll('h2, h3');
  headings.forEach((h, index) => {
    const id = `heading-${index}`;
    h.id = id;

    const link = document.createElement('a');
    link.className = 'toc-link';
    link.href = `#${id}`;
    link.textContent = h.textContent;
    if (h.tagName === 'H3') {
      link.style.paddingLeft = '12px';
      link.style.fontSize = '12px';
    }

    link.addEventListener('click', (e) => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth' });
    });

    tocNav.appendChild(link);
  });
}

// ==========================================================================
// Progress & Completion Tracker
// ==========================================================================
function setupEventListeners() {
  // Mark as Completed button
  document.getElementById('complete-lesson-btn').addEventListener('click', () => {
    const currentLesson = COURSE_DATA[currentCourseIndex].lessons[currentLessonIndex];
    if (completedLessons.has(currentLesson.id)) {
      completedLessons.delete(currentLesson.id);
    } else {
      completedLessons.add(currentLesson.id);
    }
    localStorage.setItem('bbg_completed', JSON.stringify([...completedLessons]));
    renderCurriculum();
    loadLesson(currentCourseIndex, currentLessonIndex);
    updateProgress();
  });

  // Mobile Menu Button
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Search Filter
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    filterCurriculum(query);
  });

  // Keyboard shortcut (⌘K or Ctrl+K)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

function updateProgress() {
  let total = 0;
  COURSE_DATA.forEach(c => total += c.lessons.length);
  const percentage = total === 0 ? 0 : Math.round((completedLessons.size / total) * 100);

  document.getElementById('course-progress-bar').style.width = `${percentage}%`;
  document.getElementById('course-progress-text').textContent = `${percentage}% Complete`;
}

function filterCurriculum(query) {
  document.querySelectorAll('.lesson-item').forEach(el => {
    const text = el.textContent.toLowerCase();
    if (!query || text.includes(query)) {
      el.style.display = 'flex';
    } else {
      el.style.display = 'none';
    }
  });
}

// ==========================================================================
// Utility: Copy Code Card Snippet
// ==========================================================================
function copyCode(btn) {
  const pre = btn.closest('.code-card').querySelector('pre code');
  if (pre) {
    navigator.clipboard.writeText(pre.innerText).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = orig, 1800);
    });
  }
}
