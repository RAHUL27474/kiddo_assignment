import { FlashList } from "@shopify/flash-list";
import { Fragment, memo, useCallback, useMemo, useRef, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { resolveRegistryComponent } from "../registry/componentRegistry";
import { ThemeProvider, useTheme } from "../theme/ThemeContext";
import type { RenderNodeOptions, SduiNode } from "../types/sdui";
import type { ThemePayload } from "../types/theme";
import { getNodeKey, isOverlayNode, isRecord, isSduiNode, toNodeArray } from "./nodeGuards";

interface NormalizedPayload {
  id: string;
  theme?: ThemePayload;
  nodes: SduiNode[];
}

interface SduiRendererProps {
  payload: unknown;
}

const normalizePayload = (payload: unknown): NormalizedPayload => {
  if (!isRecord(payload)) {
    return {
      id: "malformed-payload",
      nodes: []
    };
  }

  const normalized: NormalizedPayload = {
    id: typeof payload.id === "string" ? payload.id : "anonymous-payload",
    nodes: toNodeArray(payload.nodes)
  };

  if (isRecord(payload.theme)) {
    normalized.theme = payload.theme as unknown as ThemePayload;
  }

  return normalized;
};

function SduiRendererContent({ nodes }: { nodes: SduiNode[] }) {
  const theme = useTheme();
  const renderNodeRef = useRef<(node: unknown, options?: RenderNodeOptions) => ReactNode>(() => null);

  const renderChildren = useCallback((children: unknown): ReactNode => {
    const childNodes = toNodeArray(children);

    if (childNodes.length === 0) {
      return null;
    }

    return childNodes.map((child, index) => (
      <Fragment key={getNodeKey(child, index)}>{renderNodeRef.current(child)}</Fragment>
    ));
  }, []);

  const renderNode = useCallback(
    (rawNode: unknown): ReactNode => {
      if (!isSduiNode(rawNode)) {
        return null;
      }

      const Component = resolveRegistryComponent(rawNode.type);

      if (!Component) {
        return null;
      }

      return <Component node={rawNode} renderChildren={renderChildren} renderNode={renderNodeRef.current} />;
    },
    [renderChildren]
  );

  renderNodeRef.current = renderNode;

  const feedNodes = useMemo(() => nodes.filter((node) => !isOverlayNode(node)), [nodes]);
  const overlayNodes = useMemo(() => nodes.filter(isOverlayNode), [nodes]);

  const keyExtractor = useCallback((item: SduiNode, index: number) => getNodeKey(item, index), []);

  const renderItem = useCallback(
    ({ item }: { item: SduiNode }) => <>{renderNode(item)}</>,
    [renderNode]
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <FlashList
        data={feedNodes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
      />

      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {overlayNodes.map((node, index) => (
          <Fragment key={getNodeKey(node, index)}>{renderNode(node)}</Fragment>
        ))}
      </View>
    </View>
  );
}

const MemoizedSduiRendererContent = memo(SduiRendererContent);

export const SduiRenderer = memo(function SduiRenderer({ payload }: SduiRendererProps) {
  const normalized = useMemo(() => normalizePayload(payload), [payload]);

  return (
    <ThemeProvider theme={normalized.theme}>
      <MemoizedSduiRendererContent nodes={normalized.nodes} />
    </ThemeProvider>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  feedContent: {
    paddingBottom: 32
  }
});
