setInterval(() => {
  fetch("/api/autonomous-engine", { method: "POST" });
}, 10000);
