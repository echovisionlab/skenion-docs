const manualSidebar = [
  "index",
  "manual-versions",
  "release-train-install",
  {
    type: "category",
    label: "Core Model",
    collapsed: false,
    items: [
      "model/object-value-occurrence-model",
      "model/data-types",
      "model/value-occurrences",
      "model/interface-endpoints",
      "model/connections",
      "model/objects",
      "model/messages"
    ]
  }
];

module.exports = {
  manualSidebar
};
