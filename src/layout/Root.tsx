import { Box, Container, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { primaryColor } from '../utils/constant';

const RootLayout = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Box as="main" display="flex" flex="1" bg={primaryColor} p={5}>
        <Container maxW="8xl">
          <Outlet />
        </Container>
      </Box>
    </Flex>
  );
};
export default RootLayout;
