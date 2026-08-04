import React from 'react';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { Article } from '../types';

type JournalIndexProps = {
  articles: Article[];
  onOpenArticle: (slug: string) => void;
};

const meta = (article: Article) => `${article.category} · ${article.readMinutes} min read`;

export const JournalIndex: React.FC<JournalIndexProps> = ({ articles, onOpenArticle }) => {
  const [lead, ...rest] = articles;

  return (
    <div className="pb-24">
      <section className="bg-gradient-to-br from-[#eceff4] via-canvas to-[#f2ece4]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-8 md:py-24">
          <p className="eyebrow text-sale">The TechieBase Journal</p>
          <h1 className="mt-2 max-w-4xl text-display-sm text-ink font-semibold sm:text-display md:text-display-lg">
            Advice worth the read.
          </h1>
          <p className="mt-6 max-w-2xl text-body text-ink-secondary md:text-lead">
            Buying guides, trade-in maths and practical fixes, written by the people who set the
            devices up at the counter.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pt-12 md:px-8 md:pt-16">
        {/* Lead story */}
        <button
          type="button"
          onClick={() => onOpenArticle(lead.slug)}
          className="group block w-full overflow-hidden rounded-panel bg-surface text-left shadow-card ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover"
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-[16/10] overflow-hidden bg-canvas md:aspect-auto md:min-h-[380px]">
              <img
                src={lead.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-12">
              <p className="eyebrow text-sale">{meta(lead)}</p>
              <h2 className="mt-3 text-title text-ink font-semibold md:text-headline">{lead.title}</h2>
              <p className="mt-4 text-body text-ink-secondary">{lead.dek}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-footnote font-semibold text-link">
                Read the guide <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </button>

        {/* Everything else */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {rest.map((article) => (
            <button
              key={article.slug}
              type="button"
              onClick={() => onOpenArticle(article.slug)}
              className="group flex min-w-0 flex-col overflow-hidden rounded-card bg-surface text-left shadow-card ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="aspect-[16/10] overflow-hidden bg-canvas">
                <img
                  src={article.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow text-ink-secondary">{meta(article)}</p>
                <h3 className="mt-2 text-lead text-ink font-semibold">{article.title}</h3>
                <p className="mt-2 text-footnote text-ink-secondary">{article.dek}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

type ArticleViewProps = {
  article: Article;
  related: Article[];
  onBack: () => void;
  onOpenArticle: (slug: string) => void;
};

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  related,
  onBack,
  onOpenArticle,
}) => (
  <article className="pb-24">
    {/* Masthead — narrow measure, the way a long read wants to open */}
    <header className="mx-auto max-w-[820px] px-6 pt-10 pb-8 text-center md:pt-16">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex min-h-11 items-center gap-1.5 text-footnote font-medium text-link hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> The TechieBase Journal
      </button>

      <p className="eyebrow text-sale">{article.category}</p>
      <h1 className="mt-3 text-title-lg text-ink font-semibold md:text-headline">{article.title}</h1>
      <p className="mt-5 text-body text-ink-secondary md:text-lead">{article.dek}</p>

      <p className="mt-6 inline-flex items-center gap-2 text-footnote text-ink-tertiary">
        {article.date}
        <span aria-hidden="true">·</span>
        <Clock className="h-3.5 w-3.5" />
        {article.readMinutes} min read
      </p>
    </header>

    <div className="mx-auto max-w-[1100px] px-4 md:px-8">
      <img
        src={article.image}
        alt=""
        className="aspect-[16/9] w-full rounded-panel object-cover"
      />
    </div>

    {/* Body sits on a 680px measure — roughly 70 characters a line */}
    <div className="mx-auto max-w-[680px] px-6 pt-12 md:pt-16">
      {article.body.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <h2 key={index} className="mt-12 mb-3 text-title-sm text-ink font-semibold first:mt-0">
              {block.text}
            </h2>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={index} className="mt-6 space-y-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-body text-ink-secondary">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-tertiary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'callout') {
          return (
            <aside
              key={index}
              className="my-10 rounded-card bg-accent-surface p-6 text-body text-ink ring-1 ring-accent/15"
            >
              {block.text}
            </aside>
          );
        }

        return (
          <p key={index} className="mt-5 text-body text-ink-secondary first:mt-0">
            {block.text}
          </p>
        );
      })}
    </div>

    {related.length > 0 && (
      <section className="mx-auto max-w-[1400px] px-4 pt-20 md:px-8">
        <h2 className="mb-6 text-title-sm text-ink font-semibold">Keep reading</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {related.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => onOpenArticle(item.slug)}
              className="group flex min-w-0 flex-col overflow-hidden rounded-card bg-surface text-left shadow-card ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="aspect-[16/10] overflow-hidden bg-canvas">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <p className="eyebrow text-ink-secondary">{meta(item)}</p>
                <h3 className="mt-2 text-body text-ink font-semibold">{item.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>
    )}
  </article>
);
