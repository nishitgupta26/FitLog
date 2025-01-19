import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import useExerciseNames from "../../stores/useExerciseNames";

export default function ExerciseLog({ logs, onAddLog, onDeleteLog }) {
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [type, setType] = useState("reps");
  const [comments, setComments] = useState("");
  const [filteredExerciseNames, setFilteredExerciseNames] = useState([]);
  const exerciseNames = useExerciseNames((state) => state.exerciseNames);

  useEffect(() => {
    if (exercise.trim() === "") {
      setFilteredExerciseNames([]);
    } else {
      const filtered = exerciseNames.filter((name) =>
        name.toLowerCase().includes(exercise.toLowerCase())
      );
      setFilteredExerciseNames(filtered);
    }
  }, [exercise, exerciseNames]);

  const handleAdd = () => {
    if (exercise && reps) {
      onAddLog({
        id: Date.now(),
        exercise,
        reps: `${reps} ${type}`,
        comments,
      });
      setExercise("");
      setReps("");
      setComments("");
      setType("reps");
    }
  };

  const handleDelete = (id) => {
    onDeleteLog(id);
  };

  const handleSuggestionClick = (name) => {
    setExercise(name);
    setFilteredExerciseNames([]);
  };

  return (
    <div className="tw-bg-white tw-rounded-lg tw-p-2 sm:tw-p-4 tw-w-full tw-mx-auto tw-space-y-4 sm:tw-space-y-6 tw-mt-2">
      {/* Input Section */}
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-3 sm:tw-gap-4">
        {/* Exercise Input */}
        <div className="tw-relative">
          <input
            type="text"
            placeholder="Exercise (e.g., Push-Ups)"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 sm:tw-px-4 tw-py-2 tw-text-sm tw-h-10 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
          />
          {/* Suggestions Dropdown */}
          {filteredExerciseNames.length > 0 && (
            <div className="tw-absolute tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg tw-w-full tw-max-h-40 tw-overflow-y-auto tw-z-10 tw-mt-1">
              {filteredExerciseNames.map((name) => (
                <div
                  key={name}
                  onClick={() => handleSuggestionClick(name)}
                  className="tw-p-2 tw-cursor-pointer hover:tw-bg-blue-100 tw-transition-all tw-text-sm"
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reps/Time Input with Type Selector */}
        <div className="tw-flex tw-gap-2">
          <input
            type="number"
            placeholder={
              type === "reps"
                ? "Enter reps"
                : type === "mins"
                ? "Enter mins"
                : "Enter km"
            }
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="tw-flex-1 tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 sm:tw-px-4 tw-py-2 tw-text-sm tw-h-10 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
          />
          <FormControl variant="outlined" className="tw-w-24 sm:tw-w-32">
            <InputLabel id="select-type-label" className="tw-text-sm">
              Type
            </InputLabel>
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
                    borderRadius: "8px",
                    marginTop: "4px",
                  },
                },
              }}
            >
              <MenuItem value="reps" className="tw-text-sm">
                Reps
              </MenuItem>
              <MenuItem value="mins" className="tw-text-sm">
                Minutes
              </MenuItem>
              <MenuItem value="kms" className="tw-text-sm">
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
          className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 sm:tw-px-4 tw-py-2 tw-text-sm tw-h-10 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-resize-none"
        />

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-justify-center hover:tw-bg-blue-600 tw-transition-all tw-h-10"
        >
          <AddIcon className="tw-mr-2" />
          <span className="tw-text-sm">Add</span>
        </button>
      </div>

      {/* Exercise Log List */}
      <div className="tw-space-y-3 sm:tw-space-y-4">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log.id}
              className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-start sm:tw-items-center tw-bg-gray-50 tw-border tw-border-gray-200 tw-rounded-lg tw-p-3 sm:tw-p-4 tw-space-y-2 sm:tw-space-y-0"
            >
              <div className="tw-flex-1 tw-space-y-1">
                <div className="tw-flex tw-items-center tw-justify-between sm:tw-justify-start tw-gap-4">
                  <h4 className="tw-font-semibold tw-text-gray-700 tw-text-sm sm:tw-text-base">
                    {log.exercise}
                  </h4>
                  <p className="tw-text-xs sm:tw-text-sm tw-text-gray-500">
                    {log.reps}
                  </p>
                </div>
                {log.comments && (
                  <p className="tw-text-xs tw-text-gray-400 tw-break-words">
                    {log.comments}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(log.id)}
                className="tw-text-red-500 hover:tw-text-red-600 tw-transition-all sm:tw-ml-4"
              >
                <DeleteIcon className="tw-w-5 tw-h-5" />
              </button>
            </div>
          ))
        ) : (
          <p className="tw-text-sm tw-text-gray-500 tw-text-center tw-py-4">
            No exercises logged yet. Add your first exercise!
          </p>
        )}
      </div>
    </div>
  );
}
