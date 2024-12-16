document.addEventListener('DOMContentLoaded', () => {
  const { ScrollObserver, valueAtPercentage } = aat;

  const cardsContainers = document.querySelectorAll('.card-container');

  cardsContainers.forEach((container) => {
    const cards = container.querySelectorAll('.card');

    cards.forEach((card, cardIndex) => {
      const cardInner = card.querySelector('.card__inner');
      const nextCard = cards[cardIndex + 1];

      if (!nextCard) return; // No next card in the container

      ScrollObserver.Element(nextCard, {
        offsetTop: 0,  // Start animating as soon as the next card enters the viewport
        offsetBottom: window.innerHeight // Finish animating when nextCard is fully in view
      }).onScroll(({ percentageY }) => {
        const scaleValue = valueAtPercentage({
          from: 1,
          to: 0.9,
          percentage: percentageY
        });
        const brightnessValue = valueAtPercentage({
          from: 1,
          to: 0.6,
          percentage: percentageY
        });

        // Apply the transformations to the current card
        cardInner.style.transform = `scale(${scaleValue})`;
        cardInner.style.filter = `brightness(${brightnessValue})`;

        // Reset styles when the next card takes the place
        if (percentageY === 1) {
          cardInner.style.transform = 'scale(1)';
          cardInner.style.filter = 'brightness(1)';
        }
      });
    });
  });
});
