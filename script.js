function analyzeResume() {

    let text = document.getElementById("resume").value.trim();

    if (text.length === 0) {
        document.getElementById("result").innerText = "Please paste your resume.";
        return;
    }

    let words = text.split(/\s+/);
    let wordCount = words.length;

    let lowerText = text.toLowerCase();

    let keywords = ["project", "skills", "experience", "education"];
    let matchedKeywords = keywords.filter(word => lowerText.includes(word));

    let score = 0;
    let feedback = [];

    if (wordCount < 80) {
        feedback.push("Resume is too short");
    } else if (wordCount > 300) {
        feedback.push("Resume is too long");
    } else {
        score++;
    }

    if (matchedKeywords.includes("skills")) score++;
    else feedback.push("Add skills section");

    if (matchedKeywords.includes("project")) score++;
    else feedback.push("Add project section");

    if (matchedKeywords.includes("experience")) score++;
    else feedback.push("Add experience section");

    if (matchedKeywords.includes("education")) score++;
    else feedback.push("Add education details");

    document.getElementById("result").innerHTML = `
        Word Count: ${wordCount} <br>
        Score: ${score} / 5 <br>
        Feedback: ${feedback.length ? feedback.join(", ") : "Strong Resume"}
    `;
}
