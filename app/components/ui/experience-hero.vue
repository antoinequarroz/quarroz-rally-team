<script setup lang="ts">
import gsap from "gsap";
import Lenis from "lenis";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ArrowUpRight } from "@lucide/vue";

const containerRef = ref<HTMLElement | null>(null);
const revealRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);
const canvasHostRef = ref<HTMLElement | null>(null);
const localePath = useLocalePath();

onMounted(() => {
    const host = canvasHostRef.value;
    if (!host) {
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        35,
        host.clientWidth / host.clientHeight,
        0.1,
        420,
    );
    camera.position.set(0, 6, 96);
    camera.lookAt(0, -1.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(20, 25, 30);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 1.1);
    rim.position.set(-25, 12, -20);
    scene.add(rim);

    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseCurrent = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();
    let carModel: THREE.Object3D | null = null;
    const carRoot = new THREE.Group();
    const carBaseY = -19;

    carRoot.position.set(0, carBaseY, 0);
    scene.add(carRoot);

    const resize = () => {
        if (!host) {
            return;
        }
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight);
    };
    resize();

    const onPointerMove = (e: PointerEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -((e.clientY / window.innerHeight) * 2 - 1);
        mouseTarget.set(x, y);
    };

    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
    });

    let rafId = 0;
    const tick = (time: number) => {
        lenis.raf(time);

        const t = clock.getElapsedTime();
        mouseCurrent.lerp(mouseTarget, 0.05);

        if (carModel) {
            const targetRotY = mouseCurrent.x * 0.28;
            const targetRotX = -0.04 + mouseCurrent.y * 0.06;
            carRoot.rotation.y += (targetRotY - carRoot.rotation.y) * 0.08;
            carRoot.rotation.x += (targetRotX - carRoot.rotation.x) * 0.08;
            carRoot.rotation.z = Math.sin(t * 0.8) * 0.01;
            carRoot.position.y = carBaseY;
        }

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        "/models/subaru_impreza.glb",
        (gltf) => {
            carModel = gltf.scene;

            // Compute a global box to remove outlier helper planes.
            const rawBox = new THREE.Box3().setFromObject(carModel);
            const rawSize = new THREE.Vector3();
            rawBox.getSize(rawSize);
            const rawMax = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;

            carModel.traverse((node) => {
                if (!(node as THREE.Mesh).isMesh) {
                    return;
                }
                const mesh = node as THREE.Mesh;
                const geo = mesh.geometry;
                if (!geo.boundingBox) {
                    geo.computeBoundingBox();
                }
                const bb = geo.boundingBox;
                if (!bb) {
                    return;
                }
                const meshSize = new THREE.Vector3();
                bb.getSize(meshSize);
                const meshMax = Math.max(meshSize.x, meshSize.y, meshSize.z);
                const meshMin = Math.max(
                    0.0001,
                    Math.min(meshSize.x, meshSize.y, meshSize.z),
                );
                const flatRatio = meshMax / meshMin;

                // Remove giant/very flat planes that hide the whole hero.
                if (meshMax > rawMax * 1.6 || flatRatio > 120) {
                    mesh.visible = false;
                    return;
                }

                mesh.castShadow = false;
                mesh.receiveShadow = false;
                mesh.frustumCulled = false;

                // Local/dev-safe fallback: ignore embedded textures that can fail to decode as blob URLs.
                const fallbackMaterial = new THREE.MeshStandardMaterial({
                    color: new THREE.Color("#d8d8d8"),
                    roughness: 0.45,
                    metalness: 0.35,
                });
                fallbackMaterial.side = THREE.FrontSide;
                fallbackMaterial.depthWrite = true;
                mesh.material = fallbackMaterial;
            });

            // Refit using post-filter bounds so the model is always visible.
            carModel.updateMatrixWorld(true);
            const fitBox = new THREE.Box3().setFromObject(carModel);
            const fitSize = new THREE.Vector3();
            fitBox.getSize(fitSize);
            const fitCenter = new THREE.Vector3();
            fitBox.getCenter(fitCenter);

            carModel.position.sub(fitCenter);

            const safeWidth = Math.max(1, fitSize.x);
            const targetWidth = 44;
            const uniformScale = targetWidth / safeWidth;
            carModel.scale.setScalar(uniformScale);

            // Place model so its bottom sits around y=0 in local space.
            carModel.updateMatrixWorld(true);
            const placedBox = new THREE.Box3().setFromObject(carModel);
            carModel.position.y -= placedBox.min.y;

            carRoot.add(carModel);
            carRoot.position.y = carBaseY;
            carRoot.position.z = 0;
        },
        undefined,
        (error) => {
            console.error("Subaru model load error:", error);
        },
    );

    const ctx = gsap.context(() => {
        gsap.fromTo(
            revealRef.value,
            { filter: "blur(30px)", opacity: 0, scale: 1.02 },
            {
                filter: "blur(0px)",
                opacity: 1,
                scale: 1,
                duration: 2.2,
                ease: "expo.out",
            },
        );

        gsap.from(".command-cell", {
            x: 60,
            opacity: 0,
            stagger: 0.1,
            duration: 1.5,
            ease: "power4.out",
            delay: 1,
            clearProps: "all",
        });

        const handleMouseMove = (e: MouseEvent) => {
            const ctaEl = ctaRef.value;
            if (!(ctaEl instanceof HTMLElement)) {
                return;
            }
            const rect = ctaEl.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

            if (dist < 150) {
                gsap.to(ctaEl, {
                    x: (e.clientX - cx) * 0.4,
                    y: (e.clientY - cy) * 0.4,
                    duration: 0.6,
                });
            } else {
                gsap.to(ctaEl, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1,0.3)",
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        onUnmounted(() =>
            window.removeEventListener("mousemove", handleMouseMove),
        );
    }, containerRef);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);

    onUnmounted(() => {
        ctx.revert();
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        lenis.destroy();
        if (carModel) {
            carRoot.remove(carModel);
        }
        renderer.dispose();
        if (renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
    });
});
</script>

<template>
    <section
        ref="containerRef"
        class="experience-hero relative min-h-screen w-full overflow-hidden bg-[#020202] text-white selection:bg-white selection:text-black"
    >
        <div
            class="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(60%_45%_at_62%_40%,rgba(225,29,46,0.18),transparent_75%)]"
        />
        <div
            class="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-[linear-gradient(180deg,rgba(225,29,46,0.13),transparent)]"
        />
        <div class="absolute inset-0 z-0 pointer-events-none">
            <div ref="canvasHostRef" class="h-full w-full" />
        </div>

        <div
            ref="revealRef"
            class="relative z-10 flex min-h-screen w-full flex-col items-center gap-10 p-8 md:flex-row md:items-stretch md:p-14 lg:p-20"
        >
            <div
                class="flex w-full min-w-0 flex-1 flex-col justify-between pb-12 md:pb-8"
            >
                <div class="flex items-center gap-3">
                    <div class="relative h-2.5 w-2.5 rounded-full bg-white">
                        <div
                            class="absolute inset-0 animate-ping rounded-full bg-white opacity-30"
                        />
                    </div>
                    <span
                        class="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white"
                        >RALLYE<span class="text-rally-red"
                            >TEAM QUARROZ</span
                        ></span
                    >
                </div>

                <div class="max-w-4xl pr-12 lg:-translate-y-8">
                    <h1
                        class="text-[clamp(3rem,9.2vw,10.5rem)] font-black uppercase leading-[0.87] tracking-tighter text-white"
                    >
                        RALLYE<br /><span class="text-outline-red"
                            >TEAM QUARROZ</span
                        >
                    </h1>
                    <p
                        class="mt-8 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.35em] text-white/40"
                    >
                        EQUIPE VALAISANNE - CALENDRIER, RESULTATS, SPONSORS ET
                        BOUTIQUE SUPPORTER.
                    </p>
                </div>

                <NuxtLink
                    :to="localePath('/calendrier')"
                    class="group w-fit lg:-translate-y-20"
                >
                    <span class="flex items-center gap-6">
                        <span
                            ref="ctaRef"
                            class="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-rally-red/50 bg-rally-red/10 transition-all duration-500 group-hover:bg-rally-red"
                        >
                            <ArrowUpRight
                                class="h-[18px] w-[18px] stroke-white transition-colors duration-500"
                            />
                        </span>
                        <span
                            class="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white"
                            >Voir le calendrier</span
                        >
                    </span>
                </NuxtLink>
            </div>

            <div
                class="z-20 flex w-full flex-shrink-0 flex-col justify-center gap-4 md:w-80 lg:w-96"
            >
                <article
                    class="command-cell glass-panel block border-rally-red/35 p-6 sm:p-7"
                >
                    <span
                        class="mb-3 block font-mono text-[9px] uppercase tracking-widest text-white/25"
                        >001 // PROCHAINE COURSE</span
                    >
                    <div class="mt-2 flex items-end justify-between">
                        <h4
                            class="text-2xl font-bold tracking-tighter text-white sm:text-3xl"
                        >
                            Rallye du Valais
                        </h4>
                        <div
                            class="h-[2px] w-20 overflow-hidden rounded-full bg-white/5"
                        >
                            <div
                                class="h-full w-[60%] animate-loading bg-white"
                            />
                        </div>
                    </div>
                </article>

                <article class="command-cell glass-panel block p-6 sm:p-7">
                    <span
                        class="mb-3 block font-mono text-[9px] uppercase tracking-widest text-white/25"
                        >002 // SAISON 2026</span
                    >
                    <div class="mt-4 flex flex-col gap-3">
                        <div
                            class="flex justify-between font-mono text-[10px] text-white/50"
                        >
                            <span>Objectif</span>
                            <span>2026</span>
                        </div>
                        <div class="h-[1px] w-full bg-white/5" />
                        <div
                            class="flex justify-between font-mono text-[10px] text-white/50"
                        >
                            <span>Base Team</span>
                            <span>Valais</span>
                        </div>
                    </div>
                </article>

                <article class="command-cell glass-panel block p-6 sm:p-7">
                    <span
                        class="mb-3 block font-mono text-[9px] uppercase tracking-widest text-white/25"
                        >003 // SPONSORING</span
                    >
                    <h3
                        class="mt-3 text-sm font-medium leading-snug text-white/70"
                    >
                        Entreprises locales et partenaires:
                        <span class="italic text-white"
                            >rejoignez l'aventure RTQ</span
                        >.
                    </h3>
                </article>
            </div>
        </div>
    </section>
</template>
