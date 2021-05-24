// Show Menu

const showmenu = (toggleId, navId)=>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click',()=>{
            nav.classList.toggle('show-menu')
        })
    }
}

showmenu('nav-toggle','nav-menu')

// Remove menu mobile

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n=> n.addEventListener('click',linkAction))


// Scroll Sections active link

const sections = document.querySelectorAll('section[id]')
function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionheight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

// scroll top

function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll');else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollTop)

// dARK THEME

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

//previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//We obtain the current theme that the interface has by validating the dark theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme)?'dark':'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme)?'bx-moon':'bx-sun'

//we validate if user previously chose a topic
if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click',()=>{
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme',getCurrentTheme());
    localStorage.setItem('selected-icon',getCurrentIcon())
})

//reduce size and print in A4 size

function scaleCV(){
    document.body.classList.add('scale-cv')
}

//Remove size when the cv is download
function removeScale(){
    document.body.classList.remove('scale-cv')
}

//Generate PDf
let areaCV = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

let opt = {
    margin: 0,
    filename: 'CV_Carlos-Gomez.pdf',
    image: {type:'jpeg',quality:0.98},
    html2canvas: {scale:2},
    jsPDF: {  format: 'a4', orientation: 'portrait'}
}


function generateResume(){
    html2pdf(areaCV,opt)
}

//when button is clicked
resumeButton.addEventListener('click',()=>{
    scaleCV()

    generateResume()

    // setTimeout(removeScale,5000)
})