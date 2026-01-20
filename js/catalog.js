// Функционал каталога
document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация товаров
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.catalog-product');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убрать активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавить активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Показать/скрыть товары
            products.forEach(product => {
                const categories = product.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    product.style.display = 'block';
                    setTimeout(() => {
                        product.style.opacity = '1';
                        product.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    product.style.opacity = '0';
                    product.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        product.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Сортировка
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            alert('В реальном проекте здесь будет сортировка товаров. Выбрано: ' + this.value);
        });
    }
    
    // Кнопки "Запросить цену"
    const priceButtons = document.querySelectorAll('.btn-price');
    priceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.catalog-product').querySelector('.product-title').textContent;
            alert(`Запрос цены на "${productName}" отправлен. Менеджер свяжется с вами для уточнения деталей.`);
        });
    });
    
    // Кнопки "Заказать образец"
    const sampleButtons = document.querySelectorAll('.btn-sample');
    sampleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.catalog-product').querySelector('.product-title').textContent;
            // Перенаправление на страницу контактов с предзаполненной формой
            localStorage.setItem('sampleRequest', productName);
            window.location.href = 'contacts.html';
        });
    });
    
    // Если был запрос образца, показать уведомление на странице контактов
    if (window.location.pathname.includes('contacts.html')) {
        const sampleProduct = localStorage.getItem('sampleRequest');
        if (sampleProduct) {
            setTimeout(() => {
                alert(`Не забудьте запросить образец продукта: ${sampleProduct}`);
                localStorage.removeItem('sampleRequest');
            }, 1000);
        }
    }
});