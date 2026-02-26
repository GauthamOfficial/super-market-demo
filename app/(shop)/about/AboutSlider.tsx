"use client";

import { useState } from "react";

const TABS = [
  { id: "who", label: "Who we are" },
  { id: "vision", label: "Our Vision" },
  { id: "mission", label: "Our Mission" },
] as const;

const CONTENT = {
  who: {
    title: "Who We Are",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  vision: {
    title: "Our Vision",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras fermentum odio eu feugiat pretium nibh ipsum. Nunc consequat interdum varius sit amet mattis vulputate enim.",
  },
  mission: {
    title: "Our Mission",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fermentum iaculis eu non diam phasellus. Eget nunc scelerisque viverra mauris in aliquam sem fringilla. Nibh tellus molestie nunc non blandit massa enim nec dui.",
  },
} as const;

export function AboutSlider() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("who");
  const content = CONTENT[active];

  return (
    <section className="full-bleed py-10 sm:py-16 bg-muted/40 border-y border-border relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Segmented control — pill bar, smaller on mobile */}
        <div
          className="inline-flex w-full sm:w-auto rounded-full bg-neutral-200 p-1 sm:p-1.5 gap-0.5"
          role="tablist"
          aria-label="About: Who we are, Vision, Mission"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`flex-1 sm:flex-none min-w-0 sm:min-w-[7rem] rounded-full px-3 py-2 text-xs font-medium sm:px-4 sm:py-2.5 sm:text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                active === tab.id
                  ? "bg-neutral-100 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content panel — text on top, logo behind */}
        <div className="relative mt-6 sm:mt-8 min-h-[180px] sm:min-h-[200px]">
          {/* Logo placeholder — behind text, centered in content area */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
            <div className="w-full max-w-[160px] sm:max-w-[200px] aspect-square rounded-lg bg-neutral-300 opacity-30" />
          </div>
          <div
            id={`panel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            className="relative z-10"
          >
            <h2 className="flex flex-wrap items-center gap-2 sm:gap-3 text-lg sm:text-2xl font-bold text-foreground">
              {content.title}
              <span className="h-1.5 w-10 sm:w-20 rounded-full bg-primary shrink-0" aria-hidden />
            </h2>
            <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed break-words">
              {content.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
