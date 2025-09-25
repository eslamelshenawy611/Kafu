'use client'

import { motion } from 'framer-motion';

export default function WaveDivider({ flipTop = false, flipBottom = false }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '200px' }}>
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: '#2A7B9B',
          background: 'linear-gradient(90deg, rgba(42, 123, 155, 0.91) 0%, rgba(51, 24, 4, 1) 50%, rgba(21, 12, 2, 1) 100%)'
        }}
      />

      {/* Top Wave */}
      <div className={`custom-shape-divider-top ${flipTop ? 'rotate-180' : ''}`}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill-top"></path>
        </svg>
      </div>

      {/* Bottom Wave */}
      <div className={`custom-shape-divider-bottom ${flipBottom ? 'rotate-180' : ''}`}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill-bottom"></path>
        </svg>
      </div>

      <style jsx>{`
        .custom-shape-divider-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .custom-shape-divider-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
        }

        .custom-shape-divider-top svg,
        .custom-shape-divider-bottom svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 80px;
        }

        .shape-fill-top {
          fill: #000000; /* لون القسم العلوي */
        }

        .shape-fill-bottom {
          fill: #FF8C45; /* لون القسم السفلي */
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        @media (max-width: 768px) {
          .custom-shape-divider-top svg,
          .custom-shape-divider-bottom svg {
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
}