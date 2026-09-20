# Changelog

## [Unreleased] - 2026-09-20

### Fixed
- **actions.js**: `changePresentationIndex` – "Scroll up list 10" action for presentations was a no-op due to a missing assignment (`self.presentationsIndex + 10` instead of `self.presentationsIndex = self.presentationsIndex + 10`).
- **actions.js**: `hide_slide` / `unhide_slide` – added missing `let` declaration for `slideNumber`, which previously leaked as an implicit global variable.
- **actions.js**: `changeFileIndex` / `changePresentationIndex` – added guards to prevent a crash (`TypeError`) when the file or presentation list is still empty.
- **actions.js**: `sendOscMessage` – outgoing OSC messages are now logged via `self.log('debug', ...)` instead of `console.log`, so they show up in Companion's log panel again.
- **text-helper.js**: `extractText` – fixed a copy-paste bug where the string-argument search loop always checked `args[0]` instead of `args[i]`, causing string payloads at indices other than 0 to be missed.
- **osc-listener.js**: `processData` – guarded against OSC messages with zero arguments, which previously threw before the message address was even evaluated.
- **feedbacks.js**: `showState` – corrected the default dropdown value (`'slideshow'` → `'running'`), which previously didn't match any valid choice and meant the feedback never fired with default settings.
- **feedbacks.js**: `slideProgressBars` – guarded against `NaN` progress values before the first OSC update (variables default to the string `'-'`).
- **feedbacks.js**: `mediaProgressBar` – guarded against `NaN`/`Infinity` progress values when `mediaDurationTrimmed` is `0`.
- **feedbacks.js**: `folderProgressBars` – fixed a division-by-zero when the active folder contains exactly one file.
