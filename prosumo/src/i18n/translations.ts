import type { Lang } from '../context/LangContext'

type Bilingual<T> = Record<Lang, T>

export const translations = {
  nav: {
    links: {
      cs: [
        { label: 'Naše řešení', href: '#industries' },
        { label: 'Obchod', href: 'https://eshop.prosumo.eu' },
      ],
      en: [
        { label: 'Our Solutions', href: '#industries' },
        { label: 'Shop', href: 'https://eshop.prosumo.eu' },
      ],
    } as Bilingual<{ label: string; href: string }[]>,
    cta: { cs: 'Kontaktujte nás', en: 'Request Demo' } as Bilingual<string>,
  },

  hero: {
    headline1: { cs: 'Propojujeme', en: 'We Connect' } as Bilingual<string>,
    headline1b: { cs: 'Svět', en: 'The World' } as Bilingual<string>,
    headline2: { cs: 'Energií', en: 'Of Energy' } as Bilingual<string>,
    subline: {
      cs: 'Využijte sílu predikcí, diagnostiky a flexibility k dosažení vyšších výnosů a lepší návratnosti vašich energetických systémů.',
      en: 'Harness the power of forecasting, diagnostics and flexibility to increase returns and improve the performance of your energy systems.',
    } as Bilingual<string>,
    metrics: {
      cs: [
        { value: '38 %', label: 'úspora nákladů' },
        { value: '2 400+', label: 'instalací' },
        { value: '<15 min', label: 'nastavení' },
        { value: '99,97 %', label: 'dostupnost' },
      ],
      en: [
        { value: '38%', label: 'cost reduction' },
        { value: '2,400+', label: 'deployments' },
        { value: '<15 min', label: 'setup' },
        { value: '99.97%', label: 'uptime' },
      ],
    } as Bilingual<{ value: string; label: string }[]>,
    cta1: { cs: 'Kontaktujte nás', en: 'Request Demo' } as Bilingual<string>,
    cta2: { cs: 'Chci vědět vice', en: 'See more' } as Bilingual<string>,
  },

  platform: {
    kicker: { cs: 'Navrženo pro', en: 'Built For' } as Bilingual<string>,
    title1: { cs: '4 sektory.', en: '4 Sectors.' } as Bilingual<string>,
    title2: { cs: 'Jedna platforma.', en: 'One Platform.' } as Bilingual<string>,
    sectors: {
      cs: [
        {
          label: 'PRŮMYSL',
          title: 'Napájení výrobní linky.',
          description:
            'Prosumo optimalizuje spotřebu energie napříč výrobními linkami, kompresory a HVAC — snižuje náklady na elektřinu bez dopadu na produkci.',
        },
        {
          label: 'KOMERČNÍ NEMOVITOSTI',
          title: 'Chytřejší budovy, nižší OPEX.',
          description:
            'Od kancelářských věží po obchodní centra — Prosumo plánuje zatížení budov podle cen SPOT a přináší měřitelné úspory na každém účtu za energii.',
        },
        {
          label: 'DATOVÁ CENTRA',
          title: 'Dostupnost ve velkém měřítku.',
          description:
            'Prosumo zpřístupňuje prediktivní řízení potřebné k provozu hyperscale a colocation zařízení při maximální efektivitě — s plnou viditelností PUE, zatížení a tarifní expozice.',
        },
        {
          label: 'ENERGETIKA & SÍTĚ',
          title: 'Flexibilita pro nestabilní síť.',
          description:
            'Počítáme dostupnou flexibilitu v každém odběrném místě, oceňujeme ji a propojujeme operátory přímo s agregátory — proměňujeme nestabilitu sítě v příležitost k výnosu.',
        },
      ],
      en: [
        {
          label: 'MANUFACTURING',
          title: 'Powering the production floor.',
          description:
            'Prosumo optimizes energy consumption across production lines, compressors, and HVAC — reducing electricity costs without touching throughput.',
        },
        {
          label: 'COMMERCIAL REAL ESTATE',
          title: 'Smarter buildings, lower OPEX.',
          description:
            'From office towers to retail complexes, Prosumo schedules building loads around SPOT prices and delivers measurable savings on every energy bill.',
        },
        {
          label: 'DATA CENTERS',
          title: 'Ensuring uptime at scale.',
          description:
            'Prosumo unlocks the predictive control required to run hyperscale and colocation facilities at peak efficiency — with full visibility on PUE, load, and tariff exposure.',
        },
        {
          label: 'UTILITIES & GRID',
          title: 'Flexibility for a volatile grid.',
          description:
            'We calculate available flexibility at each consumption point, value it, and connect operators directly with aggregators — turning grid volatility into a revenue opportunity.',
        },
      ],
    } as Bilingual<{ label: string; title: string; description: string }[]>,
    platformHeading: { cs: 'Naše řešení', en: 'Our Solutions' } as Bilingual<string>,
    platformBody: {
      cs: 'PROSUMO s.r.o. vyvíjí pokročilé algoritmy pro optimalizaci energetických toků a agregaci flexibility. Cloudová platforma PROSUMO vytváří zastřešující vrstvu pro EMS, RTU a MaR, kterým poskytujeme přesné predikce a optimalizační podklady, na jejichž základě řídí lokální energetiku. Naše technologie jsou stavěny na kombinaci hlubokých znalostí z oblasti energetiky, umělé inteligence a kybernetické bezpečnosti.',
      en: 'PROSUMO develops advanced algorithms for energy flow optimization and flexibility aggregation. The PROSUMO cloud platform provides an overarching layer for EMS, RTU, and MaR systems, offering precise forecasts and optimization data that guide their local energy management. Our technology combines deep energy expertise, artificial intelligence, and cybersecurity.',
    } as Bilingual<string>,
  },

  services: {
    heading: {
      cs: ['Osm způsobů', 'jak ovládnout', 'vaši energii.'],
      en: ['Eight ways', 'to master', 'your energy.'],
    } as Bilingual<string[]>,
    blocks: [
      {
        lines: { cs: ['Predikce', 'solárních', 'zdrojů'], en: ['Solar', 'Forecasting'] },
        bodyText: {
          cs: 'Přesné modely na základě meteorologických dat predikují výrobu FV systémů až 48 hodin dopředu.',
          en: 'Predict PV output up to 48 hours ahead using high-resolution meteorological models.',
        },
      },
      {
        lines: {
          cs: ['*Odhalte závady*', 'dříve, než vás', 'to bude stát.'],
          en: ['*Detect faults*', 'before they', 'cost you.'],
        },
        bodyText: {
          cs: 'Detekuje odchylky ve výkonu AC/DC pro včasné odhalení závad na úrovni stringu nebo střídače.',
          en: 'Detects deviations in AC/DC output for early fault detection at string or inverter level.',
        },
      },
      {
        lines: { cs: ['Optimalizace', 'SPOT trhu'], en: ['SPOT Market', 'Optimization'] },
        bodyText: {
          cs: 'Algoritmy plánují provoz zařízení podle křivky cen na SPOT trhu.',
          en: 'Schedule device operation automatically around the cheapest hours of the day.',
        },
      },
      {
        lines: {
          cs: ['*Vyvažte* svou', 'síť 24 hodin', 'dopředu.'],
          en: ['*Balance* your', 'grid 24 hours', 'ahead.'],
        },
        bodyText: {
          cs: 'Model spotřeby a výroby 24 hodin dopředu pomáhá snížit náklady na odchylku.',
          en: 'A 24-hour ahead consumption and supply model helps reduce imbalance costs.',
        },
      },
      {
        lines: {
          cs: ['*Maximalizujte* každý', 'kilowatt, který vaše', 'aktiva produkují.'],
          en: ['*Maximise* every', 'kilowatt your', 'assets produce.'],
        },
        bodyText: {
          cs: 'Dynamické řízení spotřeby, výroby a akumulace minimalizuje odchylku od prognózy.',
          en: 'Dynamic management of consumption, generation, and storage minimizes forecast deviation.',
        },
      },
      {
        lines: { cs: ['Predikce', 'flexibility'], en: ['Flexibility', 'Forecasting'] },
        bodyText: {
          cs: 'Vypočítá dostupný objem regulační energie, který lze nabídnout agregátorům.',
          en: 'Calculates available regulatory energy volume that can be offered to aggregators.',
        },
      },
      {
        lines: { cs: ['Ocenění', 'flexibility'], en: ['Flexibility', 'Valuation'] },
        bodyText: {
          cs: 'Ekonomické hodnocení poskytování regulační energie pro rozhodování v reálném čase.',
          en: 'Economic assessment of regulatory energy provision for real-time decision-making.',
        },
      },
      {
        lines: {
          cs: ['*Sdílejte energii*', 'chytřeji ve vaší', 'komunitě.'],
          en: ['*Share energy*', 'smarter across', 'your community.'],
        },
        bodyText: {
          cs: 'Řídí spotřebu a výrobu energetické komunity pro maximalizaci vlastní spotřeby.',
          en: 'Manages energy community consumption and generation to maximise self-consumption.',
        },
      },
    ] as { lines: Bilingual<string[]>; bodyText: Bilingual<string> }[],
  },

  architecture: {
    eyebrow: { cs: 'Architektura', en: 'Architecture' } as Bilingual<string>,
    heading1: { cs: 'Architektura', en: 'Architecture' } as Bilingual<string>,
    heading2: { cs: '', en: '' } as Bilingual<string>,
    body1: {
      cs: 'Cloudová platforma PROSUMO.cloud se připojuje k odběrným místům prostřednictvím dvou typů rozhraní. Tam, kde zákazník provozuje EMS EnergoStation, je MQTT gateway i řídicí logika integrována přímo v tomto systému a odběrné místo se napojuje na cloud bez dalšího hardwaru. U ostatních odběrných míst — s libovolnou RTU, EMS nebo MaR — slouží jako datový most zařízení ProsumoBox, které komunikuje s lokálním řídicím systémem přes Modbus TCP a s cloudem přes MQTT/HTTPS.',
      en: 'The PROSUMO.cloud platform connects to consumption sites through two types of interfaces. Where the customer operates EMS EnergoStation, the MQTT gateway and control logic are integrated directly within that system, and the site connects to the cloud without additional hardware. At other sites — with any RTU, EMS or SCADA — the ProsumoBox device serves as a data bridge, communicating with the local control system via Modbus TCP and with the cloud via MQTT/HTTPS.',
    } as Bilingual<string>,
    body2: {
      cs: 'PROSUMO.cloud v obou případech vystupuje výhradně jako poskytovatel cloudových služeb: dodává predikce, optimalizační podklady a diagnostická data. Přímé řízení zařízení — elektroměrů, FVE invertorů, BESS, EV nabíječek, tepelných čerpadel nebo čidel solární radiace — vždy zajišťuje lokální RTU, EMS nebo MaR zákazníka.',
      en: "In both cases, PROSUMO.cloud acts exclusively as a cloud services provider: it delivers forecasts, optimisation inputs and diagnostic data. Direct device control — of smart meters, PV inverters, BESS, EV chargers, heat pumps, or solar irradiance sensors — is always handled by the customer's local RTU, EMS or SCADA system.",
    } as Bilingual<string>,
  },

  cta: {
    heading1: { cs: 'Spojte se', en: 'Connect' } as Bilingual<string>,
    heading2: { cs: 's námi.', en: 'with us.' } as Bilingual<string>,
    sub: {
      cs: 'Pokud potřebujete propojit váš systém s agregátorem, navrhnout energetický plán pro váš projekt nebo kontinuálně monitorovat a optimalizovat vaši energetiku.',
      en: "If you need to connect your system to an aggregator, design an energy plan for your project, or continuously monitor and optimize your energy usage.",
    } as Bilingual<string>,
    btn1: { cs: 'Kontaktujte nás', en: 'Request Demo' } as Bilingual<string>,
    btn2: { cs: 'Stáhnout přehled', en: 'Download Datasheet' } as Bilingual<string>,
    contactCard: {
      kicker: { cs: 'Hlavní kontakt · Obchod', en: 'Primary Contact · Sales' } as Bilingual<string>,
      bio: {
        cs: 'Zkušený technologický a obchodní leader. Pomáhá firmám hledat praktické cesty k efektivnějšímu řízení energií a zavádění chytrých technologií do provozu.',
        en: 'Experienced technology and business leader. Helps companies find practical paths to more efficient energy management and smart technology deployment.',
      } as Bilingual<string>,
    },
  },

  footer: {
    rights: { cs: 'Všechna práva vyhrazena.', en: 'All rights reserved.' } as Bilingual<string>,
    address: { cs: 'Adresa', en: 'Address' } as Bilingual<string>,
    phone: { cs: 'Telefon', en: 'Phone' } as Bilingual<string>,
    email: { cs: 'Email', en: 'Email' } as Bilingual<string>,
    registerRef: { cs: 'Spisová značka:', en: 'Register Reference:' } as Bilingual<string>,
    courtRef: { cs: 'C 338898/MSPH Městský soud v Praze', en: 'C 338898/MSPH Municipal Court in Prague' } as Bilingual<string>,
  },

  diagram: {
    cloudSub: { cs: 'Predikce · Diagnostika · Optimalizace · Subagregace', en: 'Forecasting · Diagnostics · Optimization · Subaggregation' } as Bilingual<string>,
    location1: { cs: 'Odběrné místo 1', en: 'Consumption Site 1' } as Bilingual<string>,
    location2: { cs: 'Odběrné místo 2', en: 'Consumption Site 2' } as Bilingual<string>,
    location3: { cs: 'Odběrné místo 3', en: 'Consumption Site 3' } as Bilingual<string>,
    location4: { cs: 'Odběrné místo 4', en: 'Consumption Site 4' } as Bilingual<string>,
    energoTitle: { cs: 'EnergoStation\nEMS', en: 'EnergoStation\nEMS' } as Bilingual<string>,
    energoNote: { cs: 'RTU gateway integrováno', en: 'RTU gateway integrated' } as Bilingual<string>,
    gatewayTitle: { cs: 'ProsumoBox\nGateway', en: 'ProsumoBox\nGateway' } as Bilingual<string>,
    modbus: { cs: 'Modbus', en: 'Modbus' } as Bilingual<string>,
    tcp: { cs: 'TCP', en: 'TCP' } as Bilingual<string>,
    controlsDevices: { cs: 'řídí zařízení', en: 'controls devices' } as Bilingual<string>,
    gatewayPart: { cs: 'Gateway součástí EMS', en: 'Gateway part of EMS' } as Bilingual<string>,
    legend: { cs: 'Legenda', en: 'Legend' } as Bilingual<string>,
    legendCloud: { cs: 'PROSUMO.cloud — cloudové služby (predikce, optimalizace, diagnostika)', en: 'PROSUMO.cloud — cloud services (forecasting, optimization, diagnostics)' } as Bilingual<string>,
    legendEnergo: { cs: 'EnergoStation EMS — obsahuje gateway i RTU/MaR, přímé napojení na cloud', en: 'EnergoStation EMS — includes gateway and RTU/SCADA, direct cloud connection' } as Bilingual<string>,
    legendProsumoBox: { cs: 'ProsumoBox — MQTT/Modbus TCP gateway pro připojení běžných RTU / EMS / MaR', en: 'ProsumoBox — MQTT/Modbus TCP gateway for connecting standard RTU / EMS / SCADA' } as Bilingual<string>,
    legendController: { cs: 'RTU / EMS / MaR — přímé řízení zařízení (PROSUMO toto neprovádí)', en: 'RTU / EMS / SCADA — direct device control (PROSUMO does not perform this)' } as Bilingual<string>,
    legendDevices: { cs: 'Zařízení — elektroměr, PV invertor, BESS, EV charger, heat pump, senzory', en: 'Devices — smart meter, PV inverter, BESS, EV charger, heat pump, sensors' } as Bilingual<string>,
    legendMQTT: { cs: 'MQTT / HTTPS', en: 'MQTT / HTTPS' } as Bilingual<string>,
    legendModbus: { cs: 'Modbus TCP / lokální sběrnice', en: 'Modbus TCP / local bus' } as Bilingual<string>,
  },
}
