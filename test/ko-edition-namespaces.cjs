'use strict';
// Namespaces added by the Korean edition for strings that used to be hardcoded
// English. They exist in en.json and ko.json only: zh-CN and ar fall back to
// the English source for them (fallbackLng), which is the deliberate behavior
// for a missing key. Locale-parity tests skip these for zh-CN and ar.
module.exports = new Set(["quitWarning", "updateText", "editAgent", "hivePicker", "releaseDrop", "agentName", "holdButton", "booting", "misc", "app", "settingsNotes", "actionText"]);
