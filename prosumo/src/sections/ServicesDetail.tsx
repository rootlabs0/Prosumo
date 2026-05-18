import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import './ServicesDetail.css'

export type ServiceSection = 'flexibility' | 'prediction' | 'community'

export default function ServicesDetail() {
  const navigate = useNavigate()
  const { hash } = useLocation()
  const { lang } = useLang()
  const isEn = lang === 'en'

  // Scroll to the section specified in the URL hash
  useEffect(() => {
    if (!hash) return
    const id = 'sd-' + hash.slice(1) // e.g. #flexibility → sd-flexibility
    const el = document.getElementById(id)
    if (!el) return
    const timer = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    return () => clearTimeout(timer)
  }, [hash])

  // ESC to go back
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate(-1) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [navigate])

  return (
    <div className="sd">
      <header className="sd__header">
        <button className="sd__back" onClick={() => navigate(-1)} aria-label={isEn ? 'Back' : 'Zpět'}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {isEn ? 'Back' : 'Zpět'}
        </button>
        <span className="sd__header-label">{isEn ? 'Our solutions' : 'Naše řešení'}</span>
      </header>

      <div className="sd__body">

        <section id="sd-flexibility" className="sd__section">
          <div className="sd__section-inner">
            <span className="sd__eyebrow">01</span>
            <h2 className="sd__title">{isEn ? 'Flexibility' : 'Flexibilita'}</h2>
            <div className="sd__text">
              {isEn ? (
                <>
                  <p>By connecting a given PV plant, battery, or other asset to the aggregator/trader's system, we enable the aggregator/trader to send control commands or upload a schedule for a specific time period via the Prosumo system.</p>
                  <p>If the consumption point combines various flexibility sources, the Prosumo algorithm calculates the volume of balancing energy within the given time period and determines its value.</p>
                  <p>Prosumo then communicates with the local EMS control system, to which it transmits these control instructions, and which subsequently executes them.</p>
                  <p>If the consumption point does not have a control system, Prosumo will provide its own gateway to facilitate communication between the Aggregator and the given generation facility (device), either by integrating it into the existing RTU, where it functions as a passive element, or through direct communication with the device.</p>
                  <p>In the Prosumo system, it is possible to create a Sub-Aggregation Block, i.e., to link multiple consumption points into a single functional unit that the aggregator/trader can easily work with.</p>
                  <p>Everything can be very easily set up and put into operation in the Prosumo app.</p>
                </>
              ) : (
                <>
                  <p>Propojení dané výrobny FVE, baterie nebo jiného asetu se systémem agregátora / obchodníka, tím umožníme agregátorovi / obchodníkovi skrze systém Prosumo zasílat regulační příkazy, nebo nahrát plán pro určité časové rozmezí.</p>
                  <p>Pokud se jedná o odběrné místo s kombinací různých zdrojů flexibility, vypočítá algoritmus Prosumo objem regulační energie v daném časovém rozmezí a provede její ocenění.</p>
                  <p>Prosumo následně komunikuje s lokálním řídícím systémem EMS, kterému tyto regulační pokyny předá a který je následně zrealizuje.</p>
                  <p>V případě, že odběrné místo nedisponuje řídícím systémem, dodá Prosumo vlastní gateway, která komunikaci mezi Agregátorem a danou výrobnou (zařízením) zajistí, buď integrací do stávajícího RTU, kde funguje jako pasivní prvek, nebo přímou komunikací s daným zařízením.</p>
                  <p>V systému Prosumo je možné vytvořit Sub Agregační Blok, tzn. propojit více odběrných míst do jednoho funkčního celku, se kterým může agregátor / obchodník snadno pracovat.</p>
                  <p>Vše lze velmi jednoduše nastavit a zprovoznit v aplikaci Prosumo.</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section id="sd-prediction" className="sd__section">
          <div className="sd__section-inner">
            <span className="sd__eyebrow">02</span>
            <h2 className="sd__title">{isEn ? 'More Accurate PV Production Forecasts and AI Diagnostics' : 'Přesnější předpověď výroby FVE a AI diagnostika'}</h2>
            <div className="sd__text">
              {isEn ? (
                <>
                  <p>The Prosumo forecasting model receives real-time production data, based on which it continuously adjusts itself. For precise information on PV production, we use accurate irradiance sensors, which enable more accurate calculations for aggregators/traders and also serve as the basis for PV AI Diagnostics.</p>
                  <p>Prosumo's AI Diagnostics can continuously evaluate whether each string within an installed PV system is functioning correctly and supplying an adequate amount of energy.</p>
                </>
              ) : (
                <>
                  <p>Předpovědní model Prosumo dostává aktuální data z výroby, na základě kterých se průběžně upravuje. Pro přesné informace o výrobě FVE používáme přesné čidla osvitu, která umožnují jednak přesnější výpočty pro agregátory / obchodníky a zároveň slouží jako základ pro AI Diagnostiku FVE.</p>
                  <p>AI Diagnostika Prosumo dokáže kontinuálně vyhodnocovat, zda každý string v rámci instalované FVE pracuje správně a dodává adekvátní množství energie.</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section id="sd-community" className="sd__section">
          <div className="sd__section-inner">
            <span className="sd__eyebrow">03</span>
            <h2 className="sd__title">{isEn ? 'Energy communities' : 'Energetické komunity'}</h2>
            <div className="sd__text">
              {isEn ? (
                <>
                  <p>Managing consumption and production within a community to maximize self-consumption and member savings.</p>
                  <p>The Prosumo system monitors the amount of available energy in the energy community and provides this information to individual consumption points (local EMS), which can then utilize this available energy within the community (activate consumption).</p>
                  <p>Thanks to the Prosumo system, the community also becomes attractive to traders, who have an overview of the total energy balance over a given time period.</p>
                </>
              ) : (
                <>
                  <p>Řízení spotřeby a výroby v rámci komunity s cílem maximalizovat vlastní využití energie a ekonomiku členů.</p>
                  <p>Systém Prosumo sleduje množství volné energie v energetické komunitě a tyto informace poskytuje jednotlivým odběrným místům (lokální EMS), které tak dokáží tuto volnou energii v rámci dané komunity využít (aktivovat spotřebu).</p>
                  <p>Komunita se díky systému Prosumo stává rovněž zajímavou pro obchodníka, který má přehled o celkové bilanci energie v daném časovém období.</p>
                </>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

