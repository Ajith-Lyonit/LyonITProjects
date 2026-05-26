import { View, Text, useWindowDimensions } from "react-native";
import Svg, { Path, Text as SvgText, G } from "react-native-svg";

type PieData = {
  label: string;
  value: number;
};

type Props = {
  data: PieData[];
};

const COLORS = ["#FFA1A2", "#CECECE","#84ED86","#F6D623"];

export default function AMPieChart({ data }: Props) {
  const { width } = useWindowDimensions();
  const size = width < 500 ? 220 : 200;

  const radius = size / 2;
  const center = size / 2;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  let startAngle = 0;

  const createSlice = (start: number, end: number) => {
    const x1 = center + radius * Math.cos((Math.PI * start) / 180);
    const y1 = center + radius * Math.sin((Math.PI * start) / 180);

    const x2 = center + radius * Math.cos((Math.PI * end) / 180);
    const y2 = center + radius * Math.sin((Math.PI * end) / 180);

    const largeArc = end - start > 180 ? 1 : 0;

    return `M ${center} ${center}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
            Z`;
  };

  return (
    <View
      style={{
        flexDirection: width < 600 ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {/* PIE CHART */}
      <Svg width={size} height={size}>
        {data.map((item, index) => {
          const percent = item.value / total;
          const angle = percent * 360;

          const endAngle = startAngle + angle;

          const path = createSlice(startAngle, endAngle);

          const midAngle = (startAngle + endAngle) / 2;

          const labelX =
            center + (radius * 0.6) * Math.cos((Math.PI * midAngle) / 180);

          const labelY =
            center + (radius * 0.6) * Math.sin((Math.PI * midAngle) / 180);

          const slice = (
            <G key={index}>
              <Path d={path} fill={COLORS[index % COLORS.length]} />

              <SvgText
                x={labelX}
                y={labelY}
                fontSize={10}
                fill="#fff"
                textAnchor="middle"
              >
                {Math.round(percent * 100)}%
              </SvgText>
            </G>
          );

          startAngle = endAngle;
          return slice;
        })}
      </Svg>

      {/* RIGHT SIDE LEGEND */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingLeft: 10,
        }}
      >
        {data.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);

          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              {/* color box */}
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: COLORS[index % COLORS.length],
                  marginRight: 8,
                  borderRadius: 2,
                }}
              />

              {/* label */}
              <Text style={{ fontSize: 12, color: "#333" }}>
                {item.label}{" "}
                <Text style={{ color: "#888" }}>
                  ({item.value} • {percent}%)
                </Text>
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}