import { View, useWindowDimensions } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";

type Props = {
  color:string;
  value: number;
  max?: number;
  label?: string;
  gsize?:number;
  gstroke?:number;
  gfontsize?:number
};

export default function AMGaugeChart({
  color,
  value,
  gsize=200,
  gstroke=50,
  gfontsize=22,
  max = 100,
  label = "Progress",
}: Props) {

  const size = gsize;
  const strokeWidth = gstroke;

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const percentage = Math.min(value / max, 1);
  const angle = 180 * percentage;

  const polarToCartesian = (angleDeg: number) => {
    const angleRad = ((angleDeg - 180) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    };
  };

  const describeArc = (start: number, end: number) => {
    const startPoint = polarToCartesian(end);
    const endPoint = polarToCartesian(start);

    const largeArcFlag = end - start <= 180 ? "0" : "1";

    return `
      M ${startPoint.x} ${startPoint.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endPoint.x} ${endPoint.y}
    `;
  };

  const backgroundPath = describeArc(0, 180);
  const progressPath = describeArc(0, angle);

  const getColor = () => {
    return color;
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={size} height={center + radius * 0.5}>
        <Path
          d={backgroundPath}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d={progressPath}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />

        <SvgText
          x={center}
          y={center - 10}
          fontSize={gfontsize}
          fill="#111"
          textAnchor="middle"
          fontWeight="bold"
        >
          {value+"%"}
        </SvgText>

        <SvgText
          x={center}
          y={center + 20}
          fontSize={12}
          fill="#666"
          textAnchor="middle"
        >
          {label}
        </SvgText>
      </Svg>
    </View>
  );
}