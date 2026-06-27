# skenion Manual

Human-readable product Manual for skenion.

This repository explains the product model that Runtime, Studio, SDK, and
Contracts must share. It is intentionally separate from machine-readable
contracts and from internal research notes.

## Source Of Truth

| Surface | Owner |
| --- | --- |
| Human-readable model docs | `skenion-docs` |
| JSON Schema, shared value/interface DTOs, generated TS/Rust packages | `skenion-contracts` |
| Runtime behavior and native execution | `skenion-runtime` |
| Studio UI and interaction implementation | `skenion-studio` |
| Compatibility fixtures and tutorials | `skenion-examples` |

Do not copy schema definitions from `skenion-contracts` into this repository.
Docs here explain intent, ownership, model boundaries, and review criteria.
Machine contracts remain in `skenion-contracts`.

## Start Here

- [skenion Manual](docs/index.md)
- [Manual Versions](docs/manual-versions.md)
- [Object Value Occurrence Model](docs/model/object-value-occurrence-model.md)
- [Data Types](docs/model/data-types.md)
- [Value Occurrences](docs/model/value-occurrences.md)
- [Interface Endpoints](docs/model/interface-endpoints.md)
- [Connections](docs/model/connections.md)
- [Objects](docs/model/objects.md)
- [Messages](docs/model/messages.md)

## Manual Site

This repository builds a Docusaurus Manual for GitHub Pages:

- Pages URL: `https://skenion.github.io/skenion-docs/`
- current source publishes as `/manual/`
- frozen minor Manual docs publish as paths such as `/manual/0.33`
- product patch versions normalize to minor Manual versions, so `0.22.5`
  normalizes to `0.22`

Local development:

```bash
pnpm run start
```

Static build:

```bash
pnpm run build
```

## Document Status

Model documents use front matter:

```yaml
---
status: draft
---
```

Status values:

- `draft`: review model before implementation.
- `active`: current design reference.
- `deferred`: intentionally documented as future work.

## Validation

```bash
pnpm run ci
```

The validation script checks document status front matter, local markdown links,
Manual version normalization, and the Docusaurus build.

## License And Credit

This repository is licensed under the Apache License, Version 2.0.

Redistributions must preserve copyright, license, and NOTICE information as
required by Apache-2.0. If skenion helps your artwork, research, publication,
installation, or tool, please credit skenion.
