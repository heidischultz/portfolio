const githubUsername = "heidischultz";

const projects = [
  {
    id: "ignis",
    title: "Ignis",
    icon: "F",
    short: "iOS wildfire risk prediction system.",
    description: "Ignis is a SwiftUI iOS app that ingests NASA FIRMS wildfire data and syncs geospatial state through Firebase, Firestore, Realtime Database, and Google Cloud Functions. Its custom prediction algorithm compares historical and current fire coordinates, calculates movement vectors, projects a directional risk cone, and estimates the probability of impact for a user address.",
    tags: ["SwiftUI", "NASA FIRMS API", "Firebase", "Google Cloud Functions", "MapKit", "CoreLocation"],
    presentation: "assets/Ignis _ CAC.pdf",
    repo: "https://github.com/heidischultz/Ignis",
    media: [
      {
        src: "assets/ignis-1.png",
        caption: "App Home Page."
      },
      {
        src: "assets/ignis-2.png",
        caption: "Directional risk cone generated from fire movement vectors."
      }
    ]
  },
{
  id: "ryderdocs",
  title: "RyderVault",
  icon: "D",
  short: "Secure document portal with RBAC + scanning.",
  description: "RyderVault is a full-stack document portal built during a Ryder Systems hackathon to enable secure, request-based file exchange between customers and internal teams. I helped build the React + Node.js system with Firebase storage, role-based access control via Okta (OIDC), and real-time upload workflows. The platform includes metadata tracking, auditability, and integrated malware scanning using the VirusTotal API to ensure file safety before storage.",
  tags: ["React", "Node.js", "Firebase", "Okta (OIDC)", "RBAC", "VirusTotal API"],
  presentation: "assets/ryderdocs-presentation.pptx",
  repo: "proprietary",
  media: [
    {
      src: "assets/rydervault-1.png",
      caption: "Customer-facing dashboard with request-based document uploads."
    },
    {
      src: "assets/rydervault-2.png",
      caption: "Admin workflow with metadata tracking, status, and audit visibility."
    }
  ]
},
{
  id: "blindspot",
  title: "BlindSpot",
  icon: "B",
  short: "AI clinical analysis pipeline for diagnostic blind spots.",
  description: "BlindSpot is a full-stack clinical assistant that analyzes patient charts, PDFs, and medical images to surface critical flags, differential diagnoses, and overlooked risks. I built a React + Node.js pipeline using Google Vertex AI/Gemini, Document AI OCR fallback for scanned PDFs, optional LLaVA-Med radiology interpretation, and structured synthesis to turn messy clinical inputs into actionable analysis.",
  tags: ["React", "Node.js", "Vertex AI", "Gemini", "Document AI", "Docker"],
  presentation: "in-progress",
  repo: "https://github.com/heidischultz/devfest-26",
  media: [
    {
      src: "assets/blindspot-1.png",
      caption: "Clinical assistant interface for uploading charts, PDFs, and imaging files."
    },
    {
      src: "assets/blindspot-2.png",
      caption: "AI-generated analysis showing critical flags, differential diagnoses, and next steps."
    }
  ]
}
];

const shell = document.querySelector("#pageShell");
const carousel = document.querySelector("#projectCarousel");
const modal = document.querySelector("#projectModal");
const modalClose = document.querySelector(".modal-close");
const noticeModal = document.querySelector("#noticeModal");
const noticeClose = document.querySelector(".notice-close");

function initMountainScene() {
  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(".sky", { autoAlpha: 1 });
  gsap.set(".sun", { xPercent: -50, yPercent: -50, y: 0, scale: 1 });
  gsap.set(".mountains-back", { xPercent: -50, y: 0, scale: 1.02 });
  gsap.set(".mountains-front", { xPercent: -50, y: 0, scale: 1.01 });
  gsap.set(".mountain-tint", { autoAlpha: 1 });
  gsap.set(".night-fade", { autoAlpha: 0 });

  const mountainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#home",
      scroller: shell,
      start: "top top",
      end: "+=160%",
      scrub: 0.65,
      pin: true,
      pinType: "transform",
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  mountainTimeline
    .to(".sun", {
      y: "48vh",
      scale: 0.88,
      autoAlpha: 0.14,
      duration: 1,
      ease: "none"
    }, 0)
    .to(".sky", {
      "--sky-top": "#060711",
      "--sky-mid": "#151226",
      "--sky-low": "#110d17",
      "--sky-horizon": "#030405",
      duration: 1,
      ease: "none"
    }, 0)
    .to("#home", {
      "--mountain-brightness": 0.18,
      "--mountain-contrast": 1.22,
      "--mountain-saturate": 0.18,
      "--tint-opacity": 0,
      duration: 1,
      ease: "none"
    }, 0)
    .to(".mountains-back", {
      y: 8,
      scale: 1.025,
      duration: 1,
      ease: "none"
    }, 0)
    .to(".mountains-front", {
      y: 4,
      scale: 1.015,
      duration: 1,
      ease: "none"
    }, 0)
    .to(".mountain-tint", {
      opacity: 0,
      duration: 1,
      ease: "none"
    }, 0)
    .to(".night-fade", {
      autoAlpha: 1,
      duration: 0.28,
      ease: "none"
    }, 0.72)
    .to(".hero-copy", {
      autoAlpha: 0.14,
      y: -20,
      duration: 0.22,
      ease: "none"
    }, 0.78)
    .to(".scroll-cue", {
      autoAlpha: 0,
      y: -18,
      duration: 0.2,
      ease: "none"
    }, 0.12);

  ScrollTrigger.refresh();
}

function renderProjects() {
  carousel.innerHTML = projects.map(project => `
    <button class="project-card" type="button" data-project="${project.id}">
      <span class="project-card-visual">
        ${getProjectIcon(project.id)}
      </span>
      <span class="project-card-copy">
        <h3>${project.title}</h3>
        <p>${project.short}</p>
      </span>
    </button>
  `).join("");
}

function getProjectIcon(projectId) {
  const icons = {
    ignis: `
      <span class="project-icon icon-ignis" aria-hidden="true">
        <span class="flame flame-outer"></span>
        <span class="flame flame-mid"></span>
        <span class="flame flame-core"></span>
      </span>
    `,
    ryderdocs: `
      <span class="project-icon icon-ryderdocs" aria-hidden="true">
        <span class="doc doc-back"></span>
        <span class="doc doc-mid"></span>
        <span class="doc doc-front">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </span>
    `,
    blindspot: `
      <span class="project-icon icon-blindspot" aria-hidden="true">
        <span class="eye">
          <span class="pupil"></span>
        </span>
      </span>
    `
  };

  return icons[projectId] || `<span class="project-icon" aria-hidden="true"></span>`;
}

function openProject(projectId) {
  const project = projects.find(item => item.id === projectId);
  if (!project) return;
  const presentationLink = document.querySelector("#modalPresentation");
  const repoLink = document.querySelector("#modalRepo");
  const presentationInProgress = project.presentation === "in-progress" || project.presentation === "#";

  document.querySelector("#modalType").textContent = project.short;
  document.querySelector("#modalTitle").textContent = project.title;
  document.querySelector("#modalDescription").textContent = project.description;
  document.querySelector("#modalTags").innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
  presentationLink.href = presentationInProgress ? "#" : project.presentation;
  presentationLink.textContent = presentationInProgress ? "Presentation in progress" : "View presentation";
  presentationLink.onclick = presentationInProgress ? event => {
    event.preventDefault();
    showNotice(
      "Presentation is currently being made",
      `${project.title}'s presentation is in progress and will be added soon.`
    );
  } : null;

if (project.repo === "proprietary") {
  repoLink.href = "#";
  repoLink.textContent = "Proprietary Code";
  repoLink.onclick = event => {
    event.preventDefault();
    showNotice(
      "Repository is not public",
      "This code is proprietary. The presentation includes a walkthrough of the project and engineering decisions."
    );
  };
} else {
  repoLink.href = project.repo;
  repoLink.textContent = "View repo";
  repoLink.onclick = null;
}
  document.querySelector("#modalMedia").innerHTML = project.media.map(item => `
    <figure class="media-item">
      <img src="${item.src}" alt="${item.caption}">
      <figcaption>${item.caption}</figcaption>
    </figure>
  `).join("");
  modal.classList.add("is-open");
  modalClose.focus();
}

function closeProject() {
  modal.classList.remove("is-open");
}

function showNotice(title, message) {
  document.querySelector("#noticeTitle").textContent = title;
  document.querySelector("#noticeMessage").textContent = message;
  noticeModal.classList.add("is-open");
  noticeClose.focus();
}

function closeNotice() {
  noticeModal.classList.remove("is-open");
}

async function loadGitHub() {
  const avatar = document.querySelector("#githubAvatar");
  const name = document.querySelector("#githubName");
  const bio = document.querySelector("#githubBio");
  const repoGrid = document.querySelector("#repoGrid");
  const contribGrid = document.querySelector("#contribGrid");
  const contribSummary = document.querySelector("#contribSummary");

  avatar.src = "https://github.com/identicons/heidischultz.png";

  try {
    const [profileResponse, reposResponse, eventsResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}`),
      fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`),
      fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=100`)
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      throw new Error("GitHub profile or repository request failed");
    }

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    const events = eventsResponse.ok ? await eventsResponse.json() : [];

    avatar.src = profile.avatar_url || avatar.src;
    name.textContent = profile.name || "Heidi Schultz";
    bio.textContent = profile.bio || `${profile.public_repos || 0} public repositories on GitHub.`;

    repoGrid.innerHTML = repos.map(repo => `
      <a class="repo-card" href="${repo.html_url}" target="_blank" rel="noreferrer">
        <h3>${repo.name}</h3>
        <p>${repo.description || "Check me out!"}</p>
        <span class="repo-meta">
          <span>${repo.language || "Code"}</span>
          <span>Stars ${repo.stargazers_count}</span>
          <span>Forks ${repo.forks_count}</span>
        </span>
      </a>
    `).join("") || `<p class="loading-text">No public repositories found.</p>`;

    const dailyCounts = new Map();
    events.forEach(event => {
      const day = event.created_at.slice(0, 10);
      dailyCounts.set(day, (dailyCounts.get(day) || 0) + 1);
    });

    contribSummary.textContent = `${events.length} recent public GitHub events loaded from the GitHub API.`;
    contribGrid.innerHTML = "";
    for (let i = 0; i < 130; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (129 - i));
      const key = date.toISOString().slice(0, 10);
      const count = dailyCounts.get(key) || 0;
      const colors = ["#edf3f0", "#bfe0ce", "#72ba91", "#2e8b61", "#18613f"];
      const cell = document.createElement("span");
      cell.className = "contrib-cell";
      cell.title = `${key}: ${count} public events`;
      cell.style.setProperty("--level", colors[Math.min(count, 4)]);
      contribGrid.appendChild(cell);
    }
  } catch (error) {
    bio.textContent = "GitHub API data could not load. Try again online.";
    repoGrid.innerHTML = `
      <div class="repo-card"><h3>Repo placeholder</h3><p>GitHub cards appear here when the API loads.</p></div>
      <div class="repo-card"><h3>Repo placeholder</h3><p>Use this space for featured repositories.</p></div>
    `;
    contribSummary.textContent = "Contribution graph placeholder.";
    contribGrid.innerHTML = Array.from({ length: 130 }, (_, index) => {
      const levels = ["#edf3f0", "#bfe0ce", "#72ba91", "#2e8b61", "#18613f"];
      return `<span class="contrib-cell" style="--level:${levels[index % levels.length]}"></span>`;
    }).join("");
  }
}

renderProjects();
initMountainScene();
loadGitHub();
document.querySelectorAll("[data-carousel]").forEach(button => {
  button.addEventListener("click", () => {
    const direction = button.dataset.carousel === "next" ? 1 : -1;
    carousel.scrollBy({ left: direction * carousel.clientWidth * 0.85, behavior: "smooth" });
  });
});

carousel.addEventListener("click", event => {
  const card = event.target.closest(".project-card");
  if (card) openProject(card.dataset.project);
});

modalClose.addEventListener("click", closeProject);
modal.addEventListener("click", event => {
  if (event.target === modal) closeProject();
});
noticeClose.addEventListener("click", closeNotice);
noticeModal.addEventListener("click", event => {
  if (event.target === noticeModal) closeNotice();
});
document.querySelectorAll(".modal-link").forEach(button => {
  button.addEventListener("pointermove", event => {
    const rect = button.getBoundingClientRect();
    button.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
    button.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
  });
});
document.querySelectorAll(".stack-item").forEach(item => {
  item.addEventListener("pointermove", event => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--stack-glow-x", `${event.clientX - rect.left}px`);
    item.style.setProperty("--stack-glow-y", `${event.clientY - rect.top}px`);
  });
});
window.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProject();
    closeNotice();
  }
});
