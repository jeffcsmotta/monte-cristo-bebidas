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

// Produtos reais oficiais
const JACK_DANIELS = toBase64Uri('assets/produtos/whisky-jack-daniels-old-no-7-1l.webp', 'image/webp');
const RED_BULL = toBase64Uri('assets/produtos/energetico-red-bull-tradicional-250ml.webp', 'image/webp');
const TANQUERAY = toBase64Uri('assets/produtos/gin-tanqueray-london-dry-750ml.webp', 'image/webp');
const LICOR_43 = toBase64Uri('assets/produtos/licor-43-original-700ml.webp', 'image/webp');
const CHIVAS_12 = toBase64Uri('assets/produtos/whisky-chivas-regal-12-anos-1l.webp', 'image/webp');
const ABSOLUT = toBase64Uri('assets/produtos/vodka-absolut-1l.webp', 'image/webp');
const APEROL = toBase64Uri('assets/produtos/aperitivo-aperol-spritz-750ml.webp', 'image/webp');

// CSS Comum de luxo e tipografia oficial
const COMMON_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    color: #FFFFFF;
    background: #07131B;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .font-outfit {
    font-family: 'Outfit', sans-serif;
  }

  /* Shimmer e Reflexos */
  .bottle-wrapper {
    position: relative;
    display: inline-block;
    filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.75));
  }

  .bottle-reflection {
    position: absolute;
    bottom: -60px;
    left: 0;
    width: 100%;
    height: 70px;
    transform: scaleY(-1);
    opacity: 0.18;
    filter: blur(2px);
    mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
    pointer-events: none;
  }
`;

// =============================================================================
// TEMPLATES HTML DAS PEÇAS
// =============================================================================

// 1. STORY DE LANÇAMENTO (1080 x 1920)
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
        background: radial-gradient(circle at 50% 25%, #1B5E76 0%, #0D354A 35%, #071520 70%, #040C12 100%);
        padding: 90px 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      /* Glows de ambientação */
      .glow-top {
        position: absolute;
        top: -150px;
        left: 50%;
        transform: translateX(-50%);
        width: 800px;
        height: 600px;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(27, 117, 136, 0.15) 50%, transparent 75%);
        filter: blur(60px);
        pointer-events: none;
      }

      .glow-center {
        position: absolute;
        top: 48%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 900px;
        height: 700px;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(14, 70, 99, 0.3) 50%, transparent 80%);
        filter: blur(80px);
        pointer-events: none;
      }

      /* Topo */
      .header-area {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .badge-tag {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: rgba(16, 185, 129, 0.16);
        border: 1px solid rgba(16, 185, 129, 0.5);
        color: #34D399;
        padding: 10px 24px;
        border-radius: 999px;
        font-family: 'Outfit', sans-serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 28px;
        box-shadow: 0 0 25px rgba(16, 185, 129, 0.25);
      }

      .badge-dot {
        width: 10px;
        height: 10px;
        background: #10B981;
        border-radius: 50%;
        box-shadow: 0 0 10px #10B981;
      }

      .brand-logo-main {
        width: 580px;
        height: auto;
        filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.6));
      }

      /* Título e Subtítulo */
      .hero-copy {
        margin-top: 45px;
        text-align: center;
      }

      .hero-title {
        font-family: 'Outfit', sans-serif;
        font-size: 68px;
        font-weight: 900;
        line-height: 1.08;
        letter-spacing: -1.5px;
        color: #FFFFFF;
        text-shadow: 0 4px 20px rgba(0,0,0,0.8);
      }

      .hero-title span.highlight {
        background: linear-gradient(135deg, #34D399 0%, #10B981 50%, #38BDF8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .hero-subtitle {
        margin-top: 18px;
        font-size: 27px;
        font-weight: 500;
        color: #CBD5E1;
        line-height: 1.4;
      }

      /* Vitrine de Garrafas */
      .bottles-stage {
        position: relative;
        z-index: 5;
        height: 680px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin: 20px 0;
      }

      .stage-platform {
        position: absolute;
        bottom: 40px;
        width: 900px;
        height: 60px;
        background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, rgba(14, 70, 99, 0.4) 45%, transparent 75%);
        border-radius: 50%;
        filter: blur(8px);
      }

      .bottle-item {
        position: absolute;
        bottom: 60px;
        filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.85));
      }

      .bottle-jack {
        height: 540px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 8;
      }

      .bottle-tanqueray {
        height: 480px;
        left: 200px;
        z-index: 7;
      }

      .bottle-redbull {
        height: 380px;
        left: 60px;
        z-index: 6;
      }

      .bottle-licor43 {
        height: 470px;
        right: 210px;
        z-index: 7;
      }

      .bottle-chivas {
        height: 490px;
        right: 70px;
        z-index: 6;
      }

      /* Card de Benefícios e CTA */
      .bottom-area {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 22px;
      }

      .pills-row {
        display: flex;
        justify-content: center;
        gap: 14px;
      }

      .pill-feature {
        background: rgba(13, 30, 42, 0.7);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 12px 22px;
        border-radius: 14px;
        font-size: 20px;
        font-weight: 600;
        color: #F1F5F9;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .sticker-cta {
        background: #FFFFFF;
        color: #0E4663;
        padding: 24px 32px;
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55), 0 0 35px rgba(52, 211, 153, 0.3);
      }

      .sticker-left {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .sticker-sub {
        font-size: 19px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: #10B981;
      }

      .sticker-main {
        font-family: 'Outfit', sans-serif;
        font-size: 34px;
        font-weight: 900;
        color: #071520;
      }

      .sticker-btn {
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        color: #FFFFFF;
        font-family: 'Outfit', sans-serif;
        font-size: 24px;
        font-weight: 800;
        padding: 16px 32px;
        border-radius: 16px;
        letter-spacing: 0.5px;
      }

      .footer-sub {
        text-align: center;
        font-size: 19px;
        color: #94A3B8;
        font-weight: 500;
        letter-spacing: 1px;
      }
    </style>
  </head>
  <body>
    <div class="story-canvas">
      <div class="glow-top"></div>
      <div class="glow-center"></div>

      <!-- Header -->
      <div class="header-area">
        <div class="badge-tag">
          <span class="badge-dot"></span>
          NOVO SITE NO AR
        </div>
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="brand-logo-main" alt="Monte Cristo Distribuidora de Bebidas">
        
        <div class="hero-copy">
          <h1 class="hero-title">
            COMPRAR SUAS BEBIDAS<br>
            AGORA É <span class="highlight">MUITO MAIS ÁGIL.</span>
          </h1>
          <p class="hero-subtitle">
            Mais de 1.000 rótulos originais com preço de distribuidora e pedido direto no WhatsApp em 1 clique.
          </p>
        </div>
      </div>

      <!-- Vitrine de Produtos Reais -->
      <div class="bottles-stage">
        <div class="stage-platform"></div>
        <img src="${RED_BULL}" class="bottle-item bottle-redbull" alt="Red Bull">
        <img src="${TANQUERAY}" class="bottle-item bottle-tanqueray" alt="Tanqueray Gin">
        <img src="${JACK_DANIELS}" class="bottle-item bottle-jack" alt="Jack Daniels">
        <img src="${LICOR_43}" class="bottle-item bottle-licor43" alt="Licor 43">
        <img src="${CHIVAS_12}" class="bottle-item bottle-chivas" alt="Chivas Regal">
      </div>

      <!-- Rodapé / Interatividade -->
      <div class="bottom-area">
        <div class="pills-row">
          <div class="pill-feature">🥃 +1.000 Rótulos</div>
          <div class="pill-feature">⚡ Preço de Atacado</div>
          <div class="pill-feature">💍 Até 20% Consignação</div>
        </div>

        <div class="sticker-cta">
          <div class="sticker-left">
            <span class="sticker-sub">🌐 TOQUE NO LINK DO STORY</span>
            <span class="sticker-main">montecristobebidas.com.br</span>
          </div>
          <div class="sticker-btn">ACESSAR O SITE 👉</div>
        </div>

        <p class="footer-sub">
          Serra Gaúcha • Caxias do Sul • Mais de 20 anos de tradição
        </p>
      </div>
    </div>
  </body>
  </html>`;
}

// 2. FEED POST DE LANÇAMENTO (1080 x 1350)
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
        background: radial-gradient(circle at 50% 30%, #154D65 0%, #0D3043 40%, #071520 75%, #030A10 100%);
        padding: 70px 65px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .glow-light {
        position: absolute;
        top: 250px;
        left: 50%;
        transform: translateX(-50%);
        width: 850px;
        height: 500px;
        background: radial-gradient(ellipse at center, rgba(16, 185, 129, 0.18) 0%, rgba(27, 117, 136, 0.2) 40%, transparent 75%);
        filter: blur(70px);
        pointer-events: none;
      }

      /* Topo */
      .feed-header {
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 30px;
      }

      .brand-logo-feed {
        width: 440px;
        height: auto;
        filter: drop-shadow(0 6px 16px rgba(0,0,0,0.6));
      }

      .feed-badge {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.4);
        color: #34D399;
        font-family: 'Outfit', sans-serif;
        font-size: 17px;
        font-weight: 800;
        padding: 9px 20px;
        border-radius: 999px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      /* Headline */
      .headline-section {
        position: relative;
        z-index: 10;
        margin-top: 35px;
        text-align: center;
      }

      .headline-title {
        font-family: 'Outfit', sans-serif;
        font-size: 56px;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -1px;
        color: #FFFFFF;
      }

      .headline-title span {
        background: linear-gradient(135deg, #34D399 0%, #10B981 60%, #38BDF8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .headline-sub {
        font-size: 23px;
        color: #CBD5E1;
        margin-top: 14px;
        line-height: 1.45;
        max-width: 860px;
        margin-left: auto;
        margin-right: auto;
      }

      /* Stage de Produtos */
      .feed-stage {
        position: relative;
        z-index: 5;
        height: 480px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin: 15px 0;
      }

      .feed-platform {
        position: absolute;
        bottom: 20px;
        width: 800px;
        height: 45px;
        background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.28) 0%, rgba(14, 70, 99, 0.4) 50%, transparent 75%);
        border-radius: 50%;
        filter: blur(6px);
      }

      .feed-bottle {
        position: absolute;
        bottom: 30px;
        filter: drop-shadow(0 20px 25px rgba(0, 0, 0, 0.8));
      }

      .fb-jack { height: 420px; left: 50%; transform: translateX(-50%); z-index: 8; }
      .fb-tanqueray { height: 380px; left: 240px; z-index: 7; }
      .fb-redbull { height: 300px; left: 120px; z-index: 6; }
      .fb-licor43 { height: 370px; right: 240px; z-index: 7; }
      .fb-chivas { height: 390px; right: 120px; z-index: 6; }

      /* Pilares / Rodapé */
      .pillars-grid {
        position: relative;
        z-index: 10;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
        margin-bottom: 22px;
      }

      .pillar-card {
        background: rgba(13, 30, 42, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        padding: 16px 18px;
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .pillar-icon {
        width: 44px;
        height: 44px;
        background: rgba(16, 185, 129, 0.2);
        border: 1px solid rgba(16, 185, 129, 0.4);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        flex-shrink: 0;
      }

      .pillar-content h4 {
        font-family: 'Outfit', sans-serif;
        font-size: 19px;
        font-weight: 800;
        color: #F8FAFC;
      }

      .pillar-content p {
        font-size: 14px;
        color: #94A3B8;
        margin-top: 2px;
      }

      /* Callout Bar */
      .callout-bar {
        position: relative;
        z-index: 10;
        background: linear-gradient(90deg, #0E4663 0%, #155E75 50%, #10B981 100%);
        border-radius: 20px;
        padding: 20px 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
      }

      .callout-url {
        font-family: 'Outfit', sans-serif;
        font-size: 28px;
        font-weight: 900;
        letter-spacing: 0.5px;
        color: #FFFFFF;
      }

      .callout-btn {
        background: #FFFFFF;
        color: #0E4663;
        font-family: 'Outfit', sans-serif;
        font-size: 19px;
        font-weight: 800;
        padding: 12px 24px;
        border-radius: 12px;
      }
    </style>
  </head>
  <body>
    <div class="feed-canvas">
      <div class="glow-light"></div>

      <!-- Topo com Logo Oficial -->
      <div class="feed-header">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="brand-logo-feed" alt="Monte Cristo Distribuidora">
        <div class="feed-badge">LANÇAMENTO OFICIAL</div>
      </div>

      <!-- Headline -->
      <div class="headline-section">
        <h1 class="headline-title">
          O NOVO SITE OFICIAL DA MONTE CRISTO <span>ESTÁ NO AR.</span>
        </h1>
        <p class="headline-sub">
          Mais de 20 anos de tradição na Serra Gaúcha, agora com toda a agilidade digital para o seu bar, evento ou consumo próprio.
        </p>
      </div>

      <!-- Vitrine Real -->
      <div class="feed-stage">
        <div class="feed-platform"></div>
        <img src="${RED_BULL}" class="feed-bottle fb-redbull" alt="Red Bull">
        <img src="${TANQUERAY}" class="feed-bottle fb-tanqueray" alt="Tanqueray">
        <img src="${JACK_DANIELS}" class="feed-bottle fb-jack" alt="Jack Daniels">
        <img src="${LICOR_43}" class="feed-bottle fb-licor43" alt="Licor 43">
        <img src="${CHIVAS_12}" class="feed-bottle fb-chivas" alt="Chivas">
      </div>

      <!-- 3 Pilares -->
      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="pillar-icon">🥃</div>
          <div class="pillar-content">
            <h4>+1.000 Rótulos</h4>
            <p>Destilados e cervejas 100% originais</p>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">⚡</div>
          <div class="pillar-content">
            <h4>Preço Direto</h4>
            <p>Tabela oficial de distribuição</p>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon">💍</div>
          <div class="pillar-content">
            <h4>Consignação 20%</h4>
            <p>Exclusivo para festas e eventos</p>
          </div>
        </div>
      </div>

      <!-- Barra de Chamada -->
      <div class="callout-bar">
        <div class="callout-url">montecristobebidas.com.br</div>
        <div class="callout-btn">TOQUE NO LINK DA BIO 👉</div>
      </div>
    </div>
  </body>
  </html>`;
}

// 2B. POST FEED B2B / BARES & CNPJ (1080 x 1350)
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
        background: radial-gradient(circle at 50% 30%, #153E54 0%, #0D2635 40%, #061520 75%, #02090F 100%);
        padding: 70px 65px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .glow-blue {
        position: absolute;
        top: 250px;
        left: 50%;
        transform: translateX(-50%);
        width: 850px;
        height: 500px;
        background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.16) 0%, rgba(14, 70, 99, 0.25) 45%, transparent 75%);
        filter: blur(70px);
        pointer-events: none;
      }

      .feed-header {
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 28px;
      }

      .brand-logo-feed {
        width: 440px;
        height: auto;
      }

      .feed-badge {
        background: rgba(56, 189, 248, 0.15);
        border: 1px solid rgba(56, 189, 248, 0.4);
        color: #38BDF8;
        font-family: 'Outfit', sans-serif;
        font-size: 17px;
        font-weight: 800;
        padding: 9px 20px;
        border-radius: 999px;
        letter-spacing: 1.5px;
      }

      .headline-section {
        position: relative;
        z-index: 10;
        margin-top: 35px;
        text-align: center;
      }

      .headline-tag {
        font-family: 'Outfit', sans-serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 2px;
        color: #34D399;
        text-transform: uppercase;
        margin-bottom: 12px;
      }

      .headline-title {
        font-family: 'Outfit', sans-serif;
        font-size: 54px;
        font-weight: 900;
        line-height: 1.12;
        letter-spacing: -1px;
        color: #FFFFFF;
      }

      .headline-title span {
        background: linear-gradient(135deg, #38BDF8 0%, #0284C7 60%, #34D399 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .feed-stage {
        position: relative;
        z-index: 5;
        height: 480px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin: 15px 0;
      }

      .feed-platform {
        position: absolute;
        bottom: 20px;
        width: 800px;
        height: 45px;
        background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.25) 0%, rgba(14, 70, 99, 0.4) 50%, transparent 75%);
        border-radius: 50%;
        filter: blur(6px);
      }

      .feed-bottle {
        position: absolute;
        bottom: 30px;
        filter: drop-shadow(0 20px 25px rgba(0, 0, 0, 0.8));
      }

      .fb-jack { height: 420px; left: 50%; transform: translateX(-50%); z-index: 8; }
      .fb-tanqueray { height: 380px; left: 240px; z-index: 7; }
      .fb-redbull { height: 310px; left: 110px; z-index: 6; }
      .fb-licor43 { height: 370px; right: 240px; z-index: 7; }
      .fb-chivas { height: 390px; right: 110px; z-index: 6; }

      .b2b-grid {
        position: relative;
        z-index: 10;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 22px;
      }

      .b2b-item {
        background: rgba(13, 30, 42, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .b2b-item-icon {
        font-size: 24px;
      }

      .b2b-item h4 {
        font-family: 'Outfit', sans-serif;
        font-size: 19px;
        font-weight: 800;
        color: #F8FAFC;
      }

      .b2b-item p {
        font-size: 14px;
        color: #94A3B8;
        margin-top: 2px;
      }

      .b2b-footer {
        position: relative;
        z-index: 10;
        background: linear-gradient(90deg, #0284C7 0%, #0E4663 50%, #10B981 100%);
        border-radius: 20px;
        padding: 20px 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .b2b-url {
        font-family: 'Outfit', sans-serif;
        font-size: 26px;
        font-weight: 900;
        color: #FFFFFF;
      }

      .b2b-btn {
        background: #FFFFFF;
        color: #0E4663;
        font-family: 'Outfit', sans-serif;
        font-size: 18px;
        font-weight: 800;
        padding: 12px 24px;
        border-radius: 12px;
      }
    </style>
  </head>
  <body>
    <div class="feed-canvas">
      <div class="glow-blue"></div>

      <div class="feed-header">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="brand-logo-feed" alt="Monte Cristo">
        <div class="feed-badge">SOLUÇÕES B2B CNPJ</div>
      </div>

      <div class="headline-section">
        <div class="headline-tag">Bares • Pubs • Casas Noturnas • Restaurantes</div>
        <h1 class="headline-title">
          FORNECIMENTO ESTÁVEL & <span>PREÇO DE ATACADO.</span>
        </h1>
      </div>

      <div class="feed-stage">
        <div class="feed-platform"></div>
        <img src="${RED_BULL}" class="feed-bottle fb-redbull" alt="Red Bull">
        <img src="${TANQUERAY}" class="feed-bottle fb-tanqueray" alt="Tanqueray">
        <img src="${JACK_DANIELS}" class="feed-bottle fb-jack" alt="Jack Daniels">
        <img src="${LICOR_43}" class="feed-bottle fb-licor43" alt="Licor 43">
        <img src="${CHIVAS_12}" class="feed-bottle fb-chivas" alt="Chivas">
      </div>

      <div class="b2b-grid">
        <div class="b2b-item">
          <div class="b2b-item-icon">📋</div>
          <div>
            <h4>100% com Nota Fiscal</h4>
            <p>Conformidade fiscal e procedência garantida</p>
          </div>
        </div>

        <div class="b2b-item">
          <div class="b2b-item-icon">🚚</div>
          <div>
            <h4>Entregas Programadas</h4>
            <p>Em até 6 dias úteis em toda a Serra Gaúcha</p>
          </div>
        </div>

        <div class="b2b-item">
          <div class="b2b-item-icon">💰</div>
          <div>
            <h4>Tabela Direta CNPJ</h4>
            <p>Condições comerciais exclusivas para parceiros</p>
          </div>
        </div>

        <div class="b2b-item">
          <div class="b2b-item-icon">📱</div>
          <div>
            <h4>Reposição pelo Site</h4>
            <p>Monte o pedido no celular a qualquer hora</p>
          </div>
        </div>
      </div>

      <div class="b2b-footer">
        <div class="b2b-url">WhatsApp B2B: (54) 99969-2859</div>
        <div class="b2b-btn">PEDIR TABELA COMERCIAL 👉</div>
      </div>
    </div>
  </body>
  </html>`;
}

// 3. CAPA DO CARROSSEL EVENTOS (1080 x 1350)
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
        background: radial-gradient(circle at 50% 25%, #18445C 0%, #0C283A 40%, #061520 75%, #02090F 100%);
        padding: 70px 65px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .amber-glow {
        position: absolute;
        top: 250px;
        left: 50%;
        transform: translateX(-50%);
        width: 900px;
        height: 550px;
        background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.16) 0%, rgba(16, 185, 129, 0.15) 45%, transparent 75%);
        filter: blur(80px);
        pointer-events: none;
      }

      .top-row {
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 26px;
      }

      .top-logo {
        width: 430px;
        height: auto;
      }

      .tag-eventos {
        background: rgba(245, 158, 11, 0.15);
        border: 1px solid rgba(245, 158, 11, 0.4);
        color: #FBBF24;
        font-family: 'Outfit', sans-serif;
        font-size: 16px;
        font-weight: 800;
        padding: 8px 18px;
        border-radius: 999px;
        letter-spacing: 1.5px;
      }

      .hook-section {
        position: relative;
        z-index: 10;
        margin-top: 35px;
        text-align: center;
      }

      .hook-tag {
        font-family: 'Outfit', sans-serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 2px;
        color: #38BDF8;
        text-transform: uppercase;
        margin-bottom: 14px;
      }

      .hook-title {
        font-family: 'Outfit', sans-serif;
        font-size: 56px;
        font-weight: 900;
        line-height: 1.12;
        letter-spacing: -1.2px;
        color: #FFFFFF;
      }

      .hook-title span.warning {
        color: #F87171;
      }

      .hook-title span.solution {
        background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #10B981 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      /* Stage com Taças/Bebidas nobres */
      .carrossel-stage {
        position: relative;
        z-index: 5;
        height: 480px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        margin: 10px 0;
      }

      .c-platform {
        position: absolute;
        bottom: 25px;
        width: 800px;
        height: 50px;
        background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.3) 0%, rgba(14, 70, 99, 0.4) 50%, transparent 75%);
        border-radius: 50%;
        filter: blur(8px);
      }

      .c-bottle {
        position: absolute;
        bottom: 35px;
        filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.85));
      }

      .cb-chivas { height: 430px; left: 50%; transform: translateX(-50%); z-index: 8; }
      .cb-tanqueray { height: 380px; left: 240px; z-index: 7; }
      .cb-aperol { height: 390px; right: 240px; z-index: 7; }
      .cb-absolut { height: 360px; left: 130px; z-index: 6; }
      .cb-licor43 { height: 360px; right: 130px; z-index: 6; }

      /* Selo de Consignação */
      .seal-box {
        position: relative;
        z-index: 10;
        background: rgba(13, 30, 42, 0.8);
        border: 2px solid rgba(245, 158, 11, 0.5);
        box-shadow: 0 16px 40px rgba(0,0,0,0.6), 0 0 30px rgba(245, 158, 11, 0.2);
        border-radius: 20px;
        padding: 20px 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .seal-left h3 {
        font-family: 'Outfit', sans-serif;
        font-size: 26px;
        font-weight: 900;
        color: #FBBF24;
      }

      .seal-left p {
        font-size: 16px;
        color: #E2E8F0;
        margin-top: 4px;
      }

      .swipe-btn {
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        color: #FFFFFF;
        font-family: 'Outfit', sans-serif;
        font-size: 20px;
        font-weight: 800;
        padding: 14px 26px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <div class="carrossel-canvas">
      <div class="amber-glow"></div>

      <div class="top-row">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="top-logo" alt="Monte Cristo">
        <div class="tag-eventos">GUIA DE EVENTOS & FESTAS</div>
      </div>

      <div class="hook-section">
        <div class="hook-tag">Casamentos & Formaturas na Serra Gaúcha</div>
        <h1 class="hook-title">
          Calculou as bebidas e bateu o medo de <span class="warning">faltar</span> ou <span class="solution">sobrar demais?</span>
        </h1>
      </div>

      <div class="carrossel-stage">
        <div class="c-platform"></div>
        <img src="${ABSOLUT}" class="c-bottle cb-absolut" alt="Absolut">
        <img src="${TANQUERAY}" class="c-bottle cb-tanqueray" alt="Tanqueray">
        <img src="${CHIVAS_12}" class="c-bottle cb-chivas" alt="Chivas">
        <img src="${APEROL}" class="c-bottle cb-aperol" alt="Aperol">
        <img src="${LICOR_43}" class="c-bottle cb-licor43" alt="Licor 43">
      </div>

      <div class="seal-box">
        <div class="seal-left">
          <h3>🏷️ MODALIDADE CONSIGNAÇÃO DE ATÉ 20%</h3>
          <p>O que sobrar lacrado, recolhemos e estornamos o valor na sua conta bancária!</p>
        </div>
        <div class="swipe-btn">
          <span>DESLIZE</span> 👉
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

// 4. CAPA WHATSAPP BUSINESS (1920 x 1080)
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
        background: linear-gradient(105deg, #051017 0%, #09202E 40%, #0E3C53 75%, #144E66 100%);
        padding: 90px 110px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      /* Glows de ambientação */
      .wa-glow-left {
        position: absolute;
        top: 20%;
        left: 10%;
        width: 700px;
        height: 700px;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%);
        filter: blur(80px);
        pointer-events: none;
      }

      .wa-glow-right {
        position: absolute;
        top: 10%;
        right: 15%;
        width: 800px;
        height: 800px;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(27, 117, 136, 0.25) 50%, transparent 75%);
        filter: blur(90px);
        pointer-events: none;
      }

      /* Coluna Esquerda: Marca e Autoridade */
      .wa-left-col {
        position: relative;
        z-index: 10;
        max-width: 920px;
        display: flex;
        flex-direction: column;
        gap: 30px;
      }

      .wa-brand-logo {
        width: 580px;
        height: auto;
        filter: drop-shadow(0 10px 25px rgba(0,0,0,0.7));
      }

      .wa-tagline {
        font-family: 'Outfit', sans-serif;
        font-size: 26px;
        font-weight: 700;
        color: #34D399;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      .wa-title {
        font-family: 'Outfit', sans-serif;
        font-size: 64px;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -1.5px;
        color: #FFFFFF;
      }

      .wa-title span {
        background: linear-gradient(135deg, #34D399 0%, #38BDF8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .wa-bullets {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }

      .wa-bullet {
        background: rgba(13, 30, 42, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.14);
        padding: 12px 22px;
        border-radius: 14px;
        font-size: 20px;
        font-weight: 600;
        color: #F1F5F9;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .wa-site-box {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 18px 28px;
        border-radius: 16px;
        display: inline-flex;
        align-items: center;
        gap: 20px;
        width: fit-content;
      }

      .wa-site-label {
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        color: #94A3B8;
        letter-spacing: 1px;
      }

      .wa-site-domain {
        font-family: 'Outfit', sans-serif;
        font-size: 32px;
        font-weight: 900;
        color: #FFFFFF;
      }

      /* Coluna Direita: Vitrine de Garrafas em Perspectiva */
      .wa-right-col {
        position: relative;
        z-index: 5;
        width: 760px;
        height: 750px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }

      .wa-platform {
        position: absolute;
        bottom: 30px;
        width: 720px;
        height: 60px;
        background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, rgba(14, 70, 99, 0.45) 50%, transparent 75%);
        border-radius: 50%;
        filter: blur(8px);
      }

      .wa-bottle {
        position: absolute;
        bottom: 50px;
        filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.85));
      }

      .wb-jack { height: 580px; left: 50%; transform: translateX(-50%); z-index: 8; }
      .wb-tanqueray { height: 510px; left: 140px; z-index: 7; }
      .wb-redbull { height: 400px; left: 20px; z-index: 6; }
      .wb-licor43 { height: 500px; right: 140px; z-index: 7; }
      .wb-chivas { height: 520px; right: 20px; z-index: 6; }
    </style>
  </head>
  <body>
    <div class="wa-canvas">
      <div class="wa-glow-left"></div>
      <div class="wa-glow-right"></div>

      <!-- Coluna Esquerda -->
      <div class="wa-left-col">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="wa-brand-logo" alt="Monte Cristo Bebidas">
        <div class="wa-tagline">Mais de 20 anos de tradição na Serra Gaúcha</div>
        
        <h1 class="wa-title">
          DISTRIBUIDORA DE BEBIDAS<br>
          AGORA COM <span>NOVO SITE OFICIAL.</span>
        </h1>

        <div class="wa-bullets">
          <div class="wa-bullet">🥃 +1.000 Rótulos Originais</div>
          <div class="wa-bullet">⚡ Preços de Distribuição</div>
          <div class="wa-bullet">🏢 Fornecimento B2B com NF</div>
          <div class="wa-bullet">💍 Consignação 20% p/ Festas</div>
        </div>

        <div class="wa-site-box">
          <span class="wa-site-label">Acesse nosso catálogo:</span>
          <span class="wa-site-domain">montecristobebidas.com.br</span>
        </div>
      </div>

      <!-- Coluna Direita (Vitrine Real) -->
      <div class="wa-right-col">
        <div class="wa-platform"></div>
        <img src="${RED_BULL}" class="wa-bottle wb-redbull" alt="Red Bull">
        <img src="${TANQUERAY}" class="wa-bottle wb-tanqueray" alt="Tanqueray">
        <img src="${JACK_DANIELS}" class="wa-bottle wb-jack" alt="Jack Daniels">
        <img src="${LICOR_43}" class="wa-bottle wb-licor43" alt="Licor 43">
        <img src="${CHIVAS_12}" class="wa-bottle wb-chivas" alt="Chivas">
      </div>
    </div>
  </body>
  </html>`;
}

// 5. DESTAQUE INSTAGRAM (1080 x 1080)
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
        background: #07131B;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .outer-ring {
        width: 860px;
        height: 860px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #155E75 0%, #0E4663 50%, #071927 100%);
        border: 12px solid rgba(16, 185, 129, 0.4);
        box-shadow: 0 0 60px rgba(16, 185, 129, 0.3), inset 0 0 60px rgba(0,0,0,0.6);
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
        background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
        filter: blur(40px);
        pointer-events: none;
      }

      .monogram-logo {
        width: 380px;
        height: auto;
        position: relative;
        z-index: 10;
        filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
      }

      .destaque-label {
        margin-top: 40px;
        font-family: 'Outfit', sans-serif;
        font-size: 38px;
        font-weight: 900;
        letter-spacing: 5px;
        color: #FFFFFF;
        text-transform: uppercase;
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .destaque-label span {
        color: #34D399;
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

// 6. CARROSSEL SLIDES 2 A 7 (1080 x 1350 CADA)
function getCarrosselSlideHtml(slideNum) {
  const slidesContent = {
    2: {
      step: 'Slide 2 de 7 • O Dilema',
      title: 'O grande pesadelo de qualquer anfitrião na Serra Gaúcha:',
      bullets: [
        { icon: '⚠️', title: 'Se faltar bebida na pista:', desc: 'A festa esfria, os convidados saem mais cedo e o momento dos sonhos perde o brilho.' },
        { icon: '💸', title: 'Se comprar em excesso para garantir:', desc: 'Fica com milhares de reais parados em garrafas acumulando poeira no armário.' }
      ],
      footer: 'Existe uma forma inteligente de resolver isso? 👉'
    },
    3: {
      step: 'Slide 3 de 7 • A Solução Oficial',
      title: 'Você não precisa passar por esse estresse.',
      highlightBox: {
        badge: 'MODALIDADE EXCLUSIVA',
        title: 'CONSIGNAÇÃO DE ATÉ 20% DO LOTE',
        desc: 'A Monte Cristo Bebidas entrega o lote completo para a sua festa com margem de segurança. O que voltar lacrado, nós recolhemos e estornamos 100% do valor direto na sua conta bancária!'
      },
      footer: 'Veja como funciona na prática 👉'
    },
    4: {
      step: 'Slide 4 de 7 • Passo a Passo',
      title: 'Como funciona em 3 passos simples:',
      steps: [
        { num: '1', title: 'Montamos o lote ideal', desc: 'De acordo com o perfil dos seus convidados, número de pessoas e horário.' },
        { num: '2', title: 'Enviamos a consignação', desc: 'Até 20% do volume vai como margem de segurança para nunca faltar na pista.' },
        { num: '3', title: 'Devolução sem complicação', desc: 'O que sobrar lacrado após a festa, nós recolhemos e reembolsamos sem burocracia.' }
      ],
      footer: 'Procedência 100% garantida 👉'
    },
    5: {
      step: 'Slide 5 de 7 • Variedade Nobre',
      title: 'Mais de 1.000 rótulos com lacre e nota fiscal:',
      gridItems: [
        { title: '🍾 Espumantes Nobres', desc: 'Moscatel, Brut e Rosé da Serra' },
        { title: '🥃 Whiskies 12 Anos', desc: 'Black Label, Chivas, Jack Daniel\'s' },
        { title: '🍸 Gins & Vodkas', desc: 'Tanqueray, Gordon\'s, Absolut' },
        { title: '⚡ Energéticos & Licores', desc: 'Red Bull, Baly, Licor 43, Amarula' }
      ],
      footer: 'Agora tudo no nosso novo site 👉'
    },
    6: {
      step: 'Slide 6 de 7 • No Novo Site',
      title: 'Monte sua lista em menos de 2 minutos:',
      sitePreview: {
        domain: 'montecristobebidas.com.br',
        bullets: [
          '✓ Navegue pelas categorias no celular',
          '✓ Veja fotos reais e preços atualizados',
          '✓ Envie seu carrinho pronto no WhatsApp do nosso consultor de eventos em 1 clique'
        ]
      },
      footer: 'Pronto para planejar? 👉'
    },
    7: {
      step: 'Slide 7 de 7 • Conclusão',
      title: 'Planeje sua festa com tranquilidade e economia real.',
      ctaBox: {
        headline: 'GARANTA A CONSIGNAÇÃO DE 20%',
        sub: 'Toque no link da nossa bio, explore o novo site e solicite sua cotação sem compromisso.',
        btn: '💍 COTAR BEBIDAS DO EVENTO'
      },
      footer: 'Monte Cristo Bebidas • Tradição na Serra Gaúcha'
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
        background: radial-gradient(circle at 50% 25%, #15465F 0%, #0C2B3E 45%, #061520 80%, #030B12 100%);
        padding: 70px 65px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .slide-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 24px;
      }

      .slide-logo {
        width: 360px;
        height: auto;
      }

      .slide-step-badge {
        background: rgba(16, 185, 129, 0.18);
        border: 1px solid rgba(16, 185, 129, 0.4);
        color: #34D399;
        font-family: 'Outfit', sans-serif;
        font-size: 16px;
        font-weight: 800;
        padding: 8px 18px;
        border-radius: 999px;
      }

      .slide-main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 40px 0;
      }

      .slide-headline {
        font-family: 'Outfit', sans-serif;
        font-size: 52px;
        font-weight: 900;
        line-height: 1.15;
        letter-spacing: -1px;
        color: #FFFFFF;
        margin-bottom: 35px;
      }

      .bullet-box {
        background: rgba(13, 30, 42, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 18px;
        padding: 24px 28px;
        margin-bottom: 18px;
        display: flex;
        gap: 20px;
        align-items: flex-start;
      }

      .bullet-box-icon {
        font-size: 32px;
        flex-shrink: 0;
      }

      .bullet-box h4 {
        font-family: 'Outfit', sans-serif;
        font-size: 24px;
        font-weight: 800;
        color: #F8FAFC;
      }

      .bullet-box p {
        font-size: 18px;
        color: #CBD5E1;
        margin-top: 6px;
        line-height: 1.45;
      }

      .highlight-card {
        background: rgba(14, 70, 99, 0.5);
        border: 2px solid #10B981;
        border-radius: 24px;
        padding: 35px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.5), 0 0 30px rgba(16, 185, 129, 0.2);
        text-align: center;
      }

      .step-row {
        display: flex;
        gap: 20px;
        align-items: flex-start;
        background: rgba(13, 30, 42, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 22px 26px;
        border-radius: 18px;
        margin-bottom: 16px;
      }

      .step-circle {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #10B981;
        color: #071520;
        font-family: 'Outfit', sans-serif;
        font-size: 24px;
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .slide-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 24px;
        font-size: 18px;
        color: #94A3B8;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="slide-canvas">
      <div class="slide-top">
        <img src="${LOGO_BRANCO_FOOTER_SVG}" class="slide-logo" alt="Monte Cristo">
        <div class="slide-step-badge">${data.step}</div>
      </div>

      <div class="slide-main-content">
        <h2 class="slide-headline">${data.title}</h2>

        ${data.bullets ? data.bullets.map(b => `
          <div class="bullet-box">
            <div class="bullet-box-icon">${b.icon}</div>
            <div>
              <h4>${b.title}</h4>
              <p>${b.desc}</p>
            </div>
          </div>
        `).join('') : ''}

        ${data.highlightBox ? `
          <div class="highlight-card">
            <span style="color:#34D399; font-weight:800; letter-spacing:2px; font-size:18px;">${data.highlightBox.badge}</span>
            <h3 style="font-family:'Outfit'; font-size:36px; font-weight:900; color:#FFFFFF; margin:12px 0;">${data.highlightBox.title}</h3>
            <p style="font-size:20px; color:#E2E8F0; line-height:1.5;">${data.highlightBox.desc}</p>
          </div>
        ` : ''}

        ${data.steps ? data.steps.map(s => `
          <div class="step-row">
            <div class="step-circle">${s.num}</div>
            <div>
              <h4 style="font-family:'Outfit'; font-size:22px; font-weight:800; color:#FFF;">${s.title}</h4>
              <p style="font-size:17px; color:#CBD5E1; margin-top:4px;">${s.desc}</p>
            </div>
          </div>
        `).join('') : ''}

        ${data.gridItems ? `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            ${data.gridItems.map(g => `
              <div style="background:rgba(13,30,42,0.7); border:1px solid rgba(255,255,255,0.12); padding:22px; border-radius:16px;">
                <h4 style="font-family:'Outfit'; font-size:22px; font-weight:800; color:#38BDF8;">${g.title}</h4>
                <p style="font-size:16px; color:#94A3B8; margin-top:6px;">${g.desc}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${data.sitePreview ? `
          <div style="background:rgba(13,30,42,0.8); border:1px solid rgba(56,189,248,0.4); border-radius:20px; padding:32px;">
            <div style="font-family:'Outfit'; font-size:32px; font-weight:900; color:#38BDF8; margin-bottom:18px;">${data.sitePreview.domain}</div>
            ${data.sitePreview.bullets.map(b => `<div style="font-size:20px; color:#F1F5F9; margin-bottom:12px;">${b}</div>`).join('')}
          </div>
        ` : ''}

        ${data.ctaBox ? `
          <div style="background:linear-gradient(135deg, #0E4663 0%, #155E75 100%); border:2px solid #10B981; border-radius:24px; padding:40px; text-align:center;">
            <h3 style="font-family:'Outfit'; font-size:36px; font-weight:900; color:#FFF;">${data.ctaBox.headline}</h3>
            <p style="font-size:20px; color:#E2E8F0; margin:14px 0 24px 0;">${data.ctaBox.sub}</p>
            <div style="background:#10B981; color:#071520; font-family:'Outfit'; font-size:24px; font-weight:900; padding:18px 32px; border-radius:16px; display:inline-block;">
              ${data.ctaBox.btn}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="slide-bottom">
        <span>Monte Cristo Bebidas</span>
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
  console.log('🚀 Iniciando geração de materiais com logos originais e Playwright...');

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

  // Também gerar o SVG puro do destaque
  const destaqueSvgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <radialGradient id="bgGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#155E75"/>
      <stop offset="50%" stop-color="#0E4663"/>
      <stop offset="100%" stop-color="#071927"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="25" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="1080" height="1080" fill="#07131B"/>
  <circle cx="540" cy="540" r="420" fill="url(#bgGrad)" stroke="#10B981" stroke-width="14" stroke-opacity="0.8" filter="url(#glow)"/>
  <g transform="translate(360, 260) scale(0.32)">
    <!-- Monograma Monte Cristo Oficial -->
    <path fill="#FFFFFF" d="M205.61 130.2l101 96.83c179.27,-119.32 356.17,-118.65 518.35,4.38l99.14 -98.05c-239.3,-182.94 -478.8,-171.57 -718.48,-3.17z"/>
    <path fill="#FFFFFF" d="M216.47 815.19c176.65,231.34 520.68,246.35 694.59,-2.34l99.54 98.46c-223.21,299.36 -693.21,278.57 -893.59,2.26l99.46 -98.37zm350.69 -211.95l420.4 -410.78c177.63,191.19 167.79,462.19 72.95,646.35l-104.06 -102.91c37.75,-112.58 42.81,-218.59 8.5,-316.68l-399.44 382.1 -399 -383.76c-39.85,98.81 -40.75,205.17 8.89,321.32l-103.65 102.51c-112.64,-230.01 -95.52,-447.14 71.9,-649.35l423.52 411.21zm-495.43 238.15l103.65 -102.51c13.67,31.48 27.03,57.54 41.08,76.31l-99.46 98.37c-16.43,-19.38 -30.63,-41.01 -45.27,-72.17z"/>
  </g>
  <text x="540" y="730" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" letter-spacing="6">NOVO <tspan fill="#34D399">SITE</tspan></text>
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
  console.log('✅ Todas as peças de divulgação foram geradas com sucesso!');
}

run().catch(err => {
  console.error('❌ Erro na geração:', err);
  process.exit(1);
});
