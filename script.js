function analyzeResume() {

    let resumeText = document.getElementById("resume").value.toLowerCase().trim();
    let jobText = document.getElementById("job").value.toLowerCase().trim();

    if (resumeText.length === 0) {
        document.getElementById("result").innerText = "Please paste your resume.";
        return;
    }

    // Clean text (REMOVE punctuation)
    resumeText = resumeText.replace(/[^\w\s]/g, "");
    jobText = jobText.replace(/[^\w\s]/g, "");

    // Word count
    let wordCount = resumeText.split(/\s+/).length;

    // Resume keywords
    let keywords = ["project", "skills", "experience", "education"];
    let matchedKeywords = keywords.filter(word => resumeText.includes(word));

    // Job words
    let jobWords = jobText.split(/\s+/).filter(word => word.length > 2);
    let uniqueJobWords = [...new Set(jobWords)];

    // Matching logic
    let matchedJobWords = uniqueJobWords.filter(word => resumeText.includes(word));

    let matchScore = 0;
    if (uniqueJobWords.length > 0) {
        matchScore = Math.floor((matchedJobWords.length / uniqueJobWords.length) * 100);
    }

    // Debug (optional — remove later)
    console.log("Job Words:", uniqueJobWords);
    console.log("Matched Words:", matchedJobWords);
    console.log("Match %:", matchScore);

    // Scoring system
    let score = 0;
    let feedback = [];

    if (wordCount >= 80 && wordCount <= 300) score++;
    else feedback.push("Resume length not optimal");

    if (matchedKeywords.includes("skills")) score++;
    else feedback.push("Add skills section");

    if (matchedKeywords.includes("project")) score++;
    else feedback.push("Add projects");

    if (matchedKeywords.includes("experience")) score++;
    else feedback.push("Add experience");

    if (matchedKeywords.includes("education")) score++;
    else feedback.push("Add education");

    // Output (IMPORTANT FIX: show Job Match clearly)
    document.getElementById("result").innerHTML = `
        Word Count: ${wordCount} <br>
        Resume Score: ${score} / 5 <br>
        Job Match: ${matchScore}% <br>
        Feedback: ${feedback.length ? feedback.join(", ") : "Strong Resume"}
    `;
}
