import React, { useState } from "react";
import { Platform } from "react-native";
import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import { PIZZA_TYPES } from "@utils/pizzaTypes";

import {
  Container,
  Header,
  Photo,
  Sizes,
  Form,
  Title,
  Label,
  InputGroup,
  FormRow,
  Price,
  ContentScroll,
} from "./styles";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Order() {
  const [size, setSize] = useState("");

  return (
    <ContentScroll>
      <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Header>
          <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
        </Header>

        <Photo source={{ uri: "http://github.com/otavioachrispim.png" }} />

        <Form>
          <Title>Nome da pizza</Title>
          <Label>Selecione um tamanho</Label>
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

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$60,00</Price>
          <Button title="Confirmar pedido" />
        </Form>
      </Container>
    </ContentScroll>
  );
}
