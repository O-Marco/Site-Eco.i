window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

let btnNext = document.querySelector('.next');
let btnBack = document.querySelector('.back');

let container = document.querySelector('.container');
let list = document.querySelector('.container .list');
let thumb = document.querySelector('.container .thumb');

btnNext.addEventListener('click', () => moveItemsOnClick('next'));
btnBack.addEventListener('click', () => moveItemsOnClick('back'));

function moveItemsOnClick(type) {
  let listItems = document.querySelectorAll('.list .list-item');
  let thumbItems = document.querySelectorAll('.thumb .thumb-item');

  if (type === 'next') {
    list.appendChild(listItems[0]);
    thumb.appendChild(thumbItems[0]);
    container.classList.add('next')
  } else {
    list.prepend(listItems[listItems.length - 1]);
    thumb.prepend(thumbItems[thumbItems.length - 1]);
    container.classList.add('back')
  }

  setTimeout(() => {
    container.classList.remove('next')
    container.classList.remove('back')
}, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    const numberCounters = document.querySelectorAll('.number-card .number');
    const scaryNumbersSection = document.querySelector('.scary-numbers');
    let countersStarted = false; // Flag para garantir que a animação só comece uma vez

    // Função para animar a contagem
    function animateCount(element) {
        const target = parseInt(element.dataset.target);
        let current = 0;
        const duration = 1500; // Duração da animação em milissegundos (1.5 segundos)
        const increment = target / (duration / 10); // Ajusta o incremento para a duração

        const timer = setInterval(() => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current); // Arredonda para cima para não ter decimais
            } else {
                element.textContent = target; // Garante que o número final seja o exato
                clearInterval(timer);
            }
        }, 10); // Atualiza a cada 10ms para uma animação suave
    }

    // Usando Intersection Observer para detectar quando a seção está visível
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                // Se a seção estiver visível e as animações não tiverem começado
                numberCounters.forEach(counter => {
                    animateCount(counter);
                });
                countersStarted = true; // Define a flag como true para não repetir
            }
        });
    }, {
        threshold: 0.5 // Aciona quando 50% da seção estiver visível
    });

    // Começa a observar a seção
    observer.observe(scaryNumbersSection);

    // Adiciona cores dinâmicas para a ponta do balão (se a cor do balão vier de um gradiente)
    // No CSS já fizemos isso com nth-child, mas se a cor fosse dinâmica, faríamos assim:
    document.querySelectorAll('.number-card').forEach(card => {
        const balloon = card.querySelector('.hover-balloon');
        const balloonTip = balloon.querySelector('::after'); // Selecionar pseudo-elementos é complexo no JS
        // Alternativamente, se o background-color fosse uma cor sólida, poderíamos extraí-la.
        // Como estamos usando linear-gradient, definimos as cores da ponta diretamente no CSS.
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null, // Observa a viewport
        rootMargin: '0px',
        threshold: 0.5 // Aciona quando 50% da seção está visível
    };

    const graficoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando a seção do gráfico está visível, anima as barras
                const barras = entry.target.querySelectorAll('.barra-progresso');
                barras.forEach(barra => {
                    const porcentagem = barra.getAttribute('data-porcentagem');
                    barra.style.width = porcentagem + '%';
                });
                // Para de observar depois de animar, para não reanimar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona a seção do gráfico para ser observada
    const graficoSection = document.querySelector('.section-grafico');
    if (graficoSection) {
        graficoObserver.observe(graficoSection);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTopBtn');

    // 1. Função para mostrar/esconder o botão
    const scrollFunction = () => {
        // Define a altura de rolagem para o botão aparecer (ex: 300px)
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    // 2. Adiciona o evento de rolagem
    window.onscroll = function() { scrollFunction() };

    // 3. Adiciona o evento de clique para rolar para o topo
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Rola suavemente
        });
    });

    // Garante que a função de rolagem seja chamada uma vez no carregamento (caso o usuário recarregue a página já rolada)
    scrollFunction();
});


