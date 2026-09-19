/* =========================
   EASY PERSONALIZATION AREA
   Replace the file at assets/music/birthday-music.mp3 to use a different song
   Put your six photos at: assets/images/photo1.jpg ... photo6.jpg
   ========================= */
const birthdayConfig = {
  name: "Barsha Kumari Mandal",
  nickname: "NatinMi",
  letter: "[WRITE YOUR PERSONAL BIRTHDAY MESSAGE HERE]\n\nYou are more than my sister — you are one of the most precious parts of my life. I hope this year brings you all the joy, courage, laughter, and beautiful little moments you deserve. Keep smiling, keep shining, and never forget how loved you are.",
  music: "assets/music/birthday-music.mp3",
  finalMessage: "No matter how much we grow up, you'll always be my NatinMi. ♥"
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

// Fill all personalized text from the configuration above.
$$('[data-name]').forEach(el => el.textContent = birthdayConfig.name);
$$('[data-nickname]').forEach(el => el.textContent = birthdayConfig.nickname);
$$('[data-first-name]').forEach(el => el.textContent = birthdayConfig.name.split(' ')[0]);
$('#letter-text').textContent = birthdayConfig.letter;
$('.final-reveal p').innerHTML = birthdayConfig.finalMessage.replace(birthdayConfig.nickname, `<em>${birthdayConfig.nickname}</em>`);
$('#birthday-audio').src = birthdayConfig.music;

// Graceful illustrated fallback means the page stays beautiful before photos are added.
$$('img[data-placeholder]').forEach((image, index) => {
  image.addEventListener('error', () => {
    const hue = 310 + (index * 17) % 55;
    image.src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="hsl(${hue},72%,78%)"/><stop offset="1" stop-color="hsl(${hue + 35},45%,58%)"/></linearGradient></defs><rect width="600" height="600" fill="url(#g)"/><circle cx="300" cy="260" r="105" fill="white" opacity=".24"/><path d="M160 490c30-110 250-110 280 0" fill="white" opacity=".24"/><text x="300" y="555" text-anchor="middle" fill="white" font-family="serif" font-size="25">A beautiful memory</text></svg>`)}`;
  }, { once: true });
});

// Background starlight.
const field = $('#particle-field');
for (let i = 0; i < 42; i++) { const p = document.createElement('i'); p.className = 'particle'; p.style.left = `${Math.random() * 100}%`; p.style.animationDelay = `${-Math.random() * 18}s`; p.style.setProperty('--t', `${12 + Math.random() * 13}s`); field.append(p); }

// A few extra celebratory balloons, flowers, and hearts around the birthday reveal.
const decor = $('#celebration-decor');
['heart','flower','balloon','heart','flower','balloon','heart','flower','balloon','heart','flower','balloon','heart','flower','balloon','heart','flower','balloon'].forEach((kind, i) => {
  const item = document.createElement('i');
  item.className = `decor decor-${kind}`;
  if (kind === 'heart') item.textContent = '♥';
  if (kind === 'flower') item.textContent = '✿';
  item.style.setProperty('--left', `${3 + Math.random() * 93}%`);
  item.style.setProperty('--top', `${8 + Math.random() * 81}%`);
  item.style.setProperty('--size', kind === 'balloon' ? `${28 + Math.random() * 25}px` : `${16 + Math.random() * 18}px`);
  item.style.setProperty('--duration', `${4 + Math.random() * 4}s`);
  item.style.setProperty('--delay', `${-i * .45}s`);
  decor.append(item);
});

const nav = $('.nav'), menu = $('.menu-toggle');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 35), { passive: true });
menu.addEventListener('click', () => { const opened = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', opened); });
$$('.nav-links a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));

const showToast = message => { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 3100); };
$('.little-gift').addEventListener('click', event => { showToast(event.currentTarget.dataset.message); burst(event.clientX, event.clientY, 12, false); });

// Reveal content when it reaches the viewport.
const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('shown'); observer.unobserve(e.target); } }), { threshold: .15 });
$$('.reveal').forEach(el => observer.observe(el));

function burst(x, y, count = 45, confetti = true) {
  for (let i = 0; i < count; i++) { const bit = document.createElement('i'); bit.className = confetti ? 'confetti' : 'click-heart'; bit.textContent = confetti ? '' : '♥'; bit.style.left = `${x}px`; bit.style.top = `${y}px`; bit.style.setProperty('--x', `${(Math.random() - .5) * 330}px`); bit.style.setProperty('--y', `${(Math.random() - .72) * 290}px`); if (confetti) bit.style.background = ['#fc8fba','#ffc1a4','#c9adff','#fff5bd'][i % 4]; else bit.style.color = '#fc8fba'; document.body.append(bit); bit.addEventListener('animationend', () => bit.remove()); }
}

$('#open-surprise').addEventListener('click', async event => {
  try {
    await audio.play();
    musicButton.classList.add('playing');
    musicButton.setAttribute('aria-label', 'Pause music');
    burst(event.clientX, event.clientY);
    $('#birthday').scrollIntoView({ behavior: 'smooth' });
  } catch { showToast('Please tap the button again to start the birthday song.'); }
});
$('#final-gift').addEventListener('click', event => { const button = event.currentTarget; if (button.classList.contains('open')) return; button.classList.add('open'); burst(innerWidth / 2, innerHeight / 2, 95); setTimeout(() => { const final = $('#final-reveal'); final.classList.add('visible'); final.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 550); });

// Music never starts on its own. It plays locally after a button tap.
const audio = $('#birthday-audio'), musicButton = $('#music-button');
musicButton.addEventListener('click', async () => { try { if (audio.paused) { await audio.play(); musicButton.classList.add('playing'); musicButton.setAttribute('aria-label', 'Pause music'); } else { audio.pause(); musicButton.classList.remove('playing'); musicButton.setAttribute('aria-label', 'Play music'); } } catch { showToast('The music file could not be played.'); } });
audio.addEventListener('ended', () => musicButton.classList.remove('playing'));

// Small, elegant touch interaction: tap/click empty space for a handful of hearts.
document.addEventListener('click', event => { if (event.target.closest('button,a,.photo-card')) return; burst(event.clientX, event.clientY, 5, false); });

// Optional video only appears if the file successfully loads.
const video = $('#surprise-video');
video.addEventListener('canplay', () => $('#video').hidden = false, { once: true });
