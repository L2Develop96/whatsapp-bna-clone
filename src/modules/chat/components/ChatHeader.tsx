import { Flex, HStack, Image } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../../app/context';
import { ReactComponent as UsersIcon } from '../../../assets/icons/users.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/more.svg';
import { ReactComponent as NewChatIcon } from '../../../assets/icons/new_chat.svg';
import { ReactComponent as StatusIcon } from '../../../assets/icons/status.svg';
import { quaternaryColor, secondaryColor } from '../../../utils/constant';

const ChatHeader = () => {
  const { user } = useContext(AuthContext);
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      px={4}
      alignItems="center"
      bg={secondaryColor}
    >
      <Image
        src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${user.username}`}
        w={16}
      />
      <Flex gap={4}>
        <UsersIcon color={quaternaryColor} />
        <StatusIcon color={quaternaryColor} />
        <NewChatIcon color={quaternaryColor} />
        <MoreIcon color={quaternaryColor} />
      </Flex>
    </HStack>
  );
};

export default ChatHeader;
