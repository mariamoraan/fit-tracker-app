import { createContext, PropsWithChildren, useContext, useState } from "react";

interface CalendarContextValue {
    currentDate: Date;
    selectedDate?: string;
    startDay?: number;

    setSelectedDate: (dateISO?: string) => void;
    goToPreviousMonth: () => void;
    goToToday: () => void;
    goToNextMonth: () => void;
}

const CalendarContext = createContext<CalendarContextValue | undefined>(undefined);

export const CalendarProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const startDay = 1;

    const goToPreviousMonth = () => {
      setCurrentDate(new Date(year, month - 1, 1));
      setSelectedDate(undefined);
    }

    const goToNextMonth = () => {
      setCurrentDate(new Date(year, month + 1, 1));
      setSelectedDate(undefined);
    };
    
    const goToToday = () => {
      setCurrentDate(new Date());
      setSelectedDate(undefined);
    };

    return (
        <CalendarContext.Provider value={{
            currentDate,
            selectedDate,
            startDay,
            setSelectedDate,
            goToPreviousMonth,
            goToNextMonth,
            goToToday,
        }}>
          {children}
        </CalendarContext.Provider>
    )
}

export function useCalendarContext() {
    const ctx = useContext(CalendarContext);
    if (!ctx) {
      throw new Error("useCalendar must be used within CalendarProvider");
    }
    return ctx;
  }
  

