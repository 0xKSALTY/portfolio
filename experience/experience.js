document.addEventListener('DOMContentLoaded', () => {
    const aboutMeLink = document.getElementById('aboutMeLink');
    const aboutMePopup = document.getElementById('aboutMePopup');
    const close = document.querySelector('.close');

    aboutMeLink.addEventListener('click', (e) => {
        e.preventDefault();
        aboutMePopup.classList.remove('hidden');
        setTimeout(() => {
            aboutMePopup.classList.add('opacity-100');
        }, 10);
    });

    close.addEventListener('click', () => {
        aboutMePopup.classList.remove('opacity-100');
        setTimeout(() => {
            aboutMePopup.classList.add('hidden');
        }, 300);
    });

    const optionsMenuButton = document.getElementById('optionsMenuButton');
    const optionsMenu = document.getElementById('optionsMenu');

    optionsMenuButton.addEventListener('click', (e) => {
        e.preventDefault();
        optionsMenu.classList.toggle('hidden');
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
