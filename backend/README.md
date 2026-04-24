# BFHL Hierarchy Analyzer

## 🔹 Overview
This project builds hierarchical trees from parent-child relationships.

## 🔹 Features
- Handles multiple trees
- Detects duplicates
- Identifies invalid entries
- Calculates tree depth
- Provides summary metrics

## 🔹 API

POST /bfhl

### Request:
{
  "data": ["A->B", "A->C", "B->D"]
}

### Response:
- Hierarchies
- Depth
- Invalid entries
- Duplicate edges
- Summary

## 🔹 Tech Stack
- Node.js
- Express
- Vanilla JS frontend

## 🔹 Deployment
- Backend: Render
- Frontend: Vercel