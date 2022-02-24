import React, { useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { Search } from "@components/Search";
import { ProductCard, ProductProps } from "@components/ProductCard";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItensNumber,
  Title,
  NewProductButton,
} from "./styles";
import happyEmoji from "@assets/happy.png";
import { FlatList } from "react-native-gesture-handler";

export function Home() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta")
      );
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  function handleOpen(id: string) {
    navigation.navigate("product", { id });
  }

  function handleAdd() {
    navigation.navigate("product", {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>
        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItensNumber>{pizzas.length} pizzas</MenuItensNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      <NewProductButton
        title="Cadastrar Pizza"
        type="secondary"
        onPress={handleAdd}
      />
    </Container>
  );
}
