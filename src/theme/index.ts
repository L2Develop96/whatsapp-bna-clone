import { extendTheme } from '@chakra-ui/react';
import { textStyles } from './components/text';

const theme = (): Record<string, unknown> => {
  return extendTheme(
    // components
    textStyles
  );
};

export default theme;
