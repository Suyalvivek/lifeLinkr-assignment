// Validates name with minimal restrictions (allows letters, numbers, underscores, spaces, no strict length)
export function validateName(str) {
    const regex = /^[a-zA-Z0-9_ ]*$/; // Allows letters, numbers, underscores, and spaces, no minimum length
    return regex.test(str.trim()) ? "" : "Name can only contain letters, numbers, underscores, or spaces.";
}

// Validates description with minimal restrictions (allows any characters, no minimum length)
export function validateDesc(str) {
    return str.trim() ? "" : "Description cannot be empty."; // Only checks for non-empty, allows any characters
}

// Validates ID with minimal restrictions (allows any number, no strict digit limit)
export function validateId(str) {
    const regex = /^[0-9]*$/; // Allows any number of digits (including empty)
    return regex.test(str.trim()) ? "" : "ID must be a number.";
}

// Makes date validation optional (accepts empty or valid date format)
export function validateDate(str) {
    return !str.trim() || /^\d{4}-\d{2}-\d{2}$/.test(str.trim()) ? "" : "Invalid date format (use YYYY-MM-DD).";
}