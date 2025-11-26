import InspirationCatalogForm from "@/app/components/config-inspiration-catalog/inspiration-form";
import TopNav from "@/app/components/menu/top-nav";
import PageLayout from "@/app/layout/page-layout";

export default function Page() {
    return (
        <PageLayout
            header={<TopNav />} showLoading={true}>
            <InspirationCatalogForm />
        </PageLayout>
    )
}