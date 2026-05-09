/* eslint-disable react/no-unknown-property */
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useCardPhysics } from "@/hooks/useCardPhysics";
import { IDCardModel } from "@/components/IDCardModel";
import IDCardLanyard from "@/components/IDCardLanyard";

function IDCardSceneInner() {
  const { anchorRef, cardRef, chainRefs, isDragging, onPointerDown, onPointerUp } =
    useCardPhysics();

  return (
    <>
      <RigidBody ref={anchorRef} type="fixed" position={[0, 3, 0]} />
      <RigidBody ref={chainRefs[0]} type="dynamic" position={[0, 2.2, 0]}>
        <mesh visible={false}>
          <sphereGeometry args={[0.01]} />
        </mesh>
      </RigidBody>
      <RigidBody ref={chainRefs[1]} type="dynamic" position={[0, 1.4, 0]}>
        <mesh visible={false}>
          <sphereGeometry args={[0.01]} />
        </mesh>
      </RigidBody>
      <RigidBody ref={chainRefs[2]} type="dynamic" position={[0, 0.6, 0]}>
        <mesh visible={false}>
          <sphereGeometry args={[0.01]} />
        </mesh>
      </RigidBody>
      <IDCardModel
        cardRef={cardRef}
        isDragging={isDragging}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      />
      <IDCardLanyard anchorRef={anchorRef} chainRefs={chainRefs} cardRef={cardRef} />
    </>
  );
}

export function IDCardScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          <IDCardSceneInner />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
