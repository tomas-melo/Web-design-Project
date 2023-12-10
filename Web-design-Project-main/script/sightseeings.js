 document.addEventListener('DOMContentLoaded', function () {
            const carousels = document.querySelectorAll('.carousel-item');

            carousels.forEach(carousel => {
                const images = carousel.querySelectorAll('img');
                let currentImageIndex = 0;

                function showImage(index) {
                    images.forEach((img, i) => {
                        img.style.display = i === index ? 'block' : 'none';
                    });
                }

                function nextImage() {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    showImage(currentImageIndex);
                }

                function prevImage() {
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    showImage(currentImageIndex);
                }

                // Mostra a primeira imagem inicialmente para cada carrossel
                showImage(1);

                // Adiciona os event listeners para os botões de navegação
                const prevButton = carousel.querySelector('.nav-btn.prev');
                const nextButton = carousel.querySelector('.nav-btn.next');

                prevButton.addEventListener('click', prevImage);
                nextButton.addEventListener('click', nextImage);
            });
        });