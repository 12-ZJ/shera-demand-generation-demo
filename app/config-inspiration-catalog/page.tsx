import InspirationCatalogConfigTable from "../components/config-inspiration-catalog/inspiration-table";
import TopNav from "../components/menu/top-nav";
import PageLayout from "../layout/page-layout";

export default function Page() {
    return (
        <PageLayout
            header={<TopNav />}>
            <InspirationCatalogConfigTable />
        </PageLayout>
    )
}