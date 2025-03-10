import { 
  HStack, Image, Box, IconButton, Badge, InputGroup, 
  InputLeftElement, Input, Menu, MenuButton, MenuList, MenuItem, Avatar, 
  Icon
} from "@chakra-ui/react";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";

interface Props {
  onSearch: (searchText: string) => void;
  cartCount: number;
}

const NavBar = ({ onSearch, cartCount }: Props) => {
  const navigate = useNavigate(); 

  const handleSignOut = () => {
    navigate("/thank-you"); 
  };

  return (
    <HStack padding="10px" width="100%" justifyContent="space-between">
      
      <Image 
        src={logo} 
        boxSize="125px" 
        cursor="pointer" 
        onClick={() => window.location.reload()} 
      />

      {/* Centered Search Bar */}
      <Box flex="1" display="flex" justifyContent="center">
        <InputGroup width="70%">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.500" />
          </InputLeftElement>
          <Input
            placeholder="Search games..."
            borderRadius="full"
            variant="filled"
            bg="gray.700"
            _focus={{ bg: "gray.600" }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </InputGroup>
      </Box>

      <HStack spacing={6}>
        <Box position="relative">
          <IconButton
            aria-label="Cart"
            icon={<Icon as={FaShoppingCart} />}
            variant="ghost"
          />
          {cartCount > 0 && (
            <Badge 
              position="absolute" 
              top="-5px" 
              right="-5px" 
              colorScheme="red" 
              borderRadius="full" 
              fontSize="sm"
              padding="4px 8px"
              bg="red.500"
              color="white"
            >
              {cartCount}
            </Badge>
          )}
        </Box>

        
        <Menu>
          <MenuButton as={IconButton} icon={<Avatar size="sm"><Icon as={FaUser} /></Avatar>} />
          <MenuList>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem> 
          </MenuList>
        </Menu>

        
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
