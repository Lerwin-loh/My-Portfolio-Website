if (window.AOS) {
  AOS.init();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.js-link-button[data-href]').forEach(function (button) {
    button.addEventListener('click', function () {
      window.location.href = button.dataset.href;
    });
  });
});

window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('ease-fade-out');
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 500);
  }

  const firstBook = document.getElementById('firstAchieveBook');
  if (!firstBook) return;

  firstBook.classList.add('active');
  document.querySelectorAll('.book_1').forEach(function (book) {
    book.addEventListener('mouseenter', function () {
      firstBook.classList.remove('active');
    });
  });
});
