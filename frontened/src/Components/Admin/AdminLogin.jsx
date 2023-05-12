
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Text,
    Stack,
    Flex,
    Image,
    Heading,
    Checkbox,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react-use-disclosure';
import { VscAccount }  from 'react-icons/vsc';
  import React, { useState }  from "react";
import UserSignup from './UserSignup';


function AdminLogin() {
  const toast = useToast()
    const [showPassword, setShowPassword] = useState(false);
const { isOpen, onOpen, onClose } = useDisclosure()

const email = React.useRef(null)
const password = React.useRef(null)
const handleSubmit=(e)=>{
  e.preventDefault();
  let q1=email.current.value;
  let q2=password.current.value
 
  const payload={email:q1,password:q2}
  fetch("https://odd-red-antelope-tux.cyclic.app/admin/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then((res)=>res.json())
        .then((res)=>{
          localStorage.setItem("token",res.token)
          toast({
            title: 'Login Successfull.',
            description: "You are logged in.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          console.log(res)        
        })
        .catch((err)=>console.log(err))
        
}

      
        return (
          <>
          <VscAccount onClick={onOpen} fontSize={"25px"} />
            <Modal
              initialFocusRef={email}
              finalFocusRef={password}
              isOpen={isOpen}
              onClose={onClose}
              size={"5xl"}
            >
              <ModalOverlay />
              <ModalContent >
              <Stack minH={'80vh'} w={"auto"} direction={{ base: 'column', md: 'row' }}>
              <Flex flex={1}>
        <Image 
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://www.ulcdn.net/media/subscription_popup/SPop-Up-Soiree-in-the-Sun.jpg?1682879431'
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Login to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input ref={email} type="email" />
          </FormControl>
          
          <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input  ref={password} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'orange.500'}>Forgot password?</Link>
            </Stack>
            <Button colorScheme={'orange'} variant={'solid'} onClick={handleSubmit}>
              Login
            </Button>
            <Stack pt={6}>
              <Text align={'center'} display={"flex"} m={"auto"}>
              Not an Admin? <Link color={'orange.400'}><UserSignup/> </Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      
    </Stack>
              </ModalContent>
            </Modal>
          </>
        )
      
}
export default AdminLogin