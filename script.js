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

    // Stopwords
    let stopwords = ["the","is","and","a","an","with","for","to","of","in","on","at","by","from","looking","should","have"];

    // High-value technical skills
    let techSkills = [
        "java","python","javascript","html","css","react","node",
        "aws","cloud","docker","kubernetes","git","sql","mysql"
    ];

    // Word count
    let wordCount = resumeText.split(/\s+/).length;

    // Resume keywords
    let keywords = ["project", "skills", "experience", "education"];
    let matchedKeywords = keywords.filter(word => resumeText.includes(word));

    // Job words filtered
    let jobWords = jobText.split(/\s+/)
        .filter(word => word.length > 2 && !stopwords.includes(word));

    let uniqueJobWords = [...new Set(jobWords)];

    // Matching logic
    let matchedWords = uniqueJobWords.filter(word => resumeText.includes(word));

    // Separate technical matches
    let matchedTech = matchedWords.filter(word => techSkills.includes(word));
    let matchedGeneric = matchedWords.filter(word => !techSkills.includes(word));

    // Weighted scoring
    let techScore = matchedTech.length * 2;     // high weight
    let genericScore = matchedGeneric.length * 1;

    let totalPossible = uniqueJobWords.length * 2;

    let matchScore = totalPossible > 0
        ? Math.floor(((techScore + genericScore) / totalPossible) * 100)
        : 0;

    // Resume structure score
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
        🔹 Tech Matches: ${matchedTech.join(", ")} <br>
        🔸 Other Matches: ${matchedGeneric.join(", ")} <br>
        Feedback: ${feedback.length ? feedback.join(", ") : "Strong Resume"}
    `;
}
