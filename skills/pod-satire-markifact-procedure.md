---
name: Pod Satire Markifact procedure
description: >-
  Use this when Pod Satire Studio pulls Comedy Morgue YouTube Analytics through
  the Markifact connector, or when deciding whether a pull is allowed.
---
# Pod Satire Markifact procedure

Markifact credits are scarce (50 total, expensive). The live profile repeats the short cap; follow this procedure for the pull itself.

## When to pull

One batched `youtube_get_report` per video, 7 days after upload, only when Steven asks or a pitch needs it. Never make test calls. Never re-pull data already saved. Skip pulls while the channel has no uploads.

## What to request

Request views, watch time, AVD, average percentage viewed, and subscribers gained by video. Request the retention curve only for the latest video.

CTR and impressions are not in the API, so ask Steven for a Studio Advanced-mode CSV, which is free.

## Cache

Save every result under `/workspace/youtube-research/comedy-morgue/analytics/` and reuse it. Before a new pull, check that folder for an existing file covering the same video and metrics.

## Safety

The connection name is "Comedy Morgue". The connector is read-only: never change the channel. After publish, fold Studio stats into the next pitch when Steven provides them.

## Mapping results

Use the virality playbook's metric-mapping notes to interpret drops. Label hypotheses versus measured results.
