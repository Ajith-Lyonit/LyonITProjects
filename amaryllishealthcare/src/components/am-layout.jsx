import AMHeader from "./am-header";
import AMFooter from "./am-footer";
import AMFooterLog from "./am-footerlog";
import { AMScroll } from "./am-scroll";
import AMScrollToTopButton from "./am-scroll-button";

const AMLayout = ({ children }) => {
    return (
        <div>
            {/* Header */}
            <AMHeader />

            {/* Page Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <AMFooter />
            <AMFooterLog />
            <AMScroll/>
            <AMScrollToTopButton/>
        </div>
    );
};

export default AMLayout;
