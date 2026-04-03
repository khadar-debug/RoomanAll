import { Router } from "express";
import { store, nextId } from "../data/store.js";

const router = Router();

// GET /coding-tasks — List all coding tasks
router.get("/coding-tasks", (req, res) => {
  try {
    res.json({
      success: true,
      data: store.codingTasks,
      count: store.codingTasks.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /coding-tasks/:id — Get single coding task with test cases
router.get("/coding-tasks/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = store.codingTasks.find(t => t.id === taskId);

    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /coding-tasks/:id/submit — Submit code for evaluation
router.post("/coding-tasks/:id/submit", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, error: "Code and language are required" });
    }

    const task = store.codingTasks.find(t => t.id === taskId);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    // Simulate running test cases
    const results = [];
    let passed = 0;
    const total = task.testCases.length;

    for (const testCase of task.testCases) {
      const testPassed = Math.random() > 0.3; // Simulate 70% pass rate for demo
      if (testPassed) passed++;

      results.push({
        testCase: testCase.description,
        expected: testCase.expected,
        actual: testPassed ? testCase.expected : "Compilation error or wrong output",
        passed: testPassed
      });
    }

    const score = Math.round((passed / total) * 100);

    res.json({
      success: true,
      passed,
      total,
      results,
      score,
      message: passed === total ? "All tests passed!" : `${passed}/${total} tests passed`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /coding-tasks/:id/hint — Get a hint for the task
router.post("/coding-tasks/:id/hint", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = store.codingTasks.find(t => t.id === taskId);

    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    if (!task.hints || task.hints.length === 0) {
      return res.status(404).json({ success: false, error: "No hints available for this task" });
    }

    // Return a random hint (or could track which hints have been shown)
    const randomHint = task.hints[Math.floor(Math.random() * task.hints.length)];

    res.json({
      success: true,
      hint: randomHint,
      hintsAvailable: task.hints.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /ai-tutor/chat — AI Tutor chat endpoint
router.post("/ai-tutor/chat", (req, res) => {
  try {
    const { message, taskId, code, language } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: "Message is required" });
    }

    const lowerMessage = message.toLowerCase();
    let reply = "";
    const suggestions = [];

    // Intelligent mock responses based on message content
    if (lowerMessage.includes("error") || lowerMessage.includes("bug") || lowerMessage.includes("fix")) {
      reply = "I see you're having trouble with an error. Let's debug together! Can you share the exact error message you're getting? Common issues:\n1. Check your loop conditions\n2. Verify variable initialization\n3. Look for off-by-one errors\n4. Ensure proper syntax for your language";
      suggestions.push("Show me the error message", "Review loop logic", "Check variable types", "Trace through your code step-by-step");
    } else if (lowerMessage.includes("explain") || lowerMessage.includes("what is") || lowerMessage.includes("how")) {
      reply = "Great question! Let me help you understand the concept better. ";
      if (taskId) {
        const task = store.codingTasks.find(t => t.id === parseInt(taskId));
        if (task) {
          reply += `In the context of '${task.title}': ${task.objective.substring(0, 150)}... `;
        }
      }
      reply += "Would you like me to break this down into smaller steps?";
      suggestions.push("Simplify the explanation", "Show an example", "Step-by-step walkthrough", "Compare with similar concepts");
    } else if (lowerMessage.includes("hint") || lowerMessage.includes("stuck") || lowerMessage.includes("help")) {
      reply = "No problem! Let's work through this together. Here are some hints:\n";
      if (taskId) {
        const task = store.codingTasks.find(t => t.id === parseInt(taskId));
        if (task && task.hints) {
          reply += task.hints.slice(0, 2).map((h, i) => `${i + 1}. ${h}`).join("\n");
          suggestions.push("More hints", "Show starter code", "Review solution concept", "Try a different approach");
        }
      }
    } else {
      reply = "That's a good question! Let me help. Could you provide more context about what you're trying to accomplish or what specific concept you'd like to understand better?";
      suggestions.push("Ask about a concept", "Share your code", "Request a hint", "Get debugging help");
    }

    // Store chat history if taskId provided
    if (taskId) {
      const historyKey = `task_${taskId}`;
      if (!store.aiTutorHistory[historyKey]) {
        store.aiTutorHistory[historyKey] = [];
      }
      store.aiTutorHistory[historyKey].push({
        type: "user",
        message,
        timestamp: new Date().toISOString()
      });
      store.aiTutorHistory[historyKey].push({
        type: "tutor",
        message: reply,
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      reply,
      suggestions
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /ai-tutor/history/:taskId — Get chat history for a task
router.get("/ai-tutor/history/:taskId", (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const historyKey = `task_${taskId}`;

    const history = store.aiTutorHistory[historyKey] || [];

    res.json({
      success: true,
      taskId,
      history,
      count: history.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /code/run — Execute code (simulated)
router.post("/code/run", (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, error: "Code and language are required" });
    }

    const supportedLanguages = ["python", "javascript", "java", "sql", "bash"];
    if (!supportedLanguages.includes(language.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Language '${language}' not supported. Supported: ${supportedLanguages.join(", ")}`
      });
    }

    // Simulate code execution with realistic output
    let output = "";
    let error = null;
    let executionTime = "0.12s";
    let success = true;

    // Mock language-specific execution results
    switch (language.toLowerCase()) {
      case "python":
        if (code.includes("print")) {
          output = "5\n4\n3\n2\n1\n0\nCountdown finished!";
        } else if (code.includes("error") || code.includes("undefined")) {
          error = "NameError: name 'undefined' is not defined";
          success = false;
        } else {
          output = "[4, 16, 36]";
        }
        break;

      case "javascript":
        if (code.includes("console.log")) {
          output = "Product: Laptop\nProduct: Phone\nProduct: Shirt\n";
        } else if (code.includes("TypeError") || code.includes("null")) {
          error = "TypeError: Cannot read property 'category' of null";
          success = false;
        } else {
          output = "{ Electronics: [ 'Phone', 'Laptop' ], Clothing: [ 'Shirt' ] }";
        }
        break;

      case "java":
        if (code.includes("countdown")) {
          output = "5\n4\n3\n2\n1\n0\nCountdown finished!";
        } else if (code.includes("error")) {
          error = "CompilationError: ';' expected";
          success = false;
        } else {
          output = "Program executed successfully";
        }
        break;

      case "sql":
        output = "course_name | revenue\n------|----------\nFull Stack Development | 1800000\nData Science | 1600000\nAI & ML | 1700000";
        break;

      case "bash":
        if (code.includes("echo")) {
          output = code.match(/echo "?([^"]*)"?/)?.[1] || "Command executed";
        } else {
          output = "Bash script executed";
        }
        break;

      default:
        output = "Code executed";
    }

    res.json({
      success,
      output,
      error,
      executionTime,
      language
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
