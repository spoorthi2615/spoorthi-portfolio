import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// ------------------------------------------------------------------------
// WEBGL & DECRYPTION UTILS
// ------------------------------------------------------------------------
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

async function generateAESKey(password) {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
}

async function decryptFile(url, password) {
  const response = await fetch(url);
  const encryptedData = await response.arrayBuffer();
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
}

// ------------------------------------------------------------------------
// RIGGED CHARACTER MODEL COMPONENT
// ------------------------------------------------------------------------
function RiggedCharacter({ gltf }) {
  const modelRef = useRef();
  const headBoneRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!gltf) return;
    
    // Mixamo / ReadyPlayerMe head bone is spine006 or mixamorigHead
    const head = gltf.scene.getObjectByName("spine006") || gltf.scene.getObjectByName("Head");
    if (head) {
      headBoneRef.current = head;
    }

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.55;
          child.material.metalness = 0.1;
          
          if (child.material.color) {
            const nameLower = child.name.toLowerCase();
            const matNameLower = (child.material.name || "").toLowerCase();
            if (nameLower.includes("shirt") || nameLower.includes("top") || matNameLower.includes("shirt") || matNameLower.includes("top")) {
              child.material.color.set("#6b21a8"); // Purple top
            } else if (nameLower.includes("pant") || nameLower.includes("bottom") || matNameLower.includes("pant") || matNameLower.includes("bottom")) {
              child.material.color.set("#0f0b15"); // Dark trousers
            }
          }
        }
      }
    });
  }, [gltf]);

  // Track mouse client movements
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Lerp head rotations only when user is near the hero (scrollY < 300)
    if (headBoneRef.current && window.scrollY < 300) {
      const maxRotationY = Math.PI / 4.5; // Left-Right range
      const maxRotationX = Math.PI / 6;   // Up-Down range
      
      const targetY = mouse.current.x * maxRotationY;
      const targetX = -mouse.current.y * maxRotationX;

      // Smooth look-at transitions
      headBoneRef.current.rotation.y = THREE.MathUtils.lerp(headBoneRef.current.rotation.y, targetY, 0.08);
      headBoneRef.current.rotation.x = THREE.MathUtils.lerp(headBoneRef.current.rotation.x, targetX, 0.08);
    }
  });

  return (
    <primitive 
      object={gltf.scene} 
      scale={3.65} 
      position={[0, -3.2, 0]} 
      rotation={[0, 0, 0]} 
      ref={modelRef}
    />
  );
}

// ------------------------------------------------------------------------
// MAIN EXPORT SCENE
// ------------------------------------------------------------------------
export default function CharacterScene() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [gltfModel, setGltfModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Detect environment capabilities
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    setWebGLSupported(checkWebGLSupport());

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  // Decrypt and load 3D GLTF asset asynchronously
  useEffect(() => {
    const useWebGL = checkWebGLSupport() && window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!useWebGL) return;

    let active = true;
    let blobUrl = null;
    let dracoLoader = null;

    const loadAsset = async () => {
      try {
        const decryptedBuffer = await decryptFile("/models/character.enc", "Character3D#@");
        if (!active) return;

        const blob = new Blob([decryptedBuffer], { type: "model/gltf-binary" });
        blobUrl = URL.createObjectURL(blob);

        const loader = new GLTFLoader();
        dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(blobUrl, (gltf) => {
          if (active) {
            setGltfModel(gltf);
            setLoading(false);
          }
        }, undefined, (err) => {
          console.error("Error loading decrypted character asset:", err);
          setLoading(false);
        });
      } catch (err) {
        console.error("Decryption failed:", err);
        setLoading(false);
      }
    };

    loadAsset();

    return () => {
      active = false;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
      if (dracoLoader) {
        dracoLoader.dispose();
      }
    };
  }, []);

  const showWebGL = webGLSupported && !isMobile && !prefersReducedMotion;

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
      {showWebGL ? (
        <>
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400 z-10 bg-[#050505]/40 backdrop-blur-sm rounded-[2.5rem]">
              <div className="w-10 h-10 border-t-2 border-purple-400 border-r-2 rounded-full animate-spin mb-4" />
              <span className="font-display tracking-widest uppercase text-sm">Decoding Avatar...</span>
            </div>
          )}
          {isInView && gltfModel && (
            <Canvas
              shadows
              dpr={[1, 1.25]}
              gl={{ alpha: true, antialias: true }}
              camera={{ position: [0, 0.4, 5], fov: 32 }}
              className="w-full h-full"
            >
              <ambientLight intensity={1.1} />
              <spotLight
                position={[5, 10, 8]}
                intensity={1.2}
                penumbra={1}
                color="#c084fc"
                castShadow
              />
              <directionalLight position={[-3, 4, 3]} intensity={1.8} color="#db2777" />
              
              <Suspense fallback={null}>
                <RiggedCharacter gltf={gltfModel} />
              </Suspense>
            </Canvas>
          )}
        </>
      ) : (
        /* Fallback: Beautiful glowing cyber avatar icon/CSS graphic for mobile & low-power devices */
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-[3px] shadow-[0_0_50px_rgba(168,85,247,0.4)] relative group flex items-center justify-center animate-pulse duration-3000">
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md group-hover:scale-105 transition-transform" />
          <div className="w-full h-full rounded-full bg-[#0c0812] flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 24 24" className="w-24 h-24 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

