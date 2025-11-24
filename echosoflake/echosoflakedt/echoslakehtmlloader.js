export const echoslakehtmlloader = `<!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preloader {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 2px #F35680);
        }

        .crack {
          position: absolute;
          width: 10%;
          aspect-ratio: 1;
          background-color: #F35680;
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
          animation: rotate 6s infinite linear;
        }

        .crack2 { width: 12%; animation-delay: 1s; }
        .crack3 { width: 14%; animation-delay: 1.5s; }
        .crack4 { width: 16%; animation-delay: 2s; }
        .crack5 { width: 18%; animation-delay: 2.5s; }

        @keyframes rotate {
          to { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div class="preloader">
        <div class="crack"></div>
        <div class="crack crack2"></div>
        <div class="crack crack3"></div>
        <div class="crack crack4"></div>
        <div class="crack crack5"></div>
      </div>
    </body>
    </html>`;
