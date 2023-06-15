import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from '@chakra-ui/react';
import Card from '../../components/Card';
import { primaryColor } from '../../utils/constant';

const Authentication = () => {
  return (
    <Box h="100%" display="flex" alignItems="center" justifyContent="center">
      <Card size="lg" minW="500px" minH="300px">
        <form>
          <VStack gap={5} mt={5}>
            <Heading size="md" color={primaryColor}>
              What's App Bro?
            </Heading>
            <FormControl isRequired>
              <FormLabel mb="8px">Username</FormLabel>
              <Input required placeholder="Username" size="sm" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mb="8px">Password</FormLabel>
              <Input
                type="password"
                required
                placeholder="Password"
                size="sm"
              />
            </FormControl>
            <Button>Submit</Button>
          </VStack>
        </form>
      </Card>
    </Box>
  );
};

export default Authentication;
