"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import {
  RapierRigidBody,
  useSphericalJoint,
  useRapier,
} from "@react-three/rapier";
import { Vector3, Plane } from "three";

// ── Constants ───────────────────────────────────────────────────
const SEGMENT_LENGTH = 0.8;

// Stable joint anchor points (module-level to avoid per-render allocation)
const ANCHOR_BOTTOM = new Vector3(0, -SEGMENT_LENGTH, 0);
const CHAIN_TOP = new Vector3(0, SEGMENT_LENGTH, 0);

// Reusable temporaries (single-threaded JS — safe across frames)
const _cameraDir = new Vector3();
const _plane = new Plane();
const _intersection = new Vector3();
const _cardPos = new Vector3();

export function useCardPhysics() {
  // ── Refs ────────────────────────────────────────────────────
  const anchorRef = useRef<RapierRigidBody>(null!);
  const chainRef1 = useRef<RapierRigidBody>(null!);
  const chainRef2 = useRef<RapierRigidBody>(null!);
  const chainRef3 = useRef<RapierRigidBody>(null!);
  const cardRef = useRef<RapierRigidBody>(null!);

  const chainRefs: React.RefObject<RapierRigidBody>[] = [
    chainRef1,
    chainRef2,
    chainRef3,
  ];

  // ── State ───────────────────────────────────────────────────
  const [isDragging, setIsDragging] = useState(false);

  const { rapier } = useRapier();

  // ── Chain joints ────────────────────────────────────────────
  // Anchor (fixed, top) → Chain1 → Chain2 → Chain3 → Card
  useSphericalJoint(anchorRef, chainRef1, [ANCHOR_BOTTOM, CHAIN_TOP]);
  useSphericalJoint(chainRef1, chainRef2, [ANCHOR_BOTTOM, CHAIN_TOP]);
  useSphericalJoint(chainRef2, chainRef3, [ANCHOR_BOTTOM, CHAIN_TOP]);
  useSphericalJoint(chainRef3, cardRef, [ANCHOR_BOTTOM, CHAIN_TOP]);

  // ── Drag tracking (per-frame) ──────────────────────────────
  useFrame((state) => {
    if (!isDragging || !cardRef.current) return;

    const cardTranslation = cardRef.current.translation();
    _cardPos.set(cardTranslation.x, cardTranslation.y, cardTranslation.z);

    state.camera.getWorldDirection(_cameraDir);
    _plane.setFromNormalAndCoplanarPoint(_cameraDir.negate(), _cardPos);

    state.raycaster.setFromCamera(state.pointer, state.camera);

    if (state.raycaster.ray.intersectPlane(_plane, _intersection)) {
      cardRef.current.setNextKinematicTranslation({
        x: _intersection.x,
        y: _intersection.y,
        z: _intersection.z,
      });
    }
  });

  // ── Drag handlers ──────────────────────────────────────────
  const onPointerDown = useCallback(() => {
    setIsDragging(true);
    if (cardRef.current) {
      cardRef.current.setBodyType(
        rapier.RigidBodyType.KinematicPositionBased,
        true,
      );
    }
  }, [rapier]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
    if (cardRef.current) {
      cardRef.current.setBodyType(rapier.RigidBodyType.Dynamic, true);
    }
  }, [rapier]);

  return {
    anchorRef,
    cardRef,
    chainRefs,
    isDragging,
    onPointerDown,
    onPointerUp,
  };
}
