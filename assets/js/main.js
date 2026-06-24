/**
 * Premium Water Treatment & Purification Systems
 * Core Frontend JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Page Loader Handler
  initPageLoader();

  // 2. Navigation & Layout Actions
  initNavigation();

  // 3. Theme Manager (Dark/Light Mode)
  initThemeManager();

  // 4. Direction Manager (RTL/LTR)
  initDirectionManager();

  // 5. Statistics Counters (Intersection Observer)
  initStatsCounters();

  // 6. Interactive 3D Water Technology Experience (Three.js)
  initWebGL3DExperience();

  // 7. Form Validations
  initFormValidation();

  // 8. Premium Home 2 Special Interactive Modules
  initHome2Specials();
});

/**
 * 1. Page Loader Handler
 */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }, 500);
    });
    // Fallback if load event takes too long
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 3000);
  }
}

/**
 * 2. Navigation & Layout Actions
 */
function initNavigation() {
  const navbar = document.querySelector('.premium-navbar');
  const scrollTopBtn = document.getElementById('scroll-top');

  // Sticky Navbar & Scroll to Top visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('show');
    }
  });

  // Scroll to Top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active Menu Highlighting
  const currentPath = window.location.pathname;
  
  // Clear active state first
  document.querySelectorAll('.nav-link, .dropdown-item').forEach(el => {
    el.classList.remove('active');
  });

  let isHomeActive = false;
  let isSolutionsActive = false;
  let matchedOther = false;

  // Highlight specific dropdown item
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && href !== '#' && currentPath.includes(href)) {
      item.classList.add('active');
      if (href === 'index.html' || href === 'home2.html') {
        isHomeActive = true;
      }
      if (href === 'industrial.html' || href === 'municipal.html' || href === 'residential.html' || href === 'solutions.html') {
        isSolutionsActive = true;
      }
    }
  });

  // Also check standard nav-links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      if (currentPath.includes(href)) {
        if (href === 'solutions.html') {
          isSolutionsActive = true;
        } else {
          link.classList.add('active');
          matchedOther = true;
        }
      }
    }
  });

  // Special handler for technical details page (falls under Industrial Solutions)
  if (currentPath.includes('service-detail.html')) {
    isSolutionsActive = true;
    const industrialItem = Array.from(dropdownItems).find(item => item.getAttribute('href') === 'industrial.html');
    if (industrialItem) industrialItem.classList.add('active');
  }

  // Set active class on parent dropdowns
  const homeDropdown = document.getElementById('homeDropdown');
  const solutionsDropdown = document.getElementById('solutionsDropdown');

  if (currentPath.endsWith('/') || currentPath.includes('index.html') || currentPath.includes('home2.html') || isHomeActive) {
    if (homeDropdown) homeDropdown.classList.add('active');
  } else if (isSolutionsActive) {
    if (solutionsDropdown) solutionsDropdown.classList.add('active');
  } else if (!matchedOther) {
    // Default fallback to Home
    if (homeDropdown) homeDropdown.classList.add('active');
  }
}

/**
 * 3. Theme Manager (Dark/Light Mode)
 */
function initThemeManager() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
    
    // Dispatch custom event to notify WebGL scene
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: nextTheme } }));
  });
}

function updateThemeIcon(theme) {
  const themeToggles = document.querySelectorAll('#theme-toggle, button[onclick*="theme-toggle"]');
  themeToggles.forEach(toggle => {
    if (theme === 'dark') {
      toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      toggle.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      toggle.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  });
}

/**
 * 4. Direction Manager (RTL/LTR)
 */
function initDirectionManager() {
  const dirToggle = document.getElementById('dir-toggle');
  if (!dirToggle) return;

  const currentDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', currentDir);
  updateDirButton(currentDir);

  dirToggle.addEventListener('click', () => {
    const nextDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', nextDir);
    localStorage.setItem('dir', nextDir);
    updateDirButton(nextDir);
  });
}

function updateDirButton(dir) {
  const dirToggles = document.querySelectorAll('#dir-toggle, button[onclick*="dir-toggle"]');
  dirToggles.forEach(toggle => {
    toggle.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    toggle.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left to Right' : 'Switch to Right to Left');
  });
}

/**
 * 5. Statistics Counters (Intersection Observer)
 */
function initStatsCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0;
    const duration = 2000; // 2 seconds duration
    const stepTime = Math.max(Math.floor(duration / target), 15);
    
    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = current + suffix;
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * 6. Interactive 3D Water Technology Experience (Three.js)
 */
function initWebGL3DExperience() {
  const container = document.getElementById('webgl-canvas-container');
  if (!container) return;

  // Fallback check if Three.js is not loaded
  if (typeof THREE === 'undefined') {
    container.innerHTML = '<div class="text-muted text-center p-5">WebGL renderer initializing...</div>';
    return;
  }

  // Detect mobile device to disable heavy WebGL effects for performance
  const isMobile = window.innerWidth < 768;

  let scene, camera, renderer, particles, pipelineParticles, waterSurface, pipe;
  let mouse = { x: 0, y: 0 };
  let scrollPercent = 0;

  // Parameters
  const particleCount = isMobile ? 80 : 300;
  const flowParticleCount = isMobile ? 30 : 120;
  const pipelineRadius = 2.5;
  const pipelineHeight = 25;

  // Initialize Three.js
  scene = new THREE.Scene();
  
  // Set background color transparent so CSS themes flow under it
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  scene.fog = new THREE.FogExp2(isDark ? 0x030712 : 0xffffff, 0.015);

  // Camera settings
  camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 18);

  // Renderer settings
  renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x0284c7, 1.5);
  dirLight1.position.set(5, 10, 7);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1);
  dirLight2.position.set(-5, -5, 5);
  scene.add(dirLight2);

  // Object 1: Floating Molecular Particles System
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Distribute in a spherical/ellipsoid cloud
    particlePositions[i] = (Math.random() - 0.5) * 45;
    particlePositions[i + 1] = (Math.random() - 0.5) * 45;
    particlePositions[i + 2] = (Math.random() - 0.5) * 20;

    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02 + 0.005, // slow drifting upwards
      z: (Math.random() - 0.5) * 0.01
    });
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  
  // Custom round water particle texture
  const pMaterial = new THREE.PointsMaterial({
    color: isDark ? 0x38bdf8 : 0x0284c7,
    size: isMobile ? 0.25 : 0.45,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  particles = new THREE.Points(particleGeometry, pMaterial);
  scene.add(particles);

  // Object 2: Pipeline Water Flowing Simulation (rendered on index or service details if pipeline section)
  // Let's create a translucent vertical cylinder that acts as a filter column
  const pipeGeometry = new THREE.CylinderGeometry(pipelineRadius, pipelineRadius, pipelineHeight, 32, 1, true);
  const pipeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.15,
    roughness: 0.1,
    transmission: 0.8, // glass effect
    thickness: 1.5,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  
  pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
  pipe.position.set(5, -2, -5);
  scene.add(pipe);

  // Glow particles flowing inside the pipe
  const flowGeometry = new THREE.BufferGeometry();
  const flowPositions = new Float32Array(flowParticleCount * 3);
  const flowOffsets = [];

  for (let i = 0; i < flowParticleCount * 3; i += 3) {
    // Position within the cylinder
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * (pipelineRadius - 0.2);
    flowPositions[i] = pipe.position.x + Math.cos(angle) * r;
    flowPositions[i + 1] = pipe.position.y + (Math.random() - 0.5) * pipelineHeight;
    flowPositions[i + 2] = pipe.position.z + Math.sin(angle) * r;

    flowOffsets.push({
      speed: 0.05 + Math.random() * 0.08,
      r: r,
      angle: angle,
      rotSpeed: 0.01 + Math.random() * 0.02
    });
  }

  flowGeometry.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
  const flowMaterial = new THREE.PointsMaterial({
    color: 0x00f5ff,
    size: 0.2,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  pipelineParticles = new THREE.Points(flowGeometry, flowMaterial);
  scene.add(pipelineParticles);

  // Object 3: Realistic Water Surface Waves
  const waterGeometry = new THREE.PlaneGeometry(35, 35, isMobile ? 8 : 24, isMobile ? 8 : 24);
  const waterMaterial = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    metalness: 0.8,
    transparent: true,
    opacity: 0.35,
    wireframe: true // Minimalist tech line wave
  });
  waterSurface = new THREE.Mesh(waterGeometry, waterMaterial);
  waterSurface.rotation.x = -Math.PI / 2.2;
  waterSurface.position.set(0, -10, 0);
  scene.add(waterSurface);

  // Mouse move listener for magnetic cursor perspective shifts
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Scroll listener for cinematic camera transitions
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';
    scrollPercent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
  });

  // Track Theme Changes to update WebGL styles dynamically
  window.addEventListener('themeChanged', (e) => {
    const currentIsDark = e.detail.theme === 'dark';
    scene.fog.color.setHex(currentIsDark ? 0x030712 : 0xffffff);
    pMaterial.color.setHex(currentIsDark ? 0x38bdf8 : 0x0284c7);
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animate loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // 1. Particle Cloud drift & flow
    const posAttr = particles.geometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);

      // Apply velocity
      x += particleVelocities[i].x;
      y += particleVelocities[i].y;
      z += particleVelocities[i].z;

      // Wrap around screen boundaries
      if (y > 25) y = -25;
      if (x > 25) x = -25;
      if (x < -25) x = 25;

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;

    // 2. Flowing particles inside pipeline cylinder
    const flowAttr = pipelineParticles.geometry.attributes.position;
    for (let i = 0; i < flowParticleCount; i++) {
      let fy = flowAttr.getY(i);
      let offset = flowOffsets[i];
      
      // Move downward
      fy -= offset.speed;
      
      // Reset if it drops below the cylinder
      if (fy < pipe.position.y - pipelineHeight / 2) {
        fy = pipe.position.y + pipelineHeight / 2;
      }
      
      // Add a spiral rotation effect
      offset.angle += offset.rotSpeed;
      let fx = pipe.position.x + Math.cos(offset.angle) * offset.r;
      let fz = pipe.position.z + Math.sin(offset.angle) * offset.r;

      flowAttr.setXYZ(i, fx, fy, fz);
    }
    flowAttr.needsUpdate = true;

    // Rotate pipeline cylinder slowly
    pipe.rotation.y += 0.005;

    // 3. Fluid Wave Simulation
    const waterPos = waterSurface.geometry.attributes.position;
    for (let i = 0; i < waterPos.count; i++) {
      const u = waterPos.getX(i);
      const v = waterPos.getY(i);
      
      // Procedural sine waves simulating fluid mechanics
      const z = Math.sin(u * 0.15 + time * 1.2) * Math.cos(v * 0.15 + time * 1.0) * 1.5;
      waterPos.setZ(i, z);
    }
    waterPos.needsUpdate = true;

    // 4. Parallax Mouse & Scroll cinematic movement
    // Camera moves as you scroll downwards to reveal next sections
    const targetZ = 18 - scrollPercent * 14;
    const targetY = -scrollPercent * 12;
    const targetX = scrollPercent * 5;

    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.x += (targetX - camera.position.x) * 0.05;

    // Smooth cursor look-around (3D parallax mouse tilt)
    scene.rotation.y += (mouse.x * 0.15 - scene.rotation.y) * 0.05;
    scene.rotation.x += (-mouse.y * 0.15 - scene.rotation.x) * 0.05;

    renderer.render(scene, camera);
  }

  animate();
}

/**
 * 7. Form Validations
 */
function initFormValidation() {
  const forms = document.querySelectorAll('.premium-form');
  if (forms.length === 0) return;

  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');

    // Attach real-time validation on input changes or blur
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      let isFormValid = true;

      inputs.forEach(input => {
        const isValid = validateField(input);
        if (!isValid) isFormValid = false;
      });

      if (!isFormValid) {
        e.preventDefault();
        e.stopPropagation();
        
        // Find first invalid input and focus it
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
      } else {
        // Success behavior: mock submission
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending... <span class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>`;

        setTimeout(() => {
          // Display a premium custom success feedback
          form.innerHTML = `
            <div class="text-center p-5 animate__animated animate__fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <h3 class="mt-4 mb-2">Request Received Successfully</h3>
              <p class="text-muted mb-4">An engineering consultation expert will contact you shortly to review your technical specifications.</p>
              <button onclick="window.location.reload()" class="btn btn-premium btn-sm">Submit New Request</button>
            </div>
          `;
        }, 1500);
      }
    });
  });
}

function validateField(input) {
  const type = input.getAttribute('type');
  const required = input.hasAttribute('required');
  let isValid = true;
  let errorMsg = '';

  // Required Field Validator
  if (required && (!input.value || input.value.trim() === '')) {
    isValid = false;
    errorMsg = 'This field is required.';
  } else if (input.value && input.value.trim() !== '') {
    // Format Specific Validators
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        errorMsg = 'Please enter a valid email address.';
      }
    } else if (type === 'tel') {
      const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(input.value)) {
        isValid = false;
        errorMsg = 'Please enter a valid phone number.';
      }
    }
  }

  // Update classes and error messages
  const errorContainer = input.parentElement.querySelector('.invalid-feedback');
  
  if (!isValid) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    if (errorContainer) {
      errorContainer.textContent = errorMsg;
    } else {
      // Dynamically add feed back element if missing
      const feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      feedback.textContent = errorMsg;
      input.parentElement.appendChild(feedback);
    }
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    if (errorContainer) {
      errorContainer.textContent = '';
    }
  }

  return isValid;
}

/**
 * 8. Premium Home 2 Special Interactive Modules
 * Implements 3D tilting cards, circular scroll counters, and SVG schematics.
 */
function initHome2Specials() {
  // --- 3D Mouse Tilt Card Handler ---
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (-12 to 12 degrees)
      const rotateX = ((centerY - y) / centerY) * 12;
      const rotateY = ((x - centerX) / centerX) * 12;
      
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

  // --- SVG Technical Schematic Detail Visualizer ---
  const nodes = document.querySelectorAll('.schematic-interactive-node');
  const detailTitle = document.getElementById('schematic-detail-title');
  const detailDesc = document.getElementById('schematic-detail-desc');
  const detailSpec = document.getElementById('schematic-detail-spec');
  
  if (nodes.length > 0 && detailTitle && detailDesc) {
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        // Remove active class from all
        nodes.forEach(n => n.classList.remove('active'));
        // Add active class to clicked node
        node.classList.add('active');
        
        // Load details from attributes
        const title = node.getAttribute('data-title');
        const desc = node.getAttribute('data-desc');
        const spec = node.getAttribute('data-spec');
        
        detailTitle.textContent = title;
        detailDesc.textContent = desc;
        if (detailSpec) detailSpec.textContent = spec;
      });
    });
  }

  // --- Scroll Circular Gauges Animation ---
  const circles = document.querySelectorAll('.progress-circle-val');
  if (circles.length > 0) {
    const animateCircles = () => {
      circles.forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percent'), 10);
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        
        // Calculate offset matching percentage
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
      });
    };

    // Intersection Observer to trigger when visible
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCircles();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    // Observe the global impact section container
    const impactSection = document.getElementById('global-impact-section');
    if (impactSection) {
      observer.observe(impactSection);
    }
  }
}
