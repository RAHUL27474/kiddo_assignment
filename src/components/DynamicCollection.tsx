import { FlashList } from "@shopify/flash-list";
import { memo, useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { isRecord } from "../renderer/nodeGuards";
import { useTheme } from "../theme/ThemeContext";
import type { Product } from "../types/product";
import type { DynamicCollectionNode, RegistryComponentProps } from "../types/sdui";
import { ProductCard } from "./ProductCard";

const DEFAULT_ITEM_WIDTH = 154;

const isProduct = (value: unknown): value is Product =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.title === "string" &&
  typeof value.price === "string" &&
  typeof value.imageUrl === "string" &&
  isRecord(value.action);

const Separator = memo(function Separator() {
  return <View style={styles.separator} />;
});

function DynamicCollectionBase({ node, renderChildren }: RegistryComponentProps<DynamicCollectionNode>) {
  const theme = useTheme();
  const props = node.props;
  const itemWidth =
    isRecord(props) && typeof props.itemWidth === "number" && props.itemWidth > 0
      ? props.itemWidth
      : DEFAULT_ITEM_WIDTH;

  const products = useMemo(() => {
    if (!isRecord(props) || !Array.isArray(props.products)) {
      return [];
    }

    return props.products.filter(isProduct);
  }, [props]);

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} width={itemWidth} />,
    [itemWidth]
  );

  if (!isRecord(props) || typeof props.title !== "string" || products.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{props.title}</Text>
        {typeof props.subtitle === "string" ? (
          <Text numberOfLines={1} style={[styles.subtitle, { color: theme.mutedText }]}>
            {props.subtitle}
          </Text>
        ) : null}
      </View>

      <FlashList
        data={products}
        horizontal
        ItemSeparatorComponent={Separator}
        keyExtractor={keyExtractor}
        nestedScrollEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      {renderChildren(node.children)}
    </View>
  );
}

export const DynamicCollection = memo(DynamicCollectionBase);

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingTop: 22
  },
  header: {
    gap: 3,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 19,
    fontWeight: "900",
    lineHeight: 23
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 17
  },
  listContent: {
    paddingHorizontal: 16
  },
  list: {
    height: 226
  },
  separator: {
    width: 10
  }
});
