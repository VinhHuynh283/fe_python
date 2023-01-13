import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import React, { useState } from 'react'
import { FaUserAlt, FaLock } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login() {
    const navigate = useNavigate();
    const [account,setAccount]=useState({
        username:"",
        password:""
    })
    const handleShowClick = () => { 
        if (account.username =="admin123" && account.password=="admin123"){
            sessionStorage.setItem("isLogin",true)
            navigate("/")
        }
    }

  return (
      <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          backgroundColor="gray.200"
          justifyContent="center"
          alignItems="center"
      >
          <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
          >
              <Avatar bg="teal.500" />
              <Heading color="teal.400">YourApp :))</Heading>
              <Box minW={{ base: "90%", md: "468px" }}>
                  <form>
                      <Stack
                          spacing={4}
                          p="1rem"
                          backgroundColor="whiteAlpha.900"
                          boxShadow="md"
                      >
                          <FormControl>
                              <InputGroup>
                                  <InputLeftElement
                                      pointerEvents="none"
                                      children={<CFaUserAlt color="gray.300" />}
                                  />
                                  <Input type="email" placeholder="username" onChange={(e)=>{
                                    setAccount({
                                        ...account,
                                        username: e.target.value
                                    })
                                  }}/>
                              </InputGroup>
                          </FormControl>
                          <FormControl>
                              <InputGroup>
                                  <InputLeftElement
                                      pointerEvents="none"
                                      color="gray.300"
                                      children={<CFaLock color="gray.300" />}
                                  />
                                  <Input
                                      type={ "password"}
                                      placeholder="Password"
                                      onChange={(e) => {
                                          setAccount({
                                              ...account,
                                              password: e.target.value
                                          })
                                      }}
                                  />
                                  <InputRightElement width="4.5rem">
                                     
                                  </InputRightElement>
                              </InputGroup>
                              <FormHelperText textAlign="right">
                                  <Link>forgot password?</Link>
                              </FormHelperText>
                          </FormControl>
                          <Button
                              borderRadius={0}
                              type="submit"
                              variant="solid"
                              colorScheme="teal"
                              width="full"
                              onClick={handleShowClick}
                          >
                              Login
                          </Button>
                      </Stack>
                  </form>
              </Box>
          </Stack>
          <Box>
              New to us?{" "}
              <Link color="teal.500" href="#">
                  Sign Up
              </Link>
          </Box>
      </Flex>
  )
}
