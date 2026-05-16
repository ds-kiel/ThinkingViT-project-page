window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});


function setupThinkingVideoScrubber() {
    const video = document.getElementById('thinkingvit-demo-video');
    if (!video) {
        return;
    }

    const figure = video.closest('.video-figure');
    const scrubber = figure ? figure.querySelector('[data-video-scrubber]') : null;
    const toggle = figure ? figure.querySelector('[data-video-toggle]') : null;
    const currentTime = figure ? figure.querySelector('[data-current-time]') : null;
    const durationTime = figure ? figure.querySelector('[data-duration]') : null;

    if (!scrubber || !toggle || !currentTime || !durationTime) {
        return;
    }

    let isScrubbing = false;

    function formatTime(seconds) {
        const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
        const minutes = Math.floor(safeSeconds / 60);
        const remainingSeconds = Math.floor(safeSeconds % 60).toString().padStart(2, '0');
        return minutes + ':' + remainingSeconds;
    }

    function syncDuration() {
        const duration = Number.isFinite(video.duration) ? video.duration : 0;
        scrubber.max = Math.max(1, Math.round(duration * 1000));
        durationTime.textContent = formatTime(duration);
        scrubber.disabled = false;
        toggle.disabled = false;
        syncProgress();
    }

    function syncProgress() {
        if (!isScrubbing) {
            scrubber.value = Math.round(video.currentTime * 1000);
        }
        currentTime.textContent = formatTime(video.currentTime);
    }

    function syncToggle() {
        const isPlaying = !video.paused && !video.ended;
        toggle.classList.toggle('is-playing', isPlaying);
        toggle.setAttribute('aria-label', isPlaying ? 'Pause animation' : 'Play animation');
    }

    scrubber.disabled = true;
    toggle.disabled = true;

    toggle.addEventListener('click', function() {
        if (video.paused || video.ended) {
            video.play().catch(function(error) {
                console.warn('Video playback failed:', error);
            });
        } else {
            video.pause();
        }
    });

    scrubber.addEventListener('input', function() {
        isScrubbing = true;
        video.currentTime = Number(scrubber.value) / 1000;
        syncProgress();
    });

    scrubber.addEventListener('change', function() {
        isScrubbing = false;
        syncProgress();
    });

    scrubber.addEventListener('pointerdown', function() {
        isScrubbing = true;
    });

    scrubber.addEventListener('pointerup', function() {
        isScrubbing = false;
        syncProgress();
    });

    video.addEventListener('loadedmetadata', syncDuration);
    video.addEventListener('durationchange', syncDuration);
    video.addEventListener('timeupdate', syncProgress);
    video.addEventListener('play', syncToggle);
    video.addEventListener('pause', syncToggle);
    video.addEventListener('ended', syncToggle);

    if (video.readyState >= 1) {
        syncDuration();
    }
    syncToggle();
}

document.addEventListener('DOMContentLoaded', setupThinkingVideoScrubber);

$(document).ready(function() {
    bulmaSlider.attach();
})
