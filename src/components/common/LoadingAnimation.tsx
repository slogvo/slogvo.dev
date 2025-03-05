'use client';
export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden perspective">
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 grid grid-cols-8 gap-4 transform-style-3d animate-[grid-fade_4s_ease-in-out_infinite]">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="h-32 border border-cyan-500/20 rounded-lg backdrop-blur-sm transform-style-3d animate-[cell-pulse_2s_ease-in-out_infinite]"
                style={{
                  animationDelay: `${(i % 8) * 0.1}s`,
                  transform: `translateZ(${Math.sin(i) * 20}px)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Cube rotate */}
        <div className="relative w-32 h-32 animate-[float_4s_ease-in-out_infinite]">
          <div className="absolute w-full h-full transform-style-3d animate-[spin_4s_linear_infinite]">
            {/* Front */}
            <div className="absolute inset-0 border-2 border-cyan-500 bg-cyan-500/10 backdrop-blur-sm transform translate-z-16" />
            {/* Back */}
            <div className="absolute inset-0 border-2 border-cyan-500 bg-cyan-500/10 backdrop-blur-sm transform -translate-z-16" />
            {/* Left */}
            <div className="absolute inset-0 border-2 border-cyan-500 bg-cyan-500/10 backdrop-blur-sm transform rotate-y-90 translate-x-16" />
            {/* Right */}
            <div className="absolute inset-0 border-2 border-cyan-500 bg-cyan-500/10 backdrop-blur-sm transform rotate-y-90 -translate-x-16" />
            {/* Top */}
            <div className="absolute inset-0 border-2 border-cyan-500 bg-cyan-500/10 backdrop-blur-sm transform rotate-x-90 translate-y-16" />
            {/* Bottom */}
            <div className="absolute inset-0 border-2 border-cyan-500 bg-cyan-500/10 backdrop-blur-sm transform rotate-x-90 -translate-y-16" />
          </div>
        </div>

        {/* Text loading with glitch effect */}
        <div className="absolute bottom-1/4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 animate-[text-glow_2s_ease-in-out_infinite]">
            Loading
            <span className="animate-[dots_1.4s_ease-in-out_infinite]">
              ...
            </span>
          </h2>
          <p className="text-cyan-400/80 animate-[fade_2s_ease-in-out_infinite]">
            Preparing your experience
          </p>
        </div>
      </div>

      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .translate-z-16 {
          transform: translateZ(16px);
        }
        .-translate-z-16 {
          transform: translateZ(-16px);
        }
        .rotate-y-90 {
          transform: rotateY(90deg);
        }
        .rotate-x-90 {
          transform: rotateX(90deg);
        }
        @keyframes spin {
          from {
            transform: rotateX(0) rotateY(0);
          }
          to {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes grid-fade {
          0%,
          100% {
            opacity: 0.3;
            transform: translateZ(-50px);
          }
          50% {
            opacity: 0.7;
            transform: translateZ(0);
          }
        }
        @keyframes cell-pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes text-glow {
          0%,
          100% {
            text-shadow: 0 0 20px cyan;
          }
          50% {
            text-shadow: 0 0 40px cyan;
          }
        }
        @keyframes dots {
          0%,
          20% {
            content: '.';
          }
          40% {
            content: '..';
          }
          60%,
          100% {
            content: '...';
          }
        }
        @keyframes fade {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
