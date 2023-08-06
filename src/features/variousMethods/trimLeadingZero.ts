export default function trimLeadingZeros(input: string | number): string {
    if (typeof input === 'number') {
        // Convert the number to a string
        input = input.toString();
    }

    // Trim leading zeros using regex
    const trimmedValue = input.replace(/^0+/, '');

    // Return '0' if the result is an empty string, otherwise return the trimmed value
    return trimmedValue === '' ? '0' : trimmedValue;
}
