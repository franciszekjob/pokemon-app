import { View, Text } from "react-native";
import React from "react";
import { useLoading } from "~/contexts/loading/LoadingContext";

const Loading = () => {
  const { loading } = useLoading();
  return (
    loading.state && (
      <View>
        <Text>Loading</Text>
      </View>
    )
  );
};

export default Loading;
