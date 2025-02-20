import { Box, Container, Heading, Image, Text, VStack, Tag, HStack, LinkBox, LinkOverlay, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Works = () => {
  const project = {
    title: 'Software Engineer',
    description: 'July 2019 - Now',
    tags: ['Java', 'Salesforce', 'AWS'],
    link: '#'
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      as="section"
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      bg="transparent"
      py={16}
      overflow="hidden"
      position="relative"
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            as="h1"
            size={["xl", "2xl"]}
            mb={10}
            textAlign="center"
            color="black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            WORK
          </Heading>
          <LinkBox
            as={MotionBox}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              boxShadow: '2xl',
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
              }
            }}
            maxW="800px"
            mx="auto"
          >
            <VStack
              bg={cardBg}
              rounded="xl"
              overflow="hidden"
              shadow="lg"
              h="100%"
              align="stretch"
              position="relative"
              p={8}
              spacing={6}
            >
              <LinkOverlay href={project.link}>
                <Heading size="lg" color="black">
                  {project.title}
                </Heading>
              </LinkOverlay>
              <Text 
                color="black" 
                fontSize="lg" 
                lineHeight="tall" 
                fontWeight="medium"
                textDecoration="underline"
                textUnderlineOffset="4px"
              >
                Pactera APAC
              </Text>
              <Text color="black" fontSize="lg" lineHeight="tall">
                {project.description}
              </Text>
              <HStack spacing={2} mt={4} flexWrap="wrap">
                {project.tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 3,
                      transition: { 
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      } 
                    }}
                  >
                    <Tag
                      colorScheme="black"
                      size="md"
                      borderRadius="full"
                      px={4}
                      py={2}
                      bg="rgba(0, 0, 0, 0.8)"
                      color="white"
                      _hover={{
                        bg: "#000000",
                        transform: "translateY(-2px)",
                        boxShadow: "lg"
                      }}
                      transition="all 0.2s"
                    >
                      {tag}
                    </Tag>
                  </motion.div>
                ))}
              </HStack>
            </VStack>
          </LinkBox>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Works;