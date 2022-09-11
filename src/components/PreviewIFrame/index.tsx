interface Props {
  code?: string;
}

const PreviewIFrame = ({ code }: Props) => {
  const srcDoc = `<!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <canvas id="canvas" width="512" height="512"></canvas>
    
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
    <script src="./framework.js"></script>
    <script type="text/babel" data-plugins="transform-typescript" data-presets="env,stage-3,typescript">
      const app = async () => {
        ${code}
      };
      window.globalThis.app = app;
      const customEvent = new CustomEvent("appLoaded");
      document.dispatchEvent(customEvent);
    </script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        console.log("DOMContentLoaded");
        document.addEventListener("appLoaded", () => {
          console.log("appLoaded", window);
          try {
            window.app();
          } catch (err) {
            console.log(err.message);
          }
        });
      });
    </script>
  </body>
  </html>`;

  return (
    <iframe
      srcDoc={srcDoc}
      frameBorder={0}
      width={550}
      height={550}></iframe>
  );
};

export default PreviewIFrame;
