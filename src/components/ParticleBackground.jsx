import { Box } from '@chakra-ui/react';

const ParticleBackground = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={0}
      overflow="hidden"
      bg="white"
    />
  );
};

export default ParticleBackground;