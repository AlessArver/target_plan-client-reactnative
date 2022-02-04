import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

export interface SettingsProps {
  visible: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ visible, onClose }) => {
  const handleClearData = () => {};

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <Wrapper>
        <Header>
          <HeaderIconWrapper onPress={onClose}>
            <HeaderIcon>x</HeaderIcon>
          </HeaderIconWrapper>
        </Header>
        <Content>
          <ContentItem onPress={handleClearData}>
            <ContentItemText>Очистить данные</ContentItemText>
          </ContentItem>
        </Content>
      </Wrapper>
    </Modal>
  );
};
const Wrapper = styled.View`
  padding: 20px 10px 20px 10px;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
const Header = styled.View`
  margin-bottom: 30px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;
const HeaderIconWrapper = styled.Pressable``;
const HeaderIcon = styled.Text`
  font-size: 40px;
`;
const Content = styled.View``;
const ContentItem = styled.Pressable`
  padding-bottom: 10px;
  border-bottom-color: black;
  border-bottom-width: 1px;
`;
const ContentItemText = styled.Text`
  font-weight: bold;
`;
