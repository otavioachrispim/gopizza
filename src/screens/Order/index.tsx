import React, { useState } from "react";
import { Platform } from "react-native";
import { ButtonBack } from "@src/components/ButtonBack";
import { RadioButton } from "@src/components/RadioButton";
import { PIZZA_TYPES } from "@utils/pizzaTypes";

import { Container, Header, Photo, Sizes } from "./styles";

export function Order() {
  const [size, setSize] = useState("");

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </Header>
      <Sizes>
        {PIZZA_TYPES.map((item) => (
          <RadioButton
            key={item.id}
            title={item.name}
            selected={size === item.id}
            onPress={() => setSize(item.id)}
          />
        ))}
      </Sizes>
      <Photo source={{ uri: "http://github.com/otaviochrispim.png" }} />
    </Container>
  );
}
