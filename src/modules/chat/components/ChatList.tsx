import {
  Avatar,
  Center,
  ListItem as ChakraListItem,
  Divider,
  List,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

const ListItem = (): JSX.Element => {
  return (
    <ChakraListItem w="100%" display="flex">
      <Center>
        <Avatar
          src={`https://api.dicebear.com/6.x/adventurer/svg?seed=hachem`}
        />
        <VStack gap={0}>
          <Text fontSize="18px">Hachem Ben Amor</Text>
          <Text>Hello bro how are you?</Text>
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
      gap={2}
    >
      <Divider />
      <ListItem />
    </List>
  );
};

export default ChatList;
