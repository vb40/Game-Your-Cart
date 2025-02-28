import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import { Platform } from "./hooks/useGames";
import { Genre } from "./hooks/useGenres";

export interface GameQuery { 
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [cart, setCart] = useState<{ [gameId: number]: number }>({}); // Store game counts

  // Function to handle adding to cart
  const handleAddToCart = (gameId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [gameId]: (prevCart[gameId] || 0) + 1,
    }));
  };

  // Function to handle removing from cart
  const handleRemoveFromCart = (gameId: number) => {
    setCart((prevCart) => {
      if (!prevCart[gameId]) return prevCart; // Prevent negative count
      const updatedCart = { ...prevCart, [gameId]: prevCart[gameId] - 1 };
      if (updatedCart[gameId] === 0) delete updatedCart[gameId]; // Remove game if count is 0
      return updatedCart;
    });
  };

  // Total items in cart
  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr'
      }}
    >
      {/* Navbar with Cart Count */}
      <GridItem area="nav">
        <NavBar 
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })} 
          cartCount={cartCount} // Pass total cart count to Navbar
        />
      </GridItem>

      {/* Sidebar for Genre Selection */}
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList 
            selectedGenre={gameQuery.genre} 
            onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })} 
          />
        </GridItem>
      </Show>

      {/* Main Content */}
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading gameQuery={gameQuery} />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector 
                selectedPlatform={gameQuery.platform} 
                onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })} 
              />
            </Box>
            <SortSelector 
              sortOrder={gameQuery.sortOrder} 
              onSelectSortOrder={(sortOrder) => setGameQuery({ ...gameQuery, sortOrder })} 
            />
          </Flex>
        </Box>

        {/* Pass cart state & update functions to GameGrid */}
        <GameGrid 
          gameQuery={gameQuery} 
          cart={cart} 
          onAddToCart={handleAddToCart} 
          onRemoveFromCart={handleRemoveFromCart} 
        />
      </GridItem>
    </Grid>
  );
}

export default App;

