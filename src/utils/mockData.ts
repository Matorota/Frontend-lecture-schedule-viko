// Mock data for testing without backend API
import type { Group, Lecture, User } from "../types";

export const mockGroups: Group[] = [
  { ID: 1, Name: "PI23A", External_ID: "group-pi23a" },
  { ID: 2, Name: "PI23B", External_ID: "group-pi23b" },
  { ID: 3, Name: "KS23A", External_ID: "group-ks23a" },
  { ID: 4, Name: "KS23B", External_ID: "group-ks23b" },
  { ID: 5, Name: "IS23A", External_ID: "group-is23a" },
];

export const mockUser: User = {
  id: 1,
  firstName: "Jonas",
  lastName: "Kazlauskas",
  group: {
    id: 1,
    name: "PI23A",
  },
};

export const mockLectures: Lecture[] = [
  {
    ID: 1,
    Date: "2026-02-08",
    Period: "1",
    StartTime: "08:00",
    EndTime: "09:30",
    Subject: {
      ID: 1,
      Name: "Web Development",
      External_ID: "subj-web-dev",
    },
    Lecturers: [
      {
        ID: 1,
        Name: "Dr. Smith Johnson",
        External_ID: "lect-smith",
      },
    ],
    Rooms: [
      {
        ID: 1,
        RoomNumber: "A-301",
        External_ID: "room-a301",
      },
    ],
    Groups: [
      {
        ID: 1,
        Name: "PI23A",
        External_ID: "group-pi23a",
      },
    ],
    Colors: [
      {
        ID: 1,
        Hex: "#3B82F6",
      },
    ],
  },
  {
    ID: 2,
    Date: "2026-02-08",
    Period: "2",
    StartTime: "10:00",
    EndTime: "11:30",
    Subject: {
      ID: 2,
      Name: "Database Systems",
      External_ID: "subj-db-sys",
    },
    Lecturers: [
      {
        ID: 2,
        Name: "Prof. Anna Taylor",
        External_ID: "lect-taylor",
      },
    ],
    Rooms: [
      {
        ID: 2,
        RoomNumber: "B-205",
        External_ID: "room-b205",
      },
    ],
    Groups: [
      {
        ID: 1,
        Name: "PI23A",
        External_ID: "group-pi23a",
      },
    ],
    Colors: [
      {
        ID: 2,
        Hex: "#10B981",
      },
    ],
  },
  {
    ID: 3,
    Date: "2026-02-08",
    Period: "3",
    StartTime: "12:00",
    EndTime: "13:30",
    Subject: {
      ID: 3,
      Name: "Computer Networks",
      External_ID: "subj-networks",
    },
    Lecturers: [
      {
        ID: 3,
        Name: "Dr. Michael Brown",
        External_ID: "lect-brown",
      },
    ],
    Rooms: [
      {
        ID: 3,
        RoomNumber: "C-102",
        External_ID: "room-c102",
      },
    ],
    Groups: [
      {
        ID: 1,
        Name: "PI23A",
        External_ID: "group-pi23a",
      },
    ],
    Colors: [
      {
        ID: 3,
        Hex: "#F59E0B",
      },
    ],
  },
  {
    ID: 4,
    Date: "2026-02-09",
    Period: "1",
    StartTime: "08:00",
    EndTime: "09:30",
    Subject: {
      ID: 4,
      Name: "Software Engineering",
      External_ID: "subj-soft-eng",
    },
    Lecturers: [
      {
        ID: 4,
        Name: "Dr. Sarah Williams",
        External_ID: "lect-williams",
      },
    ],
    Rooms: [
      {
        ID: 4,
        RoomNumber: "A-405",
        External_ID: "room-a405",
      },
    ],
    Groups: [
      {
        ID: 1,
        Name: "PI23A",
        External_ID: "group-pi23a",
      },
    ],
    Colors: [
      {
        ID: 4,
        Hex: "#EF4444",
      },
    ],
  },
  {
    ID: 5,
    Date: "2026-02-09",
    Period: "2",
    StartTime: "10:00",
    EndTime: "11:30",
    Subject: {
      ID: 5,
      Name: "Algorithms",
      External_ID: "subj-algorithms",
    },
    Lecturers: [
      {
        ID: 5,
        Name: "Prof. David Martinez",
        External_ID: "lect-martinez",
      },
    ],
    Rooms: [
      {
        ID: 5,
        RoomNumber: "B-308",
        External_ID: "room-b308",
      },
    ],
    Groups: [
      {
        ID: 1,
        Name: "PI23A",
        External_ID: "group-pi23a",
      },
    ],
    Colors: [
      {
        ID: 5,
        Hex: "#8B5CF6",
      },
    ],
  },
];

// Helper function to generate mock lectures for a date range
export const generateMockLecturesForRange = (
  dateFrom: string,
  dateTo: string
): Lecture[] => {
  const start = new Date(dateFrom);
  const end = new Date(dateTo);
  const lectures: Lecture[] = [];
  let id = 100;

  const subjects = [
    { name: "Mathematics", color: "#3B82F6" },
    { name: "Physics", color: "#10B981" },
    { name: "Programming", color: "#F59E0B" },
    { name: "English", color: "#EF4444" },
    { name: "History", color: "#8B5CF6" },
  ];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    // Skip weekends
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const dateStr = d.toISOString().split("T")[0];
    const lectureCount = Math.floor(Math.random() * 4) + 1;

    for (let i = 0; i < lectureCount; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const startHour = 8 + i * 2;
      const endHour = startHour + 1.5;

      lectures.push({
        ID: id++,
        Date: dateStr,
        Period: String(i + 1),
        StartTime: `${String(startHour).padStart(2, "0")}:00`,
        EndTime: `${String(Math.floor(endHour)).padStart(2, "0")}:${
          endHour % 1 === 0.5 ? "30" : "00"
        }`,
        Subject: {
          ID: i + 1,
          Name: subject.name,
          External_ID: `subj-${i}`,
        },
        Lecturers: [
          {
            ID: i + 1,
            Name: `Dr. Lecturer ${i + 1}`,
            External_ID: `lect-${i}`,
          },
        ],
        Rooms: [
          {
            ID: i + 1,
            RoomNumber: `${String.fromCharCode(65 + i)}-${100 + i * 100}`,
            External_ID: `room-${i}`,
          },
        ],
        Groups: [
          {
            ID: 1,
            Name: "PI23A",
            External_ID: "group-pi23a",
          },
        ],
        Colors: [
          {
            ID: i + 1,
            Hex: subject.color,
          },
        ],
      });
    }
  }

  return lectures;
};
