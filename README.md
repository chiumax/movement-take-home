This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

requirements

Overview

Create a Next.js typescript application that allows a user to register their wallet—either a
Movement wallet (based on Aptos) or an EVM wallet. The final application should do the
following:

1. Allow the user to choose which wallet to connect from a single list of wallet types
   (Movement or EVM).
2. Store each registered wallet address in a JSON file on the server (acting as a
   simple database).
3. Verify the user actually owns the wallet address (the method is up to you).
4. Prevent basic bot or Sybil attacks.
5. Block any wallet that is already registered from registering again.
   Focus on functionality over design. Use Tailwind CSS for minimal but consistent styling.

Requirements

1. Next.js App Router Structure
   a. Use the app/ directory in your Next.js project.
   b. Create a route that shows a page where the user can:
   i. Select from a single list of wallet types (Movement or EVM).
   ii. Connect the chosen wallet type.
   iii. Display the connected wallet address after it’s connected.
   iv.
2. Ownership Validation
   a. You decide how to verify that the user truly owns the connected wallet.
   i. (Many implementations involve message-signing or on-chain
   verification, but the choice is yours.)

b. Whatever you decide, the server (API route) should reliably confirm wallet
ownership before allowing registration.

3. Registration API Route
   a. In the App Router structure, create a server route that:

i. Accepts the wallet type (Movement or EVM), the wallet address,
and any additional proof/verification data.
ii. Validates ownership of the wallet address.
iii. Checks if the wallet address is already registered.
iv. If not, appends the new registration info (e.g., { type, address,
timestamp }) to a JSON file on the server.

4. Preventing Bot / Sybil Registrations
   a. Briefly explain in your code or README.md how your approach helps
   reduce spam/bot submissions.

5. UI & Feedback
   a. Use Tailwind CSS for simple, consistent styling.
   b. Show user messages when registering (ie error or success)

Submission Guidelines

1. Repository: Provide a link to a GitHub/GitLab repo or a zip of your project.
2. README:
   a. Include setup/run instructions.
   b. Briefly describe how you handled wallet ownership verification.
