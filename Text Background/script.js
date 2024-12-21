let paragraph = document.querySelector('.text');
let text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit'.repeat(300);

paragraph.textContent = text;
// paragraph.innerHTML = paragraph.textContent.replace(/(adipisicing)/g, '<span class="highlight">$1</span>');
paragraph.innerHTML = paragraph.textContent.replace(/\S/g, '<span>$&</span>');