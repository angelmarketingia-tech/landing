import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BrainCircuit, ArrowRight } from "lucide-react";

export const HeroCanvas = ({ openForm, scrollToLevels, isLight }: { openForm: (plan?: string) => void, scrollToLevels: () => void, isLight: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const TOTAL_FRAMES = 40;
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    // Cargar los nuevos 40 frames optimizados
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${numStr}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      imgs.push(img);
    }
    setImages(imgs);
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const safeIndex = Math.min(Math.max(Math.floor(index), 1), TOTAL_FRAMES);
    const img = images[safeIndex - 1];
    if (!img || !img.complete) return;

    const { width, height } = canvas;
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    const gradientColor = isLight ? "248, 250, 252" : "2, 6, 23";
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, width * 0.2,
      width / 2, height / 2, width * 0.8
    );
    gradient.addColorStop(0, `rgba(${gradientColor}, 0)`);
    gradient.addColorStop(1, `rgba(${gradientColor}, 0.6)`); 
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  useEffect(() => {
    if (loadedCount > 0 && canvasRef.current) {
      drawFrame(1);
    }
  }, [loadedCount]);

  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      drawFrame(latest);
    });
    return () => unsubscribe();
  }, [frameIndex, images]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameIndex.get());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [frameIndex, images]);

  return (
    <div ref={containerRef} className="relative w-full h-[250vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-brand-navy transition-colors duration-300">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />

        {loadedCount < TOTAL_FRAMES && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 z-10">
            <div className="text-white text-sm mb-2 text-center">Optimizando experiencia... {Math.floor((loadedCount / TOTAL_FRAMES) * 100)}%</div>
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-cyan transition-all duration-300"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Hero Content Overlay */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto z-10 pointer-events-none"
        >
          {/* Pre-headline tensión */}
          <div className="mb-4 pointer-events-auto">
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
              style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', textShadow: '0 0 20px rgba(0,0,0,1)' }}
            >
              Tu competencia ya tiene método. ¿Sigues improvisando?
            </span>
          </div>

          {/* HEADLINE principal — transformación + monetización */}
          <h1
            className="text-4xl md:text-5xl lg:text-[4.25rem] font-display font-bold leading-[1.08] mb-5 tracking-tight text-white pointer-events-auto"
            style={{ textShadow: '0 0 60px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,1), 0 0 120px rgba(0,0,0,0.95)' }}
          >
            Deja de improvisar en Meta Ads<br />
            <span
              className="text-brand-blue"
              style={{ textShadow: '0 0 40px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,1), 0 0 60px rgba(37,99,235,0.4)' }}
            >
              y conviértelo en una habilidad<br />rentable que puedes vender.
            </span>
          </h1>

          {/* Subheadline — legible sobre fondo */}
          <div
            className="mb-8 px-5 py-3 rounded-2xl pointer-events-auto max-w-xl mx-auto"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            <p className="text-sm md:text-base text-slate-200 leading-relaxed text-center">
              Aprende con estructura real, <span className="text-brand-cyan font-semibold">IA aplicada</span> y acompañamiento cercano — para dominar una habilidad de alto valor y monetizarla más rápido.
            </p>
          </div>

          {/* CTA único */}
          <div className="pointer-events-auto">
            <button
              onClick={scrollToLevels}
              className="group px-10 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 text-white transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 0 40px rgba(37,99,235,0.5), 0 4px 24px rgba(0,0,0,0.7)' }}
            >
              Ver niveles del método
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Reducción de riesgo */}
          <p
            className="text-xs mt-4 pointer-events-auto font-mono"
            style={{ color: 'rgba(203,213,225,0.5)', textShadow: '0 1px 6px rgba(0,0,0,1)' }}
          >
            Sin permanencia forzada · Cupos limitados · Respuesta en 24h
          </p>
        </motion.div>
      </div>
    </div>
  );
};
