import { motion } from "motion/react";
import { HeroCanvas } from "./HeroCanvas";
import { 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  ChevronDown,
  BarChart3,
  Lightbulb,
  Lock,
  Star,
  Activity,
  Database,
  BrainCircuit,
  Play,
  AlertCircle,
  MousePointer2,
  LineChart,
  Users,
  Sun,
  Moon
} from "lucide-react";
import React, { useState, useEffect } from "react";

// --- VERSIÓN FINAL PARA DESPLIEGUE ---
const CONFIG = {
  CALENDLY_URL: "https://calendly.com/angel_global_ads-metricaia/revision-estrategico-meta-ads",
  WEBHOOK_URL: "https://script.google.com/macros/s/AKfycbz40KoMeELecc2qvLQDLCIxVz3hQrXv3Kl-mppWFQvcNHiamDHnCLGZmhPoHlF9mgamdQ/exec",
  FB_PIXEL_ID: "497281582757814", // REEMPLAZAR CON TU PIXEL ID
  FB_ACCESS_TOKEN: "EAANXZCITStzsBQ79tqAOMIPWS0OkDc82pZCz7nxtSEyWkskG2Ijx1zZBbZAgico9IQLr0O6JkfrgweU6oZB7MUtYQFYLd0Ro6pGWi8isTn5MWcNqm4n8hIUg4g9IpWNGiLhG6J6NuZAVlF5FiXwDqj84gWyj5fZCPlWx9O4spPXqo7Lg1i8t0GMq0DiwO9ZBbwAvhwZDZD",
  VERSION: "1.0.7-FINAL-WEBHOOK"
};
// --- TRACKING FUNCTIONS ---
declare global {
  interface Window {
    fbq: any;
  }
}

const trackLead = (data: any) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Lead', {
      content_name: data.plan || "Lead Landing",
      currency: 'USD',
      value: 1.00
    });
  }
};
// ----------------------------


// Componentes del Modal y Formulario
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/90 backdrop-blur-md"
      style={{ overflowY: 'auto', padding: '24px 16px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-brand-navy border border-text-base/10 rounded-3xl shadow-2xl glass"
        style={{ marginTop: 'auto', marginBottom: 'auto' }}
      >
        {/* Botón cerrar — siempre visible arriba del contenido */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 text-text-muted hover:text-white"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
          aria-label="Cerrar"
        >
          ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
};

const LeadForm = ({ onClose, selectedPlan: initialPlan }: { onClose: () => void, selectedPlan?: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    sitioWeb: "",
    email: "",
    telefono: "",
    plan: initialPlan || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const webhookUrl = CONFIG.WEBHOOK_URL;

    
    try {
      console.log(`Intentando enviar lead v${CONFIG.VERSION}...`);
      
      // Construimos el body para POST
      const body = new URLSearchParams({
        ...formData,
        tipo: "Lead Landing",
        fecha: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
        version: CONFIG.VERSION
      });

      // Usamos fetch con POST y no-cors. Google Apps Script recibirá esto en 'doPost(e)'
      // Si tu script solo tiene 'doGet(e)', cámbialo a 'doPost(e)' o usa este método.
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        keepalive: true
      });

      // Como backup, también intentamos un ping GET por si el script solo acepta GET
      fetch(`${webhookUrl}?${body.toString()}`, { mode: 'no-cors', keepalive: true }).catch(() => {});
      
      // Facebook Pixel Tracking (Browser)
      trackLead(formData);

      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = CONFIG.CALENDLY_URL;
      }, 2500);

    } catch (error) {
      console.error("Error en envío:", error);
      // A pesar del error, si llegamos aquí es probable que sea un tema de CORS pero el dato HAYA LLEGADO.
      setIsSuccess(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2">¡Solicitud Recibida!</h3>
        <p className="text-text-muted mb-6">Te estamos redirigiendo para que elijas la fecha y hora de nuestra reunión...</p>
        <Button variant="primary" onClick={() => window.location.href = CONFIG.CALENDLY_URL} className="w-full">
          Si no redirige, clic aquí
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-2">Solicita una evaluación</h3>
      <p className="text-sm text-text-muted mb-6">Déjanos tus datos para analizar tu caso antes de nuestra reunión.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Nombre Completo *</label>
          <input 
            type="text" 
            name="nombre"
            required 
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-text-base/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
            placeholder="Ej: Laura Gómez"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Empresa / Nombre del Negocio *</label>
          <input 
            type="text" 
            name="empresa"
            required 
            value={formData.empresa}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-text-base/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
            placeholder="Ej: Tech Solutions"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">URL del Sitio Web o Instagram (Opcional)</label>
          <input 
            type="url" 
            name="sitioWeb"
            value={formData.sitioWeb}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-text-base/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
            placeholder="https://tudominio.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Correo Electrónico *</label>
          <input 
            type="email" 
            name="email"
            required 
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-text-base/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
            placeholder="tu@correo.com"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Teléfono (WhatsApp) *</label>
            <input 
              type="tel" 
              name="telefono"
              required 
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-text-base/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
              placeholder="+57 300 000 0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Plan de Interés *</label>
            <select 
              name="plan"
              required
              value={formData.plan}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-text-base/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-text-base placeholder-text-muted/50"
            >
              <option value="" disabled className="bg-brand-navy">Seleccionar Nivel</option>
              <option value="Base" className="bg-brand-navy">Mentoría Base</option>
              <option value="Premium" className="bg-brand-navy">Mentoría Premium</option>
              <option value="Master" className="bg-brand-navy">Mentoría Masterclass</option>
              <option value="Elite" className="bg-brand-navy">Implementación Elite</option>
            </select>
          </div>
        </div>
        
        <Button 
          variant="primary" 
          className="w-full mt-4" 
        >
          {isSubmitting ? "Enviando..." : "Continuar a Agendar"}
        </Button>
      </form>
    </div>
  );
};

const EliteForm = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    email: "",
    yaPauta: "",
    presupuesto: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const webhookUrl = CONFIG.WEBHOOK_URL;

    
    try {
      const eliteBody = new URLSearchParams({
        ...formData,
        tipo: "Elite Diagnosis",
        fecha: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
        version: CONFIG.VERSION
      });

      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: eliteBody.toString(),
        keepalive: true
      });

      // Backup GET
      fetch(`${webhookUrl}?${eliteBody.toString()}`, { mode: 'no-cors', keepalive: true }).catch(() => {});

      // Facebook Tracking
      trackLead({ ...formData, plan: 'Elite Diagnosis' });

      setIsSuccess(true);
      setTimeout(onClose, 2500);
    } catch (error) {
      setIsSuccess(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-brand-cyan/20 text-brand-cyan rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2">¡Diagnóstico Solicitado!</h3>
        <p className="text-text-muted">Analizaremos tu caso y te contactaremos a la brevedad.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-2">Diagnóstico Gratis</h3>
      <p className="text-sm text-text-muted mb-6">Completa los datos para analizar tu potencial de escalado.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Nombre</label>
            <input name="nombre" required onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-text-base/10 text-white outline-none focus:border-brand-cyan" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Empresa</label>
            <input name="empresa" required onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-text-base/10 text-white outline-none focus:border-brand-cyan" placeholder="Negocio" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">WhatsApp</label>
            <input type="tel" name="telefono" required onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-text-base/10 text-white outline-none focus:border-brand-cyan" placeholder="+57..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Email</label>
            <input type="email" name="email" required onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-text-base/10 text-white outline-none focus:border-brand-cyan" placeholder="tu@correo.com" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">¿Ya pauta en Meta Ads?</label>
          <select 
            name="yaPauta" 
            required 
            value={formData.yaPauta}
            onChange={handleChange} 
            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-text-base/10 text-white outline-none cursor-pointer"
          >
            <option value="" disabled>Selecciona una opción</option>
            <option value="si">Sí, actualmente</option>
            <option value="no">No todavía</option>
            <option value="pausado">Pausé hace poco</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">¿Cuánto le gustaría invertir?</label>
          <input name="presupuesto" required onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-white/5 border border-text-base/10 text-white outline-none focus:border-brand-cyan" placeholder="Ej: $1,000 USD / mes" />
        </div>
        
        <Button variant="secondary" className="w-full mt-4">
          {isSubmitting ? "Enviando..." : "Solicitar Diagnóstico"}
        </Button>
      </form>
    </div>
  );
};

const Section = ({ children, className = "", id = "", style }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) => (
  <section id={id} className={`py-20 px-6 md:py-32 ${className}`} style={style}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Button = ({ children, variant = "primary", className = "", onClick }: { children: React.ReactNode, variant?: "primary" | "secondary" | "outline", className?: string, onClick?: () => void }) => {
  const baseStyles = "px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-lg w-full sm:w-auto";
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-blue-700 blue-glow",
    secondary: "bg-brand-cyan text-[#020617] hover:bg-cyan-300 cyan-glow",
    outline: "border border-text-base/20 text-text-base hover:bg-text-base/5"
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded-xl mb-2 overflow-hidden transition-all duration-300"
      style={{ background: isOpen ? 'rgba(37,99,235,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isOpen ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.05)'}` }}
    >
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-semibold text-text-base leading-snug">{question}</span>
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{ background: isOpen ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.05)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronDown size={14} className={isOpen ? 'text-brand-cyan' : 'text-text-muted'} />
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm text-text-muted leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};


const ThemeToggle = ({ isLight, toggle }: { isLight: boolean, toggle: () => void }) => (
  <button 
    onClick={toggle}
    className="fixed top-6 right-6 z-[10000] p-3 rounded-2xl glass hover:scale-110 transition-all duration-300 group"
    aria-label="Toggle Theme"
  >
    {isLight ? (
      <Moon size={24} className="text-brand-blue group-hover:rotate-12 transition-transform" />
    ) : (
      <Sun size={24} className="text-brand-cyan group-hover:rotate-12 transition-transform" />
    )}
  </button>
);

export default function App() {
  const [modalType, setModalType] = useState<"lead" | "elite" | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLight]);

  const toggleTheme = () => setIsLight(!isLight);

  const openForm = (plan: string = "") => {
    setSelectedPlan(plan);
    setModalType("lead");
  };

  const openEliteForm = () => {
    console.log("Triggered openEliteForm");
    // Alert para depuración física en el navegador
    // alert("Abriendo diagnóstico..."); 
    setModalType("elite");
  };

  const scrollToLevels = () => {
    const el = document.getElementById('niveles');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen selection:bg-brand-blue selection:text-white bg-brand-navy text-text-base font-sans antialiased transition-colors duration-300">
      <ThemeToggle isLight={isLight} toggle={toggleTheme} />
      <HeroCanvas openForm={openForm} scrollToLevels={scrollToLevels} isLight={isLight} />

      {/* 2. VSL DE VENTAS */}
      <Section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #020617 0%, #05091a 50%, #020617 100%)' }}>
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="gradient-line w-16" />
            <span className="section-label">02 / Presentación del Método</span>
            <div className="gradient-line w-16" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight">
            Mira cómo funciona el método<br />
            <span className="text-gradient-brand">antes de elegir tu nivel</span>
          </h2>
          <p className="text-base md:text-lg text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            En menos de 10 minutos vas a entender por qué sigues improvisando — y qué cambia cuando tienes estructura, criterio e IA en un solo método.
          </p>

          {/* Video con corner brackets premium */}
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-px bg-gradient-to-r from-brand-blue via-transparent to-brand-cyan rounded-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
            <div className="relative aspect-video rounded-2xl overflow-hidden" style={{ background: '#05091a', border: '1px solid rgba(37,99,235,0.2)' }}>
              {/* Corner deco */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-cyan z-10 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-cyan z-10 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-blue z-10 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-blue z-10 rounded-br-xl" />
              {/* Live indicator */}
              <div className="absolute top-3 right-10 z-10 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
                </span>
                <span className="section-label" style={{ fontSize: '0.55rem' }}>Reproducir Ahora</span>
              </div>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/xkoGtLH9KJU"
                title="Método Métricas IA VSL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Bullets debajo del video */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { text: "Por qué seguirás improvisando sin estructura", icon: <LineChart size={14} /> },
              { text: "Cómo tomar decisiones con datos, no con intuición", icon: <BrainCircuit size={14} /> },
              { text: "Qué nivel encaja con tu etapa y tu objetivo", icon: <Target size={14} /> }
            ].map((bullet, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-left" style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.12)' }}>
                <span className="text-brand-cyan shrink-0">{bullet.icon}</span>
                <span className="text-sm font-medium text-slate-300">{bullet.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={scrollToLevels}
              className="group px-10 py-4 rounded-full font-semibold text-base flex items-center gap-2 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #22d3ee, #2563eb)', color: '#020617', boxShadow: '0 0 30px rgba(34,211,238,0.2)' }}
            >
              Quiero elegir mi nivel
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </Section>

      {/* 3. SECCIÓN DE IDENTIFICACIÓN DEL PROBLEMA (PAS) */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="gradient-line w-12" />
              <span className="section-label">03 / El Diagnóstico</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-[1.1]">
              El problema no es Meta Ads.
              <br />
              <span className="text-brand-cyan">Es ejecutar sin lógica replicable.</span>
            </h2>
            <p className="text-sm text-text-muted mb-6 leading-relaxed">
              Si algo de esto te suena familiar, no es mala suerte — es falta de método:
            </p>
            <div className="space-y-3">
              {[
                "Copias campañas de otros sin entender por qué funcionan.",
                "Tocas las campañas por ansiedad antes de que los datos maduren.",
                "No sabes qué métrica mirar cuando los resultados caen.",
                "Crees que subir el presupuesto va a arreglar una mala estructura.",
                "Ejecutas, pero no tienes una lógica que puedas repetir o enseñar."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
                    <span className="text-red-400 text-xs font-bold">✕</span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard estilo Meta Ads Manager */}
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-blue/5 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid #e4e6eb' }}>

              {/* Barra superior — estilo Meta */}
              <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1877f2' }}>
                <div className="flex items-center gap-2">
                  {/* Meta logo simplified */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  <span className="text-white text-xs font-semibold">Administrador de Anuncios</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded text-white text-xs" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <span>📅</span>
                  <span>Últimos 7 días</span>
                </div>
              </div>

              {/* Cuerpo — fondo Meta gris */}
              <div style={{ background: '#f0f2f5' }}>

                {/* Fila campaña */}
                <div className="flex items-center justify-between px-4 py-3" style={{ background: '#fff', borderBottom: '1px solid #e4e6eb' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#42b883' }} />
                    <span className="text-xs font-semibold" style={{ color: '#1c1e21' }}>Venta_Temporada_Final_v4</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: '#65676b' }}>
                    <span>3 conjuntos</span>
                    <span style={{ color: '#1877f2', fontWeight: 600 }}>$150/día</span>
                  </div>
                </div>

                {/* Métricas en columnas */}
                <div className="grid grid-cols-5" style={{ background: '#fff', borderBottom: '1px solid #e4e6eb' }}>
                  {[
                    { label: 'Alcance', value: '12,430', delta: '▼ 23%', bad: true },
                    { label: 'Clics', value: '287', delta: '▼ 31%', bad: true },
                    { label: 'CTR', value: '0.32%', delta: '▼ 41%', bad: true },
                    { label: 'CPC', value: '$4.81', delta: '▲ 67%', bad: true },
                    { label: 'ROAS', value: '0.7x', delta: '▼ 52%', bad: true },
                  ].map((m, i) => (
                    <div key={i} className="px-3 py-3 text-center" style={{ borderRight: i < 4 ? '1px solid #e4e6eb' : 'none' }}>
                      <div className="text-xs mb-1" style={{ color: '#65676b' }}>{m.label}</div>
                      <div className="text-sm font-bold" style={{ color: '#1c1e21' }}>{m.value}</div>
                      <div className="text-xs font-medium mt-0.5" style={{ color: m.bad ? '#dc3545' : '#28a745' }}>{m.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Mini gráfica — Gasto sube, conversiones bajan */}
                <div className="px-4 pt-3 pb-1" style={{ background: '#fff' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold" style={{ color: '#1c1e21' }}>Gasto diario vs Conversiones</span>
                    <div className="flex items-center gap-3 text-xs" style={{ color: '#65676b' }}>
                      <span className="flex items-center gap-1"><span style={{ display:'inline-block', width:8, height:2, background:'#1877f2', borderRadius:1 }} /> Gasto</span>
                      <span className="flex items-center gap-1"><span style={{ display:'inline-block', width:8, height:2, background:'#dc3545', borderRadius:1 }} /> Conversiones</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 300 80" className="w-full" style={{ height: 80 }}>
                    {/* Fondo grid lines */}
                    {[20, 40, 60].map(y => (
                      <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#e4e6eb" strokeWidth="1" />
                    ))}
                    {/* Gasto — sube progresivamente */}
                    <polyline
                      fill="none" stroke="#1877f2" strokeWidth="2" strokeLinejoin="round"
                      points="0,65 50,58 100,50 150,42 200,35 250,28 300,20"
                    />
                    <polyline
                      fill="none" stroke="rgba(24,119,242,0.15)" strokeWidth="0"
                      points="0,65 50,58 100,50 150,42 200,35 250,28 300,20 300,80 0,80"
                    />
                    <path d="M0,65 50,58 100,50 150,42 200,35 250,28 300,20 L300,80 L0,80 Z" fill="rgba(24,119,242,0.08)" />
                    {/* Conversiones — caen */}
                    <polyline
                      fill="none" stroke="#dc3545" strokeWidth="2" strokeLinejoin="round" strokeDasharray="4 2"
                      points="0,30 50,33 100,40 150,48 200,55 250,62 300,68"
                    />
                    {/* Day labels */}
                    {['L','M','X','J','V','S','D'].map((d, i) => (
                      <text key={d} x={i * 50 + 0} y={78} fontSize="8" fill="#65676b" textAnchor="middle">{d}</text>
                    ))}
                  </svg>
                </div>

                {/* Footer de alerta */}
                <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#fff3cd', borderTop: '1px solid #ffc107' }}>
                  <AlertCircle size={12} style={{ color: '#856404' }} />
                  <span className="text-xs" style={{ color: '#856404' }}>Tu campaña está gastando sin retorno positivo. Sin método, el algoritmo no puede optimizar.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>


      {/* 5. PRESENTACIÓN DE LA SOLUCIÓN */}
      <Section style={{ background: '#020617' }}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="gradient-line w-12" />
            <span className="section-label">05 / La Solución</span>
            <div className="gradient-line w-12" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Deja de adivinar.<br />
            Empieza a escalar con <span className="text-gradient-brand">criterio real</span>.
          </h2>
          <p className="text-base md:text-lg text-text-muted leading-relaxed">
            Métricas IA™ no es un curso grabado más. Es una metodología de mentoría diseñada para que aprendas a pensar tus campañas, leer tus métricas y escalar con una lógica que puedes repetir — y monetizar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Lo que NO es */}
          <div className="p-8 rounded-2xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.14)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <AlertCircle size={16} className="text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-red-400">Lo que NO es</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Un curso grabado que terminas y olvidas.",
                "Una secuencia de tutoriales sin hilo conductor.",
                "Teoría sin aplicación ni criterio.",
                "Promesas de resultados rápidos sin base real.",
              ].map((txt, i) => (
                <li key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: '1px solid rgba(239,68,68,0.07)' }}>
                  <span className="text-red-500/40 mt-0.5 shrink-0 text-xs font-bold font-mono">✕</span>
                  <span className="text-sm text-text-muted">{txt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lo que SÍ es */}
          <div className="p-8 rounded-2xl relative overflow-hidden" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.16)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -z-0" style={{ background: 'rgba(37,99,235,0.08)' }} />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center icon-box-cyan">
                <ShieldCheck size={16} className="text-brand-cyan" />
              </div>
              <h3 className="text-lg font-bold text-brand-cyan">Lo que SÍ es</h3>
            </div>
            <ul className="space-y-3 relative z-10">
              {[
                "Mentoría con acompañamiento real en cada etapa.",
                "Método para leer métricas, optimizar y tomar decisiones.",
                "Estrategia + IA + Criterio replicable en un solo sistema.",
                "Una habilidad que aprendes, aplicas y puedes monetizar.",
              ].map((txt, i) => (
                <li key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: '1px solid rgba(34,211,238,0.07)' }}>
                  <CheckCircle2 size={14} className="text-brand-cyan mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-200">{txt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 6. BENEFICIOS PRINCIPALES */}
      <Section style={{ background: 'linear-gradient(180deg, #020617 0%, #05091a 100%)' }}>
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="gradient-line w-12" />
            <span className="section-label">06 / Lo que Obtiene</span>
            <div className="gradient-line w-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">Lo que vas a lograr</h2>
          <p className="text-text-muted text-base">Resultados concretos, no promesas genéricas. En este orden.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Entender qué funciona", desc: "Identifica qué creativos y audiencias generan resultados — y por qué.", icon: <Target size={20} />, color: '#2563eb' },
            { title: "Interpretar métricas", desc: "Deja de mirar números aislados. Entiende qué te dicen y qué hacer con ellos.", icon: <BarChart3 size={20} />, color: '#22d3ee' },
            { title: "Optimizar con criterio", desc: "Sabe exactamente qué tocar, cuándo y por qué — sin actuar por ansiedad.", icon: <Activity size={20} />, color: '#2563eb' },
            { title: "Reducir errores costosos", desc: "Evita las configuraciones incorrectas que queman presupuesto sin retorno.", icon: <ShieldCheck size={20} />, color: '#22d3ee' },
            { title: "Escalar con lógica", desc: "Sube presupuesto con confianza porque entiendes qué lo sostiene.", icon: <TrendingUp size={20} />, color: '#2563eb' },
            { title: "Acelerar con IA", desc: "Usa inteligencia artificial para analizar, crear y ejecutar más rápido.", icon: <Cpu size={20} />, color: '#22d3ee' },
            { title: "Ganar independencia", desc: "Dejas de depender de tutoriales sueltos. Tienes un sistema propio.", icon: <Lock size={20} />, color: '#2563eb' },
            { title: "Monetizar la habilidad", desc: "Aplícalo a tu negocio o véndelo como servicio. El conocimiento es tuyo.", icon: <Zap size={20} />, color: '#22d3ee' }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="group p-6 rounded-xl card-glow-hover cursor-default"
              style={{ background: '#05091a', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${benefit.color}14`, border: `1px solid ${benefit.color}28`, color: benefit.color }}
              >
                {benefit.icon}
              </div>
              <h3 className="text-sm font-bold mb-1.5 text-white">{benefit.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 7. MECANISMO ÚNICO */}
      <Section style={{ background: '#05091a', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="gradient-line w-12" />
            <span className="section-label">07 / El Método</span>
            <div className="gradient-line w-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Los 3 Pilares del Método</h2>
          <p className="text-base text-text-muted">Tres ejes integrados que te llevan de improvisar a tener un sistema que puedes escalar y monetizar.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), rgba(34,211,238,0.3), transparent)' }} />
          {[
            {
              num: "01",
              title: "Estructura y Estrategia",
              desc: "Antes de lanzar un anuncio, construyes la lógica. Cada campaña tiene un propósito, cada dólar tiene un rol. Sin estructura no hay nada que optimizar.",
              benefit: "Dejas de actuar por intuición",
              icon: <Target size={22} />, color: '#2563eb'
            },
            {
              num: "02",
              title: "IA Aplicada al Rendimiento",
              desc: "Usas inteligencia artificial para leer datos más rápido, detectar patrones y tomar decisiones con más precisión. La IA no reemplaza el criterio — lo multiplica.",
              benefit: "Decisiones basadas en datos, no en fe",
              icon: <Cpu size={22} />, color: '#22d3ee'
            },
            {
              num: "03",
              title: "Criterio Monetizable",
              desc: "Lo más valioso que vas a desarrollar no es técnica — es criterio. La capacidad de leer una cuenta, saber qué hacer y explicar por qué. Eso es lo que se vende.",
              benefit: "Una habilidad que cotiza alto",
              icon: <Zap size={22} />, color: '#2563eb'
            }
          ].map((pilar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative p-8 rounded-2xl"
              style={{ background: '#020617', border: `1px solid ${pilar.color}20` }}
            >
              {/* Number watermark */}
              <div className="absolute top-4 right-5 font-mono text-5xl font-bold leading-none select-none" style={{ color: `${pilar.color}0d` }}>{pilar.num}</div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${pilar.color}14`, border: `1px solid ${pilar.color}28`, color: pilar.color }}>
                {pilar.icon}
              </div>
              <div className="section-label mb-2" style={{ color: pilar.color }}>{pilar.num} /</div>
              <h3 className="text-xl font-bold mb-3">{pilar.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-5">{pilar.desc}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: `${pilar.color}10`, border: `1px solid ${pilar.color}20`, color: pilar.color }}>
                <CheckCircle2 size={11} />
                {pilar.benefit}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 8. SECCIÓN DE LOS 3 NIVELES */}
      <Section id="niveles" className="relative" style={{ background: 'linear-gradient(180deg, #05091a 0%, #020617 100%)' }}>
        <div className="absolute top-0 left-0 w-full h-96 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12), transparent 70%)' }} />

        <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="gradient-line w-12" />
            <span className="section-label">Método Métricas IA™ · Niveles</span>
            <div className="gradient-line w-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">Elige tu nivel de entrada</h2>
          <p className="text-base text-text-muted max-w-xl mx-auto leading-relaxed">Tres niveles de profundidad. Un solo método. La diferencia está en cuánto quieres dominar — y qué tan rápido quieres monetizarlo.</p>
        </div>

        {/* CARDS */}
        <div className="grid lg:grid-cols-3 gap-5 relative z-10 items-start">

          {/* PLAN 1 — Base */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
            className="flex flex-col rounded-2xl overflow-hidden card-glow-hover"
            style={{ background: '#05091a', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="px-7 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="section-label mb-2 block">Nivel 01</span>
              <h3 className="text-2xl font-bold mb-1">Mentoría Base</h3>
              <p className="text-brand-cyan text-xs font-mono uppercase tracking-widest">Cimientos estratégicos</p>
            </div>
            <div className="p-7 flex-grow">
              <p className="text-sm text-text-muted mb-5 leading-relaxed">Para quien parte desde cero y necesita una base sólida antes de invertir más en pauta.</p>
              <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Transformación:</p>
                <p className="text-sm text-slate-200 leading-relaxed">De lanzar sin estructura ni criterio → a ejecutar campañas con lógica real desde el día uno.</p>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Configuración técnica correcta.",
                  "Estructura de testeo desde cero.",
                  "Lectura de métricas clave.",
                  "Base para escalar sin desperdiciar presupuesto."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted">
                    <CheckCircle2 size={13} className="text-brand-cyan shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-7 pb-7 mt-auto">
              <div className="mb-4">
                <p className="text-2xl font-display font-bold text-white">COP $800.000</p>
                <p className="text-xs text-text-muted font-mono mt-0.5">Pago a crédito disponible · Cupo limitado</p>
              </div>
              <button onClick={() => openForm("Base")}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:border-brand-blue/40 hover:text-white mb-2"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#8892a4', background: 'transparent' }}
              >
                Empezar con Base
              </button>
              <button onClick={() => setModalType("elite")}
                className="w-full py-2 text-xs font-medium transition-all duration-200 hover:text-brand-cyan text-center"
                style={{ color: '#64748b', background: 'transparent' }}
              >
                📅 Prefiero hablar primero — agenda un diagnóstico
              </button>
            </div>
          </motion.div>

          {/* PLAN 2 — Premium (FEATURED) */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex flex-col rounded-2xl overflow-hidden relative lg:-mt-6"
            style={{ background: 'linear-gradient(160deg, #0d1f4e, #081230)', border: '1px solid rgba(37,99,235,0.45)', boxShadow: '0 0 60px rgba(37,99,235,0.2), 0 0 120px rgba(37,99,235,0.08)' }}
          >
            {/* Badge */}
            <div className="absolute -top-px left-0 right-0 flex justify-center z-10">
              <div className="px-5 py-1.5 text-xs font-bold tracking-widest text-white font-mono" style={{ background: 'linear-gradient(90deg, #2563eb, #22d3ee)', borderRadius: '0 0 12px 12px' }}>
                ★ La decisión más inteligente
              </div>
            </div>
            <div className="px-7 pt-11 pb-6" style={{ borderBottom: '1px solid rgba(37,99,235,0.2)' }}>
              <span className="section-label mb-2 block" style={{ color: '#22d3ee' }}>Nivel 02</span>
              <h3 className="text-2xl font-bold mb-1 text-white">Mentoría Premium</h3>
              <p className="text-brand-cyan text-xs font-mono uppercase tracking-widest">Optimización, escala y monetización</p>
            </div>
            <div className="p-7 flex-grow">
              <p className="text-sm text-text-muted mb-5 leading-relaxed">Para quien quiere acompañamiento real para optimizar campañas, tomar mejores decisiones y convertir este conocimiento en un servicio monetizable.</p>
              <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.22)' }}>
                <p className="text-xs font-mono text-brand-cyan mb-1 uppercase tracking-wider">Transformación:</p>
                <p className="text-sm text-slate-200 leading-relaxed">De campañas activas pero sin criterio → a resultados estables, decisiones basadas en datos y una habilidad que puedes vender.</p>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Acompañamiento estratégico directo.",
                  "Criterio de escalado y optimización avanzada.",
                  "Estructura para ofrecer esto como servicio.",
                  "IA integrada en tu flujo de trabajo.",
                  "El mejor equilibrio entre precio, profundidad y retorno."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 size={13} className="text-brand-cyan shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-7 pb-7 mt-auto">
              <div className="mb-1">
                <p className="text-2xl font-display font-bold text-white">COP $1.900.000</p>
                <p className="text-xs font-mono mt-0.5" style={{ color: '#22d3ee', opacity: 0.8 }}>La inversión más recuperable del método</p>
              </div>
              {/* Frase monetización */}
              <p className="text-xs text-slate-400 italic mb-4 leading-relaxed">
                "Una habilidad que puedes aplicar a tu negocio — o empezar a ofrecer como servicio."
              </p>
              <button onClick={() => openForm("Premium")}
                className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 text-white mb-2"
                style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 0 28px rgba(37,99,235,0.35)' }}
              >
                Aplicar a Premium →
              </button>
              <button onClick={() => setModalType("elite")}
                className="w-full py-2 text-xs font-medium transition-all duration-200 hover:text-brand-cyan text-center"
                style={{ color: 'rgba(34,211,238,0.5)', background: 'transparent' }}
              >
                📅 Prefiero hablar primero — agenda un diagnóstico
              </button>
            </div>
          </motion.div>

          {/* PLAN 3 — Masterclass */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex flex-col rounded-2xl overflow-hidden card-glow-hover"
            style={{ background: '#05091a', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="px-7 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="section-label mb-2 block">Nivel 03</span>
              <h3 className="text-2xl font-bold mb-1">Mentoría Masterclass</h3>
              <p className="text-brand-cyan text-xs font-mono uppercase tracking-widest">Dominio total + IA aplicada al negocio</p>
            </div>
            <div className="p-7 flex-grow">
              <p className="text-sm text-text-muted mb-5 leading-relaxed">Para quien quiere dominar la metodología completa y subir de nivel con IA, automatizaciones y herramientas de alto valor.</p>
              <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-mono text-text-muted mb-1 uppercase tracking-wider">Transformación:</p>
                <p className="text-sm text-slate-200 leading-relaxed">De ejecutar campañas → a dominar un stack completo que te posiciona como especialista de mayor valor en el mercado.</p>
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Incluye — y va más allá de Meta Ads:</p>
              <ul className="space-y-2">
                {[
                  "Todo lo del Plan Premium.",
                  "IA aplicada al performance y análisis.",
                  "Agentes de IA para automatización.",
                  "Landing pages construidas con IA.",
                  "Fotos y videos profesionales con IA.",
                  "Estrategias omnicanal avanzadas.",
                  "Criterio de negocio e implementación.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted">
                    <CheckCircle2 size={13} className="text-brand-cyan shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-7 pb-7 mt-auto">
              <div className="mb-1">
                <p className="text-2xl font-display font-bold text-white">Desde COP $3.500.000</p>
                <p className="text-xs text-text-muted font-mono mt-0.5">Cupo muy limitado · Solo por aplicación</p>
              </div>
              <p className="text-xs text-slate-400 italic mb-4 leading-relaxed">
                "No solo aprendes Meta Ads. Dominas IA aplicada. Eso vale más — y se nota en lo que cobras."
              </p>
              <button onClick={() => openForm("Master")}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:border-brand-blue/40 hover:text-white mb-2"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#8892a4', background: 'transparent' }}
              >
                Aplicar a Masterclass →
              </button>
              <button onClick={() => setModalType("elite")}
                className="w-full py-2 text-xs font-medium transition-all duration-200 hover:text-brand-cyan text-center"
                style={{ color: '#64748b', background: 'transparent' }}
              >
                📅 Prefiero hablar primero — agenda un diagnóstico
              </button>
            </div>
          </motion.div>
        </div>

        {/* Líneas de garantía + oferta fundadora */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 relative z-10">
          <p className="text-xs text-text-muted font-mono flex items-center gap-2">
            <ShieldCheck size={13} className="text-brand-cyan" />
            Sin permanencia forzada · Si en la primera sesión no ves valor, te devolvemos tu dinero.
          </p>
          <span className="hidden sm:block text-text-muted opacity-20">|</span>
          <p className="text-xs text-text-muted font-mono flex items-center gap-2">
            <Zap size={13} className="text-brand-cyan" />
            Precios de lanzamiento. Se actualizan con cada nueva cohorte.
          </p>
        </div>

        {/* ELITE — bloque separado para otro buyer */}
        <div className="mt-16 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="gradient-line flex-1" />
            <span className="section-label whitespace-nowrap">Para otro nivel de juego</span>
            <div className="gradient-line flex-1" />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.04), rgba(37,99,235,0.04))', border: '1px solid rgba(34,211,238,0.15)' }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 0 20px rgba(37,99,235,0.3)' }}>
                  <Star className="text-white" size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-lg font-bold text-white">Implementación Elite</h3>
                    <span className="tag-pill">Solo por aplicación</span>
                    <span className="tag-pill">Done For You</span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed max-w-lg mb-3">
                    No es para todos. Es para marcas, equipos y negocios con presupuesto de pauta alto que prefieren <strong className="text-slate-300">implementación antes que aprendizaje</strong>.
                  </p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-1">
                    {["Gestión completa de campañas", "Dashboard de métricas pro", "Asistente personal de IA", "Estrategia + ejecución Métricas IA™"].map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-text-muted">
                        <CheckCircle2 size={11} className="text-brand-cyan shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="shrink-0 text-left md:text-right">
                <p className="text-2xl font-display font-bold text-white">COP $4.000.000</p>
                <p className="text-xs text-text-muted font-mono mb-4">/ mes · Alto presupuesto</p>
                <button
                  onClick={() => setModalType("elite")}
                  className="px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 text-brand-navy whitespace-nowrap"
                  style={{ background: '#22d3ee', boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
                >
                  Solicitar diagnóstico estratégico
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>


      {/* 11. FAQ PERSUASIVO */}
      <Section style={{ background: '#020617' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="gradient-line w-12" />
              <span className="section-label">10 / FAQ</span>
              <div className="gradient-line w-12" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-1">
            {[
              { q: "¿Esto es para mí si nunca he hecho anuncios?", a: "Sí. El Nivel Base está diseñado exactamente para eso: construir los cimientos correctos antes de gastar un peso en pauta. Vas a entender qué configuras, por qué, y cómo leerlo — desde el día uno." },
              { q: "Ya intenté Meta Ads y no me funcionó. ¿Esto es diferente?", a: "La mayoría falla porque copiaron una campaña, tocaron por ansiedad o nunca entendieron qué les decían las métricas. Aquí no aprendes a hacer anuncios — aprendes a pensar estratégicamente. Revisamos qué salió mal y construimos una ruta con lógica real." },
              { q: "¿Cómo sé si debo empezar en Base, Premium o Masterclass?", a: "Al aplicar, hacemos una evaluación corta: experiencia actual, objetivo (negocio propio o servicio), presupuesto disponible. Con eso te recomendamos el nivel exacto para tu situación — no el más caro, el más adecuado." },
              { q: "¿Puedo usar esto para ofrecer el servicio a clientes?", a: "Es uno de los usos más comunes. Al dominar la metodología, tienes un criterio real para gestionar campañas de otros negocios y cobrar por ello. El Nivel Premium incluye estructura específica para monetizarlo como servicio." },
              { q: "¿Qué tiene que ver la IA con aprender Meta Ads?", a: "La IA no reemplaza la estrategia — la acelera. Aprenderás a usar herramientas de IA para analizar métricas más rápido, generar hipótesis de optimización y crear creativos con más criterio. Está integrada en el flujo de trabajo real, no como adorno." },
              { q: "¿Hay algún compromiso de permanencia?", a: "No. Si en la primera sesión no ves valor real, te devolvemos lo que pagaste. No hay letra chica ni cláusulas de permanencia. La confianza va en dos sentidos." },
              { q: "¿Qué pasa si elijo un nivel y siento que me quedé corto o me excedí?", a: "Lo evaluamos juntos desde el diagnóstico inicial. Y si en algún punto del proceso necesitas ajustar, lo conversamos. El objetivo es que el nivel que elijas sea el que realmente necesitas." },
              { q: "¿Voy a tener acompañamiento o solo acceso a contenido?", a: "No es un curso donde te quedas solo con videos. Hay sesiones, soporte directo y acceso a una comunidad de estrategas. Dependiendo del nivel, el acompañamiento es más cercano — pero en todos los casos no estás solo." },
            ].map((faq, i) => (
              <div key={i}>
                <FAQItem question={faq.q} answer={faq.a} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 12. CIERRE FINAL */}
      <Section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #020617 0%, #040d2a 50%, #020617 100%)' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)' }} />

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="gradient-line w-16" />
            <span className="section-label">11 / Tome la Decisión</span>
            <div className="gradient-line w-16" />
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 uppercase leading-[1.05] tracking-tight">
            Ya sabes que<br />
            <span className="text-gradient-brand">improvisar no escala.</span>
          </h2>

          <p className="text-lg md:text-xl text-text-muted mb-4 leading-relaxed max-w-2xl mx-auto">
            El método está. El acompañamiento está. Lo único que falta es tu decisión de dejar de adivinar y empezar a ejecutar con criterio real.
          </p>
          <p className="text-base text-text-muted mb-12 font-mono opacity-60">
            — Cada semana que pasa sin estructura es presupuesto que no vuelve.
          </p>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => openForm()}
              className="group px-12 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all duration-300 text-white"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 0 40px rgba(37,99,235,0.3), 0 0 80px rgba(37,99,235,0.1)' }}
            >
              Quiero ver qué nivel es para mí
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-slate-500 font-mono">Sin compromisos · Evaluación personalizada · Respuesta en 24h</p>
          </div>

          {/* Trust bar */}
          <div className="mt-16 pt-8 flex flex-wrap items-center justify-center gap-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {[
              { label: "Metodología probada", icon: <ShieldCheck size={14} /> },
              { label: "Acompañamiento real", icon: <Users size={14} /> },
              { label: "IA aplicada al negocio", icon: <Cpu size={14} /> },
              { label: "Resultados medibles", icon: <BarChart3 size={14} /> },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-text-muted">
                <span className="text-brand-cyan">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="px-6 pt-16 pb-10" style={{ background: '#020617', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto">

          {/* Top — logo + tagline + CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            {/* Logo real */}
            <div className="flex items-center gap-4">
              <img
                src="/favicon.png"
                alt="Métricas IA"
                className="w-12 h-12 rounded-2xl object-contain"
                style={{ boxShadow: '0 0 20px rgba(37,99,235,0.3)' }}
              />
              <div>
                <p className="font-display font-bold text-white text-base leading-tight">Métricas IA™</p>
                <p className="text-xs font-mono mt-0.5" style={{ color: '#22d3ee', opacity: 0.7 }}>Metodología de Escala</p>
              </div>
            </div>

            {/* Tagline central */}
            <p className="text-xs text-text-muted font-mono text-center max-w-sm leading-relaxed opacity-60">
              Domina Meta Ads con estructura, IA y criterio real.<br />
              Convierte la habilidad en un servicio monetizable.
            </p>

            {/* CTA footer */}
            <button
              onClick={() => { document.getElementById('niveles')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 0 20px rgba(37,99,235,0.2)' }}
            >
              Ver niveles del método →
            </button>
          </div>

          {/* Divisor */}
          <div className="gradient-line mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-6 text-xs font-mono" style={{ color: '#475569' }}>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Soporte</a>
            </div>
            <p className="text-xs font-mono" style={{ color: '#334155' }}>
              © 2026 Métricas IA™ · Todos los derechos reservados
            </p>
          </div>

        </div>
      </footer>
      <Modal isOpen={modalType === "lead"} onClose={() => setModalType(null)}>
        <LeadForm onClose={() => setModalType(null)} selectedPlan={selectedPlan} />
      </Modal>
      
      <Modal isOpen={modalType === "elite"} onClose={() => setModalType(null)}>
        <EliteForm onClose={() => setModalType(null)} />
      </Modal>
    </div>
  );
}
