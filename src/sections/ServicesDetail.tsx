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
                  <h3>How the Service Works – The Principle</h3>
                  <p>The system is built on a three-layer architecture, with the layers continuously communicating with one another and mutually enhancing each other's performance:</p>

                  <h4>Layer 1 – Data Collection and Aggregation</h4>
                  <p>The foundation of the system consists of local irradiance sensors (pyranometers) that measure the actual intensity of solar radiation at the installation site. This data is combined with:</p>
                  <ul>
                    <li>numerical weather predictions (NWP) and satellite cloud imagery</li>
                    <li>historical production data from your PV system and neighboring installations in the same location</li>
                    <li>data from photovoltaic inverters—power, voltage, and current of individual strings</li>
                  </ul>

                  <h4>Layer 2 – AI Models and Predictions</h4>
                  <p>The collected data is processed using advanced AI models:</p>
                  <ul>
                    <li>LSTM (Long Short-Term Memory) neural networks model time series and capture local weather patterns with greater accuracy than standard meteorological services</li>
                    <li>clustering groups similar PV installations and redistributes prediction corrections to installations without direct measurements</li>
                    <li>A diagnostic module compares actual production with model expectations—deviations above a threshold are evaluated as potential faults</li>
                    <li>The models continuously learn from the processed data (feedback) and refine their predictions over time</li>
                  </ul>

                  <h4>Layer 3 – Results and Integration</h4>
                  <p>Results are delivered through all necessary channels:</p>
                  <ul>
                    <li>MQTT / REST API / Modbus TCP – production predictions are directly available to energy management systems and battery storage systems (without the need to modify existing equipment)</li>
                    <li>Web interface with an overview of performance, predictions, and PV system status</li>
                    <li>Automatic notifications (email, SMS) upon detection of anomalies or malfunctions</li>
                  </ul>

                  <h3>Solution Architecture</h3>
                  <p>The system consists of hardware and software components that together ensure data collection, prediction calculations, and visualization of results. The configuration depends on whether you are already using a compatible control system:</p>

                  <h4>ProsumoBox – Data Gateway</h4>
                  <p>ProsumoBox is a compact industrial device installed directly at the customer's site. It performs two basic functions:</p>
                  <ul>
                    <li>collecting data from solar radiation sensors and the photovoltaic system (RTU or EMS)</li>
                    <li>receiving predicted production values from the cloud platform and making them available to the customer's control system via a local communication interface</li>
                  </ul>

                  <h4>Solar Radiation Sensors</h4>
                  <p>Calibrated pyranometers (solar radiation sensors) are connected to the ProsumoBox. For maximum prediction and diagnostic accuracy, we recommend installing two sensors: the first measures global horizontal irradiance (GHI), and the second measures irradiance in the plane of the panels (POA). Combining both values significantly improves the accuracy of predictions and fault detection.</p>

                  <p><strong>Tip:</strong> If you are using the EnergoStation EMS or RTU, the ProsumoBox is not required. These devices have the necessary communication layer, and data collection takes place directly through them. This makes integration into your existing infrastructure significantly easier.</p>
                </>
              ) : (
                <>
                  <h3>Jak služba funguje – princip</h3>
                  <p>Systém je postaven na třívrstvé architektuře, které spolu nepřetržitě komunikují a vzájemně se zlepšují:</p>

                  <h4>Vrstva 1 – sběr a agregace dat</h4>
                  <p>Základem systému jsou lokální senzory ozáření (pyranometry), které měří skutečnou intenzitu slunečního záření v místě instalace. Tato data jsou kombinována s:</p>
                  <ul>
                    <li>meteorologickými numerickými predikcemi (NWP) a satelitními snímky oblačnosti</li>
                    <li>historickými daty výroby vaší FVE i sousedních instalací ve stejné lokalitě</li>
                    <li>daty z fotoelektrických měničů (střídačů) – výkon, napětí, proud jednotlivých stringů</li>
                  </ul>

                  <h4>Vrstva 2 – AI modely a predikce</h4>
                  <p>Sebraná data jsou zpracována pokročilými AI modely:</p>
                  <ul>
                    <li>LSTM neuronové sítě (Long Short-Term Memory) modelují časové řady a zachytávají lokální charakter počasí s přesností vyšší než běžné meteorologické služby</li>
                    <li>shluková analýza (clustering) seskupuje podobné FVE instalace a redistribuuje korekce predikcí i na instalace bez přímého měření</li>
                    <li>diagnostický modul porovnává skutečnou výrobu s modelovým očekáváním – odchylky nad prahem jsou vyhodnoceny jako potenciální závada</li>
                    <li>modely se průběžně učí ze zpracovaných dat (zpětná vazba) a zpřesňují predikce v čase</li>
                  </ul>

                  <h4>Vrstva 3 – výsledky a integrace</h4>
                  <p>Výsledky jsou dodávány všemi potřebnými kanály:</p>
                  <ul>
                    <li>MQTT / REST API / Modbus TCP – predikce výroby jsou přímo dostupné pro energetické řídicí systémy a bateriová úložiště (bez nutnosti změny existujícího vybavení)</li>
                    <li>webové rozhraní s přehledem výkonu, predikcí a stavu FVE</li>
                    <li>automatické notifikace (e-mail, SMS) při detekci anomálie nebo poruchy</li>
                  </ul>

                  <h3>Architektura řešení</h3>
                  <p>Systém se skládá z hardwarové a softwarové části, které dohromady zajišťují sběr dat, výpočet predikce a vizualizaci výsledků. Způsob zapojení závisí na tom, zda již používáte kompatibilní řídicí systém:</p>

                  <h4>ProsumoBox – datová brána (gateway)</h4>
                  <p>ProsumoBox je kompaktní průmyslové zařízení instalované přímo u zákazníka. Zajišťuje dvě základní funkce:</p>
                  <ul>
                    <li>sběr dat ze senzorů solární radiace a z fotovoltaického systému (RTU nebo EMS)</li>
                    <li>příjem predikovaných hodnot výroby z cloudové platformy a jejich zpřístupnění řídicímu systému zákazníka přes lokální komunikační rozhraní</li>
                  </ul>

                  <h4>Senzory solární radiace</h4>
                  <p>K ProsumoBoxu se připojují kalibrované pyranometry (senzory solární radiace). Pro maximální přesnost predikce a diagnostiky doporučujeme instalaci <strong>2 senzorů</strong>: první měří celkové horizontální záření (GHI), druhý záření v rovině panelů (POA). Kombinace obou hodnot výrazně zpřesní predikci i detekci závad.</p>

                  <p><strong>Tip:</strong> Pokud používáte <strong>EMS nebo RTU EnergoStation</strong>, ProsumoBox <strong>není potřeba</strong>. Tato zařízení disponují potřebnou komunikační vrstvou a sběr dat probíhá přímo přes ně. Integrace do stávající infrastruktury je tak výrazně jednodušší.</p>
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

