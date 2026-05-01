let score = 0;
let feedback = [];

// Length check
if (wordCount < 80) {
    feedback.push("Resume is too short");
} else if (wordCount > 300) {
    feedback.push("Resume is too long");
} else {
    score++;
}

// Keywords importance
if (matchedKeywords.includes("skills")) {
    score++;
} else {
    feedback.push("Add skills section");
}

if (matchedKeywords.includes("project")) {
    score++;
} else {
    feedback.push("Add project section");
}

if (matchedKeywords.includes("experience")) {
    score++;
} else {
    feedback.push("Add experience");
}

if (matchedKeywords.includes("education")) {
    score++;
} else {
    feedback.push("Add education details");
}

// Output
document.getElementById("result").innerHTML = `
    Word Count: ${wordCount} <br>
    Score: ${score} / 5 <br>
    Feedback: ${feedback.join(", ") || "Strong Resume"}
`;
