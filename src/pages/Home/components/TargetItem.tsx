import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

import { ITarget } from "../HomePage";

export interface TargetItemProps extends ITarget {
  isEven: boolean;
  onOpenModal: () => void;
}

export const TargetItem: React.FC<TargetItemProps> = ({
  months,
  title,
  images,
  isEven,
  onOpenModal,
}) => {
  const isImages = images && images?.length > 0;

  let monthsArr: number[] = [];
  for (let i = 0; i < months; i++) {
    monthsArr = [...monthsArr, i];
  }

  return (
    <Wrapper>
      <TargetWrappper stye={{ flex: 1 }}>
        {!isEven ? (
          <TargetTitle style={{ textAlign: "left" }}>{title}</TargetTitle>
        ) : (
          <TargetTitleView />
        )}
        <Target onPress={onOpenModal}>
          {isImages && <Image source={{ uri: images[0].src }} />}
          {isImages && (
            <TargetImage source={{ uri: images[0].src }} resizeMode="cover" />
          )}
        </Target>
        {isEven ? <TargetTitle>{title}</TargetTitle> : <TargetTitleView />}
      </TargetWrappper>
      <Months>
        {monthsArr.map((_, index) => (
          <Month key={index} />
        ))}
      </Months>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  margin-bottom: 25px;
  width: 100%;
  align-items: center;
`;
const TargetWrappper = styled.View`
  margin-bottom: 25px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Target = styled.Pressable`
  margin: 0 20px;
  width: 115px;
  height: 115px;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 100px;
`;
const TargetImage = styled.ImageBackground`
  width: 60px;
  height: 60px;
  justify-content: center;
  border-radius: 10px;
`;
const TargetTitle = styled.Text`
  min-width: 100px;
  max-width: 200px;
  width: 100%;
  flex: 1;
`;
const TargetTitleView = styled.View`
  min-width: 100px;
  max-width: 200px;
  width: 100%;
  flex: 1;
`;
const Months = styled.View`
  align-items: center;
`;
const Month = styled.View`
  margin-bottom: 14px;
  width: 38px;
  height: 38px;
  background-color: black;
  border-radius: 50px;
`;
