import {
  Button,
  Container,
  Section,
} from "@/components/ui";
import { ClassroomCtaBand, PhotoCollage, StoryBand } from "@/components/SceneVisuals";
import { PageHeroCopy } from "@/components/PageMotion";
import { YouTubeVideoGrid } from "@/components/YouTubeEmbed";

export const metadata = {
  title: "Reading Success in Assam | Sketchy Phonics",
  description:
    "Across classrooms in Assam, children who once struggled with letters and sounds now read with confidence — authentic classroom evidence of effective reading instruction.",
};

const successVideos = [
  {
    url: "https://youtube.com/shorts/HH_Awr5oImg",
    title: "Blending techniques — children learn spellings with confidence",
  },
  {
    url: "https://youtube.com/shorts/0ThdojyhjLc",
    title: "Blending becoming easy for young readers",
  },
  {
    url: "https://youtu.be/zQEQymbvBJg",
    title: "Classroom reading success in Assam",
  },
  {
    url: "https://youtu.be/lsAIAEA0eGg",
    title: "Phonics practice in real classrooms",
  },
  {
    url: "https://youtube.com/shorts/l2q_p5jNI-I",
    title: "Short classroom moment from Assam",
  },
  {
    url: "https://youtu.be/KTR3srCAeVg",
    title: "Children reading with structured phonics support",
  },
];

export default function ReadingSuccessPage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-line bg-background pt-28 sm:pt-32 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(182,106,203,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(182,106,203,0.08),_transparent_50%)]" />
        <Container className="relative grid items-center gap-10 pb-14 pt-6 lg:grid-cols-2 lg:gap-12 lg:pb-20 lg:pt-8">
          <PageHeroCopy
            eyebrow="Sketchy Phonics"
            title="Reading Success in Assam"
            detail="Across classrooms in Assam, thousands of children who once struggled to recognise letters and sounds are now reading words and sentences with confidence."
          >
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="#classroom-videos" variant="accent">
                Watch classroom moments
              </Button>
              <Button href="/galleries?tab=common" variant="outline">
                Browse galleries
              </Button>
            </div>
          </PageHeroCopy>
          <PhotoCollage images={["aboutHero", "aboutBlend", "aboutBooks"]} />
        </Container>
      </section>

      <StoryBand
        image="aboutFutures"
        eyebrow="Authentic evidence"
        title="Not rehearsed performances"
        detail="These videos capture genuine classroom moments — authentic evidence of what is possible when teachers are empowered with effective reading instruction."
        tone="page"
      />

      <div id="classroom-videos">
        <YouTubeVideoGrid
          videos={successVideos}
          eyebrow="Classroom moments"
          title="See reading confidence take shape"
          detail="Real lessons. Real teachers. Real children learning to read — across Assam."
        />
      </div>

      <Section className="py-10 sm:py-14">
        <Container className="mx-auto max-w-2xl space-y-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Keep exploring
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            More moments from Assam classrooms
          </h2>
          <p className="text-base leading-7 text-muted">
            Browse shared photos and location galleries from training days and
            school visits across the state.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button href="/galleries?tab=common" variant="accent">
              Common Gallery
            </Button>
            <Button href="/about" variant="outline">
              About Our Journey
            </Button>
          </div>
        </Container>
      </Section>

      <ClassroomCtaBand
        eyebrow="The vision continues"
        title="Every child in Assam deserves to read with confidence."
        detail="When teachers have the tools for structured phonics, classrooms become places where reading success is visible — one sound, one word, one sentence at a time."
        primaryHref="/galleries?tab=common"
        primaryLabel="See classroom moments"
        secondaryHref="/about"
        secondaryLabel="Read the full story"
      />
    </div>
  );
}
