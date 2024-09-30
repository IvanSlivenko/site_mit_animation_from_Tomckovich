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
    
    if(!href && !href.startsWith('#')) return;

    const section = href.slice(1);
    const top = document.getElementById(section)?.offsetTop || 0;

    window.scrollTo({ top: top, behavior: "smooth"});
    
};

const formatValue = () =>{};

const getTimerValues = (diff) => {
    return {
        seconds: (diff / 1000) % 60,
        minutes: (diff / (1000*60)) % 60,
        hours: (diff / (1000*60*60)) % 24,
        days: (diff / (1000*60*60*24)) % 30
    }
}

const startTimer = (date) => {
    setInterval(() => {
        const diff = new Date(date).getTime() - new Date().getTime();
        const values = getTimerValues(diff);
        Object.entries(values).forEach(([key, value]) =>{ 
            const timerValue = document.getElementById(key);
            timerValue.innerText = value;
            
        });
    }, 1000)
    
    console.log(getTimerValues(diff));
    

    
}

startTimer("October 29 2024 19:00:00");
menuButton.addEventListener('click', toggleMenu);
menuLink.forEach((link) => link.addEventListener('click', scrollTosection));

