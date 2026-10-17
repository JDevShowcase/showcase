import ProjectCarousel from './ProjectCarousel';
import experience from './data/experience.json';
import { useEffect, useState } from 'react';
import {
  Moon, Sun, Globe, Github, Linkedin, ExternalLink,
  Terminal, Database, Code2, GraduationCap, Microscope
} from 'lucide-react';

const sectionIds = ['inicio', 'sobre-mi', 'perfil', 'portafolio'];

const App = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('es');

  const [projects, setProjects] = useState([]);
  const [projectsError, setProjectsError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}Projects/Projects_List.json`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Projects unavailable'); return response.json(); })
      .then(data => setProjects(data.projects.filter(project => project.id && project.title)))
      .catch(error => { if (error.name !== 'AbortError') setProjectsError(true); });
    return () => controller.abort();
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    let frame;
    const updateSection = () => {
      const marker = Math.min(window.innerHeight * 0.3, 240);
      let current = sectionIds[0];
      for (const id of sectionIds) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= marker) current = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = sectionIds[sectionIds.length - 1];
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateSection);
    };
    updateSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.getElementById('root'));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  // Diccionario de traducciones ajustado a tu perfil
  const t = {
    es: {
      nav: ['Inicio', 'Sobre mí', 'Perfil', 'Portafolio'],
      role: 'Ingeniero Civil Informático & Desarrollador',
      resumeBtn: 'Ver Perfil',
      portfolioBtn: 'Proyectos',
      aboutTitle: 'SOBRE MÍ',
      availability: 'Trabajo y proyectos freelance',
      location: 'Casablanca, Chile',
      bio: 'Soy Joseph Donoso, ingeniero civil informático de la PUCV, titulado en julio de 2026 con honor. Me interesan la inteligencia artificial, la optimización y el desarrollo web. Busco oportunidades laborales y proyectos freelance.',

      // Nuevos textos para la sección CV
      education: 'Educación',
      degree: 'Ingeniería Civil Informática',
      university: 'Pontificia Universidad Católica de Valparaíso',
      graduating: 'Titulado en julio de 2026 · Con honor · 2.º lugar',
      techStack: 'Stack Tecnológico',
      areasOfInterest: 'Áreas de Interés',
      academicExp: 'Experiencia Académica & Liderazgo',

      roles: {
        ra: 'Investigador en Optimización',
        ta: 'Ayudante de Cátedra',
        tutor: 'Tutor Par'
      },
      present: 'Presente'
    },
    en: {
      nav: ['Home', 'About', 'Profile', 'Portfolio'],
      role: 'Computer Engineer & Developer',
      resumeBtn: 'View Profile',
      portfolioBtn: 'Projects',
      aboutTitle: 'ABOUT',
      availability: 'Employment and freelance projects',
      location: 'Casablanca, Chile',
      bio: 'I am Joseph Donoso, a PUCV computer engineering graduate. I graduated in July 2026 with honors. My interests include artificial intelligence, optimization and web development. I am seeking employment and freelance projects.',

      education: 'Education',
      degree: 'Civil Engineering in Computer Science',
      university: 'Pontificia Universidad Católica de Valparaíso',
      graduating: 'Graduated July 2026 · With honors · Ranked 2nd',
      techStack: 'Tech Stack',
      areasOfInterest: 'Areas of Interest',
      academicExp: 'Academic Experience & Leadership',

      roles: {
        ra: 'Optimization Researcher',
        ta: 'Teaching Assistant',
        tutor: 'Peer Tutor'
      },
      present: 'Present'
    }
  };

  const currentT = t[lang];

  // Paleta de colores dinámica
  const bgMain = isDark ? 'bg-[#0f1115] text-gray-200' : 'bg-gray-50 text-gray-800';
  const bgSecondary = isDark ? 'bg-[#15181e]' : 'bg-white';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const borderMuted = isDark ? 'border-gray-800' : 'border-gray-200';
  const accentColor = 'text-[#38bdf8]';
  const accentBg = 'bg-[#38bdf8]';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${bgMain}`}>

      {/* NAVEGACIÓN */}
      <nav className={`fixed w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md ${isDark ? 'bg-[#0f1115]/80' : 'bg-gray-50/80'} border-b ${borderMuted}`}>
        <div className="flex items-center gap-10">
          <div className="text-xl font-bold tracking-tighter">JDevShowcase</div>
          <ul className="hidden md:flex gap-6 text-sm uppercase tracking-widest font-semibold">
            {currentT.nav.map((item, i) => (
              <li key={i} className={`cursor-pointer hover:text-[#38bdf8] transition-colors ${activeSection === sectionIds[i] ? accentColor : textMuted}`}>
                <a href={`#${sectionIds[i]}`} aria-current={activeSection === sectionIds[i] ? 'location' : undefined}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'} onClick={toggleLang} className={`flex items-center gap-2 text-sm font-bold uppercase hover:text-[#38bdf8] transition-colors`}>
            <Globe size={18} /> {lang}
          </button>
          <button aria-label={lang === 'es' ? 'Cambiar tema' : 'Toggle theme'} onClick={toggleTheme} className={`p-2 rounded-full hover:bg-gray-500/20 transition-colors`}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* SECCIÓN 1: HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center px-8 md:px-20 overflow-hidden">
        <div className={`absolute inset-0 z-0 transition-colors duration-500 ${isDark ? 'bg-[#0f1115]' : 'bg-gray-50'}`}>
          {/* Opacidad y fondo condicionados al modo claro/oscuro */}
          <img
            src={`${import.meta.env.BASE_URL}background-image.jpg`}
            alt="Workspace"
            className={`w-full h-full object-cover grayscale transition-opacity duration-500 ${isDark ? 'opacity-30 md:opacity-50' : 'opacity-30 md:opacity-40'}`}
          />
          <div className={`absolute inset-0 bg-linear-to-r ${isDark ? 'from-[#0f1115] via-[#0f1115]/90 to-transparent' : 'from-gray-50 via-gray-50/70 to-transparent'}`}></div>
        </div>

        <div className="relative z-10 max-w-2xl mt-20">
          <h1 className="text-6xl md:text-8xl font-black mb-2 leading-none tracking-tighter uppercase">
            JOSEPH<br/>
            <span className={isDark ? 'text-white' : 'text-black'}>DONOSO</span>
          </h1>
          <p className={`text-lg md:text-xl font-medium tracking-[0.2em] uppercase mb-10 ${textMuted}`}>
            {currentT.role}
          </p>

          <div className="flex flex-wrap gap-4 mb-20">
            <a href="#perfil" className={`px-8 py-3 rounded-full border border-current hover:bg-[#38bdf8] hover:text-white hover:border-transparent transition-all uppercase text-xs font-bold tracking-widest`}>
              {currentT.resumeBtn}
            </a>
            <a href="#portafolio" className={`px-8 py-3 rounded-full border border-current hover:bg-[#38bdf8] hover:text-white hover:border-transparent transition-all uppercase text-xs font-bold tracking-widest`}>
              {currentT.portfolioBtn}
            </a>
          </div>

          <div className={`flex gap-6 ${textMuted}`}>
            <a href="https://github.com/JosephDonoso" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Joseph Donoso"><Github className="hover:text-[#38bdf8] transition-colors" size={24} /></a>
            <a href="https://www.linkedin.com/in/joseph-donoso-b342a4324/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Joseph Donoso"><Linkedin className="hover:text-[#38bdf8] transition-colors" size={24} /></a>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: ABOUT */}
      <section id="sobre-mi" className={`scroll-mt-24 py-32 px-8 md:px-20 ${bgSecondary}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black mb-2 uppercase tracking-widest">{currentT.aboutTitle}</h2>
            <p className={`text-sm mb-10 ${accentColor}`}>{currentT.availability}</p>

            <p className={`text-lg leading-relaxed mb-12 ${textMuted}`}>
              {currentT.bio}
            </p>

            <div className={`flex items-end gap-4 text-sm ${textMuted} whitespace-pre-line`}>
              <div className={`w-12 h-0.5 mb-2 ${accentBg}`}></div>
              {currentT.location}
            </div>
          </div>

          <div className="relative aspect-4/5 w-full max-w-md mx-auto grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src={`${import.meta.env.BASE_URL}hero-image.png`}
              alt="Portrait"
              className="object-cover w-full h-full rounded-lg shadow-2xl"
            />
            <div className={`absolute -inset-4 border-2 ${borderMuted} -z-10 rounded-lg hidden md:block`}></div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: PERFIL ACADÉMICO / EXPERIENCIA (NUEVO DISEÑO) */}
      <section id="perfil" className="scroll-mt-24 py-32 px-8 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16">

          {/* COLUMNA IZQUIERDA: Fundamentos (1/3) */}
          <div className="md:col-span-4 space-y-16">

            {/* Tarjeta de Educación */}
            <div>
              <h3 className={`text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-3 ${accentColor}`}>
                <GraduationCap size={20} /> {currentT.education}
              </h3>
              <div className={`p-6 rounded-2xl border ${borderMuted} ${isDark ? 'bg-white/5' : 'bg-black/5'} shadow-sm hover:-translate-y-1 transition-transform`}>
                <h4 className="font-bold text-xl mb-1">{currentT.degree}</h4>
                <p className={`text-sm mb-6 ${textMuted}`}>{currentT.university}</p>
                <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  {currentT.graduating}
                </div>
              </div>
            </div>

            {/* Stack de Tecnologías en Tags */}
            <div>
              <h3 className={`text-sm font-black mb-6 uppercase tracking-widest ${accentColor}`}>
                {currentT.techStack}
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(['Python', 'PyTorch', 'Keras', ...projects.flatMap(project => project.skills)])].map((skill, i) => (
                  <span
                    key={i}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border ${borderMuted} hover:bg-[#38bdf8] hover:text-white hover:border-transparent transition-all cursor-default`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Áreas de Interés / Especialización */}
            <div>
              <h3 className={`text-sm font-black mb-6 uppercase tracking-widest border-t pt-8 ${borderMuted} ${accentColor}`}>
                {currentT.areasOfInterest}
              </h3>
              <ul className={`space-y-4 text-sm font-medium ${textMuted}`}>
                <li className="flex items-center gap-3 group">
                  <Terminal size={18} className="group-hover:text-[#38bdf8] transition-colors" />
                  {lang === 'es' ? 'Desarrollo web' : 'Web development'}
                </li>
                <li className="flex items-center gap-3 group">
                  <Database size={18} className="group-hover:text-[#38bdf8] transition-colors" />
                  {lang === 'es' ? 'Inteligencia artificial' : 'Artificial intelligence'}
                </li>
                <li className="flex items-center gap-3 group">
                  <Code2 size={18} className="group-hover:text-[#38bdf8] transition-colors" />
                  {lang === 'es' ? 'Optimización y algoritmos' : 'Optimization and algorithms'}
                </li>
              </ul>
            </div>

          </div>

          {/* COLUMNA DERECHA: Experiencia Académica (2/3) */}
          <div className="md:col-span-8">
            <h3 className="text-sm font-black mb-12 uppercase tracking-widest flex items-center gap-4">
              {currentT.academicExp}
              <span className={`h-px flex-1 ${borderMuted}`}></span>
            </h3>

            <div className="space-y-12">

              {experience.map(item => (
                <article key={item.id} className={`group border-l-2 pl-6 ${borderMuted}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${textMuted}`}>{item.dates[lang]}</p>
                  <h4 className="text-xl font-bold mb-2 flex items-start gap-3">
                    {item.id === 'research' && <Microscope size={20} className={`shrink-0 mt-1 ${accentColor}`} />}
                    {item.title[lang]}
                  </h4>
                  <p className={`text-sm mb-2 ${accentColor}`}>{currentT.university}</p>
                  <p className={`text-xs mb-4 ${textMuted}`}>{item.details[lang]}</p>
                  <p className={`text-sm leading-relaxed mb-4 ${textMuted}`}>{item.summary[lang]}</p>
                  <ul className={`list-disc pl-5 space-y-2 text-sm leading-relaxed ${textMuted}`}>
                    {item.responsibilities[lang].map(text => <li key={text}>{text}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section id="portafolio" className={`scroll-mt-24 py-24 px-8 md:px-20 ${bgSecondary}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-10">{lang === 'es' ? 'Proyectos' : 'Projects'}</h2>
          {projectsError && <p role="alert">{lang === 'es' ? 'No se pudieron cargar los proyectos. Intenta recargar la página.' : 'Projects could not be loaded. Please reload the page.'}</p>}
          <ProjectCarousel projects={projects} lang={lang}>
            {project => (
              <article key={project.id} className={`rounded-2xl border ${borderMuted} overflow-hidden`}>
                {project.image && <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={project.title} className="w-full aspect-video object-cover" loading="lazy" />}
                <div className="p-8">
                  <p className={`text-xs uppercase tracking-widest mb-3 ${accentColor}`}>{project.category[lang]}</p>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className={`leading-relaxed mb-6 ${textMuted}`}>{project.description[lang]}</p>
                  <div className="flex flex-wrap gap-2 mb-6">{project.skills.map(skill => <span key={skill} className={`border ${borderMuted} rounded-full px-3 py-1 text-xs`}>{skill}</span>)}</div>
                  <div className="flex flex-wrap gap-6 text-sm font-bold">
                    {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#38bdf8]"><ExternalLink size={16} />{lang === 'es' ? 'Ver proyecto' : 'Live project'}</a>}
                    {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#38bdf8]"><Github size={16} />GitHub</a>}
                    {project.links.article ? (
                      <a href={project.links.article} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#38bdf8]"><ExternalLink size={16} />{lang === 'es' ? 'Artículo' : 'Article'}</a>
                    ) : project.articlePending && (
                      <button type="button" disabled className="inline-flex items-center gap-2 opacity-50 cursor-not-allowed" title={lang === 'es' ? 'Disponible cuando se publique el artículo' : 'Available when the article is published'}>
                        <ExternalLink size={16} />{lang === 'es' ? 'Artículo · Próximamente' : 'Article · Coming soon'}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )}
          </ProjectCarousel>
        </div>
      </section>

    </div>
  );
};

export default App;
