import React, { useState } from "react";
import { Box, Button, Center, Input } from "@chakra-ui/react";

export const User = ({ user, onDelete, editOn }) => {
  const [editMode, setEditMode] = useState(false);
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

  const enableEditMode = () => {
    setEditMode(!editMode);
    setInput({
      name: user.name,
      email: user.email,
      id: user.id,
    });
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  const handleEdit = () => {
    editOn(input.name, input.email, input.id);
    setInput({
      name: "",
      email: "",
    });
    setEditMode(!editMode);
  };

  return (
    <Center h="30px" w="600px" color="white" justifyContent="space-between">
      {editMode ? (
        <>
          <Input
            variant="outline"
            placeholder="Name"
            type="name"
            size="sm"
            value={input.name}
            onChange={(e) => handleInputChange("name", e)}
            w="40%"
          />
          <Input
            variant="outline"
            placeholder="email"
            type="email"
            size="sm"
            value={input.email}
            w="40%"
            onChange={(e) => handleInputChange("email", e)}
          />
        </>
      ) : (
        <>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </>
      )}
      <Box>
        <Button onClick={enableEditMode} colorScheme="telegram" size="xs">
          Edit
        </Button>
        {editMode ? (
          <Button
            onClick={handleEdit}
            colorScheme="green"
            size="xs"
            pl="13px"
            pr="13px"
          >
            Save
          </Button>
        ) : (
          <Button onClick={handleDelete} colorScheme="red" size="xs">
            Delete
          </Button>
        )}
      </Box>
    </Center>
  );
};
