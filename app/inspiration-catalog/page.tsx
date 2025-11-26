import InspirationCatalog from "../components/inspiration-catalog/catalog";
import TopNav from "../components/menu/top-nav";
import PageLayout from "../layout/page-layout";

export default function Page() {
    return (
        <PageLayout
            header={<TopNav />} showLoading={true}>
            <InspirationCatalog />
        </PageLayout>
    )
}