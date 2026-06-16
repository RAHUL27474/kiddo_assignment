import { memo } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { activeHomepagePayload } from "../data/homepagePayload";
import { SduiRenderer } from "../renderer/SduiRenderer";

function HomeScreenBase() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <SduiRenderer payload={activeHomepagePayload} />
    </SafeAreaView>
  );
}

export const HomeScreen = memo(HomeScreenBase);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF5E6",
    paddingBottom: 24
  }
});
