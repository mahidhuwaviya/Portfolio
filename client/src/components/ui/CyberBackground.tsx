import { useEffect, useRef } from 'react';

export default function CyberBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        let mouse = { x: width / 2, y: height / 2 };

        // --- STARS ---
        const starCount = 150;
        const stars: { x: number; y: number; size: number; speed: number }[] = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5,
                speed: Math.random() * 0.2 + 0.1
            });
        }

        // --- CODE RAIN ---
        // Columns for matrix effect
        const fontSize = 14;
        const columns = Math.ceil(width / fontSize);
        // drops[i] stores the current y-coordinate (row index) for column i
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start at random negative offsets
        }
        const chars = "XYZ010101<>[]{}"; // Cyber characters

        let resizeTimeout: NodeJS.Timeout;

        const handleResize = () => {
            // Debounce or just reset immediately
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-init drops if width changes significantly or just extend
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize(); // Init size

        const render = () => {
            // Fade out previous frame for trail effect (optional, or just clear)
            // We want clear background for "Cyber" look, usually solid dark.
            // But user wants "glow following cursor".
            // Let's clear with the Theme Background Color.
            ctx.fillStyle = "#0F0D0D";
            ctx.fillRect(0, 0, width, height);

            // --- 1. MOUSE RADIAL GRADIENT ---
            // "Subtle teal/cyan glow should follow the cursor"
            const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400);
            gradient.addColorStop(0, "rgba(135, 201, 193, 0.08)"); // Center cyan, very low opacity
            gradient.addColorStop(1, "rgba(15, 13, 13, 0)"); // Fade to transparent
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // --- 2. STARS (Subtle dust/particles) ---
            ctx.fillStyle = "rgba(135, 201, 193, 0.4)"; // Dim cyan/white
            for (const star of stars) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Move stars (Parallax / Drift)
                star.y -= star.speed;
                if (star.y < 0) star.y = height;
            }

            // --- 3. CODE RAIN ---
            ctx.fillStyle = "rgba(135, 201, 193, 0.05)"; // Very low opacity (5-10%)
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Reset drop to top randomly after it has crossed screen
                // with a randomness factor to scatter the drops
                if (y > height && Math.random() > 0.985) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i] += 0.5; // Slow speed
            }

            requestAnimationFrame(render);
        };

        const animId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
