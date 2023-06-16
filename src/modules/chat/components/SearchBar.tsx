import { Box, HStack, Input } from '@chakra-ui/react';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as FilterIcon } from '../../../assets/icons/filter.svg';
import { quaternaryColor, secondaryColor } from '../../../utils/constant';

const SearchBar = () => {
  return (
    <HStack w="95%" gap={5}>
      <HStack bg={secondaryColor} borderRadius={8} flex={1} p={2}>
        <SearchIcon color={quaternaryColor} />
        <Input
          variant="unstyled"
          type="text"
          placeholder="Search or start new chat"
          color={quaternaryColor}
        />
      </HStack>
      <Box>
        <FilterIcon color={quaternaryColor} />
      </Box>
    </HStack>
  );
};

export default SearchBar;
