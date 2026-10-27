/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BabyDress {
  id: number;
  name: string;
  category: string;
  tag: string;
  price: string;
  colorName: string;
  themeColor: string;
  bgGradient: [string, string];
  svgIllustration: string;
  imageSrc?: string;
}

export const BABY_DRESSES: BabyDress[] = [
  {
    id: 1,
    name: "Sage Linen Ruffle",
    category: "Organic Baby Frock",
    tag: "100% French Linen",
    price: "$39",
    colorName: "Sage Mint",
    themeColor: "#08482D",
    bgGradient: ["#EFF5EB", "#DFECDA"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 110 Q192 85 208 85 T224 105" fill="none" stroke="#B49774" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 148 L192 122 L264 148 Q192 138 120 148 Z" fill="#D2B48C" stroke="#B49774" stroke-width="2"/>
      <line x1="130" y1="148" x2="254" y2="148" stroke="#B49774" stroke-width="2.5"/>
      <!-- Dress Body -->
      <path d="M152 145 Q192 155 232 145 L252 205 Q240 215 224 205 L218 250 L260 410 Q192 425 124 410 L166 250 L160 205 Q144 215 132 205 Z" fill="#9CBFA1" stroke="#08482D" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Flutter Sleeves -->
      <path d="M152 145 Q125 170 132 205 Q148 190 160 180" fill="#B3D1B7" stroke="#08482D" stroke-width="2"/>
      <path d="M232 145 Q259 170 252 205 Q236 190 224 180" fill="#B3D1B7" stroke="#08482D" stroke-width="2"/>
      <!-- Wooden Buttons -->
      <circle cx="192" cy="180" r="4.5" fill="#C59B6A" stroke="#7A5832" stroke-width="1.5"/>
      <circle cx="192" cy="208" r="4.5" fill="#C59B6A" stroke="#7A5832" stroke-width="1.5"/>
      <circle cx="192" cy="236" r="4.5" fill="#C59B6A" stroke="#7A5832" stroke-width="1.5"/>
      <!-- Waist Stitch & Bow -->
      <path d="M166 250 Q192 258 218 250" fill="none" stroke="#08482D" stroke-dasharray="3,3" stroke-width="2"/>
      <!-- Hem Ruffle -->
      <path d="M120 410 Q144 425 168 410 Q192 425 216 410 Q240 425 264 410" fill="none" stroke="#08482D" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  {
    id: 2,
    name: "Blush Floral Peplum",
    category: "Flutter Sleeve Dress",
    tag: "Organic Cotton",
    price: "$44",
    colorName: "Blush Rose",
    themeColor: "#A3485E",
    bgGradient: ["#FDF2F4", "#F7DFE4"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 110 Q192 85 208 85 T224 105" fill="none" stroke="#C59B6A" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 148 L192 122 L264 148 Q192 138 120 148 Z" fill="#E6CDB2" stroke="#C59B6A" stroke-width="2"/>
      <!-- Dress -->
      <path d="M154 145 Q192 160 230 145 L250 200 L220 245 L268 412 Q192 428 116 412 L164 245 L134 200 Z" fill="#F8C8D0" stroke="#8E3C50" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Peter Pan Collar -->
      <path d="M168 148 Q182 170 192 168 Q184 148 168 148 Z" fill="#FFFFFF" stroke="#8E3C50" stroke-width="1.5"/>
      <path d="M216 148 Q202 170 192 168 Q200 148 216 148 Z" fill="#FFFFFF" stroke="#8E3C50" stroke-width="1.5"/>
      <!-- Floral Sprigs -->
      <circle cx="160" cy="300" r="5" fill="#E26D82"/>
      <circle cx="170" cy="305" r="4" fill="#F3A7B6"/>
      <circle cx="225" cy="320" r="5" fill="#E26D82"/>
      <circle cx="185" cy="360" r="5" fill="#E26D82"/>
      <circle cx="145" cy="380" r="4.5" fill="#E26D82"/>
      <circle cx="235" cy="375" r="5" fill="#E26D82"/>
      <!-- Waist Bow -->
      <circle cx="192" cy="245" r="4.5" fill="#8E3C50"/>
      <path d="M192 245 Q176 235 174 248 Q185 252 192 245 Z" fill="#E26D82" stroke="#8E3C50" stroke-width="1.5"/>
      <path d="M192 245 Q208 235 210 248 Q199 252 192 245 Z" fill="#E26D82" stroke="#8E3C50" stroke-width="1.5"/>
      <!-- Tier Flounce -->
      <path d="M135 340 Q192 355 249 340" fill="none" stroke="#8E3C50" stroke-width="2" stroke-dasharray="4,4"/>
    `,
  },
  {
    id: 3,
    name: "Buttercup Daisy Sundress",
    category: "Embroidered Sundress",
    tag: "Hand-Embroidered",
    price: "$42",
    colorName: "Buttercup Yellow",
    themeColor: "#8C6A12",
    bgGradient: ["#FFFDF0", "#F9F2D3"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 110 Q192 85 208 85 T224 105" fill="none" stroke="#B49774" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 148 L192 122 L264 148 Q192 138 120 148 Z" fill="#D2B48C" stroke="#B49774" stroke-width="2"/>
      <!-- Straps with Ties -->
      <line x1="158" y1="135" x2="158" y2="185" stroke="#F6C944" stroke-width="5" stroke-linecap="round"/>
      <line x1="226" y1="135" x2="226" y2="185" stroke="#F6C944" stroke-width="5" stroke-linecap="round"/>
      <path d="M158 135 Q145 125 142 138 Q152 142 158 135" fill="#E8B220" stroke="#8C6A12" stroke-width="1.5"/>
      <path d="M226 135 Q239 125 242 138 Q232 142 226 135" fill="#E8B220" stroke="#8C6A12" stroke-width="1.5"/>
      <!-- Smocked Bodice & Dress -->
      <path d="M148 185 L236 185 L224 235 L268 412 Q192 426 116 412 L160 235 Z" fill="#FCE588" stroke="#8C6A12" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Smocking lines -->
      <line x1="150" y1="198" x2="234" y2="198" stroke="#B88A1A" stroke-width="2" stroke-dasharray="2,3"/>
      <line x1="152" y1="210" x2="232" y2="210" stroke="#B88A1A" stroke-width="2" stroke-dasharray="2,3"/>
      <line x1="154" y1="222" x2="230" y2="222" stroke="#B88A1A" stroke-width="2" stroke-dasharray="2,3"/>
      <!-- Daisy Flowers -->
      <g transform="translate(160, 290)">
        <circle cx="0" cy="0" r="4.5" fill="#E8B220"/>
        <circle cx="0" cy="-8" r="3.5" fill="#FFFFFF"/>
        <circle cx="8" cy="0" r="3.5" fill="#FFFFFF"/>
        <circle cx="0" cy="8" r="3.5" fill="#FFFFFF"/>
        <circle cx="-8" cy="0" r="3.5" fill="#FFFFFF"/>
      </g>
      <g transform="translate(220, 330)">
        <circle cx="0" cy="0" r="4.5" fill="#E8B220"/>
        <circle cx="0" cy="-8" r="3.5" fill="#FFFFFF"/>
        <circle cx="8" cy="0" r="3.5" fill="#FFFFFF"/>
        <circle cx="0" cy="8" r="3.5" fill="#FFFFFF"/>
        <circle cx="-8" cy="0" r="3.5" fill="#FFFFFF"/>
      </g>
      <g transform="translate(180, 370)">
        <circle cx="0" cy="0" r="4.5" fill="#E8B220"/>
        <circle cx="0" cy="-8" r="3.5" fill="#FFFFFF"/>
        <circle cx="8" cy="0" r="3.5" fill="#FFFFFF"/>
        <circle cx="0" cy="8" r="3.5" fill="#FFFFFF"/>
        <circle cx="-8" cy="0" r="3.5" fill="#FFFFFF"/>
      </g>
      <!-- Scalloped Hem -->
      <path d="M116 412 Q141 422 166 412 Q191 422 216 412 Q241 422 268 412" fill="none" stroke="#8C6A12" stroke-width="2.5"/>
    `,
  },
  {
    id: 4,
    name: "Vintage Heirloom Lace",
    category: "Christening Gown",
    tag: "Fine Hand-Lace",
    price: "$65",
    colorName: "Antique Ivory",
    themeColor: "#594B3C",
    bgGradient: ["#FAF8F3", "#EDE5D6"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 105 Q192 80 208 80 T224 100" fill="none" stroke="#CBB499" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 142 L192 118 L264 142 Q192 134 120 142 Z" fill="#F0E5D4" stroke="#CBB499" stroke-width="2"/>
      <!-- Delicate Gown Body -->
      <path d="M156 142 Q192 154 228 142 L248 190 Q235 200 220 192 L215 235 L265 425 Q192 438 119 425 L169 235 L164 192 Q149 200 136 190 Z" fill="#FCFAF5" stroke="#7A6855" stroke-width="2.2" stroke-linejoin="round"/>
      <!-- Lace Collar Overlay -->
      <path d="M156 142 Q192 178 228 142 Q192 160 156 142 Z" fill="#F2ECE0" stroke="#7A6855" stroke-width="1.5"/>
      <circle cx="172" cy="158" r="2" fill="#7A6855"/>
      <circle cx="184" cy="164" r="2" fill="#7A6855"/>
      <circle cx="192" cy="166" r="2" fill="#7A6855"/>
      <circle cx="200" cy="164" r="2" fill="#7A6855"/>
      <circle cx="212" cy="158" r="2" fill="#7A6855"/>
      <!-- Lace Filigree Pattern -->
      <path d="M140 320 Q192 335 244 320" fill="none" stroke="#CBB499" stroke-width="2" stroke-dasharray="2,3"/>
      <path d="M130 365 Q192 380 254 365" fill="none" stroke="#CBB499" stroke-width="2" stroke-dasharray="2,3"/>
      <!-- Pearl Buttons -->
      <circle cx="192" cy="188" r="3.5" fill="#EAE5DC" stroke="#7A6855" stroke-width="1.2"/>
      <circle cx="192" cy="208" r="3.5" fill="#EAE5DC" stroke="#7A6855" stroke-width="1.2"/>
      <!-- Deep Scallop Lace Hem -->
      <path d="M119 425 C135 440 150 420 167 435 C184 420 200 440 217 425 C234 440 250 420 265 425" fill="#F5EFE4" stroke="#7A6855" stroke-width="2"/>
    `,
  },
  {
    id: 5,
    name: "Sky Blue Gingham Pinafore",
    category: "Classic Sundress",
    tag: "Woven Gingham",
    price: "$36",
    colorName: "Sky Gingham",
    themeColor: "#22577A",
    bgGradient: ["#F0F7FB", "#D8EBF7"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 110 Q192 85 208 85 T224 105" fill="none" stroke="#B49774" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 148 L192 122 L264 148 Q192 138 120 148 Z" fill="#D2B48C" stroke="#B49774" stroke-width="2"/>
      <!-- Straps & Bib -->
      <rect x="156" y="140" width="16" height="55" rx="3" fill="#88BFE8" stroke="#1D4E70" stroke-width="2"/>
      <rect x="212" y="140" width="16" height="55" rx="3" fill="#88BFE8" stroke="#1D4E70" stroke-width="2"/>
      <!-- Buttons on Straps -->
      <circle cx="164" cy="188" r="4.5" fill="#C59B6A" stroke="#7A5832" stroke-width="1.5"/>
      <circle cx="220" cy="188" r="4.5" fill="#C59B6A" stroke="#7A5832" stroke-width="1.5"/>
      <!-- Bib & Skirt -->
      <path d="M150 185 L234 185 L230 240 L266 410 Q192 425 118 410 L154 240 Z" fill="#A8D4F5" stroke="#1D4E70" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Gingham Check grid overlay -->
      <line x1="130" y1="280" x2="254" y2="280" stroke="#7AB7E6" stroke-width="3" stroke-dasharray="6,6"/>
      <line x1="125" y1="315" x2="259" y2="315" stroke="#7AB7E6" stroke-width="3" stroke-dasharray="6,6"/>
      <line x1="120" y1="350" x2="264" y2="350" stroke="#7AB7E6" stroke-width="3" stroke-dasharray="6,6"/>
      <line x1="118" y1="385" x2="266" y2="385" stroke="#7AB7E6" stroke-width="3" stroke-dasharray="6,6"/>
      <line x1="150" y1="240" x2="135" y2="410" stroke="#7AB7E6" stroke-width="3" stroke-dasharray="6,6"/>
      <line x1="178" y1="240" x2="173" y2="415" stroke="#7AB7E6" stroke-width="3" stroke-dasharray="6,6"/>
      <line x1="206" y1="240" x2="211" y2="415" stroke="#7AB7E6" stroke-width="3" stroke-dasharray="6,6"/>
      <line x1="230" y1="240" x2="249" y2="410" stroke="#7AB7E6" stroke-width="3" stroke-dasharray="6,6"/>
      <!-- Front Patch Pocket -->
      <rect x="176" y="295" width="32" height="30" rx="4" fill="#FFFFFF" stroke="#1D4E70" stroke-width="2"/>
      <circle cx="192" cy="310" r="3" fill="#E56B6F"/>
    `,
  },
  {
    id: 6,
    name: "Terracotta Boho Smocked",
    category: "Boho Flutter Dress",
    tag: "Natural Dyes",
    price: "$46",
    colorName: "Terracotta Clay",
    themeColor: "#8D452D",
    bgGradient: ["#FDF3EC", "#F4DFD2"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 110 Q192 85 208 85 T224 105" fill="none" stroke="#C59B6A" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 148 L192 122 L264 148 Q192 138 120 148 Z" fill="#E6CDB2" stroke="#C59B6A" stroke-width="2"/>
      <!-- Boho Dress -->
      <path d="M152 145 Q192 158 232 145 L254 205 Q240 216 226 205 L220 250 L266 414 Q192 428 118 414 L164 250 L158 205 Q144 216 130 205 Z" fill="#D97B59" stroke="#75351E" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Ruffle cap sleeves -->
      <path d="M152 145 Q125 170 130 205" fill="#E28E6E" stroke="#75351E" stroke-width="2"/>
      <path d="M232 145 Q259 170 254 205" fill="#E28E6E" stroke="#75351E" stroke-width="2"/>
      <!-- Geometric Smocking Embroidery -->
      <path d="M165 190 L174 182 L183 190 L192 182 L201 190 L210 182 L219 190" fill="none" stroke="#FFF2E8" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M165 204 L174 196 L183 204 L192 196 L201 204 L210 196 L219 204" fill="none" stroke="#FFF2E8" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M165 218 L174 210 L183 218 L192 210 L201 218 L210 210 L219 218" fill="none" stroke="#5E7A5A" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Tiered flounce seam -->
      <path d="M136 335 Q192 350 248 335" fill="none" stroke="#75351E" stroke-width="2" stroke-dasharray="3,3"/>
      <!-- Hem Trim -->
      <path d="M118 414 Q192 428 266 414" fill="none" stroke="#75351E" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  {
    id: 7,
    name: "Lilac Fairy Tulle Dress",
    category: "Party Ballerina Frock",
    tag: "Soft Sparkle Tulle",
    price: "$52",
    colorName: "Lilac Cloud",
    themeColor: "#6B3B82",
    bgGradient: ["#F9F4FC", "#EDE1F4"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 105 Q192 80 208 80 T224 100" fill="none" stroke="#B49774" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 144 L192 120 L264 144 Q192 136 120 144 Z" fill="#D2B48C" stroke="#B49774" stroke-width="2"/>
      <!-- Satin Bodice -->
      <path d="M156 144 Q192 155 228 144 L220 230 L164 230 Z" fill="#C99DD9" stroke="#5C2E70" stroke-width="2.5"/>
      <!-- Tulle Flutter Wings -->
      <ellipse cx="146" cy="175" rx="18" ry="28" transform="rotate(-25 146 175)" fill="#E4C4F0" opacity="0.85" stroke="#5C2E70" stroke-width="1.5"/>
      <ellipse cx="238" cy="175" rx="18" ry="28" transform="rotate(25 238 175)" fill="#E4C4F0" opacity="0.85" stroke="#5C2E70" stroke-width="1.5"/>
      <!-- Tier 1 Tulle Skirt -->
      <path d="M164 230 L220 230 L242 290 Q192 305 142 290 Z" fill="#D5AEE3" stroke="#5C2E70" stroke-width="2"/>
      <!-- Tier 2 Tulle Skirt -->
      <path d="M142 285 L242 285 L258 350 Q192 368 126 350 Z" fill="#DEBEEB" stroke="#5C2E70" stroke-width="2"/>
      <!-- Tier 3 Tulle Skirt -->
      <path d="M126 345 L258 345 L274 415 Q192 435 110 415 Z" fill="#E8CEF2" stroke="#5C2E70" stroke-width="2.5"/>
      <!-- Satin Waist Ribbon & Rosette -->
      <rect x="160" y="224" width="64" height="12" rx="3" fill="#9B59B6"/>
      <circle cx="192" cy="230" r="6" fill="#F4D03F" stroke="#B7950B" stroke-width="1.5"/>
      <!-- Shimmer Star Accents -->
      <path d="M160 380 L162 386 L168 388 L162 390 L160 396 L158 390 L152 388 L158 386 Z" fill="#FFFFFF"/>
      <path d="M225 365 L227 371 L233 373 L227 375 L225 381 L223 375 L217 373 L223 371 Z" fill="#FFFFFF"/>
      <path d="M190 325 L191 329 L195 330 L191 331 L190 335 L189 331 L185 330 L189 329 Z" fill="#FFFFFF"/>
    `,
  },
  {
    id: 8,
    name: "Forest Corduroy Pinafore",
    category: "Vintage Overall Dress",
    tag: "Plush Corduroy",
    price: "$48",
    colorName: "Deep Forest",
    themeColor: "#08482D",
    bgGradient: ["#EFF5EB", "#DFECDA"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 110 Q192 85 208 85 T224 105" fill="none" stroke="#B49774" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 148 L192 122 L264 148 Q192 138 120 148 Z" fill="#D2B48C" stroke="#B49774" stroke-width="2"/>
      <!-- Pinafore Bib & Straps -->
      <rect x="154" y="140" width="18" height="60" rx="3" fill="#0B5637" stroke="#042618" stroke-width="2"/>
      <rect x="212" y="140" width="18" height="60" rx="3" fill="#0B5637" stroke="#042618" stroke-width="2"/>
      <!-- Brass Buckles -->
      <rect x="152" y="190" width="22" height="12" rx="3" fill="#D4AF37" stroke="#8C7322" stroke-width="1.5"/>
      <rect x="210" y="190" width="22" height="12" rx="3" fill="#D4AF37" stroke="#8C7322" stroke-width="1.5"/>
      <!-- Body & Flare Skirt -->
      <path d="M148 195 L236 195 L232 250 L266 414 Q192 428 118 414 L152 250 Z" fill="#08482D" stroke="#042618" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Corduroy Rib Stripes -->
      <line x1="162" y1="205" x2="162" y2="245" stroke="#126843" stroke-width="2"/>
      <line x1="174" y1="205" x2="174" y2="245" stroke="#126843" stroke-width="2"/>
      <line x1="186" y1="205" x2="186" y2="245" stroke="#126843" stroke-width="2"/>
      <line x1="198" y1="205" x2="198" y2="245" stroke="#126843" stroke-width="2"/>
      <line x1="210" y1="205" x2="210" y2="245" stroke="#126843" stroke-width="2"/>
      <line x1="222" y1="205" x2="222" y2="245" stroke="#126843" stroke-width="2"/>
      <!-- Kangaroo Front Pouch -->
      <path d="M160 300 Q192 312 224 300 L220 350 Q192 358 164 350 Z" fill="#0B5637" stroke="#042618" stroke-width="2"/>
      <!-- Embroidered Acorn detail -->
      <ellipse cx="192" cy="326" rx="5" ry="6" fill="#C59B6A"/>
      <path d="M187 322 Q192 318 197 322 Z" fill="#7A5832"/>
    `,
  },
  {
    id: 9,
    name: "Coral Peach Polka-Dot",
    category: "Party Tea Dress",
    tag: "Combed Cotton",
    price: "$40",
    colorName: "Coral Peach",
    themeColor: "#B84335",
    bgGradient: ["#FDF2ED", "#F8DDD2"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 110 Q192 85 208 85 T224 105" fill="none" stroke="#C59B6A" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 148 L192 122 L264 148 Q192 138 120 148 Z" fill="#E6CDB2" stroke="#C59B6A" stroke-width="2"/>
      <!-- Dress Body -->
      <path d="M154 145 Q192 158 230 145 L252 198 Q240 210 224 200 L218 245 L266 412 Q192 426 118 412 L166 245 L160 200 Q144 210 132 198 Z" fill="#F48C76" stroke="#9E3524" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Peter Pan White Collar -->
      <path d="M166 148 Q180 172 192 168 Q182 148 166 148 Z" fill="#FFFFFF" stroke="#9E3524" stroke-width="1.8"/>
      <path d="M218 148 Q204 172 192 168 Q202 148 218 148 Z" fill="#FFFFFF" stroke="#9E3524" stroke-width="1.8"/>
      <!-- Polka Dots -->
      <circle cx="155" cy="285" r="4.5" fill="#FFFFFF"/>
      <circle cx="192" cy="275" r="4.5" fill="#FFFFFF"/>
      <circle cx="228" cy="285" r="4.5" fill="#FFFFFF"/>
      <circle cx="138" cy="335" r="4.5" fill="#FFFFFF"/>
      <circle cx="172" cy="325" r="4.5" fill="#FFFFFF"/>
      <circle cx="210" cy="330" r="4.5" fill="#FFFFFF"/>
      <circle cx="245" cy="340" r="4.5" fill="#FFFFFF"/>
      <circle cx="152" cy="375" r="4.5" fill="#FFFFFF"/>
      <circle cx="192" cy="370" r="4.5" fill="#FFFFFF"/>
      <circle cx="230" cy="380" r="4.5" fill="#FFFFFF"/>
      <!-- Ric-Rac Hem Trim -->
      <path d="M118 412 Q130 405 142 412 Q154 419 166 412 Q178 405 190 412 Q202 419 214 412 Q226 405 238 412 Q250 419 266 412" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    `,
  },
  {
    id: 10,
    name: "Oatmeal Ribbed Knit Frock",
    category: "Heirloom Knitwear",
    tag: "Merino Wool Blend",
    price: "$58",
    colorName: "Oatmeal Beige",
    themeColor: "#615243",
    bgGradient: ["#F9F7F1", "#EDE6D6"],
    svgIllustration: `
      <!-- Hanger -->
      <path d="M192 108 Q192 84 208 84 T224 104" fill="none" stroke="#B49774" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M120 146 L192 120 L264 146 Q192 138 120 146 Z" fill="#D2B48C" stroke="#B49774" stroke-width="2"/>
      <!-- Knit Top with Ribbing -->
      <path d="M152 145 Q192 155 232 145 L248 200 L218 238 L166 238 L136 200 Z" fill="#E6DFD3" stroke="#665444" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Ribbed Texture -->
      <line x1="164" y1="152" x2="164" y2="236" stroke="#D1C7B7" stroke-width="2"/>
      <line x1="174" y1="154" x2="174" y2="236" stroke="#D1C7B7" stroke-width="2"/>
      <line x1="184" y1="156" x2="184" y2="236" stroke="#D1C7B7" stroke-width="2"/>
      <line x1="200" y1="156" x2="200" y2="236" stroke="#D1C7B7" stroke-width="2"/>
      <line x1="210" y1="154" x2="210" y2="236" stroke="#D1C7B7" stroke-width="2"/>
      <line x1="220" y1="152" x2="220" y2="236" stroke="#D1C7B7" stroke-width="2"/>
      <!-- 3 Natural Wood Buttons -->
      <circle cx="192" cy="172" r="4.5" fill="#A88056" stroke="#665444" stroke-width="1.2"/>
      <circle cx="192" cy="194" r="4.5" fill="#A88056" stroke="#665444" stroke-width="1.2"/>
      <circle cx="192" cy="216" r="4.5" fill="#A88056" stroke="#665444" stroke-width="1.2"/>
      <!-- Flared Muslin Gauze Skirt -->
      <path d="M166 238 L218 238 L266 414 Q192 428 118 414 Z" fill="#F4EFE6" stroke="#665444" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Gathered folds -->
      <path d="M166 238 Q162 330 148 414" fill="none" stroke="#D6CBBA" stroke-width="2"/>
      <path d="M184 238 Q182 330 178 418" fill="none" stroke="#D6CBBA" stroke-width="2"/>
      <path d="M200 238 Q202 330 206 418" fill="none" stroke="#D6CBBA" stroke-width="2"/>
      <path d="M218 238 Q222 330 236 414" fill="none" stroke="#D6CBBA" stroke-width="2"/>
      <!-- Hem Stitch -->
      <path d="M118 414 Q192 428 266 414" fill="none" stroke="#665444" stroke-width="2.5"/>
    `,
  },
];
