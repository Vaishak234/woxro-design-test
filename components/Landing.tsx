'use client';
import Image from 'next/image';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { cubesData, interpolate, mobileCubesData } from '@/constants';

gsap.registerPlugin(ScrollTrigger);



export default function Landing() {
    const stickySectionRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const cubesRefs = useRef<(HTMLDivElement | null)[]>([]);
    const headerOneRef = useRef<HTMLDivElement>(null);
    const headerTwoRef = useRef<HTMLDivElement>(null);
    const [currentCubesData, setCurrentCubesData] = useState<Partial<typeof cubesData>>(cubesData);

    useLayoutEffect(() => {
        const handleResize = () => {
            setCurrentCubesData(window.innerWidth < 900 ? mobileCubesData : cubesData);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [currentCubesData]);



    useLayoutEffect(() => {
        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 600);
        });
        gsap.ticker.lagSmoothing(0);

        ScrollTrigger.create({
            id: "stickyTrigger",
            trigger: stickySectionRef.current,
            start: 'top top',
            end: () => `+=${stickySectionRef.current?.offsetHeight}px`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                // Update the logo element
                if (logoRef.current) {
                    const initialProgress = Math.min(self.progress * 20, 1);
                    logoRef.current.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;
                    const logoOpacityProgress = self.progress >= 0.03 ? Math.min((self.progress - 0.03) * 20, 1) : 0;
                    logoRef.current.style.opacity = `${1 - logoOpacityProgress}`;
                }

                // Update headerOne element: scale, blur, and fade out
                if (headerOneRef.current) {
                    const fadeStart = 0.08;
                    const fadeDuration = 0.7;
                    let headerOpacity = 1;
                    if (self.progress > fadeStart) {
                        headerOpacity = Math.max(1 - (self.progress - fadeStart) / fadeDuration, 0);
                    }
                    const scaleFactor = interpolate(1, 2, 1 - headerOpacity);
                    const blurValue = interpolate(0, 20, 1 - headerOpacity);
                    headerOneRef.current.style.opacity = `${headerOpacity}`;
                    headerOneRef.current.style.transform = `translate(-50%,-50%) scale(${scaleFactor})`;
                    headerOneRef.current.style.filter = `blur(${blurValue}px)`;
                }

                // Update headerTwo element: fade in on scroll
                if (headerTwoRef.current) {
                    let headerTwoOpacity = 0;
                    if (self.progress <= 0.6) {
                        headerTwoOpacity = 0;
                    } else if (self.progress > 0.6 && self.progress < 0.8) {
                        headerTwoOpacity = (self.progress - 0.6) / 0.2;
                    } else {
                        headerTwoOpacity = 1;
                    }
                    headerTwoRef.current.style.opacity = `${headerTwoOpacity}`;
                }

                // Update cubes (existing logic)
                const firstPhaseProgress = Math.min(self.progress * 2, 1);
                const secondPhaseProgress = self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0;

                Object.entries(currentCubesData).forEach(([cubeClass, data]) => {
                    const cube = document.querySelector(`.${cubeClass}`) as HTMLElement;
                    if (!cube) return;
                    const { initial, final } = data;
                    const currentTop = interpolate(initial.top, final.top, firstPhaseProgress);
                    const currentLeft = interpolate(initial.left, final.left, firstPhaseProgress);
                    const currentRotateX = interpolate(initial.rotateX, final.rotateX, firstPhaseProgress);
                    const currentRotateY = interpolate(initial.rotateY, final.rotateY, firstPhaseProgress);
                    const currentRotateZ = interpolate(initial.rotateZ, final.rotateZ, firstPhaseProgress);
                    const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);
                    let additionalRotation = 0;
                    if (cubeClass === 'cube-2') {
                        additionalRotation = interpolate(0, 180, secondPhaseProgress);
                    }
                    if (cubeClass === 'cube-4') {
                        additionalRotation = interpolate(0, -180, secondPhaseProgress);
                    }
                    cube.style.top = `${currentTop}%`;
                    cube.style.left = `${currentLeft}%`;
                    cube.style.transform = `
          translate3d(-50%,-50%,${currentZ}px)
          rotateX(${currentRotateX}deg)
          rotateY(${currentRotateY + additionalRotation}deg)
          rotateZ(${currentRotateZ}deg)
        `;
                    const cubesOpacity = self.progress >= 0.01 ? 1 : 0;
                    cube.style.opacity = `${cubesOpacity}`;
                });
            }
        });

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [currentCubesData]);



    return (
        <div className="">
            <section className="sticky" ref={stickySectionRef}>
                <div className=" absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6 z-20" ref={logoRef}>
                    {Array.from({ length: 3 }).map((_, rowIndex) => (
                        <div className="cols" key={rowIndex}>
                            {Array.from({ length: 2 }).map((_, colIndex) => {
                                const blockIndex = rowIndex * 2 + colIndex + 1;
                                return <div className={`block block-${blockIndex}`} key={blockIndex}></div>;
                            })}
                        </div>
                    ))}
                </div>

                <div className="cubes">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className={`cube cube-${index + 1}`} ref={(el) => { cubesRefs.current[index] = el; }} key={index}>
                            <div className="front bg-red-700 z-20">
                                <Image src={`/asset/cube-${index + 1}.jpg`} alt="Front" layout="fill" objectFit="cover" />
                            </div>
                            <div className="back bg-green-700 z-20">
                                <Image src={`/asset/cube-${index + 1}.jpg`} alt="Back" layout="fill" objectFit="cover" />
                            </div>
                            <div className="left bg-blue-700 z-20">
                                <Image src={`/asset/cube-${index + 1}.jpg`} alt="Left" layout="fill" objectFit="cover" />
                            </div>
                            <div className="right bg-yellow-700 z-20">
                                <Image src={`/asset/cube-${index + 1}.jpg`} alt="Right" layout="fill" objectFit="cover" />
                            </div>
                            <div className="top bg-purple-700 z-20">
                                <Image src={`/asset/cube-${index + 1}.jpg`} alt="Top" layout="fill" objectFit="cover" />
                            </div>
                            <div className="bottom bg-pink-700 z-20">
                                <Image src={`/asset/cube-${index + 1}.jpg`} alt="Bottom" layout="fill" objectFit="cover" />
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="w-full px-4 lg:w-3/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center origin-center text-[20px] lg:mt-0 lg:text-[50px]" ref={headerOneRef}>
                        <h1>The first media company crafted for the digital first generation</h1>
                    </div>

                    <div className="mt-10 w-[80%] lg:w-[30%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-center text-center opacity-0 " ref={headerTwoRef}>
                        <h2 className='text-lg lg:text-2xl font-bold mb-3'>Where innovations meets precisions.</h2>
                        <p className='text-md lg:text-lg lg:leading-[30px] '>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, nam? Incidunt ad praesentium temporibus ipsum rem perspiciatis ut commodi soluta odio nisi quos sed excepturi voluptate itaque, impedit magnam numquam.
                        </p>
                    </div>
                </div>
            </section>


        </div>
    );
}
