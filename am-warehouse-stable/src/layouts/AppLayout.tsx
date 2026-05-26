import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { useLayout } from "./AppLayoutProvider";

export default function AppLayout({ children }: any) {
  const { isDesktop } = useLayout();

  return isDesktop ? (
    <DesktopLayout>{children}</DesktopLayout>
  ) : (
    <MobileLayout>{children}</MobileLayout>
  );
}