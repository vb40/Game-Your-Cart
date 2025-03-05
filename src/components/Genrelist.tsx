import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();
  const selectedBg = useColorModeValue("blue.500", "blue.400"); 
  const hoverBg = useColorModeValue("gray.300", "gray.600"); 
  const defaultBg = useColorModeValue("gray.100", "gray.800"); 
  const textColor = useColorModeValue("black", "white"); 

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
      <>
          <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
              Genres
          </Heading>
          <List>
              {data.map((genre) => (
                  <ListItem key={genre.id} paddingY="5px">
                      <HStack>
                          <Image
                              boxSize="40px"
                              borderRadius={8}
                              objectFit="cover"
                              src={getCroppedImageUrl(genre.image_background)}
                          />
                          <Button
                              variant="ghost"
                              onClick={() => onSelectGenre(genre)} 
                              bg={selectedGenre?.id === genre.id ? selectedBg : defaultBg}
                              color={selectedGenre?.id === genre.id ? "white" : textColor}
                              width="100%"
                              textAlign="left"
                              justifyContent="flex-start"
                              borderRadius="lg"
                              boxShadow={selectedGenre?.id === genre.id ? "md" : "none"} 
                              _hover={{ bg: hoverBg, transition: "0.2s ease-in-out" }}
                              _focus={{ outline: "none" }} 
                          >
                              {genre.name}
                          </Button>
                      </HStack>
                  </ListItem>
              ))}
          </List>
      </>
  );
};

export default GenreList;
