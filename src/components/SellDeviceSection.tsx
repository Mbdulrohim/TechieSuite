import React, { useId, useState } from 'react';
import { BadgeCheck, ChevronDown, ChevronRight } from 'lucide-react';
import {
  DEFAULT_SELL_GRADE,
  SELL_CONDITION_GRADES,
  SELL_DEVICE_FAMILIES,
  SELL_PAYOUT_CEILING,
  buildSellEnquiryHref,
  findSellGrade,
  quoteFor,
  type SellCashQuote,
  type SellDeviceFamily,
  type SellDeviceModel,
  type SellGrade,
} from '../data/sellDevice';
import { formatNaira } from '../utils';

export interface SellDeviceLead {
  model: SellDeviceModel;
  grade: SellGrade;
  /** USD-scale, like every price in the catalogue. */
  quote: SellCashQuote;
}

export interface SellDeviceSectionProps {
  /** Anchor target, so the footer or navbar can link straight here. */
  id?: string;
  /** Override the catalogue of devices the shop buys. Defaults to the data file. */
  families?: readonly SellDeviceFamily[];
  /**
   * Fires when the customer opens the WhatsApp hand-off — the only moment a
   * lead exists. Wire analytics or a future POST here; the deeplink opens
   * either way, so this is free to ignore.
   */
  onRequestOffer?: (lead: SellDeviceLead) => void;
  /** Escape hatch for section spacing when placed between other sections. */
  className?: string;
}

/**
 * Sell your device — an outright cash sale, where TechieBase buys the handset
 * or laptop and pays for it. Distinct from `TradeInBanner`, which is credit
 * toward a new purchase; the two sit apart on the page on purpose.
 *
 * Pick a device, pick a condition, read the band, hand off. The quote updates
 * live rather than hiding behind a "calculate" button, because the number is
 * the whole reason anyone touches this section.
 *
 * NO BACKEND. The WhatsApp deeplink is the submission — it carries the device,
 * the condition and the quoted band so the shop can answer with a firm offer
 * first time. Replace `handleRequestOffer` when the API exists.
 */
export const SellDeviceSection: React.FC<SellDeviceSectionProps> = ({
  id,
  families = SELL_DEVICE_FAMILIES,
  onRequestOffer,
  className = '',
}) => {
  const fieldId = useId();
  const firstModel = families[0]?.models[0];

  const [selectedModelId, setSelectedModelId] = useState(firstModel?.id ?? '');
  const [grade, setGrade] = useState<SellGrade>(DEFAULT_SELL_GRADE);

  const allModels = families.flatMap((family) => family.models);
  const model = allModels.find((entry) => entry.id === selectedModelId) ?? firstModel;

  // An empty catalogue means nothing to quote — rendering an empty picker would
  // be worse than rendering nothing.
  if (!model) return null;

  const quote = quoteFor(model, grade);
  const quoteText = `${formatNaira(quote.low)}–${formatNaira(quote.high)}`;
  const gradeDetail = findSellGrade(grade);

  const handleRequestOffer = () => {
    onRequestOffer?.({ model, grade, quote });
  };

  return (
    <section
      id={id}
      className={`border-t border-hairline-soft bg-surface py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <p className="eyebrow text-ink-tertiary">Sell your device</p>

        <h2 className="mt-3 text-title font-semibold text-ink md:text-headline">
          Turn your old device into cash.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-body text-ink-secondary">
          We buy iPhones, Galaxy phones, MacBooks and laptops outright — up to{' '}
          {formatNaira(SELL_PAYOUT_CEILING)}, paid the day we inspect it. No purchase required.
        </p>

        <div className="mx-auto mt-12 max-w-md">
          <label htmlFor={`${fieldId}-device`} className="sr-only">
            Device you want to sell
          </label>

          <div className="relative">
            <select
              id={`${fieldId}-device`}
              value={model.id}
              onChange={(event) => setSelectedModelId(event.target.value)}
              className="min-h-11 w-full appearance-none rounded-control border border-hairline bg-surface px-4 pr-11 text-body text-ink transition-colors ease-apple hover:border-ink-tertiary focus:border-accent focus:outline-none"
            >
              {families.map((family) => (
                <optgroup key={family.id} label={family.label}>
                  {family.models.map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary"
            />
          </div>

          {/* Condition: real radios inside labels, so the segmented control is
              keyboard- and screen-reader-native rather than a div pretending. */}
          <fieldset className="mt-4">
            <legend className="sr-only">Condition of your device</legend>

            <div className="flex w-full gap-1 rounded-full bg-surface-sunken p-1">
              {SELL_CONDITION_GRADES.map((entry) => {
                const isActive = entry.grade === grade;
                return (
                  <label
                    key={entry.grade}
                    className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full px-3 text-footnote transition-colors ease-apple ${
                      isActive
                        ? 'bg-surface font-semibold text-ink'
                        : 'text-ink-secondary hover:text-ink'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${fieldId}-grade`}
                      value={entry.grade}
                      checked={isActive}
                      onChange={() => setGrade(entry.grade)}
                      className="sr-only"
                    />
                    {entry.grade}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <p className="mt-3 min-h-11 text-footnote text-ink-tertiary">{gradeDetail.summary}</p>
        </div>

        <div className="mt-10">
          <p className="text-caption text-ink-secondary">Indicative cash offer</p>

          <p
            aria-live="polite"
            className="mt-2 text-title-lg font-semibold text-ink md:text-display-sm"
          >
            {quoteText}
          </p>

          <p className="mx-auto mt-4 flex max-w-md items-center justify-center gap-2 text-caption text-ink-tertiary">
            <BadgeCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-success" />
            An estimate only. The final offer is confirmed after a free inspection in store.
          </p>
        </div>

        <a
          href={buildSellEnquiryHref(model.name, grade, quoteText)}
          target="_blank"
          rel="noreferrer"
          onClick={handleRequestOffer}
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-7 text-footnote font-semibold text-white transition-colors ease-apple hover:bg-black active:scale-[0.98]"
        >
          Get my offer on WhatsApp
        </a>

        <p className="mt-6 text-caption text-ink-secondary">
          <a
            href={buildSellEnquiryHref('Device not listed')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-link hover:underline"
          >
            Selling something else? Ask us <ChevronRight aria-hidden="true" className="ml-0.5 h-4 w-4" />
          </a>
        </p>
      </div>
    </section>
  );
};
