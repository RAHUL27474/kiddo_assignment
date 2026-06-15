import { memo, useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View, type DimensionValue } from "react-native";

import { handleAction } from "../actions/actionDispatcher";
import { useCartQuantity } from "../hooks/useCartQuantity";
import { useTheme } from "../theme/ThemeContext";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  width?: DimensionValue;
}

function ProductCardBase({ product, width }: ProductCardProps) {
  const theme = useTheme();
  const quantity = useCartQuantity(product.id);

  const onPress = useCallback(() => {
    handleAction(product.action);
  }, [product.action]);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border, width }]}>
      <View style={styles.imageFrame}>
        <Image source={{ uri: product.imageUrl }} resizeMode="cover" style={styles.image} />
        {product.badge ? (
          <View style={[styles.badge, { backgroundColor: theme.primary }]}>
            <Text numberOfLines={1} style={styles.badgeText}>
              {product.badge}
            </Text>
          </View>
        ) : null}
      </View>

      <Text numberOfLines={2} style={[styles.title, { color: theme.text }]}>
        {product.title}
      </Text>
      {product.subtitle ? (
        <Text numberOfLines={1} style={[styles.subtitle, { color: theme.mutedText }]}>
          {product.subtitle}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <Text style={[styles.price, { color: theme.text }]}>{product.price}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={({ pressed }) => [
            styles.addButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 }
          ]}
        >
          <Text style={styles.addText}>{quantity > 0 ? `Qty ${quantity}` : "Add"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const ProductCard = memo(
  ProductCardBase,
  (previous, next) => previous.product === next.product && previous.width === next.width
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 216,
    overflow: "hidden",
    padding: 10
  },
  image: {
    height: "100%",
    width: "100%"
  },
  imageFrame: {
    aspectRatio: 1.25,
    borderRadius: 6,
    marginBottom: 10,
    overflow: "hidden"
  },
  badge: {
    borderRadius: 4,
    left: 8,
    maxWidth: "76%",
    paddingHorizontal: 7,
    paddingVertical: 3,
    position: "absolute",
    top: 8
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700"
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    minHeight: 36
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  price: {
    fontSize: 14,
    fontWeight: "800"
  },
  addButton: {
    alignItems: "center",
    borderRadius: 6,
    justifyContent: "center",
    minHeight: 34,
    minWidth: 62,
    paddingHorizontal: 10
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800"
  }
});
