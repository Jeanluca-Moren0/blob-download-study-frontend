import './App.css';
import { api } from './api';
import { useState } from 'react';

function App() {
  const [pdfBlob, setPdfBlob] = useState<string>('');

  async function getPdfFile(id: string) {
    try {
      const response = await api.get(`/pdf/${id}`, {
        responseType: 'arraybuffer',
      });

      console.log(response.data);

      setPdfBlob(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function downloadBlob(blob: string, name: string) {
    const fileBlob = new Blob([blob], { type: 'text/plain' });
    const blobUrl = URL.createObjectURL(fileBlob);

    const link = document.createElement('a');

    link.href = blobUrl;
    link.download = name;

    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Remove link from body
    document.body.removeChild(link);
    setPdfBlob('');
  }

  return (
    <div className="App">
      <p>Id do arquivo: 1</p>
      <div
        className="button"
        onClick={() => {
          getPdfFile('1');
          downloadBlob(pdfBlob, 'pdf01.pdf');
        }}
      >
        <p>Baixar PDF 01</p>
      </div>
      <p>Id do arquivo: 2</p>
      <div
        className="button"
        onClick={() => {
          getPdfFile('2');
          downloadBlob(pdfBlob, 'pdf02.pdf');
        }}
      >
        <p>Baixar PDF 02</p>
      </div>
    </div>
  );
}

export default App;