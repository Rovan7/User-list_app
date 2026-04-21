import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DetailScreen() {
  const { user } = useLocalSearchParams();

  const parsedUser = JSON.parse(user as string);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {parsedUser.name}
      </Text>
      <Text>Email: {parsedUser.email}</Text>
      <Text>Phone: {parsedUser.phone}</Text>
      <Text>Website: {parsedUser.website}</Text>
    </View>
  );
}