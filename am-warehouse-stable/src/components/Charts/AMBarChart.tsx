import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  View,
  Text,
  useWindowDimensions,
  Platform,
} from "react-native";
import Svg, { Rect, Text as SvgText, G, Line, Path } from "react-native-svg";

type GroupData = {
  label: string;
  values: number[];
};

type Props = {
  data: GroupData[];
};

export default function AMBarChart({ data }: Props) {
  const { width } = useWindowDimensions();

  const chartHeight = 220;
  const groupWidth = width < 768 ? 80 : 120;
  const chartWidth = data.length * groupWidth;

  const rawMax = Math.max(...data.flatMap((d) => d.values));
  const { ticks, niceMax } = getNiceTicks(rawMax, 5);

  const barColors = ["#FFA1A2", "#84ED86", "#F6D623"];
  const barWidth = Math.min(16, groupWidth / 8);

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    values: number[];
  } | null>(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    if (tooltip) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacity.setValue(0);
      translateY.setValue(10);
    }
  }, [tooltip]);

  function getNiceTicks(maxValue: number, tickCount = 5) {
    const roughStep = maxValue / tickCount;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const residual = roughStep / magnitude;

    let niceStep;
    if (residual >= 5) niceStep = 5 * magnitude;
    else if (residual >= 2) niceStep = 2 * magnitude;
    else niceStep = 1 * magnitude;

    const niceMax =
      Math.ceil(maxValue / niceStep) * niceStep;

    const ticks = [];
    for (let i = 0; i <= niceMax; i += niceStep) {
      ticks.push(i);
    }

    return { ticks, niceMax };
  }
  const topSpace = 14;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{ padding: 5, position: "relative" }}
        onStartShouldSetResponder={() => {
          setTooltip(null);
          return false;
        }}
      >
        <Svg width={chartWidth} height={chartHeight + 60 + topSpace}>
          {ticks.map((tick, i) => {
            const y = chartHeight - (tick / niceMax) * chartHeight;
            return (
              <Line
                key={`grid-${i}`}
                x1={30}
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke="#E5E7EB"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            );
          })}
          <Line x1={30} y1={0} x2={30} y2={chartHeight} stroke="#ccc" />
          <Line x1={30} y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#ccc" />
          {data.map((group, groupIndex) => {
            return (
              <G key={groupIndex}>
                <Rect
                  x={groupIndex * groupWidth + 30}
                  y={0}
                  width={groupWidth}
                  height={chartHeight}
                  fill="transparent"
                  onPress={() => {
                    const maxVal = Math.max(...group.values);
                    const barHeight =
                      (maxVal / niceMax) * chartHeight;

                    setTooltip({
                      x: groupIndex * groupWidth + groupWidth / 2 + 30,
                      y: chartHeight - barHeight,
                      label: group.label,
                      values: group.values,
                    });
                  }}
                  {...(Platform.OS === "web"
                    ? {
                      onMouseEnter: () => {
                        const maxVal = Math.max(...group.values);
                        const barHeight =
                          (maxVal / niceMax) * chartHeight;

                        setTooltip({
                          x: groupIndex * groupWidth + groupWidth / 2 + 30,
                          y: chartHeight - barHeight,
                          label: group.label,
                          values: group.values,
                        });
                      },
                      onMouseLeave: () => setTooltip(null),
                      style: { cursor: "pointer" } as any,
                    }
                    : {})}
                />

                {/* Bars */}
                {group.values.map((value, i) => {
                  const barHeight =
                    (value / niceMax) * chartHeight;

                  const xOffset =
                    (i - group.values.length / 2) * (barWidth + 6);

                  const x = groupIndex * groupWidth + groupWidth / 2 + 30 + xOffset;
                  const y = chartHeight - barHeight;
                  const w = barWidth;
                  const h = barHeight;
                  const r = Math.min(6, w / 2); // safe radius
                  const d = `
                    M ${x} ${y + r}
                    Q ${x} ${y} ${x + r} ${y}
                    L ${x + w - r} ${y}
                    Q ${x + w} ${y} ${x + w} ${y + r}
                    L ${x + w} ${y + h}
                    L ${x} ${y + h}
                    Z
                  `;
                  return (
                    <Path
                      key={i}
                      d={d}
                      fill={barColors[i % barColors.length]}
                    />
                  );
                })}
                <SvgText
                  x={groupIndex * groupWidth + groupWidth / 2 + 30}
                  y={chartHeight + 25}
                  fontSize={10}
                  fill="#333"
                  textAnchor="middle"
                >
                  {group.label}
                </SvgText>
              </G>
            );
          })}
          {ticks.map((tick, i) => {
            const y = chartHeight - (tick / niceMax) * chartHeight;
            return (
              <SvgText
                key={`label-${i}`}
                x={25}
                y={i === ticks.length - 1 ? y + 10 : y + 4}
                fontSize={10}
                fill="#666"
                textAnchor="end"
              >
                {tick}
              </SvgText>
            );
          })}
        </Svg>
        {tooltip && (
          <Animated.View
            style={[
              {
                position: "absolute",
                left: Math.max(10, tooltip.x - 55),
                top: tooltip.y - 40,
                opacity,
                transform: [{ translateY }],
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 6,
                minWidth: 100,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 4,
              },
              Platform.OS === "web"
                ? ({ boxShadow: "0px 2px 6px rgba(0,0,0,0.15)" } as any)
                : {},
            ]}
          >
            {tooltip.values.map((v, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: barColors[i % barColors.length],
                    marginRight: 6,
                    borderRadius: 2,
                  }}
                />
                <Text style={{ color: "#000", fontSize: 10 }}>
                  {v}
                </Text>
              </View>
            ))}
            <Text
              style={{
                color: "#000",
                fontSize: 11,
                fontWeight: "bold",
                marginBottom: 6,
                textAlign: "center",
              }}
            >
              {tooltip.label}
            </Text>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
}