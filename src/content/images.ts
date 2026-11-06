/**
 * Image registry — every photograph used on the site, with alt text and licence attribution.
 * Files live in src/assets/images (optimised JPEGs; Next.js generates responsive AVIF/WebP + blur placeholders).
 * To replace a photo: swap the file, then update `alt` and `credit` here. The Image Credits page reads this list.
 */
import type { StaticImageData } from "next/image";

import heroBg from "@/assets/images/heroBg.jpg";
import heroBgMobile from "@/assets/images/heroBgMobile.jpg";
import about from "@/assets/images/about.jpg";
import aboutHero from "@/assets/images/aboutHero.jpg";
import aboutCompany from "@/assets/images/aboutCompany.jpg";
import aboutEngadin from "@/assets/images/aboutEngadin.jpg";
import aboutDetail from "@/assets/images/aboutDetail.jpg";
import reHero from "@/assets/images/reHero.jpg";
import reHotel from "@/assets/images/reHotel.jpg";
import reDev from "@/assets/images/reDev.jpg";
import reSkyline from "@/assets/images/reSkyline.jpg";
import aer1 from "@/assets/images/aer1.jpg";
import aer2 from "@/assets/images/aer2.jpg";
import aer3 from "@/assets/images/aer3.jpg";
import aer4 from "@/assets/images/aer4.jpg";
import aer5 from "@/assets/images/aer5.jpg";
import aer6 from "@/assets/images/aer6.jpg";
import aer7 from "@/assets/images/aer7.jpg";
import agr1 from "@/assets/images/agr1.jpg";
import agr2 from "@/assets/images/agr2.jpg";
import agr3 from "@/assets/images/agr3.jpg";
import agr4 from "@/assets/images/agr4.jpg";
import agr5 from "@/assets/images/agr5.jpg";
import agr6 from "@/assets/images/agr6.jpg";
import agr8 from "@/assets/images/agr8.jpg";
import art1 from "@/assets/images/art1.jpg";
import art2 from "@/assets/images/art2.jpg";
import art3 from "@/assets/images/art3.jpg";
import art4 from "@/assets/images/art4.jpg";
import art5 from "@/assets/images/art5.jpg";
import art6 from "@/assets/images/art6.jpg";
import art7 from "@/assets/images/art7.jpg";
import bio1 from "@/assets/images/bio1.jpg";
import bio2 from "@/assets/images/bio2.jpg";
import bio3 from "@/assets/images/bio3.jpg";
import bio4 from "@/assets/images/bio4.jpg";
import bio6 from "@/assets/images/bio6.jpg";
import bio7 from "@/assets/images/bio7.jpg";
import enr1 from "@/assets/images/enr1.jpg";
import enr2 from "@/assets/images/enr2.jpg";
import enr3 from "@/assets/images/enr3.jpg";
import enr4 from "@/assets/images/enr4.jpg";
import enr5 from "@/assets/images/enr5.jpg";
import enr6 from "@/assets/images/enr6.jpg";
import enr7 from "@/assets/images/enr7.jpg";
import enr8 from "@/assets/images/enr8.jpg";
import lgs1 from "@/assets/images/lgs1.jpg";
import lgs2 from "@/assets/images/lgs2.jpg";
import lgs3 from "@/assets/images/lgs3.jpg";
import lgs4 from "@/assets/images/lgs4.jpg";
import lgs5 from "@/assets/images/lgs5.jpg";
import lgs6 from "@/assets/images/lgs6.jpg";
import lgs7 from "@/assets/images/lgs7.jpg";
import man1 from "@/assets/images/man1.jpg";
import man2 from "@/assets/images/man2.jpg";
import man3 from "@/assets/images/man3.jpg";
import man4 from "@/assets/images/man4.jpg";
import man5 from "@/assets/images/man5.jpg";
import man6 from "@/assets/images/man6.jpg";
import man7 from "@/assets/images/man7.jpg";
import man8 from "@/assets/images/man8.jpg";
import man9 from "@/assets/images/man9.jpg";
import med1 from "@/assets/images/med1.jpg";
import med2 from "@/assets/images/med2.jpg";
import med4 from "@/assets/images/med4.jpg";
import med5 from "@/assets/images/med5.jpg";
import med6 from "@/assets/images/med6.jpg";
import med7 from "@/assets/images/med7.jpg";
import med8 from "@/assets/images/med8.jpg";
import peq1 from "@/assets/images/peq1.jpg";
import peq2 from "@/assets/images/peq2.jpg";
import peq3 from "@/assets/images/peq3.jpg";
import peq4 from "@/assets/images/peq4.jpg";
import peq5 from "@/assets/images/peq5.jpg";
import peq6 from "@/assets/images/peq6.jpg";
import pet1 from "@/assets/images/pet1.jpg";
import pet2 from "@/assets/images/pet2.jpg";
import pet3 from "@/assets/images/pet3.jpg";
import pet5 from "@/assets/images/pet5.jpg";
import pet6 from "@/assets/images/pet6.jpg";
import pet7 from "@/assets/images/pet7.jpg";
import pet8 from "@/assets/images/pet8.jpg";
import tec1 from "@/assets/images/tec1.jpg";
import tec2 from "@/assets/images/tec2.jpg";
import tec3 from "@/assets/images/tec3.jpg";
import tec4 from "@/assets/images/tec4.jpg";
import tec5 from "@/assets/images/tec5.jpg";
import tec6 from "@/assets/images/tec6.jpg";
import tec7 from "@/assets/images/tec7.jpg";
import services from "@/assets/images/services.jpg";
import svcWealth from "@/assets/images/svcWealth.jpg";
import svcPortfolio from "@/assets/images/svcPortfolio.jpg";
import svcVenture from "@/assets/images/svcVenture.jpg";
import svcConsulting from "@/assets/images/svcConsulting.jpg";
import svcMna from "@/assets/images/svcMna.jpg";
import svcCapital from "@/assets/images/svcCapital.jpg";
import svcResearch from "@/assets/images/svcResearch.jpg";
import realEstate from "@/assets/images/realEstate.jpg";
import biotechnology from "@/assets/images/biotechnology.jpg";
import technology from "@/assets/images/technology.jpg";
import ai from "@/assets/images/ai.jpg";
import oil from "@/assets/images/oil.jpg";
import solar from "@/assets/images/solar.jpg";
import industrial from "@/assets/images/industrial.jpg";
import logistics from "@/assets/images/logistics.jpg";
import healthcare from "@/assets/images/healthcare.jpg";
import privateEquity from "@/assets/images/privateEquity.jpg";
import aerospace from "@/assets/images/aerospace.jpg";
import agriculture from "@/assets/images/agriculture.jpg";
import apHero from "@/assets/images/apHero.jpg";
import apCity from "@/assets/images/apCity.jpg";
import apNight from "@/assets/images/apNight.jpg";
import tmHero from "@/assets/images/tmHero.jpg";
import tmUnited from "@/assets/images/tmUnited.jpg";
import ctSamedan from "@/assets/images/ctSamedan.jpg";
import ctAerial from "@/assets/images/ctAerial.jpg";
import ptHero from "@/assets/images/ptHero.jpg";
import ptPhilosophy from "@/assets/images/ptPhilosophy.jpg";
import ptVision from "@/assets/images/ptVision.jpg";
import ptCollab from "@/assets/images/ptCollab.jpg";
import fnFloor from "@/assets/images/fnFloor.jpg";
import fnWall from "@/assets/images/fnWall.jpg";
import fnRoomDark from "@/assets/images/fnRoomDark.jpg";
import petTanker from "@/assets/images/petTanker.jpg";
import reResidential from "@/assets/images/reResidential.jpg";
import reLogistics from "@/assets/images/reLogistics.jpg";
import reIndustrial from "@/assets/images/reIndustrial.jpg";

import credits from "./image-credits.json";

export type ImageCredit = {
  title: string;
  creator: string | null;
  license: string;
  licenseUrl: string | null;
  sourceUrl: string;
  /** True when the image was cropped or tonally adjusted (required disclosure for CC BY / BY-SA). */
  modified: boolean;
};

export type SiteImage = {
  src: StaticImageData;
  alt: string;
  /** Where the image appears — shown on the Image Credits page. */
  usage: string;
  /** Optional factual caption (location only — never implies company ownership). */
  caption?: string;
  /** Discreet on-image note where a photo could imply ownership, affiliation or company data. */
  note?: string;
  credit: ImageCredit;
};

const files = {
  heroBg,
  heroBgMobile,
  about,
  aboutHero,
  aboutCompany,
  aboutEngadin,
  aboutDetail,
  reHero,
  reHotel,
  reDev,
  reSkyline,
  aer1,
  aer2,
  aer3,
  aer4,
  aer5,
  aer6,
  aer7,
  agr1,
  agr2,
  agr3,
  agr4,
  agr5,
  agr6,
  agr8,
  art1,
  art2,
  art3,
  art4,
  art5,
  art6,
  art7,
  bio1,
  bio2,
  bio3,
  bio4,
  bio6,
  bio7,
  enr1,
  enr2,
  enr3,
  enr4,
  enr5,
  enr6,
  enr7,
  enr8,
  lgs1,
  lgs2,
  lgs3,
  lgs4,
  lgs5,
  lgs6,
  lgs7,
  man1,
  man2,
  man3,
  man4,
  man5,
  man6,
  man7,
  man8,
  man9,
  med1,
  med2,
  med4,
  med5,
  med6,
  med7,
  med8,
  peq1,
  peq2,
  peq3,
  peq4,
  peq5,
  peq6,
  pet1,
  pet2,
  pet3,
  pet5,
  pet6,
  pet7,
  pet8,
  tec1,
  tec2,
  tec3,
  tec4,
  tec5,
  tec6,
  tec7,
  services,
  svcWealth,
  svcPortfolio,
  svcVenture,
  svcConsulting,
  svcMna,
  svcCapital,
  svcResearch,
  realEstate,
  biotechnology,
  technology,
  ai,
  oil,
  solar,
  industrial,
  logistics,
  healthcare,
  privateEquity,
  aerospace,
  agriculture,
  apHero,
  apCity,
  apNight,
  tmHero,
  tmUnited,
  ctSamedan,
  ctAerial,
  ptHero,
  ptPhilosophy,
  ptVision,
  ptCollab,
  petTanker,
  reResidential,
  reLogistics,
  reIndustrial,
  fnFloor,
  fnWall,
  fnRoomDark,
} as const;

export type ImageKey = keyof typeof files;

type Meta = Omit<SiteImage, "src" | "credit">;

const meta: Record<ImageKey, Meta> = {
  aer1: {
    usage: "Sector page — Aerospace & Defense Technology",
    alt: "Rocket ascending through the night sky, leaving a glowing trail",
  },
  aer2: {
    usage: "Sector page — Aerospace & Defense Technology",
    alt: "Large domed aircraft hangar under a cloudy sky",
  },
  aer3: {
    usage: "Sector page — Aerospace & Defense Technology",
    alt: "Front view of a large turbofan jet engine in an aviation museum",
  },
  aer4: {
    usage: "Sector page — Aerospace & Defense Technology",
    alt: "Long-exposure trail of a rocket climbing into the night sky",
  },
  aer5: {
    usage: "Sector page — Aerospace & Defense Technology",
    alt: "A large jet airliner seen nose-on inside an aircraft maintenance hangar",
  },
  aer6: {
    usage: "Sector page — Aerospace & Defense Technology",
    alt: "Jet engine mounted on a yellow display stand in a hangar",
  },
  aer7: {
    usage: "Sector page — Aerospace & Defense Technology",
    alt: "Open aircraft hangar with a light aircraft inside",
  },
  agr1: {
    usage: "Sector page — Agriculture & Food Technology",
    alt: "Combine harvester cutting wheat in a dusty golden field",
  },
  agr2: {
    usage: "Sector page — Agriculture & Food Technology",
    alt: "Ripening wheat field with a red barn and silos",
  },
  agr3: {
    usage: "Sector page — Agriculture & Food Technology",
    alt: "Combine harvester unloading grain into a trailer during harvest",
  },
  agr4: {
    usage: "Sector page — Agriculture & Food Technology",
    alt: "Green tractor working a mown field",
  },
  agr5: {
    usage: "Sector page — Agriculture & Food Technology",
    alt: "Agricultural drone spraying crops among palm trees",
  },
  agr6: {
    usage: "Sector page — Agriculture & Food Technology",
    alt: "Green tractor pulling a cultivator across a field",
  },
  agr8: {
    usage: "Sector page — Agriculture & Food Technology",
    alt: "Tractor spreading lime across a hillside field",
  },
  art1: {
    usage: "Sector page — Artificial Intelligence; Venture Capital & Growth Investments — expertise",
    alt: "Robotic arm in a bright, minimal automation laboratory",
  },
  art2: {
    usage: "Sector page — Artificial Intelligence",
    alt: "White laboratory automation robot holding pipettes",
  },
  art3: {
    usage: "Sector page — Artificial Intelligence",
    alt: "Lidar point cloud of a city intersection rendered in purple and orange",
  },
  art4: {
    usage: "Sector page — Artificial Intelligence",
    alt: "Rows of lit server cabinets in a darkened data-centre hall",
  },
  art5: {
    usage: "Sector page — Artificial Intelligence",
    alt: "Red collaborative robot with a screen face holding a gripper tool",
  },
  art6: {
    usage: "Sector page — Artificial Intelligence",
    alt: "Glowing green circuit-board traces in close-up",
  },
  art7: {
    usage: "Sector page — Artificial Intelligence",
    alt: "Close-up of a lidar sensor mounted on a test vehicle",
  },
  bio1: {
    usage: "Sector page — Biotechnology; Healthcare & Medical Technology — closing",
    alt: "Scientists in protective suits working in a yellow-lit cleanroom laboratory",
  },
  bio2: {
    usage: "Sector page — Biotechnology, Healthcare & Medical Technology",
    alt: "Inverted research microscope with cameras and controls on a laboratory bench",
  },
  bio3: {
    usage: "Sector page — Biotechnology",
    alt: "Fluorescent green microorganism glowing under a fluorescence microscope",
  },
  bio4: {
    usage: "Sector page — Biotechnology",
    alt: "Microscope objective illuminating a fluorescent sample with blue and green light",
  },
  bio6: {
    usage: "Sector page — Biotechnology",
    alt: "Robotic arm loading samples into automated DNA sequencing instruments",
  },
  bio7: {
    usage: "Sector page — Agriculture & Food Technology, Biotechnology",
    alt: "Glass bioreactor vessels and tubing on a laboratory bench",
  },
  enr1: {
    usage: "Sector page — Energy & Solar",
    alt: "Offshore wind turbines silhouetted against a sunset over the sea",
  },
  enr2: {
    usage: "Sector page — Energy & Solar",
    alt: "High-voltage transmission towers and a converter station on open land",
  },
  enr3: {
    usage: "Sector page — Energy & Solar",
    alt: "Wind farm silhouetted beneath a dramatic crimson sunset sky",
  },
  enr4: {
    usage: "Sector page — Energy & Solar",
    alt: "Wind turbines on a ridge beneath a vivid red sunset sky",
  },
  enr5: {
    usage: "Sector page — Energy & Solar",
    alt: "Row of wind turbines on the horizon at sunset across the water",
  },
  enr6: {
    usage: "Sector page — Energy & Solar",
    alt: "Aerial view of a battery energy storage facility in a desert landscape",
  },
  enr7: {
    usage: "Sector page — Energy & Solar",
    alt: "High-voltage power line crossing a snowy field",
  },
  enr8: {
    usage: "Sector page — Energy & Solar",
    alt: "Aerial view of suburban homes with rooftop solar panels",
  },
  lgs1: {
    usage: "Sector page — Logistics & Infrastructure",
    alt: "Cargo ship with deck cranes sailing on a choppy sea",
  },
  lgs2: {
    usage: "Sector page — Logistics & Infrastructure",
    alt: "Electric freight locomotive approaching on a mountain railway",
  },
  lgs3: {
    usage: "Sector page — Logistics & Infrastructure",
    alt: "Roll-on/roll-off cargo ship sailing along the coast",
  },
  lgs4: {
    usage: "Sector page — Logistics & Infrastructure",
    alt: "Container ship berthed beneath gantry cranes at a port terminal",
  },
  lgs5: {
    usage: "Sector page — Logistics & Infrastructure",
    alt: "Warehouse interior with tall pallet racking and stored goods",
  },
  lgs6: {
    usage: "Sector page — Logistics & Infrastructure",
    alt: "Freight wagons on a railway line crossing a desert plain",
  },
  lgs7: {
    usage: "Sector page — Logistics & Infrastructure; Aerospace & Defense Technology — closing",
    alt: "Cargo aircraft parked on an airport apron",
  },
  man1: {
    usage: "Sector page — Industrial & Manufacturing",
    alt: "Steelworks complex with tall chimneys beside a transmission tower",
  },
  man2: {
    usage: "Sector page — Industrial & Manufacturing",
    alt: "Overview of a machining hall with rows of CNC machine tools",
  },
  man3: {
    usage: "Sector page — Industrial & Manufacturing",
    alt: "Aerial view of a large steel mill beside a river estuary",
  },
  man4: {
    usage: "Sector page — Industrial & Manufacturing",
    alt: "Blast furnace and steel mill beside a lake",
  },
  man5: {
    usage:
      "Sector page — Aerospace & Defense Technology, Industrial & Manufacturing; Private Equity & Capital Advisory — capabilities",
    alt: "Modern five-axis CNC machining centres in a clean workshop",
  },
  man6: {
    usage: "Sector page — Industrial & Manufacturing",
    alt: "Collaborative robot with a screen face working on a factory production line",
  },
  man7: {
    usage: "Sector page — Industrial & Manufacturing",
    alt: "Blast furnace towers and pipework of an integrated steel mill",
  },
  man8: {
    usage: "Sector page — Industrial & Manufacturing",
    alt: "Chemical plant chimneys and industrial buildings along a waterfront",
  },
  man9: {
    usage: "Sector page — Industrial & Manufacturing",
    alt: "Large-scale additive manufacturing machine inside a modern industrial production hall",
  },
  med1: {
    usage: "Sector page — Healthcare & Medical Technology",
    alt: "Modern operating theatre with surgical lights and equipment",
  },
  med2: {
    usage: "Sector page — Healthcare & Medical Technology",
    alt: "CT scanner in a hospital imaging room",
  },
  med4: {
    usage: "Sector page — Healthcare & Medical Technology",
    alt: "Arms of a robotic surgical system in an operating room",
  },
  med5: {
    usage: "Sector page — Healthcare & Medical Technology",
    alt: "Modern CT scanner in a bright hospital imaging room",
  },
  med6: {
    usage: "Sector page — Healthcare & Medical Technology",
    alt: "Control console of a robotic surgical system",
  },
  med7: {
    usage: "Sector page — Biotechnology, Healthcare & Medical Technology",
    alt: "Clinical chemistry analyser with sample tubes in a hospital laboratory",
  },
  med8: {
    usage: "Sector page — Healthcare & Medical Technology",
    alt: "CT scanner with patient table in a hospital imaging suite",
  },
  peq1: {
    usage:
      "Sector page — Private Equity; Our Team — closing; Services page — closing; Mergers & Acquisitions — contact",
    alt: "Canary Wharf skyline reflected in the Thames at blue hour",
  },
  peq2: {
    usage: "Sector page — Private Equity; Asset & Portfolio Management — contact",
    alt: "City skyline lit at night across dark water",
  },
  peq3: {
    usage:
      "Sector page — Private Equity; Services page — advisory philosophy; Investment Research & Risk Advisory — expertise",
    alt: "Illuminated office towers at night in Canary Wharf",
  },
  peq4: {
    usage: "Sector page — Private Equity; Private Equity & Capital Advisory — expertise",
    alt: "Lit office towers behind street lamps at night",
  },
  peq5: {
    usage: "Services page — introduction; Private Equity — Established Enterprises; Wealth Management — expertise",
    alt: "The vaulted, richly decorated banking hall of a historic financial building",
  },
  peq6: {
    usage: "Private Equity — Succession & Transition",
    alt: "A wood-panelled bank boardroom with a fireplace and a globe",
  },
  pet1: {
    usage: "Sector page — Petroleum & Oil",
    alt: "Offshore oil platform standing in calm open sea",
  },
  pet2: {
    usage: "Sector page — Petroleum & Oil",
    alt: "Elevated section of the Trans-Alaska oil pipeline crossing forested mountains",
  },
  pet3: {
    usage: "Sector page — Petroleum & Oil",
    alt: "Row of white oil storage tanks beyond open ground under a cloudy sky",
  },
  pet5: {
    usage: "Sector page — Petroleum & Oil",
    alt: "Jack-up drilling rigs in a harbour under grey skies",
  },
  pet6: {
    usage: "Sector page — Petroleum & Oil",
    alt: "Oil storage tanks beside a reed-fringed pond",
  },
  pet7: {
    usage: "Sector page — Petroleum & Oil",
    alt: "A pipeline gantry running along a long pier to an oil terminal jetty",
  },
  pet8: {
    usage: "Sector page — Petroleum & Oil",
    alt: "Oil tanker sailing through calm coastal waters",
  },
  tec1: {
    usage: "Sector page — Technology",
    alt: "Illuminated fibre-optic cable glowing red against a dark background",
  },
  tec2: {
    usage: "Sector page — Technology",
    alt: "Close-up of capacitors and components on an electronic circuit board",
  },
  tec3: {
    usage: "Sector page — Aerospace & Defense Technology, Technology",
    alt: "Blue network cables connected to a rack-mounted network switch",
  },
  tec4: {
    usage: "Sector page — Technology; Venture Capital & Growth Investments — capabilities",
    alt: "Rainbow reflections across a patterned silicon wafer",
  },
  tec5: {
    usage: "Sector page — Technology",
    alt: "Network switch with blue and grey ethernet cables",
  },
  tec6: {
    usage: "Sector page — Technology; Artificial Intelligence — closing",
    alt: "Macro view of a microchip's colourful circuitry",
  },
  tec7: {
    usage: "Sector page — Technology",
    alt: "Burst of light through a bundle of fibre-optic strands",
  },
  reHero: {
    usage: "Real Estate — hero; Corporate & Strategic Consulting — contact",
    alt: "Glass office towers of Milan's Porta Nuova business district rising above the city at dusk",
  },
  reHotel: {
    usage: "Real Estate — Hospitality Properties",
    alt: "A grand historic alpine hotel in St. Moritz, illuminated at night",
    caption: "St. Moritz, Switzerland",
  },
  reDev: {
    usage: "Real Estate — Real Estate Development; Real Estate Management — capabilities",
    alt: "Two red tower cranes rising against a dramatic cloudy sky above a construction site",
  },
  reSkyline: {
    usage: "Real Estate — Long-Term Perspective; Real Estate Management — contact",
    alt: "Panorama of Zürich's Kreis 11 district with residential neighbourhoods and modern towers",
    caption: "Zürich, Switzerland",
  },
  aboutHero: {
    usage: "About Us — hero; Wealth Management — contact",
    alt: "The illuminated historic façades of Paradeplatz in Zürich's financial district at dusk",
    caption: "Paradeplatz, Zürich",
  },
  aboutCompany: {
    usage: "Impressum — hero",
    alt: "Modern building façade with a precise grid of white frames, seen from below against the sky",
    caption: "St. Gallen, Switzerland",
  },
  aboutDetail: {
    usage: "Home — Connect with Blubeard; Real Estate — perspective (detail)",
    alt: "Close-up of a white façade composed of angled triangular panels",
  },
  aboutEngadin: {
    usage: "Home — About Blubeard (inset); About Us — Our Headquarters",
    alt: "Alpine peaks and forested slopes of the Upper Engadin, photographed from Samedan",
    caption: "View from Samedan, Upper Engadin",
  },
  heroBg: {
    usage: "Homepage hero",
    alt: "A tram passing the illuminated historic façades of Paradeplatz in Zürich's financial district at dusk",
  },
  heroBgMobile: {
    usage: "Homepage hero (mobile crop)",
    alt: "A tram passing the illuminated historic façades of Paradeplatz in Zürich's financial district at dusk",
  },
  about: {
    usage: "Home — About Blubeard; About Us — closing; Real Estate — closing; Real Estate Management — hero",
    alt: "Looking up between the mirrored glass façades of Prime Tower in Zürich, reflecting a cloud-filled sky",
    caption: "Zürich, Switzerland",
  },
  services: {
    usage:
      "Services (homepage & Services page) — Real Estate Management; Investments — introduction; Real Estate Management — expertise",
    alt: "Sculpted balconies of a residential high-rise rising against a blue-hour sky",
  },
  svcWealth: {
    usage: "Services (homepage & Services page) — Wealth Management; Wealth Management — hero",
    alt: "The massive circular steel door of a bank vault standing open",
  },
  svcPortfolio: {
    usage:
      "Services (homepage & Services page) — Asset & Portfolio Management; Investments — philosophy; Asset & Portfolio Management — hero",
    alt: "Rows of trading desks on a stock exchange trading floor",
  },
  svcVenture: {
    usage:
      "Services (homepage & Services page) — Venture Capital & Growth Investments; Venture Capital & Growth Investments — hero",
    alt: "Bright, minimal open-plan workspace with desks along a glass façade",
  },
  svcConsulting: {
    usage:
      "Services (homepage & Services page) — Corporate & Strategic Consulting; Private Equity — Buy-and-Build Strategies; Corporate & Strategic Consulting — hero",
    alt: "A long boardroom table lined with leather chairs",
  },
  svcMna: {
    usage:
      "Services (homepage & Services page) — Mergers & Acquisitions; Private Equity — Strategic Acquisitions; Mergers & Acquisitions — hero; Home — Our Approach (stage 3); Contact — hero",
    alt: "A fountain pen resting on the signature page of a contract",
  },
  svcCapital: {
    usage:
      "Services (homepage & Services page) — Private Equity & Capital Advisory; Investments — hero; Real Estate — Commercial Properties; Investment Research & Risk Advisory — contact; Private Equity & Capital Advisory — hero",
    alt: "Glass office towers of the La Défense business district seen from a park",
  },
  svcResearch: {
    usage:
      "Services (homepage & Services page) — Investment Research & Risk Advisory; Investments — Strategic Analysis; Our Approach — Disciplined Evaluation; Asset & Portfolio Management — expertise; Investment Research & Risk Advisory — hero; Home — Our Approach (stage 2)",
    alt: "A laptop displaying a financial market price chart and data table",
    note: "Illustrative market data · Not Blubeard performance",
  },
  realEstate: {
    usage: "Industry — Real Estate; Services page — hero; Mergers & Acquisitions — expertise",
    alt: "Two glass office towers linked by a skybridge, photographed from below at dusk with offices lit from within",
  },
  biotechnology: {
    usage: "Industry — Biotechnology",
    alt: "Researcher pipetting samples at a laboratory bench lined with test-tube racks",
  },
  technology: {
    usage: "Industry — Technology; Asset & Portfolio Management — capabilities",
    alt: "Close-up of neatly labelled network cables and blue status lights in a data centre server rack",
  },
  ai: {
    usage: "Industry — Artificial Intelligence; Investment Research & Risk Advisory — capabilities",
    alt: "Rows of high-performance computing cabinets with green status lights in a supercomputing facility",
  },
  oil: {
    usage: "Industry — Petroleum & Oil",
    alt: "Oil refinery towers and processing units silhouetted against a dusk sky",
  },
  solar: {
    usage: "Industry — Energy & Solar",
    alt: "Aerial view of concentric fields of solar mirrors focused on central solar power towers",
  },
  industrial: {
    usage: "Industry — Industrial & Manufacturing; Mergers & Acquisitions — capabilities",
    alt: "Automated vehicle body production line with industrial robots welding car body frames",
  },
  logistics: {
    usage: "Industry — Logistics & Infrastructure; Corporate & Strategic Consulting — capabilities",
    alt: "Aerial view of a major container port with terminals, gantry cranes and stacked containers along a river",
  },
  healthcare: {
    usage: "Industry — Healthcare & Medical Technology",
    alt: "Magnetic resonance imaging scanner in a modern hospital imaging room",
  },
  privateEquity: {
    usage:
      "Industry — Private Equity; Our Approach — closing; Private Equity & Capital Advisory — contact; Home — Our Perspective",
    alt: "Aerial view of the City of London financial district and its office towers at sunset",
  },
  aerospace: {
    usage:
      "Industry — Aerospace & Defense Technology; Venture Capital & Growth Investments — contact; Contact — closing",
    alt: "Technicians in clean-room suits preparing a satellite inside a spacecraft processing facility",
  },
  agriculture: {
    usage: "Industry — Agriculture & Food Technology",
    alt: "Rows of green and red lettuce growing in a modern hydroponic greenhouse",
  },
  apHero: {
    usage: "Our Approach — hero",
    alt: "The columned façade of the New York Stock Exchange",
    caption: "New York Stock Exchange",
  },
  apCity: {
    usage:
      "Our Approach — Strategic Perspective; Home — Our Approach (stage 1); Venture Capital & Growth Investments — contact",
    alt: "The European Central Bank tower and the Frankfurt skyline reflected in the River Main at dawn",
  },
  apNight: {
    usage: "Our Approach — risk & responsibility; About Us — Our Company (detail)",
    alt: "The bull and bear sculptures in front of the Frankfurt Stock Exchange",
    caption: "Börsenplatz, Frankfurt",
  },
  tmHero: {
    usage: "Our Team — hero",
    alt: "The sandstone façade of the Frankfurt Stock Exchange building",
  },
  tmUnited: {
    usage: "Our Team — leadership philosophy; Our Partners — Long-Term Perspective",
    alt: "A traditional wood-panelled boardroom with a long table and leather chairs",
  },
  ctSamedan: {
    usage: "Contact — Swiss headquarters; Impressum — registered office",
    alt: "Piz Chalchagn, Piz Mandra, Piz Morteratsch and Piz Tschierva seen from Samedan in the Upper Engadin",
  },
  ctAerial: {
    usage: "About Us — Our Company; Contact — Swiss headquarters (detail); Home — Our Perspective",
    alt: "Aerial view of Samedan and its airfield in the Upper Engadin valley",
  },
  ptHero: {
    usage: "Our Partners — hero",
    alt: "A long meeting table with black chairs in a bright, high-ceilinged room",
  },
  ptPhilosophy: {
    usage: "Our Partners — philosophy",
    alt: "The vaulted, patterned lobby of a historic financial building",
  },
  ptVision: {
    usage: "Our Partners — Shared Vision",
    alt: "Meeting tables and leather armchairs in a bright room",
  },
  ptCollab: {
    usage: "Our Partners — Disciplined Collaboration",
    alt: "A white meeting table with chairs in a light-filled room",
  },
  petTanker: {
    usage: "Sector page — Petroleum & Oil — Marine Transport & Distribution",
    alt: "A product tanker with a black hull and white superstructure under way at sea",
  },
  reResidential: {
    usage: "Sector page — Real Estate — Residential Developments",
    alt: "A curved modern apartment building with a glass stairwell tower",
  },
  reLogistics: {
    usage: "Sector page — Real Estate — Logistics & Warehousing",
    alt: "Aerial view of two large distribution warehouses beside a motorway",
  },
  reIndustrial: {
    usage: "Sector page — Real Estate — Industrial Real Estate",
    alt: "Aerial view of an industrial estate with warehouses and factory buildings",
  },
  fnFloor: {
    usage:
      "Home — Our Approach (stage 4); Investments — Long-Term Perspective; Our Approach — Long-Term Thinking; Wealth Management — capabilities",
    alt: "The trading floor of the Frankfurt Stock Exchange beneath its electronic market boards",
    caption: "Frankfurt Stock Exchange",
  },
  fnWall: {
    usage: "Home — Our Perspective",
    alt: "The Lower Manhattan financial district at dusk, seen across the East River",
  },
  fnRoomDark: {
    usage: "Investments — closing; Corporate & Strategic Consulting — expertise",
    alt: "A long dark conference table lined with upholstered chairs",
  },
};

const creditMap = credits as Record<ImageKey, ImageCredit>;

export const images = Object.fromEntries(
  (Object.keys(files) as ImageKey[]).map((key) => [key, { src: files[key], ...meta[key], credit: creditMap[key] }]),
) as Record<ImageKey, SiteImage>;

/** Ordered list for the Image Credits page. */
export const imageList = (Object.keys(files) as ImageKey[]).map((key) => ({ key, ...images[key] }));
