document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('#trigger');

    if (trigger) {
        trigger.addEventListener('click', toggle);
    }

    document.addEventListener('keyup', event => {
        if (event.key === 'Escape') {
            toggle();
        }
    });

    function toggle() {
        const toddler = document.querySelector('.toddler');

        if (toddler.classList.contains('open')) {
            toddler.classList.remove('open');
            toddler.classList.add('close');

            return;
        }

        toddler.classList.remove('close');
        toddler.classList.add('open');
    }
});
