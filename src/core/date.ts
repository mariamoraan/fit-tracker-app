export function getTodayISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDayOfWeek(date: string): number {
  const d = new Date(date + "T00:00:00");
  return d.getDay();
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  return days;
}

export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function compareDates(date1: Date, date2: Date): 'SMALLER' | 'BIGGER' | 'EQUAL' {
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();
  
  if(year1 < year2) return 'SMALLER';
  if(year1 > year2) return 'BIGGER';

  if(month1 < month2) return 'SMALLER';
  if(month1 > month2) return 'BIGGER';

  if(day1 < day2) return 'SMALLER';
  if(day1 > day2) return 'BIGGER';

  return 'EQUAL'
}