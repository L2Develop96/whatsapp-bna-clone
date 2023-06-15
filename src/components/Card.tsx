import React from 'react';
import {
  CardBody,
  CardHeader,
  CardProps,
  Card as ChakraCard,
} from '@chakra-ui/react';

interface ICard extends CardProps {
  centerBody?: boolean;
  header?: string | React.ReactNode;
  children: React.ReactNode;
}

const centerBodyStyle = {
  display: 'flex',
  alignItems: 'center',
};

const Card: React.FC<ICard> = ({ header, children, centerBody, ...props }) => {
  return (
    <ChakraCard {...props}>
      {header && (
        <CardHeader display="flex" justifyContent="center" alignItems="center">
          {header}
        </CardHeader>
      )}
      <CardBody style={centerBody ? centerBodyStyle : {}}>{children}</CardBody>
    </ChakraCard>
  );
};

export default Card;
