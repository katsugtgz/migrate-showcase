/* eslint-disable react/no-unknown-property */
"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
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
  const { anchorRef, cardRef, chainRefs, isDragging, onPointerDown, onPointerUp } =
    useCardPhysics(physicsHandleRef);

  return (
    <>
      <RigidBody ref={anchorRef} type="fixed" position={[0, 3, 0]} />
      <RigidBody
        ref={chainRefs[0]}
        type="dynamic"
        position={[0, 2.2, 0]}
        linearDamping={0.9}
        angularDamping={0.9}
      >
        <mesh visible={false}>
          <sphereGeometry args={[0.01]} />
        </mesh>
      </RigidBody>
      <RigidBody
        ref={chainRefs[1]}
        type="dynamic"
        position={[0, 1.4, 0]}
        linearDamping={0.9}
        angularDamping={0.9}
      >
        <mesh visible={false}>
          <sphereGeometry args={[0.01]} />
        </mesh>
      </RigidBody>
      <RigidBody
        ref={chainRefs[2]}
        type="dynamic"
        position={[0, 0.6, 0]}
        linearDamping={0.9}
        angularDamping={0.9}
      >
        <mesh visible={false}>
          <sphereGeometry args={[0.01]} />
        </mesh>
      </RigidBody>
      <IDCardModel
        cardRef={cardRef}
        isDragging={isDragging}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        isDark={isDark}
      />
      <IDCardLanyard
        anchorRef={anchorRef}
        chainRefs={chainRefs}
        cardRef={cardRef}
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
      aria-label="Interactive 3D ID card — use rotation buttons to interact"
    >
      <Canvas
        camera={{ position: [0, 0.8, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <IDCardSceneInner
              isMobile={isMobile}
              isDark={isDark}
              physicsHandleRef={handleRef}
            />
          </Physics>
        </Suspense>
      </Canvas>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => handleRef.current?.resetRotation()}
          aria-label="Reset card position"
          className="rounded-full bg-black/10 dark:bg-white/10 text-[#333] dark:text-[var(--fg)] px-4 py-1.5 text-xs font-body backdrop-blur-sm hover:bg-black/20 transition-colors opacity-50 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
