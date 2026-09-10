const form = document.getElementById("submitForm");
const submitButton = document.querySelector(".submit-btn");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbze8u3ocY5jeFP_Fq4SfyKHNzATzqG5u-nEFpgtDXs1FgGd4vZ4_iGpDaxFgnwFW92e/exec";

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (submitButton?.disabled) return;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "SUBMITTING...";
    }

    const formData = new FormData(form);

    const textOnlyData = new URLSearchParams();
    textOnlyData.append("projectTitle", formData.get("projectTitle") || "");
    textOnlyData.append("authorName", formData.get("authorName") || "");
    textOnlyData.append("year", formData.get("year") || "");
    textOnlyData.append("location", formData.get("location") || "");
    textOnlyData.append("category", formData.get("category") || "");
    textOnlyData.append("driveLink", formData.get("driveLink") || "");
    textOnlyData.append("concept", formData.get("concept") || "");
    textOnlyData.append("process", formData.get("process") || "");
    textOnlyData.append("finalOutcome", formData.get("finalOutcome") || "");
    textOnlyData.append("reflection", formData.get("reflection") || "");

    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        body: textOnlyData,
        mode: "no-cors"
      });

      alert("Submission sent.");
      form.reset();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "SUBMIT DOCUMENTATION →";
      }
    }
  });
}
