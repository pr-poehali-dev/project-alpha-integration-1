import { useState } from "react"

declare global {
  interface Window {
    _tmr?: { push: (obj: object) => void }
  }
}
import GradientBlinds from "@/components/GradientBlinds"
import Navbar from "@/components/Navbar"
import Icon from "@/components/ui/icon"

const services = [
  {
    icon: "Target",
    title: "Таргетированная реклама VK Ads",
    description: "Настройка рекламных кампаний ВКонтакте с точным попаданием в целевую аудиторию. Снижаю стоимость заявки и увеличиваю конверсию.",
  },
  {
    icon: "Users",
    title: "Парсинг аудитории в Target Hunter",
    description: "Собираю базы целевых клиентов по 50+ параметрам. Ваша реклама увидит только те, кто готов купить.",
  },
  {
    icon: "TrendingUp",
    title: "Яндекс Директ",
    description: "Контекстная реклама с оплатой за результат. Настраиваю кампании, которые приводят горячих клиентов из поиска.",
  },
  {
    icon: "FileText",
    title: "Конверсионные лендинги",
    description: "Создаю продающие страницы, которые превращают посетителей в покупателей. Средняя конверсия моих лендингов — 8–15%.",
  },
  {
    icon: "ShoppingBag",
    title: "Avito Ads",
    description: "Продвижение на Avito: от настройки объявлений до масштабирования продаж. Помогаю бизнесу получать клиентов с крупнейшей доски объявлений.",
  },
  {
    icon: "BarChart2",
    title: "Метод лестницы Бена Ханта",
    description: "Выстраиваю воронку продаж по уровням осведомлённости клиента. Реклама бьёт точно в боль и потребность на каждом этапе.",
  },
]

const cases = [
  {
    niche: "Новое кафе — подписчики ВКонтакте",
    channel: "VK Ads",
    result: "976 живых подписчиков за 54 715 ₽",
    metric: "CPF 56 ₽",
    metricColor: "emerald",
    steps: [
      "Протестировал 30 креативов на аудиторию подписчиков конкурентов",
      "Выявил самый отзывчивый сегмент по полу и возрасту через A/B-тесты",
      "Сузил аудиторию по полученным данным — стоимость подписчика упала вдвое",
    ],
    highlight: "Только живые, заинтересованные подписчики — без накруток и ботов",
  },
  {
    niche: "Пылесос против пылевых клещей — Wildberries",
    channel: "VK Ads + Яндекс Дзен",
    result: "Рост заказов на 304%",
    metric: "+304% заказов",
    metricColor: "blue",
    steps: [
      "Выявил узкую ЦА: аллергики и астматики — те, кто реально нуждается в товаре",
      "Создал лендинг и экспертную статью в Яндекс Дзен о пользе для здоровья",
      "Запустил многоступенчатую воронку: реклама → WB → ретаргет → Дзен → WB → покупка",
      "Подключил бартерных блогеров для усиления доверия к продукту",
    ],
    highlight: "Многоступенчатый ретаргетинг «догревал» аудиторию до покупки",
  },
  {
    niche: "Рекрутинг на военную службу",
    channel: "VK Ads + Чат-бот",
    result: "273 заявки за 100 918 ₽",
    metric: "CPL 370 ₽",
    metricColor: "emerald",
    steps: [
      "Сегментировал аудиторию по лестнице Бена Ханта — от тёплых до холодных",
      "Разработал чат-бота для автоматического приёма контактных данных",
      "Провёл серию тестов CTR на разных аудиториях и форматах объявлений",
      "Нашёл лучшую связку и масштабировал до нужного объёма заявок",
    ],
    highlight: "Чат-бот обрабатывал заявки 24/7 без участия менеджера",
  },
  {
    niche: "Одежда на Wildberries — внутренняя реклама",
    channel: "WB Реклама + Marpla + MKeeper",
    result: "Рост заказов на 217%",
    metric: "+217% заказов",
    metricColor: "blue",
    steps: [
      "Отключил неэффективные кампании с минимальной ставкой — они сжигали бюджет",
      "Протестировал CTR каждой карточки через сервис Marpla",
      "Запустил ручные кампании с показами в поиске, подключил аналитику MKeeper",
      "Отключил нерелевантные кластеры, повысил CPM на НЧ/СЧ запросы для выхода в топ-50",
      "После попадания в топ-50 органики — снизил ставки, сохранив позиции",
    ],
    highlight: "Ни рубля лишнего: каждый кластер управлялся по данным, а не наугад",
  },
  {
    niche: "Интернет-магазин одежды",
    channel: "VK Ads",
    result: "Стоимость заявки: с 480 ₽ до 140 ₽",
    metric: "ROAS 680%",
    metricColor: "emerald",
    steps: [
      "Пересобрал аудитории через Target Hunter по активности конкурентов",
      "Протестировал 12 гипотез по методу лестницы Бена Ханта",
      "Нашёл прибыльную связку и масштабировал рекламный бюджет в 3 раза",
    ],
    highlight: "Стоимость лида снизилась в 3,4 раза без увеличения бюджета",
  },
  {
    niche: "Юридические услуги",
    channel: "Яндекс Директ",
    result: "Рост заявок на 210% за 2 месяца",
    metric: "CPL −62%",
    metricColor: "blue",
    steps: [
      "Провёл полный аудит рекламного аккаунта и выявил слив бюджета",
      "Пересегментировал кампании по типам запросов и аудиторий",
      "Проработал минус-слова и корректировки ставок по демографии",
    ],
    highlight: "Бюджет не изменился — просто перестал тратиться впустую",
  },
]

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("https://functions.poehali.dev/503560cd-d4bc-4b94-94fc-40569691c431", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("sent")
        setForm({ name: "", phone: "", message: "" })
        window._tmr?.push({ type: 'reachGoal', id: 3760242, goal: 'form_submit' })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080c1a]">
      <Navbar />

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 w-full h-full flex items-center justify-center">
        <GradientBlinds
          gradientColors={["#0f1629", "#1e3a8a", "#2563eb", "#1d4ed8"]}
          angle={15}
          noise={0.25}
          blindCount={13}
          blindMinWidth={50}
          spotlightRadius={0.38}
          spotlightSoftness={1.6}
          spotlightOpacity={0.42}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="overlay"
        />
      </div>

      <div className="relative z-10 flex flex-col">

        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-screen w-full px-5 sm:px-20">
          <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Интернет-маркетолог · Реклама, которая окупается
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl text-balance drop-shadow-2xl">
              Дмитрий Янев —
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                трафик и продажи
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl text-pretty drop-shadow-lg">
              Настраиваю рекламу в VK Ads, Яндекс Директ и Avito. Строю воронки, которые продают — не просто кликают.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href="#contact"
                onClick={() => window._tmr?.push({ type: 'reachGoal', id: 3760242, goal: 'consultation_click' })}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-white/90 shadow-2xl"
              >
                Бесплатная консультация
              </a>
              <a
                href="#cases"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition-all hover:bg-white/20 hover:border-white/50 shadow-xl"
              >
                Смотреть кейсы
                <Icon name="ChevronRight" size={20} className="ml-2" />
              </a>
            </div>

            <a
              href="tel:+79515437126"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mt-2"
            >
              <Icon name="Phone" size={16} />
              <span className="text-base">+7 951 543-71-26</span>
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-5 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Услуги</h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto">Полный цикл интернет-маркетинга — от трафика до заявки</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-all">
                    <Icon name={s.icon} size={22} className="text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section id="cases" className="py-24 px-5 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Кейсы</h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto">Реальные результаты реальных клиентов</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cases.map((c) => (
                <div
                  key={c.niche}
                  className="p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                      {c.channel}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${c.metricColor === "emerald" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-blue-300 bg-blue-400/10 border-blue-400/20"}`}>
                      {c.metric}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">{c.niche}</h3>
                    <p className="text-blue-300 font-semibold text-base">{c.result}</p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {c.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/65 leading-relaxed">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-xs flex items-center justify-center mt-0.5 font-semibold">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-3 border-t border-white/10">
                    <p className="text-xs text-white/40 italic">{c.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-5 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col md:flex-row items-center gap-10">
              <div className="flex-shrink-0 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-blue-400/30">
                <img
                  src="https://cdn.poehali.dev/projects/a9834d87-59e3-4d89-adeb-e42f92e1915b/bucket/949033fd-4f7d-4bad-9b32-15ff801bcaa3.png"
                  alt="Дмитрий Янев"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Дмитрий Янев</h2>
                <p className="text-blue-300 font-medium mb-4">Интернет-маркетолог · более 5 лет в digital-рекламе</p>
                <p className="text-white/70 leading-relaxed mb-4">
                  Специализируюсь на платном трафике и конверсионных воронках для малого и среднего бизнеса. Работаю с VK Ads, Яндекс Директ и Avito — выстраиваю системы, которые приносят заявки стабильно, а не разово.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["VK Ads", "Target Hunter", "Яндекс Директ", "Avito Ads", "Лестница Ханта", "Конверсионные лендинги"].map((tag) => (
                    <span key={tag} className="text-xs text-white/70 bg-white/10 border border-white/10 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="contact" className="py-24 px-5 sm:px-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Давайте поговорим</h2>
              <p className="text-white/60 text-lg">
                Расскажите о вашем проекте — разберём ситуацию и найдём точки роста. Без обязательств.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-4"
            >
              <div>
                <label className="block text-white/70 text-sm mb-2">Ваше имя</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Телефон или Telegram</label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 900 000-00-00 или @username"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">О вашем проекте</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Расскажите о бизнесе, какой канал рекламы используете сейчас, какой результат хотите получить..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
              >
                {status === "sending" ? "Отправляю..." : status === "sent" ? "Заявка отправлена!" : "Получить бесплатную консультацию"}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">Что-то пошло не так. Напишите напрямую: <a href="tel:+79515437126" className="underline">+7 951 543-71-26</a></p>
              )}

              <p className="text-white/30 text-xs text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-5 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Icon name="BarChart2" size={14} className="text-white" />
              </div>
              <span className="text-white font-semibold">Дмитрий Янев</span>
            </div>
            <a href="tel:+79515437126" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <Icon name="Phone" size={15} />
              <span>+7 951 543-71-26</span>
            </a>
            <p className="text-white/30 text-sm">© 2024 Дмитрий Янев · Интернет-маркетолог</p>
          </div>
        </footer>

      </div>
    </main>
  )
}