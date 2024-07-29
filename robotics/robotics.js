document.addEventListener('DOMContentLoaded', function() {
    var closeBtns = document.querySelectorAll('.close');
    var optionsMenuButton = document.getElementById('optionsMenuButton');
    var optionsMenu = document.getElementById('optionsMenu');
    var aboutMeLink = document.getElementById('aboutMeLink');
    var aboutMePopup = document.getElementById('aboutMePopup');

    closeBtns.forEach(function(btn) {
        btn.onclick = function() {
            aboutMePopup.classList.remove('opacity-100');
            aboutMePopup.querySelector('.popup-content').classList.remove('scale-100');
            setTimeout(function() {
                aboutMePopup.classList.add('hidden');
            }, 300);
        }
    });

    window.onclick = function(event) {
        if (event.target == aboutMePopup) {
            aboutMePopup.classList.remove('opacity-100');
            aboutMePopup.querySelector('.popup-content').classList.remove('scale-100');
            setTimeout(function() {
                aboutMePopup.classList.add('hidden');
            }, 300);
        } else if (!event.target.matches('#optionsMenuButton')) {
            if (optionsMenu.classList.contains('block')) {
                optionsMenu.classList.remove('block');
                optionsMenu.classList.add('hidden');
            }
        }
    }

    optionsMenuButton.onclick = function(event) {
        event.preventDefault();
        optionsMenu.classList.toggle('hidden');
        optionsMenu.classList.toggle('block');
    };

    aboutMeLink.onclick = function(event) {
        event.preventDefault();
        aboutMePopup.classList.remove('hidden');
        setTimeout(function() {
            aboutMePopup.classList.add('opacity-100');
            aboutMePopup.querySelector('.popup-content').classList.add('scale-100');
        }, 10);
    };

    // Intersection Observer to handle animations
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    var imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(function(container) {
        observer.observe(container);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const newBox = document.querySelector('.new-box');
    if (newBox) {
        newBox.addEventListener('mouseover', () => {
            newBox.style.transform = 'translateY(-10px)';
        });
        newBox.addEventListener('mouseout', () => {
            newBox.style.transform = 'translateY(0)';
        });
    }
});


