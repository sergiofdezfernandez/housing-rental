import { Heading,Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title> Housing rental - Inicio</title>
      </Head>
      <Heading>Bienvenido al portal de gestión de alquileres</Heading>
      <Text>
        En este portal se podrá gestionar todo el proceso burocratico de un
        alquiler
      </Text>
    </>
  );
}
