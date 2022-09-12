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
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <label htmlFor="examples-drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Cubism SDK for Web Examples</a>
        </div>
      </div>

      <div className="drawer drawer-mobile">
        <input id="examples-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-items-center">
          <div className="flex w-full h-full">
            <Editor
              options={options}
              width='50%'
              height='90%'
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
            <div className="divider divider-horizontal mx-8">
              <button
                className='btn btn-circle btn-primary'
                onClick={() => setUserCode(editorRef.current?.getValue() ?? '')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <PreviewIFrame code={userCode} />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="examples-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            実装例
            <li><a>モデルを表示する</a></li>
            <li><a>モーションを再生する</a></li>
            <li><a>視線追従</a></li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default App;
