# Security Specification

## 1. Data Invariants
- **Public Read Accessibility**: All visitors (authenticated or anonymous) can read projects, certificates, and published articles.
- **Strict Administrator Gate**: Only verified administrators whose email matches `alwwwan.farhan@gmail.com` (or who exist in `/admins/{uid}`) can create, update, or delete projects, certificates, and articles.
- **Immutable Fields**: `createdAt` and `createdBy` cannot be altered upon document updates.
- **Admin Collection Isolation**: The `/admins` collection can only be read by signed-in admins, and write operations are strictly forbidden from normal client queries.
- **Document ID Path Hardening**: Path parameters (`projectId`, `certificateId`, `articleId`, `adminId`) must not exceed 128 characters and must match alphanumeric/hyphen/underscore patterns.

## 2. The "Dirty Dozen" Payloads (Designed to break laws of Identity, Integrity, and State)
1. **Unauthenticated Project Creation**: Anonymous visitor attempts to write a project document directly without signing in -> REJECTED (`PERMISSION_DENIED`).
2. **Visitor Article Deletion**: An authenticated non-admin user attempts `deleteDoc(doc(db, 'articles', 'article-1'))` -> REJECTED.
3. **Spoofed Admin Email Claim**: An attacker attempts to write an article with `createdBy: "alwwwan.farhan@gmail.com"` while authenticated as a different UID -> REJECTED.
4. **Junk Long ID Injection**: An attacker attempts to create a document with a 2KB junk string ID -> REJECTED by `isValidId()`.
5. **Ghost Field Poisoning**: An update payload contains unexpected shadow keys like `{ isHacked: true }` -> REJECTED by validation schema checks.
6. **Immutable Field Modification**: An update attempts to modify `createdAt` to a backdated timestamp -> REJECTED by `incoming().createdAt == existing().createdAt`.
7. **Privilege Escalation in `/admins`**: An attacker attempts to `setDoc(doc(db, 'admins', attackerUid), { role: 'admin' })` -> REJECTED.
8. **Oversized Content Injection**: An attacker attempts to push a 5MB article content string -> REJECTED by string length boundaries.
9. **Invalid Media Type**: A project payload with `type: "executable"` -> REJECTED by enum restriction `["image", "video"]`.
10. **Unauthenticated Certificate Editing**: Visitor attempts to change certificate issuer name -> REJECTED.
11. **Client Delegation Bypass**: Attempting to query `admins` collection from client without being verified admin -> REJECTED.
12. **Missing Required Fields**: Creating an article without a title or content -> REJECTED by `hasAll()`.
