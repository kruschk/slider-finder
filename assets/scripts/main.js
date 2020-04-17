"use strict";

function midpoint(low, high) {
    return (low + high)/2.0;
}

function prependSuggestion(suggestions, value) {
    const suggestion = document.createElement('p');
    suggestion.textContent = "Try this: " + value;
    suggestions.insertBefore(suggestion, suggestions.firstChild);
}

function main() {
    const form = document.getElementById("slider-finder");
    const beginBtn = document.getElementById("begin");
    const goBackBtn = document.getElementById("go-back");
    const higherBtn = document.getElementById("higher");
    const upperInput = document.getElementById("ubound");
    const lowerBtn = document.getElementById("lower");
    const lowerInput = document.getElementById("lbound");
    const resetBtn = document.getElementById("reset");
    const suggestions = document.getElementById("suggestions");
    let lower = 0.0;
    let middle = 0.0;
    let upper = 0.0;
    form.addEventListener("reset", function(e) {
        while (suggestions.firstChild) {
            suggestions.removeChild(suggestions.firstChild);
        }
        beginBtn.disabled = false;
        goBackBtn.disabled = true;
        higherBtn.disabled = true;
        upperInput.disabled = false;
        lowerBtn.disabled = true;
        lowerInput.disabled = false;
        resetBtn.disabled = true;
    });
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (suggestions.children.length < 1) {
            lower = parseFloat(lowerInput.value);
            upper = parseFloat(upperInput.value);
            middle = midpoint(lower, upper);
            prependSuggestion(suggestions, middle);
            beginBtn.disabled = true;
            goBackBtn.disabled = false;
            higherBtn.disabled = false;
            upperInput.disabled = true;
            lowerBtn.disabled = false;
            lowerInput.disabled = true;
            resetBtn.disabled = false;
        }
    });
    goBackBtn.addEventListener("click", function(e) {
        if (1 < suggestions.children.length) {
            suggestions.removeChild(suggestions.firstChild);
            const last = parseFloat(
                suggestions.firstChild.textContent.replace("Try this: ", ""));
            if (last < middle) {
                lower = 2.0*last - upper;
            } else {
                upper = 2.0*last - lower;
            }
            middle = last;
        }
    });
    higherBtn.addEventListener("click", function(e) {
        lower = middle;
        middle = midpoint(lower, upper);
        prependSuggestion(suggestions, middle);
    });
    lowerBtn.addEventListener("click", function(e) {
        upper = middle;
        middle = midpoint(lower, upper);
        prependSuggestion(suggestions, middle);
    });
}

main();
