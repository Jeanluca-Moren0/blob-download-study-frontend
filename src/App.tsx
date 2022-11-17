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

      setPdfBlob(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  function downloadBlob(blob: string, name: string) {
    const fileBlob = new Blob([blob], { type: 'text/plain' });
    const blobUrl = URL.createObjectURL(fileBlob);

    if (fileBlob.size === 0) {
      alert('Clique novamente, o primeiro clique criou um blob vazio')
      return
    }


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

    document.body.removeChild(link);

  }

  return (
    <div className="App">
      <div className="wrapper">
        <p>Id do arquivo: 1</p>
        <div
          className="button"
          onClick={() => {
            getPdfFile('1');
            downloadBlob(pdfBlob, `pdf-${Date.now()}.pdf`);
          }}
        >
          <p>Baixar PDF 01</p>
        </div>
      </div>
      <div className="wrapper">
        <p>Id do arquivo: 2</p>
        <div
          className="button"
          onClick={() => {
            getPdfFile('2');
            downloadBlob(pdfBlob, `pdf-${Date.now()}.pdf`);
          }}
        >
          <p>Baixar PDF 02</p>
        </div>
      </div>
    </div>
  );
}

export default App;
