document.addEventListener('DOMContentLoaded', () => {
  fetch('/review-architecture.json') // путь к файлу относительно HTML-документа
    .then(response => response.json())
    .then(data => {
      const feedbacks = data;
      let selectedIdx = 0;

      const feedbacksBlock = document.querySelector('.feedbacks');
      const prevButton = document.getElementById('prev');
      const nextButton = document.getElementById('next');

      const updateFeedbackDisplay = () => {
        feedbacksBlock.innerHTML = `
          <p>${selectedIdx + 1}/${feedbacks.length}</p>
          <div class="screen-five-feedback">
            <div class="screen-five-feedback-avatar-name">
              <div class="screen-five-feedback-avatar">
                <img src="${feedbacks[selectedIdx].studentsAvatar}" alt="${feedbacks[selectedIdx].alt} ${feedbacks[selectedIdx].studentsName}"> 
              </div>  
              <div class="screen-five-feedback-name-and-course">
                <div class="screen-five-feedback-name">
                  <h4>${feedbacks[selectedIdx].studentsName}</h4>
                </div>
              </div>
            </div>
            <div class="screen-five-feedback-comment-text"><p>${feedbacks[selectedIdx].studentsFeedback}</p></div>
          </div>
        `;

        // Обновляем состояние кнопок
        prevButton.disabled = selectedIdx === 0;
        nextButton.disabled = selectedIdx === feedbacks.length - 1;
      };

      // Инициализация слайдера
      updateFeedbackDisplay();

      // Обработчики событий для кнопок
      prevButton.addEventListener('click', () => {
        if (selectedIdx > 0) {
          selectedIdx--;
          updateFeedbackDisplay();
        }
      });

      nextButton.addEventListener('click', () => {
        if (selectedIdx < feedbacks.length - 1) {
          selectedIdx++;
          updateFeedbackDisplay();
        }
      });
    })
    .catch(error => console.error('Error:', error));
});
