import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BrainCircuit, ArrowRight } from "lucide-react";

export const HeroCanvas = ({ openForm, scrollToLevels }: { openForm: (plan?: string) => void, scrollToLevels: () => void }) => {
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

    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, width * 0.2,
      width / 2, height / 2, width * 0.8
    );
    gradient.addColorStop(0, "rgba(2, 6, 23, 0)");
    gradient.addColorStop(1, "rgba(2, 6, 23, 0.6)"); 
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
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-brand-navy">
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
          className="absolute inset-0 flex flex-col items-center pt-32 md:pt-48 px-6 text-center max-w-5xl mx-auto z-10 pointer-events-none"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-8 tracking-tight uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] pointer-events-auto">
            DEJA DE IMPROVISAR CON META ADS.<br />
            <span className="text-brand-blue">APRENDE A LANZAR, OPTIMIZAR Y ESCALAR</span> CAMPAÑAS RENTABLES CON IA Y ACOMPAÑAMIENTO REAL.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pointer-events-auto">
            Método Métricas IA™ es una metodología de mentoría estratégica en 3 niveles para dueños de negocio, emprendedores y marcas que quieren dejar de perder dinero en anuncios, entender qué funciona de verdad y escalar con más claridad, control y retorno.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <button 
              onClick={() => openForm()}
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-lg w-full sm:w-auto bg-brand-blue text-white hover:bg-blue-700 blue-glow"
            >
              Quiero ver qué nivel es para mí
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={scrollToLevels}
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-lg w-full sm:w-auto border border-white/20 text-white hover:bg-white/5 backdrop-blur-sm"
            >
              Explorar Niveles
            </button>
          </div>
          <p className="text-sm text-slate-300 font-medium drop-shadow-md mt-4">
            Descubre cuál nivel encaja con tu etapa y cómo empezar a escalar con criterio.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
