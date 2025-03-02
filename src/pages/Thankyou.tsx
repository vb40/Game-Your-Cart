import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/"); // Redirect to Home
    };

    return (
        <Box 
            minH="100vh" 
            bg="gray.900" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
        >
            <VStack 
                bg="gray.100" 
                p={10} 
                borderRadius="md" 
                textAlign="center" 
                boxShadow="lg"
            >
                <Heading fontSize="2xl" color="gray.800">Thank You for Using Our App!</Heading>
                <Button 
                    mt={4} 
                    colorScheme="blue" 
                    onClick={handleBackToHome} 
                    borderRadius="full"
                >
                    Back to Home
                </Button>
            </VStack>
        </Box>
    );
};

export default ThankYou;
