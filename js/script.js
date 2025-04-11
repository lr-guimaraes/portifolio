// --- INÍCIO: LÓGICA DE TRADUÇÃO E IDIOMA ---

const translations = {
  'pt-BR': {
    page_title: "Leandro • Portifólio",
    meta_description: "Portifólio para apresentação de trabalhos de um desenvolvedor Full stack",
    nav_home: "Início",
    nav_about: "Sobre",
    nav_projects: "Projetos",
    nav_contact: "Contato",
    intro_greeting: "Olá, visitante!",
    intro_name: "Meu nome é Leandro",
    intro_role: "Desenvolvedor Full stack",
    intro_scroll: "scroll",
    about_section_title: "SOBRE MIM",
    about_section_headline: "Conheça mais sobre mim",
    about_text_1: "Olá! Meu nome é Leandro e sou estudante de Engenheira de Computação. Atualmente estou cursando o 10º periodo, aprofundando meus conhecimentos e habilidades na área. Trabalho como desenvolvedor Full Stack",
    about_text_2: "de Nível Médio, onde tenho a oportunidade de criar e aprimorar soluções tecnológicas completas, desde interfaces de usuário, implementação ultilizando IA, RA.",
    about_continue: "Continue me conhecendo através dos meus trabalhos abaixo...",
    projects_section_title: "Meus trabalhos",
    projects_section_headline: "Projetos",
    project1_desc: "Software utilizando IA para analisar a execução de exercícios de musculação. O sistema avalia se os movimentos estão sendo realizados corretamente, fornecendo feedback em tempo real para garantir que os praticantes executem os exercícios de maneira adequada, reduzindo o risco de lesões e melhorando a eficiência do treino.",
    skill_image_processing: "Processamento de imagens",
    skill_pose_estimation: "Estimação de pose",
    skill_ai: "Inteligência artificial",
    view_project: "Ver Projeto",
    project2_title: "Reconstrução 3D para ambientes interativos",
    project2_desc: "Software que utiliza técnicas de reconstrução 3D para criar ambientes virtuais interativos a partir de dados do mundo real, permitindo experiências imersivas e aplicações em diversas áreas como jogos, simulações e visualização arquitetônica.",
    skill_3d_reconstruction: "Reconstrução 3D",
    project3_desc: "Software desenvolvido para calcular o ciclo de vida do carbono incorporado em materiais de construção, desde a sua concepção e extração até a utilização na obra, auxiliando em decisões mais sustentáveis no setor da construção civil.",
    project4_title: "Avaliação fisica",
    project4_desc: "Sistema especialista utilizando regras lógicas para analisar a composição física do paciente (baseado em nível de gordura, idade, etc.) e retornar um feedback sobre seu biotipo e recomendações gerais.",
    skill_expert_system: "Sistema Especialista",
    more_projects_title: "Mais projetos",
    more_projects_desc: "Explore meu GitLab para ver outros projetos e contribuições.",
    view_gitlab: "Ver GitLab",
    resume_section_title: "MEU CURRÍCULO",
    resume_section_headline: "Veja meu currículo",
    resume_button: "Baixar Currículo (PDF)",
    contact_section_title: "Onde você pode me achar...",
    contact_section_headline: "Contato",
    contact_text: "Aqui pode encontrar os principais meios de entrar em contato comigo.",
    footer_copyright: "© Todos os direitos reservados a Leandro Guimarães"
  },
  'en-US': {
    page_title: "Leandro • Portfolio",
    meta_description: "Portfolio showcasing the work of a Full Stack developer",
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_contact: "Contact",
    intro_greeting: "Hello, visitor!",
    intro_name: "My name is Leandro",
    intro_role: "Full stack developer",
    intro_scroll: "scroll",
    about_section_title: "ABOUT ME",
    about_section_headline: "Learn more about me",
    about_text_1: "Hello! My name is Leandro and I am a Computer Engineering student. I am currently in the 10th semester, deepening my knowledge and skills in the field. I work as a Mid-Level Full Stack developer,",
    about_text_2: "where I have the opportunity to create and enhance complete technological solutions, from user interfaces to implementations using AI and AR.",
    about_continue: "Continue getting to know me through my work below...",
    projects_section_title: "My work",
    projects_section_headline: "Projects",
    project1_desc: "Software using AI to analyze the execution of weightlifting exercises. The system evaluates if movements are performed correctly, providing real-time feedback to ensure practitioners execute exercises properly, reducing injury risk and improving workout efficiency.",
    skill_image_processing: "Image Processing",
    skill_pose_estimation: "Pose Estimation",
    skill_ai: "Artificial Intelligence",
    view_project: "View Project",
    project2_title: "3D Reconstruction for Interactive Environments",
    project2_desc: "Software that uses 3D reconstruction techniques to create interactive virtual environments from real-world data, enabling immersive experiences and applications in various fields like gaming, simulations, and architectural visualization.",
    skill_3d_reconstruction: "3D Reconstruction",
    project3_desc: "Software developed to calculate the embodied carbon lifecycle of building materials, from conception and extraction to site use, aiding more sustainable decisions in the construction industry.",
    project4_title: "Physical Assessment",
    project4_desc: "Expert system using logical rules to analyze the patient's physical composition (based on body fat level, age, etc.) and return feedback on their body type and general recommendations.",
    skill_expert_system: "Expert System",
    more_projects_title: "More projects",
    more_projects_desc: "Explore my GitLab to see other projects and contributions.",
    view_gitlab: "View GitLab",
    resume_section_title: "MY RESUME",
    resume_section_headline: "View my resume",
    resume_button: "Download Resume (PDF)",
    contact_section_title: "Where you can find me...",
    contact_section_headline: "Contact",
    contact_text: "Here you can find the main ways to get in touch with me.",
    footer_copyright: "© All rights reserved to Leandro Guimarães"
  }
};

const langCheckbox = document.querySelector('.js-lang-checkbox');
const htmlEl = document.documentElement;

// ***** NOVO: Seleciona o link do botão de currículo *****
const resumeButtonLink = document.querySelector('.resume-button');

function setLanguage(lang) {
  htmlEl.setAttribute('lang', lang);
  htmlEl.dataset.lang = lang;
  localStorage.setItem('portfolioLang', lang);

  // Atualiza o estado do checkbox de idioma
  langCheckbox.checked = lang === 'en-US';

  // ***** NOVO: Atualiza o link do currículo baseado no idioma *****
  if (resumeButtonLink) { // Verifica se o elemento foi encontrado
    const resumeFilename = (lang === 'en-US') ? 'cv en.pdf' : 'cv pt.pdf';
    resumeButtonLink.href = resumeFilename;
    console.log("Resume link set to:", resumeFilename); // Para depuração (opcional)
  } else {
    console.warn("Resume button link not found!"); // Aviso se não encontrar
  }
  // ***** FIM: Atualização do link do currículo *****


  // Aplica traduções de texto (loop existente)
  document.querySelectorAll('[data-translate-key]').forEach(element => {
    const key = element.getAttribute('data-translate-key');
    // ... (restante da lógica de tradução de texto) ...
    // (Essa parte permanece igual à anterior)
    if (translations[lang] && translations[lang][key]) {
        if (element.tagName === 'TITLE') {
             element.textContent = translations[lang][key];
        }
        else if (element.tagName === 'META' && element.name === 'description') {
            element.content = translations[lang][key];
        }
        else if (element.children.length === 0 || key.includes('_desc') || key.includes('_text') || element.closest('.resume-button')) { // Inclui o botão para atualizar o texto dele
             element.textContent = translations[lang][key];
        } else {
             element.innerHTML = translations[lang][key];
        }
    } else {
      // Não traduz o link em si, apenas o texto interno dele
      if (!element.closest('.resume-button') || key !== 'resume_button') {
           console.warn(`Translation key "${key}" not found for language "${lang}"`);
      }
    }
  });
}

// Event Listener para a troca de idioma (permanece igual)
langCheckbox.addEventListener('change', () => {
  const newLang = langCheckbox.checked ? 'en-US' : 'pt-BR';
  setLanguage(newLang);
});

// Inicialização: Define o idioma ao carregar a página (permanece igual)
document.addEventListener('DOMContentLoaded', () => {
    const initialLang = htmlEl.getAttribute('lang') || 'pt-BR';
    setLanguage(initialLang); // Chama a função que agora também atualiza o link
});

// --- FIM: LÓGICA DE TRADUÇÃO E IDIOMA ---

// --- Coloque AQUI o restante do seu código JS (menu, tema, scroll, etc.) ---

// Exemplo: Lógica do tema (adapte se já existir)
const themeCheckbox = document.querySelector('.js-checkbox');
if (themeCheckbox) {
    // Lógica para carregar tema salvo, se houver
    const savedTheme = localStorage.getItem('portfolioTheme') || 'dark_theme';
    document.body.className = savedTheme;
    themeCheckbox.checked = savedTheme === 'dark_theme'; // Assumindo que 'checked' significa dark

    themeCheckbox.addEventListener('change', () => {
        const newTheme = themeCheckbox.checked ? 'dark_theme' : 'light_theme';
        document.body.className = newTheme;
        localStorage.setItem('portfolioTheme', newTheme);
    });
}

// Exemplo: Lógica do menu hamburguer (adapte se já existir)
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.js-menu'); // Assumindo que esta é a lista do menu
if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active'); // Classe que mostra/esconde o menu
    });

    // Fechar menu ao clicar em um link (opcional)
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
             hamburger.classList.remove('active');
             menu.classList.remove('active');
        });
    });
}


// Exemplo: Lógica do botão "Back to Top" (adapte se já existir)
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Mostra após rolar 300px
            backToTopButton.classList.add('ativo');
        } else {
            backToTopButton.classList.remove('ativo');
        }
    });
}

// Exemplo: Lógica de Animação de Scroll (adapte se já existir)
const scrollElements = document.querySelectorAll('.js-scroll');
if (scrollElements.length) {
    const windowHalf = window.innerHeight * 0.6;

    function animateScroll() {
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const isElementVisible = (elementTop - windowHalf) < 0;
            if (isElementVisible) {
                element.classList.add('ativo');
            } else {
                 // Opcional: remover a classe para re-animar se rolar para cima
                 // element.classList.remove('ativo');
            }
        });
    }
    window.addEventListener('scroll', animateScroll);
    animateScroll(); // Executa uma vez ao carregar
}


// Exemplo: Lógica de Header Ativo (adapte se já existir)
const header = document.querySelector('.js-header');
if(header) {
    function activateHeader() {
        if (window.scrollY > 80) { // Ativa depois de rolar 80px
            header.classList.add('ativo');
        } else {
            header.classList.remove('ativo');
        }
    }
    window.addEventListener('scroll', activateHeader);
    activateHeader(); // Verifica no load inicial
}
