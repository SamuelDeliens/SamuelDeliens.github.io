// DebugCamera.ts
import Experience from "./Experience.ts";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type Sizes from "./Utils/Sizes.ts";

export default class DebugCamera {
    experience: Experience;
    scene: THREE.Scene;
    canvas: HTMLCanvasElement;
    sizes: Sizes;
    renderer: THREE.WebGLRenderer;

    debugCamera!: THREE.PerspectiveCamera;
    debugControls!: OrbitControls;

    debugViewport = {
        x: 0.7, // 70% de la largeur
        y: 0.7, // 70% de la hauteur
        width: 0.3, // 30% de largeur
        height: 0.3 // 30% de hauteur
    };

    isEnabled = true;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.renderer = this.experience.renderer.renderer;

        this.createDebugCamera();
        this.createDebugControls();
        this.setupEventListeners();
    }

    createDebugCamera() {
        this.debugCamera = new THREE.PerspectiveCamera(
            60,
            (this.sizes.width * this.debugViewport.width) / (this.sizes.height * this.debugViewport.height),
            0.1,
            1000
        );

        this.debugCamera.position.set(15, 10, 15);
        this.debugCamera.lookAt(0, 0, 0);

        this.scene.add(this.debugCamera);

        this.addDebugHelpers();
    }

    createDebugControls() {
        this.debugControls = new OrbitControls(this.debugCamera, this.canvas);

        this.debugControls.enableDamping = true;
        this.debugControls.dampingFactor = 0.05;
        this.debugControls.screenSpacePanning = false;

        this.debugControls.minDistance = 1;
        this.debugControls.maxDistance = 100;

        this.debugControls.maxPolarAngle = Math.PI;
        this.debugControls.minPolarAngle = 0;

        this.debugControls.rotateSpeed = 1.0;
        this.debugControls.zoomSpeed = 1.2;
        this.debugControls.panSpeed = 0.8;

        this.debugControls.autoRotate = false;
        this.debugControls.autoRotateSpeed = 2.0;

        this.debugControls.target.set(0, 0, 0);

        this.debugControls.enabled = true;
    }

    addDebugHelpers() {
        const gridHelper = new THREE.GridHelper(20, 20);
        gridHelper.name = 'debugGrid';
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(5);
        axesHelper.name = 'debugAxes';
        this.scene.add(axesHelper);

        this.updateMainCameraHelper();
    }

    updateMainCameraHelper() {
        const oldHelper = this.scene.getObjectByName('mainCameraHelper');
        if (oldHelper) {
            this.scene.remove(oldHelper);
        }

        const mainCamera = this.experience.camera.currentCamera;
        const cameraHelper = new THREE.CameraHelper(mainCamera);
        cameraHelper.name = 'mainCameraHelper';
        this.scene.add(cameraHelper);
    }

    setupEventListeners() {
        let isMouseOverDebugViewport = false;
        let mouseDownInDebugViewport = false;

        const isInDebugViewport = (event: MouseEvent) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            return (
                x >= this.debugViewport.x &&
                x <= this.debugViewport.x + this.debugViewport.width &&
                y >= this.debugViewport.y &&
                y <= this.debugViewport.y + this.debugViewport.height
            );
        };

        this.canvas.addEventListener('mousemove', (event) => {
            const wasOver = isMouseOverDebugViewport;
            isMouseOverDebugViewport = isInDebugViewport(event);

            if (isMouseOverDebugViewport && !wasOver) {
                this.canvas.style.cursor = 'grab';
                console.log("🎯 Mouse over debug viewport - controls active");
            } else if (!isMouseOverDebugViewport && wasOver) {
                this.canvas.style.cursor = 'default';
            }
        });

        this.canvas.addEventListener('mousedown', (event) => {
            mouseDownInDebugViewport = isInDebugViewport(event);

            if (mouseDownInDebugViewport && this.isEnabled) {
                this.debugControls.enabled = true;
                this.canvas.style.cursor = 'grabbing';
                console.log("🎮 Debug controls activated");

                event.stopPropagation();
            } else {
                this.debugControls.enabled = false;
            }
        });

        // Gérer le relâchement de la souris
        this.canvas.addEventListener('mouseup', () => {
            if (mouseDownInDebugViewport) {
                this.canvas.style.cursor = isMouseOverDebugViewport ? 'grab' : 'default';
            }
            mouseDownInDebugViewport = false;
        });

        this.canvas.addEventListener('wheel', (event) => {
            if (isInDebugViewport(event) && this.isEnabled) {
                // Permettre le zoom seulement si on est dans le viewport debug
                this.debugControls.enabled = true;
                event.stopPropagation();

                setTimeout(() => {
                    if (!mouseDownInDebugViewport) {
                        this.debugControls.enabled = isMouseOverDebugViewport;
                    }
                }, 100);
            }
        }, { passive: true });

        // Raccourcis clavier pour toggle la caméra debug
        window.addEventListener('keydown', (event) => {
            if (event.key === 'D' || event.key === 'd') {
                this.toggle();
            }
            if (event.key === 'R' || event.key === 'r') {
                this.resetDebugCamera();
            }
            if (event.key === 'F' || event.key === 'f') {
                this.focusOnMainCamera();
            }
            if (event.key === 'T' || event.key === 't') {
                this.debugControls.autoRotate = !this.debugControls.autoRotate;
                console.log(`🔄 Auto-rotate: ${this.debugControls.autoRotate ? 'ON' : 'OFF'}`);
            }
        });
    }

    render() {
        if (!this.isEnabled) return;

        // Sauvegarder l'état actuel du renderer
        const currentViewport = new THREE.Vector4();
        this.renderer.getViewport(currentViewport);

        // Calculer les dimensions du viewport debug en pixels
        const debugX = Math.floor(this.sizes.width * this.debugViewport.x);
        const debugY = Math.floor(this.sizes.height * this.debugViewport.y);
        const debugWidth = Math.floor(this.sizes.width * this.debugViewport.width);
        const debugHeight = Math.floor(this.sizes.height * this.debugViewport.height);

        // Configurer le viewport pour la caméra debug
        this.renderer.setViewport(debugX, debugY, debugWidth, debugHeight);
        this.renderer.setScissor(debugX, debugY, debugWidth, debugHeight);
        this.renderer.setScissorTest(true);

        // Mettre à jour l'aspect ratio de la caméra debug
        this.debugCamera.aspect = debugWidth / debugHeight;
        this.debugCamera.updateProjectionMatrix();

        // Render avec la caméra debug
        this.renderer.render(this.scene, this.debugCamera);

        // Restaurer le viewport original
        this.renderer.setViewport(currentViewport.x, currentViewport.y, currentViewport.z, currentViewport.w);
        this.renderer.setScissorTest(false);

        // Dessiner une bordure autour du viewport debug
        this.drawDebugBorder(debugX, debugY, debugWidth, debugHeight);
    }

    drawDebugBorder(x: number, y: number, width: number, height: number) {
        // Utiliser le canvas 2D pour dessiner une bordure
        const canvas2D = document.createElement('canvas');
        const ctx = canvas2D.getContext('2d');

        if (!ctx) return;

        canvas2D.width = this.sizes.width;
        canvas2D.height = this.sizes.height;
        canvas2D.style.position = 'absolute';
        canvas2D.style.top = '0';
        canvas2D.style.left = '0';
        canvas2D.style.pointerEvents = 'none';
        canvas2D.style.zIndex = '1000';

        // Supprimer l'ancienne bordure
        const oldBorder = document.querySelector('.debug-border');
        if (oldBorder) oldBorder.remove();

        canvas2D.className = 'debug-border';

        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, this.sizes.height - y - height, width, height);

        // Ajouter un label
        ctx.fillStyle = '#ff0000';
        ctx.font = '12px Arial';
        ctx.fillText('DEBUG VIEW', x + 5, this.sizes.height - y - height + 15);

        document.body.appendChild(canvas2D);

        // Nettoyer après un court délai
        setTimeout(() => {
            if (canvas2D.parentNode) {
                canvas2D.parentNode.removeChild(canvas2D);
            }
        }, 16); // ~60fps
    }

    update() {
        if (!this.isEnabled) return;

        this.debugControls.update();
        this.updateMainCameraHelper();
    }

    toggle() {
        this.isEnabled = !this.isEnabled;
        console.log(`Debug camera ${this.isEnabled ? 'enabled' : 'disabled'}`);

        // Masquer/afficher les helpers
        const helpers = ['debugGrid', 'debugAxes', 'mainCameraHelper'];
        helpers.forEach(name => {
            const helper = this.scene.getObjectByName(name);
            if (helper) {
                helper.visible = this.isEnabled;
            }
        });
    }

    resetDebugCamera() {
        this.debugCamera.position.set(15, 10, 15);
        this.debugControls.target.set(0, 0, 0);
        this.debugControls.reset();
        this.debugControls.update();
        console.log("🔄 Debug camera reset to default position");
    }

    // Nouvelle méthode pour focus sur la caméra principale
    focusOnMainCamera() {
        const mainCamera = this.experience.camera.currentCamera;
        const distance = 5;

        // Calculer une position autour de la caméra principale
        const offset = new THREE.Vector3(3, 2, 3);
        this.debugCamera.position.copy(mainCamera.position).add(offset);

        // Focus sur la position de la caméra principale
        this.debugControls.target.copy(mainCamera.position);
        this.debugControls.update();

        console.log("🎯 Debug camera focused on main camera");
    }

    resize() {
        this.debugCamera.aspect = (this.sizes.width * this.debugViewport.width) / (this.sizes.height * this.debugViewport.height);
        this.debugCamera.updateProjectionMatrix();
    }

    dispose() {
        this.debugControls.dispose();

        // Nettoyer les helpers
        const helpers = ['debugGrid', 'debugAxes', 'mainCameraHelper'];
        helpers.forEach(name => {
            const helper = this.scene.getObjectByName(name);
            if (helper) {
                this.scene.remove(helper);
            }
        });

        // Nettoyer les event listeners
        const oldBorder = document.querySelector('.debug-border');
        if (oldBorder) oldBorder.remove();
    }
}