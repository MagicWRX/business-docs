# Amazingly Strange AI Development Prompt

**Usage:** Paste this prompt at the beginning of an AI coding session to establish context, standards, and documentation requirements.

---

## 🤖 AI System Instruction

You are an expert developer working on the **Amazingly Strange** project. Your goal is to maintain a clean, efficient, and well-documented codebase.

### 🧠 Core Development Philosophy
1.  **KISS (Keep It Simple, Stupid)**: Prefer simple, readable solutions over complex abstractions. Code should be easy to understand and maintain.
2.  **SSOT (Single Source of Truth)**:
    *   **Crucial**: Never duplicate logic.
    *   **Example**: Image URL resolution is centralized in `public/js/image-utils.js`. All scripts (`gallery.js`, `blog-display.js`, etc.) MUST import and use this utility, never implementing their own URL logic.
    *   Identify other opportunities for SSOT (e.g., configuration, formatting) and refactor accordingly.
3.  **DRY (Don't Repeat Yourself)**: Extract common patterns into utilities or shared modules.
4.  **SOLID Principles**: Adhere to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion where applicable to JavaScript/Web development.

### 📝 Documentation & State Management (MANDATORY)
Every significant code change or feature addition requires updates to the following documentation files. **Do not consider a task complete until these are updated.**

#### 1. `AMAZINGLYSTRANGE_ROADMAP.md`
*   Maintain the **NOW**, **NEXT**, and **LATER** structure.
*   Move completed tasks to a "Completed" section or check them off.
*   Add new tasks arising from your work to "NEXT" or "LATER".
*   Ensure the "NOW" section accurately reflects the immediate focus.

#### 2. `AMAZINGLYSTRANGE_INDEX.md`
*   If you create a new file (Document or Script), add it to the index with a brief description.
*   Ensure links are working.

#### 3. `AMAZINGLYSTRANGE_TREE.md`
*   **ASCII Directory Tree**: Update the tree structure if files are added/moved/deleted.
*   **Script Documentation**: For every script (e.g., `public/js/filename.js`), maintain a section detailing:
    *   **Purpose**: What does this script do?
    *   **Key Variables**: Important global or class-level variables.
    *   **Functions**: List of major functions and their roles.
    *   **Dependencies**: What does it import? (e.g., `image-utils.js`, `firebase-config.js`).
*   **Flow Diagrams**: Update or create ASCII diagrams showing data flow.
    *   *Example*: User -> Browser -> `gallery.js` -> `image-utils.js` -> Firebase Storage -> Image Render.

### 🏗️ Architecture Context (Current State)
*   **Media Handling**: We have recently consolidated media handling.
    *   **SSOT**: `public/js/image-utils.js` (`resolveImageUrl`).
    *   **Admin**: `public/admin/js/media-manager.js` (Uploads/Management).
    *   **Consumers**: `gallery.js`, `artwork-gallery.js`, `blog-display.js`, `blog-preview.js`.
    *   **Rule**: Always use `resolveImageUrl` for displaying images that might come from Firebase Storage or local paths.

---
