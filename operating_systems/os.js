// Toggle About Me Popup
document.getElementById('aboutMeLink').addEventListener('click', function() {
    var aboutMePopup = document.getElementById('aboutMePopup');
    aboutMePopup.classList.toggle('hidden');
    aboutMePopup.classList.toggle('flex');
});

document.querySelector('.popup-content .close').addEventListener('click', function() {
    var aboutMePopup = document.getElementById('aboutMePopup');
    aboutMePopup.classList.add('hidden');
    aboutMePopup.classList.remove('flex');
});

// Toggle Projects Dropdown
document.getElementById('optionsMenuButton').addEventListener('click', function() {
    var optionsMenu = document.getElementById('optionsMenu');
    optionsMenu.classList.toggle('hidden');
});




