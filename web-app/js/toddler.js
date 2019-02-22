document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('#trigger');

    document.addEventListener('keyup', event => {
        if (event.key === 'Escape') {
            toggle();
        }
    });

    trigger.addEventListener('click', toggle);

    function toggle() {
        const toddler = document.querySelector('.toddler');

        toddler.style.left = toddler.style.left === '0px' ? '-400px' : '0px';
    }
});
