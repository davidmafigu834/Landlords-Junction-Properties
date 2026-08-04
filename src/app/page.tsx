import { HomeHero } from "@/components/home/HomeHero";
import { LifestyleGrid } from "@/components/home/LifestyleGrid";
import { MarketAssessmentCTA } from "@/components/home/MarketAssessmentCTA";
import { WhySellSection } from "@/components/home/WhySellSection";
import { SectionCarousel } from "@/components/ui/SectionCarousel";
import { PropertyCard } from "@/components/property/PropertyCard";
import { AgentCard } from "@/components/agents/AgentCard";
import { AreaCard } from "@/components/areas/AreaCard";
import { NewsCard } from "@/components/news/NewsCard";
import { getAgents, getAreas, getPosts, getProperties } from "@/lib/data/queries";
import Link from "next/link";

export default async function HomePage() {
  const [featuredSale, featuredLet, onShow, agents, areas, posts, allProperties] =
    await Promise.all([
      getProperties({ status: "FOR_SALE", featured: true }),
      getProperties({ status: "TO_LET", featured: true }),
      getProperties({ onShow: true }),
      getAgents(),
      getAreas(),
      getPosts(),
      getProperties(),
    ]);

  const featured = featuredSale.length ? featuredSale : allProperties.filter((p) => p.status === "FOR_SALE");
  const toLet = featuredLet.length ? featuredLet : allProperties.filter((p) => p.status === "TO_LET");

  return (
    <>
      <HomeHero />

      <section className="section-pad border-b border-line py-14 md:py-16">
        <div className="container-site grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
          <h2 className="display text-3xl text-ink md:text-5xl">
            Welcome to Landlords Junction Properties
          </h2>
          <div>
            <p className="text-muted">
              Ready to find your next home — or place one on the market with clarity? We list,
              advise, and negotiate across Bulawayo with suburb-level expertise.
            </p>
            <Link href="/contact" className="link-accent mt-4 inline-block text-xs font-semibold tracking-wider uppercase">
              More about us
            </Link>
          </div>
        </div>
      </section>

      <SectionCarousel
        title="Featured Properties"
        href="/properties"
        links={[
          { href: "/properties?status=FOR_SALE", label: "For Sale" },
          { href: "/properties?status=TO_LET", label: "To Let" },
        ]}
      >
        {featured.map((p) => (
          <PropertyCard key={p.id} property={p} badge="Featured" />
        ))}
      </SectionCarousel>

      <LifestyleGrid />

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

      <MarketAssessmentCTA />
      <WhySellSection />

      <SectionCarousel
        title="Meet the Team"
        href="/agents"
        hrefLabel="View all"
        links={[
          { href: "/agents", label: "Agents" },
          { href: "/contact", label: "Careers" },
        ]}
      >
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </SectionCarousel>

      {toLet.length > 0 && (
        <SectionCarousel title="To Let" href="/properties?status=TO_LET" hrefLabel="View all">
          {toLet.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </SectionCarousel>
      )}

      <SectionCarousel title="The Know" href="/news" hrefLabel="View all news">
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </SectionCarousel>
    </>
  );
}
