import { useEffect, useRef } from 'react';

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particleColor = "#87C9C1"; // Theme color

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; size: number; life: number; }[] = [];
        let mouse = { x: -100, y: -100 };

        // Handle Resize
        const resizeCanvas = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Handle Mouse Move - RELATIVE to the canvas/container
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;

            // Spawn particles on move
            for (let i = 0; i < 2; i++) {
                particles.push({
                    x: mouse.x,
                    y: mouse.y,
                    size: Math.random() * 3 + 1, // Random size 1-4px
                    life: 1.0 // Opacity/Life starts at 1
                });
            }
        };

        // We attach listener to WINDOW because mouse might move fast, 
        // but we only care if it's over the canvas? 
        // User wants it "limit till the left part". 
        // If we attach to window, we need to check if we are inside the rect or clamp geometry.
        // Easier: attach 'mousemove' to the container/canvas itself so it only triggers when over it.
        // However, if we move fast out, the trail might stop abruptly.
        // Better: Window listener, but check overlap or just map coords relative to canvas.
        // If coords are outside canvas, we just don't spawn or spawn clipped?
        // Let's attach to the PARENT (the main container) via the canvas reference safely.

        // Actually, attaching to window is standard for trails, but we only spawn if inside bounds.
        // Or simpler: Attach to canvas parent element?
        // Let's use window for smoothness, but calculate relative position.

        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.globalAlpha = p.life;
                ctx.fill();

                // Physics
                p.life -= 0.02; // Fade out speed
                p.size *= 0.95; // Shrink speed
                // p.y += 0.5; // Optional gravity

                if (p.life <= 0 || p.size <= 0.2) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
