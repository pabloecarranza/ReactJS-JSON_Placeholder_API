import { useEffect, useState } from "react";
import { Container, Box, Center, Heading } from "@chakra-ui/react";
import { User } from "./components/User";
import { AddUser } from "./components/AddUser";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const addOn = async (name, email) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editOn = async (name, email, id) => {
    let found = users.find((user) => user.id === id);
    found.name = name;
    found.email = email;
  };

  return (
    <>
      <Container
        maxW="3xl"
        bg="blue.600"
        centerContent
        maxH="5xl"
        mt="20px"
        pb="20px"
        borderRadius="30px"
        boxShadow="dark-lg"
      >
        <Heading as="h3" size="lg" color="white" pt="10px">
          Wazuh Challenge / Pablo Carranza
        </Heading>

        <AddUser addOn={addOn} />

        <Box>
          {users.map((user) => (
            <User
              user={user}
              onDelete={onDelete}
              editOn={editOn}
              key={user.id}
            />
          ))}
        </Box>
      </Container>
      {!users.length && (
        <Center pt="10%">
          <Heading as="h4" size="md" color="blue.600" pb="10px">
            Cargando...
          </Heading>
        </Center>
      )}
    </>
  );
}

export default App;
