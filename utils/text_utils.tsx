// Create a capitalize function in utils/text_utils.tsx:
export function capitalize(text: string): string {
  // The string method can have multiple words separated by spaces
    // The first letter of each word is capitalized
    // The rest of the word is converted to lowercase
    return text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}