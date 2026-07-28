const toggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('portfolio-theme');

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  toggle.querySelector('.toggle-icon').textContent = isDark ? '☀' : '☾';
  toggle.querySelector('.toggle-text').textContent = isDark ? 'Light' : 'Dark';
  toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  localStorage.setItem('portfolio-theme', theme);
}

setTheme(storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
toggle.addEventListener('click', () => setTheme(document.body.classList.contains('dark') ? 'light' : 'dark'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  document.getElementById('formMessage').textContent = `Thanks, ${name}! Your message is ready to send.`;
  form.reset();
});
