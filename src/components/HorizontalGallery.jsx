import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pinWrap = triggerRef.current;
    if (!pinWrap) return;

    // Create the horizontal scrolling animation
    const pin = gsap.to(pinWrap, {
      x: () => -(pinWrap.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.2,
        start: 'center center',
        end: () => `+=${pinWrap.scrollWidth}`,
        invalidateOnRefresh: true,
      }
    });

    // Cleanup triggers on component unmount
    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Set list of gallery files (images and videos) from the Gallery folder
  const mediaItems = [
    '/Gallery/me.png',
    '/Gallery/place4.mp4',
    '/Gallery/me2.png',
    '/Gallery/place.png',
    '/Gallery/place5.mp4',
    '/Gallery/me3.png',
    '/Gallery/place2.png'
  ];

  return (
    <section 
      ref={sectionRef} 
      className="w-full relative overflow-hidden bg-black py-24 z-20"
    >
      <div className="w-full flex flex-col items-center mb-12 px-6">
        <h3 className="text-zinc-500 text-xs font-mono uppercase tracking-[0.25em] mb-3">Portfolio Showcase</h3>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white select-none">
          Scroll down for the Gallery
        </h2>
      </div>

      <div className="w-full overflow-hidden">
        <div className="horiz-gallery-wrapper w-full flex flex-nowrap relative">
          <div 
            ref={triggerRef} 
            className="horiz-gallery-strip flex flex-nowrap will-change-transform relative pl-12 pr-[15vw]"
          >
            {mediaItems.map((src, idx) => {
              const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');
              return (
                <div 
                  key={idx} 
                  className="project-wrap w-[75vw] md:w-[33vw] px-4 md:px-6 flex-shrink-0 box-content"
                >
                  <div className="overflow-hidden rounded-2xl md:rounded-[1.5rem] border border-zinc-800/80 shadow-2xl relative">
                    {isVideo ? (
                      <video
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full aspect-square object-cover select-none"
                      />
                    ) : (
                      <img 
                        src={src} 
                        alt={`Showcase item ${idx + 1}`} 
                        className="w-full aspect-square object-cover select-none" 
                        draggable={false}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
