import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { router } from "expo-router";
import { Ingredients } from "@/components/Ingredients";
import { Selected } from "@/components/Selected";
import { Loading } from "@/components/Loading";
import { services } from "@/services";

import { styles } from "./styles";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }

    setSelected((state) => [...state, value]);
  }

  function handleClearSelected() {
    Alert.alert("Limpar", "Deseja limpar tudo?", [
      { text: "Nao", style: "cancel" },
      { text: "Sim", onPress: () => setSelected([]) },
    ]);
  }

  function handleSearch() {
    router.navigate("/recipes/" + selected);
  }

  useEffect(() => {
    services.ingredients
      .findAll()
      .then(setIngredients)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {"\n"}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>Descubra receitas baseadas nos produtos que você escolheu.</Text>

      <Ingredients
        ingredients={ingredients}
        selected={selected}
        handleToggleSelected={handleToggleSelected}
      />

      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}
    </View>
  );
}
