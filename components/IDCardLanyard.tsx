"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import type { RapierRigidBody } from "@react-three/rapier";

interface IDCardLanyardProps {
  anchorRef: React.RefObject<RapierRigidBody | null>;
  chainRef1: React.RefObject<RapierRigidBody | null>;
  chainRef2: React.RefObject<RapierRigidBody | null>;
  chainRef3: React.RefObject<RapierRigidBody | null>;
  cardRef: React.RefObject<RapierRigidBody | null>;
  isMobile?: boolean;
  isDark?: boolean;
}

const BAND_TEXT = "SPELLSHAND";
const BAND_WIDTH = 0.11;
const MIN_LERP_SPEED = 8;
const MAX_LERP_SPEED = 28;

const _fixedPoint = new THREE.Vector3();
const _jointOnePoint = new THREE.Vector3();
const _jointTwoPoint = new THREE.Vector3();
const _jointThreePoint = new THREE.Vector3();
const _cardAttachmentPoint = new THREE.Vector3();
const _curvePoints: THREE.Vector3[] = [
  _cardAttachmentPoint,
  _jointThreePoint,
  _jointTwoPoint,
  _jointOnePoint,
  _fixedPoint,
];

function copyBodyPosition(
  ref: React.RefObject<RapierRigidBody | null>,
  target: THREE.Vector3,
): boolean {
  const body = ref.current;
  if (!body) return false;
  const pos = body.translation();
  target.set(pos.x, pos.y, pos.z);
  return true;
}

export default function IDCardLanyard({
  anchorRef,
  chainRef1,
  chainRef2,
  chainRef3,
  cardRef,
  isMobile = false,
  isDark = false,
}: IDCardLanyardProps) {
  const geometryRef = useRef<MeshLineGeometry>(null);
  const frameCount = useRef(0);
  const lerpedJointOne = useMemo(() => new THREE.Vector3(0, 2.15, 0), []);
  const lerpedJointTwo = useMemo(() => new THREE.Vector3(0, 1.25, 0), []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(_curvePoints), []);
  const geometry = useMemo(() => new MeshLineGeometry(), []);
  const resolution = useMemo(() => new THREE.Vector2(1024, 1024), []);

  const lanyardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 96;
    c.height = 512;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, 96, 512);
    ctx.save();
    ctx.translate(48, 256);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    for (let i = -240; i < 240; i += 128) {
      ctx.fillText(BAND_TEXT, i, 4);
    }
    ctx.restore();
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(-4, 1);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const material = useMemo(() => {
    const mat = new MeshLineMaterial({
      color: isDark ? "#E5E7EB" : "#FFFFFF",
      lineWidth: BAND_WIDTH,
      map: lanyardTexture ?? undefined,
      repeat: new THREE.Vector2(-4, 1),
      resolution,
      useMap: lanyardTexture ? 1 : 0,
    });
    mat.depthTest = true;
    mat.depthWrite = false;
    return mat;
  }, [isDark, lanyardTexture, resolution]);

  useEffect(() => () => lanyardTexture?.dispose(), [lanyardTexture]);

  useFrame((_, delta) => {
    if (!geometryRef.current) return;

    if (isMobile) {
      frameCount.current++;
      if (frameCount.current % 2 !== 0) return;
    }

    if (!copyBodyPosition(anchorRef, _fixedPoint)) return;
    if (!copyBodyPosition(chainRef1, _jointOnePoint)) return;
    if (!copyBodyPosition(chainRef2, _jointTwoPoint)) return;
    if (!copyBodyPosition(chainRef3, _jointThreePoint)) return;
    if (!copyBodyPosition(cardRef, _cardAttachmentPoint)) return;
    _cardAttachmentPoint.y += 1.09;

    for (const [target, source] of [
      [lerpedJointOne, _jointOnePoint],
      [lerpedJointTwo, _jointTwoPoint],
    ] as const) {
      const distance = target.distanceTo(source);
      const clampedDistance = Math.max(0.1, Math.min(1, distance));
      const speed = MIN_LERP_SPEED + clampedDistance * (MAX_LERP_SPEED - MIN_LERP_SPEED);
      target.lerp(source, Math.min(1, delta * speed));
    }

    _curvePoints[1] = _jointThreePoint;
    _curvePoints[2] = lerpedJointTwo;
    _curvePoints[3] = lerpedJointOne;
    geometryRef.current.setPoints(curve.getPoints(isMobile ? 24 : 32));
  });

  return (
    <mesh material={material} renderOrder={10}>
      <primitive ref={geometryRef} object={geometry} attach="geometry" />
    </mesh>
  );
}
