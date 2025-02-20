import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';
import ParticleBackground from './components/ParticleBackground';
import WaveBackground from './components/WaveBackground';
import MagnifierCursor from './components/MagnifierCursor';

function App() {
  const bgColor = useColorModeValue('transparent', 'transparent');
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const contactRef = useRef(null);

  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            setActiveSection(id);
          }
        });
      },
      {
        rootMargin: '-20% 0px',
        threshold: 0.3
      }
    );

    const sections = [homeRef, aboutRef, worksRef, contactRef];
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
    };
  }, []);

  return (
    <Box minH="100vh" overflow="hidden" position="relative">
      <MagnifierCursor />
      <ParticleBackground />
      <WaveBackground />
      <Box
        as="nav"
        position="fixed"
        right={0}
        top={0}
        h="auto"
        w="auto"
        bg={bgColor}
        px={6}
        py={4}
        zIndex={2}
      >
        <Flex
          direction="column"
          alignItems="flex-end"
          gap={2}
        >
          <Link
            onClick={() => scrollToSection(aboutRef)}
            fontSize="xs"
            fontWeight="light"
            textDecoration="underline"
            textUnderlineOffset="4px"
            color="black"
            _hover={{ color: '#8B0000', transform: 'scale(1.1)' }}
            cursor="pointer"
            transition="all 0.2s ease-in-out"
          >
            ABOUT
          </Link>
          <Link
            onClick={() => scrollToSection(worksRef)}
            fontSize="xs"
            fontWeight="light"
            textDecoration="underline"
            textUnderlineOffset="4px"
            color="black"
            _hover={{ color: '#8B0000', transform: 'scale(1.1)' }}
            cursor="pointer"
            transition="all 0.2s ease-in-out"
          >
            WORK
          </Link>
          <Link
            onClick={() => scrollToSection(contactRef)}
            fontSize="xs"
            fontWeight="light"
            textDecoration="underline"
            textUnderlineOffset="4px"
            color="black"
            _hover={{ color: '#8B0000', transform: 'scale(1.1)' }}
            cursor="pointer"
            transition="all 0.2s ease-in-out"
          >
            CONTACT
          </Link>
        </Flex>
      </Box>

      <Box
        as="main"
        h="100vh"
        overflowY="auto"
        sx={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        <Box 
          ref={homeRef} 
          data-section="home"
          minH="100vh" 
          style={{ 
            position: 'relative',
            opacity: activeSection === 'home' ? 1 : 0.3,
            transform: `translateY(${activeSection === 'home' ? 0 : '20px'})`,
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}>
          <Home />
        </Box>
        <Box 
          ref={aboutRef} 
          data-section="about"
          minH="100vh" 
          style={{ 
            position: 'relative',
            opacity: activeSection === 'about' ? 1 : 0.3,
            transform: `translateY(${activeSection === 'about' ? 0 : '20px'})`,
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}>
          <About />
        </Box>
        <Box 
          ref={worksRef} 
          data-section="works"
          minH="100vh" 
          style={{ 
            position: 'relative',
            opacity: activeSection === 'works' ? 1 : 0.3,
            transform: `translateY(${activeSection === 'works' ? 0 : '20px'})`,
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}>
          <Works />
        </Box>
        <Box 
          ref={contactRef} 
          data-section="contact"
          minH="100vh" 
          style={{ 
            position: 'relative',
            opacity: activeSection === 'contact' ? 1 : 0.3,
            transform: `translateY(${activeSection === 'contact' ? 0 : '20px'})`,
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}>
          <Contact />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
