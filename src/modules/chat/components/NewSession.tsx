import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tag,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { User } from '../../../models/user';
import { chatActions, userActions } from '../../../helpers/actions';
import { AuthContext } from '../../../app/authContext';

const NewSession = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const { user } = useContext(AuthContext);
  const toast = useToast();
  useEffect(() => {
    const getUsers = () => {
      userActions.getUsersList(user?.id).then(
        (data) => {
          if (data?.length) {
            setUsersList(data);
          }
        },
        (err) => console.log(err)
      );
    };

    getUsers();
  }, [user?.id]);

  const createSession = (user2: User) => {
    chatActions
      .createSession(user2, user)
      .then((data) => {
        if (data) {
          toast({
            description: 'Session has been created successfully',
            status: 'success',
            duration: 1000,
          });
        }
      })
      .catch(() => {
        toast({
          description: 'Error has occurred',
          status: 'error',
          duration: 1000,
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody minH="100px">
          <HStack flexWrap="wrap">
            {usersList?.map((user) => (
              <Tag
                _hover={{
                  cursor: 'pointer',
                }}
                onClick={() => createSession(user)}
                key={user?.id}
              >
                {user?.fullName}
              </Tag>
            ))}
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewSession;
