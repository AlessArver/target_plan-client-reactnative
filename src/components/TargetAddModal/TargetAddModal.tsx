import React from "react";
import { StyleSheet, View } from "react-native";
import { useFormik } from "formik";
import styled from "styled-components/native";

import { ModalPopup } from "../../components/ModalPopup/ModalPopup";
import { ITarget } from "pages/Home/HomePage";
import { Carousel, ISide } from "../../components/Carousel/Carousel";
import { lowercaseKeys } from "../../utils/string";

enum TARGET_ADD_MODAL_NAMES {
  TITLE = "TITLE",
  MONTHS = "MONTHS",
  IMAGES = "IMAGES",
  PRICE = "PRICE",
  DESCRIPTION = "DESCRIPTION",
  PROS = "PROS",
  NEW_PPOS = "NEW_PPOS",
  MINUSES = "MINUSES",
  NEW_MINUSES = "NEW_MINUSES",
}

export interface TargetAddModalProps {
  visible: boolean;
  target?: Partial<ITarget>;
  onClose: () => void;
  onSave: (data: ITarget) => void;
}

export const TargetAddModal: React.FC<TargetAddModalProps> = ({
  visible,
  target,
  onClose,
  onSave,
}) => {
  const INITIAL_VALUES = {
    [TARGET_ADD_MODAL_NAMES.TITLE]: target?.title || "",
    [TARGET_ADD_MODAL_NAMES.MONTHS]: target?.months || "",
    [TARGET_ADD_MODAL_NAMES.IMAGES]: target?.images || [],
    [TARGET_ADD_MODAL_NAMES.PRICE]: target?.price || "",
    [TARGET_ADD_MODAL_NAMES.DESCRIPTION]: target?.description || "",
    [TARGET_ADD_MODAL_NAMES.PROS]: target?.pros || [],
    [TARGET_ADD_MODAL_NAMES.NEW_PPOS]: "",
    [TARGET_ADD_MODAL_NAMES.MINUSES]: target?.minuses || [],
    [TARGET_ADD_MODAL_NAMES.NEW_MINUSES]: "",
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: () => {},
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleAddPros = () => {};

  const handeRemoveCarouselSide = (id: string) => {
    formik.setFieldValue(
      TARGET_ADD_MODAL_NAMES.IMAGES,
      formik.values[TARGET_ADD_MODAL_NAMES.IMAGES].filter((i) => i.id !== id)
    );
  };

  const handeAddCarouselSide = (value: ISide) => {
    formik.setFieldValue(TARGET_ADD_MODAL_NAMES.IMAGES, [
      ...formik.values[TARGET_ADD_MODAL_NAMES.IMAGES],
      value,
    ]);
  };

  const handleSave = () => {
    const newData: ITarget = {
      ...lowercaseKeys(formik.values),
      id: `${new Date()}`,
      created_at: new Date(),
    };

    onSave(newData);
    handleClose();
  };

  return (
    <ModalPopup
      visible={visible}
      onClose={onClose}
      footerItems={[
        { title: "Отменить", func: handleClose },
        { title: "Сохранить", func: handleSave },
      ]}
    >
      <InputLarge
        onChangeText={formik.handleChange(TARGET_ADD_MODAL_NAMES.TITLE)}
        value={formik.values[TARGET_ADD_MODAL_NAMES.TITLE]}
        onBlur={formik.handleBlur(TARGET_ADD_MODAL_NAMES.TITLE)}
        placeholder="Название"
        style={styles.Input}
      />
      <Carousel
        images={formik.values[TARGET_ADD_MODAL_NAMES.IMAGES].map((i) => i)}
        isEdit
        style={styles.Carousel}
        onRemove={handeRemoveCarouselSide}
        onAdd={handeAddCarouselSide}
      />
      <Content>
        <ContentItem>
          <ContentTitle>Стоимость</ContentTitle>
          <InputMedium
            onChangeText={formik.handleChange(TARGET_ADD_MODAL_NAMES.PRICE)}
            value={formik.values[TARGET_ADD_MODAL_NAMES.PRICE]}
            onBlur={formik.handleBlur(TARGET_ADD_MODAL_NAMES.PRICE)}
            style={styles.Input}
          />
        </ContentItem>
        <ContentItem>
          <ContentTitle>Колич месяцев</ContentTitle>
          <InputMedium
            onChangeText={formik.handleChange(TARGET_ADD_MODAL_NAMES.MONTHS)}
            value={formik.values[TARGET_ADD_MODAL_NAMES.MONTHS]}
            onBlur={formik.handleBlur(TARGET_ADD_MODAL_NAMES.MONTHS)}
            style={styles.Input}
          />
        </ContentItem>
        <ContentItem>
          <WhyContent>
            <ContentTitle>Зачем мне это?</ContentTitle>
            <TextArea
              multiline={true}
              numberOfLines={3}
              onChangeText={formik.handleChange(
                TARGET_ADD_MODAL_NAMES.DESCRIPTION
              )}
              value={formik.values[TARGET_ADD_MODAL_NAMES.DESCRIPTION]}
              onBlur={formik.handleBlur(TARGET_ADD_MODAL_NAMES.DESCRIPTION)}
              style={styles.Input}
            />
          </WhyContent>
        </ContentItem>
        <ContentItem style={styles.ContentItemCol}>
          <ContentTitle>Плюсы</ContentTitle>
          {formik.values[TARGET_ADD_MODAL_NAMES.PROS].map((item, index) => (
            <Pros key={index}>
              <ProsText
                onChangeText={formik.handleChange(TARGET_ADD_MODAL_NAMES.PROS)}
                value={formik.values[TARGET_ADD_MODAL_NAMES.PROS]}
                onBlur={formik.handleBlur(TARGET_ADD_MODAL_NAMES.PROS)}
                style={styles.Input}
              />
            </Pros>
          ))}
          <Pros style={{ flex: 1 }}>
            <ProsText
              onChangeText={formik.handleChange(
                TARGET_ADD_MODAL_NAMES.NEW_PPOS
              )}
              value={formik.values[TARGET_ADD_MODAL_NAMES.NEW_PPOS]}
              onBlur={formik.handleBlur(TARGET_ADD_MODAL_NAMES.NEW_PPOS)}
              style={{ ...styles.Input, flex: 1 }}
            />
            <View>
              <ProsButton onPress={handleAddPros}>
                <ProsButtonText>+</ProsButtonText>
              </ProsButton>
            </View>
          </Pros>
        </ContentItem>
      </Content>
    </ModalPopup>
  );
};

const InputLarge = styled.TextInput`
  height: 50px;
  font-size: 24px;
  border-radius: 50px;
  &:placeholder {
  }
`;
const Content = styled.View`
  padding: 0 20px;
`;
const ContentItem = styled.View`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &:last-child {
    margin-bottom: 0;
  }
`;
const ContentTitle = styled.Text`
  margin-right: 10px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  color: white;
`;
const InputMedium = styled.TextInput`
  width: 100%;
  height: 40px;
  border-radius: 50px;
  font-size: 18;
`;
const WhyContent = styled.View`
  width: 100%;
`;
const TextArea = styled.TextInput`
  margin-top: 10px;
  width: 100%;
  border-radius: 20px;
  font-size: 18;
`;
const Pros = styled.View`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ProsText = styled.TextInput`
  margin: 0 10px;
  width: 100%;
  border-radius: 50px;
`;
const ProsButton = styled.Pressable`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: #fff;
`;
const ProsButtonText = styled.Text``;
const styles = StyleSheet.create({
  Carousel: {
    marginTop: 40,
    marginBottom: 40,
  },
  ContentItem_edit: {
    marginBottom: 15,
    alignItems: "center",
  },
  Input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "white",
    color: "white",
  },
  ContentItemCol: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  ProsListContainer: {
    width: "100%",
  },
});
