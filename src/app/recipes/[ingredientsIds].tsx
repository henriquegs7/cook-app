import { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Ingredients } from "@/components/Ingredients";
import { Recipe } from "@/components/Recipe";
import { services } from "@/services";

import { styles } from "./styles";

export default function Recipes() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

  const params = useLocalSearchParams<{ ingredientsIds: string }>();
  const ingredientsIds = params.ingredientsIds.split(",");

  useEffect(() => {
    services.ingredients.findByIds(ingredientsIds).then(setIngredients);
  }, []);

  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={32} onPress={() => router.back()} />
        <Text style={styles.title}>Ingredientes</Text>
      </View>

      <Ingredients ingredients={ingredients} ingredientPage />

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Recipe recipe={item} onPress={() => router.navigate("/recipe/" + item.id)} />
        )}
        style={styles.recipes}
        contentContainerStyle={styles.repipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>Nenhuma receita encontrada. Escolha outros ingredientes.</Text>
        )}
      />
    </View>
  );
}
