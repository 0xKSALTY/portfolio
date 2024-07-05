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

// Show more roles
document.getElementById('showMoreRoles').addEventListener('click', function() {
    var additionalRoles = document.querySelector('.additional-roles');
    if (additionalRoles.classList.contains('hidden')) {
        additionalRoles.classList.remove('hidden');
        this.textContent = 'Click to hide roles';
    } else {
        additionalRoles.classList.add('hidden');
        this.textContent = 'Click to see more roles';
    }
});
