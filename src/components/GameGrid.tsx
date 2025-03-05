import { SimpleGrid, Text, Spinner, Center } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
  gameQuery: GameQuery;
  cart: { [gameId: number]: number };
  onAddToCart: (gameId: number) => void;
  onRemoveFromCart: (gameId: number) => void;
}

const GameGrid = ({ gameQuery, cart, onAddToCart, onRemoveFromCart }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding="10px" spacing={6}>
      
      {/* Show Spinner when loading */}
      {isLoading && (
        <Center width="100%">
          <Spinner size="xl" color="blue.500" thickness="4px" speed="0.7s" />
        </Center>
      )}

      {isLoading &&
        skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}

      {!isLoading && data.length > 0 ? (
        data.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard 
              game={game} 
              count={cart[game.id] || 0} 
              onAddToCart={onAddToCart} 
              onRemoveFromCart={onRemoveFromCart} 
            />
          </GameCardContainer>
        ))
      ) : (
        !isLoading && <Text color="gray.400" textAlign="center" width="100%">No games found.</Text>
      )}
      
    </SimpleGrid>
  );
};

export default GameGrid;
