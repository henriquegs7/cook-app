import { ScrollView } from "react-native";
import { Ingredient, IngredientsProps } from "@/components/Ingredient";
import { services } from "@/services";

import { styles } from "./styles";

type Props = {
  ingredients: IngredientsProps[];
  selected?: string[];
  handleToggleSelected?: (value: string) => void;
  ingredientPage?: boolean;
};

export function Ingredients({
  ingredients,
  selected = [],
  handleToggleSelected = () => {},
  ingredientPage = false,
}: Props) {
  return (
    <ScrollView
      contentContainerStyle={[styles.container, ingredientPage && styles.ingredientPage]}
      showsVerticalScrollIndicator={false}
    >
      {ingredients.map(({ id, name, image }) => (
        <Ingredient
          id={id}
          name={name}
          image={`${services.storage.imagePath}/${image}`}
          selected={selected.includes(id)}
          onPress={() => handleToggleSelected(id)}
        />
      ))}
    </ScrollView>
  );
}
