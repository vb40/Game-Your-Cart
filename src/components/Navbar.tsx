import { HStack, Image, Box, Spacer, IconButton, Badge, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import { useState } from "react";

interface Props {
  onSearch: (searchText: string) => void;
  cartCount: number; // Display cart count
}

const NavBar = ({ onSearch, cartCount }: Props) => {
  return (
    <HStack padding="10px" width="100%">
      {/* Logo */}
      <Image src={logo} boxSize="125px" />

      {/* Centered Larger Search Bar */}
      <Box flex="1" display="flex" justifyContent="center">
        <InputGroup width="70%"> {/* Increased width */}
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.500" />
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

      {/* Cart Icon & Dark Mode Switch */}
      <HStack spacing={6}>
        {/* Cart Icon with Badge */}
        <Box position="relative">
          <IconButton
            aria-label="Cart"
            icon={<FaShoppingCart size={26} />} // Larger & wider icon
            variant="ghost"
          />
          {cartCount > 0 && (
            <Badge 
              position="absolute" 
              top="0" 
              right="0" 
              colorScheme="pink" 
              borderRadius="full" 
              fontSize="sm"
              padding="3px 6px"
              bg="red.500" // Set badge color to red
              color="white" // Ensures visibility on dark mode
            >
              {cartCount}
            </Badge>
          )}
        </Box>

        {/* Dark Mode Switch */}
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
