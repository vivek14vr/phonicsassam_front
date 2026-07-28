export type PitchIconName =
  | "teacher"
  | "parent"
  | "counsel"
  | "coord"
  | "content"
  | "head"
  | "coach"
  | "passion"
  | "secret"
  | "story"
  | "bulb"
  | "sound"
  | "write"
  | "group"
  | "cert"
  | "play"
  | "cards"
  | "blend"
  | "sheet"
  | "steps"
  | "tricky"
  | "bank"
  | "notes"
  | "share"
  | "map"
  | "pin"
  | "calendar"
  | "camera"
  | "school";

export type PitchCard = {
  title: string;
  detail?: string;
  icon: PitchIconName;
};

export const workshopPitch = {
  who: {
    title: "Who is this workshop for?",
    ctaLabel: "Reading Success",
    ctaHref: "/reading-success",
    items: [
      { title: "Teachers", detail: "Classroom educators building early reading skills.", icon: "teacher" as const },
      { title: "Parents", detail: "Home support for children learning letter sounds.", icon: "parent" as const },
      { title: "Counsellors", detail: "Guides helping learners with literacy confidence.", icon: "counsel" as const },
      { title: "Coordinators", detail: "Leads aligning teaching across school batches.", icon: "coord" as const },
      { title: "Content developers", detail: "Creators shaping phonics materials & lessons.", icon: "content" as const },
      { title: "School heads", detail: "Leaders investing in teacher-ready methods.", icon: "head" as const },
      { title: "Language coaches", detail: "Mentors coaching spoken & written English.", icon: "coach" as const },
      { title: "Anyone with passion", detail: "Curious learners ready to teach phonics well.", icon: "passion" as const },
    ],
  },
  learn: {
    title: "What will you learn?",
    subtitle: "Master Jolly Phonics with sketchnote techniques you can teach the next day.",
    ctaLabel: "See current workshops",
    ctaHref: "#workshop-list",
    items: [
      { title: "Untold secrets of teaching the code of English", icon: "secret" as const },
      { title: "Art of storytelling to enhance listening skills", icon: "story" as const },
      { title: "How to make abstract concepts crystal clear", icon: "bulb" as const },
      { title: "Sounds, blending & segmenting that stick", icon: "sound" as const },
      { title: "Sketchnote methods for memorable lessons", icon: "write" as const },
      { title: "Classroom games sized for real batches", icon: "group" as const },
      { title: "Tricky words & fluency pathways", icon: "tricky" as const },
      { title: "How to run confident live workshop sessions", icon: "play" as const },
    ],
  },
  resources: {
    title: "Resources you will get",
    footer: "Practical teaching kits you can reuse across classrooms and cohorts.",
    items: [
      { title: "Jolly Phonics flashcards", icon: "cards" as const },
      { title: "Consonant blends flashcards", icon: "blend" as const },
      { title: "Sample worksheets for teaching", icon: "sheet" as const },
      { title: "Systematic steps for teaching", icon: "steps" as const },
      { title: "Tricky word list", icon: "tricky" as const },
      { title: "Word bank (300 words)", icon: "bank" as const },
      { title: "Notes on every topic", icon: "notes" as const },
      { title: "Sharable certificate", icon: "cert" as const },
    ],
  },
};
