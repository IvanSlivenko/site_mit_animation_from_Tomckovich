import '../styles/reset.scss';
import '../styles/mixins.scss';
import '../styles/styles.scss';

const checkboxes = {
    requirements: ["minimum", "recommended" ],
    versions: ["standard", "limited"]
}

let isPlay = false;
const classes = {
    opened: 'opened',
    hidden: 'hidden',
    active: 'active'
}

const checkbox = document.querySelectorAll('.checkbox');
const  header = document.querySelector('.header');
const menuLink = document.querySelectorAll('.menu-link');
const menuButton =  document.querySelector('.header-menu__button'); 
const video = document.getElementById('video');
const videoButton = document.querySelector('.video-btn');



const toggleMenu = () => header.classList.toggle(classes.opened);

const scrollTosection = (e) => {
    e.preventDefault();
    const href =   e.currentTarget.getAttribute('href');
    
    if(!href && !href.startsWith('#')) return;

    const section = href.slice(1);
    const top = document.getElementById(section)?.offsetTop || 0;

    window.scrollTo({ top: top, behavior: "smooth"});
    
};
// ------------------------------------------------------------------- timer Home
const formatValue = (value) => value < 10 ? `0${value}` : value;

const getTimerValues = (diff) => {
    return {
        seconds: (diff / 1000) % 60,
        minutes: (diff / (1000*60)) % 60,
        hours: (diff / (1000*60*60)) % 24,
        days: (diff / (1000*60*60*24)) % 30
    }
}

const setTimerValues = (values)=>{
    Object.entries(values).forEach(([key, value]) =>{ 
        const timerValue = document.getElementById(key);
        timerValue.innerText = formatValue(Math.floor(value));
    });
}

const startTimer = (date) => {
    const id = setInterval(() => {
        const diff = new Date(date).getTime() - new Date().getTime();

        if(diff < 0){
            clearInterval(id);
            return;
        }

        setTimerValues(getTimerValues(diff));
        
    }, 1000);
       
}

startTimer("October 29 2024 19:00:00");
// ------------------------------------------------------------------- timer End

const handleVideo = ({ target }) => {
    const info = target.parentElement;
    isPlay = !isPlay;
    info.classList.toggle(classes.hidden, isPlay);
    target.innerText = isPlay ? 'Pause' : 'Play';
    isPlay ? video.play() : video.pause();

}

const handleCheckbox = ({ currentTarget: {checked, name} }) => {
    

    const { active } = classes;
    const value = checkboxes[name][Number(checked)];
    const list =  document.getElementById(value);

    list.classList.add(active);
;


    
};
menuButton.addEventListener('click', toggleMenu);
videoButton.addEventListener('click', handleVideo);
menuLink.forEach((link) => link.addEventListener('click', scrollTosection));

checkbox.forEach((box) => box.addEventListener('click', handleCheckbox));
