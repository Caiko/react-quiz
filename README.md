# 🧠 ReactQuiz - Interactive React Quiz Application

## 📚 Overview

**ReactQuiz** is a fully interactive, **React-based quiz application** that presents users with a sequence of multiple-choice questions. With a countdown timer, automatic progression, and detailed result summaries, it delivers a dynamic quiz experience. The project is built with modular components, stateful logic, and a strong focus on user feedback and engagement.

---

## 🚀 Features

* 🕒 **Timed Questions** – Each question has a countdown to encourage quick thinking.
* 🔄 **Randomized Answers** – Answer options are shuffled to prevent memorization patterns.
* ✅ **Immediate Feedback** – Answers show visual feedback as correct, wrong, or skipped.
* 📊 **Result Summary** – At the end, users see detailed performance statistics.
* ⚛️ **Component-Based Architecture** – Clean separation of UI and logic via reusable React components.
* 🧪 **State Management** – Managed with React hooks like `useState`, `useEffect`, and `useCallback`.

---

## 💻 Technologies Used

* **React 18** – Frontend UI framework
* **Vite** – Lightning-fast dev server and bundler
* **JavaScript (ES6+)** – Application logic
* **CSS Modules** – Component-scoped styling

---

## 📸 Preview

![image](https://github.com/user-attachments/assets/66bd5430-ffa7-4940-84e7-b4693a9d3cdc)
![image](https://github.com/user-attachments/assets/473fb687-da4b-4b4d-b86f-e5115d6ce800)
![image](https://github.com/user-attachments/assets/cdb43324-d5e4-46a8-97c2-e74ea1b2ce67)



---

## 📂 Project Structure

```
react-quiz/
├── assets/                # Static assets (images)
├── components/            # Reusable components
│   ├── Answers.jsx        # Renders answer buttons
│   ├── Header.jsx         # App header and logo
│   ├── Question.jsx       # Manages individual question logic
│   ├── QuestionTimer.jsx  # Countdown timer logic
│   ├── Quiz.jsx           # Main quiz logic and flow
│   └── Summary.jsx        # Displays quiz results
├── questions.js           # Questions data source
├── App.jsx                # Main app component
├── main.jsx               # App entry point
└── README.md              # Project documentation
```

---

## 💾 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Caiko/react-quiz.git
cd react-quiz
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the Development Server

```bash
npm run dev
```

Then open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🧠 How It Works

* **Quiz Flow**: Users answer a question or let it time out. Each selection triggers visual feedback and then automatically moves to the next question.
* **Result Calculation**: Summary logic calculates percentage of skipped, correct, and wrong answers based on the original question data.
* **Answer Randomization**: Each question's answer choices are shuffled once when displayed.


