/* eslint-disable react/no-unknown-property */
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RapierRigidBody } from "@react-three/rapier";

interface IDCardLanyardProps {
  anchorRef: React.RefObject<RapierRigidBody | null>;
  chainRefs: React.RefObject<RapierRigidBody | null>[];
  cardRef: React.RefObject<RapierRigidBody | null>;
  isMobile?: boolean;
  isDark?: boolean;
}

const DARK_ROPE_COLOR = "#94A3B8";

export default function IDCardLanyard({
  anchorRef,
  chainRefs,
  cardRef,
  isMobile = false,
  isDark = false,
}: IDCardLanyardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);

  const lanyardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 256;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, 64, 256);
    ctx.save();
    ctx.translate(32, 128);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    for (let i = -100; i < 100; i += 30) {
      ctx.fillText("FARIZ", i, 4);
    }
    ctx.restore();
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 6);
    return tex;
  }, []);

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: isDark ? DARK_ROPE_COLOR : "#FFFFFF",
      roughness: 1.0,
      metalness: 0,
    });
    if (lanyardTexture) mat.map = lanyardTexture;
    return mat;
  }, [isDark, lanyardTexture]);

  useFrame(() => {
    if (!meshRef.current) return;

    if (isMobile) {
      frameCount.current++;
      if (frameCount.current % 2 !== 0) return;
    }

    const points: THREE.Vector3[] = [];
    const allRefs = [anchorRef, ...chainRefs, cardRef];

    for (const ref of allRefs) {
      const body = ref.current;
      if (!body) return;
      const pos = body.translation();
      points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
    }

    if (points.length < 2) return;

    const curve = new THREE.CatmullRomCurve3(points);
    const tubularSegments = isMobile ? 32 : 64;
    const radialSegments = isMobile ? 8 : 12;
    const newGeometry = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      0.11,
      radialSegments,
      false,
    );

    const oldGeometry = meshRef.current.geometry;
    meshRef.current.geometry = newGeometry;
    oldGeometry.dispose();
  });

  return (
    <mesh ref={meshRef} material={material}>
      <bufferGeometry />
    </mesh>
  );
}
