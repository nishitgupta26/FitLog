import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TimerIcon from "@mui/icons-material/Timer";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Tooltip,
  IconButton,
  Chip,
  Fade,
  Typography,
  Alert,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import useExerciseNames from "../../stores/useExerciseNames";

const GOAL_VALUE = 60; // Universal goal for all exercise types

export default function ExerciseLog({ logs, onAddLog, onDeleteLog }) {
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [type, setType] = useState("reps");
  const [comments, setComments] = useState("");
  const [filteredExerciseNames, setFilteredExerciseNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const handleAdd = async () => {
    if (exercise && reps) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      onAddLog({
        id: Date.now(),
        exercise,
        reps: `${reps} ${type}`,
        comments,
        timestamp: new Date().toISOString(),
        value: parseInt(reps, 10),
      });

      setExercise("");
      setReps("");
      setComments("");
      setType("reps");
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const getTypeIcon = (exerciseType) => {
    switch (exerciseType) {
      case "reps":
        return <FitnessCenterIcon className="tw-w-5 tw-h-5" />;
      case "mins":
        return <TimerIcon className="tw-w-5 tw-h-5" />;
      case "kms":
        return <DirectionsRunIcon className="tw-w-5 tw-h-5" />;
      default:
        return <FitnessCenterIcon className="tw-w-5 tw-h-5" />;
    }
  };

  const handleSuggestionClick = (name) => {
    setExercise(name);
    setFilteredExerciseNames([]);
  };

  const getTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getProgressColor = (value) => {
    const percentage = (value / GOAL_VALUE) * 100;
    if (percentage >= 100) return "success";
    if (percentage >= 70) return "warning";
    return "primary";
  };

  const calculateProgress = (value) => {
    return Math.min((value / GOAL_VALUE) * 100, 100);
  };

  return (
    <div className="tw-space-y-6">
      {/* Success Message */}
      <Fade in={showSuccess}>
        <Alert
          severity="success"
          className="tw-absolute tw-top-4 tw-right-4"
          onClose={() => setShowSuccess(false)}
        >
          Exercise logged successfully!
        </Alert>
      </Fade>

      {/* Input Section */}
      <Paper
        elevation={0}
        className="tw-p-6 tw-bg-white tw-rounded-xl tw-border tw-border-gray-100"
      >
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-gap-4">
          {/* Exercise Input */}
          <div className="tw-relative">
            <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
              <FitnessCenterIcon className="tw-text-blue-500 tw-w-4 tw-h-4" />
              <Typography variant="caption" className="tw-text-gray-600">
                Exercise Name
              </Typography>
            </div>
            <input
              type="text"
              placeholder="Search exercises..."
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition-all"
            />
            {filteredExerciseNames.length > 0 && (
              <Paper className="tw-absolute tw-w-full tw-mt-1 tw-z-50 tw-max-h-48 tw-overflow-y-auto">
                {filteredExerciseNames.map((name) => (
                  <MenuItem
                    key={name}
                    onClick={() => handleSuggestionClick(name)}
                    className="tw-text-sm hover:tw-bg-blue-50"
                  >
                    {name}
                  </MenuItem>
                ))}
              </Paper>
            )}
          </div>

          {/* Count & Type Input */}
          <div className="tw-flex tw-space-x-2">
            <div className="tw-flex-1">
              <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                <Typography variant="caption" className="tw-text-gray-600">
                  Count
                </Typography>
              </div>
              <input
                type="number"
                placeholder="Enter amount"
                value={reps}
                max={GOAL_VALUE}
                onChange={(e) => setReps(e.target.value)}
                className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition-all"
              />
            </div>
            <FormControl className="tw-w-32">
              <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                <Typography variant="caption" className="tw-text-gray-600">
                  Type
                </Typography>
              </div>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="tw-text-sm"
                sx={{
                  height: "42px",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e5e7eb",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e5e7eb",
                  },
                }}
              >
                <MenuItem value="reps" className="tw-text-sm">
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <FitnessCenterIcon className="tw-w-4 tw-h-4" />
                    <span>Reps</span>
                  </div>
                </MenuItem>
                <MenuItem value="mins" className="tw-text-sm">
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <TimerIcon className="tw-w-4 tw-h-4" />
                    <span>Minutes</span>
                  </div>
                </MenuItem>
                <MenuItem value="kms" className="tw-text-sm">
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <DirectionsRunIcon className="tw-w-4 tw-h-4" />
                    <span>Kms</span>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Comments Input */}
          <div className="lg:tw-col-span-2">
            <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
              <Typography variant="caption" className="tw-text-gray-600">
                Comments (optional)
              </Typography>
            </div>
            <div className="tw-flex tw-space-x-2">
              <input
                placeholder="Add notes about your exercise..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="tw-flex-1 tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition-all"
              />
              <button
                onClick={handleAdd}
                disabled={isLoading || !exercise || !reps}
                className={`tw-px-6 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-space-x-2 tw-transition-all ${
                  isLoading || !exercise || !reps
                    ? "tw-bg-gray-100 tw-text-gray-400 tw-cursor-not-allowed"
                    : "tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600"
                }`}
              >
                {isLoading ? (
                  <CircularProgress size={20} className="tw-text-blue-200" />
                ) : (
                  <>
                    <AddIcon className="tw-w-5 tw-h-5" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Paper>

      {/* Exercise Log List */}
      <div className="tw-space-y-4">
        {logs.length > 0 ? (
          logs.map((log) => (
            <Fade in={true} key={log.id}>
              <Paper
                elevation={0}
                className="tw-p-4 tw-rounded-xl tw-border tw-border-gray-100 hover:tw-border-blue-100 tw-transition-all"
              >
                <div className="tw-flex tw-justify-between tw-items-start tw-mb-3">
                  <div className="tw-flex tw-items-start tw-space-x-4">
                    <div className="tw-bg-blue-50 tw-p-2 tw-rounded-lg tw-text-blue-500">
                      {getTypeIcon(log.reps.split(" ")[1])}
                    </div>
                    <div>
                      <div className="tw-flex tw-items-center tw-space-x-2">
                        <Typography
                          variant="subtitle1"
                          className="tw-font-medium"
                        >
                          {log.exercise}
                        </Typography>
                        <Chip
                          label={log.reps}
                          size="small"
                          className="tw-bg-blue-50 tw-text-blue-600"
                        />
                        {log.timestamp && (
                          <Typography
                            variant="caption"
                            className="tw-text-gray-400"
                          >
                            • {getTimeAgo(log.timestamp)}
                          </Typography>
                        )}
                      </div>
                      {log.comments && (
                        <Typography
                          variant="body2"
                          className="tw-text-gray-500 tw-mt-1"
                        >
                          {log.comments}
                        </Typography>
                      )}
                    </div>
                  </div>
                  <IconButton
                    onClick={() => onDeleteLog(log.id)}
                    className="tw-text-gray-400 hover:tw-text-red-500 tw-transition-colors"
                    size="small"
                  >
                    <DeleteIcon className="tw-w-5 tw-h-5" />
                  </IconButton>
                </div>

                {/* Progress Section */}
                <div className="tw-mt-4">
                  <div className="tw-flex tw-justify-between tw-items-center tw-mb-1">
                    <Typography variant="caption" className="tw-text-gray-600">
                      Progress toward goal ({GOAL_VALUE}{" "}
                      {log.reps.split(" ")[1]})
                    </Typography>
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <Typography
                        variant="caption"
                        className="tw-text-gray-600"
                      >
                        {log.value}/{GOAL_VALUE}
                      </Typography>
                      {log.value >= GOAL_VALUE && (
                        <Tooltip title="Goal achieved!">
                          <EmojiEventsIcon className="tw-w-4 tw-h-4 tw-text-yellow-500" />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(log.value)}
                    color={getProgressColor(log.value)}
                    className="tw-rounded-full"
                    sx={{
                      height: 8,
                      backgroundColor: "#f3f4f6",
                    }}
                  />
                  {log.value >= GOAL_VALUE && (
                    <Typography
                      variant="caption"
                      className="tw-text-green-600 tw-mt-2 tw-block"
                    >
                      🎉 Amazing! You've reached your goal for this exercise!
                    </Typography>
                  )}
                </div>
              </Paper>
            </Fade>
          ))
        ) : (
          <div className="tw-text-center tw-py-12">
            <FitnessCenterIcon className="tw-w-16 tw-h-16 tw-text-gray-200 tw-mb-4" />
            <Typography variant="h6" className="tw-text-gray-400 tw-mb-2">
              No exercises logged yet
            </Typography>
            <Typography variant="body2" className="tw-text-gray-400">
              Start tracking your workout progress by adding exercises above
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
