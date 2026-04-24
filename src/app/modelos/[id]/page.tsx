import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ModelosNavbar from "@/components/modelos/ModelosNavbar";
import Breadcrumb from "@/components/modelos/product/Breadcrumb";
import ProductGallery from "@/components/modelos/product/ProductGallery";
import ProductDetails from "@/components/modelos/product/ProductDetails";

interface PageProps {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === Number(id));
    if (!product) return { title: "Produto não encontrado" };
    return {
        title: `${product.title} · Rutiely Fashion`,
        description: product.subtitle,
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === Number(id));

    if (!product) notFound();

    return (
        <div className="relative min-h-screen" style={{ background: "#FFF1FC" }}>
            <style>{`
                @media (max-width: 767px) {
                    .product-page-content { padding: 110px 5% 60px !important; }
                    .product-page-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
                    .product-page-sidebar { position: static !important; }
                }
            `}</style>

            <ModelosNavbar />

            <main
                className="relative product-page-content"
                style={{ padding: "140px 5% 100px", maxWidth: "1440px", margin: "0 auto" }}
            >
                <Breadcrumb category={product.category} title={product.title} />

                <div
                    className="product-page-grid mt-8"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
                        gap: "56px",
                        alignItems: "start",
                    }}
                >
                    <section>
                        <ProductGallery images={product.images} title={product.title} />
                    </section>

                    <aside
                        className="product-page-sidebar"
                        style={{ position: "sticky", top: "120px" }}
                    >
                        <ProductDetails product={product} />
                    </aside>
                </div>
            </main>
        </div>
    );
}
