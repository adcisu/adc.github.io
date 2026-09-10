function getYouTubeID(url) {
  try {
    const parsedURL = new URL(url);

    if (parsedURL.hostname === "youtu.be") {
      return parsedURL.pathname.slice(1);
    }

    if (
      parsedURL.hostname.includes("youtube.com") ||
      parsedURL.hostname.includes("youtube-nocookie.com")
    ) {
      if (parsedURL.pathname.startsWith("/embed/")) {
        return parsedURL.pathname.split("/embed/")[1].split("/")[0];
      }

      return parsedURL.searchParams.get("v");
    }
  } catch (error) {
    return null;
  }

  return null;
}

function showOrHideSection(elementId, content) {
  const textElement = document.getElementById(elementId);
  const section = textElement.closest(".section");

  if (content && content.trim() !== "") {
    textElement.textContent = content;
    section.style.display = "";
  } else {
    section.style.display = "none";
  }
}

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

fetch("data/projects.json")
  .then((res) => res.json())
  .then((projects) => {
    const project = projects.find((item) => item.id === projectId) || projects[0];

    document.title = project.title;

    document.getElementById("project-hero-image").src = project.image;
    document.getElementById("project-hero-image").alt = project.title;

    document.getElementById("project-category").textContent = project.category;
    document.getElementById("project-title").textContent = project.title;
    document.getElementById(
      "project-meta"
    ).textContent = `${project.author} • ${project.year} • ${project.location}`;

function showOrHideSection(elementId, content) {
  const textElement = document.getElementById(elementId);
  const section = textElement.closest(".section");

  if (content && content.trim() !== "") {
    textElement.textContent = content;
    section.style.display = "";
  } else {
    section.style.display = "none";
  }
}

showOrHideSection("project-concept", project.concept);
showOrHideSection("project-process", project.process);
showOrHideSection("project-final", project.final);

const gallerySection = document.getElementById(
  "project-gallery-section"
);

const gallery = document.getElementById("project-gallery");
const galleryImages = project.gallery || [];

if (galleryImages.length > 0) {
  gallery.innerHTML = galleryImages
    .map(
      (image, index) => `
        <div class="gallery-item">
          <img
            src="${image}"
            alt="${project.title} gallery image ${index + 1}"
            loading="lazy"
          >
        </div>
      `
    )
    .join("");
} else {
  gallerySection.style.display = "none";
}

const videoBox = document.getElementById("project-video");
const videoURL = project.video?.trim();

if (videoURL) {
  const youtubeID = getYouTubeID(videoURL);

  if (youtubeID) {
    videoBox.innerHTML = `
      <iframe
      src="https://www.youtube.com/embed/${youtubeID}"
        title="${project.title} video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
  } else {
    videoBox.innerHTML = `
      <video controls preload="metadata">
        <source src="${videoURL}" type="video/mp4">
        Your browser does not support this video.
      </video>
    `;
  }
} else {
  videoBox.style.display = "none";
}

    }
  )
  .catch((error) => {
    console.error("Failed to load project data:", error);
  });
