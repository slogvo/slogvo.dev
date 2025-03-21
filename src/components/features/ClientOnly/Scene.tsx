'use client';
// Setup: https://r3f.docs.pmnd.rs/getting-started/examples
import { JSX, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  useGLTF,
  Stage,
  Grid,
  OrbitControls,
  Environment,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from '@react-three/postprocessing';
import { easing } from 'maath';

export default function ClientScene() {
  return (
    <Canvas flat shadows camera={{ position: [-15, 0, 10], fov: 25 }}>
      <fog attach="fog" args={['black', 15, 22.5]} />
      <Stage
        intensity={0.5}
        environment="city"
        shadows={{ type: 'accumulative', bias: -0.001, intensity: Math.PI }}
        adjustCamera={false}
      >
        <Kamdo rotation={[0, Math.PI, 0]} />
      </Stage>
      <Grid
        renderOrder={-1}
        position={[0, -1.85, 0]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={0.6}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor="#d7bbf9"
        fadeDistance={30}
      />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.05}
        enableZoom={false}
        makeDefault
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={2} mipmapBlur />
        <ToneMapping />
      </EffectComposer>
      <Environment background preset="sunset" blur={0.8} />
    </Canvas>
  );
}

type GLTFResult = {
  nodes: {
    body001: THREE.Mesh;
    head001: THREE.Mesh;
    stripe001: THREE.Mesh;
  };
  materials: {
    Body: THREE.MeshStandardMaterial;
    Head: THREE.MeshStandardMaterial;
  };
};

function Kamdo(props: JSX.IntrinsicElements['group']) {
  const head = useRef<THREE.Group>(null);
  const stripe = useRef<THREE.MeshBasicMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const { nodes, materials } = useGLTF(
    '/s2wt_kamdo_industrial_divinities-transformed.glb',
  ) as unknown as GLTFResult;
  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2;
    stripe.current!.color.setRGB(2 + t * 20, 2, 20 + t * 50);
    if (head.current) {
      easing.dampE(
        head.current.rotation,
        [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0],
        0.4,
        delta,
      );
    }
    if (light.current) {
      light.current.intensity = 1 + t * 4;
    }
  });
  return (
    <group {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.body001.geometry}
        material={materials.Body}
      />
      <group ref={head}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.head001.geometry}
          material={materials.Head}
        />
        <mesh castShadow receiveShadow geometry={nodes.stripe001.geometry}>
          <meshBasicMaterial ref={stripe} toneMapped={false} />
          <pointLight
            ref={light}
            intensity={1}
            color={[10, 2, 5]}
            distance={2.5}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/s2wt_kamdo_industrial_divinities-transformed.glb');
