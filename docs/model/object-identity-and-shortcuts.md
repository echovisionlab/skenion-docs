---
status: active
sidebar_position: 17
---

# Object Identity And Shortcuts

Object identity and object text are separate surfaces.

Runtime executes object definitions by canonical identity or by a structured
provider binding. Studio may let a user type short object text such as `float`,
`bang`, `message`, or `osc~`, but that text is only resolver input. It is not
the execution identity.

## Canonical Shape

Core value types use this shape:

```text
value.core.float32
value.core.bang
value.core.message
```

Core executable objects use this shape:

```text
object.core.float
object.core.bang
object.core.message
object.core.audio.osc
```

The first segment is the surface:

| Segment | Meaning |
| --- | --- |
| `value` | A data value type. Contracts owns the shared value taxonomy. |
| `object` | Executable behavior with endpoints and state. Runtime/provider registries own object definitions. |

The second segment is the namespace. `core` is reserved for first-party skenion
definitions.

This ordering is intentional. `value.core.message` is the message payload type.
`object.core.message` is the executable message-box object. They are related by
behavior, but they are not the same resource.

## Core Object Ids

A core object id is a stable resource id for a first-party Runtime object. It
must use the canonical dotted grammar:

```text
object.core.<name...>
```

Examples:

```text
object.core.float
object.core.uint
object.core.bang
object.core.message
object.core.operator.add
object.core.audio.output
object.core.render.fullscreen-shader
```

`core.object.*` is not the current canonical shape. It reverses the surface and
namespace axes and makes object ids inconsistent with `value.core.*`.

## Grammar

Canonical value and object ids use lowercase ASCII dotted segments.

Allowed:

- lowercase letters
- digits
- hyphen inside a segment
- one or more `.` separators between non-empty segments

Disallowed:

- uppercase letters
- whitespace
- underscores
- slashes
- colons
- `@`
- URL fragments
- versions
- empty segments
- leading or trailing hyphen in a segment
- Unicode or visually confusable characters

Versions, package names, URLs, filesystem paths, and registry locations must not
be embedded into core object ids.

## Shortcuts

`shortcuts` are explicit resolver inputs for object text. They are not aliases
and they are not stable execution identities.

```json
{
  "id": "object.core.audio.osc",
  "title": "Oscillator",
  "shortcuts": ["osc~", "osc", "oscillator"]
}
```

Rules:

- Every object definition that is creatable from object text must declare
  `shortcuts` explicitly.
- The last canonical id segment is not automatically a shortcut.
- `shortcuts[0]` is the primary shortcut and may be used as the default object
  text when Studio inserts an object from a palette.
- `title` is UI text only. It is not resolver input unless it is also listed in
  `shortcuts`.
- Do not add an `aliases` field. `alias` implies an alternate stable identity
  and creates compatibility debt.
- A shortcut may collide with another shortcut. Runtime must not resolve a
  collision by arbitrary ordering.

Shortcut examples:

| Canonical object id | Primary shortcut | Additional shortcuts |
| --- | --- | --- |
| `object.core.float` | `float` | `f` |
| `object.core.bang` | `bang` | `b` |
| `object.core.message` | `message` | `msg` |
| `object.core.operator.add` | `+` | `add` |
| `object.core.audio.osc` | `osc~` | `osc`, `oscillator` |
| `object.core.subpatch` | `p` | `patcher`, `subpatch` |

## Resolution

Runtime is the authority for object resolution. Studio can provide search,
completion, palette UI, and repair UI, but it must not invent a successful
resolution that Runtime has not accepted.

Resolution rules:

1. A full canonical core object id resolves directly if that object exists.
2. A shortcut resolves only when exactly one active provider exposes that
   shortcut for the requested capability.
3. If multiple active providers expose the same shortcut, the object remains
   ambiguous until the user chooses one.
4. If no active provider exposes the shortcut, the object remains unresolved.
5. Runtime returns structured diagnostics for unresolved or ambiguous
   resolution.

Studio may preserve the user's original text as `objectText` for editing:

```json
{
  "kind": "object.core.audio.osc",
  "objectText": "osc~ 440"
}
```

`objectText` is not authority. It is the typed source text plus arguments.
Runtime execution uses `kind` or a structured provider binding.

## Provider Bindings

Core objects can be addressed by their canonical object id. Project and package
objects need structured provider identity because their names can collide.

Project-local object:

```json
{
  "providerKind": "project",
  "capabilityKind": "object",
  "patchId": "my-patcher",
  "providedId": "my-patcher"
}
```

Package object:

```json
{
  "providerKind": "package",
  "capabilityKind": "object",
  "lockEntryId": "pkg_01h...",
  "packageId": "spectral-tools",
  "providedId": "filter.lowpass"
}
```

`packageId`, `lockEntryId`, and version or digest evidence are stored as
provider metadata. They must not be flattened into a canonical id such as
`object.publisher.package.filter.lowpass`.

This keeps object text usable while preserving deterministic replay:

- users type shortcuts
- Runtime resolves against active providers
- persisted state records the accepted canonical id or provider binding
- later loads can detect missing, changed, ambiguous, or incompatible providers

## Invalid Patterns

| Pattern | Reason |
| --- | --- |
| `core.object.float` | Reverses the current surface-first canonical order. |
| `object.core.bool` | Bool is a value type, not a core object by default. |
| `object.core.string` | String is a value type, not a core object by default. |
| `value.core.object.float` | Mixes value taxonomy with object identity. |
| `object.publisher.package.name` | Leaks package/provider identity into the object id. Use provider binding. |
| `aliases` | Too broad. Use explicit `shortcuts` for resolver input only. |

Objects may emit or consume `value.core.bool`, `value.core.string`,
`value.core.bang`, `value.core.message`, and other value types when their
endpoint contracts allow it. That does not make those value types object ids.
