import { memo, useCallback } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

import { handleAction } from "../actions/actionDispatcher";
import { isRecord } from "../renderer/nodeGuards";
import { useTheme } from "../theme/ThemeContext";
import type { BannerHeroNode, RegistryComponentProps } from "../types/sdui";

function BannerHeroBase({ node, renderChildren }: RegistryComponentProps<BannerHeroNode>) {
  const theme = useTheme();
  const props = node.props;

  const onPress = useCallback(() => {
    handleAction(props?.action);
  }, [props?.action]);

  if (
    !isRecord(props) ||
    typeof props.title !== "string" ||
    typeof props.imageUrl !== "string" ||
    props.title.length === 0 ||
    props.imageUrl.length === 0
  ) {
    return null;
  }

  const content = (
    <ImageBackground source={{ uri: props.imageUrl }} resizeMode="cover" style={styles.background}>
      <View style={styles.scrim}>
        {typeof props.eyebrow === "string" ? (
          <Text style={[styles.eyebrow, { color: theme.primary }]}>{props.eyebrow}</Text>
        ) : null}
        <Text numberOfLines={2} style={styles.title}>
          {props.title}
        </Text>
        {typeof props.subtitle === "string" ? (
          <Text numberOfLines={2} style={styles.subtitle}>
            {props.subtitle}
          </Text>
        ) : null}
        {renderChildren(node.children)}
      </View>
    </ImageBackground>
  );

  if (!props.action) {
    return <View style={styles.container}>{content}</View>;
  }

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.container}>
      {content}
    </Pressable>
  );
}

export const BannerHero = memo(BannerHeroBase);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 180,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: "hidden"
  },
  background: {
    flex: 1,
    justifyContent: "flex-end"
  },
  scrim: {
    backgroundColor: "rgba(0,0,0,0.24)",
    gap: 4,
    padding: 16
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 29
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18
  }
});
