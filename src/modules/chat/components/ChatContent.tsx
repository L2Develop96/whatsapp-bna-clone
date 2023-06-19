import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ReactComponent as IntroLogo } from '../../../assets/icons/intro_logo.svg';
import { ReactComponent as MicIcon } from '../../../assets/icons/mic.svg';
import { ReactComponent as AttachmentIcon } from '../../../assets/icons/attachment.svg';
import { ReactComponent as EmojiIcon } from '../../../assets/icons/emoji.svg';
import {
  quaternaryColor,
  secondaryColor,
  tertiaryColor,
} from '../../../utils/constant';
import { useContext } from 'react';
import { SessionContext } from '../../../app/sessionContext';
import { ReactComponent as MoreIcon } from '../../../assets/icons/more.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as DiscussionArrow } from '../../../assets/icons/discussion_arrow.svg';
import ChatBg from '../../../assets/bg-chat.png';
import { AuthContext } from '../../../app/authContext';
import { User } from '../../../models/user';

const IntroComponent = (): JSX.Element => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={'center'}
      h="100%"
      flexDir="column"
      gap={5}
      borderBottom={`5px solid ${tertiaryColor}`}
      bg={secondaryColor}
    >
      <IntroLogo />
      <Heading size="lg" fontWeight="light" color={quaternaryColor}>
        WhatsApp Web
      </Heading>
      <Text textAlign="center" color={quaternaryColor} fontWeight="light">
        Send and receive messages without keeping your phone online. <br />
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.{' '}
      </Text>
    </Box>
  );
};

const SessionDiscussionHeader = ({
  sessionUser,
}: {
  sessionUser: User;
}): JSX.Element => {
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      px={4}
      alignItems="center"
      bg={secondaryColor}
    >
      <Flex alignItems="center">
        <Image
          src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${sessionUser?.fullName}`}
          w={16}
        />
        <Text>{sessionUser?.fullName}</Text>
      </Flex>
      <Flex gap={4}>
        <MoreIcon color={quaternaryColor} />
        <SearchIcon color={quaternaryColor} />
      </Flex>
    </HStack>
  );
};

const ChatBubble = ({
  message,
  time,
  isRightSide = true,
}: {
  message: string;
  time: string;
  isRightSide?: boolean;
}): JSX.Element => {
  return (
    <HStack
      bg={isRightSide ? tertiaryColor : secondaryColor}
      py={1}
      px={3}
      maxW="lg"
      borderRadius={8}
      style={
        isRightSide ? { borderTopRightRadius: 0 } : { borderTopLeftRadius: 0 }
      }
      pos="relative"
      alignSelf={isRightSide ? 'flex-end' : 'flex-start'}
      justifyContent={'space-between'}
    >
      <Box
        position="absolute"
        top={0}
        style={isRightSide ? { right: '-8px' } : { left: '-8px' }}
        w="8px"
        h="13px"
        display="block"
      >
        <DiscussionArrow
          style={{
            color: isRightSide ? '#005c4b' : '#222e35',
            transform: isRightSide ? 'scaleX(1)' : 'scaleX(-1)',
          }}
        />
      </Box>
      <Text>{message}</Text>
      <Text fontSize={11} color="#ffffffa1" mt={5}>
        {time}
      </Text>
    </HStack>
  );
};

const MessageInput = (): JSX.Element => {
  const onSubmit = () => {};
  return (
    <HStack w="100%" gap={5} bg={secondaryColor} p={2} px={5}>
      <EmojiIcon color={quaternaryColor} />
      <AttachmentIcon color={quaternaryColor} />
      <Input
        bg="#2a3942"
        p={2}
        variant="unstyled"
        type="text"
        placeholder="Type message"
        color={quaternaryColor}
        onKeyDown={}
      />
      <MicIcon color={quaternaryColor} />
    </HStack>
  );
};

const SessionDiscussion = (): JSX.Element => {
  const { session } = useContext(SessionContext);
  const { user } = useContext(AuthContext);
  const sessionUser =
    session?.user1?.id === user?.id ? session?.user2 : session?.user1;
  return (
    <VStack h="100%">
      <SessionDiscussionHeader sessionUser={sessionUser} />
      <VStack p={5} w="100%" h="100%" pos="relative">
        <Box
          top={0}
          bgImg={ChatBg}
          pos="absolute"
          h="100%"
          w="100%"
          opacity={0.06}
        >
          {/* <Image pos="absolute" src={ChatBg} top={0} /> */}
        </Box>
        {session?.messages?.map((msg) => (
          <ChatBubble
            key={msg?.id}
            message={msg?.message}
            time={msg?.date}
            isRightSide={msg?.senderId === sessionUser?.id}
          />
        ))}
      </VStack>
      <MessageInput />
    </VStack>
  );
};

const ChatContent = () => {
  const { session } = useContext(SessionContext);

  const isSessionEmpty = () => {
    return Object.keys(session)?.length === 0;
  };

  return isSessionEmpty() ? <IntroComponent /> : <SessionDiscussion />;
};

export default ChatContent;
