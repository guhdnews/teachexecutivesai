/**
 * Document Parser Utility
 * Extracts text from PDF, DOCX, and plain text files
 * Used for resume parsing in Niche Architect tool
 */

/**
 * Parse a file and extract its text content
 * Works client-side using FileReader
 */
export async function parseDocument(file: File): Promise<string> {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    // Plain text files
    if (fileType === "text/plain" || fileName.endsWith(".txt")) {
        return await readAsText(file);
    }

    // For PDF and DOCX, we need server-side processing
    // This function returns a message directing to use the API
    if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
        return await parsePDFClient(file);
    }

    if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileName.endsWith(".docx")
    ) {
        return await parseDOCXClient(file);
    }

    throw new Error(
        "Unsupported file type. Please upload a PDF, DOCX, or TXT file."
    );
}

/**
 * Read file as text (for plain text files)
 */
async function readAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsText(file);
    });
}

/**
 * Parse PDF using server API
 * Client-side PDF parsing is limited, so we send to API
 */
async function parsePDFClient(file: File): Promise<string> {
    // For now, instruct user to paste text
    // In production, you would upload to /api/parse-document
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/api/parse-document", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to parse PDF");
        }

        const data = await response.json();
        return data.text;
    } catch {
        // Fallback message if API not available
        return `[PDF uploaded: ${file.name}]\n\nTo extract text from your PDF, please copy and paste the content manually, or ensure you have the PDF parsing API configured.`;
    }
}

/**
 * Parse DOCX using server API
 */
async function parseDOCXClient(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/api/parse-document", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to parse DOCX");
        }

        const data = await response.json();
        return data.text;
    } catch {
        // Fallback message if API not available
        return `[DOCX uploaded: ${file.name}]\n\nTo extract text from your Word document, please copy and paste the content manually, or ensure you have the document parsing API configured.`;
    }
}

/**
 * Validate file is acceptable type and size
 */
export function validateDocumentFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024; // 5MB

    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
    ];

    const allowedExtensions = [".pdf", ".docx", ".txt"];

    const hasValidType = allowedTypes.includes(file.type);
    const hasValidExtension = allowedExtensions.some((ext) =>
        file.name.toLowerCase().endsWith(ext)
    );

    if (!hasValidType && !hasValidExtension) {
        return {
            valid: false,
            error: "Please upload a PDF, DOCX, or TXT file.",
        };
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: "File is too large. Maximum size is 5MB.",
        };
    }

    return { valid: true };
}
