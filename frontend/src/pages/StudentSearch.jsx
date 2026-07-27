import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FilterListIcon from "@mui/icons-material/FilterList";
import SchoolIcon from "@mui/icons-material/School";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VerifiedIcon from "@mui/icons-material/Verified";
import QrCode2Icon from "@mui/icons-material/QrCode2";

import MainLayout from "../layouts/MainLayout";
import SearchInput from "../components/common/SearchInput";
import StudentTable from "../components/student/StudentTable";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StatCard from "../components/common/StatCard";
import PageCard from "../components/common/PageCard";
import SessionConfirmModal from "../components/student/SessionConfirmModal";
import PrimaryButton from "../components/common/PrimaryButton";

import { getStudents } from "../api/studentApi";
import { createSession } from "../api/sessionApi";
import colors from "../theme/colors";

function StudentSearch({ onSessionCreated }) {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  // Modal & Session state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [createdSessionInfo, setCreatedSessionInfo] = useState(null);

  // Alert Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error loading student database:", error);
      showSnackbar("Failed to fetch student database. Loaded local records.", "warning");
    } finally {
      setIsLoading(false);
    }
  };

  // Distinct classes for quick filter chips
  const classOptions = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.class) set.add(s.class);
    });
    return Array.from(set).sort();
  }, [students]);

  // Filtered Students computation
  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase().trim();
    return students.filter((student) => {
      const matchesSearch =
        !query ||
        (student.name && student.name.toLowerCase().includes(query)) ||
        (student.id && student.id.toString().toLowerCase().includes(query));

      const matchesClass =
        selectedClass === "ALL" || student.class === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [students, search, selectedClass]);

  // Statistics
  const stats = useMemo(() => {
    return {
      totalStudents: students.length,
      filteredCount: filteredStudents.length,
      classCount: classOptions.length,
      readyCount: students.length,
    };
  }, [students, filteredStudents, classOptions]);

  // Handlers
  const handleOpenSessionModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseSessionModal = () => {
    if (isCreatingSession) return;
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleConfirmCreateSession = async () => {
    if (!selectedStudent) return;

    try {
      setIsCreatingSession(true);
      const res = await createSession(selectedStudent.name);

      const sessionData = {
        sessionId: res.data.session_id,
        student: selectedStudent,
        createdAt: new Date().toISOString(),
      };
      showSnackbar(
        `Session created for ${selectedStudent.name}! (ID: ${res.data.session_id})`,
        "success"
      );

      setCreatedSessionInfo(sessionData);

      if (onSessionCreated) {
        onSessionCreated(sessionData);
      }

      navigate("/camera", { state: sessionData });
    } catch (err) {
      console.error("Failed to create capture session:", err);
      showSnackbar("Failed to create session with backend API. Please retry.", "error");
    } finally {
      setIsCreatingSession(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <MainLayout>
      {/* Page Title & Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Student Directory & Photo Capture
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              BSEK Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Search student records from Firebase, select a candidate, and initialize camera capture session.
          </p>
        </div>

        {createdSessionInfo && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 p-3 rounded-xl shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <QrCode2Icon sx={{ fontSize: 22 }} />
            </div>
            <div className="text-xs">
              <p className="font-bold text-emerald-900">Active Session Initialized</p>
              <p className="text-emerald-700 font-mono text-[11px]">
                ID: {createdSessionInfo.sessionId}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtext="Firebase database sync"
          icon={PeopleIcon}
          iconBgColor={colors.primary}
          accentColor={colors.primary}
        />
        <StatCard
          title="Search Results"
          value={stats.filteredCount}
          subtext={search ? `Matching "${search}"` : "Active catalog view"}
          icon={FilterListIcon}
          iconBgColor={colors.secondary}
          accentColor={colors.secondary}
        />
        <StatCard
          title="Classes Registered"
          value={stats.classCount}
          subtext="Academic divisions"
          icon={SchoolIcon}
          iconBgColor="#2563EB"
          accentColor="#2563EB"
        />
        <StatCard
          title="Camera Readiness"
          value={`${stats.totalStudents} Ready`}
          subtext="Pending BSEK submission"
          icon={PhotoCameraIcon}
          iconBgColor="#16A34A"
          accentColor="#16A34A"
        />
      </div>

      {/* Search & Filter Controls Section */}
      <PageCard
        title="Filter & Search Records"
        subtitle="Search by Student ID or Student Name"
        padding="p-5"
      >
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search by Student ID (e.g. APS-2025-001) or Name (e.g. Fatima)..."
              />
            </div>
            {search && (
              <PrimaryButton
                variant="outline"
                size="md"
                onClick={() => setSearch("")}
                className="shrink-0"
              >
                Clear Search
              </PrimaryButton>
            )}
          </div>

          {/* Quick Filter Chips for Classes */}
          <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Class Filter:
            </span>
            <button
              onClick={() => setSelectedClass("ALL")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedClass === "ALL"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              All Classes ({students.length})
            </button>
            {classOptions.map((cls) => {
              const count = students.filter((s) => s.class === cls).length;
              return (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedClass === cls
                    ? "bg-blue-800 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {cls} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </PageCard>

      {/* Student Table */}
      {isLoading ? (
        <LoadingSpinner message="Fetching students from Firebase Realtime Database..." fullPage />
      ) : (
        <StudentTable
          students={filteredStudents}
          onSelectStudent={handleOpenSessionModal}
          onResetSearch={() => {
            setSearch("");
            setSelectedClass("ALL");
          }}
        />
      )}

      {/* Session Confirmation Modal */}
      <SessionConfirmModal
        open={isModalOpen}
        student={selectedStudent}
        onClose={handleCloseSessionModal}
        onConfirm={handleConfirmCreateSession}
        loading={isCreatingSession}
      />

      {/* Feedback Snackbar Toast */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: "12px", fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}

export default StudentSearch;
