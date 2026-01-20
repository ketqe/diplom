// Обработка форм обратной связи
document.addEventListener('DOMContentLoaded', function() {
    // Форма дилерской заявки
    const dealerForm = document.getElementById('dealerForm');
    const dealerSuccess = document.getElementById('successMessage');
    const newRequestBtn = document.getElementById('newRequest');
    
    if (dealerForm) {
        dealerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация ИНН
            const inn = document.getElementById('inn').value;
            if (inn && !/^\d{10}$|^\d{12}$/.test(inn)) {
                alert('ИНН должен содержать 10 или 12 цифр');
                return;
            }
            
            // Валидация телефона
            const phone = document.getElementById('phone').value;
            if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
                alert('Введите корректный номер телефона');
                return;
            }
            
            // Показать сообщение об успехе
            dealerForm.style.display = 'none';
            dealerSuccess.style.display = 'block';
            
            // В реальном проекте здесь будет отправка на сервер
            console.log('Дилерская заявка отправлена:', {
                company: document.getElementById('company').value,
                inn: inn,
                name: document.getElementById('name').value,
                phone: phone,
                email: document.getElementById('email').value,
                city: document.getElementById('city').value,
                business: document.getElementById('business').value,
                volume: document.getElementById('volume').value,
                message: document.getElementById('message').value
            });
        });
    }
    
    if (newRequestBtn) {
        newRequestBtn.addEventListener('click', function() {
            dealerSuccess.style.display = 'none';
            dealerForm.style.display = 'block';
            dealerForm.reset();
        });
    }
    
    // Форма обратной связи на странице контактов
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация email
            const email = document.getElementById('contact_email').value;
            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Введите корректный email адрес');
                return;
            }
            
            // Показать сообщение об успехе
            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';
            
            // В реальном проекте здесь будет отправка на сервер
            console.log('Обратная связь отправлена:', {
                name: document.getElementById('contact_name').value,
                phone: document.getElementById('contact_phone').value,
                email: email,
                subject: document.getElementById('contact_subject').value,
                message: document.getElementById('contact_message').value
            });
            
            // Автоматическое скрытие сообщения через 5 секунд
            setTimeout(() => {
                contactSuccess.style.display = 'none';
                contactForm.style.display = 'block';
                contactForm.reset();
            }, 5000);
        });
    }
    
    // Маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = '+7' + value.substring(1);
                } else if (value[0] === '9') {
                    value = '+7' + value;
                }
            }
            
            // Форматирование: +7 (XXX) XXX-XX-XX
            if (value.length > 2) {
                value = value.substring(0, 2) + ' (' + value.substring(2);
            }
            if (value.length > 7) {
                value = value.substring(0, 7) + ') ' + value.substring(7);
            }
            if (value.length > 12) {
                value = value.substring(0, 12) + '-' + value.substring(12);
            }
            if (value.length > 15) {
                value = value.substring(0, 15) + '-' + value.substring(15);
            }
            
            this.value = value;
        });
    });
    
    // Открытие карты
    const openMapBtn = document.getElementById('openMap');
    if (openMapBtn) {
        openMapBtn.addEventListener('click', function() {
            const address = encodeURIComponent('г. Пенза, ул. Ростовская, 2А');
            window.open(`https://yandex.ru/maps/?text=${address}`, '_blank');
        });
    }
});