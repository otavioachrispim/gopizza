import { ButtonBack } from "@src/components/ButtonBack";
import { RadioButton } from "@src/components/RadioButton";
import React from "react";
import { Platform } from "react-native";

import { Container, Header, Photo, Sizes } from "./styles";

export function Order() {
  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header>
        <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
      </Header>
      <Sizes>
        <RadioButton title="Pequeno" selected={false} />
      </Sizes>
      <Photo source={{ uri: "http://github.com/otaviochrispim.png" }} />
    </Container>
  );
}
