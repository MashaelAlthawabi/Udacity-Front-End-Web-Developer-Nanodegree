//global variables
const sectionsItems = document.querySelectorAll('section');
const navbarList = document.querySelector('#navbar__list');

// build the nav

sectionsItems.forEach((item) => {
  const navItem = `<li class="nav-item"><a href="#${item.id}" class="menu__link" data-link="${item.id}">${item.dataset.nav}</li>`;
  navbarList.insertAdjacentHTML('beforeend', navItem);
});

//add scroll when nav item is clicked
navbarList.addEventListener('click', (e) => {
  e.preventDefault();
  requestedScrollSection = document.getElementById(e.target.dataset.link);
  requestedScrollSection.scrollIntoView({ behavior: 'smooth' });
});

//helper function to check if element is in viewport
const isInViewport = (elem) => {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

//Set sections as active
window.addEventListener('scroll', (e) => {
  sectionsItems.forEach((item) => {
    if (isInViewport(item)) {
      item.classList.add('active');
    } else {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    }
  });
});
