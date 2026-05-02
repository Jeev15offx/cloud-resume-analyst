function analyzeResume() {

    let resumeText = document.getElementById("resume").value.toLowerCase().trim();
    let jobText = document.getElementById("job").value.toLowerCase().trim();

    if (resumeText.length === 0) {
        document.getElementById("result").innerText = "Please paste your resume.";
        return;
    }

    // Clean text
    resumeText = resumeText.replace(/[^\w\s]/g, "");
    jobText = jobText.replace(/[^\w\s]/g, "");

    // Stopwords (very important)
    let stopwords = ["the","is","and","a","an","with","for","to","of","in","on","at","by","from","looking","should","have"];

    // Word count
    let wordCount = resumeText.split(/\s+/).length;

    // Resume keywords
    let keywords = ["project", "skills", "experience", "education"];
    let matchedKeywords = keywords.filter(word => resumeText.includes(word));

    // Job words (clean + filter stopwords)
    let jobWords = jobText.split(/\s+/)
        .filter(word => word.length > 2 && !stopwords.includes(word));

    let uniqueJobWords = [...new Set(jobWords)];

    // Matching
    let matchedJobWords = uniqueJobWords.filter(word => resumeText.includes(word));

    let matchScore = 0;
    if (uniqueJobWords.length > 0) {
        matchScore = Math.floor((matchedJobWords.length / uniqueJobWords.length) * 100);
    }

    // Score system
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

    // Output
    document.getElementById("result").innerHTML = `
        Word Count: ${wordCount} <br>
        Resume Score: ${score} / 5 <br>
        Job Match: ${matchScore}% <br>
        Matched Skills: ${matchedJobWords.join(", ")} <br>
        Feedback: ${feedback.length ? feedback.join(", ") : "Strong Resume"}
    `;
}
