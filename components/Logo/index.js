import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'

export default function Logo({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/images/RB_Maquillaje_3-transformed.glb')

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.position.y = Math.sin(t) * 0.2;
    group.current.rotation.y = Math.sin(t / 1.5) / 15
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <motion.mesh initial={{scale: 0}} animate={{scale: 1}}
      transition={{duration: 0.5, type: 'spring', stiffness: 200, damping: 20}}
      geometry={nodes.BezierCurve004.geometry} material={materials['Material.001']} rotation={[0, -0.2, 0]} position={[-0.3, -0.2, 1]} />
    </group>
  )
}

useGLTF.preload('/images/RB_Maquillaje_3-transformed.glb')