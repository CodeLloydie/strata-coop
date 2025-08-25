import { CooperativeLayoutView } from "@/views/components/Layout/CooperativeLayoutView";

interface CooperativeLayoutProps {
  children: React.ReactNode;
}

export function CooperativeLayout({ children }: CooperativeLayoutProps) {
  return <CooperativeLayoutView>{children}</CooperativeLayoutView>;
}