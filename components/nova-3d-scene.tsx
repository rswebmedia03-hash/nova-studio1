'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

function SceneContent() {
  const group = useRef<THREE.Group>(null)
  const rings = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  const [reducedMotion, setReducedMotion] = useState(false)
  const target = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useFrame((state, delta) => {
    if (!group.current || !rings.current) return
    const motion = reducedMotion ? 0 : 1
    target.set(pointer.x * 0.18 * motion, pointer.y * 0.1 * motion, 0)
    group.current.position.lerp(target, 0.035)
    group.current.rotation.y += delta * 0.055 * motion
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.08 * motion, 0.035)
    rings.current.rotation.z -= delta * 0.08 * motion
    rings.current.rotation.x = THREE.MathUtils.lerp(rings.current.rotation.x, -0.48 + pointer.y * 0.08 * motion, 0.035)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * 0.12 * motion, 0.025)
  })

  return (
    <group ref={group}>
      <mesh position={[0.05, 0.1, 0]} castShadow>
        <sphereGeometry args={[1.42, 48, 48]} />
        <meshPhysicalMaterial color="#7f5cff" roughness={0.16} metalness={0.24} clearcoat={1} clearcoatRoughness={0.12} iridescence={0.35} />
      </mesh>
      <mesh position={[0.46, 0.52, 0.98]} scale={0.18}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color="#d8f3ff" transmission={0.72} roughness={0.08} thickness={0.45} clearcoat={1} />
      </mesh>
      <mesh position={[-1.55, -0.82, 0.25]} scale={0.38}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color="#a994ff" transmission={0.5} roughness={0.12} thickness={0.3} />
      </mesh>
      <group ref={rings} rotation={[-0.48, 0.1, 0.2]}>
        <mesh rotation={[0.05, 0.18, 0]}>
          <torusGeometry args={[1.78, 0.045, 16, 96]} />
          <meshStandardMaterial color="#e8e1ff" metalness={0.95} roughness={0.18} emissive="#4d2ba8" emissiveIntensity={0.2} />
        </mesh>
        <mesh rotation={[0.8, 0.25, 0.5]} scale={1.26}>
          <torusGeometry args={[1.62, 0.028, 16, 96]} />
          <meshStandardMaterial color="#91aaff" metalness={0.9} roughness={0.2} emissive="#273d9b" emissiveIntensity={0.22} />
        </mesh>
        <mesh rotation={[1.15, -0.4, -0.25]} scale={0.72}>
          <torusGeometry args={[1.65, 0.025, 12, 72]} />
          <meshStandardMaterial color="#cdbdff" metalness={0.92} roughness={0.16} />
        </mesh>
      </group>
    </group>
  )
}

class SceneErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? <div className="scene-fallback" aria-hidden="true"><div className="fallback-orb" /></div> : this.props.children }
}

export function Nova3DScene() {
  return (
    <SceneErrorBoundary>
      <Canvas className="nova-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 6.3], fov: 42 }} gl={{ antialias: true, powerPreference: 'high-performance' }} fallback={<div className="scene-fallback" aria-hidden="true"><div className="fallback-orb" /></div>}>
        <color attach="background" args={['#111113']} />
        <ambientLight intensity={0.7} color="#9f8dff" />
        <directionalLight position={[3, 4, 5]} intensity={3.4} color="#d8d1ff" />
        <pointLight position={[-3, -2, 2]} intensity={12} distance={8} color="#6040ff" />
        <pointLight position={[3, 1, -2]} intensity={9} distance={7} color="#4b9dff" />
        <SceneContent />
      </Canvas>
    </SceneErrorBoundary>
  )
}
