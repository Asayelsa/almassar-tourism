'use client'

import { motion } from 'framer-motion'

/**
 * Abstract network graphic — a wireframe globe with pulsing connection
 * nodes. Deliberately not a literal geographic map: no country or city is
 * named or implied, only the idea of a distributed partner network.
 */
const nodes = [
  { x: 120, y: 90 },
  { x: 300, y: 60 },
  { x: 430, y: 130 },
  { x: 90, y: 230 },
  { x: 260, y: 260 },
  { x: 400, y: 240 },
  { x: 220, y: 170 },
]

const hub = { x: 220, y: 170 }

export function WorldMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={className} fill="none" aria-hidden="true">
      <ellipse cx="260" cy="170" rx="230" ry="150" stroke="currentColor" strokeOpacity="0.14" />
      <ellipse cx="260" cy="170" rx="160" ry="150" stroke="currentColor" strokeOpacity="0.1" />
      <ellipse cx="260" cy="170" rx="90" ry="150" stroke="currentColor" strokeOpacity="0.1" />
      <path d="M30 170H490" stroke="currentColor" strokeOpacity="0.1" />
      <path d="M40 100H480" stroke="currentColor" strokeOpacity="0.07" />
      <path d="M40 240H480" stroke="currentColor" strokeOpacity="0.07" />

      {nodes.map((node, i) => (
        <path
          key={`line-${i}`}
          d={`M${hub.x} ${hub.y} Q ${(hub.x + node.x) / 2} ${hub.y - 40} ${node.x} ${node.y}`}
          stroke="#0E6B70"
          strokeOpacity="0.4"
          strokeWidth="1"
          fill="none"
        />
      ))}

      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="10"
            fill="#D6B77C"
            opacity={0.12}
            animate={{ scale: [1, 1.8, 1], opacity: [0.18, 0, 0.18] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          />
          <circle cx={node.x} cy={node.y} r="3.5" fill="#D6B77C" />
        </g>
      ))}

      <circle cx={hub.x} cy={hub.y} r="5" fill="#F5F1E8" />
    </svg>
  )
}
