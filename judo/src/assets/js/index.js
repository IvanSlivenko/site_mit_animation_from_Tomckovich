// import 'swiper/swiper-bundle.css'
import '../styles/reset.scss';
import '../styles/styles.scss';
import { languages } from './languages';

import Swiper from 'swiper';

import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import {Navigation} from 'swiper';
// Swiper.use([Navigation]);



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

const values = [
         {
            price: 500,
            title: "Standard Edition",
         },
         {
            price: 600,
            title: "Standard Edition",
         },
         {
            price: 700,
            title: "Deluxe Edition",
         }
]

const checkbox = document.querySelectorAll('.checkbox');
const  header = document.querySelector('.header');
const menuLink = document.querySelectorAll('.menu-link');
const menuButton =  document.querySelector('.header-menu__button'); 
const video = document.getElementById('video');
const videoButton = document.querySelector('.video-btn');
const fagItem = document.querySelectorAll('.faq-item');
const sections = document.querySelectorAll('.section');
const language =  document.querySelectorAll('.language');
const BuyButton =  document.querySelectorAll('.buy-button');
const modal = document.querySelector('.modal');
const modalTitlte = document.querySelector('.modal-version');
const modalPrice = document.querySelector('.modal-total__price');
const modalClose = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');





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
    const tabs = document.querySelectorAll(`[data-${name}]`);
    const siblings = list.parentElement.children;

    for(const item of siblings) item.classList.remove(active);
    for(const tab of tabs) {
        tab.classList.remove(active);
        tab.dataset[name] === value && tab.classList.add(active);
    }
    
    list.classList.add(active);

;


    
};

const initSlider = () => {
    new Swiper(".swiper",{
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        initialSlide: 2,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // modules: [Navigation, Pagination],


    })
}



const handleFaqItem = ({ currentTarget: target }) => {
    target.classList.toggle(classes.opened)
    const isOpened = target.classList.contains(classes.opened);
    const height = target.querySelector('p').clientHeight;
    const content = target.querySelector('.faq-item__content');

    content.style.height = `${isOpened ? height : 0 }px`
}

const handleScroll = () => {
    const { scrollY: y, innerHeight: h } = window;
    sections.forEach((sec)=>{
        if(y > sec.offsetTop - h / 1.2) sec.classList.remove(classes.hidden);
    })
    
}

const setTexts = () => {
    const lang = localStorage.getItem('lang') || 'en';
    const content = languages[lang]

    Object.entries(content).forEach(([key, value])=>{
        const items = document.querySelectorAll(`[data-text="${key}"]`)
        items.forEach((item)=>{item.innerText=value})
    })
}

const toggleLanguage = ({ target }) => {
    const { lang } = target.dataset;

    if(!lang) return;
    localStorage.setItem('lang', lang);
    setTexts();
}

const handleBuyButton = ({ currentTarget: target }) => {
    const { value } = target.dataset;

    if(!value)return;

    const {  price, title } = values[value];
    modalTitlte.innerText = title;
    modalPrice.innerText = `${price} грн.`;
    modal.classList.add(classes.opened);
    overlay.classList.add(classes.opened);
    
}

const closeModal = () => {
    modal.classList.remove(classes.opened);
    overlay.classList.remove(classes.opened);
}

initSlider();
setTexts();
window.addEventListener('scroll', handleScroll);
menuButton.addEventListener('click', toggleMenu);
videoButton.addEventListener('click', handleVideo);
modalClose.addEventListener('click', closeModal);
menuLink.forEach((link) => link.addEventListener('click', scrollTosection));
checkbox.forEach((box) => box.addEventListener('click', handleCheckbox));
fagItem.forEach((item) => item.addEventListener('click', handleFaqItem));
language.forEach((lang) => lang.addEventListener('click', toggleLanguage));
BuyButton.forEach((btn) => btn.addEventListener('click', handleBuyButton));