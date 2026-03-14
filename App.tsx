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
  Users
} from "lucide-react";
import React, { useState } from "react";

// Componentes del Modal y Formulario
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-brand-navy border border-white/10 rounded-3xl shadow-2xl overflow-hidden glass"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
};

const LeadForm = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí iría la lógica para enviar a Make/n8n/Google Sheets
    // Simulamos un retraso
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Abre Calendly después de 2 segundos de éxito
      setTimeout(() => {
        window.open('https://calendly.com/tu-usuario-aqui', '_blank');
        onClose();
      }, 2000);
      
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2">¡Solicitud Recibida!</h3>
        <p className="text-slate-400 mb-6">Te estamos redirigiendo para que elijas la fecha y hora de nuestra reunión...</p>
        <Button variant="outline" onClick={onClose} className="w-full">
          Cerrar
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-2">Solicita una evaluación</h3>
      <p className="text-sm text-slate-400 mb-6">Déjanos tus datos para analizar tu caso antes de nuestra reunión.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Nombre Completo *</label>
          <input 
            type="text" 
            required 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
            placeholder="Ej: Laura Gómez"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Empresa / Nombre del Negocio *</label>
          <input 
            type="text" 
            required 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
            placeholder="Ej: Tech Solutions"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">URL del Sitio Web o Instagram (Opcional)</label>
          <input 
            type="url" 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
            placeholder="https://tudominio.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Correo Electrónico *</label>
          <input 
            type="email" 
            required 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
            placeholder="tu@correo.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Teléfono (WhatsApp) *</label>
          <input 
            type="tel" 
            required 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none transition-all text-white placeholder-slate-500"
            placeholder="+57 300 000 0000"
          />
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

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-20 px-6 md:py-32 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Button = ({ children, variant = "primary", className = "", onClick }: { children: React.ReactNode, variant?: "primary" | "secondary" | "outline", className?: string, onClick?: () => void }) => {
  const baseStyles = "px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-lg w-full sm:w-auto";
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-blue-700 blue-glow",
    secondary: "bg-brand-cyan text-brand-navy hover:bg-cyan-300 cyan-glow",
    outline: "border border-white/20 text-white hover:bg-white/5"
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
    <div className="border-b border-white/5 mb-4">
      <button 
        className="w-full py-6 flex items-center justify-between text-left hover:text-brand-cyan transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-slate-400 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openForm = () => {
    setIsModalOpen(true);
  };

  const scrollToLevels = () => {
    document.getElementById('niveles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-brand-blue selection:text-white bg-brand-navy text-white font-sans antialiased">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LeadForm onClose={() => setIsModalOpen(false)} />
      </Modal>
      <HeroCanvas openForm={openForm} scrollToLevels={scrollToLevels} />

      {/* 2. VCL DE VENTAS */}
      <Section className="bg-brand-surface/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Antes de elegir su nivel, vea cómo funciona el Método Métricas IA™</h2>
          <p className="text-lg text-slate-400 mb-12">
            En este video entenderá por qué la mayoría falla con Meta Ads, qué cambia cuando existe una metodología real y cómo puede aprender a lanzar, optimizar y escalar campañas con más criterio y menos prueba y error.
          </p>
          
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-cyan rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative aspect-video rounded-2xl glass border border-white/10 overflow-hidden">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/xkoGtLH9KJU" 
                title="Método Métricas IA VSL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Qué está frenando sus campañas hoy",
              "Cómo dejar de tomar decisiones sin criterio",
              "Qué nivel del método encaja mejor con su etapa"
            ].map((bullet, i) => (
              <div key={i} className="flex items-center gap-3 justify-center md:justify-start text-slate-300">
                <CheckCircle2 className="text-brand-cyan" size={18} />
                <span className="text-sm font-medium">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. SECCIÓN DE IDENTIFICACIÓN DEL PROBLEMA (PAS) */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              El problema no es Meta Ads.<br />
              <span className="text-brand-cyan italic">El problema es intentar escalar sin método.</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Muchos dueños de negocio sienten que Meta Ads es una "apuesta" donde a veces se gana y a veces se pierde sin entender por qué. Si se siente identificado con esto, no es su culpa, es falta de estructura:
            </p>
            <div className="space-y-6">
              {[
                "Lanzar campañas sin una estructura clara de testeo.",
                "No entender qué métrica mirar cuando las ventas bajan.",
                "Tocar campañas por ansiedad cada 2 horas.",
                "Creer que inyectar más presupuesto arreglará una mala estrategia.",
                "Depender de tutoriales sueltos o agencias que ejecutan pero no explican."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <AlertCircle className="text-brand-blue mt-1 shrink-0" size={20} />
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="p-8 rounded-3xl glass border-white/5 blue-glow">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="text-brand-cyan" />
                    <span className="font-semibold text-slate-200">Estado de Campaña</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">ID_ANALYTICS_001</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Presupuesto Consumido</span>
                    <span className="text-brand-cyan">$$$</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      className="h-full bg-brand-blue"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Retorno Real (ROAS)</span>
                    <span className="text-red-400">Inestable</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "35%" }}
                      className="h-full bg-red-500"
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-400 italic">"Sentir que Meta Ads podría funcionar pero no saber cómo volverlo predecible."</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. AGITACIÓN DEL DOLOR */}
      <Section className="bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue/5 -z-10" />
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            Cada campaña mal estructurada no solo cuesta dinero.<br />
            <span className="text-brand-blue">También le cuesta claridad, tiempo y crecimiento.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Seguir improvisando significa más dinero perdido, más confusión y más decisiones a ciegas. Mientras usted adivina, su competencia escala con datos. El costo de no tener un método es quedarse estancado mientras el mercado avanza.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Dinero Perdido", icon: <Zap className="text-brand-cyan" /> },
              { label: "Confusión Total", icon: <BrainCircuit className="text-brand-cyan" /> },
              { label: "Crecimiento Lento", icon: <TrendingUp className="text-brand-cyan" /> },
              { label: "Frustración", icon: <Activity className="text-brand-cyan" /> }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl glass border-white/5 flex flex-col items-center gap-3">
                {item.icon}
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. PRESENTACIÓN DE LA SOLUCIÓN */}
      <Section className="bg-brand-surface/20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Una metodología para dejar de adivinar y empezar a <span className="text-brand-blue">escalar con criterio</span>.
          </h2>
          <p className="text-xl text-slate-400">
            Método Métricas IA™ no es un curso grabado más. Es una metodología de mentoría estratégica diseñada para que usted aprenda a pensar sus campañas, interpretar sus métricas y escalar con lógica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-3xl glass border-red-500/20 bg-red-500/5">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <AlertCircle className="text-red-500" /> Lo que NO es
            </h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-red-500 opacity-50" /> Un curso grabado sin soporte.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-red-500 opacity-50" /> Una agencia tradicional que lo mantiene a oscuras.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-red-500 opacity-50" /> Teoría vacía sin aplicación real.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-red-500 opacity-50" /> Una clase improvisada de "trucos".</li>
            </ul>
          </div>
          <div className="p-10 rounded-3xl glass border-brand-cyan/20 bg-brand-cyan/5">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <ShieldCheck className="text-brand-cyan" /> Lo que SÍ es
            </h3>
            <ul className="space-y-4 text-slate-200">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-cyan" /> Mentoría estratégica guiada.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-cyan" /> Estructura para entender métricas y optimizar.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-cyan" /> Combinación de Estrategia + IA + Acompañamiento.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-cyan" /> Una ruta clara para escalar con lógica.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 6. BENEFICIOS PRINCIPALES */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Beneficios Tangibles</h2>
          <p className="text-slate-400">Resultados orientados a performance real.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Entender qué funciona", desc: "Identifique rápidamente qué creativos y audiencias traen dinero.", icon: <Target /> },
            { title: "Optimizar con Seguridad", desc: "Sepa exactamente qué corregir antes de que sea tarde.", icon: <Activity /> },
            { title: "Interpretar Métricas", desc: "Deje de mirar números vacíos y entienda la lógica del negocio.", icon: <BarChart3 /> },
            { title: "IA para Acelerar", desc: "Use Inteligencia Artificial para análisis de data y ejecución.", icon: <Cpu /> },
            { title: "Reducir Errores", desc: "Ahorre miles de dólares evitando configuraciones incorrectas.", icon: <ShieldCheck /> },
            { title: "Escalar con Lógica", desc: "Suba presupuesto sin miedo a romper el rendimiento.", icon: <TrendingUp /> },
            { title: "Independencia", desc: "Deje de depender de agencias externas o intuición.", icon: <Lock /> },
            { title: "Monetización", desc: "Use este conocimiento para su negocio o para clientes.", icon: <Zap /> }
          ].map((benefit, i) => (
            <div key={i} className="p-8 rounded-2xl glass border-white/5 hover:border-brand-blue/30 transition-colors group">
              <div className="mb-4 text-brand-cyan group-hover:text-brand-blue transition-colors">{benefit.icon}</div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. MECANISMO ÚNICO */}
      <Section className="bg-brand-surface/30">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Los 3 Pilares del Método</h2>
          <p className="text-xl text-slate-400">La base de nuestro éxito radica en la integración de estos tres ejes fundamentales.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Estrategia y Estructura",
              desc: "No lanzamos anuncios, construimos arquitecturas de venta. Resolvemos el caos inicial para que cada dólar tenga un propósito claro.",
              benefit: "Claridad absoluta en su embudo.",
              icon: <Target className="text-brand-blue" size={40} />
            },
            {
              title: "IA Aplicada al Rendimiento",
              desc: "La IA no reemplaza al estratega, lo potencia. Usamos herramientas avanzadas para analizar patrones que el ojo humano ignora.",
              benefit: "Decisiones basadas en data, no en fe.",
              icon: <Cpu className="text-brand-cyan" size={40} />
            },
            {
              title: "Acompañamiento y Criterio",
              desc: "El mayor valor es el criterio. Le enseñamos a pensar para que sepa escalar presupuestos de forma predecible y segura.",
              benefit: "Escalado seguro y rentable.",
              icon: <Users className="text-brand-blue" size={40} />
            }
          ].map((pilar, i) => (
            <div key={i} className="text-center p-8">
              <div className="flex justify-center mb-6">{pilar.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{pilar.title}</h3>
              <p className="text-slate-400 mb-6">{pilar.desc}</p>
              <div className="inline-block px-4 py-2 rounded-lg bg-brand-blue/10 text-brand-cyan text-sm font-bold">
                {pilar.benefit}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. SECCIÓN DE LOS 3 NIVELES */}
      <Section id="niveles" className="bg-brand-navy relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.1),transparent_50%)]" />
        
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 uppercase">Niveles del Método</h2>
          <p className="text-xl text-slate-400">
            Elija el nivel que mejor se adapte a su etapa actual. Una sola metodología, tres formas de dominarla.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Nivel 1 */}
          <div className="p-10 rounded-3xl glass border-white/5 flex flex-col hover:border-brand-blue/20 transition-all">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Mentoría Base</h3>
              <p className="text-brand-cyan font-semibold text-sm uppercase tracking-widest">Cimientos Estratégicos</p>
            </div>
            <div className="mb-8 flex-grow">
              <p className="text-slate-400 mb-6">Para quien necesita una base clara y dejar de improvisar.</p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs font-bold uppercase text-slate-500 mb-1">Transformación:</p>
                  <p className="text-sm text-slate-200">Pasar de no entender qué tocar ni qué medir, a tener estructura para lanzar campañas con lógica.</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-cyan" /> Configuración técnica correcta.</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-cyan" /> Estructura de testeo inicial.</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-cyan" /> Lectura de métricas básicas.</li>
                </ul>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={openForm}>Aplicar a Nivel Base</Button>
          </div>

          {/* Nivel 2 */}
          <div className="p-10 rounded-3xl bg-brand-surface border-gradient relative flex flex-col transform lg:scale-105 blue-glow">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Más Popular
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Mentoría Premium</h3>
              <p className="text-brand-cyan font-semibold text-sm uppercase tracking-widest">Optimización y Escala</p>
            </div>
            <div className="mb-8 flex-grow">
              <p className="text-slate-400 mb-6">Para quien quiere acompañamiento cercano para optimizar y escalar.</p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-brand-blue/10 border border-brand-blue/20">
                  <p className="text-xs font-bold uppercase text-brand-cyan mb-1">Transformación:</p>
                  <p className="text-sm text-slate-200">Pasar de campañas activas pero inestables, a campañas mejor entendidas y mejor gestionadas.</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-cyan" /> Acompañamiento estratégico.</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-cyan" /> Criterio de escalado avanzado.</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-cyan" /> Optimización de embudos.</li>
                </ul>
              </div>
            </div>
            <Button className="w-full" onClick={openForm}>Aplica a Nivel Premium</Button>
          </div>

          {/* Nivel 3 */}
          <div className="p-10 rounded-3xl glass border-white/5 flex flex-col hover:border-brand-blue/20 transition-all">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Mentoría Masterclass</h3>
              <p className="text-brand-cyan font-semibold text-sm uppercase tracking-widest">Dominio Total</p>
            </div>
            <div className="mb-8 flex-grow">
              <p className="text-slate-400 mb-6">Para quien quiere una inmersión más completa y dominio más profundo.</p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs font-bold uppercase text-slate-500 mb-1">Transformación:</p>
                  <p className="text-sm text-slate-200">Pasar de depender de terceros o de información suelta, a dominar una metodología más integral.</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-cyan" /> Inmersión total en performance.</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-cyan" /> Estrategias omnicanal.</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-cyan" /> Dominio de IA avanzada.</li>
                </ul>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={openForm}>Aplicar a Masterclass</Button>
          </div>
        </div>

        {/* 9. UPGRADE PREMIUM */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 p-8 rounded-3xl border border-brand-cyan/20 bg-brand-cyan/5 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-blue flex items-center justify-center shrink-0 blue-glow">
              <Star className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Implementación Elite</h3>
              <p className="text-slate-400">Si prefiere delegar completamente la ejecución, gestionamos sus campañas de alto presupuesto.</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-3xl font-bold mb-2">$1,000 <span className="text-sm font-normal text-slate-500">USD / mes</span></p>
            <Button variant="secondary" className="py-2 px-6 text-sm" onClick={openForm}>Consultar Disponibilidad</Button>
          </div>
        </motion.div>
      </Section>

      {/* 10. AUTORIDAD Y PRUEBA SOCIAL */}
      <Section className="text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16">Resultados y Transformaciones</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { tag: "E-commerce", result: "ROI 6.5x", desc: "Escalamiento de marca de moda." },
            { tag: "Servicios", result: "CPL -40%", desc: "Optimización de captura de leads." },
            { tag: "Infoproducto", result: "6 Cifras", desc: "Lanzamiento con metodología IA." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl glass border-white/5 text-left group hover:bg-brand-blue/5 transition-colors">
              <div className="text-brand-cyan text-sm font-bold uppercase mb-2">{item.tag}</div>
              <div className="text-4xl font-bold mb-4 text-white group-hover:text-brand-blue transition-colors">{item.result}</div>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto p-12 rounded-3xl glass border-brand-blue/20 cyan-glow relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
            <Star className="text-white" size={24} />
          </div>
          <p className="text-2xl italic text-slate-300 mb-8 leading-relaxed">
            "Antes de Métricas IA, sentía que estaba apostando en un casino. Ahora entiendo exactamente por qué mis campañas funcionan y cómo escalarlas sin miedo. La claridad que te da el método no tiene precio."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-brand-cyan/30 overflow-hidden">
              <img src="https://picsum.photos/seed/user1/100/100" alt="Testimonio" referrerPolicy="no-referrer" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">Carlos Méndez</p>
              <p className="text-sm text-slate-500">Dueño de Negocio, Tech Solutions</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 11. FAQ PERSUASIVO */}
      <Section className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center uppercase tracking-tight">Preguntas Frecuentes</h2>
        <div className="space-y-2">
          <FAQItem 
            question="¿Esto es para mí si nunca he hecho anuncios?" 
            answer="Sí. El Método Métricas IA™ está diseñado para llevarlo de la mano. El Nivel Base es perfecto para construir los cimientos correctos y evitar que pierda dinero por errores de principiante." 
          />
          <FAQItem 
            question="¿Y si ya probé anuncios antes y no funcionó?" 
            answer="La mayoría falla por falta de estructura. Aquí no solo aprenderá a 'picar botones', sino a pensar estratégicamente. Auditaremos lo que falló y construiremos una ruta rentable." 
          />
          <FAQItem 
            question="¿Cómo sé qué nivel necesito?" 
            answer="Al hacer clic en el botón principal, lo guiaremos para evaluar su etapa actual (presupuesto, experiencia, objetivos) y recomendarle el nivel ideal." 
          />
          <FAQItem 
            question="¿Esto me sirve si quiero aplicarlo a mi negocio?" 
            answer="Es el objetivo principal. El 80% de nuestros alumnos son dueños de negocio que quieren dejar de depender de terceros y tomar el control de su crecimiento." 
          />
          <FAQItem 
            question="¿También me sirve si luego quiero ofrecer este servicio?" 
            answer="Totalmente. Al dominar la metodología, tendrá un activo de alto valor que podrá vender a otros negocios como especialista en performance." 
          />
          <FAQItem 
            question="¿Qué diferencia hay entre esto y una agencia?" 
            answer="Una agencia ejecuta por usted (y a veces lo mantiene a oscuras). Nosotros le damos el criterio y la metodología para que usted sea el dueño del conocimiento y los resultados." 
          />
          <FAQItem 
            question="¿Qué incluye Implementación Elite?" 
            answer="Es nuestro servicio 'Done-For-You'. Nosotros aplicamos toda la metodología gestionando sus campañas de alto presupuesto mientras usted se enfoca en escalar su operación." 
          />
          <FAQItem 
            question="¿Voy a recibir acompañamiento real?" 
            answer="Sí. No es solo contenido grabado. Dependiendo del nivel, tendrá acceso a sesiones, soporte y una comunidad de estrategas para que nunca se sienta solo." 
          />
        </div>
      </Section>

      {/* 12. CIERRE FINAL */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue/10 -z-10" />
        <div className="text-center max-w-4xl mx-auto py-20">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 uppercase tracking-tighter">
            Su publicidad no necesita más improvisación.
          </h2>
          <p className="text-2xl text-slate-400 mb-12 leading-relaxed">
            Necesita método, criterio y una ruta clara para escalar. Deje de adivinar y empiece a escalar con una metodología real.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button className="mx-auto" onClick={openForm}>
              Quiero ver qué nivel es para mí
              <ArrowRight size={20} />
            </Button>
            <p className="text-sm text-slate-500 font-medium">
              Entre y descubra qué nivel encaja con su etapa actual.
            </p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-display font-bold text-white text-xl">
            <BrainCircuit className="text-brand-cyan" />
            Métricas <span className="text-brand-blue">IA™</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Soporte</a>
          </div>
          <p>© 2026 Métricas IA. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
