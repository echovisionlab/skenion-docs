import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const statusValues = new Set(["draft", "active", "deferred"]);
const markdownFiles = listMarkdown(root).sort();
const errors = [];

for (const file of markdownFiles) {
  const relative = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");
  if (relative.startsWith(`docs${path.sep}`)) {
    const status = readStatus(text);
    if (!status) {
      errors.push(`${relative}: missing status front matter`);
    } else if (!statusValues.has(status)) {
      errors.push(`${relative}: invalid status "${status}"`);
    }
  }
  for (const link of localMarkdownLinks(text)) {
    const target = link.split("#", 1)[0];
    if (!target) {
      continue;
    }
    const absolute = path.resolve(path.dirname(file), decodeURIComponent(target));
    if (!fs.existsSync(absolute)) {
      errors.push(`${relative}: broken local link ${link}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`validated ${markdownFiles.length} markdown files`);

function listMarkdown(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...listMarkdown(absolute));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      result.push(absolute);
    }
  }
  return result;
}

function readStatus(text) {
  if (!text.startsWith("---\n")) {
    return null;
  }
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) {
    return null;
  }
  const frontMatter = text.slice(4, end).split("\n");
  for (const line of frontMatter) {
    const match = /^status:\s*([A-Za-z-]+)\s*$/.exec(line.trim());
    if (match) {
      return match[1];
    }
  }
  return null;
}

function localMarkdownLinks(text) {
  const links = [];
  const markdownLink = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const match of text.matchAll(markdownLink)) {
    const href = match[1].trim();
    if (
      href &&
      !href.startsWith("http://") &&
      !href.startsWith("https://") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("#")
    ) {
      links.push(href);
    }
  }
  return links;
}
