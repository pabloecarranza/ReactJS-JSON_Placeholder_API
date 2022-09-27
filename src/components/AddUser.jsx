import React, { useState } from "react";
import { Button, Center, Input } from "@chakra-ui/react";

export const AddUser = ({ addOn }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (type, event) => {
    if (type === "name") {
      setInput({
        ...input,
        name: event.target.value,
      });
    }
    if (type === "email") {
      setInput({
        ...input,
        email: event.target.value,
      });
    }
  };

  const handleOnSubmit = () => {
    addOn(input.name, input.email);
    setInput({
      name: "",
      email: "",
    });
  };

  return (
    <Center color="white" maxW="6xl" h="90px" w="60%" flexDir="column">
      Add new user
      <form>
        <Center pt="10px">
          <Input
            size="sm"
            variant="outline"
            placeholder="Name"
            type="name"
            value={input.name}
            mr="10px"
            onChange={(e) => handleInputChange("name", e)}
          />
          <Input
            size="sm"
            variant="outline"
            placeholder="Email"
            type="email"
            value={input.email}
            onChange={(e) => handleInputChange("email", e)}
          />
          <Button
            colorScheme="green"
            size="md"
            ml="10px"
            pl="30px"
            pr="30px"
            onClick={handleOnSubmit}
          >
            Add
          </Button>
        </Center>
      </form>
    </Center>
  );
};
