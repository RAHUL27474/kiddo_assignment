import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { isRecord } from "../renderer/nodeGuards";
import { useTheme } from "../theme/ThemeContext";
import type { Product } from "../types/product";
import type { ProductGrid2x2Node, RegistryComponentProps } from "../types/sdui";
import { ProductCard } from "./ProductCard";

const isProduct = (value: unknown): value is Product =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.title === "string" &&
  typeof value.price === "string" &&
  typeof value.imageUrl === "string" &&
  isRecord(value.action);

function ProductGrid2x2Base({ node, renderChildren }: RegistryComponentProps<ProductGrid2x2Node>) {
  const theme = useTheme();
  const props = node.props;

  const products = useMemo(() => {
    if (!isRecord(props) || !Array.isArray(props.products)) {
      return [];
    }

    return props.products.filter(isProduct).slice(0, 4);
  }, [props]);

  if (!isRecord(props) || typeof props.title !== "string" || products.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{props.title}</Text>
      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} width="48.5%" />
        ))}
      </View>
      {renderChildren(node.children)}
    </View>
  );
}

export const ProductGrid2x2 = memo(ProductGrid2x2Base);

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 24
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between"
  }
});
