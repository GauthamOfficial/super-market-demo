import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProducts } from "@/features/products/actions";
import { ProductCard } from "@/features/products/product-card";
import { HeroTagline } from "@/features/home/HeroTagline";
import { EnjoyFreshestSection } from "@/features/home/EnjoyFreshestSection";
import { HeroProductSearch } from "@/features/search/HeroProductSearch";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AnimateOnScroll } from "@/components/layout/AnimateOnScroll";
import { siteConfig } from "@/config/site";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 6);

  return (
    <div className="min-w-0">
      {/* Hero — reference style: full-bleed image background, white text, search bar, store carousel */}
      <section className="full-bleed -mt-8 relative min-h-[94vh] sm:min-h-[90vh] flex flex-col overflow-hidden bg-black">
        {/* Black base */}
        <div className="absolute inset-0 bg-black" aria-hidden />
        <div className="hero-overlay" aria-hidden />
        {/* Brand gradient from bottom */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent pointer-events-none"
          aria-hidden
        />

        {/* Top: hero action buttons */}
        <div className="absolute top-16 right-2 left-2 z-20 flex flex-row flex-nowrap items-center justify-center gap-1.5 sm:left-auto sm:top-6 sm:right-6 sm:justify-end sm:gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-black/70 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-all duration-200 shadow-[0_0_6px_2px_rgba(250,18,18,0.4)] hover:bg-black/90 hover:shadow-[0_0_12px_4px_rgba(250,18,18,0.5)] hover:scale-[1.02] sm:px-4 sm:py-2 sm:text-sm sm:shadow-[0_0_8px_3px_rgba(250,18,18,0.35)] sm:hover:shadow-[0_0_14px_5px_rgba(250,18,18,0.45)]"
          >
            Products
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-black/70 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-all duration-200 shadow-[0_0_6px_2px_rgba(250,18,18,0.4)] hover:bg-black/90 hover:shadow-[0_0_12px_4px_rgba(250,18,18,0.5)] hover:scale-[1.02] sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm sm:shadow-[0_0_8px_3px_rgba(250,18,18,0.35)] sm:hover:shadow-[0_0_14px_5px_rgba(250,18,18,0.45)]"
          >
            Explore more
            <ChevronRight className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
          </Link>
        </div>

        {/* Main hero content: headline, tagline, search — centered in viewport */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-3 py-8 text-center sm:px-4 sm:py-12">
          <div className="-mt-2 sm:mt-0">
            <h1 className="font-brand text-5xl font-normal tracking-tight text-white opacity-0 animate-hero-fade-in-up sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl" style={{ letterSpacing: "0.03em" }}>
              {siteConfig.name}
            </h1>
            <HeroTagline />
          </div>

          {/* Search bar — full width on mobile */}
          <div
            className="relative z-20 mt-8 w-full max-w-full opacity-0 animate-hero-fade-in-up sm:mt-6 sm:max-w-xl"
            style={{ animationDelay: "0.2s" }}
          >
            <HeroProductSearch />
          </div>
        </div>
      </section>

      {/* Enjoy the freshest — floating product boxes, grey bg, scroll parallax */}
      <AnimateOnScroll>
      <EnjoyFreshestSection />
      </AnimateOnScroll>

      {/* Crafted with love — mobile: 2 cols × 3 rows; desktop: single row */}
      <AnimateOnScroll delay={80}>
      <section className="full-bleed bg-white py-16">
        <Container className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8">
            Crafted with <span className="font-accent italic text-[1.1em]">love</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-8">
            Discover our in-house collections and daily essentials.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 sm:gap-4 max-w-2xl sm:max-w-none mx-auto">
            {[
              "Premium Staples",
              "Value Staples",
              "Cleaning",
              "Fun Foods",
              "Ready to Eat",
              "Daily Needs",
            ].map((label) => (
              <div
                key={label}
                className="relative aspect-[5/6] rounded-xl overflow-hidden border border-border bg-neutral-200 flex items-center justify-center text-xs sm:text-sm font-medium text-neutral-600"
              >
                {label}
              </div>
            ))}
          </div>
        </Container>
      </section>
      </AnimateOnScroll>

      {/* Happy customers — image with gradient overlay and text */}
      <AnimateOnScroll delay={100}>
      <section className="full-bleed py-16 bg-white">
        <Container>
          <div className="w-full relative h-96 rounded-xl overflow-hidden bg-neutral-200 flex items-center justify-center">
            <div className="text-center px-6">
              <p className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-800 italic">
                1000+
              </p>
              <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-neutral-800 mt-1 italic">
                Happy Customers
              </p>
              <p className="mt-3 text-neutral-700 text-base sm:text-lg max-w-md font-medium mx-auto">
                Image placeholder — update later with your own photography.
              </p>
            </div>
          </div>
        </Container>
      </section>
      </AnimateOnScroll>

      {/* Featured products — keep existing behaviour */}
      <AnimateOnScroll delay={120}>
      <section className="full-bleed border-t bg-muted/30 py-16">
        <Container>
          <h2 className="text-2xl font-bold text-black mb-6">Featured <span className="font-accent italic text-[1.1em]">products</span></h2>
          {featured.length > 0 ? (
            <div className="grid min-w-0 gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {featured.map((product) => (
                <div key={product.id} className="min-w-0">
                  <ProductCard product={product} compact actionLabel="View" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              <p>No products yet. Add products in Supabase or run the seed script.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/products">View products</Link>
              </Button>
            </div>
          )}
          <div className="mt-6 text-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/products">Browse all products</Link>
            </Button>
          </div>
        </Container>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
