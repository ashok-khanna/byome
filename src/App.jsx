import { useState, createElement, Fragment, useEffect } from "react";
import "./App.css";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react/lib";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

function App() {
  const [doc, setDoc] = useState("# Hello byome");

  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment })
    .processSync(doc).result;

  useEffect(() => {
    const startState = EditorState.create({
      doc,
      extensions: [
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            setDoc(update.state.doc.toString());
          }
        }),
      ],
    });

    new EditorView({
      state: startState,
      parent: document.getElementById("editor"),
    });
  }, []);

  return (
    <div>
      <div id="editor"></div>
      <div>{md}</div>
    </div>
  );
}

export default App;
