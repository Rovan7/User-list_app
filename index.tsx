import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList, Pressable, Text,
  TextInput,
  View
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    const result = users.filter((u: any) =>
      u.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredUsers(result);
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search user..."
        value={search}
        onChangeText={handleSearch}
        style={{
          borderWidth: 1,
          margin: 10,
          padding: 10,
          borderRadius: 8,
        }}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => {
          return (
            <Pressable
              onPress={() => {
                console.log("clicked"); // debug
                router.push({
                  pathname: "/details",
                  params: { user: JSON.stringify(item) },
                });
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 15,
                  marginHorizontal: 10,
                  marginVertical: 6,
                  borderRadius: 10,
                  elevation: 3,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text>{item.email}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.address.city}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}