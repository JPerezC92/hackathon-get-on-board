import React from "react";
import { Box, Container } from "@chakra-ui/react";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <Container
      maxWidth="container.xl"
      alignSelf="center"
      paddingX={5}
      bgPosition="center"
      bgRepeat="repeat"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box as={"main"}>{children}</Box>
    </Container>
  );
};

export default Layout;
