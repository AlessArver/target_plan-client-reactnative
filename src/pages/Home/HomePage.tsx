import React, { useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

import { TargetAddModal } from "../../components/TargetAddModal/TargetAddModal";
import { TargetModal } from "../../components/TargetModal/TargetModal";
import { TargetItem } from "./components/TargetItem";
import { Navbar } from "./components/Navbar";

export interface ITarget {
  id: string;
  months: number;
  title: string;
  images?: Array<{ id: string; src: string }>;
  price: string;
  description?: string;
  pros?: string[];
  minuses?: string[];
  created_at: Date;
}
export interface IUser {
  id: string;
  level: number;
  email: string;
}

export enum HomeModalTtypeEnum {
  SHOW = "SHOW",
  EDIT = "EDIT",
}

const userData: IUser = {
  id: "1",
  level: 6,
  email: "alessarver@gmail.com",
};
const targetsData: ITarget[] = [
  {
    id: "1",
    months: 4,
    title: "Iphone 13 pro",
    images: [
      {
        id: "1",
        src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652956000",
      },
      {
        id: "2",
        src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-blue-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652954000",
      },
      {
        id: "3",
        src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-silver-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652954000",
      },
    ],
    price: "100,000",
    description:
      "Я хочу купить айфон 13 про, чтобы хвастаться и чтобы Катя из 5Б стала со мной дружить.",
    pros: ["Все будут мне завидовать"],
    minuses: ["Родители не хотят мне его покупать"],
    created_at: new Date("2022-01-01T03:24:00"),
  },
  {
    id: "2",
    months: 2,
    title: "Iphone 13 pro",
    images: [
      {
        id: "1",
        src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652956000",
      },
      {
        id: "2",
        src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-blue-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652954000",
      },
      {
        id: "3",
        src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-silver-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652954000",
      },
    ],
    price: "100,000",
    description:
      "Я хочу купить айфон 13 про, чтобы хвастаться и чтобы Катя из 5Б стала со мной дружить.",
    pros: ["Все будут мне завидовать"],
    minuses: ["Родители не хотят мне его покупать"],
    created_at: new Date("2022-02-01T03:24:00"),
  },
];

export interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  const [user, setUser] = useState(userData);
  const [modalType, setModalType] = useState<HomeModalTtypeEnum | null>(null);
  const [currentTarget, setCurrentTarget] = useState<string | null>(null);
  const [targets, setTargets] = useState<ITarget[] | null>(targetsData);

  const handleChangeModalType = (value: HomeModalTtypeEnum | null) => () => {
    setModalType(value);
  };

  const handleSelectCurrentTarget = (value: string) => () => {
    setCurrentTarget(value);
    setModalType(HomeModalTtypeEnum.SHOW);
  };

  const handleCloseModal = () => {
    setCurrentTarget(null);
    setModalType(null);
  };

  const handleAddTarget = (data: ITarget) => {
    setTargets((prevArr) => {
      if (prevArr) {
        return [...prevArr, data];
      }
      return [data];
    });
  };

  const handleEditTarget = (data: ITarget) => {
    if (targets) {
      setTargets(
        targets?.map((t) => {
          if (t.id === currentTarget) {
            return data;
          }
          return t;
        })
      );
    }
  };

  return (
    <Wrapper>
      {modalType === HomeModalTtypeEnum.EDIT && (
        <TargetAddModal
          visible={modalType === HomeModalTtypeEnum.EDIT}
          onClose={handleCloseModal}
          onSave={currentTarget ? handleEditTarget : handleAddTarget}
          target={targets?.filter((t) => t.id === currentTarget)[0]}
        />
      )}
      <TargetModal
        visible={modalType === HomeModalTtypeEnum.SHOW}
        onEdit={handleChangeModalType(HomeModalTtypeEnum.EDIT)}
        onClose={handleCloseModal}
        {...targets?.filter((t) => t.id === currentTarget)[0]}
      />

      <Navbar level={user.level} />

      <Targets
        data={targets?.sort(
          (a, b) => b.created_at.getTime() - a.created_at.getTime()
        )}
        keyExtractor={(target: ITarget) => target.id}
        renderItem={({ item, index }: any) => (
          <TargetItem
            {...item}
            onOpenModal={handleSelectCurrentTarget(item.id)}
            isEven={index % 2 === 0}
          />
        )}
        style={{
          width: "100%",
        }}
        contentContainerStyle={{ ...styles.TargetsContainer, width: "100%" }}
      />
      <TagetButton onPress={handleChangeModalType(HomeModalTtypeEnum.EDIT)}>
        <TagetButtonText>Добавить цель</TagetButtonText>
      </TagetButton>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  padding: 0 10px 20px 10px;
  flex: 1;
  height: 100%;
  position: relative;
`;
const TagetButton = styled.Pressable`
  height: 50px;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-radius: 50;
  background-color: black;
`;
const TagetButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;
const Targets = styled.FlatList``;
const styles = StyleSheet.create({
  TargetsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
