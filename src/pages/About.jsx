import { Box, Container, Heading, Text, VStack, Stack, Image, SimpleGrid, Tag, useColorModeValue, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTag = motion(Tag);
const MotionHeading = motion(Heading);

const About = () => {
  const skills = [
    { name: 'Java', proficiency: 90 },
    { name: 'Spring Boot', proficiency: 85 },
    { name: 'Docker', proficiency: 82 },
    { name: 'MySQL', proficiency: 88 },
    { name: 'Salesforce', proficiency: 85 },
    { name: 'Apex', proficiency: 80 },
    { name: 'LWC', proficiency: 85 },
    { name: 'AWS', proficiency: 78 }
  ];

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      as="section"
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      bg="transparent"
      py={[8, 16]}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box maxW="container.lg" mx="auto" mb={16} textAlign="center">
            <MotionHeading 
              as="h1" 
              size={["xl", "2xl"]} 
              mb={6}
              color="black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              ABOUT
            </MotionHeading>
            <Text 
              fontSize={["lg", "xl"]} 
              color="black" 
              mb={6} 
              lineHeight="tall"
              as={motion.p}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Hello, I'm a software engineer
            </Text>
          </Box>

          <Box w="full" mb={8}>
            <MotionHeading 
              as="h2" 
              size={["xl", "2xl"]} 
              mb={8} 
              textAlign="center"
              color="black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              SKILLS
            </MotionHeading>
            <VStack
              spacing={6}
              maxW="4xl"
              mx="auto"
              px={4}
              w="full"
            >
              {skills.map((skill, index) => (
                <MotionBox
                  key={skill.name}
                  w="full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Box mb={2}>
                    <Text color="black" fontWeight="medium">{skill.name}</Text>
                  </Box>
                  <Box
                    w="full"
                    h="4px"
                    bg="gray.200"
                    borderRadius="full"
                    overflow="hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ 
                        duration: 2.5, 
                        delay: index * 0.5,
                        ease: "easeInOut"
                      }}
                      style={{
                        height: '100%',
                        backgroundColor: 'black',
                        borderRadius: 'inherit'
                      }}
                    />
                  </Box>
                </MotionBox>
              ))}
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default About;