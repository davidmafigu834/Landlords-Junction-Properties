import { HomeHero } from "@/components/home/HomeHero";
import { TrustBridge } from "@/components/home/TrustBridge";
import { LifestyleGrid } from "@/components/home/LifestyleGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FloatingContactRail } from "@/components/home/FloatingContactRail";
import { TestimonialBand } from "@/components/home/TestimonialBand";
import { SectionCarousel } from "@/components/ui/SectionCarousel";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { PropertyCard } from "@/components/property/PropertyCard";
import { AreaCard } from "@/components/areas/AreaCard";
import { NewsCard } from "@/components/news/NewsCard";
import { getAreas, getPosts, getProperties } from "@/lib/data/queries";

export default async function HomePage() {
  const [featuredSale, onShow, areas, posts, allProperties] = await Promise.all([
    getProperties({ status: "FOR_SALE", featured: true }),
    getProperties({ onShow: true }),
    getAreas(),
    getPosts(),
    getProperties(),
  ]);

  const featured = featuredSale.length
    ? featuredSale
    : allProperties.filter((p) => p.status === "FOR_SALE");
  return (
    <>
      <FloatingContactRail />
      <HomeHero />
      <TrustBridge />

      <ServicesGrid />

      <SectionCarousel
        title="Featured Properties"
        eyebrow="Discover our best"
        href="/properties"
        tone="navy"
        links={[
          { href: "/properties?status=FOR_SALE", label: "For Sale" },
          { href: "/properties?status=TO_LET", label: "To Let" },
        ]}
      >
        {featured.map((p) => (
          <PropertyCard key={p.id} property={p} badge="Featured" />
        ))}
      </SectionCarousel>

      {onShow.length > 0 && (
        <SectionCarousel title="On Show" href="/properties?onShow=1" hrefLabel="View all">
          {onShow.map((p) => (
            <PropertyCard key={p.id} property={p} badge="On Show" />
          ))}
        </SectionCarousel>
      )}

      <SectionCarousel title="Our Areas" href="/areas" hrefLabel="View all">
        {areas.slice(0, 4).map((area) => (
          <AreaCard key={area.id} area={area} properties={allProperties} />
        ))}
      </SectionCarousel>

      <LifestyleGrid />

      <SectionDivider />
      <WhyChooseUs />
      <TestimonialBand />

      <SectionCarousel title="Insights" href="/news" hrefLabel="View all">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </SectionCarousel>
    </>
  );
}
