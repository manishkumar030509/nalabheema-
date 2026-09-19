import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const dimensions = {
    sm: { box: 'w-10 h-10', text: 'text-base', sub: 'text-[9px]' },
    md: { box: 'w-14 h-14', text: 'text-xl', sub: 'text-[11px]' },
    lg: { box: 'w-20 h-20', text: 'text-2xl', sub: 'text-xs' },
    xl: { box: 'w-28 h-28', text: 'text-3xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* High-fidelity Vector Emblem matching the original Nala Bheema badge */}
      <div className={`relative ${dimensions.box} flex-shrink-0 rounded-full bg-[#12100d] border-2 border-[#f59e0b] p-1 shadow-lg shadow-[#d97706]/20 transition-transform duration-300 hover:scale-105`}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer circle accent */}
          <circle cx="100" cy="100" r="94" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="90" stroke="#f59e0b" strokeWidth="3" />
          
          {/* Chef Character Representation */}
          <g transform="translate(100, 72) scale(0.78)">
            {/* Chef Toque / Hat */}
            <path
              d="M -30 -15 C -45 -35, -20 -60, 0 -60 C 20 -60, 45 -35, 30 -15 C 32 -8, 25 0, 18 0 L -18 0 C -25 0, -32 -8, -30 -15 Z"
              fill="#ffffff"
              stroke="#f59e0b"
              strokeWidth="4"
            />
            {/* Hat Creases */}
            <path d="M -15 -52 C -10 -40, -10 -20, -10 -1" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 0 -58 C 0 -45, 0 -20, 0 -1" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 15 -52 C 10 -40, 10 -20, 10 -1" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            {/* Hat Band */}
            <rect x="-22" y="-2" width="44" height="10" rx="3" fill="#f59e0b" />

            {/* Face */}
            <path
              d="M -22 8 C -22 28, 22 28, 22 8 Z"
              fill="#f59e0b"
            />
            {/* Joyful Eyes & Eyebrow */}
            <path d="M -14 12 Q -9 8, -4 12" stroke="#12100d" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 4 12 Q 9 8, 14 12" stroke="#12100d" strokeWidth="3.5" strokeLinecap="round" />
            {/* Cheerful Nose */}
            <path d="M -2 16 Q 0 20, 3 18" stroke="#12100d" strokeWidth="3" strokeLinecap="round" />
            {/* Royal Mustache */}
            <path
              d="M -16 22 C -8 18, -2 24, 0 21 C 2 24, 8 18, 16 22 C 22 25, 20 28, 15 26 C 9 24, 4 27, 0 24 C -4 27, -9 24, -15 26 C -20 28, -22 25, -16 22 Z"
              fill="#12100d"
            />
            {/* Smile */}
            <path d="M -7 28 Q 0 34, 7 28" stroke="#12100d" strokeWidth="2.5" strokeLinecap="round" />

            {/* Chef Coat Collar */}
            <path d="M -26 36 L -8 46 L 8 46 L 26 36 L 16 54 L -16 54 Z" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
            {/* Coat Buttons */}
            <circle cx="-2" cy="42" r="2.5" fill="#f59e0b" />
            <circle cx="-2" cy="49" r="2.5" fill="#f59e0b" />

            {/* Left Hand holding Cloche Platter */}
            <g transform="translate(36, 28)">
              {/* Steaming Cloche Dome */}
              <path d="M -18 10 C -18 -8, 18 -8, 18 10 Z" fill="#f59e0b" />
              <circle cx="0" cy="-9" r="3.5" fill="#f59e0b" />
              {/* Platter Base */}
              <rect x="-24" y="10" width="48" height="4.5" rx="2" fill="#f59e0b" />
              {/* Rising Steam */}
              <path d="M -6 -14 Q -3 -22, -8 -28" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 0 -15 Q 3 -24, -1 -32" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M 6 -14 Q 9 -22, 5 -28" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* Right Hand making Chef Kiss / OK sign */}
            <g transform="translate(-40, 20)">
              {/* OK Fingers circle */}
              <circle cx="6" cy="4" r="5" stroke="#f59e0b" strokeWidth="3.2" fill="none" />
              {/* Upright three fingers */}
              <path d="M 0 0 L -4 -12 M 4 -3 L 3 -15 M 9 -2 L 10 -13" stroke="#f59e0b" strokeWidth="3.2" strokeLinecap="round" />
            </g>
          </g>

          {/* Banner Text Curves: Nala Bheema */}
          <text
            x="100"
            y="142"
            textAnchor="middle"
            fill="#f59e0b"
            className="font-royal font-bold"
            style={{ fontSize: '18px', letterSpacing: '1px', fontWeight: 800 }}
          >
            NALA BHEEMA
          </text>

          {/* Kitchen Subtitle with flanking rules */}
          <line x1="38" y1="158" x2="68" y2="158" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <text
            x="100"
            y="162"
            textAnchor="middle"
            fill="#ffffff"
            className="font-serif tracking-widest"
            style={{ fontSize: '11px', letterSpacing: '3px', fontWeight: 700 }}
          >
            KITCHEN
          </text>
          <line x1="132" y1="158" x2="162" y2="158" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

          {/* Crossed Spoon and Fork with Curry Leaves */}
          <g transform="translate(100, 180) scale(0.65)">
            {/* Spoon */}
            <line x1="-16" y1="-14" x2="16" y2="14" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="-18" cy="-16" rx="6" ry="8" transform="rotate(-45 -18 -16)" fill="#f59e0b" />
            {/* Fork */}
            <line x1="16" y1="-14" x2="-16" y2="14" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 14 -12 L 20 -18 M 12 -14 L 18 -20 M 16 -10 L 22 -16" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
            {/* Herbal leaves */}
            <path d="M -30 2 C -36 -4, -40 2, -30 6 C -28 4, -28 2, -30 2 Z" fill="#f59e0b" />
            <path d="M 30 2 C 36 -4, 40 2, 30 6 C 28 4, 28 2, 30 2 Z" fill="#f59e0b" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-royal font-bold text-[#f5f1ea] tracking-tight ${dimensions.text} leading-none`}>
            Nala Bheema
          </span>
          <span className={`font-semibold tracking-[0.25em] text-[#d97706] uppercase ${dimensions.sub} mt-0.5`}>
            Restaurant & Kitchen
          </span>
        </div>
      )}
    </div>
  );
};
