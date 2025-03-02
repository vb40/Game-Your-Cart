import { Routes, Route } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import ThankYou from "./pages/ThankYou"; // ✅ Import Thank You page
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
  const [cart, setCart] = useState<{ [gameId: number]: number }>({});

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
          cartCount={Object.values(cart).reduce((total, count) => total + count, 0)}
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
        <Routes> {/* ✅ Use Routes here */}
          <Route path="/" element={
            <>
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
              <GameGrid 
                gameQuery={gameQuery} 
                cart={cart} 
              />
            </>
          } />
          
          <Route path="/thank-you" element={<ThankYou />} /> {/* ✅ Ensure Thank You page route exists */}
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
