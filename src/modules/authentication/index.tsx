import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import Card from '../../components/Card';
import { API_ENDPOINT, primaryColor } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../app/context';

const Authentication = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isError, setIsError] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { setUser, setAuthenticated } = useContext(AuthContext);

  const onLogin = async (): Promise<void> => {
    if (!usernameRef.current || !passwordRef.current) return;

    if (
      usernameRef.current?.value.trim() === '' ||
      passwordRef.current?.value.trim() === ''
    ) {
      setIsError(true);
      return;
    }
    isError && setIsError(false);

    try {
      const res = await fetch(`${API_ENDPOINT}/users.json`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      const data = await res.json();
      for (const userId in data) {
        if (
          data[userId].username === usernameRef.current?.value.trim() &&
          data[userId].password === passwordRef.current?.value.trim()
        ) {
          toast({
            title: 'Logged In Successfully',
            status: 'success',
            duration: 1000,
          });
          usernameRef.current.value = '';
          passwordRef.current.value = '';
          setAuthenticated(true);
          setUser({
            id: userId,
            username: data[userId].username,
            email: data[userId].email,
            fullName: data[userId].fullName,
          });
          navigateTo('chat');
          return;
        }
      }
      toast({
        title: 'Invalid Credentials',
        status: 'error',
        duration: 1000,
      });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  };

  const navigateTo = (path: 'sign-up' | 'chat'): void => {
    navigate(`/${path}`);
  };
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
              <Input
                ref={usernameRef}
                required
                placeholder="Username"
                size="sm"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mb="8px">Password</FormLabel>
              <Input
                ref={passwordRef}
                type="password"
                required
                placeholder="Password"
                size="sm"
              />
            </FormControl>
            <Button onClick={onLogin}>Submit</Button>
          </VStack>
        </form>
      </Card>
    </Box>
  );
};

export default Authentication;
