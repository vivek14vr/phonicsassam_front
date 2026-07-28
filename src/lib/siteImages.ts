/** Curated local scene photos matched to site content. */
export const siteImages = {
  kidsPlay: {
    src: "/scenes/kids-play.jpg",
    alt: "Children playing and exploring together outdoors",
  },
  kidsLearning: {
    src: "/scenes/kids-learning.jpg",
    alt: "Children focused on learning together",
  },
  classroom: {
    src: "/scenes/classroom.jpg",
    alt: "Students learning in a bright classroom",
  },
  books: {
    src: "/scenes/books.jpg",
    alt: "Colorful books ready for early readers",
  },
  kidsSchool: {
    src: "/scenes/kids-school.jpg",
    alt: "School children smiling and ready for class",
  },
  teacherClass: {
    src: "/scenes/teacher-class.jpg",
    alt: "Teacher guiding students in the classroom",
  },
  kidsRead: {
    src: "/scenes/kids-read.jpg",
    alt: "Young children reading and discovering letters",
  },
  school: {
    src: "/scenes/school-building.jpg",
    alt: "A welcoming school building",
  },
  /** About page — Assam classroom & training photos */
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
} as const;

export type SiteImageKey = keyof typeof siteImages;
