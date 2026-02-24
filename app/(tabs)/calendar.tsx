import { PageShell } from "@/src/core/components/page-shell/page-shell";
import { CalendarProvider } from "@/src/features/calendar/ui/CalendarProvider";
import { SessionDetail } from "@/src/features/calendar/ui/components/session-detail/session-detail";
import { SessionsCalendar } from "@/src/features/calendar/ui/components/sessions-calendar/sessions-calendar";
import { View } from "react-native";

export default function CalendarScreen() {
  return (
    
      <PageShell title="Calendario">
        
        <View style={{ gap: 16 }}>
          <CalendarProvider>
            <SessionsCalendar />
            <SessionDetail />
          </CalendarProvider>
        </View>
       
      </PageShell>
   
  );
}