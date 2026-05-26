import { useWindowDimensions, ViewStyle } from "react-native";

export const useGridColumns = () => {
    const { width } = useWindowDimensions();
    if (width >= 1200) return 8;
    if (width >= 900) return 3;
    if (width >= 300) return 2;
    return 1;
};

export const getGridWidth = (
  columns: number,
  span = 1
): ViewStyle => ({
  flexBasis: `${(span / columns) * 100}%`,
  maxWidth: `${(span / columns) * 100}%`,
});