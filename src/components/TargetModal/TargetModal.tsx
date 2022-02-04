import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

import { ModalPopup } from "../../components/ModalPopup/ModalPopup";
import { ITarget } from "pages/Home/HomePage";
import { Carousel } from "../../components/Carousel/Carousel";

export interface TargetModalProps extends Partial<ITarget> {
  visible: boolean;
  onEdit: () => void;
  onClose: () => void;
}
export const TargetModal: React.FC<TargetModalProps> = ({
  visible,
  title,
  months,
  price,
  images,
  description,
  pros,
  minuses,
  onEdit,
  onClose,
}) => {
  return (
    <ModalPopup
      visible={visible}
      onClose={onClose}
      footerItems={[{ title: "Редактировать", func: onEdit }]}
    >
      <TargetModalTitle>{title}</TargetModalTitle>
      <Carousel images={images?.map((i) => i)} style={styles.Carousel} />
      <ContentItem>
        <TargetModalTitle>Стоимость: {price}</TargetModalTitle>
      </ContentItem>
      <ContentItem>
        <TargetModalTitle>Колич месяцев: {months}</TargetModalTitle>
      </ContentItem>
      <ContentItem>
        <TargetModalTitle>Зачем мне это?</TargetModalTitle>
        <Description>{description}</Description>
      </ContentItem>
      <ContentItem>
        <TargetModalTitle>Плюсы</TargetModalTitle>
        {pros?.map((p, index) => (
          <ProsItem key={index}>+ {p}</ProsItem>
        ))}
      </ContentItem>
      <ContentItem>
        <TargetModalTitle>Минусы</TargetModalTitle>
        {minuses?.map((p, index) => (
          <ProsItem key={index}>+ {p}</ProsItem>
        ))}
      </ContentItem>
    </ModalPopup>
  );
};

const TargetModalTitle = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #fff;
`;
const ContentItem = styled.View`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`;
const Description = styled.Text`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #fff;
`;
const ProsItem = styled.Text`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #fff;
`;
const styles = StyleSheet.create({
  Carousel: {
    marginTop: 40,
    marginBottom: 40,
  },
});
