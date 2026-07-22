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
} as const;

export type SiteImageKey = keyof typeof siteImages;
