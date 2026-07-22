import {
  Container,
  Section,
  SectionHeader,
} from "@/components/ui";
import { PhotoCollage, StoryBand } from "@/components/SceneVisuals";
import {
  AboutFocusGrid,
  AboutStoryBlock,
  PageHeroCopy,
} from "@/components/PageMotion";
import { projectStory } from "@/lib/projectStory";
import type { PitchIconName } from "@/lib/workshopPitch";
import type { SiteImageKey } from "@/lib/siteImages";

export const metadata = {
  title: "About | Sketchy Phonics",
  description:
    "About Phonics Assam — Komal Goenka’s literacy mission for confident young readers in government schools.",
};

const focusItems: {
  title: string;
  detail: string;
  icon: PitchIconName;
  image: SiteImageKey;
}[] = [
  {
    title: "Structured phonics",
    detail:
      "A clear approach so young learners can blend sounds, decode words, and read with confidence.",
    icon: "sound",
    image: "kidsRead",
  },
  {
    title: "Teacher capacity building",
    detail:
      "Training that helps dedicated educators bring songs, stories, actions, and phonics into real classrooms.",
    icon: "write",
    image: "classroom",
  },
  {
    title: "Statewide classroom impact",
    detail: projectStory.today,
    icon: "camera",
    image: "kidsSchool",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <Section className="border-b border-line py-6 sm:py-8">
        <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <PageHeroCopy
            eyebrow="About the Project"
            title="It all began with a simple vision"
            detail={projectStory.belief}
          />
          <PhotoCollage images={["kidsPlay", "teacherClass", "books"]} />
        </Container>
      </Section>

      <Section>
        <Container>
          <AboutStoryBlock />
        </Container>
      </Section>

      <StoryBand
        image="kidsPlay"
        eyebrow="The pilot"
        title={projectStory.pilot}
        detail={projectStory.classroomMoments}
        tone="page"
      />

      <StoryBand
        image="kidsRead"
        eyebrow="The movement"
        title={projectStory.growth}
        detail={`${projectStory.today} ${projectStory.visionClose}`}
        align="right"
        tone="page"
      />

      <Section>
        <Container className="space-y-6">
          <SectionHeader
            eyebrow="What we focus on"
            title="Foundational reading that lasts"
            description={projectStory.closingLine}
          />
          <AboutFocusGrid items={focusItems} />
        </Container>
      </Section>
    </div>
  );
}
