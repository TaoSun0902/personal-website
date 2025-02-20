import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Box } from '@chakra-ui/react';

const WaveBackground = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const geometryRef = useRef(null);
  const materialRef = useRef(null);
  const meshRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 初始化场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 设置相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1.5;
    cameraRef.current = camera;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 创建几何体
    const geometry = new THREE.PlaneGeometry(2, 2, 128, 128);
    geometryRef.current = geometry;

    // 创建材质
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          float dist = distance(uv, uMouse);
          pos.z += sin(dist * 10.0 - uTime) * 0.1;
          pos.z += sin(uv.x * 10.0 + uTime) * 0.1;
          pos.z += sin(uv.y * 8.0 - uTime) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        
        void main() {
          vec3 color1 = vec3(0.0, 0.0, 0.0);
          vec3 color2 = vec3(0.1, 0.1, 0.1);
          vec3 finalColor = mix(color1, color2, vUv.y);
          float alpha = 0.05 + 0.05 * sin(vUv.x * 10.0 + vUv.y * 8.0);
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
    });
    materialRef.current = material;

    // 创建网格
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // 处理鼠标移动
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      material.uniforms.uMouse.value.set(
        mouseRef.current.x * 0.5 + 0.5,
        mouseRef.current.y * 0.5 + 0.5
      );
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 处理窗口大小变化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 动画循环
    let animationFrameId;
    const animate = () => {
      material.uniforms.uTime.value += 0.01;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 清理函数
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={0}
      pointerEvents="none"
    />
  );
};

export default WaveBackground;