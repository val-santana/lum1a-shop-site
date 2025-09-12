// JavaScript para o site LUM1A.SHOP

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de fade-in para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplica a animação aos cards de oportunidades
    const cards = document.querySelectorAll('.opportunity-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Efeito de parallax sutil no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Adiciona classe ativa ao header quando rola a página
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Efeito hover nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animação de digitação para o título principal (apenas na página inicial)
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                mainTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Inicia a animação após um pequeno delay
        setTimeout(typeWriter, 1000);
    }

    // Tracking de cliques nos CTAs (para analytics futuras)
    const ctaButtons = document.querySelectorAll('a[href^="http"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const currentPage = window.location.pathname;
            
            // Log para debug (pode ser substituído por analytics reais)
            console.log(`CTA clicked: "${buttonText}" on page: ${currentPage}`);
            
            // Aqui você pode adicionar código para enviar dados para Google Analytics
            // ou outras ferramentas de tracking
        });
    });

    // Adiciona efeito de loading aos links externos
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Redirecionando...';
            this.style.opacity = '0.7';
            
            // Restaura o texto original após um tempo
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 2000);
        });
    });

    // Melhora a acessibilidade - adiciona indicadores de foco
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #e94560';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Lazy loading para imagens (se houver)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Console log de boas-vindas
    console.log('%c🚀 LUM1A.SHOP - A Loja do Futuro', 'color: #e94560; font-size: 20px; font-weight: bold;');
    console.log('%cSite desenvolvido com tecnologias modernas para oferecer a melhor experiência.', 'color: #0f3460; font-size: 14px;');
});

// Função para detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para mobile
if (isMobile()) {
    // Desabilita o efeito parallax em dispositivos móveis para melhor performance
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'none';
        }
    });
}

// Função para mostrar mensagem de carregamento
function showLoading(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<span style="opacity: 0.7;">Carregando...</span>';
    
    return function() {
        element.innerHTML = originalContent;
    };
}

// Prevenção de spam em formulários (se houver)
let lastSubmission = 0;
function preventSpam(callback, delay = 2000) {
    return function(...args) {
        const now = Date.now();
        if (now - lastSubmission > delay) {
            lastSubmission = now;
            return callback.apply(this, args);
        }
    };
}

