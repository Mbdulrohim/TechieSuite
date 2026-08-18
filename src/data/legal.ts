/**
 * Legal documents, transcribed from the signed originals.
 *
 * THIS FILE IS NOT COPYWRITING. Everything below is a faithful transcription of
 * a document the business already issues on paper — the warranty policy comes
 * from the scanned "Warranty Service Policy & Procedures" sheet. Wording may be
 * re-typeset (headings, list structure) but never reworded, softened or
 * extended. If a term needs to change, it changes on the paper document first
 * and is copied here afterwards, not the other way round.
 *
 * Do not add a policy here that the business has not actually written. An
 * invented returns or privacy policy is a promise the shop never made and would
 * be held to anyway.
 */

/**
 * The registered business name. Legal pages and the copyright line use this;
 * the storefront keeps using the trading name "TechieBase".
 *
 * MISMATCH WITH THE PAPER DOCUMENT — worth resolving off-screen. The scanned
 * warranty sheet is issued by "TECHIE BASE ENTERPRISE", but the business is a
 * limited company, so the site says Ltd on instruction. An Enterprise is a
 * Nigerian business-name registration and a Ltd is a separate incorporated
 * entity; they are not the same legal person, and a warranty is a promise by
 * whichever one is named on it. Whatever the history, the printed sheet and the
 * published policy should not name different entities — reprint the sheet, or
 * change this back.
 */
export const LEGAL_ENTITY = 'Techie Base Ltd';

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  /** A numbered term. `items` renders as sub-points beneath the clause text. */
  | { type: 'clause'; title: string; text: string; items?: string[] };

export interface LegalDocument {
  slug: string;
  title: string;
  /** One line, shown on the legal index and used as the meta description. */
  summary: string;
  /**
   * Effective date, or null when the source document is undated.
   *
   * The scanned warranty sheet carries no date, so there is nothing honest to
   * put here yet and the page renders no date rather than inventing one. Set it
   * to the date the policy actually took effect once that is known.
   */
  effectiveDate: string | null;
  body: LegalBlock[];
}

const WARRANTY: LegalDocument = {
  slug: 'warranty',
  title: 'Warranty Service Policy & Procedures',
  summary:
    'What is covered on new and pre-owned devices, how to claim, and what falls outside the warranty.',
  effectiveDate: null,
  body: [
    {
      type: 'paragraph',
      text: `${LEGAL_ENTITY} provides warranty services for our diverse range of products. Below is a description of the services offered for each product group.`,
    },
    {
      type: 'paragraph',
      text: `All pre-owned products sold by ${LEGAL_ENTITY} come with a specified warranty period. New devices purchased from ${LEGAL_ENTITY} are covered under the standard manufacturer's warranty and can be redeemed at authorized Manufacturer Warranty/Service Centers in Nigeria.`,
    },
    {
      type: 'paragraph',
      text: `For all products and after-sales inquiries, please direct your concerns to the appropriate Manufacturer Warranty Centers for new devices or to the ${LEGAL_ENTITY} after-sales department for pre-owned devices.`,
    },

    { type: 'heading', text: 'General terms & conditions' },

    {
      type: 'clause',
      title: 'Warranty validity',
      text: `The warranty is valid only upon presentation of proof of purchase, which must consist of the original invoice or sales slip indicating the date of purchase, dealer's name, model, and serial number of the product. ${LEGAL_ENTITY} reserves the right to refuse warranty claims if this information has been altered or removed after the original purchase.`,
    },
    {
      type: 'clause',
      title: `Obligations of ${LEGAL_ENTITY}`,
      text: 'Our obligations are limited to the repair of defects, replacement of defective parts, or, at our discretion, the replacement of the entire product.',
    },
    {
      type: 'clause',
      title: 'Service requirements for used products',
      text: `Warranty repairs for used products must be performed by a ${LEGAL_ENTITY} authorized service center. The warranty will be void if repairs are attempted by any unauthorized service center. ${LEGAL_ENTITY} is not liable for any reimbursement claims or damages arising from unauthorized repairs.`,
    },
    {
      type: 'clause',
      title: 'Warranty period',
      text: 'Repairs or replacements conducted under this warranty do not extend or renew the warranty period. Any repairs or replacements may utilize functional exchange units.',
    },
    {
      type: 'clause',
      title: 'Exclusions from warranty',
      text: 'This warranty applies solely to defects in material, design, and workmanship. It does not cover the following:',
      items: [
        'Routine maintenance, repairs, or part replacements due to normal wear and tear.',
        "Abuse or misuse, including failure to use the product for its intended purpose or according to the manufacturer's instructions.",
        'Defects resulting from using non-approved accessories or improper installation.',
        `Damage caused by accidents, natural disasters, electrical surges, water, fire, public disturbances, improper ventilation, voltage fluctuations, or any causes beyond ${LEGAL_ENTITY}'s control.`,
        'Unauthorized modifications to the product.',
        'Battery damage due to overcharging or failure to follow specific usage instructions in the product user manual.',
        // On the paper document this sentence runs on from the battery bullet
        // above, which reads as a layout slip rather than intent — it is a
        // distinct exclusion and is set as one here. Wording is unchanged.
        "Alteration, removal, or illegibility of the product's serial number.",
        'Use of non-approved chargers for the batteries.',
        'Any broken seals on the battery enclosure indicating tampering.',
      ],
    },
    {
      type: 'clause',
      title: 'Statutory rights',
      text: `This warranty does not affect the customer's statutory rights or rights against ${LEGAL_ENTITY}.`,
    },
    {
      type: 'clause',
      title: 'Non-transferability',
      text: `This warranty is non-transferable. It serves as the purchaser's sole and exclusive remedy, and neither ${LEGAL_ENTITY} nor its authorized service centers shall be liable for any incidental or consequential damages or any breach of express or implied warranties related to the product.`,
    },

    { type: 'heading', text: 'Disclaimer' },
    {
      type: 'paragraph',
      text: `${LEGAL_ENTITY} is not liable for the loss of any saved or stored data in products that are repaired or replaced. Customers will be responsible for any costs associated with non-warranty conditions. ${LEGAL_ENTITY} reserves the right to make the final determination regarding product issues and the appropriate service options. Replacement units will retain the remaining warranty of the original product.`,
    },
  ],
};

/**
 * Every legal document the site publishes.
 *
 * Privacy Policy and Terms of Sale are deliberately absent: the business has
 * not written them, and the footer links to both. See the note in `Footer.tsx`.
 */
export const LEGAL_DOCUMENTS: LegalDocument[] = [WARRANTY];

export const legalBySlug = (slug: string): LegalDocument | undefined =>
  LEGAL_DOCUMENTS.find((document) => document.slug === slug);
