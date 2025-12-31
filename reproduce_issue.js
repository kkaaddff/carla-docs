import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const CARLA_GITHUB_BASE =
  "https://github.com/carla-simulator/carla/blob/master";

const config = (md) => {
  md.core.ruler.push("transform_file_links", (state) => {
    state.tokens.forEach((token) => {
      if (token.type === "inline" && token.children) {
        token.children.forEach((child) => {
          if (child.type === "link_open") {
            const hrefIndex = child.attrIndex("href");
            if (hrefIndex >= 0) {
              const href = child.attrs[hrefIndex][1];
              if (href.startsWith("file://")) {
                const filePath = href.replace("file://", "");
                child.attrs[hrefIndex][1] = `${CARLA_GITHUB_BASE}/${filePath}`;
                child.attrPush(["target", "_blank"]);
                child.attrPush(["rel", "noopener noreferrer"]);
              }
            }
          }
        });
      }
    });
  });
};

config(md);

const input =
  "- [Blueprint.cpp](https://github.com/carla-simulator/carla/blob/ue5-dev/PythonAPI/carla/src/Blueprint.cpp#L58-L114)";
const output = md.render(input);

console.log("Input:", input);
console.log("Output:", output);

if (
  output.includes(
    "https://github.com/carla-simulator/carla/blob/master/PythonAPI/carla/src/Blueprint.cpp#L58-L114"
  ) &&
  output.includes('target="_blank"')
) {
  console.log("SUCCESS: Link transformed correctly.");
} else {
  console.log("FAILURE: Link NOT transformed or malformed.");
}
