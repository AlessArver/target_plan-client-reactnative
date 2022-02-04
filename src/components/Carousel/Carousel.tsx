import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

import styled from "styled-components/native";

import ArrowRightIcon from "../../assets/icons/right-arrow.png";

export interface ISide {
  id: string;
  src: string;
}
export interface CarouselProps {
  images?: ISide[];
  isEdit?: boolean;
  style?: any;
  onRemove?: (id: string) => void;
  onAdd?: (value: ISide) => void;
}

export const Carousel: React.FC<CarouselProps> = ({
  images: imagesData,
  isEdit,
  style,
  onRemove,
  onAdd,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState(imagesData);
  const isImages = images && images?.length > 0;

  const slideTo = () => {
    if (images) {
      if (currentImage < images.length - 1) {
        setCurrentImage(currentImage + 1);
      } else {
        setCurrentImage(0);
      }
    }
  };

  const slideBefore = () => {
    if (images) {
      if (currentImage > 0 && currentImage <= images.length - 1) {
        setCurrentImage(currentImage - 1);
      } else {
        setCurrentImage(images.length - 1);
      }
    }
  };

  const onUploadImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled && onAdd) {
      const newImage = { id: `${new Date()}`, src: result.uri };

      if (images) {
        setImages([...images, newImage]);
      } else {
        setImages([newImage]);
      }
      onAdd(newImage);
    }
  };

  const onRemoveImage = () => {
    const filteredImages = images?.filter((i) => i !== images[currentImage]);
    setImages(filteredImages);
    if (images && onRemove) {
      onRemove(images[currentImage].id);
    }
    setCurrentImage(0);
  };

  return (
    <Wrapper style={style}>
      {isImages && (
        <Pressable onPress={slideBefore} style={styles.Arrow}>
          <ArrowIconWrapper style={styles.ArrowLeftIcon}>
            <Image source={ArrowRightIcon} style={styles.ArrowIcon} />
          </ArrowIconWrapper>
        </Pressable>
      )}

      {isImages && (
        <Slide source={{ uri: images[currentImage].src }}>
          {isEdit && (
            <Pressable
              onPress={onRemoveImage}
              style={[
                styles.Arrow,
                {
                  height: 30,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 0,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                },
              ]}
            >
              <ArrowAddText>x</ArrowAddText>
            </Pressable>
          )}
        </Slide>
      )}

      {isEdit && (
        <ArrowAdd onPress={onUploadImages} style={styles.Arrow}>
          <ArrowAddText>+</ArrowAddText>
        </ArrowAdd>
      )}

      {isImages && (
        <Pressable onPress={slideTo} style={styles.Arrow}>
          <ArrowIconWrapper>
            <Image source={ArrowRightIcon} style={styles.ArrowIcon} />
          </ArrowIconWrapper>
        </Pressable>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;
const ArrowIconWrapper = styled.View`
  width: 20px;
  height: 20px;
`;
const ArrowAdd = styled.Pressable`
  position: absolute;
  bottom: -19;
  left: 45%;
`;
const ArrowAddText = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;
const Slide = styled.ImageBackground`
  margin: 0 16px;
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
`;
const styles = StyleSheet.create({
  ArrowLeftIcon: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  ArrowIcon: {
    width: "100%",
    height: "100%",
  },
  Arrow: {
    width: 38,
    height: 38,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
  },
});
