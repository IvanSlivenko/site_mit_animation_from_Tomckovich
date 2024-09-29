import '../styles/reset.scss';
import '../styles/mixins.scss';
import '../styles/styles.scss';

const classes = {
    opened: 'opened'
}

const  header = document.querySelector('.header');
const menuLink = document.querySelectorAll('.menu-link');
const menuButton =  document.querySelector('.header-menu__button'); 


const toggleMenu = () => header.classList.toggle(classes.opened);

const scrollTosection = (e) => {
    e.preventDefault();
    const href =   e.currentTarget.getAttribute('href');
    console.log(href);
    


};


menuButton.addEventListener('click', toggleMenu);
menuLink.forEach((link) => link.addEventListener('click', scrollTosection));

