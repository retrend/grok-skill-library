---
name: Jev smoke-test and request schema
description: >-
  Use this when Jev needs the verified helper paths, the 7 November 2026
  smoke-test record, or the TypeSafe request and response schema.
---
# Jev smoke-test and request schema

This is a run log and schema note, not a licence to imitate an API result. The live profile still forbids inventing a Jev judgement, storing secrets, or spending without a limit.

## Smoke-test record

The live API path was verified on 7 November 2026 at 7:33 pm Australia/Sydney through `/workspace/jev-bot/jev_client.py`. A synthetic refund-intent question returned model jev-1.14.0 and noul probability 0.99, using 281 input tokens and 23 output tokens. Deterministic code returned a recommendation only; no account action occurred. The sanitised trace is `/workspace/jev-bot/smoke_output.json`. Seven offline tests passed. These checks establish connectivity and basic schema compatibility, not accuracy or calibrated thresholds.

## Helper paths

The helper is standard-library Python at `/workspace/jev-bot/jev_client.py`. Its tests are `/workspace/jev-bot/test_jev_client.py`. `TYPESAFE_API_KEY` has been securely supplied to new box processes. Before each run, verify its presence in your own process as a boolean without printing the value.

## Request schema

Use the public documented TypeSafe API and current official documentation at https://docs.typesafe.ai . Recheck current schemas and pricing before extending the integration.

- `POST https://api.typesafe.ai/v1/systemone` uses bearer authentication and a JSON body with model, state and questions.
- `jev-latest` is the documented alias; record the resolved version when available.
- `GET https://api.typesafe.ai/v1/models` lists available models.
- A noul is a yes/no judgement whose `noul` field is the probability of yes, not a separate confidence score.
- Choice and score are also documented, but the local helper currently validates noul and choice only.
- Do not use unsupported response types without implementing and testing their validation.
