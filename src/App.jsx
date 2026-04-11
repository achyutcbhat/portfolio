import React from "react";
import { useState, useEffect } from "react";

// ── DATA ─────────────────────────────────────

const NAV_LINKS = ["Home", "Skills", "Projects", "Contact"];

const SKILLS = [
  {
    category: "Languages",
    items: ["C", "Python", "SQL", "HTML", "CSS"],
  },
  {
    category: "Core CS",
    items: ["Data Structures", "Algorithms", "DBMS", "OS", "CN"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Linux"],
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "Movie Ticket Booking",
    desc: "Terminal-based booking system",
    url: "https://github.com/achyutcbhat/Movieticketbooking",
  },
  {
    id: 2,
    title: "ATM Simulator",
    desc: "ATM simulation using C",
    url: "https://github.com/achyutcbhat/ATM-simulater",
  },
];

// ── HOOK ─────────────────────────────────────

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const wordsRef = React.useRef(words); // ✅ stable ref, no infinite loop

  useEffect(() => {
    const current = wordsRef.current[i % wordsRef.current.length];
    let j = 0;

    const interval = setInterval(() => {
      setText(current.slice(0, j));
      j++;
      if (j > current.length) {
        clearInterval(interval);
        setTimeout(() => setI((prev) => prev + 1), 1500); // ✅ functional update, no stale i
      }
    }, 100);

    return () => clearInterval(interval);
  }, [i]); // ✅ safe — words accessed via ref

  return text;
}

// ── COMPONENTS ───────────────────────────────

function Nav() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      background: "#111",
      color: "#fff"
    }}>
      <h2>Portfolio</h2>

      <ul style={{
        display: "flex",
        gap: "1.5rem",
        listStyle: "none"
      }}>
        {NAV_LINKS.map((l) => (
          <li key={l}>
            
              href={`#${l.toLowerCase()}`}
              style={{ color: "#c8f547", textDecoration: "none" }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const text = useTypewriter([
    "Computer Engineering Student",
    "Python Developer",
    "Cybersecurity Learner",
  ]);

  return (
    <section id="home" style={{ padding: "4rem", textAlign: "center" }}>
      <h1>Achyut Bhat</h1>
      <h3>{text}</h3>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "3rem" }}>
      <h2>Skills</h2>

      {SKILLS.map((s) => (
        <div key={s.category}>
          <h3>{s.category}</h3>
          <p>{s.items.join(", ")}</p>
        </div>
      ))}
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "3rem" }}>
      <h2>Projects</h2>

      {PROJECTS.map((p) => (
        <div key={p.id} style={{ marginBottom: "1rem" }}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>

          
            href={p.url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue" }}
          >
            View Project
          </a>
        </div>
      ))}
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "3rem" }}>
      <h2>Contact</h2>

      
        href="https://github.com/achyutcbhat"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </section>
  );
}

// ── ROOT ─────────────────────────────────────

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
