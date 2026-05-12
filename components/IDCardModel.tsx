"use client";

import { useMemo, type RefObject } from "react";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  type RapierRigidBody,
} from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { generateCardTexture } from "@/lib/cardTexture";
import type { ThreeEvent } from "@react-three/fiber";

export interface IDCardModelProps {
  cardRef: RefObject<RapierRigidBody | null>;
  isDragging: boolean;
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void;
  onPointerUp: (event?: ThreeEvent<PointerEvent>) => void;
  isDark?: boolean;
}

export function IDCardModel({
  cardRef,
  isDragging,
  onPointerDown,
  onPointerUp,
  isDark = false,
}: IDCardModelProps) {
  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(generateCardTexture(isDark));
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [isDark]);

  return (
    <RigidBody
      ref={cardRef}
      type="dynamic"
      mass={1}
      position={[0, 0, 0]}
      colliders={false}
      canSleep
      linearDamping={4}
      angularDamping={4}
    >
      <BallCollider args={[0.12]} position={[0, 1.42, 0]} />
      <CuboidCollider args={[0.92, 1.32, 0.035]} />
      <RoundedBox
        args={[1.52, 2.18, 0.06]}
        radius={0.08}
        smoothness={8}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onLostPointerCapture={onPointerUp}
        scale={isDragging ? 1.025 : 1}
      >
        <meshPhysicalMaterial
          map={texture}
          side={THREE.DoubleSide}
          clearcoat={0.85}
          clearcoatRoughness={0.22}
          iridescence={0.18}
          roughness={0.22}
          metalness={0.04}
        />
      </RoundedBox>
    </RigidBody>
  );
}
