import LottieView from "lottie-react-native";
import { memo, type ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

import { isRecord } from "../renderer/nodeGuards";
import type {
  FullScreenOverlayNode,
  OverlayAnimation,
  RegistryComponentProps
} from "../types/sdui";

type LottieSource = ComponentProps<typeof LottieView>["source"];

const LOCAL_ANIMATIONS: Record<Extract<OverlayAnimation, { kind: "local" }>["key"], LottieSource> = {
  "paper-airplane": require("../../assets/lottie/paper-airplane.json") as LottieSource,
  "water-splash": require("../../assets/lottie/water-splash.json") as LottieSource,
  confetti: require("../../assets/lottie/confetti.json") as LottieSource
};

const resolveAnimationSource = (animation: unknown): LottieSource | null => {
  if (!isRecord(animation) || typeof animation.kind !== "string") {
    return null;
  }

  if (animation.kind === "local" && typeof animation.key === "string") {
    return LOCAL_ANIMATIONS[animation.key as keyof typeof LOCAL_ANIMATIONS] ?? null;
  }

  if (animation.kind === "remote" && typeof animation.uri === "string" && animation.uri.length > 0) {
    return { uri: animation.uri } as LottieSource;
  }

  return null;
};

function FullScreenOverlayBase({ node }: RegistryComponentProps<FullScreenOverlayNode>) {
  const props = node.props;
  const source = isRecord(props) ? resolveAnimationSource(props.animation) : null;

  if (!source) {
    return null;
  }

  return (
    <View style={[styles.container, { pointerEvents: "none" }]}> 
      <LottieView
        autoPlay
        loop
        resizeMode="cover"
        source={source}
        speed={typeof props?.speed === "number" ? props.speed : 1}
        style={[styles.animation, { opacity: typeof props?.opacity === "number" ? props.opacity : 0.82 }]}
      />
    </View>
  );
}

export const FullScreenOverlay = memo(FullScreenOverlayBase);

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 50
  },
  animation: {
    height: "100%",
    width: "100%"
  }
});
