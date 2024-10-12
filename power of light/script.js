var pos = document.documentElement;
pos.addEventListener('mouseover', e => {
    pos.style.setProperty('--x', e.clientX + 'px')
    pos.style.setProperty('--y', e.clientY + 'px')
})