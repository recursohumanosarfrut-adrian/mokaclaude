import { site } from "@/config/site";

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "18:30" → "6:30 pm" · "09:00" → "9:00 am" */
export function formatTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatRange(slot, sep = " – ") {
  return `${formatTime(slot.open)}${sep}${formatTime(slot.close)}`;
}

function nowInZone(timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    day: WEEKDAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const slotForDay = (day) => site.hours.find((s) => s.days.includes(day));

/** Estado actual de la tienda según la hora de Ciudad de México. */
export function getOpenStatus() {
  const { day, minutes } = nowInZone(site.timeZone);
  const today = slotForDay(day);

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: "Abierto ahora", detail: `Hasta las ${formatTime(today.close)}` };
  }
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, label: "Cerrado por ahora", detail: `Abrimos hoy a las ${formatTime(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const slot = slotForDay(d);
    if (slot) {
      const when = i === 1 ? "mañana" : `el ${DAY_NAMES[d]}`;
      return { open: false, label: "Cerrado por ahora", detail: `Abrimos ${when} a las ${formatTime(slot.open)}` };
    }
  }
  return { open: false, label: "Cerrado", detail: "" };
}
