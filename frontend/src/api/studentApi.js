import { ref, get } from "firebase/database";
import { database } from "../firebase/firebase";

// Fallback sample students if Firebase is unreachable or empty
const FALLBACK_STUDENTS = [
  { firebaseKey: "s1", id: "APS-2025-001", name: "Muhammad Ali", class: "Class IX", section: "A", group: "Computer Science", gender: "Male" },
  { firebaseKey: "s2", id: "APS-2025-002", name: "Fatima Zahra", class: "Class IX", section: "B", group: "Biology", gender: "Female" },
  { firebaseKey: "s3", id: "APS-2025-003", name: "Ahmed Hassan", class: "Class X", section: "A", group: "Computer Science", gender: "Male" },
  { firebaseKey: "s4", id: "APS-2025-004", name: "Ayesha Khan", class: "Class X", section: "C", group: "General Science", gender: "Female" },
  { firebaseKey: "s5", id: "APS-2025-005", name: "Bilal Malik", class: "Class IX", section: "A", group: "Computer Science", gender: "Male" },
  { firebaseKey: "s6", id: "APS-2025-006", name: "Zainab Raza", class: "Class X", section: "B", group: "Biology", gender: "Female" },
  { firebaseKey: "s7", id: "APS-2025-007", name: "Omar Farooq", class: "Class VIII", section: "A", group: "General Science", gender: "Male" },
  { firebaseKey: "s8", id: "APS-2025-008", name: "Sara Ahmed", class: "Class VIII", section: "B", group: "General Science", gender: "Female" },
];

export const getStudents = async () => {
  try {
    const snapshot = await get(ref(database, "Students"));

    if (!snapshot.exists()) {
      console.warn("Firebase returned no students, using fallback catalog.");
      return FALLBACK_STUDENTS;
    }

    const students = [];

    snapshot.forEach((child) => {
      const val = child.val();
      const info = val?.information || val;

      if (info) {
        students.push({
          firebaseKey: child.key,
          id: info.id || info.student_id || child.key,
          name: info.Name || info.name || "Unknown Student",
          class: info.Class || info.class || "N/A",
          section: info.Section || info.section || "N/A",
          group: info.Group || info.group || "General",
          gender: info.Gender || info.gender || "N/A"
        });
      }
    });

    if (students.length === 0) {
      return FALLBACK_STUDENTS;
    }

    students.sort((a, b) => a.name.localeCompare(b.name));
    return students;
  } catch (error) {
    console.error("Firebase read error, falling back to local records:", error);
    return FALLBACK_STUDENTS;
  }
};
