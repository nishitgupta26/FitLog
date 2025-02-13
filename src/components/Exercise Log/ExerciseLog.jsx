import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
  Snackbar,
  LinearProgress,
  Card,
} from "@mui/material";
import useExerciseGuideStore from "../../stores/useExerciseGuideStore";
import useGoalStore from "../../stores/useGoalStore";
import { exerciseIcons } from "../../dataFiles/exerciseIcons";
import ExerciseDetailDialog from "../ExerciseDetailDialog/ExerciseDetailDialog";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import axios from "axios";

export default function ExerciseLog({ mode }) {
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState(""); //taking input for reps&sets / mins / kms
  const [sets, setSets] = useState(""); //taking input for sets
  const [type, setType] = useState("reps");
  const [comments, setComments] = useState("");

  const [goals, setGoals] = useState([]);
  const [filteredExerciseNames, setFilteredExerciseNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // States for exercise detail dialog
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [exercises, setExercises] = useState([]);
  const [exerciseNames, setExerciseNames] = useState([]);

  const [goalsUpdated, setGoalsUpdated] = useState(false);

  const toggleGoalsUpdated = () => {
    setGoalsUpdated((prev) => {
      const newValue = !prev;
      console.log("Goals Updated:", newValue);
      return newValue;
    });
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const token = Cookies.get("token");
      try {
        const response = await axios.get(
          "http://localhost:8080/api/exercises",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExercises(response.data);
        console.log("Exercises fetched successfully:", response.data);
        setExerciseNames(response.data.map((exercise) => exercise.name));
        console.log("Exercise names:", exerciseNames);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const fetchGoals = async () => {
      const currentDate = dayjs().format("YYYY-MM-DD");
      const token = Cookies.get("token");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/goals/${currentDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const goalsArray = response.data.map((group) =>
          group.reduce((acc, { Key, Value }) => {
            acc[Key] = Value;
            return acc;
          }, {})
        );

        setGoals(goalsArray);
        console.log("Goals fetched successfully:", goalsArray);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, [mode, goalsUpdated]);

  useEffect(() => {
    if (exercise.trim() === "") {
      setFilteredExerciseNames([]);
    } else {
      let filtered = exercises
        .filter(
          (ex) =>
            ex.name && ex.name.toLowerCase().includes(exercise.toLowerCase())
        )
        .map((ex) => ex.name);

      if (mode === "progress") {
        const existingGoals = goals
          .map((goal) => goal.exercise)
          .filter(
            (name) =>
              name && name.toLowerCase().includes(exercise.toLowerCase())
          );
        filtered = [...new Set([...existingGoals, ...filtered])];
      }

      setFilteredExerciseNames(filtered);
      console.log("Filtered exercises:", filtered);
    }
  }, [exercise, exercises, goalsUpdated, mode]);

  console.log("Goals:", goals, typeof goals);

  const handleAdd = async () => {
    if (exercise) {
      const currentDate = dayjs().format("YYYY-MM-DD");
      const token = Cookies.get("token");
      // Find existing goal with the same name
      const existingGoal = goals.find(
        (g) => g.goalName?.toLowerCase() === exercise.trim().toLowerCase()
      );

      // Create the goal object
      const goalObject = {
        goalName: exercise.trim(),
        type: type, // "reps", "mins", or "kms"
        goalValue:
          mode === "progress"
            ? existingGoal?.goalValue || 0 // Use existing goal value or 0 in progress mode
            : type === "reps" // Use input value in goal mode
            ? parseInt(reps, 10) * parseInt(sets || 1, 10)
            : parseFloat(reps),
        progressValue:
          mode === "goal"
            ? existingGoal?.progressValue || 0 // Use existing goal value or 0 in progress mode
            : type === "reps" // Use input value in goal mode
            ? parseInt(reps, 10) * parseInt(sets || 1, 10)
            : parseFloat(reps),
        comments: comments.trim(),
        isActive: true,
      };

      // Validate the data
      if (
        mode === "goal" &&
        (!goalObject.goalName || !goalObject.type || goalObject.goalValue <= 0)
      ) {
        console.error("Invalid goal data:", goalObject);
        return;
      }

      if (
        mode === "progress" &&
        (!goalObject.goalName ||
          !goalObject.type ||
          goalObject.progressValue < 0)
      ) {
        console.error("Invalid progress data:", goalObject);
        return;
      }

      // Create request payload matching backend structure
      const payload = {
        type: "exercise",
        goal: goalObject, // Nest under "goal" field as expected by backend
      };

      console.log("Sending payload:", payload);

      try {
        const response = await axios.put(
          `http://localhost:8080/api/goals/${currentDate}/${goalObject.goalName}`,
          payload, // Send the properly structured payload
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toggleGoalsUpdated();
        if (response.data) {
          setGoals((prevGoals) => [...prevGoals, response.data]);
          setShowSuccess(true);

          // Reset fields
          setExercise("");
          setReps("");
          setSets("");
          setComments("");
          setType("reps");
        }
      } catch (error) {
        console.error("Error adding goal:", error);
        console.error("Error response:", error.response?.data);
      }
    }
  };

  const handleDelete = async (goalId, mode) => {
    console.log("Deleting goal with ID:", goalId);
    if (!goalId) {
      console.error("No goal ID provided");
      return;
    }
    const currentDate = dayjs().format("YYYY-MM-DD");
    const token = Cookies.get("token");

    // Determine URL based on mode
    const baseUrl = "http://localhost:8080/api";
    const url =
      mode === "progress"
        ? `${baseUrl}/progress/${currentDate}/${goalId}`
        : `${baseUrl}/goals/${currentDate}/${goalId}`;

    try {
      await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Successfully deleted ${mode}`);
      toggleGoalsUpdated();
    } catch (error) {
      console.error(`Error deleting ${mode}:`, error);
    }
  };

  const handleChange = async (goal, change, mode) => {
    console.log("Changing goal:", goal, "by:", change);
    const updatedGoal = {
      ...goal,
      ...(mode === "progress"
        ? { progressValue: goal.progressValue + change }
        : { goalValue: goal.goalValue + change }),
    };

    // Create payload matching backend structure
    const payload = {
      type: "exercise",
      goal: updatedGoal,
    };

    const currentDate = dayjs().format("YYYY-MM-DD");
    const token = Cookies.get("token");

    try {
      const response = await axios.put(
        `http://localhost:8080/api/goals/${currentDate}/${goal.goalName}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGoals(goals.map((g) => (g.id === goal.id ? response.data : g)));
      toggleGoalsUpdated();
    } catch (error) {
      console.error("Error updating goal:", error);
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
    }
  };
  const formatTimeAgo = (timestamp) => {
    const now = new Date();

    const past = new Date(timestamp);

    const diffSeconds = Math.floor((now - past) / 1000);

    if (diffSeconds < 60) return "Just now";

    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} mins ago`;

    if (diffSeconds < 86400)
      return `${Math.floor(diffSeconds / 3600)} hours ago`;

    return `${Math.floor(diffSeconds / 86400)} days ago`;
  };

  const handleSuggestionClick = (name) => {
    setExercise(name);
    setFilteredExerciseNames([]);
  };

  const handleExerciseDetailClick = (exerciseName) => {
    // Guard clause for null/undefined exerciseName
    if (!exerciseName) {
      console.warn("Exercise name is undefined");
      return;
    }

    // Guard clause for null/undefined exercises array
    if (!exercises || !Array.isArray(exercises)) {
      console.warn("Exercises array is not available");
      return;
    }

    const exerciseDetails = exercises.find((ex) => {
      console.log("Comparing:", {
        exerciseInput: exerciseName.toLowerCase(),
        currentExercise: ex?.name?.toLowerCase(),
        match: ex?.name?.toLowerCase() === exerciseName.toLowerCase(),
      });
      return ex?.name?.toLowerCase() === exerciseName.toLowerCase();
    });
    console.log("Selected exercise details:", exerciseName, exerciseDetails);
    if (exerciseDetails) {
      setSelectedExercise(exerciseDetails);
      setOpenDialog(true);
    }
  };

  // component for +/- the goal or progress
  const renderControl = (goal, mode) => {
    const currentValue =
      mode === "progress" ? goal.progressValue || 0 : goal.goalValue;

    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-space-x-4">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleChange(goal, -1, mode);
          }}
          className="tw-bg-red-100 hover:tw-bg-red-200 tw-transition-all"
          size="small"
          disabled={currentValue <= 0}
        >
          <RemoveIcon className="tw-text-red-500" />
        </IconButton>

        <div className="tw-flex tw-items-center tw-space-x-2">
          <Typography
            variant="h6"
            className={`tw-font-bold ${
              (goal.progressValue || 0) >= goal.goalValue
                ? "tw-text-green-600"
                : "tw-text-blue-600"
            }`}
          >
            {currentValue} {goal.type}
          </Typography>
        </div>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleChange(goal, 1, mode);
          }}
          className="tw-bg-green-100 hover:tw-bg-green-200 tw-transition-all"
          size="small"
        >
          <AddIcon className="tw-text-green-500" />
        </IconButton>
      </div>
    );
  };

  return (
    <div className="tw-space-y-6">
      {/* Success Alert */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setShowSuccess(false)}
        >
          {mode === "progress"
            ? "Progress logged successfully!"
            : "Goal set successfully!"}
        </Alert>
      </Snackbar>

      {/* Input Form */}
      <Paper
        elevation={0}
        className="tw-p-6 tw-bg-white tw-rounded-xl tw-border tw-border-gray-100"
      >
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
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
            {filteredExerciseNames?.length > 0 && (
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
            <FormControl className="tw-w-32">
              <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                <Typography variant="caption" className="tw-text-gray-600">
                  Type
                </Typography>
              </div>
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  // Reset fields when type changes
                  setReps("");
                  setSets("");
                }}
                className="tw-text-sm   tw-rounded-lg"
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
            {type === "reps" ? (
              <>
                <div className="tw-flex-1">
                  <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                    <Typography variant="caption" className="tw-text-gray-600">
                      Reps
                    </Typography>
                  </div>
                  <input
                    type="number"
                    placeholder="Enter reps"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm"
                  />
                </div>
                <div className="tw-flex-1">
                  <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                    <Typography variant="caption" className="tw-text-gray-600">
                      Sets
                    </Typography>
                  </div>
                  <input
                    type="number"
                    placeholder="Enter sets"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm"
                  />
                </div>
              </>
            ) : (
              <div className="tw-flex-1">
                <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
                  <Typography variant="caption" className="tw-text-gray-600">
                    {type === "mins" ? "Minutes" : "Kilometers"}
                  </Typography>
                </div>
                <input
                  type="number"
                  placeholder={`Enter ${
                    type === "mins" ? "minutes" : "kilometers"
                  }`}
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm"
                />
              </div>
            )}
          </div>

          {/* Comments Input */}
          <div className="lg:tw-col-span-2">
            <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-1">
              <Typography variant="caption" className="tw-text-gray-600">
                Comments (optional)
              </Typography>
            </div>
            <div className="lg:tw-col-span-2 tw-flex tw-flex-col tw-items-end sm:tw-flex-row tw-space-y-2 sm:tw-space-y-0 sm:tw-space-x-2">
              <input
                placeholder="Add notes about your exercise..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="tw-w-full tw-h-[42px] sm:tw-flex-1 tw-border tw-border-gray-200 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition-all"
              />
              <button
                onClick={handleAdd}
                disabled={
                  isLoading ||
                  !exercise ||
                  (type === "reps" ? !reps || !sets : !reps)
                }
                className={`tw-w-full tw-h-[42px] sm:tw-w-auto tw-px-6 tw-py-2.5 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-space-x-2 tw-transition-all ${
                  isLoading || (type === "reps" ? !reps || !sets : !reps)
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
      <div className="tw-space-y-4 tw-rounded-xl tw-mx-auto">
        {goals?.length > 0 ? (
          goals.map((goal) => (
            <Fade in={true} key={goal.id}>
              {/* <Card
                variant="outlined"
                onClick={() => handleExerciseDetailClick(goal.exercise)}
                className="tw-p-4 tw-rounded-2xl tw-transition-all tw-border-gray-200 hover:tw-shadow-md hover:tw-border-blue-200 tw-cursor-pointer"
              >
                <div className="tw-flex tw-items-center tw-space-x-4">
                  <div className="tw-bg-blue-50 tw-p-3 tw-rounded-xl tw-flex tw-items-center tw-justify-center">
                    {getTypeIcon(goal.type, "tw-w-8 tw-h-8 tw-text-blue-600")}
                  </div>

                  <div className="tw-flex-grow">
                    <div className="tw-flex tw-justify-between tw-items-start">
                      <div>
                        <Typography
                          variant="h6"
                          className="tw-font-semibold tw-text-gray-800 tw-mb-1 tw-cursor-pointer hover:tw-text-blue-600"
                          onClick={() =>
                            handleExerciseDetailClick(goal.exercise)
                          }
                        >
                          {goal.exercise}
                        </Typography>
                        <div className="tw-flex tw-items-center tw-space-x-2">
                          <Chip
                            label={`${goal.progress || 0} / ${goal.goalValue} ${
                              goal.type
                            }`}
                            size="small"
                            color="primary"
                            variant="soft"
                            className="tw-mb-1"
                          />
                          {goal.progress >= goal.goalValue && (
                            <EmojiEventsIcon className="tw-text-yellow-500" />
                          )}
                        </div>
                      </div>

                      {renderControl(goal)}
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteGoal(goal.id, mode);
                        }}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>

                    {goal.comments && (
                      <Typography
                        variant="body2"
                        className="tw-text-gray-600 tw-italic tw-mt-1"
                      >
                        "{goal.comments}"
                      </Typography>
                    )}

                    {goal.lastUpdated && mode === "progress" && (
                      <Typography
                        variant="caption"
                        className="tw-text-gray-400 tw-block tw-mt-1"
                      >
                        Last updated: {formatTimeAgo(goal.lastUpdated)}
                      </Typography>
                    )}
                  </div>
                </div>
                {goal.goalValue > 0 && (
                  <div className="tw-mt-4">
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                      <Typography variant="body2" className="tw-text-gray-600">
                        Progress
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`tw-font-semibold ${
                          (goal.progress || 0) >= goal.goalValue
                            ? "tw-text-green-600"
                            : "tw-text-blue-600"
                        }`}
                      >
                        {(
                          ((goal.progress || 0) / goal.goalValue) *
                          100
                        ).toFixed(1)}
                        %
                      </Typography>
                    </div>
                    <div className="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-2 tw-overflow-hidden">
                      <div
                        className={`tw-h-full ${
                          (goal.progress || 0) >= goal.goalValue
                            ? "tw-bg-green-500"
                            : "tw-bg-blue-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            ((goal.progress || 0) / goal.goalValue) * 100,
                            100
                          )}%`,
                          transition: "width 0.5s ease-in-out",
                        }}
                      />
                    </div>
                    {(goal.progress || 0) >= goal.goalValue && (
                      <Typography
                        variant="caption"
                        className="tw-text-green-600 tw-mt-2 tw-block tw-text-center"
                      >
                        🎉 Goal Achieved! Congratulations! 🏆
                      </Typography>
                    )}
                  </div>
                )}
              </Card> */}

              <Card
                variant="outlined"
                onClick={() => handleExerciseDetailClick(goal.goalName)}
                className="tw-p-4 tw-rounded-2xl tw-transition-all tw-border-gray-200 hover:tw-shadow-md hover:tw-border-blue-200 tw-cursor-pointer"
              >
                <div className="tw-flex tw-flex-col tw-gap-4">
                  {/* Top Section with two containers */}
                  <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-justify-between sm:tw-items-center tw-gap-4">
                    {/* Left Container: Icon + Exercise Info */}
                    <div className="tw-flex tw-items-start tw-gap-4 tw-flex-grow tw-min-w-0">
                      <div className="tw-bg-blue-50 tw-p-3 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shrink-0">
                        {getTypeIcon(
                          goal.type,
                          "tw-w-8 tw-h-8 tw-text-blue-600"
                        )}
                      </div>

                      <div className="tw-min-w-0 tw-flex-grow">
                        <Typography
                          variant="h6"
                          className="tw-font-semibold tw-text-gray-800 tw-mb-1 tw-cursor-pointer hover:tw-text-blue-600 tw-truncate"
                          onClick={() =>
                            handleExerciseDetailClick(goal.goalName)
                          }
                        >
                          {goal.goalName}
                        </Typography>
                        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
                          <Chip
                            label={`${goal.progressValue || 0} / ${
                              goal.goalValue
                            } ${goal.type}`}
                            size="small"
                            color="primary"
                            variant="soft"
                            className="tw-mb-1"
                          />
                          {goal.progressValue >= goal.goalValue && (
                            <EmojiEventsIcon className="tw-text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Container: Controls */}
                    <div className="tw-flex tw-items-start tw-gap-2 tw-shrink-0">
                      {renderControl(goal, mode)}
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(goal._id, mode);
                        }}
                        className="tw-p-1"
                        color="error"
                        size="small"
                      >
                        <DeleteIcon className="" />
                      </IconButton>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {goal.comments && (
                    <Typography
                      variant="body2"
                      className="tw-text-gray-600 tw-italic"
                    >
                      "{goal.comments}"
                    </Typography>
                  )}

                  {/* Last Updated Section */}
                  {goal.lastUpdated && mode === "progress" && (
                    <Typography
                      variant="caption"
                      className="tw-text-gray-400 tw-block"
                    >
                      Last updated: {formatTimeAgo(goal.lastUpdated)}
                    </Typography>
                  )}

                  {/* Progress Bar Section */}
                  {goal.goalValue > 0 && (
                    <div className="tw-mt-2">
                      <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                        <Typography
                          variant="body2"
                          className="tw-text-gray-600"
                        >
                          Progress
                        </Typography>
                        <Typography
                          variant="body2"
                          className={`tw-font-semibold ${
                            (goal.progressValue || 0) >= goal.goalValue
                              ? "tw-text-green-600"
                              : "tw-text-blue-600"
                          }`}
                        >
                          {(
                            ((goal.progressValue || 0) / goal.goalValue) *
                            100
                          ).toFixed(1)}
                          %
                        </Typography>
                      </div>
                      <div className="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-2 tw-overflow-hidden">
                        <div
                          className={`tw-h-full ${
                            (goal.progressValue || 0) >= goal.goalValue
                              ? "tw-bg-green-500"
                              : "tw-bg-blue-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              ((goal.progressValue || 0) / goal.goalValue) *
                                100,
                              100
                            )}%`,
                            transition: "width 0.5s ease-in-out",
                          }}
                        />
                      </div>
                      {(goal.progressValue || 0) >= goal.goalValue && (
                        <Typography
                          variant="caption"
                          className="tw-text-green-600 tw-mt-2 tw-block tw-text-center"
                        >
                          🎉 Goal Achieved! Congratulations! 🏆
                        </Typography>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </Fade>
          ))
        ) : (
          <div className="tw-text-center tw-py-16 tw-bg-gray-50 tw-rounded-2xl tw-border tw-border-dashed tw-border-gray-200">
            <FitnessCenterIcon className="tw-w-20 tw-h-20 tw-text-gray-300 tw-mb-6 tw-mx-auto" />
            <Typography variant="h5" className="tw-text-gray-600 tw-mb-3">
              {mode === "progress" ? "No Exercises Logged" : "No Goals Set"}
            </Typography>
            <Typography variant="body1" className="tw-text-gray-500">
              {mode === "progress"
                ? "Start tracking your workout progress by logging exercises"
                : "Begin setting your fitness goals by adding exercises"}
            </Typography>
          </div>
        )}
      </div>
      {/* Exercise Detail Dialog */}
      <ExerciseDetailDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedExercise={selectedExercise}
        exerciseIcons={exerciseIcons}
      />
    </div>
  );
}
