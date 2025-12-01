// Polyfill for DOMMatrix which is required by pdfjs-dist but missing in Node.js
// This is needed because pdf-parse (which uses pdfjs-dist) expects this global to exist.

if (typeof global.DOMMatrix === "undefined") {
    // @ts-ignore
    global.DOMMatrix = class DOMMatrix {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;

        constructor(init?: string | number[]) {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;

            if (Array.isArray(init)) {
                this.a = init[0];
                this.b = init[1];
                this.c = init[2];
                this.d = init[3];
                this.e = init[4];
                this.f = init[5];
            }
        }
    };
}
