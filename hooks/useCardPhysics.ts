"use client";

import { useRef, useState, useCallback, useImperativeHandle } from "react";
import type { Ref } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  RapierRigidBody,
  useRopeJoint,
  useSphericalJoint,
  useRapier,
} from "@react-three/rapier";
import { Vector3, Quaternion } from "three";

// ── Constants ───────────────────────────────────────────────────
const ROPE_LENGTH = 1;

// Card-top attachment height in card-local space (Y offset from body origin).
// Shared with IDCardLanyard and IDCardModel so the physics anchor, the visual
// band, and the drag collider can't drift apart again.
export const CARD_ATTACHMENT_HEIGHT = 1.09;

// Stable joint anchor points (module-level to avoid per-render allocation)
const JOINT_CENTER = new Vector3(0, 0, 0);
const CARD_ATTACHMENT = new Vector3(0, CARD_ATTACHMENT_HEIGHT, 0);

// Reusable temporaries (single-threaded JS — safe across frames)
const _pointerWorld = new Vector3();
const _dragDirection = new Vector3();
const _quat = new Quaternion();

export interface CardPhysicsHandle {
  resetRotation: () => void;
}

export function useCardPhysics(ref: Ref<CardPhysicsHandle>) {
  // ── Refs ────────────────────────────────────────────────────
  const anchorRef = useRef<RapierRigidBody>(null!);
  const chainRef1 = useRef<RapierRigidBody>(null!);
  const chainRef2 = useRef<RapierRigidBody>(null!);
  const chainRef3 = useRef<RapierRigidBody>(null!);
  const cardRef = useRef<RapierRigidBody>(null!);

  // ── State ───────────────────────────────────────────────────
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef<Vector3 | null>(null);

  const { rapier } = useRapier();

  // ── Chain joints ────────────────────────────────────────────
  // Vercel Ship / react-bits topology: rope links for strap, spherical joint for card rotation.
  useRopeJoint(anchorRef, chainRef1, [JOINT_CENTER, JOINT_CENTER, ROPE_LENGTH]);
  useRopeJoint(chainRef1, chainRef2, [JOINT_CENTER, JOINT_CENTER, ROPE_LENGTH]);
  useRopeJoint(chainRef2, chainRef3, [JOINT_CENTER, JOINT_CENTER, ROPE_LENGTH]);
  useSphericalJoint(chainRef3, cardRef, [JOINT_CENTER, CARD_ATTACHMENT]);

  // ── Per-frame: drag tracking + tilt-back ───────────────────
  useFrame((state, delta) => {
    if (!cardRef.current) return;

    if (isDragging) {
      const offset = dragOffsetRef.current;
      if (offset) {
        _pointerWorld
          .set(state.pointer.x, state.pointer.y, 0.5)
          .unproject(state.camera);
        _dragDirection.copy(_pointerWorld).sub(state.camera.position).normalize();
        _pointerWorld.add(_dragDirection.multiplyScalar(state.camera.position.length()));

        cardRef.current.setNextKinematicTranslation({
          x: _pointerWorld.x - offset.x,
          y: _pointerWorld.y - offset.y,
          z: _pointerWorld.z - offset.z,
        });
      }

      anchorRef.current?.wakeUp();
      chainRef1.current?.wakeUp();
      chainRef2.current?.wakeUp();
      chainRef3.current?.wakeUp();
      cardRef.current.wakeUp();
      return;
    }

    const rot = cardRef.current.rotation();
    const ang = cardRef.current.angvel();
    _quat.set(rot.x, rot.y, rot.z, rot.w);
    cardRef.current.setAngvel(
      { x: ang.x, y: ang.y - _quat.y * 0.25 * delta * 60, z: ang.z },
      true,
    );
  });

  // ── Drag handlers ──────────────────────────────────────────
  const onPointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (event.target instanceof Element) {
      event.target.setPointerCapture(event.pointerId);
    }
    setIsDragging(true);
    if (cardRef.current) {
      const translation = cardRef.current.translation();
      dragOffsetRef.current = new Vector3(
        event.point.x - translation.x,
        event.point.y - translation.y,
        event.point.z - translation.z,
      );
      cardRef.current.setBodyType(
        rapier.RigidBodyType.KinematicPositionBased,
        true,
      );
    }
  }, [rapier]);

  const onPointerUp = useCallback((event?: ThreeEvent<PointerEvent>) => {
    event?.stopPropagation();
    if (
      event?.target instanceof Element &&
      event.target.hasPointerCapture(event.pointerId)
    ) {
      event.target.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
    dragOffsetRef.current = null;
    if (cardRef.current) {
      cardRef.current.setBodyType(rapier.RigidBodyType.Dynamic, true);
      cardRef.current.wakeUp();
    }
  }, [rapier]);

  // ── Imperative API for keyboard controls ────────────────────
  const resetRotation = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.setTranslation({ x: 0, y: 0, z: 0 }, true);
      cardRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      cardRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      cardRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  }, []);

  useImperativeHandle(ref, () => ({ resetRotation }), [resetRotation]);

  return {
    anchorRef,
    cardRef,
    chainRef1,
    chainRef2,
    chainRef3,
    isDragging,
    onPointerDown,
    onPointerUp,
  };
}
