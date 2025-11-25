import { OKRManagementEnhanced } from "@/components/okr-management-enhanced"
import { PageContainer } from "@/components/layout/page-container"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"

export default function OKRPage() {
  return (
    <PageContainer>
      <OKRManagementEnhanced />
      <FloatingNavButtons />
    </PageContainer>
  )
}
