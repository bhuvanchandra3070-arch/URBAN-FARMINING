import { useState } from "react";
import { codeStudioData } from "../data/codeStudioData";
import { Code2, Copy, Check, FileCode } from "lucide-react";

export default function CodeStudio() {
  const [selectedFile, setSelectedFile] = useState(codeStudioData[0]);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="code-studio-container">
      <div className="section-intro">
        <h2>☕ Java, Spring Boot & Android Code Studio</h2>
        <p>Inspect, copy, and explore the complete production Spring Boot 3.4 REST APIs, JPA entities, MySQL 8.0 schema, and Android XML layouts powering this platform.</p>
      </div>

      <div className="code-layout">
        <div className="file-sidebar">
          <h4>Project Files</h4>
          <div className="file-list">
            {codeStudioData.map(file => (
              <button
                key={file.id}
                className={`file-btn ${selectedFile.id === file.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedFile(file);
                  setCopied(false);
                }}
              >
                <FileCode size={15} />
                <div style={{ textAlign: "left" }}>
                  <div className="file-title">{file.title}</div>
                  <div className="file-meta">{file.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="code-viewer-pane">
          <div className="code-header">
            <div className="code-header-left">
              <div className="window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="code-filename">{selectedFile.title}</span>
              <span className="code-badge">{selectedFile.category}</span>
            </div>
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check size={14} color="#52c41a" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy Source
                </>
              )}
            </button>
          </div>
          <pre className="code-block">
            <code>{selectedFile.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
