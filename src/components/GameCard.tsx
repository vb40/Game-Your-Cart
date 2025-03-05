import { Card, CardBody, Heading, HStack, Image, Text, Button, VStack } from "@chakra-ui/react";
import React from "react";
import { Game } from "../hooks/useGames";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
  count: number;
  onAddToCart: (gameId: number) => void;
  onRemoveFromCart: (gameId: number) => void;
}


const generatePrice = () => {
  const originalPrice = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
  const discount = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  const discountedPrice = Math.floor(originalPrice * (1 - discount / 100));
  return { originalPrice, discountedPrice };
};

const GameCard = ({ game, count, onAddToCart, onRemoveFromCart }: Props) => {
  const { originalPrice, discountedPrice } = generatePrice();

  return (
    <Card borderRadius="lg" overflow="hidden" boxShadow="xl" bg="gray.800" width="300px">
      <Image src={getCroppedImageUrl(game.background_image)} alt={game.name} objectFit="cover" height="200px" />
      <CardBody p={6}>
        {/* Platform Icons & Critic Score */}
        <HStack justifyContent="space-between">
          <PlatformIconList platforms={game.parent_platforms?.map(p => p.platform)} />
          <CriticScore score={game.metacritic} />
        </HStack>

        {/* Game Title */}
        <Heading fontSize="md" color="white" noOfLines={2}>
          {game.name}
        </Heading>

        {/* Pricing Section */}
        <VStack align="start" mt={3} spacing={1}>
          <HStack>
            <Text fontSize="sm" color="gray.400" textDecoration="line-through">₹{originalPrice}</Text>
            <Text fontSize="md" fontWeight="bold" color="green.300">₹{discountedPrice}</Text>
          </HStack>
        </VStack>

        {/* Add to Cart Section */}
        <HStack mt={3} justifyContent="center" width="100%">
          {count > 0 ? (
            // Show "-" Count "+" Buttons when item is in cart
            <HStack spacing={3}>
              <Button 
                size="sm" 
                colorScheme="red" 
                borderRadius="full" 
                onClick={() => onRemoveFromCart(game.id)} 
              >
                ➖
              </Button>

              <Text fontSize="md" fontWeight="bold">{count}</Text>

              <Button 
                size="sm" 
                colorScheme="green" 
                borderRadius="full" 
                onClick={() => onAddToCart(game.id)}
              >
                ➕
              </Button>
            </HStack>
          ) : (
            // Show "Add to Cart" button initially
            <Button 
              size="md" 
              colorScheme="blue" 
              borderRadius="full" 
              width="80%" 
              onClick={() => onAddToCart(game.id)}
            >
              Add to Cart
            </Button>
          )}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
