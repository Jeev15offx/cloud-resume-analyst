function analyzeResume() {
    let text = document.getElementById("resume").value.trim();

    if (text.length === 0) {
        document.getElementById("result").innerText = "Please paste your resume.";
        return;
    }

    // Word count
    let words = text.split(/\s+/);
    let wordCount = words.length;

    // Keyword checks
    let lowerText = text.toLowerCase();

    let keywords = ["project", "skills", "experience", "education"];
    let matchedKeywords = keywords.filter(word => lowerText.includes(word));

    // Score calculation
    let score = 0;

    if (wordCount > 100) score++;
    if (matchedKeywords.includes("project")) score++;
    if (matchedKeywords.includes("skills")) score++;
    if (matchedKeywords.includes("experience")) score++;
    if (matchedKeywords.includes("education")) score++;

    // Result output
    document.getElementById("result").innerHTML = `
        Word Count: ${wordCount} <br>
        Keywords Found: ${matchedKeywords.join(", ") || "None"} <br>
        Score: ${score} / 5
    `;
}
