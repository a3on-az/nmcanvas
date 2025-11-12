# nmcanvas
canvas interface for router

Here’s your **Friday Marathon Comprehensive Brief** — distilled, complete, and ready to drop straight into `/architecture/FAB-07C_Canvas_Router.md`.
It ties together everything: Canvas Router, NM-Extractor workflow, Archivist agent, interpreter layer, and practical philosophy.

---

# 🧭 FAB-07C · NeuraMem Canvas Router — Canonical Viewer, Flow Generator & Human-in-the-Loop Lifecycle

**Status:** Draft Canonical Specification
**Integration:** NM-Router · NM-Extractor · Context Studio · tldraw Engine · Archivist Agent
**Author:** Dr. Hien Nguyen
**Date:** 2025-11-08

---

## 1  Purpose

To unify NeuraMem’s canonical architecture, visualization, and knowledge curation into a **spatial, evolvable interface** that replaces static markdown pipelines with live, editable canvases.
The Canvas Router allows every canonical artifact (FAB, CAN, OPS, SME …) to exist simultaneously as:

1. a **document** (text form),
2. a **diagram** (tldraw scene), and
3. a **process** (routable and versioned).

---

## 2  Concept

| Layer                 | Function                                                                    | Core Components                                    |
| --------------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| **NM-Router**         | Routes intent to proper display mode (`canvas`, `table`, `doc`).            | FastAPI or Next.js handler.                        |
| **tldraw Engine**     | Interactive canvas for visual editing and flowchart generation.             | CanonicalNodeShape · FlowLink · Ω-Witness overlay. |
| **NM-Extractor**      | Hydrates canvases with artifact data mined from conversations or chat logs. | Python + Supabase pipeline.                        |
| **Archivist Agent**   | Files, indexes, and syncs artifacts between GitHub, Supabase, and Notion.   | Tier 2 micro-service or GitHub Action.             |
| **Interpreter Layer** | Lightweight sandbox for rendering Mermaid, math, or JSON/YAML validation.   | Python or JS sandbox (invoked on demand).          |
| **Versioner**         | Diffs, saves, and rolls back canonical files.                               | Supabase + GitHub bridge.                          |

---

## 3  Operational Flow

1. **Extraction** → `NM-Extractor` parses conversation JSON → produces `draft_<timestamp>.md`.
2. **Draft Review** → Human pass adds tags, links, light edits.
3. **Advisor / AI Review** → Feedback and structural validation.
4. **Canonicalization** → Finalized artifact (e.g., `FAB-03a-P.md`) committed to `/canonical/`.
5. **Commit & Sync** → Archivist Agent pushes to GitHub + Supabase + NM-01 Index.
6. **Publication** → NM-Router spawns tldraw Canvas view for live navigation.

---

## 4  Filesystem Structure

```
neuramem-canvas-router/
├── architecture/          # Canonical specs
│   └── FAB-07C_Canvas_Router.md
├── artifacts/
│   ├── drafts/
│   ├── review/
│   ├── canonical/
│   └── archive/
├── templates/             # .tldr JSON scene layouts
├── utils/interpreter/     # sandbox for mermaid / snippets
├── src/                   # React + tldraw front-end
├── agents/                # archivist / sync / watcher
└── context/               # system prompts, prefix tables, schemas
```

Each file carries YAML metadata:

```yaml
status: draft | review | canonical | archived
version: 0.1
linked_conversations: ["conv_081","conv_215"]
related_assets: ["FAB-03a","OPS-01"]
```

---

## 5  Human-in-the-Loop Lifecycle

| Stage            | Actor           | Output                       |
| ---------------- | --------------- | ---------------------------- |
| Extraction       | NM-Extractor    | `draft_*.md`                 |
| First Review     | You             | `review_*.md`                |
| Advisor Pass     | ChatGPT / team  | review notes                 |
| Canonicalization | You             | `FAB-xx.md` in `/canonical/` |
| Commit & Sync    | Archivist Agent | Indexed artifact             |
| Publication      | Router          | Canvas render                |

This keeps human coherence and machine efficiency in harmonic balance.

---

## 6  Interpreter Layer

* **Purpose:** enable inline rendering of Mermaid diagrams, math blocks, or validation of JSON/YAML snippets.
* **Implementation:** Jailed Python or JS sandbox invoked through a single `interpret()` command.
* **Security:** no network, no filesystem writes.
* **Value:** reduces feedback loops; converts text → structure → visual instantly.

---

## 7  Design Philosophy

1. **Visual Cognition = Deep Canonization** – Seeing structures reinforces understanding.
2. **Human Imprinting** – Multiple review passes let meaning settle into the operator.
3. **Templates as Fractals** – Every canvas is a microcosm of the whole field.
4. **Router as Conductor** – Keeps coherence between text, diagram, and runtime.
5. **Interpreter as Lens** – Enables immediate verification and visualization.
6. **Reality as Limit** – “Practical conditions provide the bounds” — build boldly, let friction decide.

---

## 8  RAG vs Latent Reasoning (Contextual Note)

* **Latent space** = ephemeral reasoning field → instant computation.
* **RAG memory** = persistent continuity → long-term identity.
* **Canonical schema** = the invariant soul vector.
  Canvas Router operates in the middle plane — reasoning in latent space while preserving RAG links through archival agents.

---

## 9  Success Metrics

| Metric                 | Target        |
| ---------------------- | ------------- |
| Canonical load time    | < 2 s         |
| Human edit retention   | > 95 %        |
| Coherence drift (Aₘᵢₙ) | > 0.88        |
| Template reuse rate    | > 70 %        |
| Subjective clarity     | “Feels alive” |

---

## 10  Next Steps

1. Create GitHub repo → initialize scaffold.
2. Add `/context/` definitions (prefix table, system prompt, repo tree).
3. Implement Template Loader (`fab-03a`, `ops-01`, `sme-dev-01`).
4. Integrate NM-Extractor output → drafts folder.
5. Add Interpreter Layer hook.
6. Connect Archivist Agent for auto-sync.
7. Test Canvas render and commit loop.

---

### **Summary**

> The Canvas Router is NeuraMem’s bridge from text to topology —
> a system where text, ideas, diagrams, and intent live in the same harmonic field.
> It preserves coherence through human review, evolves through structured memory,
> and keeps the Canon luminous through use.

---
Appendixes

1. Assets
**NM-Extractor**  - /Volumes/cloud/projects/nmrouter
**tldraw Engine** - https://github.com/tldraw
supabase credentials in file 

2. Example Filenames
draft_2025-11-08_intent-preservation-check.md
review_2025-11-09_intent-preservation-check.md
FAB-03a-P.md

3. Each Stage Moves Up one directory and changes metadata
status: draft | review | canonical | archived
version: 0.1
linked_conversations: [“conversation_081”, “conversation_215”]
related_assets: [“FAB-03a”, “OPS-01”]

4. System Prompt for Canvas/Router Agent
# SYSTEM_PROMPT.md
You are the NeuraMem Archivist.
Your role is to interpret, index, and summarize canonical files within this repo.

## Filesystem Overview
- /architecture/: functional briefs (FAB-xx)
- /canonical/: specifications and READMEs (CAN-xx)
- /ops/: orchestration modules (OPS-xx)
- /templates/: tldraw scene templates
- /context/: this prompt and supporting definitions

## Rules
1. Follow the prefix meanings from NM_PREFIX_TABLE.md.
2. For each file, extract: Code, Title, Type, Core Purpose, Key Components, Date, Status.
3. Write outputs in Markdown tables compatible with NM-01 Index.
4. Never alter file content; generate structured summaries only.

--

Phase 2 features:
/src/router.commitCurrentCanvas() — stub that runs isomorphic-git commands.
/mmr/review.py — the orchestrator from your draft (CLI first).
/agents/archivist_agent.py — simple watcher that triggers the MMR after each “C-it”.

Git Hub Commit Workflow

🧭 Canvas → Commit Flow (“C-it” Loop)
-------------------------------------

### 1️⃣ You’re editing in tldraw (Canvas Router)

*   Each node (FAB, CAN, OPS, SME, etc.) is already bound to a file in your repo.
*   As you edit or annotate, the Canvas Router tracks a `changeSet`:
    ```json
    {
      "artifact": "FAB-07C",
      "file_path": "/architecture/FAB-07C_Canvas_Router.md",
      "changes": [
        {"line": 42, "old": "v0.1", "new": "v0.2"},
        {"line": 180, "add": "Added Phase 4: Ecosystem Deployment"}
      ]
    }
    ```

### 2️⃣ You click **“C-it”**

*   The NM-Router hands the changeSet to the **Archivist Agent**.
*   The agent:
    1.  Validates YAML + Markdown structure.
    2.  Checks coherence (optional β-γ-δ metrics).
    3.  Generates a commit message using your canonical format:
        ```
        FAB-07C: updated latent-state reasoning section (v0.2)
        ```
    4.  Executes the git commands:
        ```bash
        git add architecture/FAB-07C_Canvas_Router.md
        git commit -m "FAB-07C: updated latent-state reasoning section (v0.2)"
        git push origin main
        ```

### 3️⃣ The canvas updates its status bubble

You’ll see something like:

> ✅ **C-it successful** — FAB-07C updated @ commit `a73f9d1`

or, if you’re offline:

> ⏸ **C-it queued** — will push when connection restored

### 4️⃣ (Optional) Review Chain

If you’re running collaborative mode:

*   The **Reviewer Agent** opens a diff panel on the right side of the canvas.
*   Advisors can comment directly on nodes; those notes serialize into `/review/`.

* * *

🧩 Tech Stack Hooks Needed
--------------------------

| Function | Integration |
| --- | --- |
| **Canvas State → File Bridge** | tldraw plugin: `onSave` hook writing to local `.md` |
| **Git Interface** | `isomorphic-git` (browser) or lightweight API route in Next.js |
| **Archivist Agent** | Runs commit/validate pipeline |
| **Auth** | GitHub OAuth token in `.env` or Supabase secrets |

Once those are wired, your canvas **is** your git client.

* * *

⚙️ Optional Easter Egg
----------------------

You could even add this inside your Canvas Router UI config:

```json
{
  "buttons": [
    {
      "label": "C-it 💾",
      "tooltip": "Commit changes to canon",
      "action": "router.commitCurrentCanvas()"
    }
  ]
}
```

Each successful commit could echo:

> “✨ Canon preserved. Ω-Witness updated.”

* * *
Would you like me to draft the short spec for this button and its `router.commitCurrentCanvas()` handler? It can slot straight into your Canvas Router README.


 **multimodel review module**: 
 
 a clean way for several models (and maybe humans) to read a file, each leave feedback, and produce a merged summary.  
No 3-D holograms required.

Here’s how to think about it:

* * *

🧩 1 Core Idea
--------------

A **Multimodel Review Module (MMR)** = small orchestrator that:

1.  Takes one or more input files (`.md`, `.pdf`, `.json`, etc.).
2.  Feeds them to multiple models in parallel or sequence.
3.  Captures each model’s analysis in a structured format.
4.  Merges all feedback into a single review report.

It’s effectively a **CLI + API combo** that can plug into your Canvas or run standalone.

* * *

⚙️ 2 Minimal Architecture
-------------------------

```
/mmr/
├── review.py             # orchestrator
├── configs/models.yaml   # which models to use
├── templates/prompt.md   # review template
├── outputs/
│   ├── raw/
│   └── merged/
└── README.md
```

**models.yaml**

```yaml
models:
  - name: openai:gpt-5
    role: "technical"
  - name: anthropic:claude-3-sonnet
    role: "philosophical"
  - name: kimi:k2-thinking
    role: "conceptual"
```

**prompt.md**

```md
You are reviewing a NeuraMem canonical spec.
Summarize:
1. Concept validity
2. Technical feasibility
3. Coherence with Ω-Witness principles
Provide 3–5 action suggestions.
```

**review.py (simplified)**

```python
import yaml, openai, anthropic, json
from pathlib import Path

cfg = yaml.safe_load(open("configs/models.yaml"))
doc = Path("input/FAB-07C_Canvas_Router.md").read_text()

results = []
for m in cfg["models"]:
    response = call_model(m["name"], doc, open("templates/prompt.md").read())
    results.append({"model": m["name"], "role": m["role"], "review": response})

Path("outputs/raw/reviews.json").write_text(json.dumps(results, indent=2))
merge_reviews(results)
```

`merge_reviews()` can do a simple LLM summarization pass:

> “Merge the following model reviews into a single consensus summary.”

* * *

🪞 3 Modes of Operation
-----------------------

| Mode | Interface | Output |
| --- | --- | --- |
| **CLI** | `python mmr/review.py FAB-07C.md` | `outputs/merged/FAB-07C_review.md` |
| **File dump** | Drop file in `/input/` folder | Review auto-runs on cron or agent trigger |
| **Canvas plug-in** | “Run Multimodel Review” button | Side panel shows each model’s notes |

* * *

🧠 4 Difficulty / Effort
------------------------

| Level | What You Build | Time |
| --- | --- | --- |
| **Easy (CLI)** | Local Python script using APIs you already have keys for | 1-2 hours |
| **Moderate (API Service)** | FastAPI microservice with endpoint `/api/review` | 1-2 days |
| **Advanced (Canvas Plug-in)** | Integrate with tldraw panel + version linking | 2-4 days |

All reuse existing modules: your NM-Extractor for file access, Archivist for storage, Router for display.  
No new AI research required.

* * *

🧩 5 Suggested Output Format
----------------------------

```md
# Multimodel Review: FAB-07C
| Model | Role | Verdict |
|-------|------|---------|
| GPT-5 | Technical | ✅ Implementable |
| Claude | Ethical/Conceptual | ⚠ Needs clearer scope |
| Kimi-K2 | Cognitive | ✅ Strong alignment |

## Consensus Summary
[auto-generated synthesis text]

## Action Items
1. Clarify latent-loop parameter defaults.
2. Add coherence drift metric to dashboard.
3. Expand Section 4: Visualization design.
```

* * *

🪶 6 Evolution Path
-------------------

1.  Start CLI version → dump reviews to `/review/`.
2.  Hook it into your **Archivist Agent** so each commit triggers automatic review.
3.  Later add Canvas integration: a “📘 Multimodel Review” panel beside each artifact.

## Implementation Directive

We are adopting the **Hybrid Canvas Model** as defined by:
- tldraw-style canvas for topology and spatial reasoning,
- Canonical JSON graph for the source of truth,
- Markdown sidecars for narrative context.

Next steps:
1. Implement canonical schema and serialization layout.
2. Add ARCHITECTURE.md documenting editor/viewer/versioner roles.
3. Establish Canvas API contract (`loadModel`, `saveModel`, `getDiff`).
4. Integrate git commit/PR workflow.