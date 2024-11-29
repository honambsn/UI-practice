function generateCards(images) {
    const container = document.getElementById('card-container');

    // Iterate over the images array and generate cards dynamically
    images.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.setProperty('--i', index - 3);  // Adjusting the --i value

        // Add the image to the card
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        card.appendChild(img);

        // Add data-text attribute to the card (this is optional, if you want the text visible)
        card.setAttribute('data-text', image.text || 'Rosé');

        // Append the card to the container
        container.appendChild(card);
    });
}

const images = [
    { src: './assets/img1.jpg', alt: 'Image 1', text: 'Rosé' },
    { src: './assets/img2.jpg', alt: 'Image 2', text: 'Rosé' },
    { src: './assets/img3.jpg', alt: 'Image 3', text: 'Rosé' },
    { src: './assets/img4.jpg', alt: 'Image 4', text: 'Rosé' },
    { src: './assets/img6.jpg', alt: 'Image 6', text: 'Rosé' },
    { src: './assets/img7.jpg', alt: 'Image 7', text: 'Rosé' },
    { src: './assets/img9.jpg', alt: 'Image 9', text: 'Rosé' }, // Empty card for the design
    // { src: '', alt: 'Empty', text: '' }  // Empty card for the design
];


generateCards(images);
