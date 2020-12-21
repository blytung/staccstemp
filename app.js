const muteSrc = {
    mute: './assets/mute.svg',
    unmute: './assets/unmute.svg',
};

let interval

const animationManager = () => {
    const logo = document.getElementById('logo');
    const audio = document.getElementById('background-audio');
    const mute = document.getElementById('mute');

    const soundPlaying = !audio.paused;
    let soundMuted = audio.muted;
    audio.volume = 0.2;

    mute.onclick = () => {
        if (soundMuted) {
            if (!soundPlaying) {
                audio.play();

                clearInterval(interval);
                interval = setInterval(
                    () => logo.play(),
                    22000,
                );
            }

            logo.muted = false;

            mute.src = muteSrc.unmute;
            audio.muted = false;
            soundMuted = false;
        } else {
            logo.muted = true;

            mute.src = muteSrc.mute;
            audio.muted = true;
            soundMuted = true;
        }
    }

    interval = setInterval(
        () => logo.play(),
        22000,
    );
}

const titleText = [
    'Legendary concerts on demand',
    'New titles every week',
];

const animationInterval = 3000;

const titleManager = () => {
    const title = document.getElementById('title');

    let count = 0;

    const animate = () => {
        count++;

        title.classList.remove('animate__fadeOutDown');
        title.classList.add('animate__fadeInDown');
        title.innerText = titleText[count % 2 === 0 ? 1 : 0];
        
        setTimeout(() => {
            title.classList.remove('animate__fadeInDown');
            title.classList.add('animate__fadeOutDown');
        }, animationInterval - 400);
    };

    animate();
    setInterval(animate, animationInterval);
}

const successPopup = () => {
    Swal.fire({
        title: 'Thank you for signing up!',
        icon: 'success',
        confirmButtonText: 'Continue',
        heightAuto: false,
    }).then(() => window.history.pushState('', '', '/'));
}

window.onload = () => {
    animationManager();
    titleManager();

    if (window.location.hash === '#thank-you') {
        successPopup();
    }
}
