import { Box, HStack, VStack } from '@chakra-ui/react';
import ChatHeader from './components/ChatHeader';
import ChatContent from './components/ChatContent';
import SearchBar from './components/SearchBar';
import ChatList from './components/ChatList';

const Chat = () => {
  return (
    <HStack w="100%" h="100%" gap={0} alignItems={'flex-start'}>
      <VStack flex={0.3} bg="#111b21" h="100%">
        <ChatHeader />
        <SearchBar />
        <ChatList />
      </VStack>
      <Box
        flex={0.7}
        h="inherit"
        borderLeft="0.05em solid rgba(134,150,160,0.15)"
      >
        <ChatContent />
      </Box>
    </HStack>
  );
};

export default Chat;
