---
status: draft
---

# Pure Data Notes

Skenion is not a Pure Data clone, but Pd is a useful reference for compact
patching semantics.

## Source References

- Object creation and object boxes:
  [g_text.c](https://github.com/pure-data/pure-data/blob/master/src/g_text.c)
- Message box evaluation and `set` behavior:
  [g_text.c](https://github.com/pure-data/pure-data/blob/master/src/g_text.c)
- Float, int, symbol, bang, send, receive:
  [x_connective.c](https://github.com/pure-data/pure-data/blob/master/src/x_connective.c)
- Control arithmetic objects:
  [x_arithmetic.c](https://github.com/pure-data/pure-data/blob/master/src/x_arithmetic.c)
- Audio-rate arithmetic objects:
  [d_arithmetic.c](https://github.com/pure-data/pure-data/blob/master/src/d_arithmetic.c)
- Oscillator and phasor signal classes:
  [d_osc.c](https://github.com/pure-data/pure-data/blob/master/src/d_osc.c)
- Expr, expr~, fexpr~ implementation:
  [x_vexp.c](https://github.com/pure-data/pure-data/blob/master/src/x_vexp.c)

## Lessons For Skenion

- `bang` is a selector/event, not a retained value.
- `set` is a selector/method, not a visual inlet.
- Message boxes evaluate stored message text when clicked or banged.
- Number atoms are value UI controls with send/receive capability.
- Operator objects and value UI objects are different object families.
- `~` marks signal/audio-rate behavior, which must be separate from control
  message dispatch.
- Expression object syntax belongs above the base delivery model.
