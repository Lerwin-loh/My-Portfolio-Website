document.addEventListener('click', function (event) {
  const button = event.target.closest('.js-gallery-scroll');
  if (!button) return;

  const gallery = document.querySelector('.' + button.dataset.gallery);
  if (!gallery) return;

  const firstItem = gallery.querySelector('.gallery-item, .gallery-item2');
  if (!firstItem) return;

  const itemWidth = parseInt(window.getComputedStyle(firstItem).width, 10) || 0;
  const direction = Number(button.dataset.direction) || 1;
  gallery.scrollBy({ left: direction * (itemWidth + 30), behavior: 'smooth' });
});
