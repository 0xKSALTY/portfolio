document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1200,
    });

    const aboutMeLink = document.getElementById('aboutMeLink');
    const aboutMePopup = document.getElementById('aboutMePopup');
    const closeBtn = document.querySelector('.popup-content .close');

    aboutMeLink.addEventListener('click', function(event) {
        event.preventDefault();
        aboutMePopup.classList.toggle('hidden');
    });

    closeBtn.addEventListener('click', function() {
        aboutMePopup.classList.add('hidden');
    });

    const optionsMenuButton = document.getElementById('optionsMenuButton');
    const optionsMenu = document.getElementById('optionsMenu');

    optionsMenuButton.addEventListener('click', function(event) {
        event.preventDefault();
        optionsMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function(event) {
        if (!optionsMenuButton.contains(event.target) && !optionsMenu.contains(event.target)) {
            optionsMenu.classList.add('hidden');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1200,
    });

    const aboutMeLink = document.getElementById('aboutMeLink');
    const aboutMePopup = document.getElementById('aboutMePopup');
    const closeBtn = document.querySelector('.popup-content .close');

    aboutMeLink.addEventListener('click', function(event) {
        event.preventDefault();
        aboutMePopup.classList.toggle('hidden');
    });

    closeBtn.addEventListener('click', function() {
        aboutMePopup.classList.add('hidden');
    });

    const optionsMenuButton = document.getElementById('optionsMenuButton');
    const optionsMenu = document.getElementById('optionsMenu');

    optionsMenuButton.addEventListener('click', function(event) {
        event.preventDefault();
        optionsMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function(event) {
        if (!optionsMenuButton.contains(event.target) && !optionsMenu.contains(event.target)) {
            optionsMenu.classList.add('hidden');
        }
    });

    const spaceship = document.getElementById('spaceship');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        // Add the 'rising' class to the spaceship when the user scrolls
        if (scrollPosition > 100) {
            spaceship.classList.add('rising');
        } else {
            spaceship.classList.remove('rising');
        }
    });
});
