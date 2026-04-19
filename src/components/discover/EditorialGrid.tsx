"use client";

import type { EditorialTile, Researcher, Opportunity } from "@/types";
import type { Theme } from "@/lib/theme";
import { FeaturedResearcherCard } from "./FeaturedResearcherCard";
import { FeaturedPaperCard } from "./FeaturedPaperCard";
import { HotOpportunityCard } from "./HotOpportunityCard";
import { AreaSpotlightCard } from "./AreaSpotlightCard";
import { GroupSpotlightCard } from "./GroupSpotlightCard";
import { CtaCard } from "./CtaCard";

type TileSpan = { rowSpan: 1 | 2; colSpan?: 1 };

/**
 * Decide each tile's vertical span so the bento has varied heights.
 * Roughly: papers and first area are "tall" (span 2 rows), others are "short".
 */
function spanFor(tile: EditorialTile, idx: number, areaSeen: number): TileSpan {
  if (tile.kind === "featuredPaper") return { rowSpan: 2 };
  if (tile.kind === "area" && areaSeen === 0) return { rowSpan: 2 };
  if (tile.kind === "featuredResearcher" && idx === 1) return { rowSpan: 2 };
  return { rowSpan: 1 };
}

export function EditorialGrid({
  tiles,
  onSelectResearcher,
  onSelectOpportunity,
  onSelectArea,
  onCta,
  t,
}: {
  tiles: EditorialTile[];
  onSelectResearcher: (r: Researcher) => void;
  onSelectOpportunity: (o: Opportunity) => void;
  onSelectArea: (area: string) => void;
  onCta?: () => void;
  t: Theme;
}) {
  let areaSeen = 0;

  return (
    <div
      className="bento-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gridAutoRows: "200px",
        gap: 16,
        gridAutoFlow: "dense",
      }}
    >
      {tiles.map((tile, idx) => {
        const span = spanFor(tile, idx, areaSeen);
        if (tile.kind === "area") areaSeen++;

        const wrapperStyle: React.CSSProperties = {
          gridRow: `span ${span.rowSpan}`,
          minWidth: 0,
        };

        switch (tile.kind) {
          case "featuredPaper":
            return (
              <div key={`paper-${tile.paper.id}-${idx}`} style={wrapperStyle}>
                <FeaturedPaperCard paper={tile.paper} variant="tall" t={t} />
              </div>
            );
          case "featuredResearcher":
            return (
              <div key={`researcher-${tile.researcher.id}-${idx}`} style={wrapperStyle}>
                <FeaturedResearcherCard
                  researcher={tile.researcher}
                  quote={tile.quote}
                  onSelect={() => onSelectResearcher(tile.researcher)}
                  t={t}
                />
              </div>
            );
          case "hotOpportunity":
            return (
              <div key={`opp-${tile.opportunity.id}-${idx}`} style={wrapperStyle}>
                <HotOpportunityCard
                  opportunity={tile.opportunity}
                  onSelect={() => onSelectOpportunity(tile.opportunity)}
                  t={t}
                />
              </div>
            );
          case "area":
            return (
              <div key={`area-${tile.area.name}-${idx}`} style={wrapperStyle}>
                <AreaSpotlightCard
                  area={tile.area}
                  onSelect={() => onSelectArea(tile.area.name)}
                  variant={span.rowSpan === 2 ? "cover" : "compact"}
                  t={t}
                />
              </div>
            );
          case "group":
            return (
              <div key={`group-${tile.group.name}-${idx}`} style={wrapperStyle}>
                <GroupSpotlightCard group={tile.group} t={t} />
              </div>
            );
          case "cta":
            return (
              <div key={`cta-${idx}`} style={wrapperStyle}>
                <CtaCard
                  title={tile.title}
                  description={tile.description}
                  cta={tile.cta}
                  onAction={onCta}
                  t={t}
                />
              </div>
            );
        }
      })}
    </div>
  );
}
