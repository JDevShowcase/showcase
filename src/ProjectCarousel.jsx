import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import './ProjectCarousel.css';

export default function ProjectCarousel({ projects, lang, children }) {
  const count = projects.length;
  const multiple = count > 1;
  const [position, setPosition] = useState(null);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const viewport = useRef(null);
  const current = position ?? count;
  const active = count ? ((current % count) + count) % count : 0;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const move = direction => {
    if (!multiple) return;
    setAnimate(!reducedMotion);
    setPosition(value => {
      const next = (value ?? count) + direction;
      return reducedMotion ? count + ((next % count) + count) % count : next;
    });
  };

  useEffect(() => {
    if (!multiple || paused || hovered || focused || reducedMotion || dragging) return;
    const timer = setTimeout(() => {
      setAnimate(true);
      setPosition(value => (value ?? count) + 1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [multiple, count, paused, hovered, focused, reducedMotion, dragging, position]);

  const settle = () => {
    if (current < count || current >= count * 2) {
      setAnimate(false);
      setPosition(count + active);
    }
  };

  const finishDrag = event => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    const distance = event.clientX - start.x;
    setDragging(false);
    setDrag(0);
    setAnimate(!reducedMotion);
    if (start.horizontal && event.type !== 'pointercancel' && Math.abs(distance) > Math.min(90, viewport.current.clientWidth * 0.15)) move(distance < 0 ? 1 : -1);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const slides = multiple ? [...projects, ...projects, ...projects] : projects;
  const es = lang === 'es';
  return (
    <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label={es ? 'Proyectos destacados' : 'Featured projects'}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div ref={viewport} className={`project-viewport ${dragging ? 'is-dragging' : ''} ${multiple ? '' : 'single-project'}`}
        onDragStart={event => event.preventDefault()}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
        onPointerDown={event => {
          if (!multiple || event.button !== 0 || event.target.closest('button')) return;
          suppressClick.current = false;
          gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId, horizontal: false };
        }}
        onPointerMove={event => {
          const start = gesture.current;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (!start.horizontal && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { gesture.current = null; return; }
          if (!start.horizontal && Math.abs(dx) > 8) {
            start.horizontal = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
            suppressClick.current = true;
          }
          if (start.horizontal) { setAnimate(false); setDrag(dx * 0.85); }
        }} onPointerUp={finishDrag} onPointerCancel={finishDrag}>
        <div className="project-track" style={{ transform: multiple ? `translateX(calc(var(--peek) - ${current} * (var(--card-width) + var(--gap)) + ${drag}px))` : 'none', transition: animate && !reducedMotion ? 'transform 720ms cubic-bezier(.22,1,.36,1)' : 'none' }}
          onTransitionEnd={event => { if (event.target === event.currentTarget) settle(); }}>
          {slides.map((project, index) => {
            const selected = !multiple || index === current;
            return <div key={`${project.id}-${index}`} className={`project-slide ${selected ? 'is-active' : ''}`} aria-hidden={!selected} inert={!selected}>{children(project)}</div>;
          })}
        </div>
      </div>
      {multiple && <div className="project-controls">
        <div className="project-caption"><span className="project-count">{String(active + 1).padStart(2, '0')} <span>/ {String(count).padStart(2, '0')}</span></span><span className="project-hint">{es ? 'Desliza para explorar' : 'Drag to explore'}</span></div>
        <div className="project-dots">{projects.map((project, index) => <button type="button" key={project.id} onClick={() => { setAnimate(!reducedMotion); setPosition(count + index); }} aria-label={`${es ? 'Ver' : 'Show'} ${project.title}`} aria-current={index === active ? 'true' : undefined}><span /></button>)}</div>
        <div className="project-actions">
          <button type="button" onClick={() => move(-1)} aria-label={es ? 'Proyecto anterior' : 'Previous project'}><ArrowLeft size={18} /></button>
          <button type="button" onClick={() => setPaused(value => !value)} aria-label={es ? (paused ? 'Activar avance automático' : 'Pausar avance automático') : (paused ? 'Enable autoplay' : 'Pause autoplay')} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
          <button type="button" onClick={() => move(1)} aria-label={es ? 'Siguiente proyecto' : 'Next project'}><ArrowRight size={18} /></button>
        </div>
      </div>}
    </div>
  );
}
