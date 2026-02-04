"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Play, Pause, Check, Music, Usb, Wifi, WifiOff, Volume2, Car, Tv, Smartphone, Download, CreditCard, MonitorPlay, ChevronLeft, ChevronRight, ChevronDown, User, Shield, Zap, MessageCircle } from "lucide-react";

const CHECKOUT_BASE_URL = "https://www.ggcheckout.com/checkout/v4/ovrrA93ChkocfHGQW2GT";
const CHECKOUT_PREMIUM_URL = "https://www.ggcheckout.com/checkout/v4/szhvL5edbCHpOxV3BiZz";

const previews = [
  {
    id: 0,
    title: "Retro Hits - Os Melhores dos Anos 80 e 90",
    image: "/flashback-cover.jpg",
    audioSrc: "/preview-retro.mp3"
  },
  {
    id: 1,
    title: "Flashback Mix - Seleção Premium",
    image: "/michael-jackson-cover.jpg",
    audioSrc: "/preview-moonjack.mp3"
  },
  {
    id: 2,
    title: "Flashback Nostalgia - Mix 70, 80 e 90",
    image: "/back-to-80s.jpg",
    audioSrc: "/preview-flashback.mp3"
  },
  {
    id: 3,
    title: "Eurodance Classics - O melhor das Pistas",
    image: "/back-to-90s.jpg",
    audioSrc: "/preview-eurodance.mp3"
  },
  {
    id: 4,
    title: "Scorpions - Ballads & Rock Classics",
    image: "/scorpions-cover.jpg",
    audioSrc: "/preview-romanticas.mp3"
  },
  {
    id: 5,
    title: "Rock Classics - Hinos do Flashback",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop",
    audioSrc: "/preview-rock.mp3"
  }];


const testimonials = [
  {
    name: "Carlos Silva",
    location: "São Paulo - SP",
    avatar: "/testimonials/carlos-real.jpg",
    text: "Coloquei no pendrive do carro... parece que voltei no tempo! As músicas dos anos 80 estão perfeitas, qualidade de áudio nota 10."
  },
  {
    name: "Maria Santos",
    location: "Rio de Janeiro - RJ",
    avatar: "/testimonials/maria-v2.jpg",
    text: "Melhor compra que fiz! Relembrei toda a minha juventude com essas músicas. O Eurodance está incrível, recomendo demais!"
  },
  {
    name: "João Oliveira",
    location: "Belo Horizonte - MG",
    avatar: "/testimonials/joao-real.jpg",
    text: "3.000 músicas é muita coisa! Agora minhas viagens de carro são só clássicos. Sem propaganda e sem internet, perfeito."
  },
  {
    name: "Ana Paula",
    location: "Curitiba - PR",
    avatar: "/testimonials/woman-uploaded.jpg",
    text: "Super fácil de usar! Baixei, passei pro pendrive e as românticas dos anos 90 me fizeram chorar. Que seleção maravilhosa!"
  },
  {
    name: "Roberto Almeida",
    location: "Porto Alegre - RS",
    avatar: "/testimonials/roberto-real.jpg",
    text: "Finalmente uma playlist de Flashback que tem de tudo. Disco, Pop, Eurodance... tá tudo pronto pra usar. Vale cada centavo!"
  }];


const faq = [
  {
    question: "Como eu recebo o acesso?",
    answer: "Você recebe imediatamente após a compra. ✅ Enviamos o link de acesso no seu e-mail e também no WhatsApp (pra não correr risco de você ficar sem). É só abrir, clicar e baixar. Sem espera. Recomendação rápida: se não achar, olha a caixa “Promoções/Spam” — mas normalmente chega em segundos. É rapidinho — em poucos minutos você já tá ouvindo."
  },
  {
    question: "Precisa de internet pra ouvir?",
    answer: "Pra ouvir, não. ✅ Depois que você baixar as músicas, elas ficam no seu celular/pendrive e rodam offline, sem depender de sinal, 4G ou Wi-Fi. Internet só é usada na primeira vez, pra baixar. É rapidinho — em poucos minutos você já tá ouvindo."
  },
  {
    question: "Serve em qualquer carro?",
    answer: "Na prática, sim. ✅ Funciona em qualquer multimídia ou som que aceite: USB (pendrive), AUX (em alguns casos, via celular) ou Bluetooth (se você estiver tocando pelo celular). Se o seu carro toca MP3 por USB, vai tocar. É rapidinho — em poucos minutos você já tá ouvindo."
  },
  {
    question: "Como coloco no pendrive?",
    answer: "É bem simples e rápido. Você baixa a pasta, abre e arrasta pro pendrive. ✅ E pra deixar ainda mais fácil, você recebe um vídeo passo a passo mostrando como passar pro pendrive em poucos minutos (mesmo pra quem não tem prática). Sem complicação. É rapidinho — em poucos minutos você já tá ouvindo."
  },
  {
    question: "Tem música velha e nova?",
    answer: "Tem sim. ✅ A base é flashback de verdade (anos 70, 80, 90 e clássicos). E o acervo é organizado pra você achar rápido o que gosta. É rapidinho — em poucos minutos você já tá ouvindo."
  },
  {
    question: "Dá pra ouvir na TV ou caixa de som?",
    answer: "Dá. ✅ Você consegue ouvir em: TV (se tiver entrada USB/arquivos compatíveis), caixa de som, som de casa / aparelho de DVD, computador e notebook. Qualquer aparelho que leia MP3. É um formato bem universal. É rapidinho — em poucos minutos você já tá ouvindo."
  },
  {
    question: "É mensalidade?",
    answer: "Não. ✅ É pagamento único. Você paga uma vez e tem acesso, sem assinatura e sem cobrança recorrente. É rapidinho — em poucos minutos você já tá ouvindo."
  },
  {
    question: "E se eu tiver dúvidas?",
    answer: "Fica tranquilo. O suporte é humanizado (de pessoa pra pessoa), e a gente responde pra te ajudar no que precisar — seja pra baixar, organizar ou colocar no pendrive. Você não fica sozinho. ✅ É rapidinho — em poucos minutos você já tá ouvindo."
  }];


const benefitsNew = [
  {
    icon: WifiOff,
    title: "Funciona Offline",
    description: "Ouça no carro ou na estrada sem precisar de sinal"
  },
  {
    icon: Volume2,
    title: "Zero Propaganda",
    description: "Nenhum anúncio interrompendo suas músicas favoritas"
  },
  {
    icon: CreditCard,
    title: "Sem Mensalidade",
    description: "Pague uma vez só e use pra sempre"
  },
  {
    icon: Usb,
    title: "Pronto pro Pendrive",
    description: "Arquivos organizados, é só copiar e usar"
  },
  {
    icon: MonitorPlay,
    title: "Compatível com Tudo",
    description: "Funciona no carro, TV, multimídia e caixa de som"
  },
  {
    icon: Download,
    title: "Acesso Imediato",
    description: "Link de download liberado na hora após a compra"
  }];


function HomeContent() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPreview, setCurrentPreview] = useState(0);
  const [baseCheckoutUrl, setBaseCheckoutUrl] = useState(CHECKOUT_BASE_URL);
  const [premiumCheckoutUrl, setPremiumCheckoutUrl] = useState(CHECKOUT_PREMIUM_URL);

  const [previewStates, setPreviewStates] = useState<{ isPlaying: boolean; progress: number; currentTime: number; }[]>(
    previews.map(() => ({ isPlaying: false, progress: 0, currentTime: 0 }))
  );

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [viewContentFired, setViewContentFired] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);

    // Track PageView immediately on mount (handled by FacebookPixel component)

    // Atualiza os links com UTMs no cliente para evitar hydration mismatch
    if (typeof window !== "undefined") {
      const search = window.location.search;

      const updateUrl = (baseUrl: string) => {
        try {
          const url = new URL(baseUrl);
          if (search) {
            const params = new URLSearchParams(search);
            params.forEach((value, key) => {
              url.searchParams.set(key, value);
            });
          }
          return url.toString();
        } catch (e) {
          return baseUrl;
        }
      };

      const finalBase = updateUrl(CHECKOUT_BASE_URL);
      const finalPremium = updateUrl(CHECKOUT_PREMIUM_URL);

      setBaseCheckoutUrl(finalBase);
      setPremiumCheckoutUrl(finalPremium);

      if (process.env.NODE_ENV === "development") {
        console.log("Base Checkout URL:", finalBase);
        console.log("Premium Checkout URL:", finalPremium);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Fire ViewContent on scroll if not already fired
      if (window.scrollY > 100 && !viewContentFired && typeof window.fbq !== "undefined") {
        // Obter test_event_code diretamente da URL para garantir que seja o mais atual
        const urlParams = new URLSearchParams(window.location.search);
        const testEventCode = urlParams.get("test_event_code");
        const options = testEventCode ? { test_event_code: testEventCode } : {};

        window.fbq("track", "ViewContent", {
          content_name: "Landing Page 3000 Músicas Flashbacks",
          content_category: "Música / Flashback",
          content_type: "product",
          value: 19.90,
          currency: "BRL"
        }, options);

        console.log("[Facebook Pixel] Event tracked on scroll: ViewContent", options);
        setViewContentFired(true);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [viewContentFired]);

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const smoothScrollTo = (targetY: number, duration: number = 800) => {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToPremium = () => {
    const premiumCard = document.getElementById('oferta-premium');
    if (!premiumCard) return;

    const headerHeight = 60;
    const extraMargin = 16;
    const elementTop = premiumCard.getBoundingClientRect().top + window.pageYOffset;
    const targetY = elementTop - headerHeight - extraMargin;

    smoothScrollTo(targetY, 800);
  };

  const scrollToOfertas = () => {
    scrollToPremium();
  };


  const scrollToAmostras = () => {
    const amostrasSection = document.getElementById('amostras-section');
    if (!amostrasSection) return;

    const headerHeight = 60;
    const extraMargin = 16;
    const elementTop = amostrasSection.getBoundingClientRect().top + window.pageYOffset;
    const targetY = elementTop - headerHeight - extraMargin;

    smoothScrollTo(targetY, 1100);
  };

  const pauseAllAudio = () => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
      }
    });
    setPreviewStates((prev) => prev.map((state) => ({ ...state, isPlaying: false })));
  };

  const togglePreviewPlay = (index: number) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (previewStates[index].isPlaying) {
      audio.pause();
      setPreviewStates((prev) => {
        const newStates = [...prev];
        newStates[index] = { ...newStates[index], isPlaying: false };
        return newStates;
      });
    } else {
      pauseAllAudio();
      audio.play();
      setPreviewStates((prev) => {
        const newStates = [...prev];
        newStates[index] = { ...newStates[index], isPlaying: true };
        return newStates;
      });
    }
  };

  const handlePreviewTimeUpdate = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      const current = audio.currentTime;
      const duration = audio.duration || 20;
      setPreviewStates((prev) => {
        const newStates = [...prev];
        newStates[index] = {
          ...newStates[index],
          progress: current / duration * 100,
          currentTime: current
        };
        return newStates;
      });
    }
  };

  const handlePreviewProgressClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const duration = audio.duration || 20;
      audio.currentTime = clickX / width * duration;
    }
  };

  const handlePreviewEnded = (index: number) => {
    setPreviewStates((prev) => {
      const newStates = [...prev];
      newStates[index] = { ...newStates[index], isPlaying: false };
      return newStates;
    });
  };

  const handleTrackCheckout = (value: number) => {
    if (typeof window.fbq !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const testEventCode = urlParams.get("test_event_code");
      const options: any = {};
      if (testEventCode) {
        options.test_event_code = testEventCode;
      }

      window.fbq("track", "InitiateCheckout", {
        value: value,
        currency: "BRL"
      }, options);

      console.log(`[Facebook Pixel] Tracked InitiateCheckout: ${value}`, options);
    } else {
      console.warn("[Facebook Pixel] fbq not defined when trying to track InitiateCheckout");
    }
  };

  const goToPreview = (index: number) => {
    if (index === currentPreview) return;
    pauseAllAudio();
    setCurrentPreview(index);
    setTouchDelta(0);
  };

  const nextPreview = () => {
    if (currentPreview < previews.length - 1) {
      goToPreview(currentPreview + 1);
    }
  };

  const prevPreview = () => {
    if (currentPreview > 0) {
      goToPreview(currentPreview - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - touchStart;
    setTouchDelta(delta);
  };

  const handleTouchEnd = () => {
    if (touchStart === null) return;
    const threshold = 50;

    if (touchDelta < -threshold && currentPreview < previews.length - 1) {
      goToPreview(currentPreview + 1);
    } else if (touchDelta > threshold && currentPreview > 0) {
      goToPreview(currentPreview - 1);
    } else {
      setTouchDelta(0);
    }

    setTouchStart(null);
    setIsDragging(false);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden pt-[44px] md:pt-[52px]" suppressHydrationWarning={true}>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-[10001] bg-[#020617] h-[44px] md:h-[52px] flex items-center justify-center border-b border-blue-600/20 animate-glow-pulse">
        <p className="text-[#FACC15] font-bold text-[14px] md:text-base flex items-center gap-1.5 whitespace-nowrap">
          ⏰ Oferta por tempo limitado. Aproveite agora.
        </p>
      </div>

      <header
        className={`fixed top-[44px] md:top-[52px] left-0 right-0 z-[9999] transition-transform duration-300 md:hidden will-change-transform ${isScrolled ?
          'bg-[#020617]/95 shadow-lg shadow-black/30 translate-y-0' :
          '-translate-y-full'}`
        }
        style={{ paddingTop: 'env(safe-area-inset-top)' }}>

        <div className="flex items-center justify-between px-4 h-[60px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sky-400 text-sm">Central do Flashback</span>
          </div>
          <button
            onClick={scrollToOfertas}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg shadow-blue-500/20">
            Garantir acesso
          </button>
        </div>
      </header>

      <section className="relative min-h-[85vh] flex items-center justify-center py-12 px-4 overflow-hidden">
        {/* Hero Background with Image and Overlays */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center md:bg-right-top scale-105"
            style={{
              backgroundImage: 'url(/hero-bg.jpg)',
              filter: 'blur(3px) saturate(0.8)',
            }}
          />
          {/* Dark Overlay Gradient for Legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.92) 0%, rgba(2, 6, 23, 0.85) 50%, rgba(2, 6, 23, 0.75) 100%)'
            }}
          />
          {/* Bottom transition blend */}
          <div className="absolute bottom-0 left-0 right-0 h-[140px] bg-gradient-to-b from-transparent to-[#020617]" />
          {/* subtle blue glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-600/10 shadow-[0_0_15px_rgba(37,99,235,0.1)]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
            🎶 Flashback no seu carro
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-sky-400">3.000 MÚSICAS FLASHBACKS</span>
            <br />
            <span className="text-white">QUE FIZERAM SUCESSO</span>
            <br />
            <span className="text-sky-400">NOS ANOS <span className="whitespace-nowrap">70, 80 E 90</span></span>
          </h1>

          <p className="text-xl md:text-2xl text-[#CBD5E1] mb-6 max-w-2xl mx-auto leading-relaxed">
            Tem música que não envelhece.<br />
            Ela só fica mais forte com o tempo.<br />
            <span className="text-sky-400 font-bold">Você vai entender na primeira faixa.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 text-lg">
            <span className="flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" /> Sem internet
            </span>
            <span className="flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" /> Sem propaganda
            </span>
            <span className="flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" /> Sem mensalidade
            </span>
          </div>

          <button
            onClick={scrollToAmostras}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-black text-xl md:text-2xl px-12 py-5 rounded-full shadow-2xl shadow-blue-500/30 transition-all duration-300 ${isHovered ? 'scale-105 shadow-blue-500/50' : ''}`}>
            OUVIR UMA PRÉVIA AGORA
          </button>

          <p className="text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
            <span className="animate-bounce">↓</span> Escolha um clássico e dê o play
          </p>
        </div>
      </section>

      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(2, 6, 23, 0.7) 100%), linear-gradient(180deg, #0f172a 0%, #020617 50%, #020617 100%)`
          }} />
        {/* Top transition blend */}
        <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-[#020617] to-transparent z-[1]" />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e293b' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />


        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              O que você recebe <span className="text-sky-400">ao liberar o acesso</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl">
              Tudo pronto pra você baixar, copiar pro pendrive e curtir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {benefitsNew.map((benefit, index) =>
              <div
                key={index}
                className="group relative bg-[#0f172a]/50 p-6 md:p-7 rounded-2xl border border-blue-900/30 shadow-xl shadow-black/20 hover:border-blue-500/50 hover:shadow-blue-900/20 transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-sky-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="amostras-section" className="relative py-16 md:py-20 px-4 overflow-hidden">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes equalizerBar1 { 0%, 100% { transform: scaleY(0.2); } 50% { transform: scaleY(0.8); } }
          @keyframes equalizerBar2 { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(0.6); } }
          @keyframes equalizerBar3 { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
          .equalizer-bar-1 { animation: equalizerBar1 0.5s ease-in-out infinite; transform-origin: bottom; will-change: transform; }
          .equalizer-bar-2 { animation: equalizerBar2 0.4s ease-in-out infinite 0.1s; transform-origin: bottom; will-change: transform; }
          .equalizer-bar-3 { animation: equalizerBar3 0.45s ease-in-out infinite 0.2s; transform-origin: bottom; will-change: transform; }
        ` }} />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top, rgba(30, 58, 138, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(30, 58, 138, 0.3) 0%, transparent 50%), linear-gradient(180deg, #020617 0%, #020617 100%)`
          }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3">
              Escute agora uma <span className="text-sky-400">amostra real</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Organizado por estilos e pronto pra usar no carro ou pendrive
            </p>
          </div>

          <div className="relative mx-auto mb-10 md:mb-14 w-[92vw] max-w-[330px]">
            <button
              onClick={prevPreview}
              disabled={currentPreview === 0}
              className={`hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-900/30 border border-blue-800/50 items-center justify-center text-sky-400 hover:bg-blue-800/40 active:scale-95 transition-all z-20 ${currentPreview === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
              aria-label="Prévia anterior">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextPreview}
              disabled={currentPreview === previews.length - 1}
              className={`hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-900/30 border border-blue-800/50 items-center justify-center text-sky-400 hover:bg-blue-800/40 active:scale-95 transition-all z-20 ${currentPreview === previews.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
              aria-label="Próxima prévia">
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              className="overflow-hidden touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}>
              <div
                className="flex"
                style={{
                  transform: `translateX(calc(-${currentPreview * 100}% + ${isDragging ? touchDelta : 0}px))`,
                  transition: isDragging ? 'none' : 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform'
                }}>
                {previews.map((preview, index) =>
                  <div key={preview.id} className="w-full flex-shrink-0 px-1">
                    <div className="relative bg-[#0f172a] rounded-2xl p-3 sm:p-4 border border-blue-900/40 shadow-2xl shadow-black/50">
                      <div className="flex justify-center mb-2 sm:mb-3">
                        <span className="bg-blue-900/40 text-sky-400/90 text-[9px] sm:text-[10px] font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-800/30">
                          Prévia de áudio (MP3)
                        </span>
                      </div>

                      <div className="relative rounded-xl overflow-hidden mb-3 sm:mb-4 shadow-lg shadow-black/40 mx-auto w-[58vw] min-w-[200px] max-w-[260px] aspect-square">
                        <Image
                          src={preview.image}
                          alt={preview.title}
                          fill
                          className="object-cover object-center"
                          draggable={false}
                          loading={index === 0 ? "eager" : "lazy"}
                          priority={index === 0}
                          sizes="(max-width: 768px) 58vw, 260px"
                          decoding="async" />

                        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] z-10 pointer-events-none" />
                      </div>

                      <div className={`flex items-center justify-center gap-2 mb-1.5 sm:mb-2 transition-opacity duration-300 ${previewStates[index]?.isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex items-end gap-[2px] h-3 sm:h-4">
                          <div className="w-[2px] sm:w-[3px] h-full bg-sky-400 rounded-full equalizer-bar-1" />
                          <div className="w-[2px] sm:w-[3px] h-full bg-sky-400 rounded-full equalizer-bar-2" />
                          <div className="w-[2px] sm:w-[3px] h-full bg-sky-400 rounded-full equalizer-bar-3" />
                        </div>
                        <span className="text-sky-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wide">Tocando agora</span>
                      </div>


                      <div className="text-center mb-2 sm:mb-4">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-0.5">Playlist Flashback Completa</h3>
                        <p className="text-sky-400/70 text-[10px] sm:text-xs">Anos 70 • 80 • 90 • Clássicos</p>
                      </div>

                      <p className="text-center text-gray-400 text-[11px] sm:text-xs mb-3 sm:mb-4">{preview.title}</p>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <button
                          onClick={() => togglePreviewPlay(index)}
                          className="w-11 h-11 flex-shrink-0 rounded-full bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/25 hover:scale-105 active:scale-95 transition-transform">
                          {previewStates[index]?.isPlaying ? <Pause className="w-4 h-4 text-white" fill="white" /> : <Play className="w-4 h-4 text-white ml-0.5" fill="white" />}
                        </button>

                        <div className="flex-1">
                          <div className="relative h-1 bg-blue-950/50 rounded-full cursor-pointer group" onClick={(e) => handlePreviewProgressClick(e, index)}>
                            <div className="absolute top-0 left-0 h-full bg-sky-400 rounded-full transition-all duration-100" style={{ width: `${previewStates[index]?.progress || 0}%` }} />
                          </div>
                          <div className="flex justify-between text-[10px] sm:text-[11px] text-gray-500 mt-0.5 sm:mt-1">
                            <span>{formatTime(previewStates[index]?.currentTime || 0)}</span>
                            <span>0:20</span>
                          </div>
                        </div>
                      </div>

                      {preview.audioSrc &&
                        <audio
                          ref={(el) => { audioRefs.current[index] = el; }}
                          onTimeUpdate={() => handlePreviewTimeUpdate(index)}
                          onEnded={() => handlePreviewEnded(index)}
                          preload="metadata">

                          <source src={preview.audioSrc} type="audio/mpeg" />
                        </audio>
                      }

                      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-blue-900/20">
                        <p className="text-center text-gray-400 text-[10px] sm:text-xs flex items-center justify-center gap-1.5">
                          <Usb className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-sky-400/70" />
                          Pronto pra baixar e colocar no pendrive.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center mt-5">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={prevPreview}
                  disabled={currentPreview === 0}
                  className={`flex items-center justify-center w-11 h-11 rounded-full bg-blue-900/40 border border-blue-800/50 text-sky-400 active:scale-95 transition-all ${currentPreview === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-800/50 active:bg-blue-700/50'}`}>

                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 px-2">
                  {previews.map((_, index) =>
                    <button
                      key={index}
                      onClick={() => goToPreview(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${index === currentPreview ? 'bg-sky-400 w-6' : 'bg-blue-900/50 w-2.5 hover:bg-blue-700/50'}`} />

                  )}
                </div>
                <button
                  onClick={nextPreview}
                  disabled={currentPreview === previews.length - 1}
                  className={`flex items-center justify-center w-11 h-11 rounded-full bg-blue-900/40 border border-blue-800/50 text-sky-400 active:scale-95 transition-all ${currentPreview === previews.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-800/50 active:bg-blue-700/50'}`}>

                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-gray-500 text-xs mt-3">Arraste para o lado ou toque nas setas</p>
            </div>
          </div>

          <div className="mb-10 md:mb-12">
            <p className="text-center text-gray-400 text-sm mb-5">Estilos inclusos na playlist:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto">
              {["Anos 70", "Anos 80", "Anos 90", "Disco Music", "Pop Classics", "Eurodance"].map((style, index) =>
                <div key={index} className="bg-[#0f172a] border border-blue-900/40 rounded-xl p-3 text-center">
                  <span className="text-white font-semibold text-sm">{style}</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-base md:text-lg mb-5">Curtiu a prévia? Escolha seu acesso logo abaixo.</p>
            <button onClick={scrollToOfertas} className="bg-blue-600 hover:bg-blue-700 text-white font-black text-lg md:text-xl px-10 py-4 rounded-full shadow-xl shadow-blue-500/25 hover:scale-105 active:scale-95 transition-transform">
              VER OPÇÕES DE ACESSO
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#020617]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">COMO <span className="text-sky-400">FUNCIONA:</span></h2>
          <p className="text-gray-400 text-center mb-12">Super simples, qualquer pessoa consegue!</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl font-black">1</div>
              <h3 className="text-xl font-bold mb-2">COMPRE</h3>
              <p className="text-gray-400">Clique no botão e faça o pagamento seguro</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl font-black">2</div>
              <h3 className="text-xl font-bold mb-2">BAIXE</h3>
              <p className="text-gray-400">Receba o link na hora via E-mail e WhatsApp e baixe todas as músicas</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl font-black">3</div>
              <h3 className="text-xl font-bold mb-2">CURTA</h3>
              <p className="text-gray-400">Passe pro pendrive e aproveite no carro!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#020617]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3">QUEM JÁ <span className="text-sky-400">COMPROU:</span></h2>
            <p className="text-gray-400 text-sm md:text-base">Veja o que estão falando da playlist</p>
          </div>
          <div className="relative">
            <div className="bg-[#0f172a] rounded-2xl p-6 md:p-8 border border-blue-900/30 shadow-xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <span key={i} className="text-sky-400 text-xl">★</span>)}
              </div>
              <p className="text-gray-200 text-base md:text-lg mb-6 italic leading-relaxed">"{testimonials[currentTestimonial].text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-white text-base">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].location}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={prevTestimonial} className="w-10 h-10 rounded-full bg-blue-900/30 border border-blue-800/50 flex items-center justify-center text-sky-400">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) =>
                  <button key={index} onClick={() => setCurrentTestimonial(index)} className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentTestimonial ? 'bg-sky-400 w-6' : 'bg-blue-900/50'}`} />
                )}
              </div>
              <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-blue-900/30 border border-blue-800/50 flex items-center justify-center text-sky-400">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">+ de 1.981 pessoas já garantiram o acesso</p>
          <div className="text-center mt-8">
            <button onClick={scrollToOfertas} className="bg-blue-600 hover:bg-blue-700 text-white font-black text-lg px-8 py-4 rounded-full shadow-xl shadow-blue-500/25 hover:scale-105 active:scale-95 transition-transform">
              ESCOLHER MINHA OPÇÃO
            </button>
          </div>
        </div>
      </section>

      <section id="ofertas" className="py-16 px-4 bg-[#020617]">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3">Escolha sua <span className="text-sky-400">opção de acesso</span></h2>
            <p className="text-gray-400 text-base">Libere agora e use no pendrive/carro sem internet.</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#0f172a] rounded-2xl p-6 border border-blue-900/30 shadow-xl">
              <h3 className="text-xl font-black text-white mb-1">Acesso Básico</h3>
              <p className="text-gray-400 text-sm mb-5">Playlist completa +3.000 músicas</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-gray-300 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>3000 músicas flashbacks</span></li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Anos 70, 80, 90 e Clássicos</span></li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Pronto pro pendrive</span></li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Funciona offline (sem internet)</span></li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Sem propaganda</span></li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Acesso imediato após compra</span></li>
              </ul>
              <div className="mb-5">
                <p className="text-gray-500 text-sm line-through mb-1">De R$ 29,90</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-white">R$ 10<span className="text-xl">,90</span></p>
                  <span className="text-sky-500/80 text-xs font-bold uppercase tracking-wider">Pagamento único</span>
                </div>
              </div>
              <a
                href={baseCheckoutUrl}
                onClick={() => handleTrackCheckout(10.90)}
                suppressHydrationWarning={true}
                className="block w-full bg-[#1e293b] text-white font-bold text-center py-4 rounded-full border border-blue-900/40 hover:bg-[#334155] active:scale-[0.98] transition-all">

                ESCOLHER ACESSO BÁSICO
              </a>
            </div>

            <div id="oferta-premium" className="relative bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] rounded-2xl p-6 border-2 border-blue-500 shadow-xl shadow-blue-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">MAIS ESCOLHIDA</span>
              </div>
              <h3 className="text-xl font-black text-sky-400 mb-1 mt-2">Acesso Premium</h3>
              <p className="text-gray-300 text-sm mb-5">Sempre atualizado + 350 Vídeos Full HD</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-white text-sm !whitespace-pre-line"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>6000 músicas flashbacks</span></li>
                <li className="flex items-center gap-3 text-white text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Anos 70, 80, 90 e Clássicos</span></li>
                <li className="flex items-center gap-3 text-white text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Pronto pro pendrive</span></li>
                <li className="flex items-center gap-3 text-white text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Funciona offline (sem internet)</span></li>
                <li className="flex items-center gap-3 text-white text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Sem propaganda</span></li>
                <li className="flex items-center gap-3 text-white text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Acesso imediato após compra</span></li>
                <li className="flex items-center gap-3 text-white text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>Atualizações semanais (músicas novas)</span></li>
                <li className="flex items-center gap-3 text-white text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span>350 vídeos flashbacks Full HD</span></li>
              </ul>
              <div className="mb-6">
                <p className="text-[#64748B] text-xs line-through mb-0.5">De R$ 49,90</p>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2 leading-none">
                    <p className="text-5xl md:text-6xl font-black text-[#38BDF8] tracking-tight">R$ 19<span className="text-2xl ml-1">,90</span></p>
                    <span className="text-[#CBD5E1] text-[10px] font-medium lowercase italic">pagamento único</span>
                  </div>
                  <p className="text-[#CBD5E1] text-[11px] mt-1 ml-1 opacity-80">Acesso vitalício por R$ 19,90</p>
                </div>
              </div>
              <a
                href={premiumCheckoutUrl}
                onClick={() => handleTrackCheckout(19.90)}
                suppressHydrationWarning={true}
                className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-center py-5 md:py-6 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-95">
                QUERO O PREMIUM
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#020617]">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-3">DÚVIDAS <span className="text-sky-400">FREQUENTES</span></h2>
          <div className="space-y-3">
            {faq.map((item, index) =>
              <div key={index} className="bg-[#0f172a] rounded-xl border border-blue-900/20 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="text-white font-semibold text-sm pr-4">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-sky-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && <p className="text-gray-400 text-sm px-4 pb-4">{item.answer}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-10 px-4 bg-[#020617] border-t border-blue-600/15">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-6 mb-2">
            <span className="flex items-center gap-1.5 text-[#94A3B8] text-[11px] font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-green-500" /> Pagamento seguro
            </span>
            <span className="flex items-center gap-1.5 text-[#94A3B8] text-[11px] font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-yellow-500" /> Acesso imediato
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-[#38BDF8] font-black text-xl tracking-tight">PACKLAB®</h3>
            <p className="text-[#E5E7EB] text-sm font-medium">Coleções digitais organizadas • Acesso imediato</p>
          </div>

          <div className="space-y-1">
            <p className="text-[#94A3B8] text-[14px]">Suporte humanizado: WhatsApp + E-mail</p>
            <p className="text-[#94A3B8] text-[13px]">© 2026 PACKLAB. Todos os direitos reservados.</p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[#94A3B8] text-[13px] border-t border-blue-900/10">
            <span className="hover:text-[#38BDF8] cursor-pointer transition-colors">Termos de uso</span>
            <span className="hover:text-[#38BDF8] cursor-pointer transition-colors">Política de privacidade</span>
            <span className="hover:text-[#38BDF8] cursor-pointer transition-colors">Contato</span>
          </div>
        </div>
      </footer>
    </div>);

}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center text-sky-400 font-bold">Carregando...</div>}>
      <HomeContent />
    </Suspense>);

}