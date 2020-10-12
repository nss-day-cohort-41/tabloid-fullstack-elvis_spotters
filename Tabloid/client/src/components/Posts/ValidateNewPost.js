export function ValidateNewPost(post) {
    /* All validations return an object. First key is the boolean validation itself.
        Second key is the unvalidated field. */

    // Validate title
    if (!post.title || post.title.trim() === "") {
        return { isValidated: false, field: "title" }
    }

    // Validate content
    if (!post.content || post.content.trim() === "") {
        return { isValidated: false, field: "content" };
    }

    // Validate imageLocation, if present
    if (post.imageLocation) {
        try {
            new URL(post.imageLocation)
        } catch (_) {
            return { isValidated: false, field: "imageLocation" };
        }
    }

    // Validate category
    if (!post.categoryId) {
        return { isValidated: false, field: "categoryId" };
    }

    // All validations pass
    return { isValidated: true, field: "" };

}