import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'I CAN DO\nALL THINGS';
  const controls = useAnimation();

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      as="section"
      h="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      overflow="hidden"
    >
      <Container maxW="container.lg" position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VStack spacing={8} color="black" textAlign="center" h="full" justifyContent="center" position="relative">
            <MotionHeading
              as="h1"
              fontSize={["5xl", "6xl", "7xl"]}
              fontWeight="bold"
              letterSpacing="tight"
              lineHeight="1.2"
              color="black"
              whiteSpace="pre-line"
              mb={16}
            >
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                display="inline-block"
                marginLeft="2px"
                color="black"
              >
                |
              </motion.span>
            </MotionHeading>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Home;