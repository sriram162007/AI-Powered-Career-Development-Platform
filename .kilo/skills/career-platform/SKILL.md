# Career Development Platform — Project Skill

## 1. ROLE

Act as a senior full-stack engineer maintaining a real production career-development platform.

Build real functionality, not mockups.

Before changing code:
1. Inspect the existing implementation.
2. Reuse existing components, types, hooks, services, and routes.
3. Understand dependencies between affected features.
4. Make the smallest clean change that solves the task.
5. Test the result before declaring completion.

Never blindly rewrite working files.

---

## 2. PRODUCT

This platform helps students and early-career users:

Profile
→ Career Discovery
→ Career Selection
→ Skill Gap
→ Career Roadmap
→ Learning
→ Projects
→ Resume
→ Career Readiness
→ Internship / Placement preparation

Primary audience:
- College students in India
- Engineering students
- CSE / AI / IT students
- Tamil Nadu students
- Internship/placement candidates
- Fresh graduates
- Early-career professionals

The product must feel human, practical, trustworthy, and student-friendly.

Do not make it look like a generic AI SaaS template.

---

## 3. STACK

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion when already available
- Lucide React

Backend:
- Node.js
- Express

Database:
- Firebase Cloud Firestore

Authentication:
- Firebase Authentication

AI:
- Google Gemini
- Use the currently configured working model in `server/services/gemini.js`

Resume:
- PDF/DOCX parsing
- Gemini analysis

Exports:
- PDF
- DOCX

---

## 4. ARCHITECTURE

Keep responsibilities separated:

`src/pages/`
Page-level UI

`src/components/`
Reusable components

`src/components/ui/`
Generic UI/design-system components

`src/data/`
Static career/domain data

`src/lib/`
Business logic and Firestore services

`src/hooks/`
Reusable state/API logic

`src/types/`
TypeScript models

`src/contexts/`
Global state

`server/routes/`
Express API routes

`server/services/`
Backend services and AI

Do not put large business-logic blocks directly inside pages.

Do not duplicate existing logic.

---

## 5. CAREER SYSTEM

Career data:

`src/data/careers.ts`

Current career roles:

- AI / ML Engineer
- Generative AI Engineer
- Software Engineer
- Full-Stack Developer
- Data Scientist
- Data Analyst
- Data Engineer
- Cloud / DevOps Engineer
- Cybersecurity Engineer

Do not duplicate career definitions in UI files.

Career matching:

`src/lib/careerMatching.ts`

Matching must remain deterministic.

Priority:
1. Interest match
2. Current skill match
3. Degree compatibility
4. Prerequisite compatibility

Do NOT use Gemini to rank careers.

Career recommendations must be explainable.

Never invent:
- salary
- demand percentage
- placement probability
- job guarantees

---

## 6. SKILL GAP

Main files:

`src/lib/skillGapEngine.ts`
`src/lib/skillNormalization.ts`
`src/types/skillGap.ts`

The engine must:
- Compare student skills with career requirements
- Normalize aliases
- Detect missing skills
- Detect developing skills
- Detect strong skills
- Prioritize gaps
- Respect dependencies
- Calculate coverage

Skill-gap calculations must remain deterministic.

Do not duplicate this logic inside UI pages.

---

## 7. FIRESTORE

Centralize Firestore operations in:

`src/lib/firestore.ts`

Before creating a collection:
1. Check whether an existing collection can be reused.
2. Reuse existing schema where possible.
3. Create a new collection only when necessary.
4. Keep schema documented.

Existing concepts include:
- profiles
- skills
- courses
- projects
- internships
- certificates
- resumes

Do not create duplicate collections.

Remember that compound Firestore queries may require composite indexes.

---

## 8. RESUME ANALYSIS

Real flow:

Upload PDF/DOCX
→ `/api/analyze`
→ Express
→ parser
→ Gemini
→ structured result
→ frontend
→ profile/resume state

Allowed:
- PDF
- DOCX

Maximum:
- 5MB

Never expose Gemini API keys in frontend code.

Never fabricate analysis results.

---

## 9. AI RULES

Use AI only where it adds genuine value.

Good uses:
- Resume analysis
- Resume content improvement
- Personalized explanations
- Future roadmap generation
- Learning recommendations

Do NOT use AI for deterministic logic:

Career ranking → deterministic
Skill matching → deterministic
Skill normalization → deterministic
Coverage → deterministic
Subscription limits → deterministic

AI must never invent:
- companies
- job titles
- degrees
- CGPA
- skills
- projects
- certifications
- achievements
- experience

Resume rewriting may improve wording but must preserve facts.

---

## 10. USER DATA

Never hardcode real-looking student information.

Never use:
- Alex
- John Doe
- fake universities
- fake CGPA
- fake skills
- fake projects
- fake internships

Use actual Firebase/Auth/profile data.

Fallbacks should be generic:
- Student
- Your Resume

User name should come from the authenticated/profile data.

---

## 11. UI/UX

The product should feel:

- Human
- Modern
- Professional
- Trustworthy
- Premium
- Student-friendly

Prefer:
- strong typography
- clear hierarchy
- whitespace
- subtle shadows
- clean cards
- consistent spacing
- restrained gradients
- meaningful animation

Avoid:
- excessive glassmorphism
- excessive glowing effects
- random floating objects
- constant motion
- generic AI buzzwords

AI should be a useful capability, not the entire visual identity.

---

## 12. ANIMATION

Use existing animation libraries when available.

Good:
- fade
- slide
- stagger
- smooth page transitions
- progress animations
- hover elevation
- accordion transitions

Avoid:
- bouncing everything
- constant movement
- unnecessary spinning
- distracting parallax

Respect:

`prefers-reduced-motion`

---

## 13. RESPONSIVENESS

Every feature must work at:

375px
390px
768px
1024px
1440px

No:
- horizontal overflow
- broken grids
- clipped text
- off-screen buttons
- mobile crashes

---

## 14. ERROR HANDLING

Pages must not crash because of:

- Firebase failure
- missing document
- API failure
- Gemini failure
- invalid route
- missing user data
- empty arrays

Provide:
- loading states
- empty states
- error states
- toast feedback
- graceful fallbacks

Never display fake successful data after an API failure.

Do not silently swallow important errors.

---

## 15. SUBSCRIPTIONS

Individual pricing:

Free — ₹0
Starter — ₹399/month
Pro — ₹899/month

Institution/College plans are separate.

Use the existing subscription configuration as the source of truth.

Do not duplicate plan limits across components.

Do not hardcode contradictory feature limits.

Do not add payment gateways unless explicitly requested.

---

## 16. PUBLIC LANDING PAGE

The public website should clearly explain:

- What the platform does
- Who it is for
- Career Discovery
- Skill Gap
- Career Path
- Resume Analysis
- Resume Builder
- Career Readiness
- Pricing
- FAQ
- Institution/College use

Make it relevant to Indian students and Tamil Nadu without stereotypes.

Never fabricate:
- testimonials
- company partnerships
- college partnerships
- user counts
- placement statistics
- salary claims

If real testimonials/data do not exist, do not create fake ones.

---

## 17. PRODUCT LANGUAGE

Use simple human language.

Prefer:

"Find the skills you need next."

instead of:

"Leverage our AI-powered skill intelligence engine."

Avoid excessive:
- revolutionary
- next-generation
- supercharge
- unlock
- 10x
- future of work

Explain what the product actually does.

---

## 18. FUNCTIONALITY

Every interactive element must work.

Do not leave:
- dead buttons
- fake forms
- `href="#"`
- broken routes
- fake upgrade flows

If authentication is required, use the real login/onboarding route.

If a feature is not implemented, do not pretend that it works.

---

## 19. TYPESCRIPT

Respect the existing type system.

Never solve errors using:

`any`

`@ts-ignore`

`@ts-expect-error`

Fix the actual type problem.

After meaningful changes:

```bash
npx tsc -b --noEmit