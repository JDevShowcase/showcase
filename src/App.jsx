import React, { useState } from 'react';
import { 
  Moon, Sun, Globe, Github, Linkedin, Twitter, 
  Terminal, Database, Code2, BookOpen, GraduationCap, Microscope, Users
} from 'lucide-react';

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('es');

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  // Diccionario de traducciones ajustado a tu perfil
  const t = {
    es: {
      nav: ['Inicio', 'Sobre mí', 'Perfil', 'Portafolio'],
      role: 'Estudiante de Informática & Desarrollador',
      resumeBtn: 'Ver Perfil',
      portfolioBtn: 'Proyectos',
      aboutTitle: 'SOBRE MÍ',
      dummyEmail: 'contacto@jdevshowcase.com',
      dummyAddress: 'Universidad de Lorem Ipsum\nFacultad de Ingeniería',
      loremMedium: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      loremLong: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      
      // Nuevos textos para la sección CV
      education: 'Educación',
      degree: 'Ingeniería en Informática',
      university: 'Universidad de Lorem Ipsum',
      graduating: 'Graduación Esperada: 2024',
      techStack: 'Stack Tecnológico',
      areasOfInterest: 'Áreas de Interés',
      academicExp: 'Experiencia Académica & Liderazgo',
      
      roles: {
        ra: 'Ayudante de Investigación',
        ta: 'Ayudante de Cátedra',
        tutor: 'Tutor Par'
      },
      present: 'Presente'
    },
    en: {
      nav: ['Home', 'About', 'Profile', 'Portfolio'],
      role: 'CS Student & Developer',
      resumeBtn: 'View Profile',
      portfolioBtn: 'Projects',
      aboutTitle: 'ABOUT',
      dummyEmail: 'contact@jdevshowcase.com',
      dummyAddress: 'Lorem Ipsum University\nFaculty of Engineering',
      loremMedium: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      loremLong: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      
      education: 'Education',
      degree: 'B.S. Computer Science',
      university: 'Lorem Ipsum University',
      graduating: 'Expected Graduation: 2024',
      techStack: 'Tech Stack',
      areasOfInterest: 'Areas of Interest',
      academicExp: 'Academic Experience & Leadership',
      
      roles: {
        ra: 'Research Assistant',
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
              <li key={i} className={`cursor-pointer hover:${accentColor} transition-colors ${i === 0 ? accentColor : textMuted}`}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleLang} className={`flex items-center gap-2 text-sm font-bold uppercase hover:${accentColor} transition-colors`}>
            <Globe size={18} /> {lang}
          </button>
          <button onClick={toggleTheme} className={`p-2 rounded-full hover:bg-gray-500/20 transition-colors`}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* SECCIÓN 1: HERO */}
      <section className="relative h-screen flex items-center px-8 md:px-20 overflow-hidden">
        <div className={`absolute inset-0 z-0 transition-colors duration-500 ${isDark ? 'bg-[#0f1115]' : 'bg-gray-50'}`}>
          {/* Opacidad y fondo condicionados al modo claro/oscuro */}
          <img 
            src="background-image.jpg" 
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
            <button className={`px-8 py-3 rounded-full border border-current hover:${accentBg} hover:text-white hover:border-transparent transition-all uppercase text-xs font-bold tracking-widest`}>
              {currentT.resumeBtn}
            </button>
            <button className={`px-8 py-3 rounded-full border border-current hover:${accentBg} hover:text-white hover:border-transparent transition-all uppercase text-xs font-bold tracking-widest`}>
              {currentT.portfolioBtn}
            </button>
          </div>

          <div className={`flex gap-6 ${textMuted}`}>
            <Github className="hover:text-[#38bdf8] cursor-pointer transition-colors" size={24} />
            <Linkedin className="hover:text-[#38bdf8] cursor-pointer transition-colors" size={24} />
            <Twitter className="hover:text-[#38bdf8] cursor-pointer transition-colors" size={24} />
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: ABOUT */}
      <section className={`py-32 px-8 md:px-20 ${bgSecondary}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black mb-2 uppercase tracking-widest">{currentT.aboutTitle}</h2>
            <p className={`text-sm mb-10 ${accentColor}`}>{currentT.dummyEmail}</p>
            
            <p className={`text-lg leading-relaxed mb-12 ${textMuted}`}>
              {currentT.loremLong}
            </p>

            <div className={`flex items-end gap-4 text-sm ${textMuted} whitespace-pre-line`}>
              <div className={`w-12 h-0.5 mb-2 ${accentBg}`}></div>
              {currentT.dummyAddress}
            </div>
          </div>
          
          <div className="relative aspect-4/5 w-full max-w-md mx-auto grayscale hover:grayscale-0 transition-all duration-700">
            <img 
              src="hero-image.png" 
              alt="Portrait" 
              className="object-cover w-full h-full rounded-lg shadow-2xl"
            />
            <div className={`absolute -inset-4 border-2 ${borderMuted} -z-10 rounded-lg hidden md:block`}></div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: PERFIL ACADÉMICO / EXPERIENCIA (NUEVO DISEÑO) */}
      <section className="py-32 px-8 md:px-20">
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
                {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Java', 'C++', 'Tailwind'].map((skill, i) => (
                  <span 
                    key={i} 
                    className={`px-4 py-2 rounded-lg text-xs font-bold border ${borderMuted} hover:${accentBg} hover:text-white hover:border-transparent transition-all cursor-default`}
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
                  Lorem Full Stack Development
                </li>
                <li className="flex items-center gap-3 group">
                  <Database size={18} className="group-hover:text-[#38bdf8] transition-colors" />
                  Ipsum Software Architecture
                </li>
                <li className="flex items-center gap-3 group">
                  <Code2 size={18} className="group-hover:text-[#38bdf8] transition-colors" />
                  Dolor Algorithms & Data
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
              
              {/* Rol 1: Ayudante de Investigación */}
              <div className="group relative grid md:grid-cols-[1fr_4fr] gap-4 md:gap-8 items-start">
                <div className={`text-xs font-bold uppercase tracking-wider ${textMuted} md:text-right pt-1.5`}>
                  2023 — {currentT.present}
                </div>
                <div className={`relative pl-8 md:pl-0 md:border-l-0 border-l ${borderMuted}`}>
                  {/* Icono que reemplaza al punto simple */}
                  <div className={`absolute -left-4 top-0 w-8 h-8 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center md:hidden`}>
                     <Microscope size={14} className={accentColor} />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <Microscope size={20} className={`hidden md:block ${accentColor}`} />
                    <h4 className="text-xl font-bold group-hover:text-[#38bdf8] transition-colors">{currentT.roles.ra}</h4>
                  </div>
                  <p className={`text-sm font-mono mb-4 ${accentColor}`}>{currentT.university}</p>
                  <p className={`text-sm leading-relaxed ${textMuted}`}>
                    {currentT.loremMedium}
                  </p>
                </div>
              </div>

              {/* Rol 2: Ayudante de Cátedra */}
              <div className="group relative grid md:grid-cols-[1fr_4fr] gap-4 md:gap-8 items-start">
                <div className={`text-xs font-bold uppercase tracking-wider ${textMuted} md:text-right pt-1.5`}>
                  2022 — {currentT.present}
                </div>
                <div className={`relative pl-8 md:pl-0 md:border-l-0 border-l ${borderMuted}`}>
                  <div className={`absolute -left-4 top-0 w-8 h-8 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center md:hidden`}>
                     <BookOpen size={14} className={accentColor} />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen size={20} className={`hidden md:block ${accentColor}`} />
                    <h4 className="text-xl font-bold group-hover:text-[#38bdf8] transition-colors">{currentT.roles.ta}</h4>
                  </div>
                  <p className={`text-sm font-mono mb-4 ${accentColor}`}>Lorem Ipsum Programming I & II</p>
                  <p className={`text-sm leading-relaxed ${textMuted}`}>
                    {currentT.loremMedium}
                  </p>
                </div>
              </div>

              {/* Rol 3: Tutor Par */}
              <div className="group relative grid md:grid-cols-[1fr_4fr] gap-4 md:gap-8 items-start">
                <div className={`text-xs font-bold uppercase tracking-wider ${textMuted} md:text-right pt-1.5`}>
                  2021 — 2022
                </div>
                <div className={`relative pl-8 md:pl-0 md:border-l-0 border-l ${borderMuted} border-transparent`}>
                  <div className={`absolute -left-4 top-0 w-8 h-8 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center md:hidden`}>
                     <Users size={14} className={accentColor} />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <Users size={20} className={`hidden md:block ${accentColor}`} />
                    <h4 className="text-xl font-bold group-hover:text-[#38bdf8] transition-colors">{currentT.roles.tutor}</h4>
                  </div>
                  <p className={`text-sm font-mono mb-4 ${accentColor}`}>Lorem Faculty of Engineering</p>
                  <p className={`text-sm leading-relaxed ${textMuted}`}>
                    {currentT.loremMedium}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default App;