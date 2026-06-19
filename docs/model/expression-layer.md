---
status: draft
---

# Expression Layer

Expression objects are a layer over control or signal domains. They should not
be the base data delivery model.

## Families

- `expr`: control-rate expression evaluation.
- `expr~`: signal/audio-rate expression evaluation.
- `fexpr~`: signal expression evaluation with indexed sample history.

## Reference Syntax

Initial syntax to review:

- `$f1`: float/control inlet 1.
- `$i1`: integer/control inlet 1.
- `$s1`: string/control inlet 1.
- `$v1`: signal vector inlet 1.
- `$x1[n]`: indexed signal input sample.
- `$y[n]`: indexed signal output/history sample.

## Deferred Decisions

The full parser grammar, function list, security policy, optimization strategy,
and runtime backend are deferred. This document only establishes that expr-like
objects sit on top of the delivery model and must respect control versus audio
domain boundaries.
