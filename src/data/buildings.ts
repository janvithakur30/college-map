export type BuildingStat = {
  label: string;
  value: string;
};

export type Building = {
  id: string;
  title: string;
  description: string;
  images: string[];
  stats: BuildingStat[];
};

export const buildings: Building[] = [
  {
    id: "pharmacy",
    title: "Pharmacy Block",
    description:
      "Main academic block for pharmacy with lecture halls, research labs, and faculty offices.",
    images: [
      "/building/pharmacy%20block/pharmacy.png",
      "/building/pharmacy%20block/pharmacy%20block.jpeg",
      "/building/pharmacy%20block/pharmacy%20block2.jpg",
      "/building/pharmacy%20block/pharmacy%20block%205.jpeg",
      "/building/pharmacy%20block/pharmacy%206.jpg",
      "/building/pharmacy%20block/Z.jpeg",
    ],
    stats: [
      { label: "Labs", value: "4" },
      { label: "Classrooms", value: "10" },
      { label: "Floors", value: "4" },
    ],
  },
  {
    id: "admin",
    title: "Admin Block",
    description:
      "Central administrative hub with principal office, exam cell, and student services.",
    images: [
      "/building/Admin%20block/admin%20block.jpeg",
      "/building/Admin%20block/admin%20block%202.jpeg",
      "/building/Admin%20block/admin%20block%203.jpeg",
    ],
    stats: [
      { label: "Offices", value: "8" },
      { label: "Service Desks", value: "3" },
      { label: "Floors", value: "3" },
    ],
  },
  {
    id: "it",
    title: "IT & Management",
    description:
      "Dedicated space for IT and management programs with modern computer labs and seminar rooms.",
    images: ["/building/IT-Management/management.jpeg"],
    stats: [
      { label: "Computer Labs", value: "3" },
      { label: "Classrooms", value: "6" },
      { label: "Seminar Halls", value: "2" },
    ],
  },
  {
    id: "canteen",
    title: "Canteen",
    description:
      "Vibrant canteen area for students and staff with a variety of snacks and meals.",
    images: ["/building/canteen/canteen.jpeg"],
    stats: [
      { label: "Seating", value: "120+" },
      { label: "Counters", value: "3" },
      { label: "Open Hours", value: "8am–6pm" },
    ],
  },
  {
    id: "basket",
    title: "Basketball Court",
    description:
      "Outdoor sports facility for basketball and campus events.",
    images: [
      "/building/basketball%20court/basketball.jpeg",
      "/building/basketball%20court/basketball%202.jpeg",
    ],
    stats: [
      { label: "Courts", value: "1" },
      { label: "Capacity", value: "200+" },
    ],
  },
  {
    id: "park",
    title: "Laureate Park",
    description:
      "Green recreational area with benches and walking paths.",
    images: ["/building/laureate%20park/laureate%20garden%202.jpg"],
    stats: [
      { label: "Area", value: "Large" },
      { label: "Features", value: "Gardens" },
    ],
  },
  {
    id: "gate",
    title: "Main Gate",
    description:
      "Main entrance gate with college boundary and security.",
    images: [
      "/building/main%20gate/college%20gate.jpeg",
      "/building/main%20gate/college%20gate%203.jpg",
      "/building/main%20gate/college%20gate%204.jpg",
    ],
    stats: [
      { label: "Entrance", value: "Main" },
      { label: "Security", value: "24/7" },
    ],
  },
];
