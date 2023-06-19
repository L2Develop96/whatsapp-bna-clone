import {
  Box,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../../app/authContext';
import { ReactComponent as UsersIcon } from '../../../assets/icons/users.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/more.svg';
import { ReactComponent as NewChatIcon } from '../../../assets/icons/new_chat.svg';
import { ReactComponent as StatusIcon } from '../../../assets/icons/status.svg';
import { quaternaryColor, secondaryColor } from '../../../utils/constant';
import NewSession from './NewSession';
import { User } from '../../../models/user';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {
  const { user, setUser, setAuthenticated } = useContext(AuthContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const logoutHandler = () => {
    setUser({} as User);
    setAuthenticated(false);
    navigate('/');
  };

  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      px={4}
      alignItems="center"
      bg={secondaryColor}
    >
      <Image
        src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${user.fullName}`}
        w={16}
      />
      <Flex gap={7} alignItems="center">
        <Box>
          <UsersIcon color={quaternaryColor} />
        </Box>
        <Box>
          <StatusIcon color={quaternaryColor} />
        </Box>
        <Tooltip label="New Chat">
          <Box _hover={{ cursor: 'pointer' }}>
            <NewChatIcon color={quaternaryColor} onClick={onOpen} />
          </Box>
        </Tooltip>
        <Menu>
          <MenuButton>
            <MoreIcon color={quaternaryColor} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <NewSession isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default ChatHeader;
