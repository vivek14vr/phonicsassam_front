/** Project-owned photos supplied in public/images, matched to site content. */
export const siteImages = {
  kidsPlay: {
    src: "/images/img2.jpeg",
    alt: "Goalpara educators celebrating a phonics training session",
  },
  kidsLearning: {
    src: "/images/img7.jpeg",
    alt: "A student sharing her vowel activity drawing",
  },
  classroom: {
    src: "/images/img1.jpeg",
    alt: "Morigaon educators gathered after district phonics training",
  },
  books: {
    src: "/images/img6.jpeg",
    alt: "Educators holding phonics teaching materials after training",
  },
  kidsSchool: {
    src: "/images/img4.jpeg",
    alt: "Smiling school children with their teacher",
  },
  teacherClass: {
    src: "/images/img8.jpeg",
    alt: "Teachers practising phonics actions during training",
  },
  kidsRead: {
    src: "/images/img5.jpeg",
    alt: "A teacher demonstrating a vowel activity during training",
    position: "center top",
  },
  school: {
    src: "/images/img10.jpeg",
    alt: "District phonics training participants gathered together",
  },
  /** About page — supplied Assam classroom and training photos. */
  aboutHero: {
    src: "/about/moment-2.jpg",
    alt: "Assam students holding Phonics Pupil Book 1 in class",
  },
  aboutClass: {
    src: "/about/classroom-1.jpg",
    alt: "Teacher training session with educators in Assam",
  },
  aboutBooks: {
    src: "/about/books-2.jpg",
    alt: "Children and teachers with Phonics Pupil Book 1",
  },
  aboutBlend: {
    src: "/about/blending.jpg",
    alt: "Children practising phonics blending at the blackboard",
  },
  aboutFutures: {
    src: "/about/futures-1.jpg",
    alt: "Schoolgirls and educators in an Assam classroom",
  },
  aboutFuturesGroup: {
    src: "/about/futures-4.jpg",
    alt: "Classroom visit with teachers and learners in Assam",
  },
  aboutTraining: {
    src: "/about/classroom-2.jpg",
    alt: "Educators engaged in phonics capacity building",
  },
  aboutPractice: {
    src: "/about/classroom-3.jpg",
    alt: "Hands-on phonics practice during teacher training",
  },
  aboutFoundation: {
    src: "/about/books-1.jpg",
    alt: "Phonics books supporting foundational reading practice",
  },
} as const;

export type SiteImageKey = keyof typeof siteImages;
