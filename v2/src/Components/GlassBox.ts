export default class GlassBox extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
      <style>
        :host {
          --corner-radius: 24px;
          --base-strength: 14px;
          --extra-blur: 8px;
          --softness: 13px;
          --tint-amount: 0;
          --tint-saturation: 2;
          --tint-hue: 180deg;
          --contrast: 1;
          --brightness: 1;
          --invert: 10%;
          
          transition: all 0.3s ease;

          --total-strength: calc(var(--base-strength) + var(--extra-blur));
          --edge-width: calc(0.3px + (var(--softness) * 0.1));
          --emboss-width: calc((var(--softness) * 0.38));
          --refraction-width: calc((var(--softness) * 0.3));
        }
        
        :host([hover-effect]:hover) {
            --softness: 16px;
            --extra-blur: 32px;
        }

        .GlassContainer {
          position: relative;
          overflow: visible;
          pointer-events: none;
        }

        .GlassContent {
          position: relative;
          display: block;
          z-index: 100;
          overflow: hidden;
          border-radius: var(--corner-radius);
          pointer-events: auto;
        }

        .GlassMaterial {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: visible;
          pointer-events: none;
        }

        .GlassMaterial:after {
          content: '';
          display: block;
          position: absolute;
          inset: 0;
          z-index: 3;
          overflow: hidden;
          border-radius: var(--corner-radius);
          background-color: rgba(128, 128, 128, 0);
        }

        .GlassMaterial > div {
          position: absolute;
          inset: 0;
          box-sizing: border-box;
          border-radius: var(--corner-radius);
          z-index: 2;
          overflow: hidden;
        }

        .GlassMaterial .GlassEdgeReflection {
          z-index: 4;
          margin: calc(var(--total-strength) * -1);
          border-radius: calc(var(--corner-radius) + var(--total-strength));
          backdrop-filter: blur(var(--total-strength)) brightness(1.2) saturate(1.2);
          padding: var(--edge-width);
          border: var(--total-strength) solid transparent;
          mask: 
            linear-gradient(white 0 0) padding-box,
            linear-gradient(white 0 0) content-box;
          mask-composite: exclude, exclude;
        }

        .GlassMaterial .GlassEmbossReflection {
          backdrop-filter: blur(calc(var(--total-strength) * 1.5)) invert(0.25) brightness(1.11) saturate(1.2) hue-rotate(-10deg) contrast(2.3);
          padding: var(--emboss-width);
          border: 0 solid transparent;
          mask: 
            linear-gradient(white 0 0) padding-box,
            linear-gradient(white 0 0) content-box;
          mask-composite: exclude, exclude;
        }

        .GlassMaterial .GlassRefraction {
          backdrop-filter: invert(0.1) brightness(1.2) contrast(1.5);
          padding: var(--refraction-width);
          border: calc(var(--emboss-width)) solid transparent;
          mask: 
            linear-gradient(white 0 0) padding-box,
            linear-gradient(white 0 0) content-box;
          mask-composite: exclude, exclude;
        }

        .GlassMaterial .GlassBlur {
          backdrop-filter: blur(var(--extra-blur)) brightness(1.25);
          border-radius: calc(var(--corner-radius) - (var(--emboss-width) + var(--refraction-width)));
          margin: calc(var(--emboss-width) + var(--refraction-width));
        }

        .GlassMaterial .BlendLayers {
          z-index: 3;
          backdrop-filter: blur(calc((var(--softness) * 0.2) + (var(--extra-blur) * 0.2)));
        }

        .GlassMaterial .BlendEdge {
          z-index: 8;
          backdrop-filter: blur(calc(var(--edge-width) * 0.4)) contrast(1.6) saturate(1.5);
        }

        .GlassContainer:before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 20;
          display: block;
          border-radius: var(--corner-radius);
          backdrop-filter: invert(var(--invert));
        }

        .GlassMaterial:before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 11;
          display: block;
          border-radius: var(--corner-radius);
          padding: 1px;
          border: 0 solid transparent;
          background: linear-gradient(155deg, hsla(0, 0%, 100%, 0.15) 0%, hsla(0, 0%, 0%, 0.2) 50%, hsla(0, 0%, 100%, 0.15) 100%);
          backdrop-filter: invert(0.15) opacity(0);
          mask: 
            linear-gradient(white 0 0) padding-box,
            linear-gradient(white 0 0) content-box;
          mask-composite: exclude, exclude;
        }

        .GlassMaterial .Highlight {
          z-index: 12;
          display: block;
          border-radius: var(--corner-radius);
          padding: 1px;
          border: 0 solid transparent;
          backdrop-filter: brightness(1.2) contrast(1.6) saturate(1.2) opacity(0);
          mask: 
            linear-gradient(white 0 0) padding-box,
            linear-gradient(white 0 0) content-box;
          mask-composite: exclude, exclude;
        }

        .GlassMaterial .Brightness {
          z-index: 13;
          backdrop-filter: brightness(var(--brightness));
        }
      </style>

      <div class="GlassContainer">
        <div class="GlassContent">
          <slot></slot>
        </div>
        <div class="GlassMaterial">
          <div class="GlassEdgeReflection"></div>
          <div class="GlassEmbossReflection"></div>
          <div class="GlassRefraction"></div>
          <div class="GlassBlur"></div>
          <div class="BlendLayers"></div>
          <div class="BlendEdge"></div>
          <div class="Highlight"></div>
          <div class="Brightness"></div>
        </div>
      </div>
    `;
    }

    static get observedAttributes() {
        return [
            'corner-radius',
            'base-strength',
            'extra-blur',
            'softness',
            'tint-amount',
            'tint-saturation',
            'tint-hue',
            'contrast',
            'brightness',
            'invert',
        ];
    }

    connectedCallback() {
        this.updateAllAttributes();
    }

    // @ts-ignore
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        this.updateStyleVariable(name, newValue);
    }

    updateAllAttributes() {
        GlassBox.observedAttributes.forEach(attr => {
            if (this.hasAttribute(attr)) {
                this.updateStyleVariable(attr, this.getAttribute(attr)!);
            }
        });
    }

    updateStyleVariable(attr: string, value: string) {
        const cssVarName = `--${attr}`;
        this.style.setProperty(cssVarName, value);
    }
}
