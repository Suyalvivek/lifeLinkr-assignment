// Validates name with minimal restrictions (allows letters, numbers, underscores, spaces, no strict length)
export function validateName(str) {
    const regex = /^[a-zA-Z0-9_ ]*$/; // Allows letters, numbers, underscores, and spaces, no minimum length
    return regex.test(str.trim()) ? "" : "Name can only contain letters, numbers, underscores, or spaces.";
}

