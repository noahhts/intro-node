import fs from "node:fs/promises";
import http from "node:http";
import open from "open";

const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `
        <div class="note my-3">
          <p class="text-2xl">${note.content}</p>
          <div class="tags">
            ${note.tags
              .map(
                (tag) =>
                  `<button class="text-sm bg-slate-200 rounded py-1 px-2 mr-3 tag" value="${tag}">${tag}</button>`
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("\n");
};

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, { notes: formatNotes(notes) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export const start = (notes, port) => {
  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  open(`http://localhost:${port}`);
};
