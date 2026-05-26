import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  const formatText = (text) => {
    if (text === "infection-prevention-division") return "Infection Prevention Division";
    return text.replace(/-/g, " ");
  };

  return (
    <nav className="ms-5 am-breadmap-flex">
      <Link to="/" className="am-breadmap-font">
        Home
      </Link>

      {parts.map((part, index) => {
        const isLast = index === parts.length - 1;
        const currentHref = "/" + parts.slice(0, index + 1).join("/");
        const displayName = formatText(part);

        return (
          <span key={index} className="am-breadmap-flex">
            <span className="mx-2">{">"}</span>
            {isLast ? (
              <span className="am-breadmap-font text-gray-500 capitalize">
                {displayName}
              </span>
            ) : (
              <Link to={currentHref} className="am-breadmap-font capitalize">
                {displayName}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
