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
  styled,
} from '@chakra-ui/react';
import { useContext, useEffect, useMemo } from 'react';
import { chatActions } from '../../../helpers/actions';
import { AuthContext } from '../../../app/authContext';
import { ISession } from '../../../models/session';
import { SessionContext } from '../../../app/sessionContext';

const StyledListItem = styled(ChakraListItem, {
  baseStyle: {
    w: '100%',
    display: 'flex',
    _hover: {
      cursor: 'pointer',
      backgroundColor: '#202c33',
    },
  },
});

const ListItem = ({ session }: { session: ISession }): JSX.Element => {
  const { user } = useContext(AuthContext);
  const { setSession } = useContext(SessionContext);

  const latestMessage = useMemo(() => {
    return session?.messages
      ?.filter((msg) => msg?.senderId === user?.id)
      ?.at(-1);
  }, [session?.messages, user?.id]);

  const recipient = useMemo(() => {
    if (session?.user1?.id !== user?.id) {
      return session?.user1;
    }
    return session?.user2;
  }, [session?.user1, session?.user2, user?.id]);

  const setSessionHandler = async () => {
    const _getSelectedSession = await chatActions.getMessages(session?.id);
    setSession(_getSelectedSession);
  };
  console.log(session);
  return (
    <StyledListItem onClick={setSessionHandler}>
      <Center flex={1} px={2}>
        <Avatar
          src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${recipient?.fullName}`}
        />
        <VStack
          borderTop="0.05em solid rgba(134,150,160,0.15)"
          flex={1}
          alignItems="flex-start"
        >
          <Divider borderColor="rgba(134,150,160,0.15)" />
          <Box w="100%" p={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="18px">{recipient?.fullName}</Text>
              <Text mr={5}>
                {new Date(latestMessage?.date ?? '').toLocaleDateString()}
              </Text>
            </Flex>
            <Text>{latestMessage?.message}</Text>
          </Box>
        </VStack>
      </Center>
    </StyledListItem>
  );
};

const ChatList = () => {
  const { user } = useContext(AuthContext);
  const { sessionsList, setSessionsList } = useContext(SessionContext);
  useEffect(() => {
    const getSessions = () =>
      chatActions.getChats(user).then(
        (data) => {
          setSessionsList(data);
        },
        (err) => {
          console.log(err);
        }
      );
    getSessions();
  }, [setSessionsList, user]);
  return (
    <List
      display="flex"
      w="100%"
      flexDirection={'column'}
      alignItems={'start'}
      gap={3}
    >
      {sessionsList?.map((session, index) => (
        <ListItem key={index} session={session} />
      ))}
    </List>
  );
};

export default ChatList;
