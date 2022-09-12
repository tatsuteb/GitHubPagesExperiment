import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import PreviewIFrame from './components/PreviewIFrame';

const App = () => {
  const [sampleCode, setSampleCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const options: editor.IStandaloneEditorConstructionOptions = {
    tabSize: 2,
    suggest: {
      snippetsPreventQuickSuggestions: false
    } as editor.ISuggestOptions
  };

  useEffect(() => {
    fetch('./examples/src/draw_once/index.ts', {
      method: 'GET'
    }).then(async response => {
      const code = await response.text();
      setSampleCode(code);
    });
  }, []);

  return (
    <div>
      <h2>APP</h2>
      <PreviewIFrame
        code={userCode} />
      <div>
        <button
          className='btn btn-primary'
          onClick={() => setUserCode(editorRef.current?.getValue() ?? '')}>Update</button>
      </div>
      <Editor
        options={options}
        width='100%'
        height='30vh'
        path='index.ts'
        theme='vs-dark'
        defaultLanguage='typescript'
        defaultValue={sampleCode}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            // エラーチェックすべてを無効化する方法
            noSemanticValidation: true,
            // エラー番号ごとに無効化する方法
            // diagnosticCodesToIgnore: [2304, 2339, 1064, 1108, 1375, 1378, 1055]

            // noSyntaxValidation: true,
            // noSuggestionDiagnostics: true,
            // onlyVisible: true,
          });
        }}
      />
    </div>
  );
};

export default App;
