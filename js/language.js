document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.lang-button');
    const translatableElements = document.querySelectorAll('[data-lang-pt]');
    const htmlTag = document.documentElement;
    const titleTag = document.querySelector('title');
    const descriptionTag = document.querySelector('meta[name="description"]');

    const defaultLang = 'pt'; // Idioma padrão
    const storageKey = 'portfolioLanguage';

    // Função para definir o idioma
    const setLanguage = (lang) => {
        if (lang !== 'pt' && lang !== 'en') {
            lang = defaultLang; // Garante que o idioma seja válido
        }

        // Atualiza textos dos elementos
        translatableElements.forEach(element => {
            const text = element.dataset[`lang-${lang}`];
            if (text) {
                // Se o elemento for um input ou textarea, usa value, senão textContent
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // Verifica se é placeholder ou value (adapte se necessário)
                    if (element.placeholder && element.dataset[`lang-${lang}`]) {
                         element.placeholder = text;
                    } else {
                         element.value = text;
                    }
                } else if (element.tagName === 'A' && element.classList.contains('resume-button')) {
                     // Caso especial para o botão de currículo que é um link
                     element.textContent = text;
                } 
                 else if (element.tagName === 'SPAN' && element.parentElement.classList.contains('project-links')) {
                     // Caso especial para spans dentro de project-links
                     element.textContent = text;
                 }
                else {
                    // Preserva o ícone se houver (ex: <i...> Ver Projeto)
                    const icon = element.querySelector('i');
                    if (icon) {
                        // Limpa o conteúdo exceto o ícone e adiciona o texto
                        element.innerHTML = ''; // Limpa
                        element.appendChild(icon.cloneNode(true)); // Readiciona o ícone
                        element.appendChild(document.createTextNode(` ${text}`)); // Adiciona texto com espaço
                    } else {
                        element.textContent = text;
                    }
                }
            }
        });

        // Atualiza o título da página
        if (titleTag && titleTag.dataset[`lang-${lang}`]) {
            titleTag.textContent = titleTag.dataset[`lang-${lang}`];
        }

        // Atualiza a meta description
        if (descriptionTag && descriptionTag.dataset[`lang-${lang}`]) {
            descriptionTag.setAttribute('content', descriptionTag.dataset[`lang-${lang}`]);
        }


        // Atualiza o atributo lang da tag html
        htmlTag.setAttribute('lang', lang);

        // Atualiza a classe 'active' nos botões
        languageButtons.forEach(button => {
            if (button.dataset.lang === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Salva a preferência no localStorage
        try {
             localStorage.setItem(storageKey, lang);
        } catch (e) {
            console.error("Could not save language preference to localStorage.", e);
        }
    };

    // Adiciona event listeners aos botões
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.dataset.lang;
            setLanguage(selectedLang);
        });
    });

    // Define o idioma inicial ao carregar a página
    let currentLang = defaultLang;
    try {
        const savedLang = localStorage.getItem(storageKey);
        if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
            currentLang = savedLang;
        }
    } catch (e) {
         console.error("Could not retrieve language preference from localStorage.", e);
    }


    setLanguage(currentLang); // Aplica o idioma inicial (salvo ou padrão)
});
