import { useEffect, useState, useRef } from 'react';

export default function PeekingCat() {
    const [offsetY, setOffsetY] = useState(100);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [glowIntensity, setGlowIntensity] = useState(5);
    const [bubbleText, setBubbleText] = useState("");

    const fullText = "Who's peeking? 👀";
    const leftPupilRef = useRef<SVGCircleElement>(null);
    const rightPupilRef = useRef<SVGCircleElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Typewriter Effect
    useEffect(() => {
        if (offsetY === 0) {
            let i = 0;
            const timer = setInterval(() => {
                setBubbleText(fullText.slice(0, i + 1));
                i++;
                if (i >= fullText.length) clearInterval(timer);
            }, 100);
            return () => clearInterval(timer);
        } else {
            setBubbleText("");
        }
    }, [offsetY]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Peek Logic
            setOffsetY(0);
            if (timeoutId) clearTimeout(timeoutId);
            const newTimeoutId = setTimeout(() => setOffsetY(100), 3000);
            setTimeoutId(newTimeoutId);

            if (!containerRef.current) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            const centerX = containerRect.left + containerRect.width / 2;
            const centerY = containerRect.top + containerRect.height / 2;

            // Proximity Glow Logic
            const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
            // Max glow 30px when close (<100px), Min glow 5px when far
            const intensity = Math.max(5, 30 - Math.max(0, dist - 50) / 10);
            setGlowIntensity(intensity);

            updatePupil(e.clientX, e.clientY, leftPupilRef.current, 75, 110, containerRect);
            updatePupil(e.clientX, e.clientY, rightPupilRef.current, 125, 110, containerRect);
        };

        const updatePupil = (mouseX: number, mouseY: number, pupilNode: SVGCircleElement | null, eyeCx: number, eyeCy: number, containerRect: DOMRect) => {
            if (!pupilNode) return;
            const scaleX = containerRect.width / 200;
            const scaleY = containerRect.height / 200;
            const eyeScreenX = containerRect.left + (eyeCx * scaleX);
            const eyeScreenY = containerRect.top + (eyeCy * scaleY);
            const dx = mouseX - eyeScreenX;
            const dy = mouseY - eyeScreenY;
            const distance = Math.hypot(dx, dy);

            const maxRadiusSVG = 12;
            const maxRadiusPx = maxRadiusSVG * Math.min(scaleX, scaleY);

            let moveX = dx;
            let moveY = dy;

            if (distance > maxRadiusPx) {
                const ratio = maxRadiusPx / distance;
                moveX = dx * ratio;
                moveY = dy * ratio;
            }
            pupilNode.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    return (
        <div ref={containerRef} className="w-full h-full relative flex items-end justify-center bg-transparent group">

            {/* Speech Bubble - Floats outside to the right */}
            <div
                className={`absolute -top-12 -right-32 bg-black/60 backdrop-blur-md border border-[#87C9C1] text-[#87C9C1] px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-500 transform ${offsetY === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ boxShadow: '0 0 15px rgba(135, 201, 193, 0.2)' }}
            >
                {bubbleText}
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-black/60 border-l border-b border-[#87C9C1] transform rotate-45" />
            </div>

            {/* Cat Container with Overflow Hidden for sliding */}
            <div className="w-full h-full overflow-hidden flex items-end justify-center">
                <div
                    className="w-full h-full transition-transform duration-500 ease-out"
                    style={{
                        transform: `translateY(${offsetY}%)`,
                        filter: `drop-shadow(0 0 ${glowIntensity}px #87C9C1)`
                    }}
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                        {/* BODY - Sharper curve for the head */}
                        <path
                            d="M 40 120 Q 30 80 50 60 L 70 20 L 90 60 L 110 60 L 130 20 L 150 60 Q 170 80 160 120 L 160 280 Q 100 300 40 280 Z"
                            fill="#000000"
                        />
                        {/* Left ear inner */}
                        <path
                            d="M 70 30 L 80 60 L 65 55 Z"
                            fill="#FFD700"
                        />

                        {/* Right ear inner */}
                        <path
                            d="M 130 30 L 120 60 L 135 55 Z"
                            fill="#FFD700"
                        />

                        {/* Left Whiskers */}
                        <line x1="35" y1="130" x2="5" y2="125" stroke="#000000" strokeWidth="1.5" />
                        <line x1="35" y1="140" x2="5" y2="140" stroke="#000000" strokeWidth="1.5" />
                        <line x1="35" y1="150" x2="5" y2="155" stroke="#000000" strokeWidth="1.5" />

                        {/* Right Whiskers - Moved out to be visible */}
                        <line x1="155" y1="130" x2="185" y2="125" stroke="#000000" strokeWidth="1.5" />
                        <line x1="155" y1="140" x2="185" y2="140" stroke="#000000" strokeWidth="1.5" />
                        <line x1="155" y1="150" x2="185" y2="155" stroke="#000000" strokeWidth="1.5" />


                        {/* EYES - Close together as seen in 2nd image */}
                        <circle cx="75" cy="110" r="24" fill="white" />
                        <circle cx="125" cy="110" r="24" fill="white" />

                        {/* PUPILS */}
                        <circle ref={leftPupilRef} cx="75" cy="110" r="11" fill="black" />
                        <circle ref={rightPupilRef} cx="125" cy="110" r="11" fill="black" />

                        {/* EYE GLINT */}
                        <circle cx="68" cy="102" r="4" fill="white" />
                        <circle cx="118" cy="102" r="4" fill="white" />

                        {/* NOSE & MOUTH */}
                        <path d="M 94,128 Q 100,122 106,128" fill="white" />
                        <path
                            d="M 100,128 Q 100,140 92,140 M 100,128 Q 100,140 108,140"
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}