import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { Quote } from "lucide-react";
import type { Metadata } from "next";
import { AboutSlider } from "./AboutSlider";
import { AboutHero } from "./AboutHero";
import { AnimateOnScroll } from "@/components/layout/AnimateOnScroll";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} and FN Group (Pvt) Ltd — our vision, mission, and leadership.`,
};

export default function AboutPage() {
  return (
    <div className="min-w-0 -mt-8">
      {/* Hero with floating grey image boxes */}
      <AboutHero />

      {/* Who we are / Vision / Mission — slider (segmented control) */}
      <AboutSlider />

      {/* Leadership — Chairman & Director */}
      <section className="full-bleed py-10 sm:py-20 bg-background">
        <Container className="max-w-5xl px-4 sm:px-6">
          <div className="mb-8 sm:mb-12 pb-3 sm:pb-4 border-b-2 border-primary">
            <h2 className="text-xl sm:text-3xl font-bold text-center text-foreground">
              Leadership
            </h2>
          </div>

          {/* Chairman */}
          <AnimateOnScroll>
          <div className="mb-12 sm:mb-20">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              <div className="shrink-0 w-full max-w-xs mx-auto md:mx-0 md:w-56 aspect-[3/4] relative rounded-2xl overflow-hidden shadow-[0_0_50px_12px_rgba(34,197,94,0.22)] animate-float-subtle bg-neutral-400" aria-hidden />
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Quote className="h-4 w-4 sm:h-5 sm:w-5 opacity-70 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Chairman&apos;s Note</span>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 break-words">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 break-words">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 break-words">
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras fermentum odio eu feugiat pretium nibh ipsum. Nunc consequat interdum varius sit amet mattis vulputate enim.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-2 break-words">
                  Sincerely,
                </p>
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  John Smith
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Chairman, Lorem Corp.
                </p>
              </div>
            </div>
          </div>
          </AnimateOnScroll>

          {/* Director — image on right */}
          <AnimateOnScroll delay={100}>
          <div>
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-12 items-start">
              <div className="shrink-0 w-full max-w-xs mx-auto md:mx-0 md:w-56 aspect-[3/4] relative rounded-2xl overflow-hidden shadow-[0_0_50px_12px_rgba(34,197,94,0.22)] animate-float-subtle bg-neutral-400" aria-hidden />
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Quote className="h-4 w-4 sm:h-5 sm:w-5 opacity-70 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Director&apos;s Note</span>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 break-words">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 break-words">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 break-words">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-2 break-words">
                  Warm regards,
                </p>
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  Jane Doe
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Director, Lorem Corp.
                </p>
              </div>
            </div>
          </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </div>
  );
}
