
type RouteParams = Record<string, string | number | undefined> | undefined;

type RouteConfig<P extends RouteParams> = {
    screen: string;
    pathname: string,
    params?: P;
};

export const PATHS = {
    HOME: {
        screen: "index",
        pathname: "/"
    } as RouteConfig<undefined>,
  
    CALENDAR: {
      screen: "calendar",
      pathname: "/calendar"
    } as RouteConfig<undefined>, 
  
    ROUTINES: {
        screen: "routines",
        pathname: "/routines"
    } as RouteConfig<undefined>,
  
    ROUTINE: (routineId: string): RouteConfig<{ id: string }> => ({
      screen: "routines/[id]",
      pathname: "/routines/[id]",
      params: { id: routineId },
    }),
  
    CREATE_ROUTINE: {
       screen: "routines/create",
    },
    START_SESSION: (params: {sessionId: string}): RouteConfig<{ id: string }> => ({
      screen: "session/[id]",
      pathname: "/session/[id]",
      params: {id: params.sessionId},
    }),
  
    EDIT_SESSION: (params: {sessionId: string}): RouteConfig<{ id: string }> => ({
        screen: "session/[id]/edit",
        pathname: "/session/[id]/edit",
        params: {id: params.sessionId},
    }),
  } as const;