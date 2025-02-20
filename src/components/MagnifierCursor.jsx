import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useSpring } from 'framer-motion';

const MagnifierCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState([]);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      x.set(e.clientX - 3); // 减小偏移量
      y.set(e.clientY - 3);
      setIsVisible(true);
      
      // 更新拖尾效果，增加点的数量和更新频率
      setTrail(prev => [
        { x: e.clientX, y: e.clientY, timestamp: Date.now() },
        ...prev.slice(0, 12), // 增加拖尾点数量
      ]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return (
    <>
      {trail.map((point, index) => (
        <Box
          key={point.timestamp}
          as={motion.div}
          position="fixed"
          top={0}
          left={0}
          pointerEvents="none"
          zIndex={9998}
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0.2,
            x: point.x - 3,
            y: point.y - 3,
          }}
          transition={{ duration: 0.2 }} // 加快动画速度
        >
          <Box
            w="6px" // 减小拖尾点尺寸
            h="6px"
            borderRadius="full"
            position="relative"
            opacity={0.15 - (index * 0.01)} // 调整透明度衰减
            _before={{
              content: '""',
              position: 'absolute',
              inset: '0',
              borderRadius: 'full',
              background: 'black',
              filter: 'blur(0.3px)', // 减小模糊效果
              transform: 'scale(0.3)' // 调整黑点大小
            }}
          />
        </Box>
      ))}
      <Box
        as={motion.div}
        position="fixed"
        top={0}
        left={0}
        pointerEvents="none"
        zIndex={9999}
        style={{
          x,
          y,
          opacity: isVisible ? 1 : 0,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          duration: 0.2
        }}
      >
        <Box
          w="6px"
          h="6px"
          borderRadius="full"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            inset: '0',
            borderRadius: 'full',
            background: 'black',
            filter: 'blur(0.3px)',
            transform: 'scale(0.3)'
          }}
          _after={{
            content: '""',
            position: 'absolute',
            inset: '-1px',
            borderRadius: 'full',
            background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(0.8px)'
          }}
        />
      </Box>
    </>
  );
};

export default MagnifierCursor;