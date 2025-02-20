import { Box, Container, Heading, HStack, Icon, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const MotionBox = motion(Box);

const Contact = () => {
  const contactInfo = [
    {
      id: 1,
      icon: FaGithub,
      link: 'https://github.com/TaoSun0902'
    },
    {
      id: 2,
      icon: FaLinkedin,
      link: 'https://www.linkedin.com/in/涛-孙-338779288/'
    },
    {
      id: 3,
      icon: FaEnvelope,
      link: 'mailto:suntao0902@outlook.com'
    }
  ];

  return (
    <Box
      as="section"
      minH="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="transparent"
      overflow="hidden"
      position="relative"
    >
      <Container
        maxW="container.xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex={1}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading 
            as="h1" 
            size={["xl", "2xl"]}
            color="black"
            mb={6}
            textAlign="center"
          >
            CONTACT
          </Heading>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading
              as="h2"
              size="md"
              color="black"
              mb={12}
              textAlign="center"
              fontWeight="normal"
            >
              ☕ Let's Chat Over a Virtual Coffee!
            </Heading>
          </motion.div>
          <HStack spacing={12} justify="center">
            {contactInfo.map((contact) => (
              <motion.div
                key={contact.id}
                whileHover={{ 
                  scale: 1.2,
                  transition: { duration: 0.2 }
                }}
              >
                <Link
                  href={contact.link}
                  isExternal
                >
                  <Icon 
                    as={contact.icon} 
                    boxSize={8} 
                    color="black"
                    _hover={{ color: '#8B0000' }}
                    transition="color 0.2s"
                  />
                </Link>
              </motion.div>
            ))}
          </HStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Contact;