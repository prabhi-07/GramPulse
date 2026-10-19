
import { useState } from "react";
import "./index.css";

const initialComplaints = [
  {
    id: "GP-1001",
    title: "Blocked drainage near main street",
    category: "Drainage",
    location: "Ward 2",
    priority: "High",
    status: "In Progress",
    date: "Today",
  },
  {
    id: "GP-1002",
    title: "Streetlight not working",
    category: "Streetlight",
    location: "Ward 4",
    priority: "Medium",
    status: "Submitted",
    date: "Today",
  },
  {
    id: "GP-1003",
    title: "Potholes on village road",
    category: "Road",
    location: "Ward 1",
    priority: "High",
    status: "Resolved",
    date: "Yesterday",
  },
];

const categories = ["Road", "Drainage", "Water", "Streetlight", "Other"];

function App() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    category: "Road",
    location: "",
    description: "",
  });

  const total = complaints.length;
  const pending = complaints.filter(
    (c) => c.status === "Submitted" || c.status === "In Progress"
  ).length;
  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const visibleComplaints = complaints.filter(
    (c) => filter === "All" || c.status === filter
  );

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submitComplaint(event) {
    event.preventDefault();

    const complaint = {
      id: `GP-${Date.now().toString().slice(-6)}`,
      title: form.title.trim(),
      category: form.category,
      location: form.location.trim(),
      description: form.description.trim(),
      priority: "Medium",
      status: "Submitted",
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
    };

    setComplaints((previous) => [complaint, ...previous]);
    setForm({
      title: "",
      category: "Road",
      location: "",
      description: "",
    });
    setMessage(`Complaint submitted successfully! ID: ${complaint.id}`);
    setFilter("All");
  }

  function updateStatus(id, status) {
    setComplaints((previous) =>
      previous.map((c) => (c.id === id ? { ...c, status } : c))
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#dashboard">
          <span className="brand-icon">G</span>
          <span>
            <strong>GramPulse</strong>
            <small>SMART VILLAGE</small>
          </span>
        </a>

        <p className="nav-heading">WORKSPACE</p>
        <a className="nav-link active" href="#dashboard">
          <span>▦</span> Dashboard
        </a>
        <a className="nav-link" href="#complaints">
          <span>☷</span> Complaints
        </a>
        <a className="nav-link" href="#new-complaint">
          <span>＋</span> Report a problem
        </a>

        <div className="sidebar-note">
          <span className="online-dot" />
          <strong>Village demo</strong>
          <p>Sample data for your GramPulse prototype.</p>
        </div>

        <div className="sidebar-footer">Built for better villages.</div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">VILLAGE GOVERNANCE / OVERVIEW</p>
            <h1>Village Dashboard</h1>
            <p className="muted">Monitor local issues and development progress.</p>
          </div>
          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <strong>Demo Admin</strong>
              <small>Administrator demo</small>
            </div>
          </div>
        </header>

        <section className="welcome-banner">
          <div>
            <span className="banner-label">YOUR VILLAGE AT A GLANCE</span>
            <h2>Better villages start with better decisions.</h2>
            <p>
              Track reported issues, monitor progress and help prioritise
              community needs.
            </p>
            <a className="banner-button" href="#new-complaint">
              + Report an issue
            </a>
          </div>
          <div className="banner-symbol" aria-hidden="true">⌂</div>
        </section>

        <section className="stats-grid" aria-label="Complaint statistics">
          <article className="stat-card">
            <div className="stat-top">
              <span>Total complaints</span>
              <span className="stat-icon blue">▤</span>
            </div>
            <strong className="stat-number">{total}</strong>
            <p>All recorded reports</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Pending action</span>
              <span className="stat-icon orange">◷</span>
            </div>
            <strong className="stat-number">{pending}</strong>
            <p>Submitted or in progress</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Resolved</span>
              <span className="stat-icon green">✓</span>
            </div>
            <strong className="stat-number">{resolved}</strong>
            <p>Marked as resolved</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>High priority</span>
              <span className="stat-icon red">!</span>
            </div>
            <strong className="stat-number">
              {complaints.filter((c) => c.priority === "High").length}
            </strong>
            <p>Requires careful review</p>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel complaints-panel" id="complaints">
            <div className="panel-heading">
              <div>
                <h2>Recent complaints</h2>
                <p>Review reported village issues.</p>
              </div>
              <span className="record-count">{total} records</span>
            </div>

            <div className="filter-row">
              {["All", "Submitted", "In Progress", "Resolved"].map((item) => (
                <button
                  key={item}
                  className={`filter-button ${filter === item ? "selected" : ""}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="complaint-list">
              {visibleComplaints.length === 0 && (
                <p className="empty-state">No complaints in this filter yet.</p>
              )}

              {visibleComplaints.map((complaint) => (
                <div className="complaint-item" key={complaint.id}>
                  <div className="issue-icon">
                    {complaint.category === "Water"
                      ? "≈"
                      : complaint.category === "Drainage"
                      ? "≋"
                      : complaint.category === "Streetlight"
                      ? "☼"
                      : "⌁"}
                  </div>

                  <div className="complaint-info">
                    <strong>{complaint.title}</strong>
                    <p>
                      {complaint.id} · {complaint.category} · {complaint.location}
                    </p>
                    {complaint.description && (
                      <p className="description">{complaint.description}</p>
                    )}
                    <span className={`priority ${complaint.priority.toLowerCase()}`}>
                      {complaint.priority} priority
                    </span>
                  </div>

                  <div className="complaint-actions">
                    <span
                      className={`status ${complaint.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {complaint.status}
                    </span>
                    <label className="status-label">
                      Update status
                      <select
                        value={complaint.status}
                        onChange={(event) =>
                          updateStatus(complaint.id, event.target.value)
                        }
                        aria-label={`Update status for ${complaint.id}`}
                      >
                        <option>Submitted</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Rejected</option>
                      </select>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel form-panel" id="new-complaint">
            <div className="panel-heading">
              <div>
                <h2>Report a problem</h2>
                <p>Submit a new village issue.</p>
              </div>
              <span className="form-plus">＋</span>
            </div>

            {message && (
              <div className="success-message" role="status">
                {message}
                <button onClick={() => setMessage("")} aria-label="Dismiss">
                  ×
                </button>
              </div>
            )}

            <form onSubmit={submitComplaint}>
              <label htmlFor="title">Problem title *</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={updateField}
                placeholder="e.g. Broken streetlight"
                maxLength={100}
                required
              />

              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={updateField}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <label htmlFor="location">Village area / ward *</label>
              <input
                id="location"
                name="location"
                value={form.location}
                onChange={updateField}
                placeholder="e.g. Ward 3, Main Street"
                maxLength={100}
                required
              />

              <label htmlFor="description">Describe the issue</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={updateField}
                placeholder="Explain what happened and who is affected..."
                rows={4}
                maxLength={1000}
              />

              <button className="submit-button" type="submit">
                Submit complaint <span>→</span>
              </button>
              <p className="form-footnote">
                Demo only: reports are stored in temporary page state.
              </p>
            </form>
          </article>
        </section>

        <footer className="page-footer">
          <span>GramPulse · Village Development Platform</span>
          <span>Prototype v0.1 · Sample data</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
