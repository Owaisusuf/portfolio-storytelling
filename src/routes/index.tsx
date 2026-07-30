import { createFileRoute } from "@tanstack/react-router";

import mountains from "@/assets/ch-mountains.jpg";
import books from "@/assets/ch-books.jpg";
import lake from "@/assets/ch-lake.jpg";
import road from "@/assets/ch-road.jpg";
import moonMosque from "@/assets/noor-moon-mosque.jpg";
import rainWindow from "@/assets/noor-rain-window.jpg";
import roadDawn from "@/assets/noor-road-dawn.jpg";

import { Hero } from "@/components/owaisism/Hero";
import { Chapter, Emph } from "@/components/owaisism/Chapter";
import { LockScene } from "@/components/owaisism/LockScene";
import { RevealGrid } from "@/components/owaisism/RevealGrid";
import { Terminal } from "@/components/owaisism/Terminal";
import { Campfire } from "@/components/owaisism/Campfire";
import { Starfield } from "@/components/owaisism/Starfield";
import { HiddenLayer } from "@/components/owaisism/HiddenLayer";
import { CursorAura } from "@/components/owaisism/CursorAura";
import { Whisper } from "@/components/owaisism/Whisper";
import { NavHUD } from "@/components/owaisism/NavHUD";
import { ChapterRail } from "@/components/owaisism/ChapterRail";
import {
  Marquee,
  TECH_ITEMS,
  PHILOSOPHY_ITEMS,
  SECURITY_ITEMS,
  NOOR_ITEMS,
} from "@/components/owaisism/Marquee";

import { NoorOpening } from "@/components/noor/NoorOpening";
import { NoorWhisper } from "@/components/noor/NoorWhisper";
import { NoorScene } from "@/components/noor/NoorScene";
import { NoorSaying } from "@/components/noor/NoorSaying";
import { HeartOS } from "@/components/noor/HeartOS";
import { MirrorEgo } from "@/components/noor/MirrorEgo";
import { ScholarLibrary } from "@/components/noor/ScholarLibrary";
import { DailyLight } from "@/components/noor/DailyLight";
import { NoorFooter } from "@/components/noor/NoorFooter";
import {
  AHMAD,
  COMPANIONS,
  HASAN_AL_BASRI,
  REPENTANCE_HADITH,
} from "@/components/noor/noor-content";

const TITLE = "OWAISISM — Nothing Is Locked";
const DESCRIPTION =
  "A cinematic, interactive portfolio by Owais. Ten chapters of curiosity — mountains, locks, terminals and galaxies. Some people collect achievements; I collected questions.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MEMORIES = [
  {
    label: "The broken radio",
    hint: "open it",
    reveal:
      "It still worked. I opened it anyway. Inside was a city of tiny roads and I wanted to know who drew them.",
  },
  {
    label: "The first computer",
    hint: "open it",
    reveal:
      "Someone told me not to touch the settings. That sentence has shaped more of my life than any lesson.",
  },
  {
    label: "A stack of books",
    hint: "open it",
    reveal:
      "Half of them I didn't understand. I read them twice anyway. Confusion is just curiosity with better posture.",
  },
];

const SCHOOLS = [
  {
    label: "Islamic Model High School",
    hint: "open the book",
    reveal: "Where I learned that discipline and imagination are not opposites.",
  },
  {
    label: "Candid Higher Secondary",
    hint: "open the book",
    reveal: "The year I failed something publicly and discovered nobody remembered it but me.",
  },
  {
    label: "BCA — IITM",
    hint: "open the book",
    reveal: "Three years of proving that a syllabus is a floor, never a ceiling.",
  },
];

const JOBS = [
  {
    label: "The uniform",
    hint: "what it taught",
    reveal: "People decide who you are in four seconds. Let them be wrong, then keep working.",
  },
  {
    label: "The cash counter",
    hint: "what it taught",
    reveal: "Accuracy is a form of respect. Nobody claps for it. Do it anyway.",
  },
  {
    label: "The ID card",
    hint: "what it taught",
    reveal: "Respect based on position expires. Respect based on character doesn't.",
  },
  {
    label: "The laptop",
    hint: "what it taught",
    reveal: "The internet doesn't care where you were born. It only asks what you made.",
  },
  {
    label: "The helmet",
    hint: "what it taught",
    reveal: "Every delivery is someone's small moment. Small moments are most of a life.",
  },
  {
    label: "The desk",
    hint: "what it taught",
    reveal: "Boredom is information. It tells you exactly where you shouldn't stay.",
  },
];

const WORK = [
  {
    label: "Quiet Tools",
    hint: "problem → outcome",
    reveal:
      "People drowned in tabs. I removed features until only the decision remained. Time-to-answer dropped by half.",
  },
  {
    label: "Field Notes",
    hint: "problem → outcome",
    reveal:
      "Ideas died in note apps. Built a system that treats half-formed thoughts as first-class citizens.",
  },
  {
    label: "Passage",
    hint: "problem → outcome",
    reveal:
      "A brand that felt like a brochure. Rebuilt it as a journey — bounce rate fell, scroll depth tripled.",
  },
];

function Index() {
  return (
    <main className="relative">
      <NoorOpening />
      <Starfield />
      <HiddenLayer />
      <CursorAura />
      <NavHUD />
      <ChapterRail />

      <div className="relative z-10">
        <Hero />

        <div className="space-y-2 py-4">
          <Marquee items={PHILOSOPHY_ITEMS} variant="default" speed="normal" />
          <Marquee items={TECH_ITEMS} reverse variant="pills" speed="fast" />
        </div>

        <Chapter id="chapter-01" index="01" title="Who am I" image={mountains}>
          <p>
            People usually ask, <Emph>"What do you do?"</Emph> Wrong question.
          </p>
          <p>
            A better question is: <Emph>"What keeps someone awake at 3 AM?"</Emph> Mine? Curiosity.
          </p>
          <p>
            My name is Owais. Born among the mountains of Kashmir — a place where every sunrise
            reminds you that beauty and complexity often coexist. Growing up here taught me that
            silence can carry more weight than noise. That perspective shaped everything I build.
          </p>
        </Chapter>

        <Chapter id="chapter-02" index="02" title="The first question">
          <p>
            A child opening old electronics. Broken radios. Computers. Books. Not because they were
            broken — because I wanted to know <Emph>why they worked</Emph>.
          </p>
          <p>Curiosity became a habit. Eventually, an addiction.</p>
          <div className="pt-6">
            <RevealGrid items={MEMORIES} />
          </div>
        </Chapter>

        <NoorWhisper text="Breathe. Say Alhamdulillah." />

        <Whisper text="Every system has a door. Most people never check if it is even locked." tag="chapter 03 approaching" />

        <Chapter id="chapter-03" index="03" title="The key">
          <p>
            People fear the word <Emph>"hacking."</Emph> I don't. To me it's understanding systems
            deeply enough to ask better questions.
          </p>
          <p>
            Every lock was created by someone. Which means someone also understands the key.
          </p>
          <div className="pt-6">
            <LockScene />
          </div>
        </Chapter>

        <Marquee items={SECURITY_ITEMS} variant="neon" speed="fast" />

        <HeartOS />

        <NoorScene
          id="noor-curiosity"
          eyebrow="نور — the inner journey"
          title="Two curiosities"
          image={moonMosque}
        >
          <p>I spent years learning how computers think.</p>
          <p>Islam reminded me to learn how my own soul thinks.</p>
          <p>
            Technology teaches how systems work. Faith teaches why we exist. Both begin with
            curiosity — only one of them ends in peace.
          </p>
          <p className="text-foreground">
            Knowledge without humility creates arrogance. Knowledge with taqwa creates wisdom.
          </p>
        </NoorScene>

        <Chapter id="chapter-04" index="04" title="The schools" image={books}>
          <p>Not a timeline. A floating library. Each book still open on the page that hurt.</p>
          <div className="pt-6">
            <RevealGrid items={SCHOOLS} />
          </div>
        </Chapter>

        <Whisper text="Watch what changes when you change nothing but the uniform." tag="something shifts here" />

        <Chapter id="chapter-05" index="05" title="Side quests">
          <p>
            I worked many jobs. Not because I needed titles — because I wanted perspective. People
            change the way they treat you depending on what you wear.
          </p>
          <div className="pt-6">
            <RevealGrid items={JOBS} />
          </div>
        </Chapter>

        <MirrorEgo />

        <Chapter id="chapter-06" index="06" title="The designer">
          <p>
            Not screenshots. Every project is a question that got answered:{" "}
            <Emph>problem, thinking, design, outcome.</Emph>
          </p>
          <div className="pt-6">
            <RevealGrid items={WORK} />
          </div>
        </Chapter>

        <Marquee items={TECH_ITEMS} variant="pills" speed="normal" />

        <NoorWhisper text="Have you prayed today?" />

        <Whisper text="Some answers refuse to be written. They have to be typed." tag="stay with it" />

        <Chapter id="chapter-07" index="07" title="The builder">
          <p>
            Some things are easier to show than to say. Type something. Guess something. Nothing
            here will break.
          </p>
          <div className="pt-6">
            <Terminal />
          </div>
        </Chapter>

        <Marquee items={PHILOSOPHY_ITEMS} reverse variant="default" speed="slow" />

        <ScholarLibrary />

        <Marquee items={NOOR_ITEMS} variant="ember" speed="normal" />

        <NoorScene id="noor-three-days" eyebrow="نور — three days" title="The world is only three days">
          {HASAN_AL_BASRI.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="pt-6 font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
            Attributed to Hasan al-Basri
          </p>
        </NoorScene>

        <NoorScene id="noor-mirror-of-self" eyebrow="نور — the weighing">
          <div className="space-y-16">
            {COMPANIONS.map((saying) => (
              <NoorSaying key={saying.source} saying={saying} />
            ))}
            <NoorSaying saying={AHMAD} size="sm" />
          </div>
        </NoorScene>

        <Chapter id="chapter-08" index="08" title="The philosopher" image={lake} align="center">
          <p>
            OWAISISM isn't a company. It isn't a brand. It isn't a logo.
          </p>
          <p>
            It's simply the belief that <Emph>curiosity deserves more respect than certainty.</Emph>
          </p>
        </Chapter>

        <NoorScene
          id="noor-repentance"
          eyebrow="نور — the rain"
          title="Returning is not weakness"
          image={rainWindow}
          tone="warm"
        >
          <p>Some sins leave no mark on the body.</p>
          <p>They only darken the window you see the world through.</p>
          <p className="text-foreground">Repentance is not weakness. It is returning home.</p>
          <div className="pt-10">
            <NoorSaying saying={REPENTANCE_HADITH} size="sm" />
          </div>
        </NoorScene>

        <NoorWhisper text="No scroll is longer than the scroll of our deeds." />

        <NoorScene
          id="noor-tawakkul"
          eyebrow="نور — tawakkul"
          title="Tie your camel. Then trust Allah."
          image={roadDawn}
          tone="warm"
        >
          <p>Effort is not the opposite of trust. It is the proof of it.</p>
          <p className="text-foreground">
            Every achievement has my name on it. Every blessing has Allah's mercy behind it.
          </p>
        </NoorScene>

        <Whisper text="Before the future, there was a room with the lights still on." tag="almost there" />

        <Chapter id="chapter-09" index="09" title="The family">
          <p>
            Warm room. Rain against the window. Tea going cold because someone is talking.
          </p>
          <p>
            Before I learned programming, I learned manners. Before I learned design, I learned
            gratitude. Every lesson outside became easier because of what I learned inside my home.
            Alhamdulillah.
          </p>
          <p>
            <Emph>
              The strongest foundation I ever had wasn't built with concrete. It was built with
              values.
            </Emph>
          </p>
        </Chapter>

        <Chapter id="chapter-10" index="10" title="The future" image={road} align="center">
          <p>I don't know exactly where I'm going.</p>
          <p>
            I know exactly how I'll get there. <Emph>Curious.</Emph>
          </p>
        </Chapter>

        <DailyLight />

        <Campfire />

        <NoorFooter />
      </div>
    </main>
  );
}
