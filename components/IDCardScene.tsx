"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useCardPhysics, type CardPhysicsHandle } from "@/hooks/useCardPhysics";
import { IDCardModel } from "@/components/IDCardModel";
import IDCardLanyard from "@/components/IDCardLanyard";

interface IDCardSceneProps {
  isMobile?: boolean;
  isDark?: boolean;
}

function IDCardSceneInner({
  isMobile = false,
  isDark = false,
  physicsHandleRef,
}: IDCardSceneProps & { physicsHandleRef: React.Ref<CardPhysicsHandle> }) {
  const {
    anchorRef,
    cardRef,
    chainRef1,
    chainRef2,
    chainRef3,
    isDragging,
    onPointerDown,
    onPointerUp,
  } =
    useCardPhysics(physicsHandleRef);

  return (
    <>
      <RigidBody ref={anchorRef} type="fixed" position={[0, 3, 0]} />
      <RigidBody
        ref={chainRef1}
        type="dynamic"
        position={[0.42, 2.05, 0]}
        colliders={false}
        canSleep
        linearDamping={4}
        angularDamping={4}
      />
      <RigidBody
        ref={chainRef2}
        type="dynamic"
        position={[0.15, 1.2, 0]}
        colliders={false}
        canSleep
        linearDamping={4}
        angularDamping={4}
      />
      <RigidBody
        ref={chainRef3}
        type="dynamic"
        position={[-0.18, 0.45, 0]}
        colliders={false}
        canSleep
        linearDamping={4}
        angularDamping={4}
      />
      <IDCardModel
        cardRef={cardRef}
        isDragging={isDragging}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        isDark={isDark}
      />
      <IDCardLanyard
        anchorRef={anchorRef}
        chainRef1={chainRef1}
        chainRef2={chainRef2}
        chainRef3={chainRef3}
        isMobile={isMobile}
        isDark={isDark}
      />
    </>
  );
}

export function IDCardScene({ isMobile = false, isDark = false }: IDCardSceneProps) {
  const handleRef = useRef<CardPhysicsHandle>(null);

  return (
    <div
      className="relative w-full h-full"
      role="img"
      aria-label="Interactive 3D Spellshand badge"
    >
      <Canvas
        camera={{ position: [0, 0.25, 5.6], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.45} />
        <Suspense fallback={null}>
          <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <IDCardSceneInner
              isMobile={isMobile}
              isDark={isDark}
              physicsHandleRef={handleRef}
            />
          </Physics>
          <Environment resolution={128}>
            <Lightformer intensity={2.2} position={[0, 4, 2]} scale={[8, 2, 1]} />
            <Lightformer intensity={1.6} position={[4, 1, 4]} scale={[3, 5, 1]} />
            <Lightformer intensity={1.4} position={[-4, -1, 3]} scale={[4, 4, 1]} />
            <Lightformer intensity={1.2} position={[0, -3, 5]} scale={[10, 2, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
      <button
        onClick={() => handleRef.current?.resetRotation()}
        aria-label="Reset Spellshand badge position"
        className="sr-only focus:not-sr-only focus:absolute focus:bottom-6 focus:left-1/2 focus:z-20 focus:-translate-x-1/2 focus:rounded-full focus:bg-black/80 focus:px-4 focus:py-2 focus:text-xs focus:font-body focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]"
      >
        Reset badge
      </button>
    </div>
  );
}
