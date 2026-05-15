# AI Study Planner

AI Study Planner is a React-based web application that helps students organize study tasks by course, deadline, difficulty, and estimated time. The app calculates a priority score for each task and ranks tasks so students know what to focus on first.

## Features

- Add study tasks by course, task name, due date, difficulty, and estimated hours
- Calculate a priority score based on urgency, difficulty, and time required
- Sort tasks from highest to lowest priority
- Display a recommended study plan based on the highest-priority task
- Clean and responsive user interface built with React and CSS

## Priority Score Logic

The priority score is calculated using:

```text
Priority Score = Urgency Score + Difficulty Score + Time Score