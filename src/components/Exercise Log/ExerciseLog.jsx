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
  Paper,
  IconButton,
  Chip,
  Fade,
  Typography,
  Alert,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import useExerciseNames from "../../stores/useExerciseNames";
import useGoalStore from "../../stores/useGoalStore";

export default function ExerciseLog({ mode = "progress" }) {
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [type, setType] = useState("reps");
  const [comments, setComments] = useState("");
  const [filteredExerciseNames, setFilteredExerciseNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const exerciseNames = useExerciseNames((state) => state.exerciseNames);
  const goals = useGoalStore((state) => state.goals);
  const addOrUpdateGoal = useGoalStore((state) => state.addOrUpdateGoal);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);

  useEffect(() => {
    if (exercise.trim() === "") {
      setFilteredExerciseNames([]);
    } else {
      let filtered = exerciseNames.filter((name) =>
        name.toLowerCase().includes(exercise.toLowerCase())
      );

      // In progress mode, also show existing goals at the top
      if (mode === "progress") {
        const existingGoals = goals
          .map((goal) => goal.exercise)
          .filter((name) =>
            name.toLowerCase().includes(exercise.toLowerCase())
          );

        // Remove duplicates and put existing goals first
        filtered = [...new Set([...existingGoals, ...filtered])];
      }

      setFilteredExerciseNames(filtered);
    }
  }, [exercise, exerciseNames, goals, mode]);

  const handleAdd = async () => {
    if (exercise && reps) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newExercise = {
        exercise,
        value: parseInt(reps, 10),
        type,
        comments,
      };

      addOrUpdateGoal(newExercise, mode);

      setExercise("");
      setReps("");
      setComments("");
      setType("reps");
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Rest of the component code remains the same as in your current version,
  // but replace logs.map() with goals.map() in the render section

  const getTypeIcon = (exerciseType) => {
    switch (exerciseType) {
      case "reps":
        return <FitnessCenterIcon className="tw-w-5 tw-h-5" />;
      case "mins":
        return <TimerIcon className="tw-w-5 tw-h-5" />;
      case "kms":
        return <DirectionsRunIcon className="tw-w-5 tw-h-5"/>;
      
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
  return (
    <div className="tw-space-y-6">
      {/* Success Alert */}
      <Fade in={showSuccess}>
        <Alert
          severity="success"
          className="tw-absolute tw-top-4 tw-right-4"
          onClose={() => setShowSuccess(false)}
        >
          {mode === "progress"
            ? "Progress logged successfully!"
            : "Goal set successfully!"}
        </Alert>
      </Fade>

      {/* Input Form */}
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
                  {mode === "progress" ? "Count" : "Goal Value"}
                </Typography>
              </div>
              <input
                type="number"
                placeholder={
                  mode === "progress" ? "Enter amount" : "Set goal value"
                }
                value={reps}
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
                    <span>{mode === "progress" ? "Log" : "Add"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Paper>

      {/* Exercise List */}
      <div className="tw-space-y-4">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <Fade in={true} key={goal.id}>
              <Paper
                elevation={0}
                className="tw-p-4 tw-rounded-xl tw-border tw-border-gray-100 hover:tw-border-blue-100 tw-transition-all"
              >
                <div className="tw-flex tw-justify-between tw-items-start tw-mb-3"/>
                  <div className="tw-flex tw-items-start tw-space-x-4">
                    <div className="tw-bg-blue-100 tw-p-2 tw-rounded-lg tw-text-blue-500">
                    {getTypeIcon((goal.reps?.split(" ")[1]) || "")}
                    <div className="tw-bg-blue-50 tw-p-2 tw-rounded-lg tw-text-blue-500">
                      {getTypeIcon(goal.type)}
                    </div>
                    <div>
                      <div className="tw-flex tw-items-center tw-space-x-2">
                        <Typography
                          variant="subtitle1"
                          className="tw-font-medium"
                        >
                          {goal.exercise}
                        </Typography>
                        <Chip
                          label={`${goal.progress} / ${goal.goalValue} ${goal.type}`}
                          size="small"
                          className="tw-bg-blue-50 tw-text-blue-600"
                        />
                      </div>
                      {goal.comments && (
                        <Typography
                          variant="body2"
                          className="tw-text-gray-500 tw-mt-1"
                        >
                          {goal.comments}
                        </Typography>
                      )}
                      {goal.lastUpdated && mode === "progress" && (
                        <Typography
                          variant="caption"
                          className="tw-text-gray-400"
                        >
                          Last updated:{" "}
                          {new Date(goal.lastUpdated).toLocaleString()}
                        </Typography>
                      )}
                    </div>
                  </div>
                  <IconButton
                    onClick={() => deleteGoal(goal.id)}
                    className="tw-text-gray-400 hover:tw-text-red-500 tw-transition-colors"
                    size="small"
                  >
                    <DeleteIcon className="tw-w-5 tw-h-5" />
                  </IconButton>
                </div>

                {/* Progress Bar */}
                {goal.goalValue > 0 && (
                  <div className="tw-mt-4">
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-1">
                      <Typography
                        variant="caption"
                        className="tw-text-gray-600"
                      >
                        Progress
                      </Typography>
                      <div className="tw-flex tw-items-center tw-space-x-2">
                        <Typography
                          variant="caption"
                          className="tw-text-gray-600"
                        >
                          {((goal.progress / goal.goalValue) * 100).toFixed(1)}%
                        </Typography>
                        {goal.progress >= goal.goalValue && (
                          <EmojiEventsIcon className="tw-w-4 tw-h-4 tw-text-yellow-500" />
                        )}
                      </div>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(
                        (goal.progress / goal.goalValue) * 100,
                        100
                      )}
                      color={
                        goal.progress >= goal.goalValue ? "success" : "primary"
                      }
                      className="tw-rounded-full"
                      sx={{
                        height: 8,
                        backgroundColor: "#f3f4f6",
                      }}
                    />
                    {goal.progress >= goal.goalValue && (
                      <Typography
                        variant="caption"
                        className="tw-text-green-600 tw-mt-2 tw-block"
                      >
                        🎉 Goal achieved!
                      </Typography>
                    )}
                  </div>
                )}
              </Paper>
            </Fade>
          ))
        ) : (
          <div className="tw-text-center tw-py-12">
            <FitnessCenterIcon className="tw-w-16 tw-h-16 tw-text-gray-200 tw-mb-4" />
            <Typography variant="h6" className="tw-text-gray-400 tw-mb-2">
              {mode === "progress"
                ? "No exercises logged yet"
                : "No goals set yet"}
            </Typography>
            <Typography variant="body2" className="tw-text-gray-400">
              {mode === "progress"
                ? "Start tracking your workout progress by logging exercises above"
                : "Start setting your fitness goals by adding exercises above"}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
