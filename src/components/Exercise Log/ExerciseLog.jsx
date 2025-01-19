import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function ExerciseLog() {
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [type, setType] = useState("reps");
  const [comments, setComments] = useState("");
  const [logs, setLogs] = useState([]);
  const [exerciseNames, setExerciseNames] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);

  // Fetch exercise names from LocalStorage
  useEffect(() => {
    const storedExerciseNames =
      JSON.parse(localStorage.getItem("exerciseNames")) || [];
    setExerciseNames(storedExerciseNames);
  }, []);

  // Update filtered exercises based on input
  useEffect(() => {
    if (exercise.trim() === "") {
      setFilteredExercises([]);
    } else {
      const filtered = exerciseNames.filter((name) =>
        name.toLowerCase().includes(exercise.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  }, [exercise, exerciseNames]);

  const handleAdd = () => {
    if (exercise && reps) {
      setLogs([
        ...logs,
        { id: Date.now(), exercise, reps: `${reps} ${type}`, comments },
      ]);
      setExercise("");
      setReps("");
      setComments("");
      setType("reps");
    }
  };

  const handleDelete = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const handleSuggestionClick = (name) => {
    setExercise(name);
    setFilteredExercises([]); // Clear suggestions after selection
  };

  return (
    <div className="tw-bg-white tw-rounded-lg tw-p-4 tw-w-full tw-mx-auto tw-space-y-6 tw-mt-2">
      {/* Search Bar and Add Button */}
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-space-y-4 md:tw-space-y-0 md:tw-space-x-4">
        {/* Exercise Input */}
        <div className="tw-relative tw-flex-1">
          <input
            type="text"
            placeholder="Exercise (e.g., Push-Ups)"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-h-10 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
          />
          {/* Suggestions Dropdown */}
          {filteredExercises.length > 0 && (
            <div className="tw-absolute tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg tw-w-full tw-max-h-40 tw-overflow-y-auto tw-z-10 tw-mt-1">
              {filteredExercises.map((name) => (
                <div
                  key={name}
                  onClick={() => handleSuggestionClick(name)}
                  className="tw-p-2 tw-cursor-pointer hover:tw-bg-blue-100 tw-transition-all"
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reps/Mins Input with Styled MUI Selector */}
        <div className="tw-flex tw-flex-1 tw-items-center tw-space-x-2">
          <input
            type="number"
            placeholder={
              type === "reps"
                ? "Enter reps (e.g., 10)"
                : type === "mins"
                ? "Enter time (e.g., 30 mins)"
                : "Enter dist (e.g., 5 km)"
            }
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-h-10 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
          />
          <FormControl variant="outlined" className="tw-w-32">
            <InputLabel id="select-type-label">Type</InputLabel>
            <Select
              labelId="select-type-label"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="tw-h-10"
              label="Type"
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#f9f9f9",
                    color: "#333",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    padding: "4px",
                  },
                },
                MenuListProps: {
                  sx: {
                    padding: 0,
                  },
                },
              }}
            >
              <MenuItem
                value="reps"
                className="hover:tw-bg-blue-100 tw-transition-all tw-py-2 tw-px-4"
              >
                Reps
              </MenuItem>
              <MenuItem
                value="mins"
                className="hover:tw-bg-blue-100 tw-transition-all tw-py-2 tw-px-4"
              >
                Minutes
              </MenuItem>
              <MenuItem
                value="kms"
                className="hover:tw-bg-blue-100 tw-transition-all tw-py-2 tw-px-4"
              >
                Kms
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Comments Input */}
        <textarea
          placeholder="Comments (optional)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-h-10 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
        ></textarea>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center hover:tw-bg-blue-600 tw-transition-all"
        >
          <AddIcon className="tw-mr-2" />
          Add
        </button>
      </div>

      {/* Exercise Log List */}
      <div className="tw-space-y-4">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log.id}
              className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-bg-gray-50 tw-border tw-border-gray-200 tw-rounded-lg tw-p-4 tw-space-y-4 md:tw-space-y-0"
            >
              <div className="tw-flex-1">
                <h4 className="tw-font-semibold tw-text-gray-700">
                  {log.exercise}
                </h4>
                <p className="tw-text-sm tw-text-gray-500">{log.reps}</p>
                {log.comments && (
                  <p className="tw-text-xs tw-text-gray-400">{log.comments}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(log.id)}
                className="tw-text-red-500 hover:tw-text-red-600 tw-transition-all"
              >
                <DeleteIcon />
              </button>
            </div>
          ))
        ) : (
          <p className="tw-text-sm tw-text-gray-500 tw-text-center">
            No exercises logged yet. Add your first exercise!
          </p>
        )}
      </div>
    </div>
  );
}
