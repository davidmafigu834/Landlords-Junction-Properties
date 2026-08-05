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
  const [saleProperties, rentalProperties, areas, posts, allProperties] = await Promise.all([
    getProperties({ status: "FOR_SALE" }),
    getProperties({ status: "TO_LET" }),
    getAreas(),
    getPosts(),
    getProperties(),
  ]);

  return (
    <>
      <FloatingContactRail />
      <HomeHero />
      <TrustBridge />

      <ServicesGrid />

      <SectionCarousel
        title="Properties For Sale"
        eyebrow="Homes and investments"
        href="/properties?status=FOR_SALE"
        hrefLabel="View all for sale"
        tone="navy"
      >
        {saleProperties.map((p) => (
          <PropertyCard key={p.id} property={p} badge="For Sale" />
        ))}
      </SectionCarousel>

      <SectionCarousel
        title="Properties For Rent"
        eyebrow="Available to let"
        href="/properties?status=TO_LET"
        hrefLabel="View all for rent"
      >
        {rentalProperties.map((p) => (
          <PropertyCard key={p.id} property={p} badge="For Rent" />
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
