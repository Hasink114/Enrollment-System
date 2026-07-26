import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import ClassIcon from "@mui/icons-material/Class";
import GroupsIcon from "@mui/icons-material/Groups";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import PrimaryButton from "../common/PrimaryButton";
import colors from "../../theme/colors";

function StudentTable({ students = [], onSelectStudent, onResetSearch }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <TableContainer className="max-h-[600px] overflow-auto">
        <Table stickyHeader aria-label="student list table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "#F8FAFC",
                  color: "#475569",
                  fontWeight: 700,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid #E2E8F0",
                  py: "14px",
                },
              }}
            >
              <TableCell width="180px">
                <div className="flex items-center gap-1.5">
                  <BadgeIcon sx={{ fontSize: 16 }} className="text-slate-400" />
                  <span>Student ID</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <SchoolIcon sx={{ fontSize: 16 }} className="text-slate-400" />
                  <span>Student Name</span>
                </div>
              </TableCell>
              <TableCell width="120px">
                <div className="flex items-center gap-1.5">
                  <ClassIcon sx={{ fontSize: 16 }} className="text-slate-400" />
                  <span>Class</span>
                </div>
              </TableCell>
              <TableCell width="110px">Section</TableCell>
              <TableCell width="160px">
                <div className="flex items-center gap-1.5">
                  <GroupsIcon sx={{ fontSize: 16 }} className="text-slate-400" />
                  <span>Group</span>
                </div>
              </TableCell>
              <TableCell align="center" width="160px">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <SearchOffIcon sx={{ fontSize: 28 }} />
                    </div>
                    <p className="text-base font-semibold text-slate-800">
                      No matching students found
                    </p>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Try adjusting your search query by Student ID or Student Name.
                    </p>
                    {onResetSearch && (
                      <button
                        onClick={onResetSearch}
                        className="text-xs font-semibold text-blue-700 hover:underline pt-1 cursor-pointer"
                      >
                        Clear search filters
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow
                  key={student.firebaseKey || student.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#F8FAFC",
                    },
                    "& td": {
                      borderBottom: "1px solid #F1F5F9",
                      py: "12px",
                    },
                    transition: "background-color 0.15s ease",
                  }}
                >
                  {/* Student ID */}
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 font-mono font-bold text-xs border border-blue-100">
                      {student.id}
                    </span>
                  </TableCell>

                  {/* Student Name */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold flex items-center justify-center text-xs shrink-0">
                        {student.name ? student.name.charAt(0).toUpperCase() : "S"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm leading-tight">
                          {student.name}
                        </p>
                        {student.gender && (
                          <span className="text-[11px] text-slate-400 font-medium">
                            {student.gender}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Class */}
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
                      {student.class}
                    </span>
                  </TableCell>

                  {/* Section */}
                  <TableCell>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200">
                      {student.section}
                    </span>
                  </TableCell>

                  {/* Group */}
                  <TableCell>
                    <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 inline-block">
                      {student.group}
                    </span>
                  </TableCell>

                  {/* Action */}
                  <TableCell align="center">
                    <PrimaryButton
                      size="sm"
                      variant="primary"
                      onClick={() => onSelectStudent && onSelectStudent(student)}
                      startIcon={<PhotoCameraIcon sx={{ fontSize: 14 }} />}
                    >
                      Capture Photo
                    </PrimaryButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table Footer / Summary Bar */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing {students.length} student records</span>
        <span className="hidden sm:inline">Click "Capture Photo" to launch BSEK passport workflow</span>
      </div>
    </div>
  );
}

export default StudentTable;
