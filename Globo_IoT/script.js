import ThreeGlobe from 'https://esm.sh/three-globe?external=three';
import * as THREE from 'three';
import { TrackballControls } from 'https://esm.sh/three/examples/jsm/controls/TrackballControls.js';

// Global references for reset functionality
let globeReference = null;
let cameraReference = null;
let rendererReference = null;

// Load globe data from JSON file
let arcsData = [];
let pontosAdicionais = [];

async function loadGlobeData() {
  try {
    const response = await fetch('data/globe-data.json');
    if (!response.ok) throw new Error(`Failed to load: ${response.statusText}`);
    const data = await response.json();
    arcsData = data.arcsData;
    pontosAdicionais = data.pontosAdicionais;
    initializeGlobe();
  } catch (error) {
    console.error('Error loading globe data:', error);
  }
}

// Initialize globe after data is loaded
function initializeGlobe() {
  // Preparar os pontos de todos os locais
  const pointsData = arcsData.map(d => ({
    lat: d.endLat,
    lng: d.endLng,
    size: d.name === 'Lisbon' ? 0.25 : 0.2,
  color: d.name === 'Lisbon' ? '#ffffff' : '#0058E8'
})).concat(pontosAdicionais);

  // Labels
  const labelsData = arcsData.map(d => ({
    lat: d.endLat,
    lng: d.endLng,
    text: d.name,
    size: 0.001,
    color: 'gray',
    fontFace: 'Arial',
    labelDotRadius: 0.001,
    strokeColor: '#000000',
    strokeWidth: 0.0005
  }));

    // Cria o globo
  const Globe = new ThreeGlobe()
    .globeImageUrl('https://static.wixstatic.com/media/a6967f_cbed4d361eb14d93aff8dcb6ede40613~mv2.jpg')
    .bumpImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
    .arcsData(arcsData)
    .arcColor((d) => ['rgba(0,0,0,0)', d.color])
    .arcDashLength(0.4)
    .arcDashGap(4)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(1000)
    .arcStroke(0.5)
    .arcCurveResolution(256)
    .pointsData(pointsData)
    .pointAltitude(0)
    .pointColor('color')
    .pointRadius(0.3)
    .labelsData(labelsData)
    .labelColor('color')
    .labelAltitude(0.01)
    .labelSize('size')
    .labelDotRadius('labelDotRadius')
    .labelText('text')
    .labelResolution(3);

  // Store reference for reset functionality
  globeReference = Globe;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  document.getElementById('globeViz').appendChild(renderer.domElement);

  // Store reference
  rendererReference = renderer;

  // Scene
  const scene = new THREE.Scene();
  const gradientTexture = createRadialGradientTexture();
  scene.background = gradientTexture;
  scene.add(Globe);
  scene.add(new THREE.AmbientLight(0xffffff, Math.PI));
  scene.add(new THREE.DirectionalLight(0xf5f5f5, 4 * Math.PI));

  // Camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = -50;
  camera.position.y = 200;
  camera.position.z = 350;
  camera.rotation.x = THREE.MathUtils.degToRad(20);
  Globe.rotation.x = THREE.MathUtils.degToRad(-38.7223);
  Globe.rotation.y = THREE.MathUtils.degToRad(9.1393);

  // Store initial values for reset
  window.initialCameraPosition = { x: -50, y: 200, z: 350 };
  window.initialCameraRotation = { x: THREE.MathUtils.degToRad(20) };
  window.initialGlobeRotation = {
    x: THREE.MathUtils.degToRad(-5.667),
    y: THREE.MathUtils.degToRad(9.1393)
  };

  // Store reference for reset functionality
  cameraReference = camera;

  // Controls
  const tbControls = new TrackballControls(camera, renderer.domElement);
  tbControls.minDistance = 101;
  tbControls.rotateSpeed = 5;
  tbControls.zoomSpeed = 0.8;

  // Resize
  function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  const ROTATE_SPEED = -0.005;
  let isRotating = true;
  window.isGlobeRotating = isRotating;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    isRotating = window.isGlobeRotating;
    if (isRotating) {
      Globe.rotation.y += ROTATE_SPEED;
    }
    tbControls.update();
    renderer.render(scene, camera);
  }

  // Start animation
  animate();
  initializeChart();
}

// Create radial gradient texture (outside initializeGlobe to avoid re-creation)
function createRadialGradientTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0.5, size / 2, size / 2, size / 2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.Texture();
  texture.needsUpdate = true;
  return texture;
}

// Chart initialization
function initializeChart() {
  const ctx = document.getElementById('machineChart').getContext('2d');
  const data = {
    labels: ['EUROPA', 'AMÉRICA', 'ÁFRICA', 'ÁSIA', 'Oceânia'],
    datasets: [{
      data: [73.5, 17.9, 0.5, 7.1, 1.0],
      backgroundColor: [
        'rgba(128,128,128,0.8)',
        'rgba(211,211,211,0.8)',
        'rgba(255,255,255,0.8)',
        'rgba(80,80,80,0.8)',
        'rgba(49,47,49,0.8)'
      ],
      hoverBackgroundColor: [
        'rgba(153,153,153,1.0)',
        'rgba(255,255,255,1.0)',
        'rgba(204,204,204,1.0)',
        'rgba(102,102,102,1.0)'
      ],
      borderColor: 'rgba(255,255,255,0.2)',
      borderWidth: 1
    }]
  };
  const config = {
    type: 'pie',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (c) {
              let label = c.label || '';
              if (label) label += ': ';
              if (c.parsed !== null) {
                const total = c.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((c.parsed / total) * 100).toFixed(1);
                label += percentage + '%';
              }
              return label;
            }
          },
          bodyColor: '#333',
          titleColor: '#333',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderColor: '#888',
          borderWidth: 1
        }
      }
    }
  };
  new Chart(ctx, config);
}

// Play/Pause and Reset button logic
document.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.getElementById('playPauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const isRotatingBtn = window.isGlobeRotating;
      window.isGlobeRotating = !isRotatingBtn;
      playBtn.innerHTML = window.isGlobeRotating ? 'Pausar Rotação' : 'Iniciar Rotação';
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Reset globe rotation
      if (globeReference) {
        globeReference.rotation.x = window.initialGlobeRotation.x;
        globeReference.rotation.y = window.initialGlobeRotation.y;
        globeReference.rotation.z = 0;
      }
      // Reset camera position and rotation
      if (cameraReference) {
        cameraReference.position.x = window.initialCameraPosition.x;
        cameraReference.position.y = window.initialCameraPosition.y;
        cameraReference.position.z = window.initialCameraPosition.z;
        cameraReference.rotation.order = 'YXZ';
        cameraReference.rotation.x = 0;
        cameraReference.rotation.y = 0;
        cameraReference.rotation.z = 0;
        cameraReference.quaternion.setFromEuler(cameraReference.rotation);
        cameraReference.updateProjectionMatrix();
      }
      // Restart rotation
      window.isGlobeRotating = true;
      playBtn.innerHTML = 'Pausar Rotação';
    });
  }

  // --- Toggle slider: compute position & width so it visually hugs the checked label ---
  function updateToggleSlider() {
    const container = document.getElementById('toggle-container');
    if (!container) return;
    const slider = container.querySelector('.toggle-slider');
    if (!slider) return;
    // radios are outside the visual toggle container, so look for the checked input at document level
    const checkedInput = document.querySelector('.toggle-input:checked') || document.querySelector('.toggle-input');
    const input = checkedInput;
    if (!input) return;
    const label = container.querySelector(`label[for="${input.id}"]`);
    if (!label) return;
    const cRect = container.getBoundingClientRect();
    const lRect = label.getBoundingClientRect();
    const left = Math.max(0, lRect.left - cRect.left);
    const width = Math.max(0, lRect.width);
    // Apply a small horizontal inset so slider doesn't touch label edges
    const inset = 4;
    slider.style.left = `${Math.max(0, left + inset)}px`;
    slider.style.width = `${Math.max(0, width - inset * 2)}px`;
  }

  // Wire up events
  const toggleContainer = document.getElementById('toggle-container');
  if (toggleContainer) {
    const inputs = toggleContainer.querySelectorAll('.toggle-input');
    inputs.forEach(i => i.addEventListener('change', updateToggleSlider));
    window.addEventListener('resize', updateToggleSlider);
    // initial call after DOM paints
    setTimeout(updateToggleSlider, 50);
    requestAnimationFrame(() => setTimeout(updateToggleSlider, 120));
  }
});

// Load data and initialize globe
loadGlobeData();