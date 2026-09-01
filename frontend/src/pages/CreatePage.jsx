import { 
	Box, 
	Button, 
	Container, 
	FormControl, 
	FormLabel, 
	FormErrorMessage, 
	Heading, 
	Input, 
	useColorModeValue, 
	useToast, 
	VStack 
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useProductStore } from "../store/product";
  
  const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
	  name: "",
	  price: "",
	  image: "",
	});
	const [errors, setErrors] = useState({
	  name: false,
	  price: false,
	  image: false
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const toast = useToast();
  
	const { createProduct } = useProductStore();
  
	const validateForm = () => {
	  const newErrors = {
		name: !newProduct.name.trim(),
		price: !newProduct.price || isNaN(newProduct.price) || Number(newProduct.price) <= 0,
		image: !newProduct.image.trim()
	  };
	  setErrors(newErrors);
	  return !Object.values(newErrors).some(Boolean);
	};
  
	const handleInputChange = (e) => {
	  const { name, value } = e.target;
	  setNewProduct(prev => ({
		...prev,
		[name]: value
	  }));
	  // Clear error when user starts typing
	  if (errors[name]) {
		setErrors(prev => ({
		  ...prev,
		  [name]: false
		}));
	  }
	};
  
	const handleAddProduct = async () => {
	  if (!validateForm()) {
		toast({
		  title: "Validation Error",
		  description: "Please fill all fields correctly",
		  status: "error",
		  isClosable: true,
		});
		return;
	  }
  
	  setIsSubmitting(true);
	  try {
		const productToSend = {
		  ...newProduct,
		  price: Number(newProduct.price)
		};
  
		const { success, message } = await createProduct(productToSend);
		
		toast({
		  title: success ? "Success" : "Error",
		  description: message,
		  status: success ? "success" : "error",
		  isClosable: true,
		  duration: 5000,
		});
  
		if (success) {
		  setNewProduct({ name: "", price: "", image: "" });
		}
	  } catch (error) {
		toast({
		  title: "Network Error",
		  description: "Could not connect to server",
		  status: "error",
		  isClosable: true,
		});
	  } finally {
		setIsSubmitting(false);
	  }
	};
  
	return (
	  <Container maxW={"container.sm"} py={8}>
		<VStack spacing={8}>
		  <Heading as={"h1"} size={"xl"} textAlign={"center"}>
			Add New Product
		  </Heading>
  
		  <Box 
			w={"full"} 
			bg={useColorModeValue("white", "gray.800")} 
			p={6} 
			rounded={"lg"} 
			shadow={"md"}
		  >
			<VStack spacing={6}>
			  <FormControl isInvalid={errors.name}>
				<FormLabel>Product Name</FormLabel>
				<Input
				  placeholder="Enter product name"
				  name="name"
				  value={newProduct.name}
				  onChange={handleInputChange}
				  isDisabled={isSubmitting}
				/>
				{errors.name && (
				  <FormErrorMessage>Product name is required</FormErrorMessage>
				)}
			  </FormControl>
  
			  <FormControl isInvalid={errors.price}>
				<FormLabel>Price</FormLabel>
				<Input
				  placeholder="Enter price"
				  name="price"
				  type="number"
				  min="0"
				  step="0.01"
				  value={newProduct.price}
				  onChange={handleInputChange}
				  isDisabled={isSubmitting}
				/>
				{errors.price && (
				  <FormErrorMessage>
					{!newProduct.price ? "Price is required" : "Price must be a positive number"}
				  </FormErrorMessage>
				)}
			  </FormControl>
  
			  <FormControl isInvalid={errors.image}>
				<FormLabel>Image URL</FormLabel>
				<Input
				  placeholder="Enter image URL"
				  name="image"
				  value={newProduct.image}
				  onChange={handleInputChange}
				  isDisabled={isSubmitting}
				/>
				{errors.image && (
				  <FormErrorMessage>Image URL is required</FormErrorMessage>
				)}
			  </FormControl>
  
			  <Button
				colorScheme="blue"
				onClick={handleAddProduct}
				w="full"
				mt={4}
				isLoading={isSubmitting}
				loadingText="Submitting..."
				isDisabled={isSubmitting}
			  >
				Add Product
			  </Button>
			</VStack>
		  </Box>
		</VStack>
	  </Container>
	);
  };
  
  export default CreatePage;