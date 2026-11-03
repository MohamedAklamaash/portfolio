---
title: I Pointed Gemini at My Receipts
description: Every expense tracker I tried got abandoned within a week because of the typing. So I built one that reads the receipt for you.
date: 2024-10-15
---

> [ManageMoney](https://manage-money-with-ai.vercel.app/) is a personal finance tracker that reads receipts with Gemini, sorts expenses into categories and sends you a short monthly summary. The code is [on GitHub](https://github.com/MohamedAklamaash/ManageMoneyWithAI).

## Why I built it

I've tried a lot of expense trackers, and it always goes the same way. I enter everything carefully for three or four days, get bored, stop, and at the end of the month I'm wondering where the money went.

The problem was never wanting to track spending. It was the typing: entering every transaction, picking a category and trying to remember what some random ₹500 payment was for. I wanted to see how much of that boring part a model could take off my hands.

## What it does

**Scanning receipts.** You upload a photo of a receipt and Gemini (1.5 Flash, which can read images directly) pulls out the amount, date, shop name, a short description and a suggested category. They come back as JSON and fill in the transaction form, so you just check them and save. If the image isn't a receipt, it returns nothing instead of guessing.

**Accounts and budgets.** You can keep several accounts, set a monthly budget and see your spending by category on a dashboard.

**Recurring transactions.** Rent, subscriptions and similar payments can be marked as recurring. A background job runs every night and adds the ones that are due.

**Monthly summary and budget alerts.** On the first of every month, a scheduled job adds up your income and spending by category, asks Gemini for three short, practical observations and emails you the summary. Another job runs every six hours and emails you once you've used 80% of your budget.

## How it's built

- **Next.js** with **Tailwind CSS** for the app
- **PostgreSQL** with **Prisma** for the data
- **Clerk** for sign-in
- **Inngest** for the scheduled and background jobs (recurring transactions, monthly reports and budget alerts)
- **Resend** for emails
- **Arcjet** for rate limiting and bot protection
- **Gemini 1.5 Flash** for reading receipts and writing the monthly insights

## What I learnt

**Ask for JSON, but don't trust it.** The model is told to reply with JSON only, but it sometimes still wraps the answer in a Markdown code block. Stripping that before parsing, and showing a clear error when parsing still fails, made the receipt feature much more reliable.

**Have a fallback.** If Gemini fails or returns something unusable, the monthly report still goes out with simple fallback insights instead of breaking the whole job.

**Background jobs make the app feel finished.** Recurring payments, monthly emails and alerts don't need anyone to open the app, and that turned out to matter more than any extra page. Inngest also made it easy to retry failed steps and limit how often each user's jobs run.

## Looking back

This is one of my older projects, from 2024. Most of the work is a regular web app with one model call in the middle. Still, it taught me how to use an LLM inside a real product: keep its job small and clear, check what it gives back and make sure the app still works when it fails.

You can try it at [manage-money-with-ai.vercel.app](https://manage-money-with-ai.vercel.app/).
