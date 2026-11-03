---
title: Sync a Slice of Postgres, Not the Whole Database
description: Sometimes another service needs a few tables and columns from your database, not all of it. syncset-db copies just that part and keeps it up to date.
date: 2026-01-20
---

> [syncset-db](https://pypi.org/project/syncset-db/) copies the tables and columns you choose from one PostgreSQL database into one or more others. It's on [PyPI](https://pypi.org/project/syncset-db/) and the code is [on GitHub](https://github.com/MohamedAklamaash/syncset).

## The problem

I kept running into the same situation. There's one main database, and another service needs a small part of it: a few tables, and often only a few columns from each.

The usual options aren't great. You can copy the whole database, which is wasteful and shares data the other service shouldn't see. Or you write a sync script by hand, which breaks the first time someone adds a column.

Normal replication tools don't help much either. They're built to copy everything, for failover or read scaling, not to share a carefully chosen slice.

So I wrote syncset-db. You describe what to copy in a YAML file and it does the rest.

## What it does

**You pick the tables and columns.** For each table you list the columns to copy, and you can rename them on the way (for example `user_name` in the source becomes `username` in the replica). Everything else stays in the source database.

**It keeps the replica's schema in step.** If the replica table doesn't exist yet, syncset-db creates it. If a column you're syncing is missing on the replica, it adds it with `ALTER TABLE`, and it copies over indexes that only use synced columns. For renamed columns it also checks that the types still match on both sides.

**It only copies what's new.** After each run it saves the highest primary key it has copied for each table and replica. The next run starts from there, so a crash or a restart doesn't mean starting again from zero.

**It can skip rows that haven't changed.** If you turn on checksums for a table, it hashes the chosen columns of each row and compares them with what's already in the replica, then skips the rows that match.

**It works in batches.** Rows are read with a streaming cursor and written in batches, as plain inserts or as upserts using Postgres's `ON CONFLICT`, where you choose which columns get updated.

It can sync to several replicas in parallel, and there's a `--dry-run` flag that shows what it would change without touching anything.

## Its limits

There's one thing worth being upfront about. Because it tracks progress by the highest primary key, a plain run only picks up *new* rows. An update to an old row isn't noticed unless checksums are on for that table. Proper change data capture, using Postgres's logical decoding, is the next step and is listed under future work in the README.

There are no automated tests yet either. It's a small tool (a few hundred lines) that I've tested by hand against real databases.

## What I learnt

I spent most of my time in two places. The first was SQLAlchemy's reflection and Postgres's catalogs, working out a table's real columns, types, defaults and indexes so the replica could be created or fixed correctly. The second was getting upserts right: deciding which columns should change on a conflict and which should be left alone.

It also taught me that a small tool like this should be boring to use. You write the config once, run it and forget about it.

## Try it

```bash
pip install syncset-db
syncset --file=sync.yaml --dry-run
```

The README on [GitHub](https://github.com/MohamedAklamaash/syncset) has a full example config.
