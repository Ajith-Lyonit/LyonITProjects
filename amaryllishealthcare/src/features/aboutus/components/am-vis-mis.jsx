import { lazy, useEffect, useState } from "react";

const AMABoutStrip = lazy(() => import("./am-strip"));

const AMVisionMission = () => {
  const [images, setImages] = useState({});

  useEffect(() => {
    Promise.all([
      import("../img/abt1.png"),
      import("../img/abt2.png"),
      import("../img/abt3.png"),
      import("../img/abt4.png"),
      import("../img/abt5.png"),
      import("../img/abt6.png"),
    ]).then(([ab1, ab2, ab3, ab4, ab5, ab6]) => {
      setImages({
        ab1: ab1.default,
        ab2: ab2.default,
        ab3: ab3.default,
        ab4: ab4.default,
        ab5: ab5.default,
        ab6: ab6.default,
      });
    });
  }, []);

  const visList = [
    {
      itemImg: images.ab1,
      itemText: "15+",
      itemDesc: "Years of industry experience",
    },
    {
      itemImg: images.ab2,
      itemText: "10 M+",
      itemDesc: "Surgeries enabled",
    },
    {
      itemImg: images.ab3,
      itemText: "50 K+",
      itemDesc: "Healthcare professionals reached daily",
    },
    {
      itemImg: images.ab4,
      itemText: "15+",
      itemDesc: "Countries products being exported to",
    },
    {
      itemImg: images.ab5,
      itemText: "300+",
      itemDesc: "Active channel partners globally",
    },
    {
      itemImg: images.ab6,
      itemText: "500+",
      itemDesc: "Dedicated Employees",
    },
  ];

  return (
    <div className="container-fluid am-vis-bg mt-4">
      <div className="am-vis-flex">
        {visList.map(
          (item,index) =>
            item.itemImg && <AMABoutStrip key={index} item={item} />
        )}
      </div>
    </div>
  );
};

export default AMVisionMission;
