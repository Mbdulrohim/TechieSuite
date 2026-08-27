import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { ProductBundle, ProductColor } from '../types';
import { formatNaira, variantImage } from '../utils';

interface BundleSectionProps {
  bundle: ProductBundle;
  onAddBundleToCart: (
    bundle: ProductBundle,
    selectedAccessories: string[],
    selectedColor: ProductColor,
  ) => void;
}

export const BundleSection: React.FC<BundleSectionProps> = ({ bundle, onAddBundleToCart }) => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(
    bundle.accessories.map((accessory) => accessory.id),
  );
  const [selectedMainColor, setSelectedMainColor] = useState<ProductColor>(
    bundle.mainProduct.colors[0],
  );
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const selectedAccessoryProducts = bundle.accessories.filter((accessory) =>
    selectedAccessories.includes(accessory.id),
  );
  const regularTotal = bundle.mainProduct.price
    + selectedAccessoryProducts.reduce((sum, accessory) => sum + accessory.price, 0);
  const fullBundleSelected = selectedAccessories.length === bundle.accessories.length;
  const discountRate = fullBundleSelected ? 0.08 : 0.04;
  const bundleSavings = Math.round(regularTotal * discountRate);
  const finalBundlePrice = regularTotal - bundleSavings;

  const isGamingBundle = /ps5|playstation/i.test(`${bundle.id} ${bundle.title}`);
  const theme = isGamingBundle
    ? {
        shell: 'bg-[#080b16] text-white ring-white/10',
        glow: 'bg-blue-500/25',
        wash: 'from-[#172554] via-[#0f172a] to-[#080b16]',
        eyebrow: 'text-blue-300',
        muted: 'text-slate-300',
        button: 'bg-blue-600 hover:bg-blue-500',
        panel: 'bg-white/[0.07] ring-white/10',
        selected: 'bg-blue-500/15 ring-blue-400/60',
      }
    : {
        shell: 'bg-[#efe9df] text-ink ring-black/[0.05]',
        glow: 'bg-brand/25',
        wash: 'from-[#ded4c5] via-[#f2ede5] to-[#e7e1d7]',
        eyebrow: 'text-brand-deep',
        muted: 'text-ink-secondary',
        button: 'bg-accent hover:bg-accent-hover',
        panel: 'bg-white/70 ring-black/[0.06]',
        selected: 'bg-white ring-accent/60',
      };

  const toggleAccessory = (accessoryId: string) => {
    setSelectedAccessories((current) =>
      current.includes(accessoryId)
        ? current.filter((id) => id !== accessoryId)
        : [...current, accessoryId],
    );
  };

  const handleAdd = () => {
    onAddBundleToCart(bundle, selectedAccessories, selectedMainColor);
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className={`relative overflow-hidden rounded-panel shadow-panel ring-1 ${theme.shell}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.wash}`} aria-hidden="true" />
        <div className={`absolute -right-20 -top-32 h-96 w-96 rounded-full blur-3xl ${theme.glow}`} aria-hidden="true" />

        <div className="relative grid min-h-[430px] items-center gap-8 px-6 py-10 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-14 lg:px-14">
          <div className="relative z-10 max-w-xl">
            <p className={`inline-flex items-center gap-2 text-footnote font-semibold ${theme.eyebrow}`}>
              <Sparkles className="h-4 w-4" /> Curated by TechieBase
            </p>
            <h2 className="mt-3 text-headline font-semibold leading-[1.04] md:text-display-sm">
              {bundle.title}
            </h2>
            <p className={`mt-4 max-w-lg text-body leading-relaxed ${theme.muted}`}>
              {bundle.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-caption font-semibold text-emerald-600 ring-1 ring-emerald-500/25">
                Save {formatNaira(bundleSavings)}
              </span>
              <span className={`text-caption ${theme.muted}`}>
                {1 + selectedAccessories.length} items · free express delivery
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAdd}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-footnote font-semibold text-white shadow-lg transition-all active:scale-[0.98] ${isAdded ? 'bg-emerald-600' : theme.button}`}
              >
                {isAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                {isAdded ? 'Bundle added' : `Add bundle · ${formatNaira(finalBundlePrice)}`}
              </button>
              <button
                type="button"
                onClick={() => setShowCustomizer((open) => !open)}
                aria-expanded={showCustomizer}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-footnote font-semibold ring-1 transition-colors ${theme.panel}`}
              >
                Customise bundle
                {showCustomizer ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="relative mx-auto flex h-[300px] w-full max-w-[570px] items-end justify-center" aria-label="Products included in bundle">
            <div className={`absolute inset-x-8 bottom-2 h-20 rounded-[50%] blur-2xl ${isGamingBundle ? 'bg-blue-400/20' : 'bg-black/10'}`} />
            {bundle.accessories.slice(0, 2).map((accessory, index) => (
              <img
                key={accessory.id}
                src={accessory.imageUrl}
                alt={accessory.name}
                className={`absolute bottom-8 h-36 w-36 object-contain drop-shadow-2xl sm:h-44 sm:w-44 ${index === 0 ? 'left-0 -rotate-6' : 'right-0 rotate-6'}`}
              />
            ))}
            <img
              src={variantImage(bundle.mainProduct, { selectedColor: selectedMainColor }) || bundle.mainProduct.imageUrl}
              alt={bundle.mainProduct.name}
              className="relative z-10 h-64 w-64 object-contain drop-shadow-2xl sm:h-72 sm:w-72"
            />
          </div>
        </div>

        {showCustomizer && (
          <div className={`relative border-t p-5 backdrop-blur-xl md:p-8 ${isGamingBundle ? 'border-white/10 bg-[#080b16]/85' : 'border-black/[0.06] bg-white/55'}`}>
            <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr_0.9fr] lg:items-stretch">
              <ProductChoice
                label="Main product"
                name={bundle.mainProduct.name}
                image={variantImage(bundle.mainProduct, { selectedColor: selectedMainColor }) || bundle.mainProduct.imageUrl}
                price={bundle.mainProduct.price}
                className={theme.panel}
              >
                <div className="mt-4 flex flex-wrap gap-2 border-t border-current/10 pt-4" aria-label="Choose finish">
                  {bundle.mainProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedMainColor(color)}
                      aria-label={color.name}
                      aria-pressed={selectedMainColor.name === color.name}
                      className={`h-6 w-6 rounded-full border-2 transition-shadow ${selectedMainColor.name === color.name ? 'ring-2 ring-accent ring-offset-2' : 'border-black/10'}`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </ProductChoice>

              {bundle.accessories.map((accessory) => {
                const selected = selectedAccessories.includes(accessory.id);
                return (
                  <React.Fragment key={accessory.id}>
                    <div className="hidden items-center justify-center lg:flex"><Plus className={`h-5 w-5 ${theme.muted}`} /></div>
                    <button
                      type="button"
                      onClick={() => toggleAccessory(accessory.id)}
                      aria-pressed={selected}
                      className={`rounded-card p-5 text-left ring-1 transition-all ${selected ? theme.selected : `${theme.panel} opacity-55 hover:opacity-90`}`}
                    >
                      <span className="flex items-center justify-between gap-3 text-micro font-semibold uppercase tracking-wide">
                        Accessory
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full ring-1 ${selected ? 'bg-accent text-white ring-accent' : 'ring-current/20'}`}>
                          {selected && <Check className="h-3 w-3" />}
                        </span>
                      </span>
                      <img src={accessory.imageUrl} alt="" className="mx-auto my-4 h-24 w-24 object-contain" />
                      <span className="block text-footnote font-semibold">{accessory.name}</span>
                      <span className={`mt-1 block text-caption ${theme.muted}`}>{formatNaira(accessory.price)}</span>
                    </button>
                  </React.Fragment>
                );
              })}

              <aside className={`rounded-card p-6 ring-1 ${theme.panel}`}>
                <p className={`text-caption ${theme.muted}`}>Your bundle</p>
                <p className="mt-2 text-title-sm font-semibold">{formatNaira(finalBundlePrice)}</p>
                <p className="mt-1 text-caption text-emerald-600">You save {formatNaira(bundleSavings)}</p>
                <button type="button" onClick={handleAdd} className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-footnote font-semibold text-white ${theme.button}`}>
                  <ShoppingBag className="h-4 w-4" /> Apply and add
                </button>
              </aside>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductChoice: React.FC<{
  label: string;
  name: string;
  image: string;
  price: number;
  className: string;
  children?: React.ReactNode;
}> = ({ label, name, image, price, className, children }) => (
  <article className={`rounded-card p-5 ring-1 ${className}`}>
    <span className="text-micro font-semibold uppercase tracking-wide">{label}</span>
    <img src={image} alt="" className="mx-auto my-4 h-24 w-24 object-contain" />
    <h3 className="text-footnote font-semibold">{name}</h3>
    <p className="mt-1 text-caption opacity-70">{formatNaira(price)}</p>
    {children}
  </article>
);
