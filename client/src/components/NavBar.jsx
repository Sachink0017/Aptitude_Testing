import { Link as RouterLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '../context/userContext';
import { API_BASE_URL } from '../util.js';

import {
  Flex,
  Box,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  HStack,
  Button,
} from '@chakra-ui/react';

export default function NavBar() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signout`, {
        credentials: 'include',
      });

      const message = await res.json();

      toast.success(message);
      updateUser(null);
      navigate('/');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      w="100%"
      zIndex="1000"
      bg="rgba(3, 7, 26, 0.42)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid rgba(255, 255, 255, 0.04)"
      px={8}
      py={3}
    >
      <Flex alignItems="center" maxW="7xl" mx="auto" w="full">

        {/* Logo */}
        <Box mr={6} ml={2} h="60px" display="flex" alignItems="center">
          <Link as={RouterLink} to="/">
            <Image
              src="/AppLogo.png"
              alt="Logo"
              h="65px"
              objectFit="contain"
              cursor="pointer"
              transform="scale(1.8)"
              transformOrigin="left center"
            />
          </Link>
        </Box>

        {/* Center Menu */}
        <Flex flex={1} justify="center" align="center">
          <HStack spacing={10}>

            <Link
              as={RouterLink}
              to="/"
              fontSize="lg"
              fontWeight="semibold"
              color="gray.200"
              position="relative"
              _hover={{
                color: "white",
                textDecoration: "none",
                _after: { width: "100%" }
              }}
              _after={{
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                bottom: "-4px",
                left: "0",
                bg: "linear-gradient(to right, #7C3AED, #22D3EE)",
                transition: "0.3s",
              }}
            >
              Home
            </Link>

            <Link
              as={RouterLink}
              to="/test"
              fontSize="lg"
              fontWeight="semibold"
              color="gray.200"
              position="relative"
              _hover={{
                color: "white",
                textDecoration: "none",
                _after: { width: "100%" }
              }}
              _after={{
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                bottom: "-4px",
                left: "0",
                bg: "linear-gradient(to right, #7C3AED, #22D3EE)",
                transition: "0.3s",
              }}
            >
              Tests
            </Link>

            <Link
              as={RouterLink}
              to="/course"
              fontSize="lg"
              fontWeight="semibold"
              color="gray.200"
              position="relative"
              _hover={{
                color: "white",
                textDecoration: "none",
                _after: { width: "100%" }
              }}
              _after={{
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                bottom: "-4px",
                left: "0",
                bg: "linear-gradient(to right, #7C3AED, #22D3EE)",
                transition: "0.3s",
              }}
            >
              Courses
            </Link>

            <Link
              as={RouterLink}
              to="/demo"
              fontSize="lg"
              fontWeight="semibold"
              color="gray.200"
              position="relative"
              _hover={{
                color: "white",
                textDecoration: "none",
                _after: { width: "100%" }
              }}
              _after={{
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                bottom: "-4px",
                left: "0",
                bg: "linear-gradient(to right, #7C3AED, #22D3EE)",
                transition: "0.3s",
              }}
            >
              Demo
            </Link>

            {user ? (
              <Menu>
                <MenuButton>
                  <Image
                    boxSize="40px"
                    borderRadius="full"
                    src="#"
                    alt={user.username}
                    cursor="pointer"
                    border="2px solid rgba(255,255,255,0.2)"
                    _hover={{
                      transform: "scale(1.1)",
                    }}
                    transition="0.3s"
                  />
                </MenuButton>

                <MenuList
                  bg="rgba(15,23,42,0.9)"
                  backdropFilter="blur(10px)"
                  border="1px solid rgba(255,255,255,0.1)"
                  color="white"
                >
                  <MenuItem _hover={{ bg: "whiteAlpha.200" }} as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem _hover={{ bg: "whiteAlpha.200" }} as={RouterLink} to="/tasks">
                    Tasks
                  </MenuItem>
                  <MenuItem _hover={{ bg: "red.500" }} onClick={handleSignOut}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                as={RouterLink}
                to="/signup"
                px={6}
                py={5}
                borderRadius="full"
                bgGradient="linear(to-r, purple.500, cyan.400)"
                color="white"
                fontWeight="semibold"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.6)",
                }}
                transition="0.3s"
              >
                Signup
              </Button>
            )}

          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}























/// older 
// 11111
// <Box as='nav' bg='blue.500'>
        //     <Flex
        //         minWidth='max-content'
        //         alignItems='center'
        //         p='12px'
        //         maxW='7xl'
        //         m='0 auto'
        //     >
        //         <Box>
        //             <Link as={RouterLink} fontSize='lg' fontWeight='bold' to='/' >
        //                 Taskly
        //             </Link>
        //         </Box>

        //         <Flex flex={1} justify='flex-end' align='center'>
        //         <HStack spacing={6}>
        //         {/* Always visible menu items */}
        //         <Link as={RouterLink} to='/course' _hover={{ color: 'blue.200' }}>Course</Link>
        //         <Link as={RouterLink} to='/test' _hover={{ color: 'blue.200' }}>Test</Link>
        // //         <Box>
        //             {user ? (
        //                 <Menu>
        //                     <MenuButton>
        //                         <Image boxSize='40px'
        //                             borderRadius='full'
        //                             src='#'
        //                             alt={user.username}
        //                         />
        //                     </MenuButton>
        //                     <MenuList>
        //                         <MenuItem as={RouterLink} to='/profile'>Profile</MenuItem>
        //                         <MenuItem as={RouterLink} to='/tasks'>Tasks</MenuItem>
        //                         <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        //                     </MenuList>
        //                 </Menu>):(
        //                     <Button as={RouterLink} to='/signin' colorScheme='orange' variant='solid'>
                // Sign In
            //   </Button>

        //                 )}
        //         </Box>
        //     </Flex>
        // </Box>


////222222
//         <Box as='nav' bg='blue.500' px={6} py={3} color='white' shadow='md'>
//       <Flex alignItems='center' maxW='7xl' mx='auto' w='full'>
        
//         {/* Logo */}
//         <Box>
//           <Link as={RouterLink} fontSize='xl' fontWeight='bold' to='/'>
//             <Image
//              src="public/QuizNestLOGO.png"
//              alt="Example image"
//              boxSize="70px"           // small size
//           objectFit="contain"
//           cursor="pointer"
//             // objectFit="cover"
//     />
//           </Link>
//         </Box>

//         {/* Spacer to push menu items to the right */}
//         <Flex flex={1} justify='flex-end' align='center'>
//           <HStack spacing={10}>
//             {/* Always visible menu items */}
//             <Link as={RouterLink} to='/course' _hover={{ color: 'teal.200' }}>Courses</Link>
//             <Link as={RouterLink} to='/test' _hover={{ color: 'teal.200' }}>Tests</Link>
//             <Link as={RouterLink} to='/demo' _hover={{ color: 'teal.200' }}>Demo</Link>

//             {/* Conditional user menu / signin */}
//             {user ? (
//               <Menu>
//                 <MenuButton>
//                   <Image
//                     boxSize='40px'
//                     borderRadius='full'
//                     src='#'
//                     alt={user.username}
//                     cursor='pointer'
//                   />
//                 </MenuButton>
//                 <MenuList color='black'>
//                   <MenuItem as={RouterLink} to='/profile'>Profile</MenuItem>
//                   <MenuItem as={RouterLink} to='/tasks'>Tasks</MenuItem>
//                   <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
//                 </MenuList>
//               </Menu>
//             ) : (
//               <Button as={RouterLink} to='/signin' colorScheme='gray' variant='solid' _hover={{color:'teal.300'}}>
//                 Login
//               </Button>
//             )}
//           </HStack>
//         </Flex>
//       </Flex>
//     </Box>
//     );
// }