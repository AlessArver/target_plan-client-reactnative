import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import { toggler } from "../../../utils/toggler";

import SetitngsIcon from "../../../assets/icons/settings.png";

import { Settings } from "../../../components/Settings/Settings";

export interface NavbarProps {
  level: number;
}

export const Navbar: React.FC<NavbarProps> = ({ level }) => {
  const isSettings = toggler();

  return (
    <Wrapper>
      <Settings visible={isSettings.value} onClose={isSettings.unSet} />
      <View style={{ width: 40, height: 40 }} />
      <Level>
        <LevelText>Level: {level}</LevelText>
      </Level>
      <IconWrapper onPress={isSettings.set}>
        <Icon source={SetitngsIcon} />
      </IconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Level = styled.View`
  padding: 10px 51px;
  height: 41px;
  background-color: #fff;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;
const LevelText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
`;
const IconWrapper = styled.Pressable`
  width: 40px;
  height: 40px;
`;
const Icon = styled.Image`
  width: 100%;
  height: 100%;
`;
