const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Utilitário para converter arquivo para data URI base64
function toBase64Uri(relPath, mimeType) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn('Arquivo não encontrado:', fullPath);
    return '';
  }
  const buf = fs.readFileSync(fullPath);
  return `data:${mimeType};base64,${buf.toString('base64')}`;
}

// Carregar ativos oficiais da Monte Cristo
const LOGO_BRANCO_FOOTER_SVG = toBase64Uri('assets/logo_branco_footer_montecristo.svg', 'image/svg+xml');
const LOGO_PNG = toBase64Uri('assets/logo.png', 'image/png');
const SIMBOLO_SVG = toBase64Uri('assets/simbolo-monte.svg', 'image/svg+xml');
const LOGO_GRADIENT_SVG = toBase64Uri('assets/logo_horizontal_montecristo_gradient.svg', 'image/svg+xml');

// Produtos reais oficiais RECORTADOS & AUTOTRIMMED (com canal alfa e limites exatos)
const JACK_DANIELS = toBase64Uri('assets/produtos/recortados/whisky-jack-daniels-old-no-7-1l.png', 'image/png');
const RED_BULL = toBase64Uri('assets/produtos/recortados/energetico-red-bull-tradicional-250ml.png', 'image/png');
const TANQUERAY = toBase64Uri('assets/produtos/recortados/gin-tanqueray-london-dry-750ml.png', 'image/png');
const CHIVAS_12 = toBase64Uri('assets/produtos/recortados/whisky-chivas-regal-12-anos-1l.png', 'image/png');
const ABSOLUT = toBase64Uri('assets/produtos/recortados/vodka-absolut-1l.png', 'image/png');
const APEROL = toBase64Uri('assets/produtos/recortados/aperitivo-aperol-spritz-750ml.png', 'image/png');
const JOHNNIE_WALKER = toBase64Uri('assets/produtos/recortados/whisky-johnnie-walker-black-label-1l.png', 'image/png');
const JACK_HONEY = toBase64Uri('assets/produtos/recortados/whisky-jack-daniels-honey-nexxt-1l.png', 'image/png');

// CSS Comum de luxo sóbrio (Linha Híbrida: Azul Petróleo Oficial + Toque Champanhe/Dourado Sutil)
const COMMON_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    color: #F8FAFC;
    background: #06131D;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .font-outfit {
    font-family: 'Outfit', sans-serif;
  }

  /* Piso de estúdio com sombra e iluminação direcional */
  .studio-floor-shadow {
    position: absolute;
    bottom: 25px;
    width: 860px;
    height: 45px;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9) 0%, rgba(2, 8, 12, 0.5) 45%, transparent 75%);
    border-radius: 50%;
    filter: blur(8px);
    pointer-events: none;
  }

  /* Posicionamento equilibrado em 5 colunas com âncora central */
  .stage-bottle {
    position: absolute;
    bottom: 30px;
    transform: translateX(-50%);
    filter: drop-shadow(0 22px 28px rgba(0, 0, 0, 0.88));
  }

  .pos-1 { left: 155px; z-index: 5; }
  .pos-2 { left: 335px; z-index: 7; }
  .pos-3 { left: 540px; z-index: 9; }
  .pos-4 { left: 745px; z-index: 7; }
  .pos-5 { left: 925px; z-index: 5; }
`;

// =============================================================================
// 1. STORY DE LANÇAMENTO (1080 x 1920)
// Safe Zone: Topo 280px / Base 280px
// =============================================================================
function getStoryHtml() {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      ${COMMON_CSS}
      .story-canvas {
        width: 1080px;
        height: 1920px;
        position: relative;
        background: radial-gradient(circle at 50% 32%, #0F2D3D 0%, #0A1E2B 45%, #06131D 80%, #03080E 100%);
        padding: 290px 75px 280px 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .ambient-glow {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -25%);
        width: 900px;
        height: 700px;
        background: radial-gradient(circle, rgba(200, 168, 107, 0.12) 0%, rgba(14, 70, 99, 0.25) 50%, transparent 75%);
        filter: blur(90px);
        pointer-events: none;
      }

      .header-area {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .badge-tradicao {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        border: 1px solid rgba(200, 168, 107, 0.4);
        background: rgba(10, 30, 43, 0.6);
        backdrop-filter: blur(10px);
        color: #E8D5B5;
        padding: 10px 24px;
        border-radius: 999px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 3px;
        text-transform: uppercase;
        margin-bottom: 24px;
      }

      .badge-dot {
        width: 7px;
        height: 7px;
        background: #C8A86B;
        border-radius: 50%;
      }

      .brand-logo-main {
        width: 520px;
        height: auto;
        filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.6));
      }

      .hero-copy {
        margin-top: 36px;
        text-align: center;
      }

      .hero-title {
        font-family: 'Outfit', sans-serif;
        font-size: 62px;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -1.5px;
        color: #FFFFFF;
      }

      .hero-title span.champagne {
        color: #E8D5B5;
      }

      .hero-subtitle {
        margin-top: 18px;
        font-size: 24px;
        font-weight: 400;
        color: #CBD5E1;
        line-height: 1.45;
        max-width: 820px;
      }

      /* Vitrine Central de Garrafas Transparentes */
      .bottles-stage {
        position: relative;
        z-index: 5;
        height: 560px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin: 10px 0;
      }

      .bottom-area {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .features-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }

      .feature-box {
        background: rgba(14, 70, 99, 0.22);
        border: 1px solid rgba(200, 168, 107, 0.25);
        border-radius: 12px;
        padding: 14px 12px;
        text-align: center;
        backdrop-filter: blur(12px);
      }

      .feature-box-title {
        font-family: 'Outfit', sans-serif;
        font-size: 19px;
        font-weight: 800;
        color: #F8FAFC;
      }

      .feature-box-desc {
        font-size: 13px;
        color: #94A3B8;
        margin-top: 3px;
      }

      .cta-card {
        background: #0E4663;
        border: 1px solid rgba(200, 168, 107, 0.45);
        border-radius: 16px;
        padding: 22px 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 16px 35px rgba(0, 0, 0, 0.6);
      }

      .cta-left {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .cta-label {
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #E8D5B5;
      }

      .cta-domain {
        font-family: 'Outfit', sans-serif;
        font-size: 32px;
        font-weight: 900;
        color: #FFFFFF;
      }

      .cta-action {
        background: #FFFFFF;
        color: #0E4663;
        font-family: 'Outfit', sans-serif;
        font-size: 18px;
        font-weight: 800;
        padding: 14px 26px;
        border-radius: 10px;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
    </style>
  </head>
  <body>
    <div class="story-canvas">
      <div class="ambient-glow"></div>

      <!-- Topo -->
      <div class="header-area">
        <div class="badge-tradicao">
          <span class="badge-dot"></span>
          20 Anos de Tradição na Serra Gaúcha
        </div>
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="brand-logo-main" alt="Monte Cristo Distribuidora">
        
        <div class="hero-copy">
          <h1 class="hero-title">
            O NOVO CANAL DIGITAL<br>
            <span class="champagne">AGORA ESTÁ NO AR.</span>
          </h1>
          <p class="hero-subtitle">
            Mais de 1.000 rótulos nobres com preço de distribuidora e atendimento ágil para o seu evento ou bar.
          </p>
        </div>
      </div>

      <!-- Vitrine Central de Garrafas Transparentes com 5 posições perfeitas -->
      <div class="bottles-stage">
        <div class="studio-floor-shadow"></div>
        <img src="${RED_BULL}" class="stage-bottle pos-1" style="height:320px;" alt="Red Bull">
        <img src="${TANQUERAY}" class="stage-bottle pos-2" style="height:440px;" alt="Tanqueray">
        <img src="${JACK_DANIELS}" class="stage-bottle pos-3" style="height:510px;" alt="Jack Daniels">
        <img src="${JACK_HONEY}" class="stage-bottle pos-4" style="height:440px;" alt="Jack Honey">
        <img src="${CHIVAS_12}" class="stage-bottle pos-5" style="height:450px;" alt="Chivas Regal">
      </div>

      <!-- Rodapé Seguro -->
      <div class="bottom-area">
        <div class="features-row">
          <div class="feature-box">
            <div class="feature-box-title">+1.000 Rótulos</div>
            <div class="feature-box-desc">100% com Nota Fiscal</div>
          </div>
          <div class="feature-box">
            <div class="feature-box-title">Preço Distribuidor</div>
            <div class="feature-box-desc">Condições Comerciais</div>
          </div>
          <div class="feature-box">
            <div class="feature-box-title">Até 20% Consignação</div>
            <div class="feature-box-desc">Exclusivo para Festas</div>
          </div>
        </div>

        <div class="cta-card">
          <div class="cta-left">
            <span class="cta-label">Toque no link deste story</span>
            <span class="cta-domain">montecristobebidas.com.br</span>
          </div>
          <div class="cta-action">
            Acessar Site &rarr;
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

// =============================================================================
// 2. FEED POST DE LANÇAMENTO (1080 x 1350)
// Grid Suíço com Elegância Híbrida
// =============================================================================
function getFeedHtml() {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      ${COMMON_CSS}
      .feed-canvas {
        width: 1080px;
        height: 1350px;
        position: relative;
        background: radial-gradient(circle at 50% 25%, #0E2938 0%, #091C27 45%, #06131D 80%, #03090F 100%);
        padding: 70px 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .feed-glow {
        position: absolute;
        top: 220px;
        left: 50%;
        transform: translateX(-50%);
        width: 850px;
        height: 480px;
        background: radial-gradient(ellipse at center, rgba(200, 168, 107, 0.12) 0%, rgba(14, 70, 99, 0.28) 45%, transparent 75%);
        filter: blur(80px);
        pointer-events: none;
      }

      .feed-header {
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(200, 168, 107, 0.25);
        padding-bottom: 26px;
      }

      .brand-logo-feed {
        width: 420px;
        height: auto;
      }

      .feed-kicker {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 3px;
        color: #E8D5B5;
        text-transform: uppercase;
        border: 1px solid rgba(200, 168, 107, 0.35);
        padding: 8px 18px;
        border-radius: 999px;
        background: rgba(10, 28, 39, 0.5);
      }

      .headline-section {
        position: relative;
        z-index: 10;
        margin-top: 25px;
        text-align: center;
      }

      .headline-title {
        font-family: 'Outfit', sans-serif;
        font-size: 54px;
        font-weight: 900;
        line-height: 1.12;
        letter-spacing: -1.2px;
        color: #FFFFFF;
      }

      .headline-title span.champagne {
        color: #E8D5B5;
      }

      .headline-sub {
        font-size: 21px;
        color: #CBD5E1;
        margin-top: 14px;
        line-height: 1.45;
        max-width: 840px;
        margin-left: auto;
        margin-right: auto;
        font-weight: 400;
      }

      .feed-stage {
        position: relative;
        z-index: 5;
        height: 480px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin: 10px 0;
      }

      .pillars-grid {
        position: relative;
        z-index: 10;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-bottom: 20px;
      }

      .pillar-card {
        background: rgba(14, 70, 99, 0.22);
        border: 1px solid rgba(200, 168, 107, 0.25);
        border-radius: 14px;
        padding: 16px 18px;
        backdrop-filter: blur(12px);
      }

      .pillar-tag {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: #C8A86B;
        margin-bottom: 4px;
      }

      .pillar-title {
        font-family: 'Outfit', sans-serif;
        font-size: 20px;
        font-weight: 800;
        color: #F8FAFC;
      }

      .pillar-desc {
        font-size: 13px;
        color: #94A3B8;
        margin-top: 4px;
        line-height: 1.35;
      }

      .callout-bar {
        position: relative;
        z-index: 10;
        background: #0E4663;
        border: 1px solid rgba(200, 168, 107, 0.4);
        border-radius: 16px;
        padding: 18px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
      }

      .callout-url {
        font-family: 'Outfit', sans-serif;
        font-size: 26px;
        font-weight: 900;
        color: #FFFFFF;
      }

      .callout-btn {
        background: #FFFFFF;
        color: #0E4663;
        font-family: 'Outfit', sans-serif;
        font-size: 17px;
        font-weight: 800;
        padding: 12px 24px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    </style>
  </head>
  <body>
    <div class="feed-canvas">
      <div class="feed-glow"></div>

      <!-- Topo com Logo Oficial -->
      <div class="feed-header">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="brand-logo-feed" alt="Monte Cristo Distribuidora">
        <div class="feed-kicker">LANÇAMENTO OFICIAL</div>
      </div>

      <!-- Headline -->
      <div class="headline-section">
        <h1 class="headline-title">
          O NOVO SITE DA MONTE CRISTO <span class="champagne">ESTÁ NO AR.</span>
        </h1>
        <p class="headline-sub">
          Mais de 20 anos de solidez na Serra Gaúcha, agora com navegação fluida, cálculo rápido e atendimento via WhatsApp.
        </p>
      </div>

      <!-- Vitrine Real com Garrafas Perfeitamente Recortadas -->
      <div class="feed-stage">
        <div class="studio-floor-shadow"></div>
        <img src="${RED_BULL}" class="stage-bottle pos-1" style="height:290px;" alt="Red Bull">
        <img src="${TANQUERAY}" class="stage-bottle pos-2" style="height:390px;" alt="Tanqueray">
        <img src="${JACK_DANIELS}" class="stage-bottle pos-3" style="height:440px;" alt="Jack Daniels">
        <img src="${JACK_HONEY}" class="stage-bottle pos-4" style="height:390px;" alt="Jack Honey">
        <img src="${CHIVAS_12}" class="stage-bottle pos-5" style="height:400px;" alt="Chivas">
      </div>

      <!-- 3 Pilares Suíços -->
      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="pillar-tag">ORIGINALIDADE</div>
          <div class="pillar-title">+1.000 Rótulos</div>
          <div class="pillar-desc">Destilados, vinhos e cervejas com procedência e NF.</div>
        </div>

        <div class="pillar-card">
          <div class="pillar-tag">COMERCIAL</div>
          <div class="pillar-title">Preço Direto</div>
          <div class="pillar-desc">Tabela oficial de distribuição sem intermediários.</div>
        </div>

        <div class="pillar-card">
          <div class="pillar-tag">SEGURANÇA</div>
          <div class="pillar-title">Consignação 20%</div>
          <div class="pillar-desc">O que sobrar lacrado no evento é recolhido e estornado.</div>
        </div>
      </div>

      <!-- Callout Bar -->
      <div class="callout-bar">
        <div class="callout-url">montecristobebidas.com.br</div>
        <div class="callout-btn">Acessar no Link da Bio &rarr;</div>
      </div>
    </div>
  </body>
  </html>`;
}

// =============================================================================
// 2B. FEED B2B / BARES, PUBS E RESTAURANTES (1080 x 1350)
// =============================================================================
function getFeedB2BHtml() {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      ${COMMON_CSS}
      .feed-canvas {
        width: 1080px;
        height: 1350px;
        position: relative;
        background: radial-gradient(circle at 50% 25%, #0C2535 0%, #081B26 45%, #05121B 80%, #02080D 100%);
        padding: 70px 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .feed-header {
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(200, 168, 107, 0.25);
        padding-bottom: 26px;
      }

      .brand-logo-feed {
        width: 420px;
        height: auto;
      }

      .feed-kicker {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 2px;
        color: #E8D5B5;
        text-transform: uppercase;
        border: 1px solid rgba(200, 168, 107, 0.35);
        padding: 8px 18px;
        border-radius: 999px;
        background: rgba(10, 28, 39, 0.5);
      }

      .headline-section {
        position: relative;
        z-index: 10;
        margin-top: 25px;
        text-align: center;
      }

      .headline-tag {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 3px;
        color: #E8D5B5;
        text-transform: uppercase;
        margin-bottom: 12px;
      }

      .headline-title {
        font-family: 'Outfit', sans-serif;
        font-size: 52px;
        font-weight: 900;
        line-height: 1.12;
        letter-spacing: -1px;
        color: #FFFFFF;
      }

      .headline-title span.champagne {
        color: #E8D5B5;
      }

      .feed-stage {
        position: relative;
        z-index: 5;
        height: 480px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin: 10px 0;
      }

      .b2b-grid {
        position: relative;
        z-index: 10;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 20px;
      }

      .b2b-item {
        background: rgba(14, 70, 99, 0.22);
        border: 1px solid rgba(200, 168, 107, 0.25);
        border-radius: 14px;
        padding: 16px 20px;
        backdrop-filter: blur(12px);
      }

      .b2b-item-kicker {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #C8A86B;
        margin-bottom: 2px;
      }

      .b2b-item h4 {
        font-family: 'Outfit', sans-serif;
        font-size: 19px;
        font-weight: 800;
        color: #F8FAFC;
      }

      .b2b-item p {
        font-size: 13px;
        color: #94A3B8;
        margin-top: 3px;
      }

      .b2b-footer {
        position: relative;
        z-index: 10;
        background: #0E4663;
        border: 1px solid rgba(200, 168, 107, 0.4);
        border-radius: 16px;
        padding: 18px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .b2b-url {
        font-family: 'Outfit', sans-serif;
        font-size: 24px;
        font-weight: 900;
        color: #FFFFFF;
      }

      .b2b-btn {
        background: #FFFFFF;
        color: #0E4663;
        font-family: 'Outfit', sans-serif;
        font-size: 17px;
        font-weight: 800;
        padding: 12px 24px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    </style>
  </head>
  <body>
    <div class="feed-canvas">
      <div class="feed-header">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="brand-logo-feed" alt="Monte Cristo">
        <div class="feed-kicker">SOLUÇÕES B2B CNPJ</div>
      </div>

      <div class="headline-section">
        <div class="headline-tag">Bares &bull; Pubs &bull; Casas Noturnas &bull; Restaurantes</div>
        <h1 class="headline-title">
          FORNECIMENTO ESTÁVEL &amp; <span class="champagne">PREÇO DE ATACADO.</span>
        </h1>
      </div>

      <div class="feed-stage">
        <div class="studio-floor-shadow"></div>
        <img src="${RED_BULL}" class="stage-bottle pos-1" style="height:290px;" alt="Red Bull">
        <img src="${TANQUERAY}" class="stage-bottle pos-2" style="height:390px;" alt="Tanqueray">
        <img src="${CHIVAS_12}" class="stage-bottle pos-3" style="height:440px;" alt="Chivas">
        <img src="${JOHNNIE_WALKER}" class="stage-bottle pos-4" style="height:430px;" alt="Johnnie Walker">
        <img src="${JACK_DANIELS}" class="stage-bottle pos-5" style="height:410px;" alt="Jack Daniels">
      </div>

      <div class="b2b-grid">
        <div class="b2b-item">
          <div class="b2b-item-kicker">CONFORMIDADE</div>
          <h4>100% com Nota Fiscal</h4>
          <p>Procedência garantida com emissão fiscal imediata.</p>
        </div>

        <div class="b2b-item">
          <div class="b2b-item-kicker">LOGÍSTICA</div>
          <h4>Entregas Programadas</h4>
          <p>Atendimento semanal em toda a Serra Gaúcha.</p>
        </div>

        <div class="b2b-item">
          <div class="b2b-item-kicker">MARGEM</div>
          <h4>Tabela Direta CNPJ</h4>
          <p>Condições comerciais por volume para parceiros.</p>
        </div>

        <div class="b2b-item">
          <div class="b2b-item-kicker">AGILIDADE</div>
          <h4>Reposição pelo Site</h4>
          <p>Monte o pedido na palma da mão 24 horas por dia.</p>
        </div>
      </div>

      <div class="b2b-footer">
        <div class="b2b-url">WhatsApp B2B: (54) 99969-2859</div>
        <div class="b2b-btn">Pedir Tabela Comercial &rarr;</div>
      </div>
    </div>
  </body>
  </html>`;
}

// =============================================================================
// 3. CAPA DO CARROSSEL EVENTOS (1080 x 1350)
// Foco em Casamentos, Formaturas e Consignação de 20%
// =============================================================================
function getCarrosselCapaHtml() {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      ${COMMON_CSS}
      .carrossel-canvas {
        width: 1080px;
        height: 1350px;
        position: relative;
        background: radial-gradient(circle at 50% 25%, #102B3B 0%, #0A1E2B 45%, #06131D 80%, #03080E 100%);
        padding: 70px 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .amber-glow {
        position: absolute;
        top: 240px;
        left: 50%;
        transform: translateX(-50%);
        width: 900px;
        height: 520px;
        background: radial-gradient(ellipse at center, rgba(200, 168, 107, 0.16) 0%, rgba(14, 70, 99, 0.25) 45%, transparent 75%);
        filter: blur(80px);
        pointer-events: none;
      }

      .top-row {
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(200, 168, 107, 0.25);
        padding-bottom: 26px;
      }

      .top-logo {
        width: 420px;
        height: auto;
      }

      .tag-eventos {
        background: rgba(10, 28, 39, 0.5);
        border: 1px solid rgba(200, 168, 107, 0.4);
        color: #E8D5B5;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
        font-weight: 700;
        padding: 8px 18px;
        border-radius: 999px;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      .hook-section {
        position: relative;
        z-index: 10;
        margin-top: 25px;
        text-align: center;
      }

      .hook-tag {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 3px;
        color: #E8D5B5;
        text-transform: uppercase;
        margin-bottom: 14px;
      }

      .hook-title {
        font-family: 'Outfit', sans-serif;
        font-size: 54px;
        font-weight: 900;
        line-height: 1.12;
        letter-spacing: -1.2px;
        color: #FFFFFF;
      }

      .hook-title span.champagne {
        color: #E8D5B5;
      }

      .carrossel-stage {
        position: relative;
        z-index: 5;
        height: 480px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin: 10px 0;
      }

      .seal-box {
        position: relative;
        z-index: 10;
        background: #0E4663;
        border: 1px solid rgba(200, 168, 107, 0.45);
        border-radius: 16px;
        padding: 20px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 16px 35px rgba(0,0,0,0.5);
      }

      .seal-left h3 {
        font-family: 'Outfit', sans-serif;
        font-size: 24px;
        font-weight: 900;
        color: #E8D5B5;
      }

      .seal-left p {
        font-size: 15px;
        color: #CBD5E1;
        margin-top: 3px;
      }

      .swipe-btn {
        background: #FFFFFF;
        color: #0E4663;
        font-family: 'Outfit', sans-serif;
        font-size: 17px;
        font-weight: 800;
        padding: 12px 24px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <div class="carrossel-canvas">
      <div class="amber-glow"></div>

      <div class="top-row">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="top-logo" alt="Monte Cristo">
        <div class="tag-eventos">GUIA DE EVENTOS &amp; FESTAS</div>
      </div>

      <div class="hook-section">
        <div class="hook-tag">Casamentos &bull; Formaturas &bull; Aniversários na Serra Gaúcha</div>
        <h1 class="hook-title">
          Calculou as bebidas e bateu o medo de <span class="champagne">faltar ou sobrar?</span>
        </h1>
      </div>

      <div class="carrossel-stage">
        <div class="studio-floor-shadow"></div>
        <img src="${ABSOLUT}" class="stage-bottle pos-1" style="height:370px;" alt="Vodka Absolut">
        <img src="${TANQUERAY}" class="stage-bottle pos-2" style="height:390px;" alt="Tanqueray Gin">
        <img src="${CHIVAS_12}" class="stage-bottle pos-3" style="height:440px;" alt="Chivas Regal 12">
        <img src="${APEROL}" class="stage-bottle pos-4" style="height:400px;" alt="Aperol Spritz">
        <img src="${JACK_HONEY}" class="stage-bottle pos-5" style="height:380px;" alt="Jack Honey">
      </div>

      <div class="seal-box">
        <div class="seal-left">
          <h3>Modalidade Consignação de até 20%</h3>
          <p>O que voltar lacrado após a festa é recolhido e reembolsado na sua conta.</p>
        </div>
        <div class="swipe-btn">Deslize para ver &rarr;</div>
      </div>
    </div>
  </body>
  </html>`;
}

// =============================================================================
// 4. CAPA WHATSAPP BUSINESS (1920 x 1080)
// Banner Panorâmico Elegante
// =============================================================================
function getWhatsappCapaHtml() {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      ${COMMON_CSS}
      .wa-canvas {
        width: 1920px;
        height: 1080px;
        position: relative;
        background: radial-gradient(circle at 65% 50%, #0F2D3D 0%, #091F2B 40%, #06131D 75%, #03080E 100%);
        padding: 100px 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .wa-glow-center {
        position: absolute;
        top: 50%;
        left: 65%;
        transform: translate(-50%, -50%);
        width: 900px;
        height: 700px;
        background: radial-gradient(circle, rgba(200, 168, 107, 0.12) 0%, rgba(14, 70, 99, 0.25) 50%, transparent 75%);
        filter: blur(90px);
        pointer-events: none;
      }

      .wa-left-col {
        position: relative;
        z-index: 10;
        width: 880px;
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      .wa-brand-logo {
        width: 480px;
        height: auto;
      }

      .wa-tagline {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #E8D5B5;
      }

      .wa-title {
        font-family: 'Outfit', sans-serif;
        font-size: 58px;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -1.5px;
        color: #FFFFFF;
      }

      .wa-title span.champagne {
        color: #E8D5B5;
      }

      .wa-bullets {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        max-width: 800px;
      }

      .wa-bullet {
        background: rgba(14, 70, 99, 0.25);
        border: 1px solid rgba(200, 168, 107, 0.25);
        padding: 12px 18px;
        border-radius: 12px;
        font-size: 17px;
        font-weight: 600;
        color: #F1F5F9;
        display: flex;
        align-items: center;
        gap: 10px;
        backdrop-filter: blur(10px);
      }

      .wa-bullet-dot {
        width: 6px;
        height: 6px;
        background: #C8A86B;
        border-radius: 50%;
      }

      .wa-site-box {
        background: #0E4663;
        border: 1px solid rgba(200, 168, 107, 0.45);
        padding: 18px 28px;
        border-radius: 14px;
        display: inline-flex;
        align-items: center;
        gap: 20px;
        width: fit-content;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      }

      .wa-site-label {
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        color: #E8D5B5;
        letter-spacing: 1.5px;
      }

      .wa-site-domain {
        font-family: 'Outfit', sans-serif;
        font-size: 28px;
        font-weight: 900;
        color: #FFFFFF;
      }

      .wa-right-col {
        position: relative;
        z-index: 5;
        width: 760px;
        height: 750px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div class="wa-canvas">
      <div class="wa-glow-center"></div>

      <!-- Coluna Esquerda -->
      <div class="wa-left-col">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="wa-brand-logo" alt="Monte Cristo Bebidas">
        <div class="wa-tagline">Mais de 20 anos de tradição na Serra Gaúcha</div>
        
        <h1 class="wa-title">
          DISTRIBUIDORA DE BEBIDAS<br>
          AGORA COM <span class="champagne">NOVO SITE OFICIAL.</span>
        </h1>

        <div class="wa-bullets">
          <div class="wa-bullet"><span class="wa-bullet-dot"></span>+1.000 Rótulos Originais</div>
          <div class="wa-bullet"><span class="wa-bullet-dot"></span>Preço Direto de Atacado</div>
          <div class="wa-bullet"><span class="wa-bullet-dot"></span>Fornecimento B2B com NF</div>
          <div class="wa-bullet"><span class="wa-bullet-dot"></span>Consignação 20% p/ Festas</div>
        </div>

        <div class="wa-site-box">
          <span class="wa-site-label">Acesse o catálogo:</span>
          <span class="wa-site-domain">montecristobebidas.com.br</span>
        </div>
      </div>

      <!-- Coluna Direita (Vitrine Real) -->
      <div class="wa-right-col">
        <div class="studio-floor-shadow" style="width: 720px; bottom: 40px;"></div>
        <img src="${RED_BULL}" class="stage-bottle pos-1" style="height:360px;" alt="Red Bull">
        <img src="${TANQUERAY}" class="stage-bottle pos-2" style="height:490px;" alt="Tanqueray">
        <img src="${JACK_DANIELS}" class="stage-bottle pos-3" style="height:560px;" alt="Jack Daniels">
        <img src="${JACK_HONEY}" class="stage-bottle pos-4" style="height:480px;" alt="Jack Honey">
        <img src="${CHIVAS_12}" class="stage-bottle pos-5" style="height:500px;" alt="Chivas">
      </div>
    </div>
  </body>
  </html>`;
}

// =============================================================================
// 5. DESTAQUE INSTAGRAM (1080 x 1080)
// =============================================================================
function getDestaqueInstagramHtml() {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      ${COMMON_CSS}
      .destaque-canvas {
        width: 1080px;
        height: 1080px;
        position: relative;
        background: #06131D;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .outer-ring {
        width: 860px;
        height: 860px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #0E2E3E 0%, #0A1E2B 55%, #06131D 100%);
        border: 4px solid rgba(200, 168, 107, 0.5);
        box-shadow: 0 0 60px rgba(0, 0, 0, 0.7), inset 0 0 60px rgba(0,0,0,0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .inner-glow {
        position: absolute;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(200, 168, 107, 0.15) 0%, transparent 70%);
        filter: blur(40px);
        pointer-events: none;
      }

      .monogram-logo {
        width: 360px;
        height: auto;
        position: relative;
        z-index: 10;
        filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
      }

      .destaque-label {
        margin-top: 40px;
        font-family: 'Outfit', sans-serif;
        font-size: 36px;
        font-weight: 900;
        letter-spacing: 5px;
        color: #FFFFFF;
        text-transform: uppercase;
        position: relative;
        z-index: 10;
      }

      .destaque-label span {
        color: #E8D5B5;
      }
    </style>
  </head>
  <body>
    <div class="destaque-canvas">
      <div class="outer-ring">
        <div class="inner-glow"></div>
        <img src="${SIMBOLO_SVG}" class="monogram-logo" alt="Símbolo Monte Cristo">
        <div class="destaque-label">
          NOVO <span>SITE</span>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

// =============================================================================
// 6. CARROSSEL SLIDES 2 A 7 (1080 x 1350 CADA)
// =============================================================================
function getCarrosselSlideHtml(slideNum) {
  const slidesContent = {
    2: {
      step: 'Slide 2 de 7 &bull; O Dilema do Evento',
      title: 'O grande pesadelo de qualquer anfitrião na Serra Gaúcha:',
      bullets: [
        { kicker: 'SE FALTAR BEBIDA', title: 'A festa esfria antes da hora', desc: 'Convidados saem mais cedo e o momento mais esperado do ano perde o ritmo.' },
        { kicker: 'SE SOBRAR EM EXCESSO', title: 'Dinheiro parado sem necessidade', desc: 'Milhares de reais ficam parados em caixas de garrafas acumulando poeira no armário.' }
      ],
      footer: 'Existe uma solução inteligente e garantida &rarr;'
    },
    3: {
      step: 'Slide 3 de 7 &bull; A Solução Oficial',
      title: 'Você não precisa passar por essa incerteza.',
      highlightBox: {
        badge: 'MODALIDADE EXCLUSIVA',
        title: 'CONSIGNAÇÃO DE ATÉ 20% DO LOTE',
        desc: 'A Monte Cristo entrega o pedido completo para o seu casamento ou evento com margem de segurança. O que voltar lacrado, nós recolhemos e estornamos 100% do valor direto na sua conta bancária.'
      },
      footer: 'Veja como funciona em 3 passos &rarr;'
    },
    4: {
      step: 'Slide 4 de 7 &bull; Passo a Passo',
      title: 'Como funciona a consignação em 3 passos:',
      steps: [
        { num: '01', title: 'Montamos o lote ideal', desc: 'Calculamos as quantidades exatas pelo perfil de convidados, tipo de festa e duração.' },
        { num: '02', title: 'Entregamos a margem de 20%', desc: 'Até 20% do volume segue consignado como reserva de tranquilidade para nunca faltar na pista.' },
        { num: '03', title: 'Recolhimento e estorno', desc: 'O que sobrar lacrado pós-evento é recolhido pela nossa equipe e estornado sem burocracia.' }
      ],
      footer: 'Rótulos nobres com garantia de procedência &rarr;'
    },
    5: {
      step: 'Slide 5 de 7 &bull; Variedade de Alto Padrão',
      title: 'Mais de 1.000 rótulos originais com Nota Fiscal:',
      gridItems: [
        { kicker: 'DESTILADOS NOBRES', title: 'Whiskies, Gins e Vodkas', desc: 'Jack Daniel’s, Chivas 12, Tanqueray, Absolut, Grey Goose e Cîroc.' },
        { kicker: 'LICORES & APERITIVOS', title: 'Licores Importados', desc: 'Licor 43, Aperol Spritz, Amarula, Jagermeister e Cointreau.' },
        { kicker: 'CERVEJAS & ENERGÉTICOS', title: 'Chopes, Latas e Garrafas', desc: 'Red Bull oficial, Norteña, Patricia, Zillertal e artesanais.' },
        { kicker: 'MIXOLOGIA & DRINKS', title: 'Xaropes e Tônicas', desc: 'Monin e Fórmula completa para bares e coquetelaria profissional.' }
      ],
      footer: 'Simule o lote do seu evento online &rarr;'
    },
    6: {
      step: 'Slide 6 de 7 &bull; Praticidade Digital',
      title: 'Monte sua lista no site em menos de 2 minutos:',
      sitePreview: {
        domain: 'montecristobebidas.com.br',
        bullets: [
          'Preços transparentes atualizados em tempo real',
          'Filtro ágil por categorias, marcas e tipos de evento',
          'Cálculo instantâneo de volume e carrinho inteligente',
          'Envio direto do pedido pronto para o WhatsApp do atendimento'
        ]
      },
      footer: 'Pronto para garantir a melhor festa? &rarr;'
    },
    7: {
      step: 'Slide 7 de 7 &bull; Atendimento Personalizado',
      title: 'Garanta a tranquilidade do seu evento hoje mesmo.',
      ctaBox: {
        headline: 'Fale com um Especialista Monte Cristo',
        sub: 'Envie a data e o número de convidados pelo site ou fale direto no WhatsApp.',
        btn: 'Acessar montecristobebidas.com.br &rarr;'
      },
      footer: 'Monte Cristo Bebidas &bull; Serra Gaúcha &bull; Mais de 20 anos de tradição'
    }
  };

  const data = slidesContent[slideNum];

  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      ${COMMON_CSS}
      .slide-canvas {
        width: 1080px;
        height: 1350px;
        position: relative;
        background: radial-gradient(circle at 50% 25%, #0F2D3D 0%, #091F2B 45%, #06131D 80%, #03080E 100%);
        padding: 70px 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .slide-top {
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(200, 168, 107, 0.25);
        padding-bottom: 24px;
      }

      .slide-logo {
        width: 380px;
        height: auto;
      }

      .slide-step {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 2px;
        color: #E8D5B5;
        text-transform: uppercase;
        border: 1px solid rgba(200, 168, 107, 0.35);
        padding: 6px 16px;
        border-radius: 999px;
        background: rgba(10, 28, 39, 0.5);
      }

      .slide-content {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 28px;
        margin: auto 0;
      }

      .slide-title {
        font-family: 'Outfit', sans-serif;
        font-size: 48px;
        font-weight: 900;
        line-height: 1.15;
        letter-spacing: -1px;
        color: #FFFFFF;
      }

      .slide-bottom {
        position: relative;
        z-index: 10;
        border-top: 1px solid rgba(200, 168, 107, 0.25);
        padding-top: 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        color: #E8D5B5;
        font-weight: 600;
      }

      .dilemma-card {
        background: rgba(14, 70, 99, 0.22);
        border: 1px solid rgba(200, 168, 107, 0.25);
        border-radius: 16px;
        padding: 24px 28px;
        backdrop-filter: blur(12px);
      }

      .dilemma-kicker {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #C8A86B;
        margin-bottom: 6px;
      }

      .dilemma-title {
        font-family: 'Outfit', sans-serif;
        font-size: 24px;
        font-weight: 800;
        color: #FFFFFF;
      }

      .dilemma-desc {
        font-size: 16px;
        color: #CBD5E1;
        margin-top: 6px;
        line-height: 1.45;
      }

      .step-item {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        background: rgba(14, 70, 99, 0.22);
        border: 1px solid rgba(200, 168, 107, 0.25);
        border-radius: 16px;
        padding: 20px 24px;
        backdrop-filter: blur(12px);
      }

      .step-num {
        font-family: 'Outfit', sans-serif;
        font-size: 28px;
        font-weight: 900;
        color: #E8D5B5;
        line-height: 1;
        border-right: 1px solid rgba(200, 168, 107, 0.3);
        padding-right: 18px;
      }
    </style>
  </head>
  <body>
    <div class="slide-canvas">
      <div class="slide-top">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="slide-logo" alt="Monte Cristo">
        <div class="slide-step">${data.step}</div>
      </div>

      <div class="slide-content">
        <h2 class="slide-title">${data.title}</h2>

        ${data.bullets ? data.bullets.map(b => `
          <div class="dilemma-card">
            <div class="dilemma-kicker">${b.kicker}</div>
            <div class="dilemma-title">${b.title}</div>
            <div class="dilemma-desc">${b.desc}</div>
          </div>
        `).join('') : ''}

        ${data.highlightBox ? `
          <div style="background:#0E4663; border:1px solid rgba(200, 168, 107, 0.45); border-radius:18px; padding:32px; box-shadow:0 16px 35px rgba(0,0,0,0.4);">
            <div style="font-size:13px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#E8D5B5; margin-bottom:8px;">${data.highlightBox.badge}</div>
            <div style="font-family:'Outfit'; font-size:30px; font-weight:900; color:#FFFFFF; margin-bottom:12px;">${data.highlightBox.title}</div>
            <div style="font-size:18px; color:#CBD5E1; line-height:1.5;">${data.highlightBox.desc}</div>
          </div>
        ` : ''}

        ${data.steps ? data.steps.map(s => `
          <div class="step-item">
            <div class="step-num">${s.num}</div>
            <div>
              <div style="font-family:'Outfit'; font-size:21px; font-weight:800; color:#FFFFFF;">${s.title}</div>
              <div style="font-size:15px; color:#CBD5E1; margin-top:4px;">${s.desc}</div>
            </div>
          </div>
        `).join('') : ''}

        ${data.gridItems ? `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            ${data.gridItems.map(g => `
              <div style="background:rgba(14,70,99,0.22); border:1px solid rgba(200,168,107,0.25); padding:20px; border-radius:14px; backdrop-filter:blur(10px);">
                <div style="font-size:11px; font-weight:700; letter-spacing:2px; color:#C8A86B; text-transform:uppercase; margin-bottom:4px;">${g.kicker}</div>
                <div style="font-family:'Outfit'; font-size:20px; font-weight:800; color:#FFFFFF;">${g.title}</div>
                <div style="font-size:14px; color:#94A3B8; margin-top:6px; line-height:1.4;">${g.desc}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.sitePreview ? `
          <div style="background:#0E4663; border:1px solid rgba(200,168,107,0.45); border-radius:18px; padding:32px;">
            <div style="font-family:'Outfit'; font-size:28px; font-weight:900; color:#E8D5B5; margin-bottom:20px;">${data.sitePreview.domain}</div>
            ${data.sitePreview.bullets.map(b => `
              <div style="font-size:17px; color:#F1F5F9; margin-bottom:12px; display:flex; align-items:center; gap:10px;">
                <span style="display:inline-block; width:6px; height:6px; background:#C8A86B; border-radius:50%;"></span>
                ${b}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.ctaBox ? `
          <div style="background:#0E4663; border:1px solid rgba(200,168,107,0.45); border-radius:18px; padding:36px; text-align:center;">
            <h3 style="font-family:'Outfit'; font-size:32px; font-weight:900; color:#FFFFFF;">${data.ctaBox.headline}</h3>
            <p style="font-size:18px; color:#CBD5E1; margin:12px 0 24px 0;">${data.ctaBox.sub}</p>
            <div style="background:#FFFFFF; color:#0E4663; font-family:'Outfit'; font-size:20px; font-weight:800; padding:16px 30px; border-radius:12px; display:inline-block;">
              ${data.ctaBox.btn}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="slide-bottom">
        <span>Monte Cristo Bebidas &bull; Serra Gaúcha</span>
        <span>${data.footer}</span>
      </div>
    </div>
  </body>
  </html>`;
}

// =============================================================================
// FUNÇÃO EXECUTORA PLAYWRIGHT
// =============================================================================

async function run() {
  console.log('🚀 Iniciando renderização no Padrão Híbrido Monte Cristo...');

  const outputDir = path.resolve(__dirname, '../assets/divulgacao');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();

  // 1. Story Lançamento (1080 x 1920)
  console.log('📸 Renderizando: story-lancamento.jpg (1080x1920)...');
  await page.setViewportSize({ width: 1080, height: 1920 });
  await page.setContent(getStoryHtml(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outputDir, 'story-lancamento.jpg'),
    type: 'jpeg',
    quality: 95
  });

  // 2. Feed Post de Lançamento (1080 x 1350)
  console.log('📸 Renderizando: feed-lancamento.jpg (1080x1350)...');
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.setContent(getFeedHtml(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outputDir, 'feed-lancamento.jpg'),
    type: 'jpeg',
    quality: 95
  });

  // 2B. Feed B2B / Bares e Pubs (1080 x 1350)
  console.log('📸 Renderizando: feed-b2b-bares.jpg (1080x1350)...');
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.setContent(getFeedB2BHtml(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outputDir, 'feed-b2b-bares.jpg'),
    type: 'jpeg',
    quality: 95
  });

  // 3. Carrossel Eventos Capa (1080 x 1350)
  console.log('📸 Renderizando: carrossel-eventos-capa.jpg (1080x1350)...');
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.setContent(getCarrosselCapaHtml(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outputDir, 'carrossel-eventos-capa.jpg'),
    type: 'jpeg',
    quality: 95
  });

  // 4. Capa WhatsApp Business (1920 x 1080)
  console.log('📸 Renderizando: whatsapp-business-capa.jpg (1920x1080)...');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.setContent(getWhatsappCapaHtml(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outputDir, 'whatsapp-business-capa.jpg'),
    type: 'jpeg',
    quality: 95
  });

  // 5. Destaque Instagram (1080 x 1080)
  console.log('📸 Renderizando: instagram-destaque-novosite.png (1080x1080)...');
  await page.setViewportSize({ width: 1080, height: 1080 });
  await page.setContent(getDestaqueInstagramHtml(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outputDir, 'instagram-destaque-novosite.png'),
    type: 'png'
  });

  // SVG do destaque
  const destaqueSvgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <radialGradient id="bgGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#0E2E3E"/>
      <stop offset="55%" stop-color="#0A1E2B"/>
      <stop offset="100%" stop-color="#06131D"/>
    </radialGradient>
  </defs>
  <rect width="1080" height="1080" fill="#06131D"/>
  <circle cx="540" cy="540" r="420" fill="url(#bgGrad)" stroke="#C8A86B" stroke-width="4" stroke-opacity="0.6"/>
  <g transform="translate(360, 260) scale(0.32)">
    <path fill="#FFFFFF" d="M205.61 130.2l101 96.83c179.27,-119.32 356.17,-118.65 518.35,4.38l99.14 -98.05c-239.3,-182.94 -478.8,-171.57 -718.48,-3.17z"/>
    <path fill="#FFFFFF" d="M216.47 815.19c176.65,231.34 520.68,246.35 694.59,-2.34l99.54 98.46c-223.21,299.36 -693.21,278.57 -893.59,2.26l99.46 -98.37zm350.69 -211.95l420.4 -410.78c177.63,191.19 167.79,462.19 72.95,646.35l-104.06 -102.91c37.75,-112.58 42.81,-218.59 8.5,-316.68l-399.44 382.1 -399 -383.76c-39.85,98.81 -40.75,205.17 8.89,321.32l-103.65 102.51c-112.64,-230.01 -95.52,-447.14 71.9,-649.35l423.52 411.21zm-495.43 238.15l103.65 -102.51c13.67,31.48 27.03,57.54 41.08,76.31l-99.46 98.37c-16.43,-19.38 -30.63,-41.01 -45.27,-72.17z"/>
  </g>
  <text x="540" y="730" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="900" font-size="50" fill="#FFFFFF" letter-spacing="6">NOVO <tspan fill="#E8D5B5">SITE</tspan></text>
</svg>`;
  fs.writeFileSync(path.join(outputDir, 'instagram-destaque-novosite.svg'), destaqueSvgContent);

  // 6. Carrossel Completo Slides 2 a 7
  for (let s = 2; s <= 7; s++) {
    console.log(`📸 Renderizando: carrossel-slide-${s}.jpg (1080x1350)...`);
    await page.setViewportSize({ width: 1080, height: 1350 });
    await page.setContent(getCarrosselSlideHtml(s), { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(outputDir, `carrossel-slide-${s}.jpg`),
      type: 'jpeg',
      quality: 95
    });
  }

  await browser.close();
  console.log('✅ Todas as peças foram renderizadas com sucesso no Padrão Híbrido Monte Cristo!');
}

run().catch(err => {
  console.error('❌ Erro na geração:', err);
  process.exit(1);
});
