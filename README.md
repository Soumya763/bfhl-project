# BFHL Hierarchy Analyzer 🚀

A backend API service that processes hierarchical relationships and returns structured tree data along with useful insights like depth, duplicates, and summary statistics.

This project was built as part of the BFHL assignment.

---

## 🔗 Live Deployment

**Base URL:**https://bfhl-project-k3ti.onrender.com


**API Endpoint:**

POST /bfhl


---
## 🖥️ Frontend

The frontend for this project was tested locally and is not deployed.

You can run it locally by opening:
frontend/index.html

Make sure the backend is running or deployed before using the frontend.

## 📌 Features

- Accepts hierarchy input (e.g., `A->B, A->C, B->D`)
- Constructs tree structures from input data
- Supports multiple independent hierarchies
- Calculates:
  - Root node
  - Tree depth
  - Largest hierarchy
- Detects:
  - Invalid entries
  - Duplicate edges
  - Cycles (if present)
- Returns clean JSON response

---

## 📥 API Usage

### Endpoint

POST /bfhl


### Request Body
```json
{
  "data": ["A->B", "A->C", "B->D"]
}
📤 Sample Response
{
  "user_id": "soumyasingh_ddmmyyyy",
  "email_id": "yourcollege@email.com",
  "college_roll_number": "YOURROLL",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "A": {
          "B": {
            "D": {}
          },
          "C": {}
        }
      },
      "depth": 3
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
