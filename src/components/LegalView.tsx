import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { LEGAL_DOCUMENTS, LEGAL_ENTITY, LegalDocument } from '../data/legal';

/** Numbering is derived from position rather than stored in the data, so a
 *  clause can be inserted without renumbering every one after it by hand. */
const clauseNumbers = (document: LegalDocument) => {
  const numbers = new Map<number, number>();
  let next = 1;
  document.body.forEach((block, index) => {
    if (block.type === 'clause') numbers.set(index, next++);
  });
  return numbers;
};

type LegalIndexProps = {
  onOpenDocument: (slug: string) => void;
};

export const LegalIndex: React.FC<LegalIndexProps> = ({ onOpenDocument }) => (
  <div className="mx-auto max-w-[680px] px-6 pb-24 pt-12 md:pt-16">
    <p className="eyebrow text-ink-tertiary">Legal</p>
    <h1 className="mt-2 text-title-lg font-semibold text-ink md:text-headline">
      Policies &amp; terms
    </h1>
    <p className="mt-4 text-body text-ink-secondary">
      The terms {LEGAL_ENTITY} sells and services devices under. These are the same documents
      issued in store.
    </p>

    {/* A list, not cards — three entries do not need chrome, and legal indexes
        are scanned rather than browsed. */}
    <ul className="mt-10 border-t border-hairline-soft">
      {LEGAL_DOCUMENTS.map((document) => (
        <li key={document.slug} className="border-b border-hairline-soft">
          <button
            type="button"
            onClick={() => onOpenDocument(document.slug)}
            className="group flex w-full min-h-11 items-center justify-between gap-6 py-5 text-left"
          >
            <span>
              <span className="block text-lead font-semibold text-ink group-hover:underline">
                {document.title}
              </span>
              <span className="mt-1 block text-footnote text-ink-secondary">
                {document.summary}
              </span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-ink-tertiary group-hover:text-ink"
            />
          </button>
        </li>
      ))}
    </ul>

    <p className="mt-10 text-footnote text-ink-tertiary">
      For anything not covered here, contact the {LEGAL_ENTITY} after-sales department.
    </p>
  </div>
);

type LegalDocumentViewProps = {
  document: LegalDocument;
  onBack: () => void;
};

export const LegalDocumentView: React.FC<LegalDocumentViewProps> = ({ document, onBack }) => {
  const numbers = clauseNumbers(document);

  return (
    /* 680px measure, matching ArticleView — legal text is read, not skimmed,
       and long lines are where people give up. */
    <article className="mx-auto max-w-[680px] px-6 pb-24 pt-10 md:pt-16">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex min-h-11 items-center gap-1.5 text-footnote font-medium text-link hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Legal
      </button>

      <h1 className="text-title-lg font-semibold text-ink md:text-headline">{document.title}</h1>

      <p className="mt-4 text-body text-ink-secondary">{document.summary}</p>

      {document.effectiveDate && (
        <p className="mt-3 text-footnote text-ink-tertiary">
          Effective {document.effectiveDate}
        </p>
      )}

      <div className="mt-10 border-t border-hairline-soft pt-10">
        {document.body.map((block, index) => {
          if (block.type === 'heading') {
            return (
              <h2
                key={index}
                className="mt-12 text-title-sm font-semibold text-ink first:mt-0"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === 'list') {
            return (
              <ul key={index} className="mt-5 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-ink-secondary">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-tertiary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === 'clause') {
            return (
              <section key={index} className="mt-8">
                <h3 className="text-body font-semibold text-ink">
                  {/* The number sits outside the link text so it is not read
                      aloud as part of the clause title. */}
                  <span aria-hidden="true" className="text-ink-tertiary">
                    {numbers.get(index)}.{' '}
                  </span>
                  {block.title}
                </h3>
                <p className="mt-2 text-body text-ink-secondary">{block.text}</p>
                {block.items && (
                  <ul className="mt-3 space-y-2.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 text-body text-ink-secondary">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-tertiary"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          }

          return (
            <p key={index} className="mt-5 text-body text-ink-secondary first:mt-0">
              {block.text}
            </p>
          );
        })}
      </div>
    </article>
  );
};
