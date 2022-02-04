import React from "react";
import styled from "styled-components/native";
import { Modal, View } from "react-native";
import { StyleSheet } from "react-native";

export interface ModalProps {
  visible: boolean;
  footerItems?: Array<{ title: string; func: () => void }>;
  style?: any;
  contentStyle?: any;
  onClose: () => void;
}

export const ModalPopup: React.FC<ModalProps> = ({
  children,
  visible,
  onClose,
  footerItems,
  style,
  contentStyle,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      style={style}
    >
      <Wrapper>
        <ModalContainer
          contentContainerStyle={{
            ...styles.ModalContent,
            ...contentStyle,
          }}
        >
          <ModalChildren contentContainerStyle={styles.ModalChildrenContainer}>
            {children}
          </ModalChildren>
          <Footer>
            {footerItems?.map((f) => (
              <FooterItem key={f.title} onPress={f.func}>
                <FooterItemText>{f.title}</FooterItemText>
              </FooterItem>
            ))}
          </Footer>
        </ModalContainer>
        <ModalBackground onPress={onClose}>
          <View />
        </ModalBackground>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.View`
  width: 390px;
  position: relative;
  max-height: 600px;
  height: 100%;
  background-color: #000;
  border-radius: 50px;
  overflow: hidden;
  color: white;
  z-index: 101;
  flex: 1;
`;
const ModalChildren = styled.ScrollView`
  padding: 22px 22px 0px 22px;
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;
const ModalBackground = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 1;
  left: 1;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 100;
`;
const Footer = styled.View`
  width: 390px;
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #000;
`;
const FooterItem = styled.Pressable`
  margin-right: 40px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
`;
const FooterItemText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: white;
  text-transform: lowercase;
`;
const styles = StyleSheet.create({
  ModalContent: {
    height: "100%",
  },
  ModalChildrenContainer: {
    paddingBottom: 40,
  },
  FooterListContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
