// Контакты
document.addEventListener('DOMContentLoaded', function() {
    // Форма обратной связи
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('Спасибо за ваше сообщение! Мы ответим в течение 24 часов.');
                contactForm.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля.');
            }
        });
    }
    
    // FAQ аккордеон
    document.querySelectorAll('.faq-item .faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            
            // Закрываем другие открытые
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Переключаем текущий
            faqItem.classList.toggle('active');
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});