# BUG_REPORT.md

# Bug Report – Notes Management System

## Project

Notes Management System

## Developer

Sahil Topale

---

# Overview

This document summarizes the issues identified during development and testing of the Notes Management System and the corresponding fixes implemented.

The objective was to ensure stable CRUD functionality, proper frontend-backend integration, validation, and deployment readiness.

---

# Bug 1 — Request Body Undefined During Note Creation

## Description

Creating notes caused a server crash.

Error:

```text
TypeError:
Cannot destructure property 'title' of 'req.body' as it is undefined
```

## Root Cause

Request body parsing middleware was not configured correctly.

## Fix Applied

Added:

```js
app.use(express.json());
```

## Result

POST requests now correctly parse JSON payloads.

Status:
✅ Fixed

---

# Bug 2 — Note ID Generation Returned Function Instead of Value

## Description

Created notes received invalid IDs.

## Root Cause

Function reference stored instead of execution.

Incorrect:

```js
const newId = generateNoteId;
```

## Fix Applied

Updated to:

```js
id: generateNoteId()
```

## Result

Unique IDs generated successfully.

Status:
✅ Fixed

---

# Bug 3 — Validation Allowed Empty Notes

## Description

Users could create notes with missing fields.

## Root Cause

Validation logic checked incorrectly.

Incorrect:

```js
if (!title && !content)
```

## Fix Applied

Updated:

```js
if (!title || !content)
```

Added HTTP status:

```js
return res.status(400)
```

## Result

Invalid note submissions blocked.

Status:
✅ Fixed

---

# Bug 4 — User Notes Filter Failed

## Description

Filtering notes by user returned empty results.

## Root Cause

Data type mismatch.

String compared with Number.

## Fix Applied

Converted:

```js
Number(req.params.userId)
```

## Result

User-specific notes retrieved correctly.

Status:
✅ Fixed

---

# Bug 5 — Edit Functionality Not Updating UI

## Description

Edited notes saved successfully but UI did not refresh.

## Root Cause

Frontend state not reloaded after update.

## Fix Applied

Added:

```js
await fetchNotes()
```

after update.

## Result

UI refreshes immediately.

Status:
✅ Fixed

---

# Bug 6 — Full Note View Did Not Expand

## Description

View action toggled button state but full content remained hidden.

## Root Cause

Preview rendering logic incomplete.

## Fix Applied

Added expand/collapse state.

Implemented:

```js
expanded
setExpanded()
```

## Result

Users can now open and close full note content.

Status:
✅ Fixed

---

# Bug 7 — Frontend Failed After Deployment

## Description

Application produced:

```text
notes.map is not a function
```

## Root Cause

Unexpected API response structure.

## Fix Applied

Updated:

```js
setNotes(
 Array.isArray(res.data)
 ? res.data
 : []
)
```

## Result

Frontend safely handles API responses.

Status:
✅ Fixed

---

# Bug 8 — API Returned 404 During Note Creation

## Description

Frontend POST requests failed.

Error:

```text
404 Not Found
```

## Root Cause

Incorrect API base URL.

## Fix Applied

Updated service file:

```js
const API =
"https://popaya-fullstack-assessment.onrender.com/notes"
```

## Result

Frontend communicates successfully with backend.

Status:
✅ Fixed

---

# Bug 9 — MongoDB Connection Failed On Render

## Description

Backend deployment crashed.

Error:

```text
ECONNREFUSED localhost:27017
```

## Root Cause

Local MongoDB URI used in cloud deployment.

## Fix Applied

Configured:

```env
MONGO_URI=
mongodb+srv://...
```

Enabled:

* Network Access
* Database User
* Environment Variables

## Result

Backend connected successfully.

Status:
✅ Fixed

---

# Bug 10 — Render Backend Returned "Cannot GET /"

## Description

Root URL displayed:

```text
Cannot GET /
```

## Root Cause

Root endpoint missing.

## Fix Applied

Added health endpoint.

```js
app.get("/", (req,res)=>{
 res.send("API Running")
})
```

## Result

Backend now confirms deployment status.

Status:
✅ Fixed

---

# Final Status

All assignment requirements completed successfully.

Implemented:

✅ Create Notes
✅ View Notes
✅ Edit Notes
✅ Delete Notes
✅ Search Notes
✅ Validation
✅ MongoDB Integration
✅ Responsive UI
✅ Deployment
✅ Documentation

---

End of Report
