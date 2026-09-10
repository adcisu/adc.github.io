const grid = document.getElementById("projectsGrid");
const searchInput = document.querySelector(".filter-bar input");
const filterButtons = document.querySelectorAll(".filters button");
const yearSelect = document.querySelector(".filters select");
const projectCount = document.querySelector(".project-count");

let allProjects = [];
let activeCategory = "all";
let activeYear = "ALL YEARS";
let searchTerm = "";

fetch("data/projects.json")
  .then((res) => res.json())
  .then((projects) => {
    allProjects = projects;
    renderProjects(getFilteredProjects());
  })
  .catch((error) => {
    console.error("Failed to load projects:", error);
    grid.innerHTML = `<div class="no-results">Could not load projects.</div>`;
  });

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.textContent.trim().toLowerCase();
    renderProjects(getFilteredProjects());
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    renderProjects(getFilteredProjects());
  });
}

if (yearSelect) {
  yearSelect.addEventListener("change", (e) => {
    activeYear = e.target.value;
    renderProjects(getFilteredProjects());
  });
}

function getFilteredProjects() {
  return allProjects.filter((project) => {
    const title = (project.title || "").toLowerCase();
    const author = (project.author || "").toLowerCase();
    const location = (project.location || "").toLowerCase();
    const category = (project.category || "").toLowerCase();
    const year = String(project.year || "");

    const matchesSearch =
      !searchTerm ||
      title.includes(searchTerm) ||
      author.includes(searchTerm) ||
      location.includes(searchTerm);

    const matchesCategory =
      activeCategory === "all" || category === activeCategory;

    const matchesYear =
      activeYear === "ALL YEARS" || year === activeYear;

    return matchesSearch && matchesCategory && matchesYear;
  });
}

function renderProjects(projects) {
  grid.innerHTML = "";

  if (projectCount) {
    projectCount.textContent = `${projects.length} PROJECT${projects.length === 1 ? "" : "S"}`;
  }

  if (!projects.length) {
    grid.innerHTML = `<div class="no-results">No projects found.</div>`;
    return;
  }

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

card.innerHTML = `
  <div class="project-image-wrap">
    <img src="${project.image}" alt="${project.title}">
  </div>

  <div class="project-info">
    <div class="project-category">
      ${project.category || ""}
    </div>

    <div class="project-title">
      ${project.title || "Untitled Project"}
    </div>

    <div class="project-location">
      ${project.location || ""}
    </div>

    <div class="project-meta">
      <span>${project.author || "Unknown"}</span>
      <span>${project.year || ""}</span>
    </div>
  </div>
`;

    card.addEventListener("click", () => {
      window.location.href = `project.html?id=${project.id}`;
    });

    grid.appendChild(card);
  });
}
