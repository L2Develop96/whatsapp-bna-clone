import { Box, Heading, Text } from '@chakra-ui/react';
import { ReactComponent as IntroLogo } from '../../../assets/icons/intro_logo.svg';
import { quaternaryColor, tertiaryColor } from '../../../utils/constant';

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

const ChatContent = () => {
  return <IntroComponent />;
};

export default ChatContent;
