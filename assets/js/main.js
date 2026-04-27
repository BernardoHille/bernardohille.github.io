(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  let typedInstance = null;

  function initTyped(typedStrings = null) {
    const selectTyped = document.querySelector('.typed');
    if (!selectTyped) return;

    let strings = typedStrings;
    if (!strings) {
      const rawTypedItems = selectTyped.getAttribute('data-typed-items');
      if (!rawTypedItems) return;
      strings = rawTypedItems.split(',');
    }

    const normalizedStrings = strings.map((item) => item.trim());

    if (typedInstance) {
      typedInstance.destroy();
      typedInstance = null;
    }

    const typedContainer = selectTyped.parentElement;
    if (typedContainer) {
      typedContainer.querySelectorAll('.typed-cursor').forEach((cursor) => cursor.remove());
    }

    typedInstance = new Typed('.typed', {
      strings: normalizedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Language switcher (index page only)
   */
  if (document.body.classList.contains('index-page')) {
    const languageStorageKey = 'preferred-language';
    const languageButtons = document.querySelectorAll('.language-toggle .lang-btn');
    const languageToggle = document.querySelector('.language-toggle');
    const sideNav = document.querySelector('#side-nav');
    const heroScrollCue = document.querySelector('.hero-scroll-cue');
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const typedItemsByLanguage = {
      pt: [
        'Desenvolvedor Front-end',
        'especialista em React e Next.js',
        'criador de interfaces performáticas',
        'integrador de APIs e dados'
      ],
      en: [
        'Front-end Developer',
        'React and Next.js specialist',
        'creator of high-performance interfaces',
        'API and data integration specialist'
      ]
    };

    const textTranslationsEn = {
      'Bernardo Hille | Portfólio': 'Bernardo Hille | Portfolio',
      'Início': 'Home',
      'Sobre': 'About',
      'Projetos': 'Projects',
      'Experiência': 'Experience',
      'Contato': 'Contact',
      'Falar comigo': "Let's talk",
      'Sou': 'I am',
      'Role para conhecer': 'Scroll to explore',
      'Sobre mim': 'About me',
      'Projetos em destaque': 'Featured projects',
      'Anos de experiência': 'Years of experience',
      'Pesquisas científicas': 'Scientific studies',
      'CV em breve': 'Resume coming soon',
      'Perfil': 'Profile',
      'Construindo interfaces digitais para web, dados e produto': 'Building digital interfaces for web, data, and products',
      'Construo interfaces responsivas e de alta performance. Na Aeon VR, desenvolvo produtos web com React, Next.js, autenticação, integrações com APIs REST e fluxos conectados a dados em tempo real.': 'I build responsive, high-performance interfaces. At Aeon VR, I develop web products with React, Next.js, authentication flows, REST API integrations, and real-time data experiences.',
      'Também passei por agência, ERP, e-commerce e pesquisa aplicada, criando landing pages, hotsites, fluxos de cadastro/login, telas internas, documentação técnica e interfaces embarcadas.': 'I have also worked across agency, ERP, e-commerce, and applied research contexts, delivering landing pages, hotsites, signup/login flows, internal dashboards, technical documentation, and embedded interfaces.',
      'Minha base acadêmica em computação gráfica fortalece meu olhar técnico para interface, visualização de dados e experiências digitais aplicadas a produtos reais.': 'My academic background in computer graphics strengthens my technical perspective on UI, data visualization, and digital experiences applied to real products.',
      'Formação': 'Education',
      'Base': 'Location',
      'Disponibilidade': 'Availability',
      'Disponível para oportunidades': 'Open to opportunities',
      'Trabalhos em front-end, campanhas digitais, documentação, integrações, produto web, ERP, e-commerce e pesquisa aplicada para marcas, startups e universidades.': 'Work spanning front-end, digital campaigns, documentation, integrations, web products, ERP, e-commerce, and applied research for brands, startups, and universities.',
      'Todos': 'All',
      'Campanhas': 'Campaigns',
      'Produto Web': 'Web Product',
      'Documentação': 'Documentation',
      'Pesquisa': 'Research',
      'Plataforma Web': 'Web Platform',
      'Experiência Web & VR': 'Web Experience & VR',
      'Pesquisa & Indústria': 'Research & Industry',
      'Campanha Digital': 'Digital Campaign',
      'Conversão': 'Conversion',
      'Agência & Multi-cliente': 'Agency & Multi-client',
      'Agência': 'Agency',
      'Documentação & ERP': 'Documentation & ERP',
      'E-commerce & UI responsiva': 'E-commerce & Responsive UI',
      'Competências técnicas': 'Technical skills',
      'Stack para produtos web, integrações e interfaces escaláveis': 'Tech stack for web products, integrations, and scalable interfaces',
      'Combino JavaScript moderno, front-end componentizado, consumo de APIs, performance, dados, documentação e pesquisa aplicada para construir produtos web rápidos, responsivos e fáceis de evoluir.': 'I combine modern JavaScript, component-based front-end architecture, API consumption, performance, data, documentation, and applied research to build fast, responsive, and scalable web products.',
      'Interfaces responsivas com componentização, reutilização, estados de UI e consistência visual': 'Responsive interfaces with componentization, reuse, UI states, and visual consistency',
      'JavaScript tipado, async/await, autenticação, cadastro, login e consumo de dados': 'Typed JavaScript, async/await, authentication, signup/login flows, and data consumption',
      'Performance, tracking, meta tags, eventos e conversão': 'Performance, tracking, meta tags, events, and conversion',
      'Interfaces interativas & prototipagem': 'Interactive interfaces & prototyping',
      'Manipulação de interface, validações no cliente, fluxos visuais e experiências web': 'UI behavior, client-side validation, visual flows, and web experiences',
      'Dados, autenticação e persistência': 'Data, authentication, and persistence',
      'Documentação técnica & ERP': 'Technical documentation & ERP',
      'Manuais, tutoriais, suporte e padronização de fluxos': 'Manuals, tutorials, support, and process standardization',
      'Experiência & formação': 'Experience & education',
      'Minha trajetória mistura front-end de produção, marketing digital, e-commerce, documentação técnica, integrações com dados, ERP e pesquisa acadêmica aplicada.': 'My journey combines production front-end work, digital marketing, e-commerce, technical documentation, data integrations, ERP, and applied academic research.',
      'Jornada profissional': 'Professional journey',
      'Projetos com foco em interfaces robustas, campanhas digitais, integrações com APIs, autenticação, dados, documentação técnica e pesquisa aplicada.': 'Projects focused on robust interfaces, digital campaigns, API integrations, authentication, data, technical documentation, and applied research.',
      'Atual': 'Current',
      'Desenvolvedor Front-end': 'Front-end Developer',
      'Novembro 2024 - Presente': 'November 2024 - Present',
      'Interfaces em Next.js + React, autenticação, cadastro/login, consumo de APIs REST, fluxos conectados a dados em tempo real e manutenção de produto web. Atuação com componentização, reutilização, estados de loading/erro/empty, validações no cliente e otimizações de renderização e carregamento.': 'Building interfaces in Next.js + React, authentication, signup/login flows, REST API consumption, real-time data workflows, and web product maintenance. Work includes componentization, reuse, loading/error/empty states, client-side validation, and rendering/loading optimization.',
      'Ninho Digital | Agência - Curitiba, PR | Remoto': 'Ninho Digital | Agency - Curitiba, PR | Remote',
      'Novembro 2023 - Novembro 2024': 'November 2023 - November 2024',
      'Criação de landing pages e hotsites com HTML, CSS e JavaScript para clientes como Sistema Positivo de Ensino, Mercado Livre, Cymco, Depimel e outros projetos digitais, garantindo responsividade, compatibilidade cross-browser, performance, SEO on-page e instrumentação de analytics.': 'Creation of landing pages and hotsites with HTML, CSS, and JavaScript for clients such as Sistema Positivo de Ensino, Mercado Livre, Cymco, Depimel, and other digital projects, ensuring responsiveness, cross-browser compatibility, performance, on-page SEO, and analytics instrumentation.',
      'Desenvolvedor Front-end | Suporte de TI e Documentação': 'Front-end Developer | IT Support and Documentation',
      'CIGAM Software de Gestão - Remoto': 'CIGAM Management Software - Remote',
      'Junho 2023 - Dezembro 2023': 'June 2023 - December 2023',
      'Produção de manuais, tutoriais, suporte técnico e padronização de fluxos para um dos maiores ERPs do Brasil. Também atuei com instruções de uso do sistema, atendimento de tickets, reprodução de problemas e documentação clara para orientar usuários e apoiar o time técnico.': "Production of manuals, tutorials, technical support content, and process standardization for one of Brazil's largest ERP platforms. I also worked on system usage guidance, ticket handling, issue reproduction, and clear documentation to support users and technical teams.",
      'Documentação técnica': 'Technical documentation',
      'Suporte técnico': 'Technical support',
      'Comunicação': 'Communication',
      'Janeiro 2020 - Maio 2023': 'January 2020 - May 2023',
      'Manutenção e ajustes de front-end em páginas, sistemas internos e e-commerce, com foco em UI responsiva, páginas de produto, vitrine, navegação, carrinho, formulários, validações no cliente e integrações com APIs de cobrança, entrega e cálculo de frete.': 'Front-end maintenance and improvements for pages, internal systems, and e-commerce, focused on responsive UI, product pages, storefront, navigation, cart, forms, client-side validations, and integrations with payment, delivery, and shipping calculation APIs.',
      'Base acadêmica e pesquisa': 'Academic foundation and research',
      'Formação em computação gráfica e mídia digital, com projetos que conectam programação, interfaces, visualização técnica, robótica, divulgação científica e pesquisa aplicada.': 'Education in computer graphics and digital media, with projects connecting programming, interfaces, technical visualization, robotics, science communication, and applied research.',
      'Fev 2023 - Nov 2026': 'Feb 2023 - Nov 2026',
      'Graduação': "Bachelor's degree",
      'Universidade Federal do Paraná': 'Federal University of Paraná',
      'Bacharelado em Expressão Gráfica - Computação Gráfica e Mídia Digital': "Bachelor's in Graphic Expression - Computer Graphics and Digital Media",
      'Atuação no Laboratório de Metaverso (UFPR) como programador e pesquisador, participação na Equipe Yapira com programação para robótica de combate e colaboração no Projeto Mídias UFPR em conteúdo e divulgação.': 'Worked at the Metaverse Lab (UFPR) as a programmer and researcher, participated in Equipe Yapira with programming for combat robotics, and collaborated with Projeto Mídias UFPR on content and outreach.',
      'Ênfase em computação gráfica e mídia digital, com foco profissional paralelo em desenvolvimento front-end usando React/Next.js, JavaScript/TypeScript, UI, performance e integração com APIs.': 'Strong focus on computer graphics and digital media, alongside professional front-end development with React/Next.js, JavaScript/TypeScript, UI, performance, and API integration.',
      'JavaScript, pesquisa, computação gráfica e mídia digital': 'JavaScript, research, computer graphics, and digital media',
      'Fev 2018 - Nov 2020': 'Feb 2018 - Nov 2020',
      'Técnico': 'Technical',
      'Pontifícia Universidade Católica do Paraná': 'Pontifical Catholic University of Paraná',
      'Técnico em Informática': 'IT Technician',
      'Formação técnica integrada com foco prático em desenvolvimento, fundamentos de sistemas e participação na equipe de robótica TecPuc/PUCPR como programador de robótica de combate.': 'Integrated technical training with a practical focus on software development, systems foundations, and participation in the TecPuc/PUCPR robotics team as a combat robotics programmer.',
      'TCC premiado como Melhor Projeto: Smart Vending Machine, conceito de mercado autônomo com desenvolvimento usando JavaScript e SQL.': 'Award-winning capstone project: Smart Vending Machine, an autonomous retail concept developed with JavaScript and SQL.',
      'React.js, JavaScript, SQL e robótica de combate': 'React.js, JavaScript, SQL, and combat robotics',
      'IC': 'Undergraduate research',
      'Pesquisa aplicada em visualização digital': 'Applied research in digital visualization',
      'Estudos aplicados com foco em captura, organização de dados visuais e preservação digital.': 'Applied studies focused on visual capture, visual data organization, and digital preservation.',
      'TCC': 'Thesis',
      'Em andamento': 'In progress',
      'Digitalização de acervos e exposições': 'Collection digitization and exhibitions',
      'Estudo com tecnologias de captura visual no Museu de Ciências Biológicas da UFPR.': 'Study using visual capture technologies at the UFPR Museum of Biological Sciences.',
      'Vamos conversar': "Let's talk",
      'Se você tem um projeto, vaga, parceria ou pesquisa em andamento, pode me chamar pelos canais abaixo.': 'If you have a project, opportunity, partnership, or ongoing research initiative, feel free to reach out through the channels below.',
      'Curitiba, Paraná, Brasil': 'Curitiba, Paraná, Brazil',
      'Telefone': 'Phone',
      'Contato direto, sem formulário': 'Direct contact, no form',
      'Por enquanto, prefiro centralizar tudo por email, LinkedIn, GitHub ou telefone. Se quiser conversar sobre front-end, campanhas, integrações, sistemas web ou pesquisa, é só me chamar.': 'For now, I prefer to centralize communication via email, LinkedIn, GitHub, or phone. If you want to talk about front-end, campaigns, integrations, web systems, or research, feel free to contact me.',
      'Enviar email': 'Send email',
      'Ligar': 'Call',
      'Portfólio pessoal com foco em front-end, interfaces responsivas, integrações, SEO, analytics e pesquisa aplicada.': 'Personal portfolio focused on front-end development, responsive interfaces, integrations, SEO, analytics, and applied research.',
      'Navegação': 'Navigation',
      'Termos': 'Terms',
      'Privacidade': 'Privacy',
      'Áreas': 'Focus areas',
      'Case Aeon VR': 'Aeon VR Case',
      'Case Movision': 'Movision Case',
      'Case Renault Labs': 'Renault Labs Case',
      'Case COPEL': 'COPEL Case'
    };

    const languageMetadata = {
      pt: {
        documentTitle: 'Bernardo Hille | Portfólio',
        description: 'Portfólio de Bernardo Hille, desenvolvedor front-end com foco em React, Next.js, interfaces responsivas, APIs REST, SEO, analytics, documentação técnica e pesquisa aplicada.',
        keywords: 'Bernardo Hille, portfólio, front-end, React, Next.js, TypeScript, API REST, SEO, analytics, documentação técnica, pesquisa aplicada',
        navAria: 'Navegação principal',
        scrollAria: 'Rolar para a seção Sobre mim',
        toggleAria: 'Alternar idioma',
        htmlLang: 'pt-BR'
      },
      en: {
        documentTitle: 'Bernardo Hille | Portfolio',
        description: 'Portfolio of Bernardo Hille, a front-end developer focused on React, Next.js, responsive interfaces, REST APIs, SEO, analytics, technical documentation, and applied research.',
        keywords: 'Bernardo Hille, portfolio, front-end, React, Next.js, TypeScript, REST API, SEO, analytics, technical documentation, applied research',
        navAria: 'Main navigation',
        scrollAria: 'Scroll to the About section',
        toggleAria: 'Switch language',
        htmlLang: 'en'
      }
    };

    const textNodeRegistry = [];

    const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();

    const registerTextNodes = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      let currentNode = walker.nextNode();
      while (currentNode) {
        textNodeRegistry.push({
          node: currentNode,
          originalText: currentNode.nodeValue,
          normalizedOriginalText: normalizeText(currentNode.nodeValue)
        });
        currentNode = walker.nextNode();
      }
    };

    const updateLanguageToggleState = (language) => {
      languageButtons.forEach((button) => {
        const isActive = button.getAttribute('data-lang') === language;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    };

    const translateTextNodes = (language) => {
      const shouldTranslateToEnglish = language === 'en';

      textNodeRegistry.forEach((entry) => {
        if (!entry.normalizedOriginalText) return;

        const leadingWhitespace = entry.originalText.match(/^\s*/)?.[0] ?? '';
        const trailingWhitespace = entry.originalText.match(/\s*$/)?.[0] ?? '';
        const translatedText = shouldTranslateToEnglish
          ? (textTranslationsEn[entry.normalizedOriginalText] ?? entry.normalizedOriginalText)
          : entry.normalizedOriginalText;

        entry.node.nodeValue = `${leadingWhitespace}${translatedText}${trailingWhitespace}`;
      });
    };

    const applyLanguageMetadata = (language) => {
      const selectedMetadata = languageMetadata[language];
      if (!selectedMetadata) return;

      document.documentElement.setAttribute('lang', selectedMetadata.htmlLang);
      document.title = selectedMetadata.documentTitle;

      if (metaDescription) {
        metaDescription.setAttribute('content', selectedMetadata.description);
      }

      if (metaKeywords) {
        metaKeywords.setAttribute('content', selectedMetadata.keywords);
      }

      if (sideNav) {
        sideNav.setAttribute('aria-label', selectedMetadata.navAria);
      }

      if (heroScrollCue) {
        heroScrollCue.setAttribute('aria-label', selectedMetadata.scrollAria);
      }

      if (languageToggle) {
        languageToggle.setAttribute('aria-label', selectedMetadata.toggleAria);
      }
    };

    const applyLanguage = (language, persistSelection = false) => {
      const selectedLanguage = language === 'en' ? 'en' : 'pt';
      translateTextNodes(selectedLanguage);
      applyLanguageMetadata(selectedLanguage);
      updateLanguageToggleState(selectedLanguage);

      const selectTyped = document.querySelector('.typed');
      if (selectTyped) {
        const selectedTypedItems = typedItemsByLanguage[selectedLanguage];
        selectTyped.setAttribute('data-typed-items', selectedTypedItems.join(','));
        initTyped(selectedTypedItems);
      }

      if (persistSelection) {
        localStorage.setItem(languageStorageKey, selectedLanguage);
      }
    };

    const detectInitialLanguage = () => {
      const persistedLanguage = localStorage.getItem(languageStorageKey);
      if (persistedLanguage === 'pt' || persistedLanguage === 'en') {
        return persistedLanguage;
      }

      const browserLanguage = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
      return browserLanguage.startsWith('en') ? 'en' : 'pt';
    };

    registerTextNodes();
    applyLanguage(detectInitialLanguage(), false);

    languageButtons.forEach((button) => {
      button.addEventListener('click', () => {
        applyLanguage(button.getAttribute('data-lang'), true);
      });
    });
  } else {
    initTyped();
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Open project details when clicking portfolio thumbnails
   */
  document.querySelectorAll('.portfolio .portfolio-image-container').forEach((container) => {
    const detailsLink = container.querySelector('.portfolio-details');
    if (!detailsLink) return;

    const projectTitle = container.closest('.portfolio-card')?.querySelector('h4')?.textContent?.trim();

    container.setAttribute('role', 'link');
    container.setAttribute('tabindex', '0');
    if (projectTitle) {
      container.setAttribute('aria-label', `Abrir detalhes de ${projectTitle}`);
    }

    const openProjectDetails = () => {
      if (detailsLink.target === '_blank') {
        window.open(detailsLink.href, '_blank', 'noopener');
        return;
      }

      window.location.href = detailsLink.href;
    };

    container.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      openProjectDetails();
    });

    container.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openProjectDetails();
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a, .side-nav a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active, .side-nav a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
