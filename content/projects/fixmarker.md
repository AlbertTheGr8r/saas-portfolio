---
title: "FixMarker: Building a Community-Driven Control Point Recovery Platform"
date: "2026-02-10"
status: "ongoing"
excerpt: "A technical retrospective on building FixMarker—a community-driven waypoint mapping platform designed for geodetic control point recovery in the Philippines."
tags: ["geodesy", "control-points", "mapping", "django", "leaflet", "community"]
techStack: ["Django", "Leaflet", "Python 3.11+", "Spatialite", "Mapbox"]
demoUrl: "https://control.affdc.net/"
draft: false
---

*This is a companion article to [Science Communications: Control Point Recovery and the Shift in Perspective](/blog/science-communications-control-point-recovery/) where I explored the philosophy behind this project. Here, I'll walk through the technical journey of building it.*

---

The problem was never really about coordinates. It was about communication.

When I first sat down to design FixMarker, I kept coming back to the same frustration I'd heard from geodetic engineers across the region: they knew where the monuments actually were, but the system didn't. A decade-old PDF with "official" coordinates meant nothing when that monument was now under a concrete wall. The real knowledge—passed through Messenger threads, Facebook groups, and field conversations—existed nowhere the system could reach.

So we built FixMarker not as another database, but as a communication layer.

## The Foundation: Django + Spatialite

We chose Django for its robustness and the familiarity of its ORM. Spatialite made sense early on—it gave us true GIS capabilities without the overhead of a full PostgreSQL deployment. The lightweight nature of SQLite meant we could run almost anywhere, from a local development machine to a modest server in Naga City.

Our models evolved quickly from simple placeholders to something more sophisticated. We needed `Province`, `Municipality`, and `Barangay` for hierarchical geography. The `Waypoint` model became the core, holding both the official coordinates (WGS84 and PRS92) alongside the community-refined positions. We also tracked alternative names—a critical feature, since the same point might be known as "BLLM-01" in one document and "BLLM1" in another.

The most interesting design decision was the separation between `location` (the theoretical, official position) and `actual_location` (the community-validated reality). This distinction became fundamental to how we thought about data quality.

## The Contribution Engine

The first version of FixMarker was read-only. That changed when we realized the platform needed to close the loop—engineers needed to push data back, not just pull it.
We built three contribution pathways:

**GPS Corrections**: When a field engineer visits a monument, they can submit multiple GPS samples with accuracy metadata. We collect five samples per submission, each weighted by its reported accuracy. This isn't just about getting more data; it's about capturing the uncertainty that comes with fieldwork.

**Status Reports**: A simple but powerful feature—engineers can mark a monument as Safe, Destroyed, Missing, Obstructed, or add custom remarks. This transformed FixMarker from a coordinate repository into a living record of field conditions.

**Photo Documentation**: Field photos are crucial for recovery. We implemented image processing pipelines that generate thumbnails and WebP pyramids for efficient loading on mobile devices.

All three pathways feed into what became our most ambitious feature: the position refinement engine.

## The Mathematics of Consensus

Here's where things got interesting. After we accumulated enough community contributions for a single waypoint, how should we determine the "actual" position?

The answer involved weighted averaging with outlier detection. Each GPS submission contributes to a running average, weighted by accuracy (1/accuracy²). We wait until we have at least 30 contributions—enough for statistical significance—then compute a weighted mean. We calculate the standard deviation of distances from this mean and filter out anything beyond 3 sigma as an outlier. The remaining points form our refined position.

We also include the theoretical position as a baseline with weight 1, ensuring that our community refinement never completely abandons the original survey data.

The result is stored in `actual_location`, with the calculation's standard deviation preserved as `position_sigma_m`. This gives users a confidence indicator they can actually trust—we show σ² and σ³ circles on map previews so engineers know exactly how reliable the position is.

## The Map Experience

We used Leaflet from the start—its open-source nature and mobile-first design aligned with our goals. The clustering strategy was critical. At low zoom levels, we needed grid-based clustering to keep the map responsive with thousands of points. At high zoom, individual markers become meaningful.

The real innovation was the dynamic loading: we only fetch points within the visible viewport. This makes the map feel lightweight even on poor connections, and it respects the bandwidth constraints of field work.

For waypoint detail pages, we integrated Mapbox Static API to generate preview images showing both official and actual positions, complete with confidence circles. These are cached aggressively—if the position changes, we regenerate the preview.

## What We Learned

Building FixMarker taught us several things we didn't expect:

**The database is a conversation, not a tomb.** Traditional control point databases treat coordinates as immutable facts. We learned to treat them as hypotheses—constantly being refined by the people who actually visit the monuments.

**Low-connectivity isn't a bug, it's a feature.** We designed for weak networks from day one. Viewport-based loading, aggressive caching, and delayed uploads aren't workarounds—they're core to how the system works.

**Weighting matters more than volume.** A single high-accuracy GPS reading from a professional-grade receiver should carry more influence than ten low-accuracy phone measurements. Our weighted averaging ensures exactly that.

**Outliers are inevitable.** In fieldwork, mistakes happen—a misplaced decimal, a unit conversion error, a moment of GPS drift. Rather than trying to prevent them, we built the system to identify and filter them automatically using statistical methods.

## What's Next

We've proven the core concept works. The platform is handling real contributions from engineers in the field, and the position refinement calculations are producing meaningful results.
The next chapter involves scaling what we've built. We're looking at how to make the offline experience even more robust—think true progressive web app capabilities that let field engineers work completely disconnected. We're also exploring how to visualize contribution patterns over time, so users can see not just where points are, but how our understanding of them has evolved.
The foundation is solid. The conversation has started. Now it's about making that conversation richer, more accessible, and more valuable for every engineer out there in the field.

---

*Explore the map at [control.affdc.net](https://control.affdc.net/). The technical implementation continues to evolve.*
