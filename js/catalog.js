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
// Функционал каталога с пагинацией и фильтрацией
document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.catalog-product');
    const productGrid = document.getElementById('productGrid');
    const productCount = document.getElementById('productCount');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    const perPageSpan = document.getElementById('perPage');
    
    // Настройки пагинации
    const productsPerPage = 9;
    let currentPage = 1;
    let totalProducts = products.length;
    let totalPages = Math.ceil(totalProducts / productsPerPage);
    
    // Текущие активные фильтры
    let activeFilters = {
        category: 'all',
        weight: 'all',
        shelf: 'all'
    };
    
    // Инициализация
    initPagination();
    applyFilters();
    showPage(currentPage);
    
    // Инициализация пагинации
    function initPagination() {
        // Создаем номера страниц
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('a');
            pageBtn.href = '#';
            pageBtn.className = 'page-number';
            pageBtn.textContent = i;
            pageBtn.dataset.page = i;
            
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            
            pageBtn.addEventListener('click', function(e) {
                e.preventDefault();
                goToPage(parseInt(this.dataset.page));
            });
            
            pageNumbers.appendChild(pageBtn);
        }
        
        updatePaginationInfo();
    }
    
    // Переход на страницу
    function goToPage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return;
        
        currentPage = page;
        showPage(currentPage);
        updatePaginationControls();
        updatePaginationInfo();
        
        // Прокрутка к началу каталога
        productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Показать товары страницы
    function showPage(page) {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        
        // Сначала скрыть все товары
        products.forEach(product => {
            product.style.display = 'none';
            product.style.opacity = '0';
        });
        
        // Показать товары текущей страницы с анимацией
        let visibleCount = 0;
        products.forEach((product, index) => {
            const productPage = parseInt(product.dataset.page);
            
            if (productPage === page) {
                setTimeout(() => {
                    product.style.display = 'block';
                    setTimeout(() => {
                        product.style.opacity = '1';
                    }, index * 50);
                }, 100);
                visibleCount++;
            }
        });
        
        // Обновить счетчик
        productCount.textContent = totalProducts;
        perPageSpan.textContent = visibleCount;
    }
    
    // Обновление элементов пагинации
    function updatePaginationControls() {
        // Обновить активную страницу
        document.querySelectorAll('.page-number').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.page) === currentPage) {
                btn.classList.add('active');
            }
        });
        
        // Обновить кнопки "назад/вперед"
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        
        if (currentPage === 1) {
            prevBtn.setAttribute('disabled', 'disabled');
        } else {
            prevBtn.removeAttribute('disabled');
        }
        
        if (currentPage === totalPages) {
            nextBtn.setAttribute('disabled', 'disabled');
        } else {
            nextBtn.removeAttribute('disabled');
        }
    }
    
    // Обновить информацию о странице
    function updatePaginationInfo() {
        pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
    }
    
    // Обработчики кнопок "назад/вперед"
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!this.disabled) {
            goToPage(currentPage - 1);
        }
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!this.disabled) {
            goToPage(currentPage + 1);
        }
    });
});