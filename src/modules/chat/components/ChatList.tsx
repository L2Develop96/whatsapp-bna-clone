import {
  Avatar,
  Box,
  Center,
  ListItem as ChakraListItem,
  Divider,
  Flex,
  List,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../../app/context';

const ListItem = (): JSX.Element => {
  return (
    <ChakraListItem w="100%" display="flex">
      <Center flex={1}>
        <Avatar
          src={`https://api.dicebear.com/6.x/adventurer/svg?seed=hachem`}
        />
        <VStack
          borderTop="0.05em solid rgba(134,150,160,0.15)"
          flex={1}
          alignItems="flex-start"
        >
          <Divider borderColor="rgba(134,150,160,0.15)" />
          <Box w="100%">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="18px">Hachem Ben Amor</Text>
              <Text mr={5}>Tuesday</Text>
            </Flex>
            <Text>Hello bro how are you?</Text>
          </Box>
        </VStack>
      </Center>
    </ChakraListItem>
  );
};

const ChatList = () => {
  return (
    <List
      display="flex"
      w="100%"
      flexDirection={'column'}
      alignItems={'start'}
      gap={3}
    >
      <ListItem />
    </List>
  );
};

export default ChatList;
