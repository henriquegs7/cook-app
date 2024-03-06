import { Text, Pressable, PressableProps, Image } from "react-native";

import { styles } from "./styles";

export type IngredientsProps = {
  id: string;
  name: string;
  image?: string;
  selected?: boolean;
};

export function Ingredient({
  id,
  name,
  image,
  selected = false,
  ...rest
}: IngredientsProps & PressableProps) {
  return (
    <Pressable style={[styles.container, selected && styles.selected]} key={id} {...rest}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
    </Pressable>
  );
}
