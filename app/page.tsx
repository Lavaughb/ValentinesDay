'use client';

import { useState, useEffect } from 'react';
import { Button, Title, Stack, Container, Paper, Text, Group, Transition } from '@mantine/core';
import { Heart, Images } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ValentinesDay() {
  const [noPos, setNoPos] = useState({ top: 'auto', left: 'auto' });
  const [isAccepted, setIsAccepted] = useState(false);
  const [showCollage, setShowCollage] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hardcoded image list for Static Export (GitHub Pages compatibility)
  const imageUrls = [
    '/img/999D55B9-CC1B-44E0-97F3-2F631A353AF8.jpg',
    '/img/3750416958892590058.jpg',
    '/img/FullSizeRender.jpg',
    '/img/FullSizeRender(1).jpg',
    '/img/IMG_1710.JPG',
    '/img/IMG_2007.jpg',
    '/img/IMG_2405.jpg',
    '/img/IMG_3035.jpg',
    '/img/IMG_4005.jpg',
    '/img/IMG_4088.jpg',
    '/img/IMG_4305.jpg',
    '/img/IMG_4786.jpg',
    '/img/IMG_4950.jpg',
    '/img/PXL_20250206_005144501.MP.jpg',
    '/img/PXL_20250224_173819619.MP.jpg',
    '/img/PXL_20250711_195929173.MP.jpg'
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleYes = () => {
    setIsAccepted(true);
    confetti({ 
      particleCount: 200, 
      spread: 100, 
      origin: { y: 0.6 },
      colors: ['#b01a1a', '#ff4d6d', '#ff85a1', '#ffffff'] 
    });
  };

  if (!mounted) return null;

  return (
    <main style={{ minHeight: '100vh', width: '100vw', position: 'relative' }}>
      {/* Background Heart - Controlled by globals.css */}
      <div className="bg-heart" />

      {/* Dynamic Image Collage Layer */}
      <Transition mounted={showCollage} transition="fade" duration={800}>
        {(styles) => (
          <div style={styles} className="collage-container">
            {imageUrls.map((url, i) => (
              <img 
                key={i} 
                src={url} 
                className="collage-item" 
                alt="Memory" 
                // Error handling in case a filename has a typo
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ))}
          </div>
        )}
      </Transition>

      <Container size="md" h="100vh" style={{ position: 'relative', zIndex: 10 }}>
        <Stack align="center" justify="center" h="100%">
          <Paper 
            shadow="xl" 
            p={60} 
            radius="xl" 
            withBorder 
            w="100%" 
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(15px)',
              borderWidth: '4px',
              borderColor: '#ffc9c9',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {isAccepted ? (
              <Stack align="center" gap="xl">
                <Heart size={100} fill="#b01a1a" color="#b01a1a" className="animate-pulse" />
                <Title order={1} ta="center" c="red.9" style={{ fontSize: '3.5rem', fontWeight: 900 }}>
                  I love you, Emma! ❤️
                </Title>
                
                <Button 
                  leftSection={<Images size={24} />}
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'red', deg: 45 }}
                  size="xl"
                  radius="md"
                  onClick={() => setShowCollage(!showCollage)}
                  className="hover-scale"
                  style={{ height: '60px', fontSize: '1.2rem' }}
                >
                  {showCollage ? "Back to Heart" : "See Our Memories"}
                </Button>
              </Stack>
            ) : (
              <Stack align="center" gap={50}>
                <Title 
                  order={1} 
                  ta="center" 
                  c="red.9" 
                  style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1 }}
                >
                  Emma, Will You Be My Valentine?
                </Title>
                
                <Group justify="center" gap="xl" w="100%">
                  <Button 
                    size="xl" 
                    color="red.9" 
                    radius="md" 
                    onClick={handleYes} 
                    px={60} 
                    style={{ height: '70px', fontSize: '1.8rem' }}
                  >
                    Yes!
                  </Button>

                  <Button 
                    variant="filled" 
                    color="gray.8" 
                    size="xl" 
                    radius="md"
                    onMouseEnter={() => setNoPos({ 
                      top: `${Math.random() * 80}%`, 
                      left: `${Math.random() * 80}%` 
                    })}
                    style={{ 
                      position: noPos.top === 'auto' ? 'static' : 'fixed',
                      top: noPos.top, 
                      left: noPos.left,
                      transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                      height: '70px', 
                      fontSize: '1.5rem',
                      zIndex: 1000 
                    }}
                  >
                    No
                  </Button>
                </Group>
              </Stack>
            )}
          </Paper>
        </Stack>
      </Container>
    </main>
  );
}