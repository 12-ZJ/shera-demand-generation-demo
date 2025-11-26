import InspirationCatalogDetail from "@/app/components/inspiration-catalog/catalog-detail";
import TopNav from "@/app/components/menu/top-nav";
import PageLayout from "@/app/layout/page-layout";

export default function Page() {
    return (
        <PageLayout
            header={<TopNav />} showLoading={true}>
            <InspirationCatalogDetail />
        </PageLayout>
    )
}