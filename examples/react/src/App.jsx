import React, { useState, useCallback } from "react";
import "./App.css";

const RAPID_API_HOST = "pdf-generator3.p.rapidapi.com";
const API_URL = `https://${RAPID_API_HOST}`;

const baseHeaders = {
  "content-type": "application/json",
  accept: "application/json",
  "x-rapidapi-host": RAPID_API_HOST
};

const App = () => {
  const [key, setKey] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [printBackground, setPrintBackground] = useState(false);

  const downloadPdf = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/html`, {
      method: "POST",
      headers: { ...baseHeaders, "x-rapidapi-key": key },
      body: JSON.stringify({
        data: document.documentElement.innerHTML.replace("\n", ""),
        options: {
          printBackground
        }
      })
    })
      .then(response => response.blob())
      .then(response => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(response);
        a.setAttribute("download", "test.pdf");
        a.click();
        setLoading(false);
      })
      .catch(err => {
        console.error("Error while downloading pdf", err);
      });
  }, [printBackground, key]);

  const generatePdf = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/html`, {
      method: "POST",
      headers: { ...baseHeaders, "x-rapidapi-key": key },
      body: JSON.stringify({
        data: document.documentElement.innerHTML.replace("\n", ""),
        options: {
          output: {
            type: "base64"
          },
          printBackground
        }
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("pdf response", response);
        const {
          response: { output }
        } = response;
        setPdf(output);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error while downloading pdf", err);
      });
  }, [printBackground, key]);

  return (
    <div>
      <h1>Pdf</h1>
      <div className="api-section no-print">
        <label>
          RapidApi Key:
          <input
            type="text"
            value={key}
            onChange={e => setKey(e.target.value)}
          />
        </label>
      </div>
      <main>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          pulvinar vulputate sollicitudin. Suspendisse dictum hendrerit dictum.
          In quis tempus tortor. Nam lacinia augue eu arcu ultrices, vitae
          auctor est vestibulum. Praesent at volutpat sem, vitae tempus ligula.
          Fusce feugiat auctor odio eget ullamcorper. Nullam a tortor non dolor
          eleifend varius. Sed pellentesque in justo eu ultricies. In augue
          tellus, auctor nec blandit nec, consequat vitae nibh.
        </p>
        <p>
          You may find some more information about this argument here:{" "}
          <a href="">click here</a>
        </p>
      </main>
      <div className="pdf-only">
        <p>This section will only be visible in the PDF</p>
      </div>
      <div className="no-print pdf-frame">
        {loading ? (
          <span className="loading">
            <span className="loading-text">Loading...</span>
          </span>
        ) : (
          <div className="btns">
            <button type="button" onClick={generatePdf} disabled={!key}>
              Generate Pdf
            </button>
            <button type="button" onClick={downloadPdf} disabled={!key}>
              Download Pdf
            </button>
            <label className="check">
              Print background
              <input
                type="checkbox"
                value="Print background"
                checked={printBackground}
                onChange={e => setPrintBackground(e.target.checked)}
              />
            </label>
          </div>
        )}
        {pdf && (
          <iframe className="" src={`data:application/pdf;base64,${pdf}`} />
        )}
      </div>
    </div>
  );
};

export default App;
